from fastapi import FastAPI
from pydantic import BaseModel
import os
import supabase
from dotenv import load_dotenv


# temporary import the xgboost model as a placeholder
import xgboost
MODEL = xgboost.XGBClassifier()
MODEL.load_model("C:/Projects/RehabFlow/ml/MODELS/squats_temp.json")

load_dotenv()
app = FastAPI()
db : supabase.Client = supabase.create_client(
    os.environ.get("SUPABASE_URL"),
    os.environ.get("SUPABASE_KEY")
)

@app.get("/")
def root():
    return {"test":"this is a test"}


