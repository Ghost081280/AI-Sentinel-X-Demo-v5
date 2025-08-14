// Network Scanner Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeNetworkPage();
});

let currentScanType = 'internal';
let shodanApiKey = '';

function initializeNetworkPage() {
    setupEventListeners();
    setupScanTypeToggle();
    setupModalHandlers();
}

function setupEventListeners() {
    // Start scan button
    const startScanBtn = document.getElementById('startScan');
    if (startScanBtn) {
        startScanBtn.addEventListener('click', handleStartScan);
    }

    // Refresh scan button
    const refreshBtn = document.getElementById('refreshScan');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', handleRefreshScan);
    }

    // Search and filter functionality
    const deviceSearch = document.getElementById('deviceSearch');
    if (deviceSearch) {
        deviceSearch.addEventListener('input', filterDevices);
    }

    const statusFilter = document.getElementById('statusFilter');
    if (statusFilter) {
        statusFilter.addEventListener('change', filterDevices);
    }

    const typeFilter = document.getElementById('typeFilter');
    if (typeFilter) {
        typeFilter.addEventListener('change', filterDevices);
    }
}

function setupScanTypeToggle() {
    const scanTypeRadios = document.querySelectorAll('input[name="scanType"]');
    const internalSettings = document.getElementById('internalSettings');
    const externalSettings = document.getElementById('externalSettings');

    if (scanTypeRadios) {
        scanTypeRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                currentScanType = this.value;
                
                if (currentScanType === 'internal') {
                    if (internalSettings) internalSettings.classList.remove('hidden');
                    if (externalSettings) externalSettings.classList.add('hidden');
                } else {
                    if (internalSettings) internalSettings.classList.add('hidden');
                    if (externalSettings) externalSettings.classList.remove('hidden');
                }
            });
        });
    }
}

function setupModalHandlers() {
    // Shodan modal handlers
    const shodanModal = document.getElementById('shodanKeyModal');
    const closeShodanModal = document.getElementById('closeShodanModal');
    const cancelShodan = document.getElementById('cancelShodan');
    const confirmShodan = document.getElementById('confirmShodan');

    // Device modal handlers - if they exist
    const deviceModal = document.getElementById('deviceModal');
    const closeDeviceModal = document.getElementById('closeDeviceModal');

    if (closeDeviceModal && deviceModal) {
        closeDeviceModal.addEventListener('click', () => {
            deviceModal.classList.add('hidden');
        });
    }

    // Close modals when clicking overlay
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal-overlay')) {
            e.target.classList.add('hidden');
        }
    });
}

function handleStartScan() {
    if (currentScanType === 'external') {
        // Show Shodan API key modal for external scans
        showShodanKeyModal();
        return;
    }

    // Start internal scan
    startInternalScan();
}

function showShodanKeyModal() {
    const modal = document.getElementById('shodanKeyModal');
    if (modal) {
        modal.classList.remove('hidden');
        // Focus on the input field
        setTimeout(() => {
            const input = document.getElementById('shodanApiKey');
            if (input) input.focus();
        }, 100);
    }
}

function closeShodanKeyModal() {
    const modal = document.getElementById('shodanKeyModal');
    if (modal) {
        modal.classList.add('hidden');
        // Clear the input
        const input = document.getElementById('shodanApiKey');
        if (input) input.value = '';
    }
}

function confirmShodanScan() {
    const input = document.getElementById('shodanApiKey');
    const apiKey = input ? input.value.trim() : '';
    
    if (!apiKey) {
        showNotification('Please enter a valid API key', 'error');
        return;
    }

    // Store the API key (in a real app, this would be securely stored)
    shodanApiKey = apiKey;
    
    // Close modal and start external scan
    closeShodanKeyModal();
    
    // For demo purposes, use the fake key after user confirms
    startExternalScan();
}

function startInternalScan() {
    const targetRange = document.getElementById('targetRange')?.value || '192.168.1.0/24';
    const scanPorts = document.getElementById('scanPorts')?.value || '1-1000';

    // Hide any previous results
    hideAllResults();
    
    // Show scan status
    const scanStatus = document.getElementById('scanStatus');
    if (scanStatus) {
        scanStatus.classList.remove('hidden');
    }

    // Simulate scan progress
    simulateScanProgress()
        .then(() => {
            // Hide scan status and show results
            if (scanStatus) scanStatus.classList.add('hidden');
            showInternalResults();
        })
        .catch(error => {
            console.error('Scan failed:', error);
            showNotification('Scan failed. Please try again.', 'error');
            if (scanStatus) scanStatus.classList.add('hidden');
        });
}

