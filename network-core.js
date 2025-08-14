/**
 * AI Sentinel-X Network Discovery Core Module V4
 * Enhanced with dual-layer scanning and comprehensive cyber defense
 */

// Network module state
let currentScale = null;
let ipRanges = [];
let internalDevices = [];
let deviceCounter = 1;
let scanningActive = true;
let discoveryActive = true;

// Utility functions
const SentinelUtils = {
    validateCIDR: function(cidr) {
        const cidrRegex = /^(\d{1,3}\.){3}\d{1,3}\/\d{1,2}$/;
        if (!cidrRegex.test(cidr)) return false;
        
        const [ip, mask] = cidr.split('/');
        const octets = ip.split('.');
        const maskNum = parseInt(mask);
        
        // Validate octets
        for (const octet of octets) {
            const num = parseInt(octet);
            if (num < 0 || num > 255) return false;
        }
        
        // Validate mask
        if (maskNum < 0 || maskNum > 32) return false;
        
        return true;
    }
};

// Initialize environment detection
function initializeEnvironmentDetection() {
    // Auto-detect based on stored preference or simulate detection
    const savedScale = localStorage.getItem('sentinel_scale');
    if (savedScale && ScaleConfigs[savedScale]) {
        selectScale(savedScale, false);
    } else {
        // Show selection interface
        const envDetection = document.getElementById('environmentDetection');
        if (envDetection) {
            envDetection.style.display = 'block';
        }
    }
}

function startAutoScan() {
    console.log('Starting enhanced auto scan...');
    const autoScanBtn = document.getElementById('autoScanBtn');
    const scanProgress = document.getElementById('scanProgress');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    
    if (!autoScanBtn || !scanProgress || !progressFill || !progressText) {
        console.error('Missing scan elements');
        return;
    }
    
    // Disable button and show progress
    autoScanBtn.disabled = true;
    scanProgress.style.display = 'block';
    
    // Enhanced scan steps for dual-layer scanning
    const scanSteps = [
        { progress: 10, text: "Initializing dual-layer scan..." },
        { progress: 20, text: "Connecting to Shodan API for external scan..." },
        { progress: 35, text: "Scanning public IP addresses..." },
        { progress: 50, text: "Deploying internal agent..." },
        { progress: 65, text: "Discovering internal network topology..." },
        { progress: 80, text: "Analyzing security posture..." },
        { progress: 90, text: "Correlating with threat intelligence..." },
        { progress: 100, text: "Scan complete! Preparing recommendation..." }
    ];
    
    let currentStep = 0;
    
    const interval = setInterval(() => {
        if (currentStep < scanSteps.length) {
            const step = scanSteps[currentStep];
            progressFill.style.width = step.progress + '%';
            progressText.textContent = step.text;
            currentStep++;
        } else {
            clearInterval(interval);
            
            // Simulate scan results and recommendation
            setTimeout(() => {
                const recommendation = simulateNetworkScan();
                showScanResults(recommendation);
            }, 1000);
        }
    }, 1000);
    
    // Track scan initiation in chat
    if (window.sentinelChat && SentinelState.chatOpen) {
        sentinelChat.addMessage('🔍 NetworkMapper: Dual-layer scan initiated. External reconnaissance via Shodan API and internal discovery via deployed agent. Coordinating with ThreatScanner and EncryptionDeployer...', false, 'system');
    }
}

function simulateNetworkScan() {
    // Enhanced network configurations with dual-layer findings
    const scenarios = [
        {
            type: 'individual',
            confidence: 92,
            details: {
                publicIPs: 1,
                openPorts: 3,
                internalDevices: 12,
                services: 6,
                complexity: 'Low',
                infrastructure: 'Single VPS/Cloud Instance',
                recommendation: 'Single Server Protection is perfect for your setup',
                vulnerabilities: 0,
                encryptionGaps: 2
            }
        },
        {
            type: 'business',
            confidence: 87,
            details: {
                publicIPs: 3,
                openPorts: 7,
                internalDevices: 127,
                services: 24,
                complexity: 'Medium',
                infrastructure: 'Multi-location business network',
                recommendation: 'Multi-Site Security recommended for your scale',
                vulnerabilities: 2,
                encryptionGaps: 5
            }
        },
        {
            type: 'enterprise',
            confidence: 94,
            details: {
                publicIPs: 12,
                openPorts: 42,
                internalDevices: 1926,
                services: 156,
                complexity: 'High',
                infrastructure: 'Enterprise data center infrastructure',
                recommendation: 'Global Infrastructure Defense required for your scale',
                vulnerabilities: 3,
                encryptionGaps: 18
            }
        }
    ];
    
    // Randomly select a scenario (in production, this would be real network analysis)
    return scenarios[Math.floor(Math.random() * scenarios.length)];
}

function showScanResults(recommendation) {
    console.log('Showing enhanced scan results:', recommendation);
    const scanProgress = document.getElementById('scanProgress');
    const autoScanBtn = document.getElementById('autoScanBtn');
    
    // Hide progress
    if (scanProgress) scanProgress.style.display = 'none';
    
    // Create enhanced results modal
    showEnhancedScanResultsModal(recommendation);
    
    // Update chat with detailed results
    if (window.sentinelChat && SentinelState.chatOpen) {
        sentinelChat.addMessage(`🎯 NetworkMapper: Dual-layer scan complete!
External Scan: ${recommendation.details.publicIPs} public IPs, ${recommendation.details.openPorts} open ports detected
Internal Scan: ${recommendation.details.internalDevices} devices discovered
Security Gaps: ${recommendation.details.encryptionGaps} encryption gaps, ${recommendation.details.vulnerabilities} vulnerabilities
Recommendation: ${recommendation.details.recommendation}
Confidence: ${recommendation.confidence}%`, false, 'system');
    }
}

