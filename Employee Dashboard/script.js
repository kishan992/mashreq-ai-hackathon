// Mock data array
let mockIssues = [
    {
        id: 1, type: 'fraud', typeLabel: 'Fraud Alert', title: 'Duplicate payment complaints trending on Twitter',
        riskLevel: 'high', riskLabel: 'High Risk', confidenceScore: 87, source: 'Twitter/Reddit',
        whyMatters: ['Multiple users reporting same error code', 'Pattern detected: 3+ complaints in 48 hours', 'Could indicate a broader backend flaw'],
        details: 'AI picked up on a spike in mentions of "duplicate charge Mashreq" over the past 2 days. Common keywords: "debited twice", "transaction ID mismatch".'
    },
    {
        id: 2, type: 'service', typeLabel: 'Service Issue', title: 'Neo app login failure (multiple users)',
        riskLevel: 'high', riskLabel: 'High Risk', confidenceScore: 92, source: 'App Store Reviews / Twitter',
        whyMatters: ['Spike of 15+ reviews mentioning "can\'t log in"', 'Negative sentiment rising', 'Potential server outage or deployment issue'],
        details: 'Several users reported "Session expired" errors immediately after the last app update (v4.2). Sentiment is trending negative.'
    },
    {
        id: 3, type: 'fraud', typeLabel: 'Fraud Alert', title: 'Phishing scam impersonating Mashreq SMS alerts',
        riskLevel: 'high', riskLabel: 'High Risk', confidenceScore: 95, source: 'Twitter / WhatsApp Reports',
        whyMatters: ['Customers posting screenshots of fake OTP requests', 'Links leading to spoofed Mashreq sites', 'Could damage brand trust if not countered quickly'],
        details: 'AI identified multiple tweets containing images of SMS messages asking customers to click a link and "verify their account" urgently.'
    },
    {
        id: 4, type: 'service', typeLabel: 'Service Issue', title: 'ATM withdrawal limits reportedly lowered without notice',
        riskLevel: 'medium', riskLabel: 'Medium Risk', confidenceScore: 78, source: 'Facebook Groups',
        whyMatters: ['Possible miscommunication about recent policy change', 'Customers frustrated by unexpected limit', 'Could snowball into PR issue if not addressed'],
        details: 'Posts from UAE-based customer groups claim daily ATM limits were reduced from 10,000 AED to 5,000 AED without prior notification.'
    },
    {
        id: 5, type: 'fraud', typeLabel: 'Fraud Alert', title: 'Merchant dispute pattern identified in Dubai area',
        riskLevel: 'medium', riskLabel: 'Medium Risk', confidenceScore: 74, source: 'Customer Service Calls / Social',
        whyMatters: ['Same merchant name appearing in 7+ disputes', 'Could indicate coordinated fraud scheme', 'Warrants investigation and potential merchant block'],
        details: 'AI cross-referenced call center logs and social mentions. Merchant "QuickTech Dubai" is involved in multiple refund requests for "unauthorized charges".'
    },
    {
        id: 6, type: 'service', typeLabel: 'Service Issue', title: 'Delayed salary transfer complaints rising',
        riskLevel: 'medium', riskLabel: 'Medium Risk', confidenceScore: 81, source: 'Twitter / LinkedIn',
        whyMatters: ['3-day delay pattern emerging', 'Corporate clients may be affected', 'Reputation risk with corporate banking segment'],
        details: 'Several employees from different companies posted about salaries "not reflecting" on time. Cross-referenced with internal logs showing batch processing delays.'
    },
    {
        id: 7, type: 'service', typeLabel: 'Service Issue', title: 'Credit Card activation loop error',
        riskLevel: 'low', riskLabel: 'Low Risk', confidenceScore: 65, source: 'Call Center / Social',
        whyMatters: ['Minor UI bug reported after update', 'Workaround exists but annoying'],
        details: 'User reports stating "Try Again" button freezes the app during card activation.'
    }
];

const icons = {
    alert: '<svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>',
    check: '<svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>',
    eye: '<svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>',
    x: '<svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>'
};

// NEW: Arrays to store issues by action type
let approvedIssues = [];
let investigateIssues = [];
let dismissedIssues = [];

