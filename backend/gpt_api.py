#### This file contains OpenAI API call
#### for functionality
#### 
#### uvicorn gpt_api:app --reload --host 0.0.0.0 --port 8000



from fastapi import FastAPI, HTTPException, UploadFile, File
from pydantic import BaseModel
import openai
import os
import fitz
import logging
from fastapi.middleware.cors import CORSMiddleware
import gpt_prompts
import json
from dotenv import load_dotenv

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
                {"role": "system", "content": "You are an AI assistant that analyzes text from documents to identify difficult words and provide their definitions and context. Your output should be a structured list of words along with their definitions and context."},
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
                                    "enum": ["data"],
                                    "description": "The type of response, always 'data'."
                                },
                                "words": {
                                    "type": "array",
                                    "description": "A list of objects containing difficult words, their definitions, and context.",
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
                                                "description": "A sentence or phrase from the text that includes the word to provide context."
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

        for chunk in chunks:
            response = await generate_definition(PDF_File(pdf_string=chunk))

            if response and response["response"]:
                words = response["response"].get("words", [])  # Extract words
                all_words.extend(words)  # ✅ Merge words into a single list
            else:
                logger.warning(f"Skipping empty response for chunk: {chunk[:100]}...")

        if not all_words:
            raise HTTPException(status_code=500, detail="No valid words found in PDF.")
        logger.info("====="*8)
        logger.info("====="*8)
        logger.info("====="*8)
        return {"type": "data", "words": all_words}

    except Exception as e:
        logger.error(f"File upload error: {e}")
        raise HTTPException(status_code=500, detail="Error processing uploaded PDF")