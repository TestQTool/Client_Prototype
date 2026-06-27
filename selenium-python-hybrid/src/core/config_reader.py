import os
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()

def get(key: str, default: str = "") -> str:
    return os.getenv(key, default)