function showEnhancedScanResultsModal(recommendation) {
    // Create enhanced results modal with checkout option
    const modal = document.createElement('div');
    modal.className = 'modal-overlay scan-results-modal';
    modal.style.display = 'flex';
    modal.innerHTML = `
        <div class="modal scan-results-modal-content">
            <div class="modal-header">
                <h2 class="modal-title">🎯 Dual-Layer Network Discovery Complete</h2>
            </div>
            <div class="modal-content">
                <div class="scan-results-summary">
                    <div class="summary-grid">
                        <div class="summary-item">
                            <span class="summary-label">External Exposure</span>
                            <span class="summary-value">${recommendation.details.publicIPs} Public IPs • ${recommendation.details.openPorts} Open Ports</span>
                        </div>
                        <div class="summary-item">
                            <span class="summary-label">Internal Discovery</span>
                            <span class="summary-value">${recommendation.details.internalDevices} Devices • ${recommendation.details.services} Services</span>
                        </div>
                        <div class="summary-item">
                            <span class="summary-label">Infrastructure Type</span>
                            <span class="summary-value">${recommendation.details.infrastructure}</span>
                        </div>
                        <div class="summary-item">
                            <span class="summary-label">Security Gaps</span>
                            <span class="summary-value">${recommendation.details.encryptionGaps} Encryption Gaps • ${recommendation.details.vulnerabilities} Vulnerabilities</span>
                        </div>
                    </div>
                    
                    <div class="recommendation-banner">
                        <div class="banner-icon">🚀</div>
                        <div class="banner-content">
                            <h3>Recommended Configuration</h3>
                            <p>${recommendation.details.recommendation}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-actions">
                <button class="modal-btn modal-btn-primary" onclick="proceedToCheckout('${recommendation.type}')">
                    View Pricing & Activate
                </button>
                <button class="modal-btn modal-btn-secondary" onclick="closeScanResultsModal()">
                    Review Details First
                </button>
            </div>
        </div>
    `;
    
    // Add enhanced modal styles
    if (!document.querySelector('#enhanced-scan-modal-styles')) {
        const style = document.createElement('style');
        style.id = 'enhanced-scan-modal-styles';
        style.textContent = `
            .scan-results-modal-content {
                max-width: 600px;
                max-height: 80vh;
                overflow-y: auto;
            }
            
            .summary-grid {
                display: grid;
                grid-template-columns: 1fr;
                gap: 15px;
                margin-bottom: 25px;
            }
            
            .summary-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 15px;
                background: rgba(0, 255, 136, 0.05);
                border: 1px solid rgba(0, 255, 136, 0.2);
                border-radius: 10px;
            }
            
            .summary-label {
                font-size: 14px;
                color: var(--text-secondary);
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 1px;
            }
            
            .summary-value {
                font-size: 14px;
                font-weight: bold;
                color: var(--primary);
                text-align: right;
            }
            
            .recommendation-banner {
                background: linear-gradient(135deg, rgba(0, 255, 136, 0.1) 0%, rgba(0, 204, 255, 0.05) 100%);
                border: 2px solid var(--primary);
                border-radius: 15px;
                padding: 25px;
                display: flex;
                align-items: center;
                gap: 20px;
            }
            
            .banner-icon {
                font-size: 48px;
                filter: drop-shadow(0 0 20px var(--primary));
            }
            
            .banner-content h3 {
                font-size: 20px;
                color: var(--primary);
                margin-bottom: 8px;
            }
            
            .banner-content p {
                font-size: 16px;
                color: var(--text-secondary);
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(modal);
    
    // Close on overlay click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeScanResultsModal();
        }
    });
}

function closeScanResultsModal() {
    const modal = document.querySelector('.scan-results-modal');
    if (modal) {
        modal.remove();
    }
    
    // Reset scan button
    const autoScanBtn = document.getElementById('autoScanBtn');
    if (autoScanBtn) {
        autoScanBtn.disabled = false;
        autoScanBtn.innerHTML = `
            <span class="scan-icon">🔍</span>
            <span class="scan-text">Start Network Discovery</span>
            <span class="scan-subtitle">External + Internal Dual-Layer Scan</span>
        `;
    }
}

// New function to proceed to checkout
function proceedToCheckout(packageType) {
    closeScanResultsModal();
    
    // Apply configuration and show checkout
    selectScale(packageType, true);
    
    // Show checkout section after a delay
    setTimeout(() => {
        showCheckoutSection(packageType);
    }, 500);
}

function showCheckoutSection(packageType) {
    const checkoutSection = document.getElementById('checkoutSection');
    const pricingSummary = document.getElementById('pricingSummary');
    
    if (!checkoutSection || !pricingSummary) return;
    
    // Get pricing based on package
    const pricing = {
        individual: {
            name: 'Single Server Protection',
            licenseFee: 29,
            endpointCost: 0.10,
            estimatedEndpoints: 10
        },
        business: {
            name: 'Multi-Site Security',
            licenseFee: 149,
            endpointCost: 0.08,
            estimatedEndpoints: 127
        },
        enterprise: {
            name: 'Global Infrastructure Defense',
            licenseFee: 499,
            endpointCost: 0.05,
            estimatedEndpoints: 1926
        }
    };
    
    const plan = pricing[packageType];
    const endpointTotal = plan.estimatedEndpoints * plan.endpointCost;
    const totalMonthly = plan.licenseFee + endpointTotal;
    
    pricingSummary.innerHTML = `
        <div class="pricing-item">
            <span class="pricing-label">Plan</span>
            <span class="pricing-value">${plan.name}</span>
        </div>
        <div class="pricing-item">
            <span class="pricing-label">License Fee</span>
            <span class="pricing-value">$${plan.licenseFee}/month</span>
        </div>
        <div class="pricing-item">
            <span class="pricing-label">Discovered Endpoints (${plan.estimatedEndpoints})</span>
            <span class="pricing-value">$${endpointTotal.toFixed(2)}/month</span>
        </div>
        <div class="pricing-item">
            <span class="pricing-label">AI Sentinel-X API Key</span>
            <span class="pricing-value">Included</span>
        </div>
        <div class="pricing-item">
            <span class="pricing-label">Total Monthly</span>
            <span class="pricing-value">$${totalMonthly.toFixed(2)}</span>
        </div>
    `;
    
    // Show checkout section
    checkoutSection.style.display = 'block';
    
    // Scroll to checkout
    checkoutSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Update chat
    if (window.sentinelChat) {
        sentinelChat.addMessage(`💳 Ready for checkout! ${plan.name} plan selected. Total: $${totalMonthly.toFixed(2)}/month. Your AI Sentinel-X API key will be automatically configured upon payment.`, false, 'system');
    }
}

// Process checkout (demo mode)
function processCheckout() {
    // In demo mode, simulate successful checkout
    if (window.sentinelChat && !SentinelState.chatOpen) {
        window.sentinelChat.toggle();
    }
    
    setTimeout(() => {
        if (window.sentinelChat) {
            sentinelChat.addMessage('💳 Processing secure payment via Stripe...', false, 'system');
        }
        
        // Simulate payment processing
        setTimeout(() => {
            if (window.sentinelChat) {
                sentinelChat.addMessage('✅ Payment successful! AI Sentinel-X is now active.', false, 'system');
                sentinelChat.addMessage('🔑 Your AI Sentinel-X API key has been automatically configured in Settings.', false, 'system');
                sentinelChat.addMessage('📋 Next steps: Add your Shodan API key for external scanning and OpenAI key for enhanced AI capabilities.', false, 'system');
            }
            
            // Store demo API key
            localStorage.setItem('sentinel_api_key', 'sk-sentinel-' + Math.random().toString(36).substr(2, 16));
            
            // Hide checkout section
            const checkoutSection = document.getElementById('checkoutSection');
            if (checkoutSection) {
                checkoutSection.style.display = 'none';
            }
            
            // Start showing activity feed using page-specific implementation
            if (typeof setupNetworkActivityFeed === 'function') {
                setupNetworkActivityFeed();
            }
            
            // Simulate finding encryption gaps after activation
            setTimeout(() => {
                simulateEncryptionGaps();
            }, 3000);
            
        }, 2000);
    }, 500);
}

// Select scale and configure interface
function selectScale(scale, userSelected = true) {
    console.log('Selecting scale:', scale);
    if (!ScaleConfigs[scale]) return;

    currentScale = scale;
    window.currentScale = scale;
    if (window.SentinelState) {
        SentinelState.currentScale = scale;
    }
    const config = ScaleConfigs[scale];

    // Hide environment detection
    const envDetection = document.getElementById('environmentDetection');
    if (envDetection) {
        envDetection.style.display = 'none';
    }

    // Update scale indicator
    updateScaleIndicator(config);

    // Update body class for CSS targeting
    document.body.className = `${scale}-mode`;

    // Configure interface based on scale
    configureInterfaceForScale(scale, config);

    // Initialize data for scale
    initializeDataForScale(scale, config);

    // Show all main sections including dual-layer scanning
    showMainSections();
    
    // Show and populate dual-layer scanning sections
    const scanningSections = document.getElementById('scanningSections');
    if (scanningSections) {
        scanningSections.style.display = 'grid';
        populateScanningPanels();
    }

    // Populate all grids and data
    populateAllContent();

    // Save preference
    if (userSelected) {
        localStorage.setItem('sentinel_scale', scale);
    }

    // Setup network activity feed for this scale
    if (typeof setupNetworkActivityFeed === 'function') {
        setupNetworkActivityFeed();
    }

    // Update chat context with comprehensive cyber defense focus
    if (window.sentinelChat && SentinelState.chatOpen && userSelected) {
        sentinelChat.addMessage(`NetworkMapper: Configured for ${config.text.toLowerCase()} scale. Dual-layer scanning active: external via Shodan, internal via deployed agent. Coordinating with ThreatScanner, EncryptionDeployer, and DefenseOrchestrator for comprehensive ${config.chatContext}.`, false, 'system');
    }
}

// Show all main sections
function showMainSections() {
    // IMPORTANT: Show sub-agent status
    const subAgentStatus = document.getElementById('subAgentStatus');
    if (subAgentStatus) {
        subAgentStatus.style.display = 'flex';
    }
    
    const sections = ['ipRangeManager', 'dashboardInteractive', 'networkOverview', 'scanningSections', 'deviceDiscovery'];
    sections.forEach(sectionId => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.style.display = sectionId === 'scanningSections' ? 'grid' : 'block';
        }
    });
}

// Update scale indicator
function updateScaleIndicator(config) {
    const scaleIndicator = document.getElementById('scaleIndicator');
    const scaleIcon = document.getElementById('scaleIcon');
    const scaleText = document.getElementById('scaleText');
    
    if (scaleIndicator && scaleIcon && scaleText) {
        scaleIndicator.className = `scale-indicator ${config.className}`;
        scaleIcon.textContent = config.icon;
        scaleText.textContent = config.text;
    }
}

// Configure interface elements based on scale
function configureInterfaceForScale(scale, config) {
    // Update sub-agent description
    const subAgentDesc = document.getElementById('subAgentDescription');
    if (subAgentDesc) {
        subAgentDesc.textContent = config.description;
    }

    // Update dashboard title
    const titles = {
        individual: 'Single Server Discovery',
        business: 'Multi-Site Network Discovery', 
        enterprise: 'Enterprise Network Discovery'
    };
    
    const interactiveTitle = document.getElementById('interactiveTitle');
    if (interactiveTitle) {
        interactiveTitle.textContent = titles[scale];
    }

    const scanDetails = document.getElementById('scanDetails');
    if (scanDetails) {
        scanDetails.textContent = 'Dual-Layer Monitoring Active';
    }

    // Update dashboard description
    const descriptions = {
        individual: '🤖 <strong>Server monitoring active</strong> • External scan via Shodan • Internal agent deployed',
        business: '🤖 <strong>Multi-site autonomous scanning</strong> • Dual-layer discovery • Cross-location correlation',
        enterprise: '🤖 <strong>Enterprise autonomous scanning</strong> • Global threat intelligence • Full infrastructure mapping'
    };
    
    const dashboardDesc = document.getElementById('dashboardDescription');
    if (dashboardDesc) {
        dashboardDesc.innerHTML = descriptions[scale];
    }

    // Update range manager title
    const ipRangeTitle = document.getElementById('ipRangeTitle');
    if (ipRangeTitle) {
        const rangeTitles = {
            individual: 'Server Range Management',
            business: 'Business Network Ranges',
            enterprise: 'Enterprise IP Range Management'
        };
        ipRangeTitle.textContent = rangeTitles[scale];
    }

    // Update add range button
    const addRangeBtn = document.getElementById('addRangeBtn');
    if (addRangeBtn) {
        addRangeBtn.textContent = scale === 'individual' ? 'Add Server Range' : 'Add IP Range';
    }

    // Update metrics label
    const networksLabel = document.getElementById('networksLabel');
    if (networksLabel) {
        const labels = {
            individual: 'Server',
            business: 'Locations', 
            enterprise: 'IP Ranges'
        };
        networksLabel.textContent = labels[scale];
    }

    // Update overview title
    const overviewTitle = document.getElementById('overviewTitle');
    if (overviewTitle) {
        const overviewTitles = {
            individual: 'Server Overview',
            business: 'Business Network Overview',
            enterprise: 'Enterprise Infrastructure Overview'
        };
        overviewTitle.textContent = overviewTitles[scale];
    }

    // Update discovery title
    const discoveryTitle = document.getElementById('discoveryTitle');
    if (discoveryTitle) {
        const discoveryTitles = {
            individual: 'Server Device Discovery',
            business: 'Business Device Discovery',
            enterprise: 'Enterprise Device Discovery'
        };
        discoveryTitle.textContent = discoveryTitles[scale];
    }
}

// Initialize data structures for each scale
function initializeDataForScale(scale, config) {
    // Reset data
    ipRanges = [];
    internalDevices = [];
    deviceCounter = 1;

    // Generate appropriate IP ranges based on scale
    if (scale === 'individual') {
        ipRanges = [{
            id: 'server',
            name: 'Production Server',
            range: '203.0.113.42/32',
            location: 'New York, US',
            organization: 'DigitalOcean',
            status: 'Active',
            devices: 1,
            services: 6,
            vulnerabilities: 0,
            bandwidth: '1Gbps'
        }];
        
        // Generate internal devices for individual
        internalDevices = [
            {
                id: 'server-1',
                name: 'Web Server',
                ip: '203.0.113.42',
                type: 'Server',
                icon: '🖥️',
                services: 'HTTP, HTTPS, SSH',
                status: 'Secure',
                encryption: 'AES-256-GCM',
                aiStatus: 'Monitored'
            }
        ];
        deviceCounter = 2;
    } else if (scale === 'business') {
        ipRanges = [
            {
                id: 'headquarters',
                name: 'Headquarters',
                range: '203.0.113.0/26',
                location: 'Columbia, SC',
                organization: 'Business Fiber',
                status: 'Active',
                devices: 67,
                services: 12,
                vulnerabilities: 1,
                bandwidth: '1Gbps'
            },
            {
                id: 'branch-atlanta',
                name: 'Atlanta Office',
                range: '203.0.113.64/27',
                location: 'Atlanta, GA',
                organization: 'Business Fiber',
                status: 'Active',
                devices: 34,
                services: 8,
                vulnerabilities: 1,
                bandwidth: '500Mbps'
            },
            {
                id: 'branch-charlotte',
                name: 'Charlotte Office',
                range: '203.0.113.96/28',
                location: 'Charlotte, NC',
                organization: 'Business Fiber',
                status: 'Active',
                devices: 26,
                services: 4,
                vulnerabilities: 0,
                bandwidth: '300Mbps'
            }
        ];

        // Generate internal devices for business
        internalDevices = [
            {
                id: 'hq-dc-1',
                name: 'Main Domain Controller',
                ip: '203.0.113.10',
                type: 'Domain Controller',
                icon: '🏢',
                services: 'AD, DNS, DHCP',
                status: 'Secure',
                encryption: 'Hybrid-resistant',
                aiStatus: 'Monitored'
            },
            {
                id: 'hq-mail-1',
                name: 'Exchange Server',
                ip: '203.0.113.25',
                type: 'Mail Server',
                icon: '📧',
                services: 'SMTP, IMAP, EWS',
                status: 'Secure',
                encryption: 'Hybrid-resistant',
                aiStatus: 'Monitored'
            },
            {
                id: 'atl-fw-1',
                name: 'Atlanta Firewall',
                ip: '203.0.113.65',
                type: 'Security Device',
                icon: '🛡️',
                services: 'Firewall, VPN',
                status: 'Secure',
                encryption: 'Hybrid-resistant',
                aiStatus: 'Monitored'
            },
            {
                id: 'char-switch-1',
                name: 'Charlotte Core Switch',
                ip: '203.0.113.97',
                type: 'Network Device',
                icon: '🔀',
                services: 'Switching, VLAN',
                status: 'Secure',
                encryption: 'Hybrid-resistant',
                aiStatus: 'Monitored'
            }
        ];
        deviceCounter = 128;
    } else { // enterprise
        ipRanges = [
            {
                id: 'primary-east',
                name: 'Primary-DC-East',
                range: '203.0.113.0/24',
                location: 'Virginia, US',
                organization: 'AS64512',
                status: 'Active',
                devices: 847,
                services: 42,
                vulnerabilities: 1,
                bandwidth: '15.8GB/s'
            },
            {
                id: 'secondary-west',
                name: 'Secondary-DC-West',
                range: '198.51.100.0/24',
                location: 'Oregon, US',
                organization: 'AS64512',
                status: 'Active',
                devices: 623,
                services: 38,
                vulnerabilities: 0,
                bandwidth: '12.4GB/s'
            },
            {
                id: 'backup-eu',
                name: 'Backup-DC-EU',
                range: '192.0.2.0/24',
                location: 'Frankfurt, DE',
                organization: 'AS64513',
                status: 'Active',
                devices: 456,
                services: 28,
                vulnerabilities: 1,
                bandwidth: '9.2GB/s'
            }
        ];

        // Generate internal devices for enterprise
        internalDevices = [
            {
                id: 'va-core-1',
                name: 'VA Core Router',
                ip: '203.0.113.1',
                type: 'Core Router',
                icon: '🌐',
                services: 'BGP, OSPF, MPLS',
                status: 'Secure',
                encryption: 'Hybrid-resistant',
                aiStatus: 'Monitored'
            },
            {
                id: 'va-lb-1',
                name: 'Load Balancer Cluster',
                ip: '203.0.113.10',
                type: 'Load Balancer',
                icon: '⚖️',
                services: 'HTTP LB, SSL Term',
                status: 'Secure',
                encryption: 'Hybrid-resistant',
                aiStatus: 'Monitored'
            },
            {
                id: 'or-db-1',
                name: 'Database Cluster',
                ip: '198.51.100.20',
                type: 'Database',
                icon: '🗄️',
                services: 'PostgreSQL, Redis',
                status: 'Secure',
                encryption: 'Hybrid-resistant',
                aiStatus: 'Monitored'
            },
            {
                id: 'de-backup-1',
                name: 'Backup Storage',
                ip: '192.0.2.50',
                type: 'Storage',
                icon: '💾',
                services: 'Object Storage, Backup',
                status: 'Secure',
                encryption: 'Hybrid-resistant',
                aiStatus: 'Monitored'
            },
            {
                id: 'va-security-1',
                name: 'Security Operations',
                ip: '203.0.113.100',
                type: 'Security Device',
                icon: '🛡️',
                services: 'SIEM, IDS/IPS',
                status: 'Secure',
                encryption: 'Hybrid-resistant',
                aiStatus: 'Monitored'
            },
            {
                id: 'or-app-1',
                name: 'Application Server',
                ip: '198.51.100.100',
                type: 'Application Server',
                icon: '🚀',
                services: 'API Gateway, Microservices',
                status: 'Secure',
                encryption: 'Hybrid-resistant',
                aiStatus: 'Monitored'
            }
        ];
        deviceCounter = 2848;
    }
}

// Populate all content grids
function populateAllContent() {
    updateMetrics();
    populateIPRangesGrid();
    populateOverviewGrid();
    populateDeviceGrid();
}

function updateMetrics() {
    if (!currentScale) return;

    const totalRanges = ipRanges.length;
    const totalDevices = ipRanges.reduce((sum, range) => sum + range.devices, 0);
    const totalServices = ipRanges.reduce((sum, range) => sum + range.services, 0);

    // Update sub-agent metrics
    const totalNetworks = document.getElementById('totalNetworks');
    const discoveredDevices = document.getElementById('discoveredDevices');
    const openServices = document.getElementById('openServices');
    const newDevices = document.getElementById('newDevices');

    if (totalNetworks) totalNetworks.textContent = totalRanges.toString();
    if (discoveredDevices) discoveredDevices.textContent = totalDevices.toLocaleString();
    if (openServices) openServices.textContent = totalServices.toString();
    if (newDevices) newDevices.textContent = Math.floor(Math.random() * 5 + 12).toString();
}

// Populate IP ranges grid
function populateIPRangesGrid() {
    const grid = document.getElementById('ipRangesGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    ipRanges.forEach((range, index) => {
        const card = document.createElement('div');
        card.className = 'ip-range-card';
        
        let statusClass = 'status-secure';
        if (range.status === 'Migrating') statusClass = 'status-warning';
        if (range.vulnerabilities > 0) statusClass = 'status-vulnerable';
        
        card.innerHTML = `
            <div class="range-header">
                <div class="range-name">${range.name}</div>
                <div class="range-status ${statusClass}">${range.status}</div>
            </div>
            <div class="range-info">
                <div class="info-item">
                    <div class="info-label">IP Range</div>
                    <div class="info-value">${range.range}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Location</div>
                    <div class="info-value">${range.location}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Organization</div>
                    <div class="info-value">${range.organization}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Bandwidth</div>
                    <div class="info-value">${range.bandwidth}</div>
                </div>
            </div>
            <div class="range-metrics">
                <div class="range-metric">
                    <div class="range-metric-value">${range.devices}</div>
                    <div class="range-metric-label">Devices</div>
                </div>
                <div class="range-metric">
                    <div class="range-metric-value">${range.services}</div>
                    <div class="range-metric-label">Services</div>
                </div>
                <div class="range-metric">
                    <div class="range-metric-value">${range.vulnerabilities}</div>
                    <div class="range-metric-label">Vulnerabilities</div>
                </div>
            </div>
        `;
        
        card.onclick = () => showRangeDetails(range);
       grid.appendChild(card);
   });
}

// Populate overview grid
function populateOverviewGrid() {
   const grid = document.getElementById('overviewGrid');
   if (!grid) return;

   grid.innerHTML = '';

   const overviewData = getOverviewData();
   
   overviewData.forEach(item => {
       const card = document.createElement('div');
       card.className = 'overview-card';
       card.onclick = () => showOverviewDetails(item.type);
       
       card.innerHTML = `
           <div class="overview-icon">${item.icon}</div>
           <div class="overview-value">${item.value}</div>
           <div class="overview-label">${item.label}</div>
       `;
       
       grid.appendChild(card);
   });
}

function getOverviewData() {
   const totalDevices = ipRanges.reduce((sum, range) => sum + range.devices, 0);
   const totalServices = ipRanges.reduce((sum, range) => sum + range.services, 0);
   const totalVulnerabilities = ipRanges.reduce((sum, range) => sum + range.vulnerabilities, 0);

   if (currentScale === 'individual') {
       return [
           { icon: '🖥️', value: '1', label: 'Server', type: 'serverIP' },
           { icon: '🌐', value: totalServices.toString(), label: 'Services', type: 'serverServices' },
           { icon: '🔒', value: 'Hybrid', label: 'Encryption', type: 'encryption' },
           { icon: '🛡️', value: totalVulnerabilities.toString(), label: 'Threats', type: 'threats' }
       ];
   } else if (currentScale === 'business') {
       return [
           { icon: '🏢', value: ipRanges.length.toString(), label: 'Sites', type: 'businessSites' },
           { icon: '💻', value: totalDevices.toLocaleString(), label: 'Devices', type: 'devices' },
           { icon: '🌐', value: totalServices.toString(), label: 'Services', type: 'services' },
           { icon: '🔐', value: 'Active', label: 'Encryption', type: 'encryption' },
           { icon: '⚠️', value: totalVulnerabilities.toString(), label: 'Alerts', type: 'alerts' },
           { icon: '📊', value: '99.8%', label: 'Uptime', type: 'uptime' }
       ];
   } else { // enterprise
       return [
           { icon: '🏭', value: ipRanges.length.toString(), label: 'Data Centers', type: 'enterpriseRanges' },
           { icon: '💻', value: totalDevices.toLocaleString(), label: 'Devices', type: 'devices' },
           { icon: '🌐', value: totalServices.toString(), label: 'Services', type: 'services' },
           { icon: '🔐', value: 'Hybrid', label: 'Encryption', type: 'encryption' },
           { icon: '⚠️', value: totalVulnerabilities.toString(), label: 'Critical', type: 'critical' },
           { icon: '📊', value: '99.9%', label: 'Availability', type: 'availability' },
           { icon: '🔄', value: '24/7', label: 'Monitoring', type: 'monitoring' },
           { icon: '🌍', value: '3', label: 'Regions', type: 'regions' }
       ];
   }
}

// Populate device grid
function populateDeviceGrid() {
   const grid = document.getElementById('deviceGrid');
   if (!grid) return;

   grid.innerHTML = '';

   internalDevices.forEach((device, index) => {
       const card = document.createElement('div');
       card.className = 'device-card';
       if (index < 2) card.classList.add('new-device'); // Mark first two as new
       
       card.innerHTML = `
           <div class="device-header">
               <div class="device-icon">${device.icon}</div>
           </div>
           <div class="device-name">${device.name}</div>
           <div class="device-ip">${device.ip}</div>
           <div class="device-services">Services: ${device.services}</div>
           <div class="device-ai-status">AI Status: ${device.aiStatus}</div>
           <div class="device-encryption">
               🔐 ${device.encryption}
           </div>
       `;
       
       card.onclick = () => showDeviceDetails(device);
       grid.appendChild(card);
   });
}

// Populate scanning panels with dual-layer data
function populateScanningPanels() {
   // External services data
   const externalServices = window.externalServices || [
       {
           name: 'HTTPS (443/tcp)',
           details: 'nginx/1.18.0 • TLS 1.3',
           encryption: '🔐 AES-256-GCM + CRYSTALS-Kyber',
           status: 'Secure',
           statusClass: 'status-secure'
       },
       {
           name: 'SSH (22/tcp)',
           details: 'OpenSSH_7.4 • Key Auth Only',
           encryption: '🔐 Hybrid: Classical + PQ Keys',
           status: 'Secure',
           statusClass: 'status-secure'
       },
       {
           name: 'RDP (3389/tcp)',
           details: 'Windows Server 2019 • NLA + TLS 1.2',
           encryption: '⚠️ Classical only - upgrade needed',
           status: 'Monitor',
           statusClass: 'status-update'
       },
       {
           name: 'SMB (445/tcp)',
           details: 'SMBv2 • Outdated',
           encryption: '❌ Weak encryption',
           status: 'Vulnerable',
           statusClass: 'status-vulnerable'
       }
   ];

   const internalServices = window.internalServices || [
       {
           name: 'Domain Controllers',
           details: '2 servers • AD DS • Kerberos',
           encryption: '🔐 Full hybrid encryption',
           status: 'Secure',
           statusClass: 'status-secure'
       },
       {
           name: 'Database Servers',
           details: '5 instances • TDE enabled',
           encryption: '🔐 AES-256 + Kyber-1024',
           status: 'Secure',
           statusClass: 'status-secure'
       },
       {
           name: 'IoT Devices',
           details: '47 devices • Mixed security',
           encryption: '⚠️ Partial encryption support',
           status: 'Monitor',
           statusClass: 'status-update'
       },
       {
           name: 'Workstations',
           details: '189 systems • BitLocker enabled',
           encryption: '🔐 Hybrid disk encryption',
           status: 'Update',
           statusClass: 'status-update'
       }
   ];

   // Populate external services
   const externalList = document.getElementById('externalServicesList');
   if (externalList) {
       externalList.innerHTML = '';
       externalServices.forEach(service => {
           const item = createServiceItem(service);
           externalList.appendChild(item);
       });
   }
   
   // Populate internal services
   const internalList = document.getElementById('internalServicesList');
   if (internalList) {
       internalList.innerHTML = '';
       internalServices.forEach(service => {
           const item = createServiceItem(service);
           internalList.appendChild(item);
       });
   }
}

function createServiceItem(service) {
   const item = document.createElement('div');
   item.className = 'service-item';
   item.onclick = () => showServiceDetails(service.name);
   
   item.innerHTML = `
       <div class="service-info">
           <div class="service-name">${service.name}</div>
           <div class="service-details">${service.details}</div>
           <div class="service-encryption">${service.encryption}</div>
       </div>
       <div class="service-status ${service.statusClass}">${service.status.toUpperCase()}</div>
   `;
   
   return item;
}

// Modal and interaction functions
function showAddRangeModal() {
   const modal = document.getElementById('addRangeModal');
   if (modal) modal.style.display = 'flex';
}

function closeAddRangeModal() {
   const modal = document.getElementById('addRangeModal');
   if (modal) modal.style.display = 'none';
}

function addIPRange() {
   const name = document.getElementById('rangeName').value.trim();
   const range = document.getElementById('ipRange').value.trim();
   const location = document.getElementById('location').value.trim();
   const organization = document.getElementById('organization').value.trim();
   
   if (!name || !range || !location || !organization) {
       alert('Please fill in all fields');
       return;
   }
   
   // Basic CIDR validation
   if (!SentinelUtils.validateCIDR(range)) {
       alert('Please enter a valid CIDR notation (e.g., 192.168.1.0/24)');
       return;
   }
   
   // Check scale limits
   const config = ScaleConfigs[currentScale];
   if (ipRanges.length >= config.maxRanges) {
       alert(`Maximum ${config.maxRanges} IP ranges allowed for ${currentScale} scale. Upgrade to enterprise for unlimited ranges.`);
       return;
   }
   
   const newRange = {
       id: `range-${Date.now()}`,
       name: name,
       range: range,
       location: location,
       organization: organization,
       status: 'Scanning',
       devices: Math.floor(Math.random() * (config.deviceRange[1] - config.deviceRange[0])) + config.deviceRange[0],
       services: Math.floor(Math.random() * (config.serviceRange[1] - config.serviceRange[0])) + config.serviceRange[0],
       vulnerabilities: Math.floor(Math.random() * 2),
       bandwidth: currentScale === 'individual' ? '100Mbps' : 
                currentScale === 'business' ? (Math.random() * 2 + 0.5).toFixed(1) + 'Gbps' :
                (Math.random() * 20 + 1).toFixed(1) + 'GB/s'
   };
   
   ipRanges.push(newRange);
   populateIPRangesGrid();
   updateMetrics();
   populateOverviewGrid(); // Update overview with new data
   closeAddRangeModal();
   
   // Clear form
   document.getElementById('rangeName').value = '';
   document.getElementById('ipRange').value = '';
   document.getElementById('location').value = '';
   document.getElementById('organization').value = '';
   
   // Update add range button state for individual mode
   if (currentScale === 'individual') {
       const addRangeBtn = document.getElementById('addRangeBtn');
       if (addRangeBtn && ipRanges.length >= ScaleConfigs[currentScale].maxRanges) {
           addRangeBtn.disabled = true;
           addRangeBtn.title = 'Maximum ranges reached for single IP deployment';
       }
   }
   
   if (SentinelState.chatOpen) {
       setTimeout(() => {
           sentinelChat.addMessage(`NetworkMapper: New ${currentScale} range ${name} (${range}) added to monitoring. Initiating dual-layer discovery scan. External scan via Shodan, internal scan via deployed agent across ${newRange.devices} estimated devices...`, false);
       }, 1000);
   }
}

// Rescan Infrastructure Functions
function showRescanModal() {
   const modal = document.getElementById('rescanModal');
   if (modal) modal.style.display = 'flex';
}

function closeRescanModal() {
   const modal = document.getElementById('rescanModal');
   if (modal) modal.style.display = 'none';
}

function confirmRescan() {
   closeRescanModal();
   
   // Show rescan progress in chat
   if (!SentinelState.chatOpen) {
       sentinelChat.toggle();
   }
   
   sentinelChat.addMessage('🔄 Infrastructure rescan initiated...', false, 'system');
   
   // Simulate rescan process with realistic steps
   setTimeout(() => {
       sentinelChat.addMessage('NetworkMapper: Stopping current discovery processes...', false, 'system');
   }, 500);
   
   setTimeout(() => {
       sentinelChat.addMessage('NetworkMapper: Clearing discovery cache and resetting configuration...', false, 'system');
   }, 1200);
   
   setTimeout(() => {
       sentinelChat.addMessage('NetworkMapper: Re-initializing dual-layer detection engine...', false, 'system');
   }, 2000);
   
   setTimeout(() => {
       sentinelChat.addMessage('NetworkMapper: Discovery process reset complete. Please reconfigure your environment.', false, 'system');
       
       // Reset to initial state
       resetToInitialState();
   }, 3000);
}

function resetToInitialState() {
   // Clear saved scale preference to force re-selection
   localStorage.removeItem('sentinel_scale');
   
   // Reset global state
   currentScale = null;
   window.currentScale = null;
   if (window.SentinelState) {
       SentinelState.currentScale = null;
   }
   ipRanges = [];
   internalDevices = [];
   deviceCounter = 1;
   
   // Hide all main sections
   const sections = ['ipRangeManager', 'dashboardInteractive', 'networkOverview', 'scanningSections', 'deviceDiscovery', 'checkoutSection', 'networkActivityFeed'];
   sections.forEach(sectionId => {
       const element = document.getElementById(sectionId);
       if (element) {
           element.style.display = 'none';
       }
   });
   
   // IMPORTANT: Keep sub-agent status visible but reset its state
   const subAgentStatus = document.getElementById('subAgentStatus');
   if (subAgentStatus) {
       subAgentStatus.style.display = 'flex';
       
       // Reset sub-agent description to initial state
       const subAgentDesc = document.getElementById('subAgentDescription');
       if (subAgentDesc) {
           subAgentDesc.textContent = 'Network discovery reset • Awaiting configuration • Reports to Main Agent';
       }
       
       // Reset metrics to dashes
       const totalNetworks = document.getElementById('totalNetworks');
       const discoveredDevices = document.getElementById('discoveredDevices');
       const openServices = document.getElementById('openServices');
       const newDevices = document.getElementById('newDevices');
       const networksLabel = document.getElementById('networksLabel');
       
       if (totalNetworks) totalNetworks.textContent = '-';
       if (discoveredDevices) discoveredDevices.textContent = '-';
       if (openServices) openServices.textContent = '-';
       if (newDevices) newDevices.textContent = '-';
       if (networksLabel) networksLabel.textContent = 'Scanning';
   }
   
   // Reset scale indicator
   const scaleIndicator = document.getElementById('scaleIndicator');
   const scaleIcon = document.getElementById('scaleIcon');
   const scaleText = document.getElementById('scaleText');
   
   if (scaleIndicator && scaleIcon && scaleText) {
       scaleIndicator.className = 'scale-indicator scale-individual';
       scaleIcon.textContent = '🔍';
       scaleText.textContent = 'DETECTING';
   }
   
   // Remove scale class from body
   document.body.className = '';
   
   // Show environment detection
   const envDetection = document.getElementById('environmentDetection');
   if (envDetection) {
       envDetection.style.display = 'block';
   }
   
   // Update detection title for rescan context
   const detectionTitle = document.querySelector('.detection-title');
   const detectionDescription = document.querySelector('.detection-description');
   
   if (detectionTitle) {
       detectionTitle.textContent = '🔄 Network Discovery Reset';
   }
   
   if (detectionDescription) {
       detectionDescription.textContent = 'AI Sentinel-X has reset the network discovery configuration. Please run the dual-layer scan to re-analyze your infrastructure and configure the optimal security solution.';
   }
   
   // Add final chat message
   setTimeout(() => {
       sentinelChat.addMessage('✅ Network discovery reset complete. Environment detection reinitialized. Please run the dual-layer scan to continue.', false, 'system');
   }, 500);
}

// Detail functions
function showRangeDetails(range) {
   if (!SentinelState.chatOpen) sentinelChat.toggle();
   setTimeout(() => {
       sentinelChat.addMessage(`NetworkMapper: Analyzing ${range.name} (${range.range}) in ${range.location}. ${range.devices} devices, ${range.services} services, ${range.vulnerabilities} vulnerabilities. Bandwidth: ${range.bandwidth}. Coordinating with ThreatScanner for vulnerability assessment and EncryptionDeployer for security posture.`, false);
   }, 300);
}

function showDeviceDetails(device) {
   if (!SentinelState.chatOpen) sentinelChat.toggle();
   setTimeout(() => {
       sentinelChat.addMessage(`NetworkMapper: Device ${device.name} (${device.ip}) - ${device.type}. Services: ${device.services}. Status: ${device.status}. Encryption: ${device.encryption}. AI sub-agents monitoring: NetworkMapper → ThreatScanner → EncryptionManager.`, false);
   }, 300);
}

function showOverviewDetails(type) {
   if (!SentinelState.chatOpen) sentinelChat.toggle();
   setTimeout(() => {
       const messages = {
           serverIP: 'NetworkMapper: Server IP analysis - Single public address detected via Shodan with hybrid-ready protection.',
           serverServices: 'NetworkMapper: Server services analysis - All services secured and optimized. Coordinating with EncryptionManager.',
           businessSites: 'NetworkMapper: Multi-site business deployment with site-to-site VPN. VPNMonitor sub-agent active.',
           enterpriseRanges: 'NetworkMapper: Enterprise multi-range deployment across data centers. Full correlation with ThreatScanner.',
           devices: 'NetworkMapper: Device inventory analysis - All endpoints monitored by agent. EncryptionDeployer verified.',
           services: 'NetworkMapper: Service portfolio analysis - All services hybrid-encrypted. CertificateManager monitoring.',
           encryption: 'NetworkMapper: Encryption status - Hybrid-resistant protocols active. Coordinating with EncryptionManager.',
           threats: 'NetworkMapper: Threat landscape analysis - Current risk level assessed by ThreatScanner.',
           alerts: 'NetworkMapper: Alert summary - All critical alerts resolved by DefenseOrchestrator.',
           uptime: 'NetworkMapper: Availability metrics - System performance optimal. AnalyticsEngine tracking.',
           critical: 'NetworkMapper: Critical issue analysis - No unresolved critical issues. DefenseOrchestrator ready.',
           availability: 'NetworkMapper: High availability status - All redundancy systems operational. LogAgent recording.',
           monitoring: 'NetworkMapper: 24/7 monitoring active - Global surveillance operational. All sub-agents coordinated.',
           regions: 'NetworkMapper: Multi-region deployment - Geographic redundancy active. ComplianceMonitor verified.'
       };
       sentinelChat.addMessage(messages[type] || 'NetworkMapper: Network component analysis complete. All sub-agents coordinated.', false);
   }, 300);
}

function showServiceDetails(service) {
   if (!SentinelState.chatOpen) sentinelChat.toggle();
   setTimeout(() => {
       sentinelChat.addMessage(`NetworkMapper: Service ${service} analysis - Configuration optimized for ${currentScale} deployment. All protocols hybrid-encrypted. ThreatScanner monitoring for vulnerabilities. EncryptionDeployer ready for upgrades.`, false);
   }, 300);
}

// V4 Encryption Gap Detection
function simulateEncryptionGaps() {
   const gapDeviceCount = Math.floor(Math.random() * 5) + 1;
   showEncryptionGapAlert(gapDeviceCount);
}

function checkEncryptionGaps() {
   // Periodically check for new encryption gaps
   if (window.currentScale && Math.random() > 0.95) {
       simulateEncryptionGaps();
   }
}

function showEncryptionGapAlert(deviceCount) {
   const alert = document.getElementById('encryptionGapAlert');
   const description = document.getElementById('gapDescription');
   
   if (alert && description) {
       description.textContent = `${deviceCount} devices are not encrypted and require immediate attention.`;
       alert.classList.add('active');
       
       // Add to chat if open
       if (window.sentinelChat && SentinelState.chatOpen) {
           sentinelChat.addMessage(`⚠️ NetworkMapper: Encryption gap detected! ${deviceCount} devices lack proper encryption. Coordinating with EncryptionDeployer for immediate remediation.`, false, 'system');
       }
   }
}

function hideEncryptionGapAlert() {
   const alert = document.getElementById('encryptionGapAlert');
   if (alert) {
       alert.classList.remove('active');
   }
}

// Chat handlers
function handleChatKeyPress(event) {
   if (event.key === 'Enter') {
       sendChatMessage();
   }
}

function sendChatMessage() {
   const input = document.getElementById('aiChatInput');
   if (input && window.sentinelChat) {
       const message = input.value.trim();
       if (message) {
           sentinelChat.sendMessage(message);
           input.value = '';
       }
   }
}

function handleLogout() {
   if (confirm('Are you sure you want to logout? The AI agent will continue protecting your network autonomously.')) {
       localStorage.removeItem('sentinel_auth');
       localStorage.removeItem('sentinel_scale');
       window.location.href = 'index.html';
   }
}

function showAgentShutdownModal() {
   if (window.SentinelEventHandlers) {
       SentinelEventHandlers.showAgentShutdownModal();
   }
}

function toggleChat() {
   if (window.sentinelChat) {
       sentinelChat.toggle();
   }
}

// Global function exports
window.startAutoScan = startAutoScan;
window.selectScale = selectScale;
window.proceedToCheckout = proceedToCheckout;
window.processCheckout = processCheckout;
window.closeScanResultsModal = closeScanResultsModal;
window.showAddRangeModal = showAddRangeModal;
window.closeAddRangeModal = closeAddRangeModal;
window.addIPRange = addIPRange;
window.showRescanModal = showRescanModal;
window.closeRescanModal = closeRescanModal;
window.confirmRescan = confirmRescan;
window.showRangeDetails = showRangeDetails;
window.showDeviceDetails = showDeviceDetails;
window.showOverviewDetails = showOverviewDetails;
window.showServiceDetails = showServiceDetails;
window.closeModalOnOverlay = closeModalOnOverlay;
window.handleChatKeyPress = handleChatKeyPress;
window.sendChatMessage = sendChatMessage;
window.handleLogout = handleLogout;
window.showAgentShutdownModal = showAgentShutdownModal;
window.toggleChat = toggleChat;
window.remediateEncryptionGaps = remediateEncryptionGaps;
window.populateScanningPanels = populateScanningPanels;
window.createServiceItem = createServiceItem;
window.showCheckoutSection = showCheckoutSection;
window.hideEncryptionGapAlert = hideEncryptionGapAlert;
window.checkEncryptionGaps = checkEncryptionGaps;
window.simulateEncryptionGaps = simulateEncryptionGaps;
window.resetToInitialState = resetToInitialState;
window.updateMetrics = updateMetrics;

// Modal close handler
function closeModalOnOverlay(event) {
   if (event.target.classList.contains('modal-overlay')) {
       const modalId = event.target.id;
       if (modalId === 'addRangeModal') {
           closeAddRangeModal();
       } else if (modalId === 'rescanModal') {
           closeRescanModal();
       } else if (modalId === 'agentShutdownModal') {
           if (window.SentinelEventHandlers) {
               SentinelEventHandlers.closeModal(modalId);
           }
       }
   }
}

// Agent shutdown functions
function confirmAgentShutdown() {
   if (window.SentinelEventHandlers) {
       SentinelEventHandlers.confirmAgentShutdown();
   }
}

function closeModal() {
   if (window.SentinelEventHandlers) {
       SentinelEventHandlers.closeModal();
   }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
   console.log('Network core V4 module loaded');
   initializeEnvironmentDetection();
   
   // Auto-update metrics periodically
   setInterval(() => {
       if (currentScale) {
           updateMetrics();
       }
   }, 5000);
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
   module.exports = {
       selectScale,
       initializeEnvironmentDetection,
       resetToInitialState,
       updateMetrics,
       showAddRangeModal,
       addIPRange,
       confirmRescan,
       populateAllContent,
       showMainSections,
       startAutoScan,
       proceedToCheckout,
       processCheckout,
       populateScanningPanels,
       showCheckoutSection,
       hideEncryptionGapAlert,
       checkEncryptionGaps,
       simulateEncryptionGaps
   };
}
