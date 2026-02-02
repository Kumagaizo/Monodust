/**
 * ========================================
 * AI REALITY MAPPER - APPLICATION
 * ========================================
 * 
 * A visualization tool for understanding AI hype vs reality.
 * Built with vanilla JavaScript for simplicity and portability.
 */

class AIRealityMapper {
    constructor() {
        // State
        this.events = [...EVENTS];
        this.categories = CATEGORIES;
        this.companies = COMPANIES;
        this.filteredEvents = [];
        this.selectedCategories = new Set(Object.keys(CATEGORIES));
        this.selectedCompanies = new Set(Object.keys(COMPANIES));
        this.selectedEvent = null;
        this.currentView = 'timeline'; // Timeline as default
        this.timeValue = 100;
        this.theme = 'dark';
        
        // Canvas state
        this.canvas = null;
        this.ctx = null;
        this.nodes = [];
        this.connections = [];
        this.animationId = null;
        this.mouse = { x: 0, y: 0 };
        this.hoveredNode = null;
        
        // Initialize
        this.init();
    }

    init() {
        this.loadTheme();
        this.cacheElements();
        this.setupCanvas();
        this.renderCategoryFilters();
        this.renderCompanyFilters();
        this.attachEventListeners();
        this.filterEvents();
        this.render();
        this.startAnimation();
        this.updateFilterCount();
    }

    // ========== THEME ==========
    
    loadTheme() {
        const savedTheme = localStorage.getItem('ai-reality-mapper-theme');
        if (savedTheme) {
            this.theme = savedTheme;
        }
        document.documentElement.setAttribute('data-theme', this.theme);
    }

    toggleTheme() {
        this.theme = this.theme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', this.theme);
        localStorage.setItem('ai-reality-mapper-theme', this.theme);
    }

    // ========== CACHE ELEMENTS ==========

    cacheElements() {
        this.elements = {
            // Views
            constellationView: document.getElementById('constellationView'),
            timelineView: document.getElementById('timelineView'),
            timelineEvents: document.getElementById('timelineEvents'),
            timelineContainer: document.getElementById('timelineContainer'),
            
            // Canvas
            canvas: document.getElementById('constellationCanvas'),
            
            // Panel
            eventPanel: document.getElementById('eventPanel'),
            closePanel: document.getElementById('closePanel'),
            panelCategory: document.getElementById('panelCategory'),
            panelDate: document.getElementById('panelDate'),
            panelTitle: document.getElementById('panelTitle'),
            panelHype: document.getElementById('panelHype'),
            panelReality: document.getElementById('panelReality'),
            panelGap: document.getElementById('panelGap'),
            panelNote: document.getElementById('panelNote'),
            panelPrediction: document.getElementById('panelPrediction'),
            panelOutcome: document.getElementById('panelOutcome'),
            panelImpact: document.getElementById('panelImpact'),
            panelSource: document.getElementById('panelSource'),
            hypeRing: document.getElementById('hypeRing'),
            realityRing: document.getElementById('realityRing'),
            
            // Filters
            categoryFilters: document.getElementById('categoryFilters'),
            companyFilters: document.getElementById('companyFilters'),
            categoryAll: document.getElementById('categoryAll'),
            categoryClear: document.getElementById('categoryClear'),
            companyAll: document.getElementById('companyAll'),
            companyClear: document.getElementById('companyClear'),
            filterToggle: document.getElementById('filterToggle'),
            filterPanel: document.getElementById('filterPanel'),
            filterCount: document.getElementById('filterCount'),
            visibleCount: document.getElementById('visibleCount'),
            totalCount: document.getElementById('totalCount'),
            
            // Time control
            timeSlider: document.getElementById('timeSlider'),
            timeStart: document.getElementById('timeStart'),
            timeCurrent: document.getElementById('timeCurrent'),
            timeEnd: document.getElementById('timeEnd'),
            
            // View switcher
            viewButtons: document.querySelectorAll('.view-btn'),
            
            // Theme toggle
            themeToggle: document.getElementById('themeToggle')
        };
    }

    setupCanvas() {
        this.canvas = this.elements.canvas;
        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();
    }

