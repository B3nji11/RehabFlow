import numpy as np
data = np.loadtxt("C:/Projects/RehabFlow/UI-PRMD-dataset/Segmented Movements/Vicon/Angles/m01_s01_e01_angles.txt", delimiter=",")
print("Shape:", data.shape)          # rows = frames, cols = ?
print("First row:", data[0, :12])    # first 12 values