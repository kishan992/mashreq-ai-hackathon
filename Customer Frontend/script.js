document.addEventListener('DOMContentLoaded', () => {
    /* UI LOGIC */
    const chatOverlay = document.getElementById('chatOverlay');
    const navChatBtn = document.getElementById('navChatBtn');
    const fabChatBtn = document.getElementById('fabChatBtn');
    const closeChatBtn = document.getElementById('closeChatBtn');
    const agentBtn = document.getElementById('agentBtn');
    const userInput = document.getElementById('userInput');
    const sendBtn = document.getElementById('sendBtn');
    const chatMessages = document.getElementById('chatMessages');
    const typingIndicator = document.getElementById('typingIndicator');

    function openChat() { chatOverlay.classList.add('active'); userInput.focus(); }
    function closeChat() { chatOverlay.classList.remove('active'); }

    navChatBtn.addEventListener('click', openChat);
    fabChatBtn.addEventListener('click', openChat);
    closeChatBtn.addEventListener('click', closeChat);
    chatOverlay.addEventListener('click', (e) => { if (e.target === chatOverlay) closeChat(); });

    /* AGENT BUTTON LOGIC */
    agentBtn.addEventListener('click', () => {
        addMessage("Connecting you to a live agent...", 'bot');
        typingIndicator.style.display = 'block';
        setTimeout(() => {
            typingIndicator.style.display = 'none';
            addMessage("👩‍💼 <b>Agent Sarah</b> has joined the chat.<br>'Hi there! I can see your previous conversation history. How can I assist you further?'", 'bot');
            }, 2000);
        });

    /* SMART BOT LOGIC */
    const knowledgeBase = {
        fraud: {
            keywords: ['scam', 'fraud', 'phishing', 'otp', 'hacked', 'suspicious', 'stolen', 'fake', 'hearing', 'recently', 'worry', 'worried'],
            responses: [
                "It is completely understandable to feel concerned. Unfortunately, digital scams are on the rise globally, but please know that at Mashreq, we work 24/7 to keep your funds safe. <br><br>Your awareness is the strongest shield. We recommend never sharing your OTP or password with anyone—even if they claim to be us. Would you like some tips on how to spot the latest scams?",
                "⚠️ <b>Security Reminder:</b> Scammers often try to create urgency. Take a breath. If someone is pressuring you to share an OTP or move money, it is likely a scam. We are here to help protect you."
                ]
            },
        trust: {
            keywords: ['trust', 'safe', 'secure', 'complaints', 'reviews', 'reliable', 'opinion'],
            responses: [
                "We take public trust very seriously. Mashreq is fully regulated by the Central Bank of the UAE and employs bank-grade encryption for all digital channels.",
                "Your safety is our priority. Our 'Mashreq Neo' platform uses biometric authentication to ensure only YOU can access your funds."
                ]
            },
        news: {
            keywords: ['news', 'trend', 'market', 'economy', 'interest rate', 'finance'],
            responses: [
                "📰 <b>Market Update:</b> The UAE economy remains strong with significant growth in the digital payment sector.",
                "Current trends show a 40% increase in contactless payments. Interest rates remain stable following the latest Central Bank guidelines."
                ]
            },
        banking: {
            keywords: ['banking', 'account', 'open', 'card', 'loan', 'salary', 'transfer', 'login', 'password'],
            responses: [
                "You can open a Mashreq Neo account in just 5 minutes! All you need is your Emirates ID.",
                "We offer Personal Loans with competitive rates starting from 4.99%. Would you like to check your eligibility?"
                ]
            },
        greeting: {
            keywords: ['hello', 'hi', 'hey', 'morning', 'afternoon', 'wsg', 'yo', 'wassup'],
            responses: ["Hello there! How can I help you today?", "Hi! I'm here to assist with your banking needs."]
            }
        };

            function getBotResponse(input) {
                const text = input.toLowerCase();
                for (const category in knowledgeBase) {
                    const data = knowledgeBase[category];
                    const match = data.keywords.some(keyword => text.includes(keyword));
                    if (match) {
                        const randomIndex = Math.floor(Math.random() * data.responses.length);
                        return data.responses[randomIndex];
                    }
                }
                return "I'm not sure I understood that. I can help with <b>Fraud Reporting</b>, <b>Banking News</b>, <b>Account Services</b>, or <b>Safety Concerns</b>. Could you try rephrasing?";
            }

            function addMessage(text, sender) {
                const div = document.createElement('div');
                div.classList.add('message', sender);
                div.innerHTML = text;
                chatMessages.appendChild(div);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }

            function handleSend() {
                const text = userInput.value.trim();
                if (!text) return;
                addMessage(text, 'user');
                userInput.value = '';
                typingIndicator.style.display = 'block';
                chatMessages.scrollTop = chatMessages.scrollHeight;

                setTimeout(() => {
                    const botReply = getBotResponse(text);
                    typingIndicator.style.display = 'none';
                    addMessage(botReply, 'bot');
                }, 1200);
            }

            sendBtn.addEventListener('click', handleSend);
            userInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleSend(); });
        });