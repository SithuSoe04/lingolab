import requests
import json


# Define API endpoint
url = "http://localhost:8000/upload-pdf/"

# Path to the PDF file you want to upload
pdf_path = "test/test.pdf"  # Replace with an actual file path

# Output JSON file path
output_json_path = "test/response.json"

# Open the file in binary mode
with open(pdf_path, "rb") as file:
    files = {"file": file}  # Multipart form-data
    try:
        # Send POST request
        response = requests.post(url, files=files)

        # Print response
        print("Status Code:", response.status_code)

        # Save response JSON to a file
        if response.status_code == 200:
            response_json = response.json()
            
            with open(output_json_path, "w", encoding="utf-8") as json_file:
                json.dump(response_json, json_file, indent=4, ensure_ascii=False)

            print(f"Response saved to {output_json_path}")
        else:
            print("Error:", response.text)

    except requests.exceptions.RequestException as e:
        print("Error:", e)
