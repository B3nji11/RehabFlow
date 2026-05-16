import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, confusion_matrix
import xgboost as xgb
from sklearn.utils.class_weight import compute_sample_weight
import sys
import os

def extract_physics_features(x_raw):
    print("Extracting physical features from time-series...")
    features = []
    
    for squat in x_raw: # squat is shape (60, 5)
        squat_features = []
        for angle_idx in range(squat.shape[1]):
            angle_timeline = squat[:, angle_idx]
            
            # The exact physics of the movement
            squat_features.extend([
                np.min(angle_timeline),  
                np.max(angle_timeline),  
                np.mean(angle_timeline),  
                np.std(angle_timeline)    
            ])
        features.append(squat_features)
        
    return np.array(features)

def main(input_file_1: str, input_file_2: str, output_csv: str):
    df = pd.read_csv(input_file_1)
    df1 = pd.read_csv(input_file_2)    

    df = pd.concat([df, df1], ignore_index=True)
    y = df["correctness"].values
    x_flat = np.array(df.iloc[:, 5:])
    x_raw = x_flat.reshape(-1, 60, 5)
    
    X_features = extract_physics_features(x_raw)
    
    correct = y.sum()
    incorrect = len(y) - correct
    print(f"Total Squats: {len(y)} (Correct: {correct}, Incorrect: {incorrect})")
    
    X_train, X_test, y_train, y_test = train_test_split(
        X_features, y, 
        test_size=0.2, 
        random_state=42,
        stratify=y 
    )
    sample_weights = compute_sample_weight('balanced', y_train)

    xgb_model = xgb.XGBClassifier(
        n_estimators=200,
        max_depth=5,            
        learning_rate=0.05,    
        random_state=42,
        eval_metric='logloss'
    )
    
    xgb_model.fit(X_train, y_train, sample_weight=sample_weights)

    # --- EVALUATION ---
    y_pred_xgb = xgb_model.predict(X_test)
    
    print("\n" + "="*40)
    print("XGBOOST PERFORMANCE")
    print("="*40)
    print(classification_report(y_test, y_pred_xgb, target_names=["Incorrect (0)", "Correct (1)"]))
    print("\nConfusion Matrix:")
    print(confusion_matrix(y_test, y_pred_xgb))

    print("Exporting model to json file....")

    xgb_model.save_model(output_csv)

    print("Model saved!")

if __name__ == "__main__":
    if len(sys.argv) != 4:
        print("Usage: python <train_rf_model.py> <input data csv1> <input data csv2> <output json path>")
        sys.exit(1)
    elif not os.path.exists(sys.argv[1]) or not os.path.exists(sys.argv[2]):
        print(f"The input csv file: {sys.argv[1]} or {sys.argv[2]} does not exist")
        sys.exit(1)
    else:
        main(sys.argv[1], sys.argv[2], sys.argv[3])