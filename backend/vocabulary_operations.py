import firebase_admin
from firebase_admin import credentials, firestore
from datetime import datetime
import json

# Initialize Firebase
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

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

app = firebase_admin.initialize_app(cred)
db = firestore.client()

def upload_vocabulary_data(data):
    """
    Upload vocabulary data to Firestore based on scientific field,
    preventing exact duplicates
    """
    try:
        if not isinstance(data, dict) or 'type' not in data or 'words' not in data:
            raise ValueError("Data must be a dictionary with 'type' and 'words' keys")

        field_type = data['type'].lower()
        batch = []
        duplicates = []
        
        for word_data in data['words']:
            doc_id = word_data['word'].lower().replace(r'[^a-z0-9]', '-')
            doc_ref = db.collection(field_type).document(doc_id)
            doc = doc_ref.get()
            
            if doc.exists:
                duplicates.append(word_data['word'])
                continue
            
            # Add new document with voting counts initialized to 0
            doc_ref.set({
                'word': word_data['word'],
                'definition': word_data['definition'],
                'context': word_data['context'],
                'timestamp': datetime.now(),
                'searchableWord': word_data['word'].lower(),
                'upvotes': 0,
                'downvotes': 0
            })
            batch.append(word_data['word'])
        
        # Print results
        if batch:
            print(f"\nSuccessfully added {len(batch)} new words to {field_type} collection:")
            for word in batch:
                print(f"- Added: {word}")
                
        if duplicates:
            print(f"\nSkipped {len(duplicates)} duplicate words in {field_type} collection:")
            for word in duplicates:
                print(f"- Skipped: {word}")
                
        return {
            'added': batch,
            'duplicates': duplicates
        }
        
    except Exception as error:
        print(f"Error uploading vocabulary data: {error}")
        raise error
    
def get_all_vocabulary_by_field(field_type):
    """Retrieve all vocabulary entries from a specific field"""
    try:
        field_type = field_type.lower()
        docs = db.collection(field_type).stream()
        
        vocabulary = []
        for doc in docs:
            vocab_data = doc.to_dict()
            vocabulary.append({
                'id': doc.id,
                **vocab_data
            })
            
        return vocabulary
        
    except Exception as error:
        print(f"Error getting vocabulary for {field_type}: {error}")
        raise error

def search_vocabulary_in_field(field_type, search_term):
    """
    Search vocabulary entries by word within a specific field
    
    Args:
        field_type (str): The scientific field to search in
        search_term (str): Term to search for
    """
    try:
        field_type = field_type.lower()
        # Use a composite query for case-insensitive search
        docs = db.collection(field_type).stream()
        
        results = []
        search_term_lower = search_term.lower().strip()
        if not search_term_lower:  # Ensure empty or space-only searches return no results
            return []

        for doc in docs:
            data = doc.to_dict()
            if search_term_lower in data['searchableWord']:
                results.append({
                    'id': doc.id,
                    **data
                })
            
        if results:
            print(f"\nFound {len(results)} matches in {field_type}:")
            for result in results:
                print(f"Word: {result['word']}")
                print(f"Definition: {result['definition']}")
                print(f"Context: {result['context']}\n")
        else:
            print(f"\nNo matches found for '{search_term}' in {field_type}")
            
        return results
        
    except Exception as error:
        print(f"Error searching vocabulary: {error}")
        raise error

def export_vocabulary_by_field(field_type, output_file=None):
    """
    Export vocabulary data from a specific field to JSON file
    
    Args:
        field_type (str): The scientific field to export
        output_file (str): Optional name of output JSON file
    """
    try:
        field_type = field_type.lower()
        vocabulary = get_all_vocabulary_by_field(field_type)
        
        # Remove technical fields and convert timestamps to strings
        export_data = {
            "type": field_type,
            "words": []
        }
        
        for word in vocabulary:
            # Keep only the essential fields and handle missing fields
            cleaned_word = {
                "word": word["word"],
                "definition": word["definition"],
                "context": word["context"],
                "upvotes": word.get("upvotes", 0),  # Default to 0 if missing
                "downvotes": word.get("downvotes", 0)  # Default to 0 if missing
            }
            export_data["words"].append(cleaned_word)
        
        if output_file:
            # If no file extension provided, add .json
            if not output_file.endswith('.json'):
                output_file = f"{output_file}.json"
        else:
            output_file = f"{field_type}_vocabulary.json"
            
        # Write to JSON file
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(export_data, f, indent=2, ensure_ascii=False)
            
        print(f"Successfully exported {field_type} vocabulary to {output_file}")
        return export_data
        
    except Exception as error:
        print(f"Error exporting vocabulary: {error}")
        raise error


