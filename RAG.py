import pandas as pd
import ollama
import json
import numpy as np


df = pd.read_csv("hf://datasets/Gaborandi/Lung_Cancer_pubmed_abstracts/lung_cancer.csv")

EMBEDDING_MODEL = 'hf.co/CompendiumLabs/bge-base-en-v1.5-gguf'
LANGUAGE_MODEL = 'hf.co/bartowski/Llama-3.2-1B-Instruct-GGUF'

# Each element in the VECTOR_DB will be a tuple (chunk, embedding)
# The embedding is a list of floats, for example: [0.1, 0.04, -0.34, 0.21, ...]
VECTOR_DB = []

def add_chunk_to_database(chunk):
  if chunk:
    embedding = ollama.embed(model=EMBEDDING_MODEL, input=chunk)['embeddings'][0]
    VECTOR_DB.append((chunk, embedding))


def save_embeddings_to_file(embeddings, filename="embeddings.json"):
    # Convert numpy arrays to lists for JSON serialization
    
    # Prepare the data for JSON serialization
    # Convert tuples to dictionaries and numpy arrays to lists
    json_serializable_list = []
    for chunk, embedding in embeddings:
        # Ensure embedding is a list of floats, even if it's already a list
        if isinstance(embedding, np.ndarray):
            embedding_list = embedding.tolist()
        elif isinstance(embedding, list):
            embedding_list = embedding
        else:
            raise TypeError("Embedding must be a numpy array or a list.")

        entry = {
            "chunk": chunk,
            "embedding": embedding_list
        }
        json_serializable_list.append(entry)

    # Write the list of dictionaries to a JSON file
    with open(filename, 'w') as f:
        json.dump(json_serializable_list, f, indent=4)


dataset = df['abstract'].tolist()
# print first 2 abstracts to verify

for i, chunks in enumerate(dataset):
    if i > 500:
        break
    if not isinstance(chunks, str):
        continue
    for chunk in chunks.split("."):
        add_chunk_to_database(chunk)
    print(f'Added chunk {i+1}/{len(dataset)} to the database')
  
# Save:
save_embeddings_to_file(VECTOR_DB)