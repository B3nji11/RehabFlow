import csv
import math
import sys
import os
import numpy as np
import pandas as pd

SQUAT_LANDMARKS = {
    "left_shoulder": 11, "right_shoulder": 12,
    "left_hip":      23, "right_hip":      24,
    "left_knee":     25, "right_knee":     26,
    "left_ankle":    27, "right_ankle":    28,
    "left_heel":     29, "right_heel":     30,
}

ANGLE_NAMES = ["left_knee", "right_knee", "left_hip", "right_hip", "trunk"]
FRAME_OFFSETS = {name: i * 3 for i, name in enumerate(SQUAT_LANDMARKS.keys())}
# left_shoulder→0, right_shoulder→3, left_hip→6, right_hip→9, ...
NUM_FRAMES = 60


def calculate_angle(a, b, c):
    a, b, c = np.array(a), np.array(b), np.array(c)
    ba = a - b
    bc = c - b
    cosine = np.dot(ba, bc) / (np.linalg.norm(ba) * np.linalg.norm(bc) + 1e-6)
    return float(np.degrees(np.arccos(np.clip(cosine, -1.0, 1.0))))

def create_header():
    cols = ["vid_id", "camera_id", "rep_id", "person_id", "correctness"]
    for i in range(NUM_FRAMES):
        for angle in ANGLE_NAMES:
            cols.append(f"frame_{i}_{angle}")
    return cols

def main(input_csv: str, output_csv: str):
    df = pd.read_csv(input_csv)
    # we drop columns are labeled visibility + we also need to drop all non nessesary columns
    # only keep landmarks which are in squat landmarks
    df.drop(columns=[col for col in df.columns if "visibility" in col], inplace=True)

    metadata = df.iloc[:, [0,1,2,4,5]] # here metadata is the first 6 columns
    df = df[[col for col in df.columns if any(f"_landmark_{x}_" in col for x in SQUAT_LANDMARKS.values())]]

    with open(output_csv, mode='w', newline='') as csv_file:
        writer = csv.writer(csv_file)
        writer.writerow(create_header())

        # after we clean the data we need to calculate angles for each frame -> should reduce to 300 features only + 6 metadata
        for index, row in df.iterrows():
            angles = np.zeros((NUM_FRAMES, len(ANGLE_NAMES))) 
            for i in range(0, len(df.columns), 30): # we iterate thorugh each frame (10 landmarks * 3 coords)
                ls = row.iloc[i + FRAME_OFFSETS["left_shoulder"]:i + FRAME_OFFSETS["left_shoulder"] + 2]
                rs = row.iloc[i + FRAME_OFFSETS["right_shoulder"]:i + FRAME_OFFSETS["right_shoulder"] + 2]
                lh = row.iloc[i + FRAME_OFFSETS["left_hip"]:i + FRAME_OFFSETS["left_hip"] + 2]
                rh = row.iloc[i + FRAME_OFFSETS["right_hip"]:i + FRAME_OFFSETS["right_hip"] + 2]
                lk = row.iloc[i + FRAME_OFFSETS["left_knee"]:i + FRAME_OFFSETS["left_knee"] + 2]
                rk = row.iloc[i + FRAME_OFFSETS["right_knee"]:i + FRAME_OFFSETS["right_knee"] + 2]
                la = row.iloc[i + FRAME_OFFSETS["left_ankle"]:i + FRAME_OFFSETS["left_ankle"] + 2]
                ra = row.iloc[i + FRAME_OFFSETS["right_ankle"]:i + FRAME_OFFSETS["right_ankle"] + 2]
                lhe = row.iloc[i + FRAME_OFFSETS["left_heel"]:i + FRAME_OFFSETS["left_heel"] + 2]
                rhe = row.iloc[i + FRAME_OFFSETS["right_heel"]:i + FRAME_OFFSETS["right_heel"] + 2]
                # we can now calculate the angles

                angles[i // 30, 0] = calculate_angle(la, lk, lh)
                angles[i // 30, 1] = calculate_angle(ra, rk, rh)
                angles[i // 30, 2] = calculate_angle(ls, lh, lk)
                angles[i // 30, 3] = calculate_angle(rs, rh, rk)

                # Calculate midpoints
                mid_shoulder = (np.array(ls) + np.array(rs)) / 2
                mid_hip = (np.array(lh) + np.array(rh)) / 2

                # Create vertical reference vector (pointing up)
                vertical_ref = np.array([0, -1])  # or [0, 1] depending on your coordinate system

                # Calculate the trunk vector
                trunk_vector = mid_shoulder - mid_hip

                # Normalize to unit vector
                trunk_vector_normalized = trunk_vector / np.linalg.norm(trunk_vector)

                # Calculate angle against vertical
                trunk = np.degrees(np.arccos(np.dot(trunk_vector_normalized, vertical_ref)))
                angles[i // 30, 4] = trunk
            
            # flatten array and write to csv?
            angles_flat = angles.flatten().tolist()
            metadata_flat = metadata.iloc[index].tolist()
            output_row = metadata_flat + angles_flat
            writer.writerow(output_row)

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python landmark_to_angle_squat.py <input landmark csv> <output angle csv>")
        sys.exit(1)
    elif not os.path.exists(sys.argv[1]):
        print(f"Error: Input file {sys.argv[1]} does not exist.")
        sys.exit(1)
    elif os.path.exists(sys.argv[2]):
        print(f"Output file {sys.argv[2]} already exists. Continuing may have unintended consequences")
        response = input("Do you want to continue? (y / n): ")
        if response.lower() != "y":
            sys.exit(0)
    else:
        main(sys.argv[1], sys.argv[2])