#### This file contains OpenAI API call
#### for functionality
#### 
#### uvicorn gpt_api:app --reload --host 0.0.0.0 --port 8000



from fastapi import FastAPI, HTTPException, UploadFile, File, Request
from pydantic import BaseModel
import openai
import os
import fitz
import logging
from typing import List
from fastapi.middleware.cors import CORSMiddleware
import gpt_prompts
import json
from dotenv import load_dotenv
from vocabulary_operations import *
from request_operations import *

load_dotenv()


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

# OpenAI API Key (load from env variables)
client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Configure Logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class PDF_File(BaseModel):
    pdf_string: str

def extract_text_from_pdf(pdf_bytes):
    """Extracts text from a PDF file."""
    try:
        doc = fitz.open(stream=pdf_bytes, filetype="pdf")
        text = "\n".join([page.get_text("text") for page in doc])
        return text
    except Exception as e:
        logger.error(f"PDF extraction error: {e}")
        raise HTTPException(status_code=500, detail="Error extracting text from PDF")

def chunk_text(text, chunk_size=4000):
    """Splits text into chunks to fit OpenAI's token limit."""
    return [text[i:i+chunk_size] for i in range(0, len(text), chunk_size)]


### input: pdf file string
### output: json file with identified word, definition, context
@app.post("/generate/")
async def generate_definition(pdf_file: PDF_File):
    try:
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": "You are an amateur research assistant that analyzes text from documents to identify its scientific discipline, and identify difficult or technical words and provide their definitions and context. Your output should be a discipline identifier and a structured list of words along with their definitions and context."},
                {"role": "user", "content": gpt_prompts.COMMON_PROMPT + f"""---Parsed PDF File Text: {pdf_file.pdf_string}---"""}
            ],
            tools=[
                {
                    "type": "function",
                    "function": {
                        "name": "extract_hard_words",
                        "description": "Extract difficult words from a document and provide definitions along with their context.",
                        "parameters": {
                            "type": "object",
                            "properties": {
                                "type": {
                                    "type": "string",
                                    "enum": ["mathematics", "chemistry", "physics", "computer science", "biology"],
                                    "description": "The scientific discipline that the PDF belongs to. Must be exactly one of: mathematics, chemistry, physics, computer science, or biology."
                                },
                                "words": {
                                    "type": "array",
                                    "description": "A list of words and phrases that may be technical, field-specific, or difficult for beginners, including standalone words from longer phrases. If a phrase has an abbreviation or contains a difficult standalone word, include both. Be inclusive and extract as many relevant terms as possible.",
                                    "items": {
                                        "type": "object",
                                        "properties": {
                                            "word": {
                                                "type": "string",
                                                "description": "The identified difficult word."
                                            },
                                            "definition": {
                                                "type": "string",
                                                "description": "The definition of the difficult word."
                                            },
                                            "context": {
                                                "type": "string",
                                                "description": "A detailed explanation of how the word is used in the document. Do NOT simply copy a sentence where it appears; instead, describe its role in the discussion."
                                            }
                                        },
                                        "required": ["word", "definition", "context"]
                                    }
                                }
                            },
                            "required": ["type", "words"]
                        }
                    }
                }
            ],
            temperature=0.3
        

        )
    except openai.OpenAIError as e:
        logger.error(f"OpenAI API error: {e}")
        raise HTTPException(status_code=500, detail="Error with OpenAI API")
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
    logger.info(f"OpenAI Raw Response: {response}")

    function_response = json.loads(response.choices[0].message.tool_calls[0].function.arguments)
    return {"response": function_response}



@app.post("/upload-pdf/")
async def upload_pdf(file: UploadFile = File(...)):
    """Handles PDF uploads, extracts text, and processes difficult words."""
    try:
        # Read file content
        pdf_bytes = await file.read()
        extracted_text = extract_text_from_pdf(pdf_bytes)

        # Chunk text if too long
        chunks = chunk_text(extracted_text)
        
        all_words = [] 
        discipline = ""
        for chunk in chunks:
            response = await generate_definition(PDF_File(pdf_string=chunk))

            if response and response["response"]:
                words = response["response"].get("words", [])  # Extract words
                all_words.extend(words)  # ✅ Merge words into a single list
                discipline = response["response"].get("type")
            else:
                logger.warning(f"Skipping empty response for chunk: {chunk[:100]}...")

        if not all_words:
            raise HTTPException(status_code=500, detail="No valid words found in PDF.")
        logger.info("====="*8)
        logger.info("====="*8)
        logger.info("====="*8)
        dataObject = {"type": discipline, "words": all_words}
        upload_vocabulary_data(dataObject)
        return {"type": discipline, "words": all_words}

    except Exception as e:
        logger.error(f"File upload error: {e}")
        raise HTTPException(status_code=500, detail="Error processing uploaded PDF")