function startExternalScan() {
    const externalTarget = document.getElementById('externalTarget')?.value || 'example.com';

    // Hide any previous results
    hideAllResults();
    
    // Show scanning status in the external panel
    const status = document.getElementById('externalScanStatus');
    if (status) {
        status.className = 'scan-status scanning';
        status.innerHTML = '<div class="status-dot"></div><span>SCANNING</span>';
    }

    // Add chat message
    if (window.sentinelChat && !SentinelState.chatOpen) {
        window.sentinelChat.toggle();
    }
    setTimeout(() => {
        if (window.sentinelChat) {
            window.sentinelChat.addMessage('🔍 NetworkMapper: Shodan.io API key configured. Initiating external reconnaissance scan...', false, 'system');
        }
    }, 300);

    // Simulate external scan with fake data
    simulateExternalScan(externalTarget)
        .then((results) => {
            showExternalScanResults(results);
        })
        .catch(error => {
            console.error('External scan failed:', error);
            showNotification('External scan failed. Please check your API key and try again.', 'error');
            // Reset status
            if (status) {
                status.className = 'scan-status ready';
                status.innerHTML = '<div class="status-dot"></div><span>READY</span>';
            }
        });
}

function simulateScanProgress() {
    return new Promise((resolve) => {
        const progressFill = document.getElementById('progressFill');
        const scanProgress = document.getElementById('scanProgress');
        const devicesFound = document.getElementById('devicesFound');
        
        let progress = 0;
        let devices = 0;

        const interval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress > 100) progress = 100;

            // Randomly add devices
            if (Math.random() > 0.7) {
                devices++;
            }

            if (progressFill) progressFill.style.width = progress + '%';
            if (scanProgress) scanProgress.textContent = Math.round(progress) + '% complete';
            if (devicesFound) devicesFound.textContent = devices + ' devices found';

            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(resolve, 500);
            }
        }, 300);
    });
}

function simulateExternalScan(target) {
    return new Promise((resolve) => {
        const progressFill = document.getElementById('progressFill');
        const scanProgress = document.getElementById('scanProgress');
        
        let progress = 0;

        const interval = setInterval(() => {
            progress += Math.random() * 20;
            if (progress > 100) progress = 100;

            if (progressFill) progressFill.style.width = progress + '%';
            if (scanProgress) scanProgress.textContent = Math.round(progress) + '% complete';

            if (progress >= 100) {
                clearInterval(interval);
                
                // Generate fake Shodan results
                const results = generateFakeShodanResults(target);
                setTimeout(() => resolve(results), 500);
            }
        }, 400);
    });
}

function generateFakeShodanResults(target) {
    const organizations = ['Acme Corporation', 'Global Tech Inc', 'Business Solutions LLC', 'Enterprise Networks'];
    const isps = ['Business Fiber Network', 'Corporate Internet', 'Enterprise ISP', 'Fiber Solutions'];
    const locations = ['Columbia, SC, US', 'Atlanta, GA, US', 'Charlotte, NC, US', 'Virginia, US'];
    
    const services = [
        { port: 80, service: 'HTTP', banner: 'Apache/2.4.41', version: '2.4.41' },
        { port: 443, service: 'HTTPS', banner: 'OpenSSL/1.1.1', version: '1.1.1' },
        { port: 22, service: 'SSH', banner: 'OpenSSH_7.4', version: '7.4' },
        { port: 25, service: 'SMTP', banner: 'Postfix smtpd', version: '3.4.13' }
    ];

    const vulnerabilities = [
        {
            cve: 'CVE-2021-44228',
            severity: 'Critical',
            description: 'Log4j Remote Code Execution',
            port: 80
        },
        {
            cve: 'CVE-2020-1472',
            severity: 'High',
            description: 'Netlogon Elevation of Privilege',
            port: 445
        }
    ];

    return {
        target: target,
        ip: target.match(/\d+\.\d+\.\d+\.\d+/) ? target : '192.168.1.100',
        organization: organizations[Math.floor(Math.random() * organizations.length)],
        isp: isps[Math.floor(Math.random() * isps.length)],
        location: locations[Math.floor(Math.random() * locations.length)],
        country: 'United States',
        asn: 'AS12345',
        publicIPs: Math.floor(Math.random() * 5) + 1,
        openPorts: Math.floor(Math.random() * 10) + 3,
        vulnerabilities: Math.floor(Math.random() * 3) + 1,
        services: services.slice(0, Math.floor(Math.random() * 4) + 1),
        vulnDetails: Math.random() > 0.5 ? vulnerabilities.slice(0, Math.floor(Math.random() * 2) + 1) : [],
        lastSeen: new Date().toISOString()
    };
}

