import mediapipe as mp
import cv2
from dotenv import load_dotenv
import numpy as np
import os
import sys
import csv

# configuration of variables and settings for landmarker model
load_dotenv()
MODEL_PATH = os.getenv("MODEL_PATH")
REHAB24_DATASET_PATH = os.getenv("REHAB24_DATASET_PATH")
FRAME_FIXED_LENGTH = 60 # this dictates the fixed number of frames in 1 rep segment
if not MODEL_PATH or not REHAB24_DATASET_PATH:
    print("Error: MODEL_PATH and REHAB24_DATASET_PATH must be set in .env")
    sys.exit(1)

BaseOptions = mp.tasks.BaseOptions
PoseLandmarker = mp.tasks.vision.PoseLandmarker
PoseLandmarkerOptions = mp.tasks.vision.PoseLandmarkerOptions
PoseLandmarkerResult = mp.tasks.vision.PoseLandmarkerResult
VisionRunningMode = mp.tasks.vision.RunningMode

NUM_LANDMARKS = 33
options = PoseLandmarkerOptions(base_options=BaseOptions(model_asset_path=MODEL_PATH), 
                                running_mode=VisionRunningMode.VIDEO,
                                num_poses=1, min_pose_detection_confidence=0.5,
                                min_pose_presence_confidence=0.5,
                                min_tracking_confidence=0.5)

def header():
    res = ["vid_id", "camera_id", "rep_id", "exercise_id", "person_id", "correctness"]
    for j in range(FRAME_FIXED_LENGTH):
        for i in range(NUM_LANDMARKS):
            res.append("frame_" + str(j) + "_landmark_" + str(i) + "_x")
            res.append("frame_" + str(j) + "_landmark_" + str(i) + "_y")
            res.append("frame_" + str(j) + "_landmark_" + str(i) + "_z")
            res.append("frame_" + str(j) + "_landmark_" + str(i) + "_visibility")
    return res

def generate_data(video_file: str, output_file: str, list_of_segments):
    with PoseLandmarker.create_from_options(options) as pose_landmarker:
        cam = cv2.VideoCapture(video_file)    
        base_name = os.path.splitext(os.path.basename(video_file))[0]
        name_of_vid = base_name.split("-")[0]
        camera_id = base_name.split("-")[1]
        current_segments = list(filter(lambda x : x[0] == name_of_vid, list_of_segments))
        current_segments = sorted(current_segments, key=lambda x: int(x[4]))
        # write header logic
        write_header = not os.path.exists(output_file)
        with open(output_file, mode='a', newline='') as csv_file:
            csv_writer = csv.writer(csv_file)
            if write_header:
                csv_writer.writerow(header())
            for segment in current_segments:
                # here we get the first and last frame of the segment, and we prepare to read all frames
                first_frame = int(segment[4])
                last_frame = int(segment[5])
                counter = first_frame
                cam.set(cv2.CAP_PROP_POS_FRAMES, first_frame)
                # for the current segment, we add the vid_id, rep id, camera_id, 
                # exercise id, person id, correctness
                identifiers = [segment[0], camera_id, segment[1], segment[2], segment[3], segment[12]]
                current_row = []        
                fps = cam.get(cv2.CAP_PROP_FPS) or 30.0 
                while cam.isOpened():
                    success, array = cam.read()
                    if not success:
                        print("Error in reading video file")
                        break
                    
                    # convert from BGR to RGB for better detection??
                    rgb_frame = cv2.cvtColor(array, cv2.COLOR_BGR2RGB)
                    mp_image = mp.Image(image_format=mp.ImageFormat.SRGB, data=rgb_frame)
                    
                    # manual calculation of timestamp instead of cv2.CAP_PROP_POS_MESC
                    # apparently claude said its not reliable so i guess i shall listen
                    timestamp_ms = int(counter / fps * 1000)
                    pose_landmarker_result = pose_landmarker.detect_for_video(mp_image, 
                                            timestamp_ms)
                    
                    
                    if pose_landmarker_result.pose_world_landmarks:
                        current_frame = []
                        for landmark in pose_landmarker_result.pose_world_landmarks[0]:
                            current_frame.append(landmark.x)
                            current_frame.append(landmark.y)
                            current_frame.append(landmark.z)
                            current_frame.append(landmark.visibility)
                        current_row.append(current_frame)

                    # incremental logic and breaking conditions
                    counter += 1
                    if counter > last_frame:
                        break
                    
                    # now here we have the full row of data for the current segment, 
                    # a list [ list [landmarks] ] so now we need to linearlise it???
                if (len(current_row) < 2):
                    print("Not enough frames detected for segment, skipping...")
                    continue
                result_array = resample_sequence(current_row, FRAME_FIXED_LENGTH)
                flattened_array = result_array.flatten()
                identifiers.extend(flattened_array.tolist())
                csv_writer.writerow(identifiers)
    cam.release()


def resample_sequence(frames: list[list[float]], target_length: int) -> np.ndarray:
    """
    Resamples a variable-length sequence of landmark frames to a fixed length.

    Args:
        frames:        List of M frames, each a flat list of 132 floats
                       (33 landmarks * [x, y, z, visibility])
        target_length: N — the fixed number of frames to resample to

    Returns:
        numpy array of shape (target_length, 132)
    """
    frames_array = np.array(frames)          # shape: (M, 132)
    M = len(frames_array)

    if M == target_length:
        return frames_array                  # nothing to do

    # Time axis: original frames sit at evenly spaced points 0→1
    original_t = np.linspace(0, 1, M)
    target_t   = np.linspace(0, 1, target_length)

    # Interpolate all 132 feature dimensions at once along axis=0
    resampled = np.zeros((target_length, frames_array.shape[1]))
    for i in range(frames_array.shape[1]):
        resampled[:, i] = np.interp(target_t, original_t, frames_array[:, i])

    return resampled     

def clean_data(csv_file: str):
    with open(csv_file, mode='r') as file:
        csv_reader = csv.reader(file)
        rows = list(csv_reader)
        # we remove the header
        rows = rows[1:]
        print(len(rows))
        # we now filter - we drop those rows where mocap_error = 1 and person_in_frame = 3
        rows = list(filter(lambda x : x[7] == '0' and x[10] != '3' and x[11] != '3', rows))
        # we dropped from 1072 -> 997 rows, 75 rows with bad data, >1% data loss
        print(f"Remaining rows: {len(rows)}")
        return rows



if __name__ == "__main__":
    if (len(sys.argv) != 3):
        print("Usage: python landmark_generator.py <input_video_folder> <output_csv_path>")
        sys.exit(1)
    # At the top of __main__, before the loop:
    if os.path.exists(sys.argv[2]):
        confirm = input(f"{sys.argv[2]} already exists. Overwrite? (y/n): ")
        if confirm.lower() == 'y':
            os.remove(sys.argv[2])
        else:
            sys.exit(0)
    elif not os.path.exists(sys.argv[1]):
        print("Input video folder does not exist.")
        sys.exit(1)
    elif not os.path.isdir(sys.argv[1]):
        print("Input path is not a directory.")
        sys.exit(1)
    else:
        list_of_segments = clean_data(REHAB24_DATASET_PATH)
        for file in os.listdir(sys.argv[1]):
            if file.endswith((".mp4", ".avi", ".mov")) and os.path.isfile(os.path.join(sys.argv[1], file)):  # Add more video extensions if needed
                try:
                    print("Processing video: " + file)
                    generate_data(os.path.join(sys.argv[1], file), sys.argv[2], list_of_segments)
                except Exception as e:
                    print(f"Error processing {file}: {e}")
