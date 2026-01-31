import json
import warnings
import logging
from transformers import pipeline, logging as hf_logging

# --- 1. CONFIGURATION ---
warnings.filterwarnings("ignore")
hf_logging.set_verbosity_error()
logging.getLogger("transformers").setLevel(logging.ERROR)

JSON_FILE = "fraud_signals_demo.json"
MODEL_NAME = "EleutherAI/gpt-neo-1.3B" 
# On Mac M1/M2 use device="mps". On Windows use device=-1.

# --- 2. THE DUAL-ENGINE CLASSIFIER ---
def classify_post(post):
    """
    Determines both RISK LEVEL and SIGNAL TYPE using keyword logic.
    """
    text = post.get('text', '').lower()
    cat_hint = post.get('category_hint', 'unknown')
    sentiment = post.get('sentiment', 'neutral')
    
    # --- A. SIGNAL TYPE CLASSIFIER ---
    if cat_hint == 'fraud' or any(x in text for x in ['scam', 'phish', 'fake', 'hack']):
        signal_type = "FRAUD"
    elif 'news' in text or 'announced' in text or 'official' in text:
        signal_type = "NEWS"
    elif any(x in text for x in ['heard', 'rumor', 'apparently', 'someone said']):
        signal_type = "RUMOR"
    elif cat_hint == 'service' or sentiment in ['positive', 'negative']:
        signal_type = "BRAND_SENTIMENT"
    else:
        signal_type = "NOISE"

    # --- B. RISK ENGINE ---
    if signal_type == "FRAUD":
        risk = "HIGH"
    elif signal_type == "RUMOR" and "data" in text:
        risk = "HIGH"
    elif signal_type == "BRAND_SENTIMENT" and sentiment == "negative":
        risk = "MEDIUM"
    else:
        risk = "LOW"
        
    return signal_type, risk

def load_and_analyze_data(filepath):
    try:
        with open(filepath, 'r') as f:
            data = json.load(f)
    except FileNotFoundError:
        return "System Error: Database not found."

    # --- AGGREGATION LOGIC ---
    stats = {
        "FRAUD": 0, "BRAND_SENTIMENT": 0, "RUMOR": 0, "NEWS": 0, "NOISE": 0
    }
    risks = {"HIGH": 0, "MEDIUM": 0, "LOW": 0}
    
    high_priority_logs = []

    for post in data:
        # Run the Dual-Engine
        sig_type, risk_level = classify_post(post)
        
        # Update Stats
        if sig_type in stats: stats[sig_type] += 1
        if risk_level in risks: risks[risk_level] += 1
        
        # Collect Evidence (Only High Risk)
        if risk_level == "HIGH":
            high_priority_logs.append(f"- [{sig_type}] {post['text']}")

    # --- BUILD THE 'BRAIN' CONTEXT ---
    context = (
        f"MASHREQ SIGNAL INTELLIGENCE DASHBOARD:\n"
        f"========================================\n"
        f"🚨 SIGNAL BREAKDOWN:\n"
        f"   - FRAUD ATTEMPTS:     {stats['FRAUD']}\n"
        f"   - BRAND SENTIMENT:    {stats['BRAND_SENTIMENT']}\n"
        f"   - RUMORS/CHATTER:     {stats['RUMOR']}\n"
        f"   - NEWS MENTIONS:      {stats['NEWS']}\n"
        f"\n"
        f"⚠️ RISK ASSESSMENT:\n"
        f"   - HIGH RISK (Act Now):   {risks['HIGH']}\n"
        f"   - MEDIUM RISK (Monitor): {risks['MEDIUM']}\n"
        f"   - LOW RISK (Safe):       {risks['LOW']}\n"
        f"========================================\n\n"
        f"RECENT HIGH-RISK EVIDENCE LOGS:\n"
    )
    
    # Attach last 5 logs for the AI to read
    for log in high_priority_logs[-5:]:
        context += f"{log}\n"
    
    return context

def main():
    print(f"🔄 Booting Dual-Engine Classifier... ")
    generator = pipeline('text-generation', model=MODEL_NAME, device=-1)

    print("\n" + "="*60)
    print("✅ MASHREQ AI SENTINEL: ONLINE")
    print("="*60 + "\n")

    # Load & Classify
    context_data = load_and_analyze_data(JSON_FILE)
    
    # PRINT THE DASHBOARD (This is the money shot for your video!)
    print(context_data) 

    while True:
        try:
            user_input = input("Analyst > ")
            if user_input.lower() in ['exit', 'quit']:
                break
            
            prompt = (
                f"{context_data}\n"
                f"Analyst Question: {user_input}\n"
                f"Executive Answer:"
            )

            print("Thinking...", end="\r")
            
            output = generator(
                prompt, 
                max_new_tokens=85,
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
    main()