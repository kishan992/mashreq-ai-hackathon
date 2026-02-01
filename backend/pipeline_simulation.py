import sys
import os
import time

# Fix imports to allow running from inside backend folder
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from backend.models.inference_engine import LlamaInferenceEngine
from backend.services.risk_manager import RiskManager
from backend.services.action_executor import ActionExecutor

def run_simulation():
    # 1. Initialize
    print("--- STARTING MASHREQ AI PIPELINE ---\n")
    engine = LlamaInferenceEngine()
    risk_mgr = RiskManager()
    executor = ActionExecutor()
    
    # 2. Dummy Data (Since we can't scrape)
    dummy_signals = [
        "I think the Mashreq mobile app is down, I get error 503",
        "Watch out, there is a phishing SMS pretending to be Mashreq!",
        "I love the new credit card design, very sleek."
    ]
    
    # 3. Process Loop
    for signal in dummy_signals:
        print(f"\n[INCOMING SIGNAL] {signal}")
        
        # Zone 1: Inference
        ai_result = engine.analyze_signal(signal)
        print(f" > AI Classification: {ai_result['category']} ({ai_result['confidence']*100}%)")
        
        # Zone 2: Governance
        risk_eval = risk_mgr.assess_risk(ai_result)
        print(f" > Governance Check: RISK LEVEL {risk_eval['risk_level']}")
        
        if risk_eval['requires_human_approval']:
            print("   [STOP] 🛑 HUMAN APPROVAL REQUIRED IN DASHBOARD...")
            time.sleep(1.5) # Dramatic pause for demo
            print("   [USER] 👤 Analyst Clicked 'APPROVE'")
            
            # Zone 3: Action
            executor.execute_actions({**ai_result, "signal": signal, **risk_eval})
        else:
            print("   [INFO] Auto-archived (Low Risk)")
            
    print("\n--- SIMULATION COMPLETE ---")

if __name__ == "__main__":
    run_simulation()