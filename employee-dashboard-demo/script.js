// Data
const allTransactions = [
    // Checking Account Transactions
    { id: 1, date: '2024-01-26', account: 'Horizon Bank - CHK-4582', accountType: 'checking', transactionId: '01234556.7678', amount: 360.00, riskScore: 37, reason: 'Alert Alert Taxillates Into Multiple Jurisdictions' },
    { id: 2, date: '2024-01-26', account: 'Horizon Bank - CHK-4582', accountType: 'checking', transactionId: '01234556.1780', amount: 120.00, riskScore: 36, reason: 'Credified Savings: Unusual Pattern Detected' },
    { id: 3, date: '2024-01-25', account: 'Horizon Bank - CHK-7821', accountType: 'checking', transactionId: '01234556.7876', amount: 290.00, riskScore: 37, reason: 'Transaction in Random Location Not Matching Profile' },
    { id: 4, date: '2024-01-25', account: 'Horizon Bank - CHK-4582', accountType: 'checking', transactionId: '01234556.7890', amount: 100.00, riskScore: 30, reason: 'Emertified Vectors: Base Threshold Exceeded' },
    { id: 5, date: '2024-01-24', account: 'Horizon Bank - CHK-7821', accountType: 'checking', transactionId: '01234556.7978', amount: 50.00, riskScore: 26, reason: 'Aimathat Raik Forceyt Analysis Flag' },
    { id: 6, date: '2024-01-26', account: 'Horizon Bank - CHK-9103', accountType: 'checking', transactionId: '01234556.8821', amount: 450.00, riskScore: 38, reason: 'High Value Transaction Outside Normal Hours' },
    
    // Savings Account Transactions
    { id: 7, date: '2024-01-26', account: 'Horizon Savings - SAV-2341', accountType: 'savings', transactionId: '01234557.9012', amount: 2500.00, riskScore: 41, reason: 'Large Withdrawal Exceeds Daily Limit Pattern' },
    { id: 8, date: '2024-01-26', account: 'Horizon Savings - SAV-2341', accountType: 'savings', transactionId: '01234557.9013', amount: 1800.00, riskScore: 35, reason: 'Rapid Sequential Transfers Detected' },
    { id: 9, date: '2024-01-25', account: 'Horizon Savings - SAV-6754', accountType: 'savings', transactionId: '01234557.9014', amount: 950.00, riskScore: 29, reason: 'Unusual Beneficiary Account Activity' },
    { id: 10, date: '2024-01-24', account: 'Horizon Savings - SAV-2341', accountType: 'savings', transactionId: '01234557.9015', amount: 3200.00, riskScore: 42, reason: 'Account Dormancy Followed by Large Transaction' },
    
    // Credit Card Transactions
    { id: 11, date: '2024-01-26', account: 'Horizon Visa Card - 8829', accountType: 'cards', transactionId: '01234558.4421', amount: 875.00, riskScore: 39, reason: 'Foreign Transaction Without Travel Notice' },
    { id: 12, date: '2024-01-26', account: 'Horizon Visa Card - 8829', accountType: 'cards', transactionId: '01234558.4422', amount: 1250.00, riskScore: 40, reason: 'Multiple Online Purchases Rapid Succession' },
    { id: 13, date: '2024-01-25', account: 'Horizon Mastercard - 3341', accountType: 'cards', transactionId: '01234558.4423', amount: 650.00, riskScore: 33, reason: 'Merchant Category Code Anomaly Detected' },
    { id: 14, date: '2024-01-25', account: 'Horizon Visa Card - 8829', accountType: 'cards', transactionId: '01234558.4424', amount: 425.00, riskScore: 31, reason: 'Card Not Present Transaction High Risk Merchant' },
    { id: 15, date: '2024-01-24', account: 'Horizon Mastercard - 3341', accountType: 'cards', transactionId: '01234558.4425', amount: 2100.00, riskScore: 43, reason: 'Exceeds Typical Spending Pattern by 300%' },
    
    // Loan Transactions
    { id: 16, date: '2024-01-26', account: 'Horizon Auto Loan - LN-4451', accountType: 'loans', transactionId: '01234559.5501', amount: 5500.00, riskScore: 28, reason: 'Early Payoff Attempt Unusual Source Account' },
    { id: 17, date: '2024-01-26', account: 'Horizon Mortgage - LN-9982', accountType: 'loans', transactionId: '01234559.5502', amount: 12000.00, riskScore: 32, reason: 'Large Additional Payment Outside Normal Schedule' },
    { id: 18, date: '2024-01-25', account: 'Horizon Personal Loan - LN-3367', accountType: 'loans', transactionId: '01234559.5503', amount: 3400.00, riskScore: 27, reason: 'Payment Source Changed Without Notification' },
    
    // Wire Transfer Transactions
    { id: 19, date: '2024-01-26', account: 'Horizon Intl Wire - WIR-7654', accountType: 'wire', transactionId: '01234560.6601', amount: 15000.00, riskScore: 45, reason: 'International Wire to High Risk Country' },
    { id: 20, date: '2024-01-26', account: 'Horizon Domestic Wire - WIR-1123', accountType: 'wire', transactionId: '01234560.6602', amount: 8500.00, riskScore: 38, reason: 'Wire Transfer to New Beneficiary First Time' },
    { id: 21, date: '2024-01-25', account: 'Horizon Intl Wire - WIR-7654', accountType: 'wire', transactionId: '01234560.6603', amount: 22000.00, riskScore: 47, reason: 'Structuring Pattern Multiple Wires Below Reporting Threshold' },
    { id: 22, date: '2024-01-25', account: 'Horizon Domestic Wire - WIR-1123', accountType: 'wire', transactionId: '01234560.6604', amount: 6700.00, riskScore: 34, reason: 'Business Account Wire to Personal Account Unusual' },
    { id: 23, date: '2024-01-24', account: 'Horizon Intl Wire - WIR-7654', accountType: 'wire', transactionId: '01234560.6605', amount: 18500.00, riskScore: 44, reason: 'Rapid Sequential International Wires Same Beneficiary' },
];