function showExternalScanResults(results) {
    // Hide placeholder and show results
    const placeholder = document.getElementById('externalPlaceholder');
    const resultsDiv = document.getElementById('externalResults');
    const servicesList = document.getElementById('externalServicesList');

    if (placeholder) placeholder.style.display = 'none';
    if (resultsDiv) resultsDiv.classList.remove('hidden');
    if (servicesList) servicesList.classList.remove('hidden');

    // Update status
    const status = document.getElementById('externalScanStatus');
    if (status) {
        status.className = 'scan-status active';
        status.innerHTML = '<div class="status-dot"></div><span>ACTIVE</span>';
    }

    // Update result values
    const orgName = document.getElementById('orgName');
    const ispName = document.getElementById('ispName');
    const location = document.getElementById('location');
    const openPorts = document.getElementById('openPorts');
    const vulnCount = document.getElementById('vulnCount');

    if (orgName) orgName.textContent = results.organization;
    if (ispName) ispName.textContent = results.isp;
    if (location) location.textContent = results.location;
    if (openPorts) openPorts.textContent = results.openPorts;
    if (vulnCount) vulnCount.textContent = results.vulnerabilities;

    // Populate services list
    populateExternalServicesList(results.services || []);

    // Add success message to chat
    setTimeout(() => {
        if (window.sentinelChat) {
            window.sentinelChat.addMessage(`✅ NetworkMapper: External scan complete via Shodan.io! Discovered ${results.openPorts} open ports on ${results.publicIPs} public IPs. ${results.vulnerabilities} potential vulnerabilities detected. Coordinating with ThreatScanner for risk assessment.`, false, 'system');
        }
    }, 1000);
}

function populateExternalServicesList(services) {
    const servicesList = document.getElementById('externalServicesList');
    if (!servicesList || !services.length) return;

    servicesList.innerHTML = '';
    
    services.forEach(service => {
        const serviceItem = document.createElement('div');
        serviceItem.className = 'service-item';
        serviceItem.onclick = () => showServiceDetails(service.service);
        
        serviceItem.innerHTML = `
            <div class="service-info">
                <div class="service-name">${service.service} (${service.port}/tcp)</div>
                <div class="service-details">${service.banner} • ${service.version}</div>
                <div class="service-encryption">🔐 Analyzing encryption...</div>
            </div>
            <div class="service-status status-secure">DETECTED</div>
        `;
        
        servicesList.appendChild(serviceItem);
    });
}

function showInternalResults() {
    const resultsContainer = document.getElementById('resultsContainer');
    if (resultsContainer) {
        resultsContainer.classList.remove('hidden');
    }

    // Generate fake device data
    const devices = generateFakeDevices();
    populateDevicesTable(devices);
    updateOverviewStats(devices);
}

function generateFakeDevices() {
    const deviceTypes = ['router', 'computer', 'mobile', 'iot'];
    const osTypes = ['Windows 10', 'macOS', 'Linux', 'iOS', 'Android', 'Router OS'];
    const deviceNames = [
        'DESKTOP-ABC123', 'MacBook-Pro', 'iPhone-12', 'Samsung-Galaxy',
        'Router-Gateway', 'Smart-TV', 'Raspberry-Pi', 'NAS-Server'
    ];

    const devices = [];
    const baseIP = '192.168.1.';
    
    for (let i = 1; i <= 15; i++) {
        const isOnline = Math.random() > 0.2;
        const deviceType = deviceTypes[Math.floor(Math.random() * deviceTypes.length)];
        
        devices.push({
            ip: baseIP + (i + 100),
            name: deviceNames[Math.floor(Math.random() * deviceNames.length)] + '-' + i,
            mac: generateMacAddress(),
            type: deviceType,
            os: osTypes[Math.floor(Math.random() * osTypes.length)],
            openPorts: generateOpenPorts(),
            status: isOnline ? 'online' : 'offline',
            lastSeen: isOnline ? 'Now' : getRandomTimeAgo(),
            isSecure: Math.random() > 0.3
        });
    }
    
    return devices;
}

function generateMacAddress() {
    const chars = '0123456789ABCDEF';
    let mac = '';
    for (let i = 0; i < 6; i++) {
        if (i > 0) mac += ':';
        mac += chars[Math.floor(Math.random() * 16)];
        mac += chars[Math.floor(Math.random() * 16)];
    }
    return mac;
}

function generateOpenPorts() {
    const commonPorts = [22, 80, 443, 21, 25, 53, 110, 143, 993, 995];
    const numPorts = Math.floor(Math.random() * 4) + 1;
    const ports = [];
    
    for (let i = 0; i < numPorts; i++) {
        ports.push(commonPorts[Math.floor(Math.random() * commonPorts.length)]);
    }
    
    return [...new Set(ports)].sort((a, b) => a - b);
}

