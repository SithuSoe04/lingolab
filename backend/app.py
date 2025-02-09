from fastapi import FastAPI, HTTPException
from typing import List
from pydantic import BaseModel
from vocabulary_operations import *  # Import functions from vocabulary_operations.py
from fastapi.middleware.cors import CORSMiddleware

# Initialize FastAPI app
app = FastAPI()

origins = [
    "http://localhost:3000"  # React development server
    # replace with Production frontend domain
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allow specific frontend origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)


# Define request models for input validation