// State
let activeTab = 'checking';
let selectedDate = '';
let selectedTransaction = null;
let chatHistory = [];

// Get today's date
const today = new Date().toISOString().split('T')[0];

// Set max date for date picker and set default to today
const datePicker = document.getElementById('datePicker');
datePicker.max = today;
datePicker.value = today;
selectedDate = today;

// Functions
function getRiskClass(score) {
    if (score >= 35) return 'risk-high';
    if (score >= 30) return 'risk-medium';
    return 'risk-low';
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
}

function getDateDisplay() {
    if (selectedDate === today) {
        return '(Today)';
    }
    return `(${formatDate(selectedDate)})`;
}

function getFilteredTransactions() {
    return allTransactions.filter(transaction => {
        const matchesTab = transaction.accountType === activeTab;
        const matchesDate = !selectedDate || transaction.date === selectedDate;
        return matchesTab && matchesDate;
    });
}

function renderTransactions() {
    const transactions = getFilteredTransactions();
    const tableBody = document.getElementById('tableBody');
    const mobileCards = document.getElementById('mobileCards');
    const emptyState = document.getElementById('emptyState');
    const desktopTable = document.getElementById('desktopTable');
    
    // Update title
    document.getElementById('transactionsTitle').textContent = `AI Flagged Transactions ${getDateDisplay()}`;
    
    if (transactions.length === 0) {
        emptyState.style.display = 'block';
        desktopTable.style.display = 'none';
        mobileCards.innerHTML = '';
        return;
    }
    
    emptyState.style.display = 'none';
    desktopTable.style.display = '';
    
    // Render desktop table
    tableBody.innerHTML = transactions.map(transaction => `
        <tr data-id="${transaction.id}" class="${selectedTransaction?.id === transaction.id ? 'selected' : ''}">
            <td>
                <div class="date-cell">
                    <i class="fas fa-exclamation-circle alert-icon"></i>
                    <span>${formatDate(transaction.date)}</span>
                </div>
            </td>
            <td>${transaction.account}</td>
            <td class="transaction-id">${transaction.transactionId}</td>
            <td class="amount">$${transaction.amount.toFixed(2)}</td>
            <td>
                <span class="risk-badge ${getRiskClass(transaction.riskScore)}">${transaction.riskScore}</span>
            </td>
            <td>${transaction.reason}</td>
        </tr>
    `).join('');
    
    // Render mobile cards
    mobileCards.innerHTML = transactions.map(transaction => `
        <div class="transaction-card ${selectedTransaction?.id === transaction.id ? 'selected' : ''}" data-id="${transaction.id}">
            <div class="card-top">
                <div class="card-date">
                    <i class="fas fa-exclamation-circle alert-icon"></i>
                    <span>${formatDate(transaction.date)}</span>
                </div>
                <span class="card-risk ${getRiskClass(transaction.riskScore)}">${transaction.riskScore}</span>
            </div>
            <div class="card-details">
                <div class="card-detail-row">
                    <span class="card-label">Account:</span>
                    <span class="card-value">${transaction.account}</span>
                </div>
                <div class="card-detail-row">
                    <span class="card-label">Transaction ID:</span>
                    <span class="card-value mono">${transaction.transactionId}</span>
                </div>
                <div class="card-detail-row">
                    <span class="card-label">Amount:</span>
                    <span class="card-value amount">$${transaction.amount.toFixed(2)}</span>
                </div>
                <div class="card-reason">
                    <span class="card-label">Reason:</span>
                    <p class="card-reason-text">${transaction.reason}</p>
                </div>
            </div>
        </div>
    `).join('');
    
    // Add click listeners
    document.querySelectorAll('tbody tr, .transaction-card').forEach(el => {
        el.addEventListener('click', function() {
            const id = parseInt(this.dataset.id);
            selectedTransaction = allTransactions.find(t => t.id === id);
            renderTransactions();
        });
    });
}

