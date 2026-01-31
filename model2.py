import json
import warnings
import logging
from transformers import pipeline, logging as hf_logging

# --- 1. CONFIGURATION & CLEANUP ---
warnings.filterwarnings("ignore")
hf_logging.set_verbosity_error()
logging.getLogger("transformers").setLevel(logging.ERROR)

JSON_FILE = "fraud_signals_demo.json"
MODEL_NAME = "EleutherAI/gpt-neo-1.3B" 
# Note: On Mac M1/M2/M3, use device="mps" below for speed. On Windows, use device=-1 (CPU) or 0 (GPU).

# --- 2. THE RISK ENGINE (Python Logic) ---
def assign_risk_score(post):
    """
    Categorizes a post into HIGH, MEDIUM, or LOW risk based on rules.
    This fulfills the 'Deterministic Guardrails' requirement.
    """
    text = post.get('text', '').lower()
    category = post.get('category_hint', 'unknown')
    
    # RULE 1: Fraud is always HIGH risk
    if category == 'fraud':
        return "HIGH"
    
    # RULE 2: Service issues with negative sentiment are MEDIUM
    if category == 'service' and post.get('sentiment') == 'negative':
        return "MEDIUM"
        
    # RULE 3: Rumors about security/data are HIGH
    if category == 'rumour' and any(x in text for x in ['leak', 'hack', 'breach', 'security']):
        return "HIGH"

    # Default to LOW (Noise/General Sentiment)
    return "LOW"

def load_and_analyze_data(filepath):
    try:
        with open(filepath, 'r') as f:
            data = json.load(f)
    except FileNotFoundError:
        return "System Error: Database not found."

    # --- AUTOMATIC CATEGORIZATION ---
    # We loop through all 80 posts and tag them
    risk_counts = {"HIGH": 0, "MEDIUM": 0, "LOW": 0}
    high_risk_posts = []

    for post in data:
        # 1. Assign Risk
        risk_level = assign_risk_score(post)
        
        # 2. Count it
        risk_counts[risk_level] += 1
        
        # 3. Save High Risk items for the AI to read
        if risk_level == "HIGH":
            high_risk_posts.append(f"- [{post['platform']}] {post['text']}")

    # --- BUILD THE 'BRAIN' CONTEXT ---
    # This string is what the AI 'sees' before it answers you.
    context = (
        f"EXECUTIVE RISK DASHBOARD:\n"
        f"--------------------------------\n"
        f"TOTAL SIGNALS SCANNED: {len(data)}\n"
        f"🔴 HIGH RISK (Fraud/Security): {risk_counts['HIGH']}\n"
        f"🟠 MEDIUM RISK (Service Ops): {risk_counts['MEDIUM']}\n"
        f"🟢 LOW RISK (General Chatter): {risk_counts['LOW']}\n"
        f"--------------------------------\n\n"
        f"LATEST HIGH PRIORITY ALERTS:\n"
    )
    
    # Add the last 5 high risk posts as evidence
    for log in high_risk_posts[-5:]:
        context += f"{log}\n"
    
    return context

def main():
    print(f"🔄 Booting Risk Engine & AI Model... ")
    
    # Load Model
    # CHANGE device="mps" if you are on Mac M1/M2. Keep device=-1 for Windows CPU.
    generator = pipeline('text-generation', model=MODEL_NAME, device=-1) 

    print("\n" + "="*50)
    print("✅ MASHREQ AI SENTINEL: ONLINE")
    print("   Risk Categorization Module: ACTIVE")
    print("="*50 + "\n")

    # Load data and run the risk engine
    context_data = load_and_analyze_data(JSON_FILE)
    
    # Show the stats to the user immediately (Good for the Demo!)
    print(context_data) 

    while True:
        try:
            user_input = input("Analyst > ")
            if user_input.lower() in ['exit', 'quit']:
                break
            
            # Construct Prompt
            prompt = (
                f"{context_data}\n"
                f"Analyst Question: {user_input}\n"
                f"Executive Answer:"
            )

            print("Thinking...", end="\r")
            
            output = generator(
                prompt, 
                max_new_tokens=80,
                do_sample=True, 
                temperature=0.5,
                repetition_penalty=1.2,
                pad_token_id=50256,
                truncation=True
            )

            full_text = output[0]['generated_text']
            answer = full_text.split("Executive Answer:")[-1].strip()
            
            if "Analyst Question" in answer:
                answer = answer.split("Analyst Question")[0]

            print(f"AI > {answer}\n")

        except KeyboardInterrupt:
            break

if __name__ == "__main__":
    main()``