    resizeCanvas() {
        const rect = this.canvas.parentElement.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        
        this.canvas.width = rect.width * dpr;
        this.canvas.height = rect.height * dpr;
        this.canvas.style.width = rect.width + 'px';
        this.canvas.style.height = rect.height + 'px';
        
        this.ctx.scale(dpr, dpr);
        this.canvasWidth = rect.width;
        this.canvasHeight = rect.height;
    }

    // ========== EVENT LISTENERS ==========
    
    attachEventListeners() {
        // Window resize
        window.addEventListener('resize', () => {
            this.resizeCanvas();
            this.calculateNodePositions();
            if (this.currentView === 'timeline') {
                this.renderTimeline();
            }
        });

        // Theme toggle
        this.elements.themeToggle.addEventListener('click', () => this.toggleTheme());

        // View switching
        this.elements.viewButtons.forEach(btn => {
            btn.addEventListener('click', () => this.switchView(btn.dataset.view));
        });

        // Close panel
        this.elements.closePanel.addEventListener('click', () => this.closePanel());
        
        // Keyboard
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.closePanel();
        });

        // Canvas interactions
        this.canvas.addEventListener('mousemove', (e) => this.handleCanvasMouseMove(e));
        this.canvas.addEventListener('click', (e) => this.handleCanvasClick(e));
        this.canvas.addEventListener('mouseleave', () => {
            this.hoveredNode = null;
            this.canvas.style.cursor = 'default';
        });

        // Time slider
        this.elements.timeSlider.addEventListener('input', (e) => {
            this.timeValue = parseInt(e.target.value);
            this.filterEvents();
            this.render();
        });

        // Category filter actions
        this.elements.categoryAll.addEventListener('click', () => {
            this.selectedCategories = new Set(Object.keys(this.categories));
            this.updateCategoryButtons();
            this.filterEvents();
            this.render();
            this.updateFilterCount();
        });

        this.elements.categoryClear.addEventListener('click', () => {
            this.selectedCategories = new Set();
            this.updateCategoryButtons();
            this.filterEvents();
            this.render();
            this.updateFilterCount();
        });

        // Company filter actions
        this.elements.companyAll.addEventListener('click', () => {
            this.selectedCompanies = new Set(Object.keys(this.companies));
            this.updateCompanyButtons();
            this.filterEvents();
            this.render();
            this.updateFilterCount();
        });

        this.elements.companyClear.addEventListener('click', () => {
            this.selectedCompanies = new Set();
            this.updateCompanyButtons();
            this.filterEvents();
            this.render();
            this.updateFilterCount();
        });

        // Mobile filter toggle
        this.elements.filterToggle.addEventListener('click', () => {
            this.elements.filterPanel.classList.toggle('open');
        });

        // Close filter panel when clicking outside on mobile
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                if (!e.target.closest('.filter-bar')) {
                    this.elements.filterPanel.classList.remove('open');
                }
            }
        });
    }

    // ========== VIEW MANAGEMENT ==========

    switchView(view) {
        this.currentView = view;
        
        // Update buttons
        this.elements.viewButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.view === view);
        });
        
        // Update views
        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
        document.getElementById(`${view}View`).classList.add('active');
        
        // Re-render
        this.render();
    }

    // ========== FILTERING ==========

    renderCategoryFilters() {
        const container = this.elements.categoryFilters;
        container.innerHTML = '';

        Object.entries(this.categories).forEach(([id, category]) => {
            const btn = document.createElement('button');
            btn.className = 'filter-btn active';
            btn.dataset.category = id;
            btn.textContent = category.label;
            btn.style.color = category.color;
            btn.style.borderColor = category.color;
            
            btn.addEventListener('click', () => this.toggleCategory(id));
            container.appendChild(btn);
        });
    }

    renderCompanyFilters() {
        const container = this.elements.companyFilters;
        container.innerHTML = '';

        Object.entries(this.companies).forEach(([id, company]) => {
            const btn = document.createElement('button');
            btn.className = 'filter-btn active';
            btn.dataset.company = id;
            btn.textContent = company.label;
            btn.style.color = company.color;
            btn.style.borderColor = company.color;
            
            btn.addEventListener('click', () => this.toggleCompany(id));
            container.appendChild(btn);
        });
    }

    toggleCategory(categoryId) {
        if (this.selectedCategories.has(categoryId)) {
            this.selectedCategories.delete(categoryId);
        } else {
            this.selectedCategories.add(categoryId);
        }
        
        this.updateCategoryButtons();
        this.filterEvents();
        this.render();
        this.updateFilterCount();
    }

    toggleCompany(companyId) {
        if (this.selectedCompanies.has(companyId)) {
            this.selectedCompanies.delete(companyId);
        } else {
            this.selectedCompanies.add(companyId);
        }
        
        this.updateCompanyButtons();
        this.filterEvents();
        this.render();
        this.updateFilterCount();
    }

    updateCategoryButtons() {
        document.querySelectorAll('[data-category]').forEach(btn => {
            const isActive = this.selectedCategories.has(btn.dataset.category);
            btn.classList.toggle('active', isActive);
        });
    }

    updateCompanyButtons() {
        document.querySelectorAll('[data-company]').forEach(btn => {
            const isActive = this.selectedCompanies.has(btn.dataset.company);
            btn.classList.toggle('active', isActive);
        });
    }

    updateFilterCount() {
        const totalFilters = this.selectedCategories.size + this.selectedCompanies.size;
        const maxFilters = Object.keys(this.categories).length + Object.keys(this.companies).length;
        const activeFilters = maxFilters - totalFilters;
        
        this.elements.filterCount.textContent = activeFilters > 0 ? activeFilters : '';
        this.elements.filterCount.style.display = activeFilters > 0 ? 'inline' : 'none';
    }

    filterEvents() {
        // Get time range
        const dates = this.events.map(e => new Date(e.date));
        const minDate = new Date(Math.min(...dates));
        const maxDate = new Date(Math.max(...dates));
        const totalMs = maxDate - minDate;
        const cutoffDate = new Date(minDate.getTime() + (totalMs * this.timeValue / 100));
        
        // Update time label
        if (this.timeValue >= 99) {
            this.elements.timeCurrent.textContent = 'Now';
        } else {
            const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            this.elements.timeCurrent.textContent = `${monthNames[cutoffDate.getMonth()]} ${cutoffDate.getFullYear()}`;
        }

        // Filter events
        this.filteredEvents = this.events.filter(event => {
            const eventDate = new Date(event.date);
            const inTimeRange = eventDate <= cutoffDate;
            const categoryMatch = this.selectedCategories.has(event.category);
            const companyMatch = this.selectedCompanies.has(event.company);
            return inTimeRange && categoryMatch && companyMatch;
        });

        // Sort by date
        this.filteredEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

        // Update counts
        this.elements.visibleCount.textContent = this.filteredEvents.length;
        this.elements.totalCount.textContent = this.events.length;

        // Calculate positions for constellation
        this.calculateNodePositions();
    }

    // ========== CONSTELLATION VIEW ==========
    
    calculateNodePositions() {
        const centerX = this.canvasWidth / 2;
        const centerY = this.canvasHeight / 2;
        const maxRadius = Math.min(centerX, centerY) * 0.75;
        
        // Sort events by date for logical positioning
        const sortedEvents = [...this.filteredEvents].sort((a, b) => 
            new Date(a.date) - new Date(b.date)
        );
        
        // Get date range
        if (sortedEvents.length === 0) {
            this.nodes = [];
            return;
        }
        
        const dates = sortedEvents.map(e => new Date(e.date).getTime());
        const minDate = Math.min(...dates);
        const maxDate = Math.max(...dates);
        const dateRange = maxDate - minDate || 1;
        
        this.nodes = sortedEvents.map((event, index) => {
            const eventDate = new Date(event.date).getTime();
            
            // LOGICAL POSITIONING:
            // - Angle based on date (older = left, newer = right, like reading)
            // - Radius based on "impact" (hype + reality combined)
            
            // Angle: Map date to angle (start at top-left, go clockwise)
            const dateProgress = (eventDate - minDate) / dateRange;
            const angle = -Math.PI * 0.75 + (dateProgress * Math.PI * 1.5); // From ~135° to ~405° (wrapping)
            
            // Radius: Higher combined score = closer to center (more important)
            const combinedScore = event.hype + event.reality;
            const maxCombined = 20; // Max possible (10 + 10)
            const scoreRatio = combinedScore / maxCombined;
            // Invert: higher score = smaller radius (closer to center)
            const radius = maxRadius * (0.3 + (1 - scoreRatio) * 0.6);
            
            // Add slight variation based on gap to prevent perfect overlap
            const gap = event.reality - event.hype;
            const radiusOffset = gap * 3; // Spread based on gap
            
            const x = centerX + Math.cos(angle) * (radius + radiusOffset);
            const y = centerY + Math.sin(angle) * (radius + radiusOffset);
            
            // Node size based on combined score
            const size = 6 + scoreRatio * 10;
            
            // Color based on hype vs reality gap
            let color;
            if (gap > 1) {
                color = '#00d4aa'; // Exceeded hype (green)
            } else if (gap < -1) {
                color = '#ff6b35'; // Overhyped (orange)
            } else {
                color = '#a78bfa'; // Matched (purple)
            }
            
            return {
                event,
                x,
                y,
                size,
                color,
                angle,
                dateProgress
            };
        });

        // Create connections between temporally close events
        this.connections = [];
        for (let i = 0; i < this.nodes.length; i++) {
            for (let j = i + 1; j < this.nodes.length; j++) {
                const node1 = this.nodes[i];
                const node2 = this.nodes[j];
                
                // Connect events within 45 days of each other
                const date1 = new Date(node1.event.date);
                const date2 = new Date(node2.event.date);
                const daysDiff = Math.abs(date1 - date2) / (1000 * 60 * 60 * 24);
                
                if (daysDiff < 45) {
                    this.connections.push({
                        from: node1,
                        to: node2,
                        strength: 1 - (daysDiff / 45)
                    });
                }
            }
        }
    }

    drawConstellation() {
        const ctx = this.ctx;
        const isDark = this.theme === 'dark';
        
        // Clear canvas
        ctx.fillStyle = isDark ? '#0a0a0a' : '#ffffff';
        ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
        
        // Draw subtle grid
        ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.03)';
        ctx.lineWidth = 1;
        
        const gridSize = 50;
        for (let x = 0; x < this.canvasWidth; x += gridSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, this.canvasHeight);
            ctx.stroke();
        }
        for (let y = 0; y < this.canvasHeight; y += gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(this.canvasWidth, y);
            ctx.stroke();
        }

        // Draw concentric circles as guides (representing time periods)
        const centerX = this.canvasWidth / 2;
        const centerY = this.canvasHeight / 2;
        const maxRadius = Math.min(centerX, centerY) * 0.75;
        
        ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)';
        ctx.lineWidth = 1;
        
        for (let r = maxRadius * 0.3; r <= maxRadius; r += maxRadius * 0.2) {
            ctx.beginPath();
            ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
            ctx.stroke();
        }

        // Draw connections
        this.connections.forEach(conn => {
            ctx.beginPath();
            ctx.moveTo(conn.from.x, conn.from.y);
            ctx.lineTo(conn.to.x, conn.to.y);
            ctx.strokeStyle = isDark 
                ? `rgba(255, 255, 255, ${conn.strength * 0.1})`
                : `rgba(0, 0, 0, ${conn.strength * 0.1})`;
            ctx.lineWidth = conn.strength * 2;
            ctx.stroke();
        });

        // Draw nodes
        const time = Date.now() / 1000;
        
        this.nodes.forEach((node, index) => {
            const pulse = Math.sin(time * 2 + index * 0.5) * 0.2 + 1;
            const isHovered = this.hoveredNode === node;
            const isSelected = this.selectedEvent && this.selectedEvent.id === node.event.id;
            
            // Outer glow
            const glowSize = (isHovered || isSelected) ? node.size * 3 : node.size * 2;
            const gradient = ctx.createRadialGradient(
                node.x, node.y, 0,
                node.x, node.y, glowSize * pulse
            );
            gradient.addColorStop(0, node.color + '40');
            gradient.addColorStop(1, node.color + '00');
            
            ctx.beginPath();
            ctx.arc(node.x, node.y, glowSize * pulse, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();
            
            // Core node
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.size * (isHovered || isSelected ? 1.3 : 1), 0, Math.PI * 2);
            ctx.fillStyle = node.color;
            ctx.fill();
            
            // Inner highlight
            ctx.beginPath();
            ctx.arc(node.x - node.size * 0.2, node.y - node.size * 0.2, node.size * 0.3, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
            ctx.fill();
            
            // Label on hover
            if (isHovered || isSelected) {
                const label = node.event.title;
                ctx.font = '12px "Geist Sans", -apple-system, sans-serif';
                ctx.textAlign = 'center';
                
                const labelY = node.y - node.size - 12;
                
                // Background
                const metrics = ctx.measureText(label);
                const padding = 8;
                ctx.fillStyle = isDark ? 'rgba(17, 17, 17, 0.9)' : 'rgba(255, 255, 255, 0.9)';
                ctx.beginPath();
                ctx.roundRect(
                    node.x - metrics.width / 2 - padding,
                    labelY - 10,
                    metrics.width + padding * 2,
                    20,
                    4
                );
                ctx.fill();
                
                // Text
                ctx.fillStyle = isDark ? '#fafafa' : '#18181b';
                ctx.fillText(label, node.x, labelY + 4);
            }
        });

        // Draw year labels around the constellation
        if (this.nodes.length > 0) {
            const years = [2020, 2021, 2022, 2023, 2024, 2025];
            ctx.font = '11px "Geist Mono", monospace';
            ctx.fillStyle = isDark ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)';
            ctx.textAlign = 'center';
            
            years.forEach((year, i) => {
                const progress = i / (years.length - 1);
                const angle = -Math.PI * 0.75 + (progress * Math.PI * 1.5);
                const labelRadius = maxRadius + 30;
                const x = centerX + Math.cos(angle) * labelRadius;
                const y = centerY + Math.sin(angle) * labelRadius;
                ctx.fillText(year.toString(), x, y);
            });
        }
    }

    handleCanvasMouseMove(e) {
        const rect = this.canvas.getBoundingClientRect();
        this.mouse.x = e.clientX - rect.left;
        this.mouse.y = e.clientY - rect.top;
        
        // Find hovered node
        this.hoveredNode = null;
        for (const node of this.nodes) {
            const dx = this.mouse.x - node.x;
            const dy = this.mouse.y - node.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < node.size + 10) {
                this.hoveredNode = node;
                break;
            }
        }
        
        this.canvas.style.cursor = this.hoveredNode ? 'pointer' : 'default';
    }

    handleCanvasClick(e) {
        if (this.hoveredNode) {
            this.openPanel(this.hoveredNode.event);
        }
    }

    startAnimation() {
        const animate = () => {
            if (this.currentView === 'constellation') {
                this.drawConstellation();
            }
            this.animationId = requestAnimationFrame(animate);
        };
        animate();
    }

    // ========== TIMELINE VIEW ==========

    renderTimeline() {
        const container = this.elements.timelineEvents;
        container.innerHTML = '';
        
        if (this.filteredEvents.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">◎</div>
                    <div class="empty-state-text">No events match your filters</div>
                </div>
            `;
            return;
        }

        // Get date range
        const dates = this.filteredEvents.map(e => new Date(e.date));
        const minDate = new Date(Math.min(...dates));
        const maxDate = new Date(Math.max(...dates));
        
        // Calculate total width needed
        const containerWidth = this.elements.timelineContainer.clientWidth;
        const eventSpacing = 180; // Pixels between events
        const totalWidth = Math.max(containerWidth, this.filteredEvents.length * eventSpacing + 100);
        
        container.style.width = totalWidth + 'px';

        // Add year markers
        const startYear = minDate.getFullYear();
        const endYear = maxDate.getFullYear();
        
        for (let year = startYear; year <= endYear; year++) {
            const yearDate = new Date(year, 0, 1);
            const progress = (yearDate - minDate) / (maxDate - minDate);
            const x = 50 + progress * (totalWidth - 100);
            
            if (x > 0 && x < totalWidth) {
                const marker = document.createElement('div');
                marker.className = 'timeline-year-marker';
                marker.textContent = year;
                marker.style.left = x + 'px';
                container.appendChild(marker);
            }
        }

        // Render events
        this.filteredEvents.forEach((event, index) => {
            const eventDate = new Date(event.date);
            const progress = (eventDate - minDate) / (maxDate - minDate || 1);
            const x = 50 + progress * (totalWidth - 100);
            
            const isAbove = index % 2 === 0;
            const category = this.categories[event.category];
            const company = this.companies[event.company];
            
            const eventEl = document.createElement('div');
            eventEl.className = `timeline-event ${isAbove ? 'above' : 'below'}`;
            eventEl.style.left = x + 'px';
            eventEl.style.top = '50%';
            eventEl.style.animationDelay = `${index * 0.05}s`;
            eventEl.dataset.eventId = event.id;
            
            const dotColor = category?.color || '#666';
            
            eventEl.innerHTML = `
                <div class="timeline-event-connector"></div>
                <div class="timeline-event-dot" style="border-color: ${dotColor}; color: ${dotColor}"></div>
                <div class="timeline-event-card">
                    <div class="timeline-event-title">${event.title}</div>
                    <div class="timeline-event-date">${this.formatDate(event.date)}</div>
                    <div class="timeline-event-scores">
                        <span class="timeline-event-score hype">H:${event.hype}</span>
                        <span class="timeline-event-score reality">R:${event.reality}</span>
                    </div>
                </div>
            `;
            
            eventEl.addEventListener('click', () => this.openPanel(event));
            
            container.appendChild(eventEl);
        });

        // Scroll to end (most recent)
        this.elements.timelineContainer.scrollLeft = this.elements.timelineContainer.scrollWidth;
    }

    // ========== PANEL ==========

    openPanel(event) {
        this.selectedEvent = event;
        
        const category = this.categories[event.category];
        const gap = event.reality - event.hype;
        const gapText = gap > 0 ? `+${gap}` : gap.toString();
        
        // Update panel content
        this.elements.panelCategory.textContent = category?.label || event.category;
        this.elements.panelCategory.style.color = category?.color || '#666';
        this.elements.panelDate.textContent = this.formatDate(event.date);
        this.elements.panelTitle.textContent = event.title;
        this.elements.panelHype.textContent = event.hype;
        this.elements.panelReality.textContent = event.reality;
        this.elements.panelGap.textContent = gapText;
        this.elements.panelGap.style.color = gap > 0 ? '#00d4aa' : gap < 0 ? '#ff6b35' : '#a78bfa';
        this.elements.panelNote.textContent = event.note;
        this.elements.panelPrediction.textContent = event.prediction;
        this.elements.panelOutcome.textContent = event.outcome;
        this.elements.panelSource.textContent = event.source;
        
        // Impact tags
        this.elements.panelImpact.innerHTML = event.impact
            .map(imp => `<span class="impact-tag">${IMPACT_AREAS[imp] || imp}</span>`)
            .join('');
        
        // Animate score rings
        setTimeout(() => {
            this.elements.hypeRing.style.strokeDasharray = `${event.hype * 10}, 100`;
            this.elements.realityRing.style.strokeDasharray = `${event.reality * 10}, 100`;
        }, 100);
        
        // Show panel
        this.elements.eventPanel.classList.add('open');
        
        // Mark selected in timeline
        document.querySelectorAll('.timeline-event').forEach(el => {
            el.classList.toggle('selected', el.dataset.eventId === event.id);
        });
    }

    closePanel() {
        this.selectedEvent = null;
        this.elements.eventPanel.classList.remove('open');
        
        // Reset rings
        this.elements.hypeRing.style.strokeDasharray = '0, 100';
        this.elements.realityRing.style.strokeDasharray = '0, 100';
        
        // Deselect timeline events
        document.querySelectorAll('.timeline-event').forEach(el => {
            el.classList.remove('selected');
        });
    }

    // ========== UTILITIES ==========

    formatDate(dateStr) {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
    }

    // ========== RENDER ==========

    render() {
        if (this.currentView === 'timeline') {
            this.renderTimeline();
        }
        // Constellation is rendered via animation loop
    }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    window.app = new AIRealityMapper();
});
