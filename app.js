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
        statsView: document.getElementById('statsView'),
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
        if (viewParam && ['timeline', 'grid', 'stats'].includes(viewParam)) {
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
        renderStats();
        setupEventListeners();
        updateStats();
        loadTheme();
        syncViewSwitcher();
        syncTimeSliders();
        scrollTimelineToLatest();
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
        renderStats();
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
                    <div class="empty-state-icon">×</div>
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

    function scrollTimelineToLatest() {
        // Wait for DOM to be ready
        requestAnimationFrame(() => {
            const maxOffset = dom.timelineScroll.offsetWidth - dom.timelineContainer.offsetWidth;
            state.timelineOffset = Math.max(0, maxOffset);
            dom.timelineScroll.style.transform = `translateX(-${state.timelineOffset}px)`;
        });
    }

    // ========== GRID ==========
    function renderGrid() {
        dom.gridEvents.innerHTML = '';
        
        let events = getFilteredEvents();
        if (events.length === 0) {
            dom.gridEvents.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">×</div>
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

    // ========== STATS ==========
        
    function renderStats() {
        const events = getFilteredEvents();
        
        if (events.length === 0) {
            renderEmptyStats();
            return;
        }
        
        // Original insights
        renderAccelerationInsight(events);
        renderRacePodium(events);
        renderShiftComparison(events);
        renderHottestStreak(events);
        renderSleeper(events);
        renderPulseChart(events);
        renderFocusShift(events);
        renderTopTags(events);
        renderFunFacts(events);
        
        // NEW: Extended insights
        renderCompanyRadar(events);
        renderCompanyTimeline(events);
        renderMomentumChart(events);
        renderFirstMover(events);
        renderDayPattern(events);
        renderCategoryRings(events);
        renderTagNetwork(events);
    }

    function renderEmptyStats() {
        document.getElementById('accelerationHeadline').textContent = 'No milestones match current filters';
        document.getElementById('accelerationDetail').textContent = 'Try adjusting your filters to see insights.';
        
        // Clear all sections including new ones
        const sections = [
            'racePodium', 'shiftComparison', 'streakContent', 'sleeperContent', 
            'pulseChart', 'focusShift', 'topTags', 'funFacts',
            'companyRadar', 'companyTimeline', 'momentumChart', 
            'firstMover', 'dayPattern', 'categoryRings', 'tagNetwork'
        ];
        
        sections.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.innerHTML = '';
        });
    }

    // ========== INSIGHT 1: THE ACCELERATION ==========
    function renderAccelerationInsight(events) {
        const sortedByDate = [...events].sort((a, b) => new Date(a.date) - new Date(b.date));
        const now = new Date();
        
        // Find the rate of acceleration
        const recentMonths = 6;
        const recentCutoff = new Date(now.getTime() - recentMonths * 30 * 24 * 60 * 60 * 1000);
        const recentEvents = events.filter(e => new Date(e.date) >= recentCutoff);
        
        // Compare to same period a year ago
        const yearAgoStart = new Date(recentCutoff.getTime() - 365 * 24 * 60 * 60 * 1000);
        const yearAgoEnd = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
        const yearAgoEvents = events.filter(e => {
            const d = new Date(e.date);
            return d >= yearAgoStart && d <= yearAgoEnd;
        });
        
        const headlineEl = document.getElementById('accelerationHeadline');
        const detailEl = document.getElementById('accelerationDetail');
        
        if (yearAgoEvents.length > 0 && recentEvents.length > 0) {
            const multiplier = (recentEvents.length / yearAgoEvents.length).toFixed(1);
            
            if (multiplier >= 1.5) {
                headlineEl.textContent = `AI is moving ${multiplier}× faster than last year`;
                detailEl.textContent = `In the last ${recentMonths} months: ${recentEvents.length} milestones. Same period last year: ${yearAgoEvents.length}. The pace is accelerating.`;
            } else if (multiplier >= 1) {
                headlineEl.textContent = `${recentEvents.length} milestones in the last ${recentMonths} months`;
                detailEl.textContent = `Steady pace compared to last year (${yearAgoEvents.length} in the same period). The industry maintains momentum.`;
            } else {
                headlineEl.textContent = `The pace has shifted`;
                detailEl.textContent = `${recentEvents.length} milestones recently vs ${yearAgoEvents.length} same time last year. Quality over quantity?`;
            }
        } else {
            // Calculate milestones per month overall
            if (sortedByDate.length >= 2) {
                const firstDate = new Date(sortedByDate[0].date);
                const lastDate = new Date(sortedByDate[sortedByDate.length - 1].date);
                const monthsSpan = Math.max(1, (lastDate - firstDate) / (30 * 24 * 60 * 60 * 1000));
                const perMonth = (events.length / monthsSpan).toFixed(1);
                
                headlineEl.textContent = `${perMonth} AI milestones every month`;
                detailEl.textContent = `Tracking ${events.length} developments across ${Object.keys(COMPANIES).length} major players from ${firstDate.getFullYear()} to ${lastDate.getFullYear()}.`;
            } else {
                headlineEl.textContent = `${events.length} milestone${events.length !== 1 ? 's' : ''} tracked`;
                detailEl.textContent = 'Adjust filters to see more data points.';
            }
        }
    }

    // ========== INSIGHT 2: THE RACE (Podium) ==========
    function renderRacePodium(events) {
        const container = document.getElementById('racePodium');
        const footnote = document.getElementById('raceFootnote');
        container.innerHTML = '';
        
        // Count by company
        const counts = {};
        events.forEach(e => {
            counts[e.company] = (counts[e.company] || 0) + 1;
        });
        
        // Sort by count
        const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
        const maxCount = sorted[0]?.[1] || 1;
        
        // Show top 6 (all main companies)
        const top = sorted.slice(0, 7);
        
        top.forEach(([company, count], index) => {
            const item = document.createElement('div');
            item.className = 'podium-item';
            
            const height = 50 + (count / maxCount) * 90; // 50-140px range
            
            item.innerHTML = `
                <div class="podium-bar" data-company="${company}" style="height: ${height}px">
                    <span class="podium-count">${count}</span>
                    <span class="podium-rank">${index + 1}</span>
                </div>
                <span class="podium-label">${getCompanyLabel(company)}</span>
            `;
            
            container.appendChild(item);
        });
        
        // Calculate lead
        if (sorted.length >= 2) {
            const [leader, leaderCount] = sorted[0];
            const [second, secondCount] = sorted[1];
            const lead = leaderCount - secondCount;
            footnote.textContent = `${getCompanyLabel(leader)} leads by ${lead} milestone${lead !== 1 ? 's' : ''}`;
        } else {
            footnote.textContent = '';
        }
    }

    // ========== INSIGHT 3: THE SHIFT ==========
    function renderShiftComparison(events) {
        const container = document.getElementById('shiftComparison');
        container.innerHTML = '';
        
        // Split events: recent 12 months vs older
        const now = new Date();
        const oneYearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
        
        const recent = events.filter(e => new Date(e.date) >= oneYearAgo);
        const older = events.filter(e => new Date(e.date) < oneYearAgo);
        
        if (older.length === 0 || recent.length === 0) {
            // Show simple category breakdown instead
            const counts = {};
            events.forEach(e => counts[e.category] = (counts[e.category] || 0) + 1);
            const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
            const max = sorted[0]?.[1] || 1;
            
            sorted.forEach(([cat, count]) => {
                const row = document.createElement('div');
                row.className = 'shift-row';
                row.innerHTML = `
                    <span class="shift-category">${getCategoryLabel(cat)}</span>
                    <div class="shift-bars">
                        <div class="shift-bar-new" data-category="${cat}" style="width: ${(count/max)*100}%"></div>
                    </div>
                    <span class="shift-change neutral">${count}</span>
                `;
                container.appendChild(row);
            });
            return;
        }
        
        // Calculate category percentages for each period
        const recentCounts = {};
        const olderCounts = {};
        recent.forEach(e => recentCounts[e.category] = (recentCounts[e.category] || 0) + 1);
        older.forEach(e => olderCounts[e.category] = (olderCounts[e.category] || 0) + 1);
        
        // All categories
        const categories = Object.keys(CATEGORIES);
        const changes = categories.map(cat => {
            const recentPct = (recentCounts[cat] || 0) / recent.length * 100;
            const olderPct = (olderCounts[cat] || 0) / older.length * 100;
            const change = recentPct - olderPct;
            return { cat, recentPct, olderPct, change };
        }).sort((a, b) => Math.abs(b.change) - Math.abs(a.change));
        
        changes.forEach(({ cat, recentPct, olderPct, change }) => {
            const row = document.createElement('div');
            row.className = 'shift-row';
            
            const changeClass = change > 2 ? 'positive' : change < -2 ? 'negative' : 'neutral';
            const changeText = change > 0 ? `+${change.toFixed(0)}%` : `${change.toFixed(0)}%`;
            
            row.innerHTML = `
                <span class="shift-category">${getCategoryLabel(cat)}</span>
                <div class="shift-bars">
                    <div class="shift-bar-old" style="width: ${olderPct}%"></div>
                    <div class="shift-bar-new" data-category="${cat}" style="width: ${recentPct}%"></div>
                </div>
                <span class="shift-change ${changeClass}">${changeText}</span>
            `;
            
            container.appendChild(row);
        });
    }

    // ========== INSIGHT 4: HOTTEST STREAK ==========
    function renderHottestStreak(events) {
        const container = document.getElementById('streakContent');
        
        // Find company with most milestones in a rolling 30-day window
        const sortedByDate = [...events].sort((a, b) => new Date(a.date) - new Date(b.date));
        
        let bestStreak = { company: null, count: 0, start: null, end: null };
        
        // For each company, find their best 30-day streak
        Object.keys(COMPANIES).forEach(company => {
            const companyEvents = sortedByDate.filter(e => e.company === company);
            
            companyEvents.forEach((event, i) => {
                const startDate = new Date(event.date);
                const endDate = new Date(startDate.getTime() + 30 * 24 * 60 * 60 * 1000);
                const count = companyEvents.filter(e => {
                    const d = new Date(e.date);
                    return d >= startDate && d <= endDate;
                }).length;
                
                if (count > bestStreak.count) {
                    bestStreak = { company, count, start: startDate, end: endDate };
                }
            });
        });
        
        if (bestStreak.company) {
            const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            const startStr = `${monthNames[bestStreak.start.getMonth()]} ${bestStreak.start.getFullYear()}`;
            
            container.innerHTML = `
                <div class="streak-company">${getCompanyLabel(bestStreak.company)}</div>
                <div class="streak-number">${bestStreak.count}</div>
                <span class="streak-unit">milestones in 30 days</span>
                <div class="streak-period">Peak month: ${startStr}</div>
            `;
        } else {
            container.innerHTML = '<div class="streak-company">No streaks found</div>';
        }
    }

    // ========== INSIGHT 5: THE SLEEPER ==========
    function renderSleeper(events) {
        const container = document.getElementById('sleeperContent');
        const now = new Date();
        
        // Find company with longest gap since last milestone
        const lastMilestoneByCompany = {};
        events.forEach(e => {
            const d = new Date(e.date);
            if (!lastMilestoneByCompany[e.company] || d > lastMilestoneByCompany[e.company].date) {
                lastMilestoneByCompany[e.company] = { date: d, title: e.title };
            }
        });
        
        // Find the one with oldest last milestone
        let sleeper = null;
        let maxGap = 0;
        
        Object.entries(lastMilestoneByCompany).forEach(([company, data]) => {
            const gap = now - data.date;
            if (gap > maxGap) {
                maxGap = gap;
                sleeper = { company, ...data };
            }
        });
        
        if (sleeper) {
            const days = Math.floor(maxGap / (24 * 60 * 60 * 1000));
            const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            const lastStr = `${monthNames[sleeper.date.getMonth()]} ${sleeper.date.getDate()}, ${sleeper.date.getFullYear()}`;
            
            container.innerHTML = `
                <div class="sleeper-company">${getCompanyLabel(sleeper.company)}</div>
                <div class="sleeper-days">${days}</div>
                <span class="sleeper-label">days since last update</span>
                <div class="sleeper-since">Last: "${sleeper.title.slice(0, 35)}${sleeper.title.length > 35 ? '...' : ''}"</div>
            `;
        } else {
            container.innerHTML = '<div class="sleeper-company">No data</div>';
        }
    }

    // ========== PULSE CHART (GitHub-style heatmap) ==========
    function renderPulseChart(events) {
        const container = document.getElementById('pulseChart');
        const legendContainer = document.getElementById('pulseLegend');
        container.innerHTML = '';
        
        // Get year range
        const years = [...new Set(events.map(e => new Date(e.date).getFullYear()))].sort();
        
        if (years.length === 0) return;
        
        // Count events by year-month
        const countByYearMonth = {};
        events.forEach(e => {
            const d = new Date(e.date);
            const key = `${d.getFullYear()}-${d.getMonth()}`;
            countByYearMonth[key] = (countByYearMonth[key] || 0) + 1;
        });
        
        // Find max for scaling
        const maxCount = Math.max(...Object.values(countByYearMonth), 1);
        
        // Month names for header
        const monthNames = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
        const fullMonthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        
        // Build the grid HTML
        let html = '';
        
        // Header row with month labels
        html += '<div class="pulse-row pulse-header-row">';
        html += '<span class="pulse-year-label"></span>'; // Empty corner
        monthNames.forEach(m => {
            html += `<span class="pulse-month-label">${m}</span>`;
        });
        html += '</div>';
        
        // Data rows for each year
        years.forEach(year => {
            html += '<div class="pulse-row">';
            html += `<span class="pulse-year-label">${year}</span>`;
            
            for (let month = 0; month < 12; month++) {
                const key = `${year}-${month}`;
                const count = countByYearMonth[key] || 0;
                
                // Calculate intensity level (0-5)
                const level = count === 0 ? 0 : Math.min(5, Math.ceil((count / maxCount) * 5));
                
                const tooltip = `${fullMonthNames[month]} ${year}: ${count} milestone${count !== 1 ? 's' : ''}`;
                
                html += `<div class="pulse-cell" data-level="${level}" title="${tooltip}"></div>`;
            }
            
            html += '</div>';
        });
        
        container.innerHTML = html;
        
        // Legend
        legendContainer.innerHTML = `
            <span class="pulse-legend-label">Less</span>
            <span class="pulse-legend-box" data-level="0"></span>
            <span class="pulse-legend-box" data-level="1"></span>
            <span class="pulse-legend-box" data-level="2"></span>
            <span class="pulse-legend-box" data-level="3"></span>
            <span class="pulse-legend-box" data-level="4"></span>
            <span class="pulse-legend-box" data-level="5"></span>
            <span class="pulse-legend-label">More</span>
        `;
    }

    // ========== FOCUS SHIFT ==========
    function renderFocusShift(events) {
        const container = document.getElementById('focusShift');
        container.innerHTML = '';
        
        // Recent 6 months vs previous 6 months
        const now = new Date();
        const sixMonthsAgo = new Date(now.getTime() - 180 * 24 * 60 * 60 * 1000);
        const twelveMonthsAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
        
        const recent = events.filter(e => new Date(e.date) >= sixMonthsAgo);
        const previous = events.filter(e => {
            const d = new Date(e.date);
            return d >= twelveMonthsAgo && d < sixMonthsAgo;
        });
        
        // Calculate category ranks
        const getTopCategories = (evts) => {
            const counts = {};
            evts.forEach(e => counts[e.category] = (counts[e.category] || 0) + 1);
            return Object.entries(counts).sort((a, b) => b[1] - a[1]);
        };
        
        const recentTop = getTopCategories(recent);
        const previousTop = getTopCategories(previous);
        
        // Get max for scaling
        const recentMax = recentTop[0]?.[1] || 1;
        
        // Show comparison
        recentTop.forEach(([cat, count]) => {
            const prevCount = previousTop.find(([c]) => c === cat)?.[1] || 0;
            const prevRank = previousTop.findIndex(([c]) => c === cat) + 1;
            const currentRank = recentTop.findIndex(([c]) => c === cat) + 1;
            
            const rankChange = prevRank === 0 ? 'new' : prevRank - currentRank;
            let arrow = '→';
            let arrowClass = 'same';
            
            if (rankChange === 'new' || rankChange > 0) {
                arrow = '↑';
                arrowClass = 'up';
            } else if (rankChange < 0) {
                arrow = '↓';
                arrowClass = 'down';
            }
            
            const changeText = rankChange === 'new' ? 'NEW' : 
                            rankChange > 0 ? `+${rankChange}` : 
                            rankChange < 0 ? `${rankChange}` : '—';
            
            const item = document.createElement('div');
            item.className = 'focus-item';
            item.innerHTML = `
                <span class="focus-category">${getCategoryLabel(cat)}</span>
                <span class="focus-arrow ${arrowClass}">${arrow}</span>
                <span class="focus-change">${changeText}</span>
                <div class="focus-bar">
                    <div class="focus-bar-fill" data-category="${cat}" style="width: ${(count/recentMax)*100}%"></div>
                </div>
            `;
            container.appendChild(item);
        });
    }

    // ========== TOP TAGS ==========
    function renderTopTags(events) {
        const container = document.getElementById('topTags');
        container.innerHTML = '';
        
        // Aggregate all tags
        const tagCounts = {};
        events.forEach(event => {
            (event.tags || []).forEach(tag => {
                tagCounts[tag] = (tagCounts[tag] || 0) + 1;
            });
        });
        
        // Sort and take top 15
        const sorted = Object.entries(tagCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 15);
        
        const maxCount = sorted[0]?.[1] || 1;
        
        sorted.forEach(([tag, count], index) => {
            const el = document.createElement('span');
            el.className = 'stats-tag';
            
            // Size based on frequency
            if (index < 3) {
                el.dataset.size = 'large';
            } else if (index < 7) {
                el.dataset.size = 'medium';
            }
            
            el.innerHTML = `${tag}<span class="stats-tag-count">${count}</span>`;
            container.appendChild(el);
        });
    }

    // ========== FUN FACTS ==========
    function renderFunFacts(events) {
        const container = document.getElementById('funFacts');
        container.innerHTML = '';
        
        // Fact 1: Busiest day of week
        const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dayCounts = [0, 0, 0, 0, 0, 0, 0];
        events.forEach(e => {
            const day = new Date(e.date).getDay();
            dayCounts[day]++;
        });
        const busiestDay = dayCounts.indexOf(Math.max(...dayCounts));
        
        // Fact 2: Most common tag
        const tagCounts = {};
        events.forEach(e => (e.tags || []).forEach(t => tagCounts[t] = (tagCounts[t] || 0) + 1));
        const topTag = Object.entries(tagCounts).sort((a, b) => b[1] - a[1])[0];
        
        // Fact 3: Longest gap between any two consecutive events
        const sortedByDate = [...events].sort((a, b) => new Date(a.date) - new Date(b.date));
        let longestGap = 0;
        let gapStart = null;
        for (let i = 1; i < sortedByDate.length; i++) {
            const gap = new Date(sortedByDate[i].date) - new Date(sortedByDate[i-1].date);
            if (gap > longestGap) {
                longestGap = gap;
                gapStart = new Date(sortedByDate[i-1].date);
            }
        }
        const longestGapDays = Math.floor(longestGap / (24 * 60 * 60 * 1000));
        
        // Render facts
        const facts = [
            {
                text: `<span class="fun-fact-highlight">${dayNames[busiestDay]}</span> is the busiest day for AI announcements`
            },
            {
                text: topTag ? `"<span class="fun-fact-highlight">${topTag[0]}</span>" appears in ${topTag[1]} milestones` : null
            },
            {
                text: longestGapDays > 0 ? `Longest quiet period: <span class="fun-fact-highlight">${longestGapDays} days</span>` : null
            }
        ].filter(f => f.text);
        
        facts.forEach(fact => {
            const el = document.createElement('div');
            el.className = 'fun-fact';
            el.innerHTML = `
                <span class="fun-fact-text">${fact.text}</span>
            `;
            container.appendChild(el);
        });
    }

    function getStatsTooltip() {
        let tooltip = document.getElementById('statsTooltip');
        if (!tooltip) {
            tooltip = document.createElement('div');
            tooltip.id = 'statsTooltip';
            tooltip.className = 'stats-tooltip';
            document.body.appendChild(tooltip);
        }
        return tooltip;
    }
    
    function showTooltip(e, text) {
        const tooltip = getStatsTooltip();
        tooltip.textContent = text;
        tooltip.style.left = e.clientX + 'px';
        tooltip.style.top = (e.clientY - 40) + 'px';
        tooltip.classList.add('visible');
    }
    
    function moveTooltip(e) {
        const tooltip = getStatsTooltip();
        tooltip.style.left = e.clientX + 'px';
        tooltip.style.top = (e.clientY - 40) + 'px';
    }
    
    function hideTooltip() {
        const tooltip = getStatsTooltip();
        tooltip.classList.remove('visible');
    }

    // ========== COMPANY RADAR (DNA) ==========
    function renderCompanyRadar(events) {
        const container = document.getElementById('companyRadar');
        if (!container) return;
        container.innerHTML = '';
        
        // Count by company and category
        const companyCategories = {};
        const companies = [...new Set(events.map(e => e.company))];
        
        events.forEach(e => {
            if (!companyCategories[e.company]) {
                companyCategories[e.company] = {};
            }
            companyCategories[e.company][e.category] = (companyCategories[e.company][e.category] || 0) + 1;
        });
        
        // Get all categories
        const categories = Object.keys(CATEGORIES);
        
        // Sort companies by total count
        const sortedCompanies = companies.sort((a, b) => {
            const totalA = Object.values(companyCategories[a] || {}).reduce((s, v) => s + v, 0);
            const totalB = Object.values(companyCategories[b] || {}).reduce((s, v) => s + v, 0);
            return totalB - totalA;
        });
        
        // Create bars for each company
        sortedCompanies.forEach(company => {
            const data = companyCategories[company] || {};
            const total = Object.values(data).reduce((s, v) => s + v, 0);
            if (total === 0) return;
            
            const row = document.createElement('div');
            row.className = 'radar-company';
            
            let barsHTML = '';
            categories.forEach(cat => {
                const count = data[cat] || 0;
                const percent = (count / total) * 100;
                if (percent > 0) {
                    barsHTML += `<div class="radar-segment" data-category="${cat}" data-tooltip="${CATEGORIES[cat].label}: ${count} (${Math.round(percent)}%)" style="width: ${percent}%"></div>`;
                }
            });
            
            row.innerHTML = `
                <span class="radar-label">${getCompanyLabel(company)}</span>
                <div class="radar-bars">${barsHTML}</div>
            `;
            
            container.appendChild(row);
        });
        
        // Add tooltip listeners to segments
        container.querySelectorAll('.radar-segment').forEach(segment => {
            segment.addEventListener('mouseenter', (e) => showTooltip(e, segment.dataset.tooltip));
            segment.addEventListener('mousemove', moveTooltip);
            segment.addEventListener('mouseleave', hideTooltip);
        });
        
        // Add legend
        const legend = document.createElement('div');
        legend.className = 'radar-legend';
        legend.innerHTML = categories.map(cat => `
            <div class="radar-legend-item">
                <span class="radar-legend-dot" style="background: var(--cat-${cat})"></span>
                <span>${CATEGORIES[cat].label.split(' ')[0]}</span>
            </div>
        `).join('');
        container.appendChild(legend);
    }

    // ========== COMPANY TIMELINE ==========
    function renderCompanyTimeline(events) {
        const container = document.getElementById('companyTimeline');
        if (!container) return;
        container.innerHTML = '';
        
        // Get date range
        const dates = events.map(e => new Date(e.date).getTime());
        const minDate = Math.min(...dates);
        const maxDate = Math.max(...dates);
        const range = maxDate - minDate || 1;
        
        // Group by company
        const companyData = {};
        events.forEach(e => {
            if (!companyData[e.company]) {
                companyData[e.company] = { events: [], first: Infinity, last: 0 };
            }
            const time = new Date(e.date).getTime();
            companyData[e.company].events.push(time);
            companyData[e.company].first = Math.min(companyData[e.company].first, time);
            companyData[e.company].last = Math.max(companyData[e.company].last, time);
        });
        
        // Sort by first appearance (who entered first)
        const sorted = Object.entries(companyData).sort((a, b) => a[1].first - b[1].first);
        
        sorted.forEach(([company, data]) => {
            const left = ((data.first - minDate) / range) * 100;
            const width = Math.max(((data.last - data.first) / range) * 100, 2);
            const tooltipText = `${data.events.length} milestones · ${new Date(data.first).toLocaleDateString()} → ${new Date(data.last).toLocaleDateString()}`;
            
            const row = document.createElement('div');
            row.className = 'timeline-company-row';
            row.innerHTML = `
                <span class="timeline-company-label">${getCompanyLabel(company)}</span>
                <div class="timeline-bar-container">
                    <div class="timeline-bar-fill" data-company="${company}" 
                         data-tooltip="${tooltipText}"
                         style="left: ${left}%; width: ${width}%">
                        <span class="timeline-count">${data.events.length}</span>
                    </div>
                </div>
            `;
            container.appendChild(row);
        });
        
        // Add tooltip listeners
        container.querySelectorAll('.timeline-bar-fill').forEach(bar => {
            bar.addEventListener('mouseenter', (e) => showTooltip(e, bar.dataset.tooltip));
            bar.addEventListener('mousemove', moveTooltip);
            bar.addEventListener('mouseleave', hideTooltip);
        });
        
        // Add axis
        const minYear = new Date(minDate).getFullYear();
        const maxYear = new Date(maxDate).getFullYear();
        const axis = document.createElement('div');
        axis.className = 'timeline-axis';
        axis.innerHTML = `<span>${minYear}</span><span>${maxYear}</span>`;
        container.appendChild(axis);
    }

    // ========== MOMENTUM CHART ==========
    function renderMomentumChart(events) {
        const container = document.getElementById('momentumChart');
        if (!container) return;
        container.innerHTML = '';
        
        const now = new Date();
        const ninetyDaysAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
        const oneEightyDaysAgo = new Date(now.getTime() - 180 * 24 * 60 * 60 * 1000);
        
        // Count recent vs previous 90 days
        const companyMomentum = {};
        
        events.forEach(e => {
            const date = new Date(e.date);
            if (!companyMomentum[e.company]) {
                companyMomentum[e.company] = { recent: 0, previous: 0 };
            }
            
            if (date >= ninetyDaysAgo) {
                companyMomentum[e.company].recent++;
            } else if (date >= oneEightyDaysAgo) {
                companyMomentum[e.company].previous++;
            }
        });
        
        // Calculate momentum (change)
        const momentum = Object.entries(companyMomentum)
            .map(([company, data]) => ({
                company,
                change: data.recent - data.previous,
                recent: data.recent,
                previous: data.previous
            }))
            .filter(m => m.recent > 0 || m.previous > 0)
            .sort((a, b) => b.change - a.change);
        
        if (momentum.length === 0) {
            container.innerHTML = '<div class="empty-state">No recent activity to compare</div>';
            return;
        }
        
        const maxChange = Math.max(...momentum.map(m => Math.abs(m.change)), 1);
        
        momentum.forEach(({ company, change, recent, previous }) => {
            const barWidth = change === 0 ? 0 : (Math.abs(change) / maxChange) * 45;
            const isPositive = change >= 0;
            const tooltipText = `Last 90 days: ${recent} · Previous 90 days: ${previous}`;
            
            const row = document.createElement('div');
            row.className = 'momentum-row';
            
            if (change === 0) {
                row.innerHTML = `
                    <span class="momentum-label">${getCompanyLabel(company)}</span>
                    <div class="momentum-bar-container">
                        <div class="momentum-center"></div>
                        <div class="momentum-zero" data-tooltip="${tooltipText}">
                            <span class="momentum-value">0</span>
                        </div>
                    </div>
                `;
            } else {
                row.innerHTML = `
                    <span class="momentum-label">${getCompanyLabel(company)}</span>
                    <div class="momentum-bar-container">
                        <div class="momentum-center"></div>
                        <div class="momentum-bar ${isPositive ? 'positive' : 'negative'}" 
                             data-tooltip="${tooltipText}"
                             style="width: ${Math.max(barWidth, 8)}%">
                            <span class="momentum-value">${change > 0 ? '+' : ''}${change}</span>
                        </div>
                    </div>
                `;
            }
            container.appendChild(row);
        });
        
        // Add tooltip listeners
        container.querySelectorAll('.momentum-bar, .momentum-zero').forEach(bar => {
            bar.addEventListener('mouseenter', (e) => showTooltip(e, bar.dataset.tooltip));
            bar.addEventListener('mousemove', moveTooltip);
            bar.addEventListener('mouseleave', hideTooltip);
        });
        
        // Add axis labels
        const axis = document.createElement('div');
        axis.className = 'momentum-axis';
        axis.innerHTML = '<span>← Slowing</span><span>Accelerating →</span>';
        container.appendChild(axis);
    }

    // ========== FIRST MOVER ==========
    function renderFirstMover(events) {
        const container = document.getElementById('firstMover');
        if (!container) return;
        container.innerHTML = '';
        
        // For each category, find who has the most
        const categoryLeaders = {};
        
        events.forEach(e => {
            if (!categoryLeaders[e.category]) {
                categoryLeaders[e.category] = {};
            }
            categoryLeaders[e.category][e.company] = (categoryLeaders[e.category][e.company] || 0) + 1;
        });
        
        // Find leader for each category
        const categories = Object.keys(CATEGORIES);
        
        const results = categories.map(cat => {
            const data = categoryLeaders[cat] || {};
            const entries = Object.entries(data).sort((a, b) => b[1] - a[1]);
            const leader = entries[0];
            return {
                category: cat,
                leader: leader ? leader[0] : null,
                count: leader ? leader[1] : 0,
                total: Object.values(data).reduce((s, v) => s + v, 0),
                breakdown: entries.slice(0, 3) // Top 3 for tooltip
            };
        }).filter(r => r.leader);
        
        results.forEach(({ category, leader, count, total, breakdown }) => {
            const percent = total > 0 ? (count / total) * 100 : 0;
            const tooltipText = breakdown.map(([c, n]) => `${getCompanyLabel(c)}: ${n}`).join(' · ');
            
            const row = document.createElement('div');
            row.className = 'first-mover-row';
            row.dataset.tooltip = tooltipText;
            row.innerHTML = `
                <span class="first-mover-category">${CATEGORIES[category].label.split(' ')[0]}</span>
                <span class="first-mover-company">${getCompanyLabel(leader)}</span>
                <span class="first-mover-count">${count}/${total}</span>
                <div class="first-mover-bar">
                    <div class="first-mover-bar-fill" style="width: ${percent}%"></div>
                </div>
            `;
            container.appendChild(row);
        });
        
        // Add tooltip listeners
        container.querySelectorAll('.first-mover-row').forEach(row => {
            row.addEventListener('mouseenter', (e) => showTooltip(e, row.dataset.tooltip));
            row.addEventListener('mousemove', moveTooltip);
            row.addEventListener('mouseleave', hideTooltip);
        });
    }

    // ========== DAY PATTERN ==========
    function renderDayPattern(events) {
        const container = document.getElementById('dayPattern');
        if (!container) return;
        container.innerHTML = '';
        
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const fullDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dayCounts = [0, 0, 0, 0, 0, 0, 0];
        
        events.forEach(e => {
            const day = new Date(e.date).getDay();
            dayCounts[day]++;
        });
        
        const maxCount = Math.max(...dayCounts, 1);
        const maxDay = dayCounts.indexOf(maxCount);
        const total = dayCounts.reduce((a, b) => a + b, 0);
        
        days.forEach((day, i) => {
            const count = dayCounts[i];
            const percent = (count / maxCount) * 100;
            const isMax = i === maxDay && count > 0;
            const percentage = total > 0 ? Math.round((count / total) * 100) : 0;
            const tooltipText = `${fullDays[i]}: ${count} milestones (${percentage}% of all)`;
            
            const row = document.createElement('div');
            row.className = 'day-row';
            row.innerHTML = `
                <span class="day-label">${day}</span>
                <div class="day-bar-container">
                    <div class="day-bar ${isMax ? 'day-highlight' : ''}" data-tooltip="${tooltipText}" style="width: ${percent}%">
                        <span class="day-count">${count}</span>
                    </div>
                </div>
            `;
            container.appendChild(row);
        });
        
        // Add tooltip listeners
        container.querySelectorAll('.day-bar').forEach(bar => {
            bar.addEventListener('mouseenter', (e) => showTooltip(e, bar.dataset.tooltip));
            bar.addEventListener('mousemove', moveTooltip);
            bar.addEventListener('mouseleave', hideTooltip);
        });
    }
    

    // ========== CATEGORY RINGS (Donut Charts) ==========
    function renderCategoryRings(events) {
        const container = document.getElementById('categoryRings');
        if (!container) return;
        container.innerHTML = '';
        
        const categories = Object.keys(CATEGORIES);
        
        // Company colors from CSS variables (single source of truth)
        const rootStyles = getComputedStyle(document.documentElement);
        const companyColors = {
            openai: rootStyles.getPropertyValue('--company-openai').trim() || '#10a37f',
            anthropic: rootStyles.getPropertyValue('--company-anthropic').trim() || '#cc9366',
            google: rootStyles.getPropertyValue('--company-google').trim() || '#4285f4',
            meta: rootStyles.getPropertyValue('--company-meta').trim() || '#0088ff',
            mistral: rootStyles.getPropertyValue('--company-mistral').trim() || '#ff7b00',
            xai: rootStyles.getPropertyValue('--company-xai').trim() || '#888888',
            deepseek: rootStyles.getPropertyValue('--company-deepseek').trim() || '#4e79a7'
        };
        
        categories.forEach(category => {
            const categoryEvents = events.filter(e => e.category === category);
            if (categoryEvents.length === 0) return;
            
            // Count by company
            const companyCounts = {};
            categoryEvents.forEach(e => {
                companyCounts[e.company] = (companyCounts[e.company] || 0) + 1;
            });
            
            const total = categoryEvents.length;
            const sorted = Object.entries(companyCounts).sort((a, b) => b[1] - a[1]);
            const leader = sorted[0];
            
            // Create ring segments
            const radius = 38;
            const circumference = 2 * Math.PI * radius;
            let currentOffset = 0;
            
            let segmentsHTML = '';
            sorted.forEach(([company, count]) => {
                const percent = count / total;
                const dashLength = percent * circumference;
                const dashOffset = -currentOffset;
                const color = companyColors[company] || '#6366f1';
                
                segmentsHTML += `
                    <circle 
                        class="ring-segment" 
                        cx="50" cy="50" r="${radius}"
                        stroke="${color}"
                        stroke-dasharray="${dashLength} ${circumference - dashLength}"
                        stroke-dashoffset="${dashOffset}"
                        data-tooltip="${getCompanyLabel(company)}: ${count} (${Math.round(percent * 100)}%)"
                    />
                `;
                currentOffset += dashLength;
            });
            
            const ringContainer = document.createElement('div');
            ringContainer.className = 'ring-container';
            ringContainer.innerHTML = `
                <div class="ring-chart">
                    <svg class="ring-svg" viewBox="0 0 100 100">
                        ${segmentsHTML}
                    </svg>
                    <div class="ring-center">
                        <div class="ring-total">${total}</div>
                    </div>
                </div>
                <div class="ring-category-label">${CATEGORIES[category].label}</div>
                <div class="ring-leader">${getCompanyLabel(leader[0])}</div>
            `;
            
            container.appendChild(ringContainer);
            
            // Add tooltip listeners to segments
            ringContainer.querySelectorAll('.ring-segment').forEach(segment => {
                segment.addEventListener('mouseenter', (e) => showTooltip(e, segment.dataset.tooltip));
                segment.addEventListener('mousemove', moveTooltip);
                segment.addEventListener('mouseleave', hideTooltip);
            });
        });
    }

    // ========== TAG NETWORK (Co-occurrence) ==========
    function renderTagNetwork(events) {
        const container = document.getElementById('tagNetwork');
        if (!container) return;
        container.innerHTML = '';
        
        // Count tag co-occurrences
        const cooccurrence = {};
        
        events.forEach(e => {
            if (!e.tags || e.tags.length < 2) return;
            
            // For each pair of tags
            for (let i = 0; i < e.tags.length; i++) {
                for (let j = i + 1; j < e.tags.length; j++) {
                    const tag1 = e.tags[i];
                    const tag2 = e.tags[j];
                    // Sort to ensure consistent key
                    const key = [tag1, tag2].sort().join('|||');
                    cooccurrence[key] = (cooccurrence[key] || 0) + 1;
                }
            }
        });
        
        // Sort by frequency and take top pairs
        const sorted = Object.entries(cooccurrence)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 15);
        
        if (sorted.length === 0) {
            container.innerHTML = '<div style="text-align: center; color: var(--text-tertiary); font-size: 0.75rem;">Not enough tag data</div>';
            return;
        }
        
        const maxCount = sorted[0][1];
        
        sorted.forEach(([key, count]) => {
            const [tag1, tag2] = key.split('|||');
            const isStrong = count >= maxCount * 0.7;
            
            const connection = document.createElement('div');
            connection.className = `tag-connection ${isStrong ? 'strong' : ''}`;
            connection.innerHTML = `
                <span class="tag-connection-item">${formatTagLabel(tag1)}</span>
                <span class="tag-connection-link">↔</span>
                <span class="tag-connection-item">${formatTagLabel(tag2)}</span>
                <span class="tag-connection-count">×${count}</span>
            `;
            container.appendChild(connection);
        });
    }

    // Helper: Format tag label (capitalize, replace dashes)
    function formatTagLabel(tag) {
        return tag
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
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
                case '3':
                    switchView('stats');
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
                // Ensure we keep the latest events in view after layout changes
                scrollTimelineToLatest();
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
        alert('Keyboard Shortcuts:\n\n1 - Timeline view\n2 - Grid view\n3 - Stats view\nT - Toggle theme\nEsc - Close panel\n? - Show this help');
    }

    // ========== INIT ==========
    init();
})();