function getRandomTimeAgo() {
    const timeOptions = ['2 minutes ago', '5 minutes ago', '1 hour ago', '3 hours ago', '1 day ago'];
    return timeOptions[Math.floor(Math.random() * timeOptions.length)];
}

function populateDevicesTable(devices) {
    const tableBody = document.getElementById('devicesTableBody');
    if (!tableBody) return;

    tableBody.innerHTML = devices.map(device => `
        <tr class="device-row" data-device='${JSON.stringify(device)}'>
            <td>${device.ip}</td>
            <td>${device.name}</td>
            <td><code>${device.mac}</code></td>
            <td>
                <span class="device-type ${device.type}">
                    <i class="fas fa-${getDeviceIcon(device.type)}"></i>
                    ${device.type.charAt(0).toUpperCase() + device.type.slice(1)}
                </span>
            </td>
            <td>${device.os}</td>
            <td>
                <div class="ports-list">
                    ${device.openPorts.map(port => `<span class="port-tag">${port}</span>`).join('')}
                </div>
            </td>
            <td>
                <span class="status-badge ${device.status}">
                    <i class="fas fa-${device.status === 'online' ? 'circle' : 'circle-xmark'}"></i>
                    ${device.status.charAt(0).toUpperCase() + device.status.slice(1)}
                </span>
            </td>
            <td>${device.lastSeen}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn-action" onclick="showDeviceDetails(this)" title="View Details">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn-action" onclick="scanDevice('${device.ip}')" title="Scan Device">
                        <i class="fas fa-search"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

function getDeviceIcon(type) {
    const icons = {
        router: 'wifi',
        computer: 'desktop',
        mobile: 'mobile-alt',
        iot: 'microchip'
    };
    return icons[type] || 'question';
}

function updateOverviewStats(devices) {
    const totalDevices = devices.length;
    const activeDevices = devices.filter(d => d.status === 'online').length;
    const secureDevices = devices.filter(d => d.isSecure).length;
    const vulnerableDevices = totalDevices - secureDevices;

    const totalDevicesEl = document.getElementById('totalDevices');
    const activeDevicesEl = document.getElementById('activeDevices');
    const secureDevicesEl = document.getElementById('secureDevices');
    const vulnerableDevicesEl = document.getElementById('vulnerableDevices');

    if (totalDevicesEl) totalDevicesEl.textContent = totalDevices;
    if (activeDevicesEl) activeDevicesEl.textContent = activeDevices;
    if (secureDevicesEl) secureDevicesEl.textContent = secureDevices;
    if (vulnerableDevicesEl) vulnerableDevicesEl.textContent = vulnerableDevices;
}

function hideAllResults() {
    const resultsContainer = document.getElementById('resultsContainer');
    const externalResults = document.getElementById('externalResults');
    
    if (resultsContainer) resultsContainer.classList.add('hidden');
    if (externalResults) externalResults.classList.add('hidden');
}

function handleRefreshScan() {
    // Refresh the current scan type
    if (currentScanType === 'external') {
        startExternalScan();
    } else {
        startInternalScan();
    }
}

function filterDevices() {
    const searchTerm = document.getElementById('deviceSearch')?.value.toLowerCase() || '';
    const statusFilter = document.getElementById('statusFilter')?.value || '';
    const typeFilter = document.getElementById('typeFilter')?.value || '';
    
    const rows = document.querySelectorAll('.device-row');
    
    rows.forEach(row => {
        const deviceData = JSON.parse(row.dataset.device || '{}');
        const matchesSearch = !searchTerm || 
            deviceData.name?.toLowerCase().includes(searchTerm) ||
            deviceData.ip?.toLowerCase().includes(searchTerm) ||
            deviceData.mac?.toLowerCase().includes(searchTerm);
        
        const matchesStatus = !statusFilter || deviceData.status === statusFilter;
        const matchesType = !typeFilter || deviceData.type === typeFilter;
        
        if (matchesSearch && matchesStatus && matchesType) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

function showDeviceDetails(button) {
    const row = button.closest('.device-row');
    if (!row) return;
    
    const deviceData = JSON.parse(row.dataset.device || '{}');
    
    if (window.sentinelChat && !SentinelState.chatOpen) {
        window.sentinelChat.toggle();
    }
    
    setTimeout(() => {
        if (window.sentinelChat) {
            window.sentinelChat.addMessage(`NetworkMapper: Device ${deviceData.name} (${deviceData.ip}) - ${deviceData.type}. OS: ${deviceData.os}. Open ports: ${deviceData.openPorts?.join(', ') || 'None'}. Status: ${deviceData.status}. Security assessment coordinated with ThreatScanner and EncryptionManager.`, false);
        }
    }, 300);
}

function scanDevice(ip) {
    if (window.sentinelChat && !SentinelState.chatOpen) {
        window.sentinelChat.toggle();
    }
    
    setTimeout(() => {
        if (window.sentinelChat) {
            window.sentinelChat.addMessage(`NetworkMapper: Initiating deep scan of device ${ip}. Coordinating with ThreatScanner for vulnerability assessment and EncryptionManager for security posture analysis...`, false, 'system');
        }
        
        setTimeout(() => {
            const portCount = Math.floor(Math.random() * 10) + 3;
            const vulnCount = Math.floor(Math.random() * 3);
            window.sentinelChat.addMessage(`✅ NetworkMapper: Deep scan complete for ${ip}. ${portCount} ports discovered, ${vulnCount} potential vulnerabilities. ${vulnCount > 0 ? 'Recommending encryption deployment.' : 'Device appears secure.'}`, false);
        }, 2000);
    }, 300);
}

function showServiceDetails(service) {
    if (window.sentinelChat && !SentinelState.chatOpen) {
        window.sentinelChat.toggle();
    }
    
    setTimeout(() => {
        if (window.sentinelChat) {
            window.sentinelChat.addMessage(`NetworkMapper: Service ${service} analysis - Configuration assessed for security posture. Coordinating with ThreatScanner for vulnerability checks and EncryptionManager for protocol security verification.`, false);
        }
    }, 300);
}

function showNotification(message, type = 'info') {
    // Simple notification system
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        color: white;
        font-weight: bold;
        z-index: 10001;
        animation: slideIn 0.3s ease;
        max-width: 300px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
    `;
    
    if (type === 'error') {
        notification.style.background = '#ff0044';
    } else if (type === 'success') {
        notification.style.background = '#00ff88';
        notification.style.color = '#000';
    } else {
        notification.style.background = '#00ccff';
        notification.style.color = '#000';
    }
    
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { opacity: 0; transform: translateX(100%); }
            to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideOut {
            from { opacity: 1; transform: translateX(0); }
            to { opacity: 0; transform: translateX(100%); }
        }
    `;
    if (!document.querySelector('#notification-styles')) {
        style.id = 'notification-styles';
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Additional utility functions for network operations
function resetNetworkData() {
    // Clear all scan results
    hideAllResults();
    
    // Reset external scan state
    const placeholder = document.getElementById('externalPlaceholder');
    const externalResults = document.getElementById('externalResults');
    const servicesList = document.getElementById('externalServicesList');
    const status = document.getElementById('externalScanStatus');
    
    if (placeholder) placeholder.style.display = 'block';
    if (externalResults) externalResults.classList.add('hidden');
    if (servicesList) servicesList.classList.add('hidden');
    if (status) {
        status.className = 'scan-status ready';
        status.innerHTML = '<div class="status-dot"></div><span>READY</span>';
    }
}

function exportScanResults() {
    // Simple export functionality
    const results = {
        timestamp: new Date().toISOString(),
        scanType: currentScanType,
        results: 'Network scan results would be exported here'
    };
    
    const dataStr = JSON.stringify(results, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `network-scan-${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    showNotification('Scan results exported successfully', 'success');
}

// Initialize network discovery features
function initializeNetworkDiscovery() {
    // Check if we have stored network preferences
    const networkConfig = localStorage.getItem('network_config');
    if (networkConfig) {
        try {
            const config = JSON.parse(networkConfig);
            // Restore previous configuration
            console.log('Restored network configuration:', config);
        } catch (e) {
            console.error('Failed to parse network configuration:', e);
        }
    }
}

// Global exports for use by other scripts and HTML onclick handlers
window.showShodanKeyModal = showShodanKeyModal;
window.closeShodanKeyModal = closeShodanKeyModal;
window.confirmShodanScan = confirmShodanScan;
window.showDeviceDetails = showDeviceDetails;
window.scanDevice = scanDevice;
window.showServiceDetails = showServiceDetails;
window.handleRefreshScan = handleRefreshScan;
window.filterDevices = filterDevices;
window.resetNetworkData = resetNetworkData;
window.exportScanResults = exportScanResults;
window.handleStartScan = handleStartScan;
window.startInternalScan = startInternalScan;
window.startExternalScan = startExternalScan;

// Initialize network discovery when the script loads
initializeNetworkDiscovery();
