import numpy as np
import pandas as pd
import sys
import os
import csv

MOVEMENT_MAPPINGS_TO_CODE = {
    "squat": "m01"
}

SQUAT_POSITIONS_MAP_TO_INDEX = {
    "LTHI": 27, "LKNE": 28, "LANK": 30,
    "RTHI": 33, "RKNE": 34, "RANK": 36,

    "LHIP": 23, "RHIP": 24, # LASI AND RASI respectively

    "LSHO": 9, "RSHO": 16,

    "C7": 4
}

FINAL_ANGLE_HEADERS = ["left_knee", "right_knee", "left_hip", "right_hip", "trunk"]
METADATA_HEADERS = ["vid_id", "camera_id", "rep_id", "person_id", "correctness"]
TARGET_FRAME = 60
def create_header():
    res = METADATA_HEADERS.copy()
    for i in range(TARGET_FRAME):
        for j in FINAL_ANGLE_HEADERS:
            res.append("frame_" + str(i) + "_" + j)
    return res

def calculate_angles(a, b, c):
    ba = b - a
    bc = b - c
    cosine = np.dot(ba, bc) / (np.linalg.norm(ba) * np.linalg.norm(bc))
    return np.degrees(np.arccos(np.clip(cosine, -1.0, 1.0)))

def calculate_trunk(top, bottom):
    vector = top - bottom
    normal = [0.0, 0.0, 1.0]
    cosine = np.dot(vector, normal) / (np.linalg.norm(vector))
    res =  np.degrees(np.arccos(np.clip(cosine, -1.0, 1.0))) 
    return res

def interpolate(array: np.ndarray, target_frame: int = TARGET_FRAME) -> np.ndarray:
    if len(array) == target_frame:
        return array
    
    result = np.zeros((target_frame, array.shape[1])) # TARGET FRAME x NUM COLS

    original_t = np.linspace(0, 1, len(array))
    target_t = np.linspace(0, 1, target_frame) # original time axis and target time axis

    for i in range(result.shape[1]):
        result[:, i] = np.interp(target_t, original_t, array[:, i])
    return result

def main(input_file: str, output_csv: str, correctness: int):
    df = pd.read_csv(input_file, delimiter=",", header=None)
    print(f"Reading {input_file} with shape {df.shape}")
    input_list_name = os.path.basename(input_file).split("_")
    movement_index = input_list_name[0]
    if movement_index != "m01":
        print("WRONG MOVEMENT READ")
        sys.exit(1)
    person_id = input_list_name[1]
    rep_id = input_list_name[2]

    # need to drop the unnessesary columns 
    target_columns_index = [v for i in SQUAT_POSITIONS_MAP_TO_INDEX.values() for v in (3*i, 3*i+1, 3*i+2)]
    df = df.iloc[:, target_columns_index] # 33 columns only

    # calculate the angles accordingly for each frame
    result_array = np.zeros((len(df), 5))
    for index, row in df.iterrows():
        current_row = np.array(row)

        # calculate left knee angle
        result_array[index, 0] = calculate_angles(current_row[0:3], current_row[3:6], 
                                           current_row[6:9])
        # calculate right knee angle
        result_array[index, 1] = calculate_angles(current_row[9:12], current_row[12:15],
                                            current_row[15:18])
        # calculate left hip angle
        result_array[index, 2] = calculate_angles(current_row[3:6], current_row[18:21],
                                          current_row[24:27])
        # calculate right hip angle
        result_array[index, 3] = calculate_angles(current_row[12:15], current_row[21:24],
                                           current_row[27:30])
        # calculate trunk 
        result_array[index, 4] = calculate_trunk(current_row[30:33], 
                                      (current_row[18:21] + current_row[21:24]) / 2)

        
    # since number of frames > required (60 frame) need to shrink it down
    # possibily via interpolation
    final_array = interpolate(result_array)
    metadata = ["uiprmd", "uiprmd", rep_id, person_id, correctness]
    metadata.extend(final_array.flatten().tolist())
    res = metadata
    # finally we flatten the array and then write into the csv (should be 305 columns)
    if not os.path.exists(output_csv):
        with open(output_csv, "a", newline='') as csv_Writer:
            writer = csv.writer(csv_Writer)
            writer.writerow(create_header())
    with open(output_csv, "a", newline='') as csv_writer:
        writer = csv.writer(csv_writer)
        writer.writerow(res)

if __name__ == "__main__":
    if len(sys.argv) != 4:
        print("Usage: python uiprmd_to_angles.py <input angles txt folder> <movement> <output angle csv>")
        sys.exit(1)
    elif not os.path.exists(sys.argv[1]):
        print(f"Error: Input folder {sys.argv[1]} does not exist")
        sys.exit(1)
    elif sys.argv[2] not in MOVEMENT_MAPPINGS_TO_CODE.keys():
        print("Movement not valid / not supported")
        print("Here is a list of valid movements:")
        for i in MOVEMENT_MAPPINGS_TO_CODE.keys():
            print(i)
        sys.exit(1)
    elif os.path.exists(sys.argv[3]):
        print("csv already exists, overriding may cause unintended effects")
        i = input("Continue? (y / n): ")
        if i.lower() == 'n':
            sys.exit(0)
    
    for file in os.listdir(sys.argv[1]):
        if MOVEMENT_MAPPINGS_TO_CODE[sys.argv[2]] not in file:
            continue
        else:
            if "Incorrect" in sys.argv[1]:
                correctness = 0
            else:
                correctness = 1
            main(os.path.join(sys.argv[1], file), sys.argv[3], correctness)


