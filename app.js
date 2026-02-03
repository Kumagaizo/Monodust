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
        activeCompanies: new Set(),
        activeCategories: new Set(),
        timeRange: { min: 0, max: 100 },
        gridSort: 'date',
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
        panelCategory: document.getElementById('panelCategory'),
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
        companyFilters: document.getElementById('companyFilters'),
        categoryFilters: document.getElementById('categoryFilters'),
        companySelectAll: document.getElementById('companySelectAll'),
        companyClear: document.getElementById('companyClear'),
        categorySelectAll: document.getElementById('categorySelectAll'),
        categoryClear: document.getElementById('categoryClear'),
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

    function getCompanyLabel(companyId) {
        return COMPANIES[companyId]?.label || companyId;
    }

    function getCategoryLabel(categoryId) {
        return CATEGORIES[categoryId]?.label || categoryId;
    }

    // ========== URL STATE PERSISTENCE ==========
    function saveStateToURL() {
        const params = new URLSearchParams();
        
        // Only save if not all selected (default state)
        const allCompanies = Object.keys(COMPANIES);
        const allCategories = Object.keys(CATEGORIES);
        
        if (state.activeCompanies.size !== allCompanies.length) {
            params.set('companies', Array.from(state.activeCompanies).join(','));
        }
        if (state.activeCategories.size !== allCategories.length) {
            params.set('categories', Array.from(state.activeCategories).join(','));
        }
        if (state.timeRange.min !== 0 || state.timeRange.max !== 100) {
            params.set('time', `${state.timeRange.min}-${state.timeRange.max}`);
        }
        if (state.currentView !== 'timeline') {
            params.set('view', state.currentView);
        }
        
        const queryString = params.toString();
        const newURL = queryString ? `${window.location.pathname}?${queryString}` : window.location.pathname;
        
        window.history.replaceState({}, '', newURL);
    }

    function loadStateFromURL() {
        const params = new URLSearchParams(window.location.search);
        
        // Companies
        const companiesParam = params.get('companies');
        if (companiesParam) {
            state.activeCompanies = new Set(companiesParam.split(',').filter(c => COMPANIES[c]));
        } else {
            Object.keys(COMPANIES).forEach(k => state.activeCompanies.add(k));
        }
        
        // Categories
        const categoriesParam = params.get('categories');
        if (categoriesParam) {
            state.activeCategories = new Set(categoriesParam.split(',').filter(c => CATEGORIES[c]));
        } else {
            Object.keys(CATEGORIES).forEach(k => state.activeCategories.add(k));
        }
        
        // Time range
        const timeParam = params.get('time');
        if (timeParam) {
            const [min, max] = timeParam.split('-').map(Number);
            if (!isNaN(min) && !isNaN(max)) {
                state.timeRange = { min: Math.max(0, min), max: Math.min(100, max) };
            }
        }
        
        // View
        const viewParam = params.get('view');
        if (viewParam && ['timeline', 'grid'].includes(viewParam)) {
            state.currentView = viewParam;
        }
    }

    // ========== INITIALIZATION ==========
    function init() {
        loadStateFromURL();
        setupTimeRange();
        renderFilters();
        renderTimeline();
        renderGrid();
        setupEventListeners();
        updateStats();
        loadTheme();
        syncViewSwitcher();
        syncTimeSliders();
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

    function syncViewSwitcher() {
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.view === state.currentView);
        });
        document.querySelectorAll('.view').forEach(v => {
            v.classList.toggle('active', v.id === state.currentView + 'View');
        });
    }

    function syncTimeSliders() {
        dom.timeSliderMin.value = state.timeRange.min;
        dom.timeSliderMax.value = state.timeRange.max;
        updateTimeRangeVisual();
    }

    // ========== FILTERS ==========
    function renderFilters() {
        // Render company filters
        dom.companyFilters.innerHTML = '';
        Object.keys(COMPANIES).forEach(key => {
            const company = COMPANIES[key];
            const btn = createFilterButton(key, company.label, 'company');
            dom.companyFilters.appendChild(btn);
        });
        
        // Render category filters
        dom.categoryFilters.innerHTML = '';
        Object.keys(CATEGORIES).forEach(key => {
            const cat = CATEGORIES[key];
            const btn = createFilterButton(key, cat.label, 'category');
            dom.categoryFilters.appendChild(btn);
        });
    }

    function createFilterButton(id, label, type) {
        const btn = document.createElement('button');
        const isActive = type === 'company' 
            ? state.activeCompanies.has(id) 
            : state.activeCategories.has(id);
        btn.className = 'filter-btn' + (isActive ? ' active' : '');
        btn.textContent = label;
        btn.dataset.filter = id;
        btn.dataset.type = type;
        btn.addEventListener('click', () => toggleFilter(id, type));
        return btn;
    }

    function toggleFilter(id, type) {
        const activeSet = type === 'company' ? state.activeCompanies : state.activeCategories;
        
        if (activeSet.has(id)) {
            activeSet.delete(id);
        } else {
            activeSet.add(id);
        }
        updateFilterButtons();
        updateViews();
        saveStateToURL();
    }

    function updateFilterButtons() {
        document.querySelectorAll('.filter-btn').forEach(btn => {
            const type = btn.dataset.type;
            const id = btn.dataset.filter;
            const isActive = type === 'company' 
                ? state.activeCompanies.has(id) 
                : state.activeCategories.has(id);
            btn.classList.toggle('active', isActive);
        });
        updateFilterCount();
    }

    function updateFilterCount() {
        const totalCompanies = Object.keys(COMPANIES).length;
        const totalCategories = Object.keys(CATEGORIES).length;
        const activeCompanies = state.activeCompanies.size;
        const activeCategories = state.activeCategories.size;
        
        const diff = (totalCompanies - activeCompanies) + (totalCategories - activeCategories);
        dom.filterCount.textContent = diff > 0 ? diff : '';
    }

    function selectAllCompanies() {
        Object.keys(COMPANIES).forEach(k => state.activeCompanies.add(k));
        updateFilterButtons();
        updateViews();
        saveStateToURL();
    }

    function clearAllCompanies() {
        state.activeCompanies.clear();
        updateFilterButtons();
        updateViews();
        saveStateToURL();
    }

    function selectAllCategories() {
        Object.keys(CATEGORIES).forEach(k => state.activeCategories.add(k));
        updateFilterButtons();
        updateViews();
        saveStateToURL();
    }

    function clearAllCategories() {
        state.activeCategories.clear();
        updateFilterButtons();
        updateViews();
        saveStateToURL();
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
        
        updateTimeRangeVisual();
        updateViews();
        saveStateToURL();
    }

    function updateTimeRangeVisual() {
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
            dom.timeRangeDisplay.textContent = `${formatDateShort(startDate)} – ${formatDateShort(endDate)}`;
        }
    }

    // ========== FILTERING ==========
    function getFilteredEvents() {
        return EVENTS.filter(event => {
            // Check company and category
            if (!state.activeCompanies.has(event.company)) return false;
            if (!state.activeCategories.has(event.category)) return false;
            
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
            el.dataset.category = event.category;
            el.style.left = pos + 'px';
            
            el.innerHTML = `
                <div class="timeline-event-dot"></div>
                <div class="timeline-event-connector"></div>
                <div class="timeline-event-card">
                    <div class="timeline-event-title">${event.title}</div>
                    <div class="timeline-event-date">${formatDate(event.date)}</div>
                    <div class="timeline-event-category" data-category="${event.category}">
                        ${getCategoryLabel(event.category)}
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
            case 'category':
                events.sort((a, b) => a.category.localeCompare(b.category));
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
                <div class="grid-card-category" data-category="${event.category}">
                    ${getCategoryLabel(event.category)}
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
        
        // Category badge
        dom.panelCategory.textContent = getCategoryLabel(event.category);
        dom.panelCategory.dataset.category = event.category;
        
        // Claimed (What They Said)
        dom.panelClaimed.textContent = event.claimed?.text || '';
        dom.panelSourceLink.href = event.claimed?.url || '#';
        dom.panelSourceText.textContent = event.claimed?.source || 'View Source';
        dom.panelSourceLink.style.display = event.claimed?.url ? 'inline-flex' : 'none';
        
        // Outcome (What Happened)
        dom.panelOutcome.textContent = event.outcome?.text || '';
        dom.panelOutcomeDate.textContent = event.outcome?.date 
            ? `Observed: ${formatDate(event.outcome.date)}` 
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
        
        saveStateToURL();
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
        
        // Company filter actions
        dom.companySelectAll.addEventListener('click', selectAllCompanies);
        dom.companyClear.addEventListener('click', clearAllCompanies);
        
        // Category filter actions
        dom.categorySelectAll.addEventListener('click', selectAllCategories);
        dom.categoryClear.addEventListener('click', clearAllCategories);
        
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
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Don't trigger if user is typing in an input
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
            
            switch(e.key) {
                case 'Escape':
                    hideEventPanel();
                    break;
                case '1':
                    switchView('timeline');
                    break;
                case '2':
                    switchView('grid');
                    break;
                case 't':
                case 'T':
                    toggleTheme();
                    break;
                case '?':
                    showKeyboardHelp();
                    break;
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

        // Handle browser back/forward
        window.addEventListener('popstate', () => {
            loadStateFromURL();
            updateFilterButtons();
            syncTimeSliders();
            syncViewSwitcher();
            updateViews();
        });
    }

    // ========== KEYBOARD HELP ==========
    function showKeyboardHelp() {
        // Simple alert for now - could be a modal in a more polished version
        alert('Keyboard Shortcuts:\n\n1 - Timeline view\n2 - Grid view\nT - Toggle theme\nEsc - Close panel\n? - Show this help');
    }

    // ========== INIT ==========
    init();
})();