def update_vote(field_type, word_id, vote_type):
    """
    Update upvotes or downvotes for a word
    
    Args:
        field_type (str): The scientific field
        word_id (str): Document ID of the word
        vote_type (str): Either 'upvote' or 'downvote'
    """
    try:
        field_type = field_type.lower()
        doc_ref = db.collection(field_type).document(word_id)
        doc = doc_ref.get()
        
        if not doc.exists:
            raise ValueError(f"Word '{word_id}' not found in {field_type} collection")
        
        if vote_type == 'upvote':
            doc_ref.update({
                'upvotes': firestore.Increment(1)
            })
            print(f"Upvoted word: {word_id}")
        elif vote_type == 'downvote':
            doc_ref.update({
                'downvotes': firestore.Increment(1)
            })
            print(f"Downvoted word: {word_id}")
        else:
            raise ValueError("vote_type must be either 'upvote' or 'downvote'")
            
    except Exception as error:
        print(f"Error updating vote: {error}")
        raise error

def remove_vote(field_type, word_id, vote_type):
    """
    Remove an upvote or downvote from a word
    
    Args:
        field_type (str): The scientific field
        word_id (str): Document ID of the word
        vote_type (str): Either 'upvote' or 'downvote'
    """
    try:
        field_type = field_type.lower()
        doc_ref = db.collection(field_type).document(word_id)
        doc = doc_ref.get()
        
        if not doc.exists:
            raise ValueError(f"Word '{word_id}' not found in {field_type} collection")
        
        current_votes = doc.to_dict().get(f"{vote_type}s", 0)
        if current_votes > 0:
            if vote_type == 'upvote':
                doc_ref.update({
                    'upvotes': firestore.Increment(-1)
                })
                print(f"Removed upvote from word: {word_id}")
            elif vote_type == 'downvote':
                doc_ref.update({
                    'downvotes': firestore.Increment(-1)
                })
                print(f"Removed downvote from word: {word_id}")
            else:
                raise ValueError("vote_type must be either 'upvote' or 'downvote'")
        else:
            print(f"No {vote_type}s to remove for word: {word_id}")
            
    except Exception as error:
        print(f"Error removing vote: {error}")
        raise error

# Example usage
# if __name__ == "__main__":
#     # Example biology terms
#     biology_data = {
#         "type": "biology",
#         "words": [
#             {
#                 "word": "Mitochondria",
#                 "definition": "The powerhouse of the cell, responsible for producing energy.",
#                 "context": "Mitochondria generate most of the cell's supply of ATP, used as a source of chemical energy."
#             }
#         ]
#     }
    
#     # Upload word
#     result = upload_vocabulary_data(biology_data)
    
#     # Example of voting
#     word_id = "mitochondria"  # This is the generated doc_id from the word
#     update_vote("biology", word_id, "upvote")
#     update_vote("biology", word_id, "upvote")
#     update_vote("biology", word_id, "downvote")
    
#     # Example of removing votes
#     remove_vote("biology", word_id, "upvote")

#     biology_terms = {
#     "type": "biology",
#     "words": [
#         {
#             "word": "Photosynthesis",
#             "definition": "Process by which plants convert light energy into chemical energy",
#             "context": "Plants use photosynthesis to produce glucose from sunlight"
#         }
#     ]
# }
# search_vocabulary_in_field("biology", "photo")
# export_vocabulary_by_field("biology", "biology_vocabulary")

