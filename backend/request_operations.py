import firebase_admin
from firebase_admin import credentials, firestore
from datetime import datetime

# Initialize Firebase with the same credentials
cred = credentials.Certificate({
    "type": "service_account",
    "project_id": "lingolab-7a64d",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDmEvYEonjcr+nY\nTVq0lUKNnNCZYF5pszv0IYy6a0vwbj4XqSZlVmPVmK/E0S+GDR9ZocZCjvcRoGd7\nze6boJdVQaBbJQnkWHBLPQRITbthgAUUI31WHCCBH1dnDBbXOIH7iR5b95hBf+No\nwa9Wt6akq1fWu6J1HX00O8b5oKeY7bX6Yudzod+0Cn44o5SvD4t59JsfQj9Z9vUq\nM5gbEMKTemPUnXZ4FPGxaS5UZ/TnpCUhZJf8OJalHfCVJjFvgGo6EnhLfXnQ4Wdq\n8YHe72C+M5Q69HQT2ZsDnl1v7njcd+DRQ7b9JCrO+xll2v0idWb/Q9JZuvYcSqqd\noNLOOYUFAgMBAAECggEAAyvMT7EKvruF3k2wvpkfUzV03xtCvoEcXcazp+Fh7G90\nw19NVmncVRYnKgr1OKYrfspSQ3iInAgw0ZSFprB50iFmFqZ16HglKcPkc6panBqn\nUja2ECPnrxoGxnM4EynMuQ0NDtV/nRMUM9QjlWhewgVg+tj9RNfPp+OfWWCPg9rh\nDb74jssOkU1U05Rm8fbJfAukuLtlccecSvnjbUS520Z40ql8b2ZS0n6To22pFjZT\niqmWJ2lNqxsnDCmlNWOlsZzj77m0joDHlmYNvVY8VPdCD6ToWNoa3Z2e4Qio2OYK\nJaAe6yTjDq7owndFr/qmpIoEeZOeuwCLPXGdyP3B6wKBgQDzTsL4eOl/ZnIVHb/x\niPI5glOdNzEMd3ygCy3vd19RnelCIJm1J3pQdm5RDaMhzqohQgeE2VpJPNy7gt8L\nuI0tT/IxRFmoXrQqb1ii3BCk55AE2dR3yCNCBqxQzW5mjkvwOQl8cm1ukomuzAxJ\nNq3amkMAMxZ/01MWBi4xfzJ/ywKBgQDyE3jbOuE4EbhqCkZcYSHHoRu05Z/zC6Vh\n8IOb8i0mpWsY5PqqfPOHAcwd0zXGB5vhoMS+EclUdV1ZGCM2mt3PQjhNDvuksqlJ\nLbK2Ld+FbxomxvHSfnanOnTdxNdo88YjcxPG7PKYxIxdJuQhnGddIXoKjWsTAzzq\nxg6W0IDUbwKBgDvnwIl8+8CqcJxSXtgRZ9JRDFVBKYpwQPcGyaCUO5vUzYHClRXN\nSohVIIREX04LnEfkAgXrnhc6LP7eEhzIq7nkXTVUJt8VsjZgg+pVVKPFf+gx2eZE\nGKpBClw6uFv33SqgYH2LjvYSjmPDSaMdG2Efai+6ZGfEmEhr7SOytbRRAoGBANpQ\ndU5Ba5wFXytC2PG3J5/BzBr4e6fVePE613ZskguoY02wM+BNj9LR7CN5t6VAd3Sk\naMqBf/CLaARRoHA+eovQTLYyLP/7oHA+pk1mUY8lA5C1GqGbK6blMUBPpXUhZC/U\nOKHOT3s2xt+7k0I8q3tyFX4uy8H5yZZxx/Z7U7RBAoGANV5W3bdWPHn9C3YxRHx3\ndTLXm/ve9G4eOk9sfMXOxGNhzFvCddbI3TJmqgHsVZ0AWc+M4GwyTDo1pO4EWOMP\nSZzgQwd45NWcwaotTJUCydDGT8186yO2qxvVCu9JTNcj+jtYrB4vds7d0OggP7no\nTG4SgqOnhYzRzMZ+IX3LdPs=\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-fbsvc@lingolab-7a64d.iam.gserviceaccount.com",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "apiKey": "AIzaSyDBQQED2XzO-Pew1JFUA1rkJVH7lFnoWo8",
    "authDomain": "lingolab-7a64d.firebaseapp.com",
    "projectId": "lingolab-7a64d",
    "storageBucket": "lingolab-7a64d.firebasestorage.app",
    "messagingSenderId": "10866214502",
    "appId": "1:10866214502:web:666ecebf0e332fa5fe4fa7",
    "measurementId": "G-3RZCX4P1KG"
})

