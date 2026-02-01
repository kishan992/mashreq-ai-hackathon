let archiveData = { Approved: [], Investigate: [], Dismissed: [] };

function loadArchiveData() {
    // Try to get data from the opener window
    if (window.opener && window.opener.archiveData) {
        archiveData = window.opener.archiveData;
    }
    
    // Update counts
    document.getElementById('approvedCount').textContent = archiveData.Approved.length;
    document.getElementById('investigateCount').textContent = archiveData.Investigate.length;
    document.getElementById('dismissedCount').textContent = archiveData.Dismissed.length;
    document.getElementById('totalCount').textContent = 
        archiveData.Approved.length + archiveData.Investigate.length + archiveData.Dismissed.length;
    
    // Render each section
    renderSection('approvedContainer', archiveData.Approved);
    renderSection('investigateContainer', archiveData.Investigate);
    renderSection('dismissedContainer', archiveData.Dismissed);
}

function renderSection(containerId, issues) {
    const container = document.getElementById(containerId);
    
    if (issues.length === 0) {
        container.innerHTML = '<div class="empty-state">No issues in this category</div>';
        return;
    }
    
    container.innerHTML = issues.map(issue => `
        <div class="archive-card">
            <div class="archive-card-header">
                <div class="archive-card-title">${issue.title}</div>
                <span class="issue-type-badge ${issue.type}">${issue.typeLabel}</span>
            </div>
            
            <div class="archive-meta">
                <div class="archive-meta-item">
                    <span class="archive-meta-label">Risk Level:</span>
                    <span class="risk-level ${issue.riskLevel}">${issue.riskLabel}</span>
                </div>
                <div class="archive-meta-item">
                    <span class="archive-meta-label">Confidence Score:</span>
                    <span class="confidence-score">${issue.confidenceScore}%</span>
                </div>
                <div class="archive-meta-item">
                    <span class="archive-meta-label">Source:</span>
                    <span>${issue.source}</span>
                </div>
                <div class="archive-meta-item">
                    <span class="archive-meta-label">Action Taken:</span>
                    <span style="font-weight: 600; color: #FF6A13;">${issue.action}</span>
                </div>
            </div>
            
            <div class="issue-details" style="margin-bottom: 1rem;">
                <strong>Details:</strong> ${issue.details}
            </div>
            
            <div class="timestamp">
                Processed: ${new Date(issue.processedAt).toLocaleString()}
            </div>
        </div>
    `).join('');
}

function downloadArchiveJSON() {
    const jsonStr = JSON.stringify(archiveData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'archive_log.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

window.onload = () => {
    loadArchiveData();
};