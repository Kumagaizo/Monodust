/**
 * ========================================
 * AI REALITY MAPPER - APPLICATION v5
 * Clean, Fixed, Polished
 * ========================================
 */

class AIRealityMapper {
    constructor() {
        // State
        this.events = [...EVENTS];
        this.categories = CATEGORIES;
        this.companies = COMPANIES;
        this.filteredEvents = [];
        this.selectedTags = new Set([...Object.keys(CATEGORIES), ...Object.keys(COMPANIES)]);
        this.selectedEvent = null;
        this.currentView = 'timeline';
        this.timeMin = 0;
        this.timeMax = 100;
        this.theme = 'dark';
        this.gridSort = 'date';
        
        // Timeline drag state
        this.isDragging = false;
        this.dragStartX = 0;
        this.scrollStartX = 0;
        
        // Initialize
        this.init();
    }

    init() {
        this.loadTheme();
        this.cacheElements();
        this.renderTagFilters();
        this.attachEventListeners();
        this.filterEvents();
        this.render();
        this.updateFilterCount();
        this.updateTimeRangeUI();
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
            gridView: document.getElementById('gridView'),
            gridEvents: document.getElementById('gridEvents'),
            gridContainer: document.getElementById('gridContainer'),
            timelineView: document.getElementById('timelineView'),
            timelineEvents: document.getElementById('timelineEvents'),
            timelineContainer: document.getElementById('timelineContainer'),
            timelineScroll: document.getElementById('timelineScroll'),
            
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
            tagFilters: document.getElementById('tagFilters'),
            filterAll: document.getElementById('filterAll'),
            filterClear: document.getElementById('filterClear'),
            filterToggle: document.getElementById('filterToggle'),
            filterPanel: document.getElementById('filterPanel'),
            filterCount: document.getElementById('filterCount'),
            visibleCount: document.getElementById('visibleCount'),
            totalCount: document.getElementById('totalCount'),
            
            // Time range control
            timeSliderMin: document.getElementById('timeSliderMin'),
            timeSliderMax: document.getElementById('timeSliderMax'),
            timeRangeSelected: document.getElementById('timeRangeSelected'),
            timeRangeDisplay: document.getElementById('timeRangeDisplay'),
            timeStart: document.getElementById('timeStart'),
            timeEnd: document.getElementById('timeEnd'),
            
            // View switcher
            viewButtons: document.querySelectorAll('.view-btn'),
            sortButtons: document.querySelectorAll('.sort-btn'),
            
            // Theme toggle
            themeToggle: document.getElementById('themeToggle')
        };
    }

    // ========== EVENT LISTENERS ==========
    
    attachEventListeners() {
        // Window resize
        window.addEventListener('resize', () => {
            this.render();
        });

        // Theme toggle
        this.elements.themeToggle.addEventListener('click', () => this.toggleTheme());

        // View switching
        this.elements.viewButtons.forEach(btn => {
            btn.addEventListener('click', () => this.switchView(btn.dataset.view));
        });

        // Grid sort buttons
        this.elements.sortButtons.forEach(btn => {
            btn.addEventListener('click', () => this.changeSort(btn.dataset.sort));
        });

        // Close panel
        this.elements.closePanel.addEventListener('click', () => this.closePanel());
        
        // Keyboard
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.closePanel();
        });

        // Time range sliders
        this.elements.timeSliderMin.addEventListener('input', (e) => this.handleTimeRangeChange('min', e));
        this.elements.timeSliderMax.addEventListener('input', (e) => this.handleTimeRangeChange('max', e));

        // Filter actions
        this.elements.filterAll.addEventListener('click', () => {
            this.selectedTags = new Set([...Object.keys(this.categories), ...Object.keys(this.companies)]);
            this.updateTagButtons();
            this.filterEvents();
            this.render();
            this.updateFilterCount();
        });

        this.elements.filterClear.addEventListener('click', () => {
            this.selectedTags = new Set();
            this.updateTagButtons();
            this.filterEvents();
            this.render();
            this.updateFilterCount();
        });

        // Mobile filter toggle
        this.elements.filterToggle.addEventListener('click', (e) => {
            e.stopPropagation();
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

        // Timeline drag to scroll
        this.setupTimelineDrag();
    }

    // ========== TIMELINE DRAG ==========

    setupTimelineDrag() {
        const container = this.elements.timelineContainer;
        
        // Mouse events
        container.addEventListener('mousedown', (e) => this.startDrag(e));
        document.addEventListener('mousemove', (e) => this.onDrag(e));
        document.addEventListener('mouseup', () => this.endDrag());
        
        // Touch events
        container.addEventListener('touchstart', (e) => this.startDrag(e), { passive: true });
        document.addEventListener('touchmove', (e) => this.onDrag(e), { passive: true });
        document.addEventListener('touchend', () => this.endDrag());
    }

    startDrag(e) {
        // Don't start drag if clicking on an event
        if (e.target.closest('.timeline-event')) return;
        
        this.isDragging = true;
        this.elements.timelineContainer.classList.add('dragging');
        
        const clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
        this.dragStartX = clientX;
        this.scrollStartX = this.currentScrollX || 0;
    }

    onDrag(e) {
        if (!this.isDragging) return;
        
        const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
        const delta = this.dragStartX - clientX;
        this.currentScrollX = this.scrollStartX + delta;
        
        // Apply bounds
        const maxScroll = this.elements.timelineScroll.offsetWidth - this.elements.timelineContainer.offsetWidth;
        this.currentScrollX = Math.max(0, Math.min(this.currentScrollX, maxScroll));
        
        this.elements.timelineScroll.style.transform = `translateX(${-this.currentScrollX}px)`;
    }

    endDrag() {
        if (!this.isDragging) return;
        this.isDragging = false;
        this.elements.timelineContainer.classList.remove('dragging');
    }

    // ========== TIME RANGE ==========

    handleTimeRangeChange(handle, e) {
        const value = parseInt(e.target.value);
        
        if (handle === 'min') {
            this.timeMin = Math.min(value, this.timeMax - 5);
            this.elements.timeSliderMin.value = this.timeMin;
        } else {
            this.timeMax = Math.max(value, this.timeMin + 5);
            this.elements.timeSliderMax.value = this.timeMax;
        }
        
        this.updateTimeRangeUI();
        this.filterEvents();
        this.render();
    }

    updateTimeRangeUI() {
        // Update the selected range visual
        const left = this.timeMin + '%';
        const width = (this.timeMax - this.timeMin) + '%';
        this.elements.timeRangeSelected.style.left = left;
        this.elements.timeRangeSelected.style.width = width;
        
        // Calculate actual dates
        const dates = this.events.map(e => new Date(e.date));
        const minDate = new Date(Math.min(...dates));
        const maxDate = new Date(Math.max(...dates));
        const totalMs = maxDate - minDate;
        
        const startDate = new Date(minDate.getTime() + (totalMs * this.timeMin / 100));
        const endDate = new Date(minDate.getTime() + (totalMs * this.timeMax / 100));
        
        const formatDate = (date) => {
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            return `${months[date.getMonth()]} ${date.getFullYear()}`;
        };
        
        // Update display
        if (this.timeMin === 0 && this.timeMax === 100) {
            this.elements.timeRangeDisplay.textContent = 'All Time';
        } else {
            this.elements.timeRangeDisplay.textContent = `${formatDate(startDate)} – ${formatDate(endDate)}`;
        }
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

    changeSort(sortType) {
        this.gridSort = sortType;
        
        // Update buttons
        this.elements.sortButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.sort === sortType);
        });
        
        this.renderGrid();
    }

    // ========== UNIFIED FILTERING ==========

    renderTagFilters() {
        const container = this.elements.tagFilters;
        container.innerHTML = '';

        // Add category filters
        Object.entries(this.categories).forEach(([id, category]) => {
            const btn = document.createElement('button');
            btn.className = 'filter-btn active';
            btn.dataset.tag = id;
            btn.dataset.type = 'category';
            btn.textContent = category.label;
            btn.addEventListener('click', () => this.toggleTag(id));
            container.appendChild(btn);
        });

        // Add company filters
        Object.entries(this.companies).forEach(([id, company]) => {
            const btn = document.createElement('button');
            btn.className = 'filter-btn active';
            btn.dataset.tag = id;
            btn.dataset.type = 'company';
            btn.textContent = company.label;
            btn.addEventListener('click', () => this.toggleTag(id));
            container.appendChild(btn);
        });
    }

    toggleTag(tagId) {
        if (this.selectedTags.has(tagId)) {
            this.selectedTags.delete(tagId);
        } else {
            this.selectedTags.add(tagId);
        }
        
        this.updateTagButtons();
        this.filterEvents();
        this.render();
        this.updateFilterCount();
    }

    updateTagButtons() {
        document.querySelectorAll('.filter-btn[data-tag]').forEach(btn => {
            const isActive = this.selectedTags.has(btn.dataset.tag);
            btn.classList.toggle('active', isActive);
        });
    }

    updateFilterCount() {
        const totalTags = Object.keys(this.categories).length + Object.keys(this.companies).length;
        const activeFilters = totalTags - this.selectedTags.size;
        
        this.elements.filterCount.textContent = activeFilters > 0 ? activeFilters : '';
    }

    filterEvents() {
        // Get time range
        const dates = this.events.map(e => new Date(e.date));
        const minDate = new Date(Math.min(...dates));
        const maxDate = new Date(Math.max(...dates));
        const totalMs = maxDate - minDate;
        
        const startCutoff = new Date(minDate.getTime() + (totalMs * this.timeMin / 100));
        const endCutoff = new Date(minDate.getTime() + (totalMs * this.timeMax / 100));

        // Filter events
        this.filteredEvents = this.events.filter(event => {
            const eventDate = new Date(event.date);
            const inTimeRange = eventDate >= startCutoff && eventDate <= endCutoff;
            const categoryMatch = this.selectedTags.has(event.category);
            const companyMatch = this.selectedTags.has(event.company);
            return inTimeRange && categoryMatch && companyMatch;
        });

        // Sort by date
        this.filteredEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

        // Update counts
        this.elements.visibleCount.textContent = this.filteredEvents.length;
        this.elements.totalCount.textContent = this.events.length;
    }

    // ========== GRID VIEW ==========
    
    renderGrid() {
        const container = this.elements.gridEvents;
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

        // Sort events
        let sortedEvents = [...this.filteredEvents];
        switch (this.gridSort) {
            case 'date':
                sortedEvents.sort((a, b) => new Date(b.date) - new Date(a.date));
                break;
            case 'gap':
                sortedEvents.sort((a, b) => (a.reality - a.hype) - (b.reality - b.hype));
                break;
            case 'hype':
                sortedEvents.sort((a, b) => b.hype - a.hype);
                break;
            case 'reality':
                sortedEvents.sort((a, b) => b.reality - a.reality);
                break;
        }

        // Render each card
        sortedEvents.forEach((event, index) => {
            const gap = event.reality - event.hype;
            let gapType = 'matched';
            let gapLabel = 'Matched';
            if (gap > 1) {
                gapType = 'exceeded';
                gapLabel = 'Exceeded';
            } else if (gap < -1) {
                gapType = 'overhyped';
                gapLabel = 'Overhyped';
            }

            const company = this.companies[event.company];
            const gapText = gap > 0 ? `+${gap}` : gap.toString();

            const card = document.createElement('div');
            card.className = 'grid-card';
            card.style.animationDelay = `${index * 0.03}s`;
            card.dataset.eventId = event.id;
            
            card.innerHTML = `
                <div class="grid-card-header">
                    <span class="grid-card-company">${company?.label || event.company}</span>
                    <span class="grid-card-date">${this.formatDate(event.date)}</span>
                </div>
                <div class="grid-card-title">${event.title}</div>
                <div class="grid-card-scores">
                    <div class="grid-card-score">
                        <span class="grid-card-score-value hype">${event.hype}</span>
                        <span class="grid-card-score-label">Hype</span>
                    </div>
                    <div class="grid-card-gap">
                        <span class="grid-card-gap-value ${gapType}">${gapText}</span>
                        <span class="grid-card-gap-label">${gapLabel}</span>
                    </div>
                    <div class="grid-card-score">
                        <span class="grid-card-score-value reality">${event.reality}</span>
                        <span class="grid-card-score-label">Reality</span>
                    </div>
                </div>
            `;
            
            card.addEventListener('click', () => this.openPanel(event));
            container.appendChild(card);
        });
    }

    // ========== TIMELINE VIEW ==========

    renderTimeline() {
        const container = this.elements.timelineEvents;
        const scrollContainer = this.elements.timelineScroll;
        container.innerHTML = '';
        
        // Reset scroll position
        this.currentScrollX = 0;
        scrollContainer.style.transform = 'translateX(0)';
        
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
        const dateRange = maxDate - minDate || 1;
        
        // Calculate total width
        const containerWidth = this.elements.timelineContainer.clientWidth;
        const minSpacing = 180;
        const totalWidth = Math.max(containerWidth, this.filteredEvents.length * minSpacing + 200);
        
        scrollContainer.style.width = totalWidth + 'px';

        // Add year markers
        const startYear = minDate.getFullYear();
        const endYear = maxDate.getFullYear();
        
        for (let year = startYear; year <= endYear; year++) {
            const yearDate = new Date(year, 6, 1);
            if (yearDate < minDate || yearDate > maxDate) continue;
            const progress = (yearDate - minDate) / dateRange;
            const x = 100 + progress * (totalWidth - 200);
            
            const marker = document.createElement('div');
            marker.className = 'timeline-year-marker';
            marker.textContent = year;
            marker.style.left = x + 'px';
            container.appendChild(marker);
        }

        // Render events - alternating above/below
        this.filteredEvents.forEach((event, index) => {
            const eventDate = new Date(event.date);
            const progress = (eventDate - minDate) / dateRange;
            const x = 100 + progress * (totalWidth - 200);
            
            const gap = event.reality - event.hype;
            let gapType = 'matched';
            if (gap > 1) gapType = 'exceeded';
            else if (gap < -1) gapType = 'overhyped';

            // Alternate above/below
            const position = index % 2 === 0 ? 'below' : 'above';

            const eventEl = document.createElement('div');
            eventEl.className = `timeline-event ${position}`;
            eventEl.style.left = x + 'px';
            eventEl.style.animationDelay = `${index * 0.03}s`;
            eventEl.dataset.eventId = event.id;
            eventEl.dataset.gap = gapType;
            
            // SAME HTML structure for both - CSS handles the reversal
            eventEl.innerHTML = `
                <div class="timeline-event-dot"></div>
                <div class="timeline-event-connector"></div>
                <div class="timeline-event-card">
                    <div class="timeline-event-title">${event.title}</div>
                    <div class="timeline-event-date">${this.formatDate(event.date)}</div>
                    <div class="timeline-event-scores">
                        <span class="timeline-event-score hype">H:${event.hype}</span>
                        <span class="timeline-event-score reality">R:${event.reality}</span>
                    </div>
                </div>
            `;
            
            eventEl.addEventListener('click', (e) => {
                if (!this.isDragging) {
                    this.openPanel(event);
                }
            });
            
            container.appendChild(eventEl);
        });

        // Auto-scroll to show recent events
        setTimeout(() => {
            const maxScroll = scrollContainer.offsetWidth - this.elements.timelineContainer.offsetWidth;
            this.currentScrollX = maxScroll;
            scrollContainer.style.transform = `translateX(${-this.currentScrollX}px)`;
        }, 100);
    }

    // ========== PANEL ==========

    openPanel(event) {
        this.selectedEvent = event;
        
        const category = this.categories[event.category];
        const gap = event.reality - event.hype;
        const gapText = gap > 0 ? `+${gap}` : gap.toString();
        
        // Update panel content
        this.elements.panelCategory.textContent = category?.label || event.category;
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
        
        // Mark selected
        document.querySelectorAll('.timeline-event, .grid-card').forEach(el => {
            el.classList.toggle('selected', el.dataset.eventId === event.id);
        });
    }

    closePanel() {
        this.selectedEvent = null;
        this.elements.eventPanel.classList.remove('open');
        
        // Reset rings
        this.elements.hypeRing.style.strokeDasharray = '0, 100';
        this.elements.realityRing.style.strokeDasharray = '0, 100';
        
        // Deselect all
        document.querySelectorAll('.timeline-event, .grid-card').forEach(el => {
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
        } else if (this.currentView === 'grid') {
            this.renderGrid();
        }
    }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    window.app = new AIRealityMapper();
});