// Sidebar
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const menuButton = document.getElementById('menuButton');
const closeSidebar = document.getElementById('closeSidebar');

menuButton.addEventListener('click', () => {
    sidebar.classList.add('open');
    overlay.classList.add('active');
});

closeSidebar.addEventListener('click', () => {
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
});

overlay.addEventListener('click', () => {
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
});

// Tabs
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', function() {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        activeTab = this.dataset.tab;
        selectedTransaction = null;
        renderTransactions();
    });
});

// Date picker
document.getElementById('datePicker').addEventListener('change', function(e) {
    selectedDate = e.target.value;
    selectedTransaction = null;
    renderTransactions();
});

// AI Assistant
const aiButton = document.getElementById('aiButton');
const chatWindow = document.getElementById('chatWindow');
const closeChatButton = document.getElementById('closeChatButton');
const chatInput = document.getElementById('chatInput');
const sendButton = document.getElementById('sendButton');
const chatMessages = document.getElementById('chatMessages');

aiButton.addEventListener('click', () => {
    if (chatWindow.style.display === 'none' || !chatWindow.style.display) {
        chatWindow.style.display = 'block';
    } else {
        chatWindow.style.display = 'none';
    }
});

closeChatButton.addEventListener('click', () => {
    chatWindow.style.display = 'none';
});

function sendMessage() {
    const message = chatInput.value.trim();
    if (!message) return;
    
    // Add user message
    chatHistory.push({ type: 'user', message });
    chatInput.value = '';
    renderChat();
    
    // Simulate AI response
    setTimeout(() => {
        chatHistory.push({
            type: 'ai',
            message: 'I can help you with fraud detection queries! Ask me about risk scores, transaction patterns, or any flagged transactions.'
        });
        renderChat();
    }, 1000);
}

function renderChat() {
    if (chatHistory.length === 0) {
        chatMessages.innerHTML = `
            <div class="welcome-message">
                <div class="welcome-emoji">👋</div>
                <p>Hi! I'm your AI assistant.</p>
                <p class="welcome-subtitle">Ask me anything about fraud detection!</p>
            </div>
        `;
        return;
    }
    
    chatMessages.innerHTML = chatHistory.map(chat => `
        <div class="message ${chat.type}">
            <div class="message-bubble">${chat.message}</div>
        </div>
    `).join('');
    
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

sendButton.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Initial render
renderTransactions();
renderChat();