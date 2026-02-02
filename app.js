/**
 * ========================================
 * AI MILESTONE TRACKER - APPLICATION
 * Evidence-based, professionally neutral
 * ========================================
 */

(function() {
    'use strict';

    // ========== STATE ==========
    const state = {
        currentView: 'timeline',
        selectedEvent: null,
        activeFilters: new Set(),
        timeRange: { min: 0, max: 100 },
        gridSort: 'date',
        allTags: new Set(),
        timelineOffset: 0,
        isDragging: false,
        dragStart: { x: 0, offset: 0 }
    };

    // ========== DOM ELEMENTS ==========
    const dom = {
        // Views
        timelineView: document.getElementById('timelineView'),
        gridView: document.getElementById('gridView'),
        timelineScroll: document.getElementById('timelineScroll'),
        timelineEvents: document.getElementById('timelineEvents'),
        timelineContainer: document.getElementById('timelineContainer'),
        gridEvents: document.getElementById('gridEvents'),
        
        // Panel
        eventPanel: document.getElementById('eventPanel'),
        closePanel: document.getElementById('closePanel'),
        panelCompany: document.getElementById('panelCompany'),
        panelDate: document.getElementById('panelDate'),
        panelTitle: document.getElementById('panelTitle'),
        panelStatus: document.getElementById('panelStatus'),
        panelClaimed: document.getElementById('panelClaimed'),
        panelSourceLink: document.getElementById('panelSourceLink'),
        panelSourceText: document.getElementById('panelSourceText'),
        panelOutcome: document.getElementById('panelOutcome'),
        panelOutcomeDate: document.getElementById('panelOutcomeDate'),
        panelImpact: document.getElementById('panelImpact'),
        panelTags: document.getElementById('panelTags'),
        
        // Filters
        filterPanel: document.getElementById('filterPanel'),
        filterToggle: document.getElementById('filterToggle'),
        filterCount: document.getElementById('filterCount'),
        tagFilters: document.getElementById('tagFilters'),
        filterAll: document.getElementById('filterAll'),
        filterClear: document.getElementById('filterClear'),
        visibleCount: document.getElementById('visibleCount'),
        totalCount: document.getElementById('totalCount'),
        
        // Time Range
        timeSliderMin: document.getElementById('timeSliderMin'),
        timeSliderMax: document.getElementById('timeSliderMax'),
        timeRangeSelected: document.getElementById('timeRangeSelected'),
        timeRangeDisplay: document.getElementById('timeRangeDisplay'),
        timeStart: document.getElementById('timeStart'),
        timeEnd: document.getElementById('timeEnd'),
        
        // Theme
        themeToggle: document.getElementById('themeToggle')
    };

    // ========== UTILITIES ==========
    function formatDate(dateStr) {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric' 
        });
    }

    function formatDateShort(dateStr) {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { 
            month: 'short', 
            year: 'numeric' 
        });
    }

    function getStatusLabel(status) {
        const labels = {
            deployment: 'Deployment',
            incremental: 'Incremental',
            delayed: 'Delayed',
            limited: 'Limited',
            discontinued: 'Ended'
        };
        return labels[status] || status;
    }

    function getCompanyLabel(companyId) {
        return COMPANIES[companyId]?.label || companyId;
    }

    // ========== INITIALIZATION ==========
    function init() {
        collectTags();
        setupTimeRange();
        renderFilters();
        renderTimeline();
        renderGrid();
        setupEventListeners();
        updateStats();
        loadTheme();
    }

    function collectTags() {
        EVENTS.forEach(event => {
            if (event.tags) {
                event.tags.forEach(tag => state.allTags.add(tag));
            }
            state.allTags.add(event.company);
            state.allTags.add(event.category);
            state.allTags.add(event.status);
        });
        
        // Start with all filters active
        state.allTags.forEach(tag => state.activeFilters.add(tag));
    }

    function setupTimeRange() {
        const dates = EVENTS.map(e => new Date(e.date).getTime());
        const minDate = new Date(Math.min(...dates));
        const maxDate = new Date(Math.max(...dates));
        
        state.minYear = minDate.getFullYear();
        state.maxYear = maxDate.getFullYear();
        state.minTime = minDate.getTime();
        state.maxTime = maxDate.getTime();
        
        dom.timeStart.textContent = state.minYear;
        dom.timeEnd.textContent = state.maxYear;
    }

    // ========== FILTERS ==========
    function renderFilters() {
        dom.tagFilters.innerHTML = '';
        
        // Companies
        Object.keys(COMPANIES).forEach(key => {
            const company = COMPANIES[key];
            const btn = createFilterButton(key, company.label);
            dom.tagFilters.appendChild(btn);
        });
        
        // Status
        Object.keys(STATUS).forEach(key => {
            const status = STATUS[key];
            const btn = createFilterButton(key, status.label);
            dom.tagFilters.appendChild(btn);
        });
        
        // Categories
        Object.keys(CATEGORIES).forEach(key => {
            const cat = CATEGORIES[key];
            const btn = createFilterButton(key, cat.label);
            dom.tagFilters.appendChild(btn);
        });
    }

    function createFilterButton(id, label) {
        const btn = document.createElement('button');
        btn.className = 'filter-btn' + (state.activeFilters.has(id) ? ' active' : '');
        btn.textContent = label;
        btn.dataset.filter = id;
        btn.addEventListener('click', () => toggleFilter(id));
        return btn;
    }

    function toggleFilter(id) {
        if (state.activeFilters.has(id)) {
            state.activeFilters.delete(id);
        } else {
            state.activeFilters.add(id);
        }
        updateFilterButtons();
        updateViews();
    }

    function updateFilterButtons() {
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.toggle('active', state.activeFilters.has(btn.dataset.filter));
        });
        updateFilterCount();
    }

    function updateFilterCount() {
        const total = Object.keys(COMPANIES).length + Object.keys(STATUS).length + Object.keys(CATEGORIES).length;
        const active = state.activeFilters.size;
        const diff = total - active;
        dom.filterCount.textContent = diff > 0 ? diff : '';
    }

    function selectAllFilters() {
        Object.keys(COMPANIES).forEach(k => state.activeFilters.add(k));
        Object.keys(STATUS).forEach(k => state.activeFilters.add(k));
        Object.keys(CATEGORIES).forEach(k => state.activeFilters.add(k));
        state.allTags.forEach(t => state.activeFilters.add(t));
        updateFilterButtons();
        updateViews();
    }

    function clearAllFilters() {
        state.activeFilters.clear();
        updateFilterButtons();
        updateViews();
    }

    // ========== TIME RANGE ==========
    function updateTimeRange() {
        const minVal = parseInt(dom.timeSliderMin.value);
        const maxVal = parseInt(dom.timeSliderMax.value);
        
        // Prevent crossing
        if (minVal > maxVal - 5) {
            if (this === dom.timeSliderMin) {
                dom.timeSliderMin.value = maxVal - 5;
            } else {
                dom.timeSliderMax.value = minVal + 5;
            }
        }
        
        state.timeRange.min = parseInt(dom.timeSliderMin.value);
        state.timeRange.max = parseInt(dom.timeSliderMax.value);
        
        // Update visual
        const left = state.timeRange.min + '%';
        const width = (state.timeRange.max - state.timeRange.min) + '%';
        dom.timeRangeSelected.style.left = left;
        dom.timeRangeSelected.style.width = width;
        
        // Update label
        if (state.timeRange.min === 0 && state.timeRange.max === 100) {
            dom.timeRangeDisplay.textContent = 'All Time';
        } else {
            const range = state.maxTime - state.minTime;
            const startDate = new Date(state.minTime + (range * state.timeRange.min / 100));
            const endDate = new Date(state.minTime + (range * state.timeRange.max / 100));
            dom.timeRangeDisplay.textContent = `${formatDateShort(startDate)} - ${formatDateShort(endDate)}`;
        }
        
        updateViews();
    }

    // ========== FILTERING ==========
    function getFilteredEvents() {
        return EVENTS.filter(event => {
            // Check company, category, status
            if (!state.activeFilters.has(event.company)) return false;
            if (!state.activeFilters.has(event.category)) return false;
            if (!state.activeFilters.has(event.status)) return false;
            
            // Check time range
            const eventTime = new Date(event.date).getTime();
            const range = state.maxTime - state.minTime;
            const minTime = state.minTime + (range * state.timeRange.min / 100);
            const maxTime = state.minTime + (range * state.timeRange.max / 100);
            if (eventTime < minTime || eventTime > maxTime) return false;
            
            return true;
        });
    }

    function updateViews() {
        renderTimeline();
        renderGrid();
        updateStats();
    }

    function updateStats() {
        const filtered = getFilteredEvents();
        dom.visibleCount.textContent = filtered.length;
        dom.totalCount.textContent = EVENTS.length;
    }

    // ========== TIMELINE ==========
    function renderTimeline() {
        dom.timelineEvents.innerHTML = '';
        
        const events = getFilteredEvents();
        if (events.length === 0) {
            dom.timelineEvents.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">◉</div>
                    <div class="empty-state-text">No milestones match filters</div>
                </div>
            `;
            return;
        }

        // Sort by date
        events.sort((a, b) => new Date(a.date) - new Date(b.date));

        // Calculate timeline dimensions
        const containerWidth = dom.timelineContainer.offsetWidth;
        const padding = 100;
        const minWidth = Math.max(containerWidth, events.length * 200 + padding * 2);
        
        dom.timelineScroll.style.width = minWidth + 'px';

        // Get date range
        const minDate = new Date(events[0].date).getTime();
        const maxDate = new Date(events[events.length - 1].date).getTime();
        const dateRange = maxDate - minDate || 1;

        // Add year markers
        const years = new Set();
        events.forEach(e => years.add(new Date(e.date).getFullYear()));
        years.forEach(year => {
            const yearDate = new Date(year, 0, 1).getTime();
            const pos = padding + ((yearDate - minDate) / dateRange) * (minWidth - padding * 2);
            
            if (pos > 0 && pos < minWidth) {
                const marker = document.createElement('div');
                marker.className = 'timeline-year-marker';
                marker.textContent = year;
                marker.style.left = pos + 'px';
                dom.timelineEvents.appendChild(marker);
            }
        });

        // Render events with alternating positions
        events.forEach((event, index) => {
            const date = new Date(event.date).getTime();
            const pos = padding + ((date - minDate) / dateRange) * (minWidth - padding * 2);
            const isAbove = index % 2 === 0;
            
            const el = document.createElement('div');
            el.className = `timeline-event ${isAbove ? 'above' : 'below'}`;
            el.dataset.id = event.id;
            el.dataset.status = event.status;
            el.style.left = pos + 'px';
            
            el.innerHTML = `
                <div class="timeline-event-dot"></div>
                <div class="timeline-event-connector"></div>
                <div class="timeline-event-card">
                    <div class="timeline-event-title">${event.title}</div>
                    <div class="timeline-event-date">${formatDate(event.date)}</div>
                    <div class="timeline-event-status" data-status="${event.status}">
                        ${getStatusLabel(event.status)}
                    </div>
                </div>
            `;
            
            el.addEventListener('click', () => showEventPanel(event));
            dom.timelineEvents.appendChild(el);
        });

        // Center timeline
        if (state.timelineOffset === 0) {
            state.timelineOffset = Math.max(0, (minWidth - containerWidth) / 2);
            dom.timelineScroll.style.transform = `translateX(-${state.timelineOffset}px)`;
        }
    }

    // ========== GRID ==========
    function renderGrid() {
        dom.gridEvents.innerHTML = '';
        
        let events = getFilteredEvents();
        if (events.length === 0) {
            dom.gridEvents.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">◉</div>
                    <div class="empty-state-text">No milestones match filters</div>
                </div>
            `;
            return;
        }

        // Sort
        switch (state.gridSort) {
            case 'date':
                events.sort((a, b) => new Date(b.date) - new Date(a.date));
                break;
            case 'status':
                events.sort((a, b) => a.status.localeCompare(b.status));
                break;
            case 'company':
                events.sort((a, b) => a.company.localeCompare(b.company));
                break;
        }

        events.forEach(event => {
            const card = document.createElement('div');
            card.className = 'grid-card';
            card.dataset.id = event.id;
            
            card.innerHTML = `
                <div class="grid-card-header">
                    <span class="grid-card-company">${getCompanyLabel(event.company)}</span>
                    <span class="grid-card-date">${formatDateShort(event.date)}</span>
                </div>
                <div class="grid-card-title">${event.title}</div>
                <div class="grid-card-status" data-status="${event.status}">
                    ${getStatusLabel(event.status)}
                </div>
            `;
            
            card.addEventListener('click', () => showEventPanel(event));
            dom.gridEvents.appendChild(card);
        });
    }

    // ========== EVENT PANEL ==========
    function showEventPanel(event) {
        state.selectedEvent = event;
        
        // Update selected state
        document.querySelectorAll('.timeline-event').forEach(el => {
            el.classList.toggle('selected', el.dataset.id === event.id);
        });
        
        // Populate panel
        dom.panelCompany.textContent = getCompanyLabel(event.company);
        dom.panelDate.textContent = formatDate(event.date);
        dom.panelTitle.textContent = event.title;
        
        // Status badge
        dom.panelStatus.textContent = getStatusLabel(event.status);
        dom.panelStatus.dataset.status = event.status;
        
        // Claimed (What They Said)
        dom.panelClaimed.textContent = event.claimed?.text || '';
        dom.panelSourceLink.href = event.claimed?.url || '#';
        dom.panelSourceText.textContent = event.claimed?.source || 'View Source';
        dom.panelSourceLink.style.display = event.claimed?.url ? 'inline-flex' : 'none';
        
        // Outcome (What Happened)
        dom.panelOutcome.textContent = event.outcome?.text || '';
        dom.panelOutcomeDate.textContent = event.outcome?.date 
            ? `As of ${formatDate(event.outcome.date)}` 
            : '';
        
        // Impact
        dom.panelImpact.textContent = event.impact || '';
        
        // Tags
        dom.panelTags.innerHTML = '';
        if (event.tags) {
            event.tags.forEach(tag => {
                const span = document.createElement('span');
                span.className = 'tag';
                span.textContent = tag;
                dom.panelTags.appendChild(span);
            });
        }
        
        // Show panel
        dom.eventPanel.classList.add('open');
    }

    function hideEventPanel() {
        dom.eventPanel.classList.remove('open');
        state.selectedEvent = null;
        document.querySelectorAll('.timeline-event').forEach(el => {
            el.classList.remove('selected');
        });
    }

    // ========== TIMELINE DRAG ==========
    function setupTimelineDrag() {
        let animationFrame = null;
        
        dom.timelineContainer.addEventListener('mousedown', (e) => {
            if (e.target.closest('.timeline-event')) return;
            state.isDragging = true;
            state.dragStart.x = e.clientX;
            state.dragStart.offset = state.timelineOffset;
            dom.timelineContainer.classList.add('dragging');
        });

        document.addEventListener('mousemove', (e) => {
            if (!state.isDragging) return;
            
            if (animationFrame) cancelAnimationFrame(animationFrame);
            animationFrame = requestAnimationFrame(() => {
                const delta = state.dragStart.x - e.clientX;
                const maxOffset = dom.timelineScroll.offsetWidth - dom.timelineContainer.offsetWidth;
                state.timelineOffset = Math.max(0, Math.min(maxOffset, state.dragStart.offset + delta));
                dom.timelineScroll.style.transform = `translateX(-${state.timelineOffset}px)`;
            });
        });

        document.addEventListener('mouseup', () => {
            if (state.isDragging) {
                state.isDragging = false;
                dom.timelineContainer.classList.remove('dragging');
            }
        });

        // Touch support
        dom.timelineContainer.addEventListener('touchstart', (e) => {
            if (e.target.closest('.timeline-event')) return;
            state.isDragging = true;
            state.dragStart.x = e.touches[0].clientX;
            state.dragStart.offset = state.timelineOffset;
        }, { passive: true });

        document.addEventListener('touchmove', (e) => {
            if (!state.isDragging) return;
            
            const delta = state.dragStart.x - e.touches[0].clientX;
            const maxOffset = dom.timelineScroll.offsetWidth - dom.timelineContainer.offsetWidth;
            state.timelineOffset = Math.max(0, Math.min(maxOffset, state.dragStart.offset + delta));
            dom.timelineScroll.style.transform = `translateX(-${state.timelineOffset}px)`;
        }, { passive: true });

        document.addEventListener('touchend', () => {
            state.isDragging = false;
        });
    }

    // ========== VIEW SWITCHING ==========
    function switchView(view) {
        state.currentView = view;
        
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.view === view);
        });
        
        document.querySelectorAll('.view').forEach(v => {
            v.classList.toggle('active', v.id === view + 'View');
        });
    }

    // ========== THEME ==========
    function loadTheme() {
        const saved = localStorage.getItem('ai-tracker-theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const theme = saved || (prefersDark ? 'dark' : 'light');
        document.documentElement.setAttribute('data-theme', theme);
    }

    function toggleTheme() {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('ai-tracker-theme', next);
    }

    // ========== EVENT LISTENERS ==========
    function setupEventListeners() {
        // View switcher
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', () => switchView(btn.dataset.view));
        });
        
        // Panel close
        dom.closePanel.addEventListener('click', hideEventPanel);
        
        // Filter actions
        dom.filterAll.addEventListener('click', selectAllFilters);
        dom.filterClear.addEventListener('click', clearAllFilters);
        
        // Filter toggle (mobile)
        dom.filterToggle.addEventListener('click', () => {
            dom.filterToggle.closest('.filter-bar').classList.toggle('open');
        });
        
        // Time range
        dom.timeSliderMin.addEventListener('input', updateTimeRange);
        dom.timeSliderMax.addEventListener('input', updateTimeRange);
        
        // Grid sort
        document.querySelectorAll('.sort-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.sort-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                state.gridSort = btn.dataset.sort;
                renderGrid();
            });
        });
        
        // Theme toggle
        dom.themeToggle.addEventListener('click', toggleTheme);
        
        // Timeline drag
        setupTimelineDrag();
        
        // Keyboard
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                hideEventPanel();
            }
        });
        
        // Window resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                state.timelineOffset = 0;
                renderTimeline();
            }, 250);
        });
    }

    // ========== INIT ==========
    init();
})();
