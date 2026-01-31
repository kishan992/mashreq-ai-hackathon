import json
from transformers import pipeline

# --- CONFIGURATION ---
JSON_FILE_PATH = "fraud_signals_demo.json" # Make sure this matches your file name
MODEL_NAME = "EleutherAI/gpt-neo-1.3B"

def load_and_format_data(filepath):
    """
    Reads the JSON and converts it into a text context the LLM can understand.
    """
    try:
        with open(filepath, 'r') as f:
            data = json.load(f)
    except FileNotFoundError:
        print("Error: JSON file not found.")
        return ""

    # Convert JSON list to a clean text block for the AI
    context_text = "Here is a dataset of recent social media posts regarding Mashreq Bank:\n\n"
    for item in data:
        context_text += (
            f"- Post ID {item['id']} on {item['platform']}: "
            f"\"{item['text']}\" "
            f"(Risk: {item['risk_level']}, Category: {item.get('category_hint', 'Unknown')})\n"
        )
    return context_text

def main():
    print(f"Loading {MODEL_NAME}... (This may take a few minutes the first time)")
    # We use a text-generation pipeline. 
    # device=-1 runs on CPU. Change to device=0 if you have a GPU (requires CUDA).
    generator = pipeline('text-generation', model=MODEL_NAME, device=-1) 
    
    # Load the "Brain" (Context)
    context_data = load_and_format_data(JSON_FILE_PATH)
    
    if not context_data:
        return

    print("\n" + "="*40)
    print("✅ MODEL LOADED. AI IS READY.")
    print("Ask questions like: 'What are the main fraud threats?' or 'Summarize the risks.'")
    print("Type 'exit' to quit.")
    print("="*40 + "\n")

    while True:
        user_question = input("You: ")
        if user_question.lower() in ['exit', 'quit']:
            break

        # --- CONSTRUCT THE PROMPT ---
        # We sandwich the data and the question so the model answers based on the file.
        prompt = (
            f"{context_data}\n"
            f"Question: Based on the dataset above, {user_question}\n"
            f"Answer:"
        )

        # Generate response
        # max_new_tokens controls how long the answer is.
        # do_sample=True allows for more natural/creative phrasing.
        output = generator(
            prompt, 
            max_new_tokens=100, 
            do_sample=True, 
            temperature=0.7,
            pad_token_id=50256
        )

        # Clean up the output to show only the answer
        full_text = output[0]['generated_text']
        answer = full_text.split("Answer:")[-1].strip()

        print(f"AI: {answer}\n")

if __name__ == "__main__":
    main()