class VocabularyData(BaseModel):
    type: str
    words: List[dict]

# Example: Upload vocabulary data
@app.post("/upload-vocabulary")
async def upload_vocabulary(data: VocabularyData):
    try:
        result = upload_vocabulary_data(data.dict())
        return {"status": "success", "data": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Example: Search vocabulary
@app.get("/search-vocabulary/{field_type}/{search_term}")
async def search_vocabulary(field_type: str, search_term: str):
    try:
        result = search_vocabulary_in_field(field_type, search_term)
        return {"status": "success", "data": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Example: Export vocabulary data
@app.get("/export-vocabulary/{field_type}")
async def export_vocabulary(field_type: str, output_file: str = None):
    try:
        result = export_vocabulary_by_field(field_type, output_file)
        return {"status": "success", "data": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/vocabulary/{field_type}")
async def get_vocabulary_by_field(field_type: str):
    try:
        # Retrieve all vocabulary entries for the specified field type
        vocabulary = get_all_vocabulary_by_field(field_type)
        
        if not vocabulary:
            raise HTTPException(status_code=404, detail="No vocabulary found for this field type.")
        
        return {"status": "success", "data": vocabulary}
    
    except Exception as e:
        logger.error(f"Error retrieving vocabulary for {field_type}: {e}")
        raise HTTPException(status_code=500, detail="Error retrieving vocabulary data.")



##I want a route that calls gptapi to check whether or not its a singular
@app.get("/generate-singular-definition/{field_type}/{search_term}")
async def generate_singular_definition(field_type: str, search_term: str):
    try:
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": "You are an science expert that provides definitions for words with respect to a scientific discipline to amateur readers of scientific literature. If the word is not relevant to the given discipline, return \"The word is not relevant to the given discipline\" as the definition."},
                {"role": "user", "content": f"""Provide a concise definition for the word \"{search_term}\" with respect to the {field_type} discipline. If the word is not relevant to the given discipline, return \"The word is not relevant to the given discipline\" as the definition."""}
            ],
            tools=[
                {
                    "type": "function",
                    "function": {
                        "name": "provide_definition",
                        "description": "Provides concise definition for a word in respect to a given scientific discipline.",
                        "parameters": {
                            "type": "object",
                            "properties": {
                                "definition": {
                                    "type": "string",
                                    "description": "The definition of the word. **Must be the string \"The word is not relevant to the given discipline\" if the word is not specifically relevant to the given scientific discipline.**"
                                }
                            },
                            "required": ["definition"]
                        }
                    }
                }
            ],
            temperature=0.3
        )
    except openai.OpenAIError as e:
        logger.error(f"OpenAI API error: {e}")
        raise HTTPException(status_code=500, detail="Error with OpenAI API")
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
    logger.info(f"OpenAI Raw Response: {response}")

    response = json.loads(response.choices[0].message.tool_calls[0].function.arguments)
    definition = response["response"].get("definition")
    dataObject = {"type": field_type, "words": { "word": search_term, "definition": definition, "context": "Currently unavailable" }}
    upload_vocabulary_data(dataObject)
    return dataObject


@app.post("/process-definition-request/{request_id}/{approve}")
async def process_definition_request_api(request_id: str, approve: bool):
    """Endpoint to approve or reject a definition change request."""
    try:
        success = process_definition_request(request_id, approve)
        if success:
            return {"status": "success", "message": f"Request {request_id} processed"}
        else:
            raise HTTPException(status_code=400, detail=f"Request {request_id} could not be processed.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/pending-requests/")
async def get_pending_requests_api():
    """Endpoint to get all pending definition change requests."""
    try:
        requests = get_pending_requests()
        return {"status": "success", "data": requests}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@app.post("/submit-definition-request")
async def submit_definition_request_api(request: Request):
    """
    Endpoint to submit a definition change request.
    """
    try:
        data = await request.json()  # Parse raw JSON request
        success = submit_definition_request(
            word=data["word"],
            current_definition=data["currentDefinition"],
            new_definition=data["newDefinition"],
            field_type=data["fieldType"],
            current_upvotes=data["currentUpvotes"],
            current_downvotes=data["currentDownvotes"]
        )
        
        if success:
            return {"status": "success", "message": "Definition change request submitted successfully!"}
        else:
            raise HTTPException(status_code=400, detail="A pending request for this word already exists.")
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))