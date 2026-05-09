import mediapipe as mp
import cv2
import numpy as np
import math


# configuration of variables and settings for landmarker model
model_path = "C:/Projects/RehabFlow/ml/pose_landmarker_full.task"

BaseOptions = mp.tasks.BaseOptions
PoseLandmarker = mp.tasks.vision.PoseLandmarker
PoseLandmarkerOptions = mp.tasks.vision.PoseLandmarkerOptions
PoseLandmarkerResult = mp.tasks.vision.PoseLandmarkerResult
VisionRunningMode = mp.tasks.vision.RunningMode
mp_drawing = mp.tasks.vision.drawing_utils
mp_connections = mp.tasks.vision.PoseLandmarksConnections

landmark_dict = {
    "nose":0,
    "left eye (inner)":1,
    "left eye":2,
    "left eye (outer)":3,
    "right eye (inner)":4,
    "right eye":5,
    "right eye (outer)":6,
    "left ear":7,
    "right ear":8,
    "mouth (left)":9,
    "mouth (right)":10,
    "left shoulder":11,
    "right shoulder":12,
    "left elbow":13,
    "right elbow":14,
    "left wrist":15,
    "right wrist":16,
    "left pinky":17,
    "right pinky":18,
    "left index":19,
    "right index":20,
    "left thumb":21,
    "right thumb":22,
    "left hip":23,
    "right hip":24,
    "left knee":25,
    "right knee":26,
    "left ankle":27,
    "right ankle":28,
    "left heel":29,
    "right heel":30,
    "left foot index":31,
    "right foot index":32
}

latest_result = None
counter = 0
state = None

def calculate_angle(a, b, c):
    """Calculates the angle between three points."""
    a = np.array(a) # First
    b = np.array(b) # Mid
    c = np.array(c) # End
    radians = math.atan2(c[1]-b[1], c[0]-b[0]) - math.atan2(a[1]-b[1], a[0]-b[0])
    angle = np.abs(radians*180.0/np.pi)
    if angle > 180.0:
        angle = 360 - angle
    return angle

def update_result(result, output_image: mp.Image, timestamp: int):
    global latest_result
    latest_result = result

options = PoseLandmarkerOptions(base_options=BaseOptions(model_asset_path=model_path), 
                                running_mode=VisionRunningMode.LIVE_STREAM,
                                result_callback=update_result)

with PoseLandmarker.create_from_options(options) as pose_landmarker:
    cam = cv2.VideoCapture(0)
    if not cam.isOpened():
        print("Error: cannot open camera")
        success = False
    else:
        success, array = cam.read()
        print("Camera opened successfully")
    
    while success:
        success, array = cam.read()
        rgb_frame = cv2.cvtColor(array, cv2.COLOR_BGR2RGB)
        mp_image = mp.Image(image_format=mp.ImageFormat.SRGB, data=rgb_frame)
        pose_landmarker.detect_async(mp_image, 
                                    int(cam.get(cv2.CAP_PROP_POS_MSEC)))

        # angle calculations and drawings
        if latest_result is not None:
            for pose_landmarks in latest_result.pose_landmarks:

                # visiblity checker for left ankle, left knee, and left hip
                if (pose_landmarks[landmark_dict["left ankle"]].visibility < 0.5 or
                    pose_landmarks[landmark_dict["left knee"]].visibility < 0.5 or
                    pose_landmarks[landmark_dict["left hip"]].visibility < 0.5):
                    continue


                # the angle calculations are to make sure model is working correctly,
                # will remove later when training model on online dataset
                # get the coordinates of the relevant landmarks
                left_ankle = [pose_landmarks[landmark_dict["left ankle"]].x, pose_landmarks[landmark_dict["left ankle"]].y]
                left_knee = [pose_landmarks[landmark_dict["left knee"]].x, pose_landmarks[landmark_dict["left knee"]].y]
                left_hip = [pose_landmarks[landmark_dict["left hip"]].x, pose_landmarks[landmark_dict["left hip"]].y]

                # calculate the angle at the left knee
                angle = calculate_angle(left_ankle, left_knee, left_hip)

                # update the counter and state
                if angle > 160:
                    state = "Up"
                elif angle < 100 and state == "Up":
                    state = "Down"
                    counter += 1
                # draw the counter and state
                cv2.putText(array, "Reps: " + str(counter), (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2, cv2.LINE_AA)
                cv2.putText(array, "State: " + str(state), (10, 70), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2, cv2.LINE_AA)

                # draw the angle on the image
                cv2.putText(array, str(int(angle)), 
                            tuple(np.multiply(left_knee, [array.shape[1], array.shape[0]]).astype(int)), 
                            cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2, cv2.LINE_AA)

                mp_drawing.draw_landmarks(
                    array, 
                    pose_landmarks, 
                    mp_connections.POSE_LANDMARKS,
                    mp_drawing.DrawingSpec(color=(0,255,0), thickness=2, circle_radius=2),
                    mp_drawing.DrawingSpec(color=(245,66,230), thickness=2, circle_radius=2)
                )

        #resizing window 
        cv2.namedWindow("Webcam Feed", cv2.WINDOW_NORMAL)
        cv2.resizeWindow("Webcam Feed", 1200, 900)

        cv2.imshow("Webcam Feed", array)
        # this terminates the webcam feed upon a key press of 'q'
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

cam.release()
cv2.destroyAllWindows()