// NEW: Function to download JSON file
function downloadJSON(data, filename) {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

// NEW: Function to download CSV file
function downloadCSV(data, filename) {
    const headers = ['ID', 'Type', 'Title', 'Risk Level', 'Confidence Score', 'Source', 'Details', 'Dismissed At'];
    const rows = data.map(issue => [
        issue.id,
        issue.typeLabel,
        `"${issue.title}"`,
        issue.riskLabel,
        issue.confidenceScore,
        `"${issue.source}"`,
        `"${issue.details}"`,
        issue.dismissedAt
    ]);
    const csvContent = [
        headers.join(','),
        ...rows.map(row => row.join(','))
    ].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

// NEW: Function to download TXT file
function downloadTXT(data, filename) {
    const txtContent = data.map(issue => 
        `======================================
ID: ${issue.id}
Type: ${issue.typeLabel}
Title: ${issue.title}
Risk Level: ${issue.riskLabel}
Confidence Score: ${issue.confidenceScore}%
Source: ${issue.source}
Details: ${issue.details}
Dismissed At: ${issue.dismissedAt}
======================================\n`
    ).join('\n');
    const blob = new Blob([txtContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

// NEW: Function to open archive log in a new page
function downloadArchive() {
    const archive = {
        Approved: approvedIssues,
        Investigate: investigateIssues,
        Dismissed: dismissedIssues
    };
    
    // Store data in a global variable accessible by the new window
    window.archiveData = archive;
    
    // Open archive page in new tab
    window.open('archive.html', '_blank');
}

// NEW: Counter Logic
function updateCounters() {
    document.getElementById('count-pending').innerText = mockIssues.length;
    document.getElementById('count-high').innerText = mockIssues.filter(i => i.riskLevel === 'high').length;
    document.getElementById('count-medium').innerText = mockIssues.filter(i => i.riskLevel === 'medium').length;
    document.getElementById('count-low').innerText = mockIssues.filter(i => i.riskLevel === 'low').length;
}

// Render Cards
function renderIssues(issues = mockIssues) {
    const container = document.getElementById('issuesContainer');
    if(issues.length === 0) {
        container.innerHTML = '<p style="padding:2rem; color:#777;">No matching issues found.</p>';
        return;
    }
    container.innerHTML = issues.map(issue => `
        <div class="issue-card" id="card-${issue.id}">
            <div class="issue-header">
                <span class="issue-type-badge ${issue.type}">${issue.typeLabel}</span>
                <div class="risk-level ${issue.riskLevel}">${icons.alert} <span>${issue.riskLabel}</span></div>
            </div>
            <h3 class="issue-title">${issue.title}</h3>
            <div class="issue-meta">
                <div><strong>Conf:</strong> <span class="confidence-score">${issue.confidenceScore}%</span></div>
                <div><strong>Src:</strong> ${issue.source}</div>
            </div>
            <div class="why-matters">
                <strong>Analysis:</strong>
                <ul>${issue.whyMatters.map(pt => `<li>${pt}</li>`).join('')}</ul>
            </div>
            <div class="issue-details"><strong>Details:</strong> ${issue.details}</div>
            
            <div class="action-buttons">
                <button class="btn btn-approve" onclick="openModal('Approve', ${issue.id})">${icons.check} Approve</button>
                <button class="btn btn-review" onclick="openModal('Review', ${issue.id})">${icons.eye} Investigate</button>
                <button class="btn btn-dismiss" onclick="openModal('Dismiss', ${issue.id})">${icons.x} Dismiss</button>
            </div>
        </div>
    `).join('');
}

// Filtering
function filterIssues() {
    const type = document.getElementById('filter-type').value;
    const risk = document.getElementById('filter-risk').value;
    let filtered = mockIssues;
    if (type !== 'all') filtered = filtered.filter(i => i.type === type);
    if (risk !== 'all') filtered = filtered.filter(i => i.riskLevel === risk);
    renderIssues(filtered);
}

// --- MODAL & ACTION LOGIC ---
let currentAction = null;
let currentIssueId = null;

function openModal(action, id) {
    currentAction = action;
    currentIssueId = id;
    
    // Look up the issue using the current mockIssues array
    const issue = mockIssues.find(i => i.id === id);
    
    const modal = document.getElementById('actionModal');
    const titleEl = document.getElementById('modalTitle');
    const bodyEl = document.getElementById('modalBody');
    const confirmBtn = document.getElementById('confirmBtn');

    // Set content based on action type (Logic Restored)
    if (action === 'Approve') {
        titleEl.textContent = 'Confirm Issue Verification';
        bodyEl.innerHTML = `<p>You are about to verify <strong>"${issue.title}"</strong>.</p><br><p>This will trigger the automated response protocol and notify the security team. Are you sure?</p>`;
        confirmBtn.style.background = '#38a169'; // Green
        confirmBtn.textContent = 'Verify & Execute';
    } 
    else if (action === 'Review') {
        titleEl.textContent = 'Escalate for Manual Review';
        bodyEl.innerHTML = `<p>This issue will be assigned to a Senior Analyst queue for deep-dive investigation.</p><br><p>Current Confidence: ${issue.confidenceScore}%. Do you want to proceed?</p>`;
        confirmBtn.style.background = '#667eea'; // Indigo
        confirmBtn.textContent = 'Escalate Issue';
    } 
    else if (action === 'Dismiss') {
        titleEl.textContent = 'Dismiss Alert';
        bodyEl.innerHTML = `<p>Are you sure you want to dismiss this alert?</p><br><p style="color:#c53030; font-weight:bold;">This action will remove the card from the dashboard and train the AI to ignore similar patterns.</p>`;
        confirmBtn.style.background = '#e53e3e'; // Red
        confirmBtn.textContent = 'Dismiss Permanently';
    }

    modal.classList.add('active');
}

function closeModal() {
    document.getElementById('actionModal').classList.remove('active');
}

// ========== NEW: SAVE TO FILE FUNCTIONS ==========

// Function to download JSON file
function downloadJSON(data, filename) {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

// Function to download CSV file
function downloadCSV(data, filename) {
    // CSV Headers
    const headers = ['ID', 'Type', 'Title', 'Risk Level', 'Confidence Score', 'Source', 'Details', 'Dismissed At'];
    
    // Convert data to CSV rows
    const rows = data.map(issue => [
        issue.id,
        issue.typeLabel,
        `"${issue.title}"`, // Wrap in quotes to handle commas
        issue.riskLabel,
        issue.confidenceScore,
        `"${issue.source}"`,
        `"${issue.details}"`,
        issue.dismissedAt
    ]);
    
    // Combine headers and rows
    const csvContent = [
        headers.join(','),
        ...rows.map(row => row.join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

// Function to download TXT file
function downloadTXT(data, filename) {
    const txtContent = data.map(issue => 
        `======================================
ID: ${issue.id}
Type: ${issue.typeLabel}
Title: ${issue.title}
Risk Level: ${issue.riskLabel}
Confidence Score: ${issue.confidenceScore}%
Source: ${issue.source}
Details: ${issue.details}
Dismissed At: ${issue.dismissedAt}
======================================\n`
    ).join('\n');
    
    const blob = new Blob([txtContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

// ========== END OF FILE SAVE FUNCTIONS ==========

// Confirm Button Handler (Removes the card AND updates counters)
document.getElementById('confirmBtn').addEventListener('click', () => {
    closeModal();
    
    // 1. Find the Card in DOM
    const card = document.getElementById(`card-${currentIssueId}`);
    
    if (card) {
        // NEW: 2. Find the issue in the array before removing it
        const processedIssue = mockIssues.find(i => i.id === currentIssueId);
        
        // NEW: 3. Store issue in appropriate array based on action
        if (processedIssue) {
            // Add timestamp and action
            processedIssue.processedAt = new Date().toISOString();
            processedIssue.action = currentAction;
            
            // Store in the correct array
            if (currentAction === 'Approve') {
                approvedIssues.push(processedIssue);
            } else if (currentAction === 'Review') {
                investigateIssues.push(processedIssue);
            } else if (currentAction === 'Dismiss') {
                dismissedIssues.push(processedIssue);
            }
        }
        
        // 4. Animate Removal
        card.classList.add('removing');
        
        // 5. Remove from DOM and Array after animation
        setTimeout(() => {
            // Update the data array by filtering out the removed ID
            mockIssues = mockIssues.filter(i => i.id !== currentIssueId);
            
            // Remove Element
            card.remove();
            
            // Update the counters
            updateCounters();
            
        }, 300);
    }
});

// Close modal on outside click
document.getElementById('actionModal').addEventListener('click', (e) => {
    if (e.target.id === 'actionModal') closeModal();
});

// Archive Log button handler
document.getElementById('archiveBtn').addEventListener('click', (e) => {
    e.preventDefault(); // Prevent any default behavior
    downloadArchive();
});

window.onload = () => {
    renderIssues();
    updateCounters(); // Set initial counts
};