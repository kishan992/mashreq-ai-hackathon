# 🛡️ Mashreq Social Signal Intelligence Engine (MSSIE)
### *Responsible AI for Brand Resilience & Risk Governance*

[![Python](https://img.shields.io/badge/Python-3.9%2B-blue?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-yellow?style=for-the-badge&logo=javascript&logoColor=white)]()
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Hackathon_Submission-orange?style=for-the-badge)]()

---

## 📖 Executive Summary

In banking, panic travels faster than a transaction. A single unverified rumor or a viral sentiment shift—like "someone got my bank info"—can destabilize brand trust in minutes.

The **Social Signal Intelligence Engine** is a digital immune system for Mashreq Bank. It is designed to proactively monitor, analyze, and govern social risks before they escalate.

Unlike standard chatbots, this is a **Human-in-the-Loop Intelligence Layer** that empowers employees to detect threats without compromising user privacy.

### 🚀 How It Works

1.  **Detection & Ingestion:**
    The system is configured to monitor global networking sites, social media discussions, and online forums. It filters for high-risk keywords and detects negative sentiment shifts that could impact the bank's image.

2.  **Privacy-First Risk Analysis:**
    Upon detecting a signal, the AI categorizes the risk based on its confidence rating and instantly notifies Mashreq employees via the **Employee Dashboard**. It also generates a periodic **Risk Summary Report** to track trends and actions. This document strictly excludes all **Personally Identifiable Information (PII)**. We track the *risk*, not the *customer*.

3.  **Governance & Recommendation:**
    The AI does not act alone. It provides the security team with **Actionable Recommendations** (e.g., "Approve," "Escalate," or "Dismiss"), which are directly accessible through the specialized dashboard interface.

4.  **The Decision Gate:**
    An authorized employee reviews the intelligence. Only after **human approval** is the risk report escalated to leadership or the response protocol activated, notifying the customer as required.

**Result:** A system that combats misinformation with speed, accuracy, and total compliance, while keeping the customer experience smooth.
---

## 🏗️ System Architecture

Our solution is divided into three strictly isolated security zones to ensure compliance with Mashreq's data sovereignty policies.

### 🔹 Zone 1: Secure Data Ingestion (The Brain)
* **Input:** Synthetic Social Data Stream (No Live Scraping).
* **Processing:** Local Inference Node (Simulating Llama 3.1 405B).
* **Output:** Classifies signals into *Fraud*, *Service Incident*, *Brand Sentiment*, or *Misinformation*.

<img src="AI%20Flowchart/zone1-pipeline.png" width="600" alt="Zone 1 Architecture">

### 🔸 Zone 2: Governance & Compliance (The Guardrails)
* **Logic:** The "Risk Scoring Engine" evaluates confidence levels.
* **The Checkpoint:** High-risk alerts (>85% Confidence) trigger a **Decision Gate**.
* **Dashboard:** Analysts review AI reasoning before approving execution.

<img src="AI%20Flowchart/zone2-pipeline.png" width="400" alt="Zone 2 Architecture">

### 🟢 Zone 3: Authorized Execution (The Action)
* **Approved:** Once a human clicks "Approve," the system executes parallel responses.
* **Actions:** Updates Chatbot Knowledge Base, Pushes App Notifications, and Generates Executive Briefings.

<img src="AI%20Flowchart/zone3-pipeline.png" width="600" alt="Zone 3 Architecture">

---

## 🛠️ Tech Stack

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | `HTML5`, `CSS3`, `JavaScript` | Responsive Employee Dashboard & Customer Interface. |
| **Backend AI** | `Python` | Logic for Risk Classification & Confidence Scoring. |
| **Data** | `JSON` | Synthetic dataset management (No live scraping). |
| **Flow** | `Mermaid.js` | Architecture visualization and planning. |
---

✅ Compliance & Responsible AI Statement
This project adheres strictly to the Mashreq Hackathon Guidelines:

No Live Scraping: We utilize a pre-generated synthetic-sentiment-data.json dataset to simulate social media traffic, respecting platform TOS.

On-Premise Architecture: The system is designed to run local quantized models, ensuring zero data leakage to public APIs.

Human Oversight: The "Zone 2" architecture guarantees that no high-risk action (e.g., sending alerts) occurs without explicit human verification.

## 📂 Repository Structure

```text
/MASHREQ-AI-HACKATHON
│
├── /AI Flowchart           # Architecture Diagrams (Zone 1, 2, 3)
│
├── /backend                # Python Logic Core
│   ├── /config             # Compliance settings & Thresholds
│   ├── /models             # AI Inference Logic (Llama 3.1 wrappers)
│   ├── /services           # Risk Manager & Action Executor
│   └── pipeline_simulation.py  # Simulation script
│   └── gpt-neo-demo-model.py # Local demo
│
├── /Customer Frontend      # Banking App Interface (HTML/CSS/JS)
│   ├── index.html
│   └── script.js
│
├── /Employee Dashboard     # Risk Analyst Interface (HTML/CSS/JS)
│   ├── index.html          # Main Dashboard
│   └── archive.html        # Historical Logs
│
├── /synthetic-data         # JSON datasets (No live scraping used)
└── README.md
```

## 🚀 Installation & Usage

### 1. Clone the Repository
```bash
git clone [https://github.com/kishan992/mashreq-ai-hackathon.git](https://github.com/kishan992/mashreq-ai-hackathon.git)
cd mashreq-ai-hackathon
```

*Created by Team Flowstate for Mashreq Bounty Challenge 2026*