# Initialize the app if it hasn't been initialized already
try:
    app = firebase_admin.initialize_app(cred)
except ValueError:
    app = firebase_admin.get_app()

db = firestore.client()

def submit_definition_request(word, current_definition, new_definition, field_type, current_upvotes, current_downvotes):
    """
    Submit a request to change a word's definition
    
    Args:
        word (str): The word to change
        current_definition (str): Current definition
        new_definition (str): Proposed new definition
        field_type (str): Scientific field (biology, chemistry, etc.)
        current_upvotes (int): Current number of upvotes on the word
        current_downvotes (int): Current number of downvotes on the word
    """
    try:
        doc_id = f"{word.lower()}-{field_type.lower()}"
        
        # Create the request document
        request_data = {
            'word': word,
            'field_type': field_type.lower(),
            'current_definition': current_definition,
            'proposed_definition': new_definition,
            'current_upvotes': current_upvotes,
            'current_downvotes': current_downvotes,
            'status': 'pending',
            'timestamp': datetime.now()
        }
        
        # Check if a pending request already exists
        doc_ref = db.collection('definition_requests').document(doc_id)
        doc = doc_ref.get()
        
        if doc.exists and doc.to_dict().get('status') == 'pending':
            print(f"A pending request for '{word}' in {field_type} already exists.")
            return False
            
        # Add the new request
        doc_ref.set(request_data)
        print(f"Successfully submitted definition change request for '{word}'")
        return True
        
    except Exception as error:
        print(f"Error submitting definition request: {error}")
        raise error

def process_definition_request(request_id, approve=True):
    """
    Process a definition change request
    
    Args:
        request_id (str): The ID of the request
        approve (bool): True to approve, False to reject
    """
    try:
        # Get the request document
        request_ref = db.collection('definition_requests').document(request_id)
        request_doc = request_ref.get()
        
        if not request_doc.exists:
            raise ValueError(f"Request {request_id} not found")
            
        request_data = request_doc.to_dict()
        
        if request_data['status'] != 'pending':
            print(f"Request {request_id} has already been {request_data['status']}")
            return False
        
        new_status = 'approved' if approve else 'rejected'
        
        # If approving, update the original word's definition
        if approve:
            word_id = request_data['word'].lower().replace(r'[^a-z0-9]', '-')
            word_ref = db.collection(request_data['field_type']).document(word_id)
            
            # Update the definition while preserving other fields
            word_ref.update({
                'definition': request_data['proposed_definition'],
                'last_updated': datetime.now()
            })
            print(f"Updated definition for {request_data['word']}")
        
 # Delete the request document after processing
        request_ref.delete()
        print(f"Request {request_id} has been {'approved' if approve else 'rejected'} and deleted.")
        return True
        
    except Exception as error:
        print(f"Error processing definition request: {error}")
        raise error

def get_pending_requests():
    """Get all pending definition change requests"""
    try:
        docs = (db.collection('definition_requests')
                .where('status', '==', 'pending')
                .stream())
        
        requests = []
        for doc in docs:
            request_data = doc.to_dict()
            requests.append({
                'id': doc.id,
                **request_data
            })
            
        # Sort by votes (highest voted requests first)
        requests.sort(key=lambda x: x['current_upvotes'] - x['current_downvotes'], reverse=True)
            
        return requests
        
    except Exception as error:
        print(f"Error getting pending requests: {error}")
        raise error

def print_request_details(request):
    """Helper function to print request details nicely"""
    print(f"\nRequest ID: {request['id']}")
    print(f"Word: {request['word']} ({request['field_type']})")
    print(f"Current Definition: {request['current_definition']}")
    print(f"Proposed Definition: {request['proposed_definition']}")
    print(f"Current Votes: ↑{request['current_upvotes']} ↓{request['current_downvotes']}")
    print(f"Net Vote Score: {request['current_upvotes'] - request['current_downvotes']}")
    print(f"Status: {request['status']}")
    print(f"Submitted: {request['timestamp']}")

# Example usage
if __name__ == "__main__":
    # Submit a new definition request
    submit_definition_request(
        word="Mitochondria",
        current_definition="The powerhouse of the cell",
        new_definition="An organelle that produces cellular energy through ATP synthesis",
        field_type="biology",
        current_upvotes=15,  # Including vote data for moderator reference
        current_downvotes=3
    )
    
    # Get and display pending requests
    print("\nPending Definition Change Requests:")
    pending = get_pending_requests()
    for request in pending:
        print_request_details(request)
    
    # Example of processing a request
    # process_definition_request("mitochondria-biology", approve=True)  # Approve
    # process_definition_request("mitochondria-biology", approve=False) # Reject