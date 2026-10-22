/**
 * NEURON NET — ACADEMIC RESOURCE PLATFORM
 * Frontend Client Application
 * Monad Editorial Technology Aesthetic & REST API Integration
 */

(function () {
  'use strict';

  // State Management
  const state = {
    resources: [],
    categories: [],
    structure: null,
    activeScheme: 'all', // 'all' | 'autonomous' | 'vtu'
    activeSemester: 'all',
    activeCategory: 'all',
    searchQuery: '',
    driveOnly: false,
    isLoading: true,
  };

  // DOM Elements
  const elements = {
    driveGrid: document.getElementById('drive-resources-grid'),
    externalGrid: document.getElementById('external-resources-grid'),
    driveCount: document.getElementById('drive-count'),
    externalCount: document.getElementById('external-count'),
    totalBadge: document.getElementById('total-badge-count'),
    searchInput: document.getElementById('search-resources-input'),
    schemeNodes: document.querySelectorAll('.pipeline-node-pill'),
    semesterFilters: document.getElementById('semester-filters-container'),
    categoryFilters: document.getElementById('category-filters-container'),
    apiStatusDot: document.getElementById('api-status-dot'),
    apiStatusText: document.getElementById('api-status-text'),
    announcementBar: document.getElementById('announcement-bar'),
    announcementClose: document.getElementById('announcement-close'),
  };

  // Initial Boot
  async function init() {
    setupEventListeners();
    await checkApiHealth();
    await loadInitialData();
  }

  // Health Check
  async function checkApiHealth() {
    try {
      const res = await fetch('/api/health');
      if (res.ok) {
        if (elements.apiStatusDot) elements.apiStatusDot.style.backgroundColor = '#10b981';
        if (elements.apiStatusText) elements.apiStatusText.textContent = 'API Live & Operational';
      } else {
        throw new Error('API degraded');
      }
    } catch {
      if (elements.apiStatusDot) elements.apiStatusDot.style.backgroundColor = '#f59e0b';
      if (elements.apiStatusText) elements.apiStatusText.textContent = 'Offline Cached Mode';
    }
  }

  // Data Loading from Backend
  async function loadInitialData() {
    try {
      state.isLoading = true;
      const [resResources, resStructure] = await Promise.all([
        fetch('/api/resources').then((r) => r.json()),
        fetch('/api/academic-structure').then((r) => r.json()),
      ]);

      if (resResources.success && Array.isArray(resResources.data)) {
        state.resources = resResources.data;
      }

      if (resStructure.success && resStructure.data) {
        state.structure = resStructure.data;
        state.categories = resStructure.data.categories || [];
        renderCategoryFilters();
        renderSemesterFilters();
      }

      state.isLoading = false;
      renderResources();
    } catch (err) {
      console.error('Failed to load resources:', err);
      state.isLoading = false;
      renderErrorState();
    }
  }

  // Render Category Filters
  function renderCategoryFilters() {
    if (!elements.categoryFilters) return;

    let html = `
      <button class="filter-pill ${state.activeCategory === 'all' ? 'active' : ''}" data-category="all">
        All Types
      </button>
    `;

    state.categories.forEach((cat) => {
      html += `
        <button class="filter-pill ${state.activeCategory === cat.id ? 'active' : ''}" data-category="${cat.id}">
          ${escapeHtml(cat.label)}
        </button>
      `;
    });

    elements.categoryFilters.innerHTML = html;

    elements.categoryFilters.querySelectorAll('.filter-pill').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        elements.categoryFilters.querySelectorAll('.filter-pill').forEach((b) => b.classList.remove('active'));
        const target = e.currentTarget;
        target.classList.add('active');
        state.activeCategory = target.dataset.category || 'all';
        renderResources();
      });
    });
  }

  // Render Semester Filters dynamically based on selected scheme
  function renderSemesterFilters() {
    if (!elements.semesterFilters) return;

    let availableSems = [
      { id: 'all', label: 'All Semesters' },
      { id: 'c-cycle', label: 'C Cycle' },
      { id: 'p-cycle', label: 'P Cycle' },
      { id: '3', label: '3rd Sem' },
      { id: '4', label: '4th Sem' },
      { id: '5', label: '5th Sem' },
      { id: '6', label: '6th Sem' },
      { id: '7', label: '7th Sem' },
    ];

    if (state.activeScheme === 'autonomous') {
      availableSems = [
        { id: 'all', label: 'All Semesters' },
        { id: 'c-cycle', label: 'C Cycle' },
        { id: 'p-cycle', label: 'P Cycle' },
        { id: '3', label: '3rd Sem' },
      ];
    }

    let html = '';
    availableSems.forEach((sem) => {
      html += `
        <button class="filter-pill ${state.activeSemester === sem.id ? 'active' : ''}" data-semester="${sem.id}">
          ${escapeHtml(sem.label)}
        </button>
      `;
    });

    elements.semesterFilters.innerHTML = html;

    elements.semesterFilters.querySelectorAll('.filter-pill').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        elements.semesterFilters.querySelectorAll('.filter-pill').forEach((b) => b.classList.remove('active'));
        const target = e.currentTarget;
        target.classList.add('active');
        state.activeSemester = target.dataset.semester || 'all';
        renderResources();
      });
    });
  }

  // Filter & Search Logic
  function getFilteredResources() {
    return state.resources.filter((res) => {
      // Scheme Filter
      if (state.activeScheme !== 'all') {
        if (state.activeScheme === 'external') {
          if (res.isOfficialClubDrive) return false;
        } else if (res.scheme !== state.activeScheme) {
          return false;
        }
      }

      // Semester Filter
      if (state.activeSemester !== 'all') {
        if (res.semester !== state.activeSemester) return false;
      }

      // Category Filter
      if (state.activeCategory !== 'all') {
        if (res.category !== state.activeCategory) return false;
      }

      // Drive Only Filter
      if (state.driveOnly && !res.isOfficialClubDrive) {
        return false;
      }

      // Search Query Filter
      if (state.searchQuery) {
        const q = state.searchQuery.toLowerCase();
        const titleMatch = res.title.toLowerCase().includes(q);
        const descMatch = res.description.toLowerCase().includes(q);
        const tagMatch = res.tags && res.tags.some((t) => t.toLowerCase().includes(q));
        const schemeMatch = res.schemeLabel && res.schemeLabel.toLowerCase().includes(q);
        const semMatch = res.semesterLabel && res.semesterLabel.toLowerCase().includes(q);

        if (!titleMatch && !descMatch && !tagMatch && !schemeMatch && !semMatch) {
          return false;
        }
      }

      return true;
    });
  }

  // Render Cards
  function renderResources() {
    const filtered = getFilteredResources();

    // Priority 1: Official Club Google Drive Resources
    const driveResources = filtered.filter((r) => r.isOfficialClubDrive);
    // Priority 2: External Academic Resources
    const externalResources = filtered.filter((r) => !r.isOfficialClubDrive);

    // Update Counter Badges
    if (elements.driveCount) elements.driveCount.textContent = `(${driveResources.length})`;
    if (elements.externalCount) elements.externalCount.textContent = `(${externalResources.length})`;
    if (elements.totalBadge) elements.totalBadge.textContent = `${filtered.length} Resources Active`;

    // Render Drive Grid
    if (elements.driveGrid) {
      if (driveResources.length === 0) {
        elements.driveGrid.innerHTML = `
          <div class="empty-state-box">
            <h4 class="empty-state-title">No Club Google Drive Folders Match Your Filter</h4>
            <p class="empty-state-text">Try adjusting your semester or clearing the search terms to discover official course materials.</p>
            <button class="btn-pill-ghost" id="reset-drive-filter-btn">Reset All Filters</button>
          </div>
        `;
        const resetBtn = document.getElementById('reset-drive-filter-btn');
        if (resetBtn) resetBtn.addEventListener('click', resetAllFilters);
      } else {
        elements.driveGrid.innerHTML = driveResources.map(createDriveCardHtml).join('');
      }
    }

    // Render External Grid
    if (elements.externalGrid) {
      if (externalResources.length === 0) {
        elements.externalGrid.innerHTML = `
          <div class="empty-state-box">
            <h4 class="empty-state-title">No External Academic Resources in Current View</h4>
            <p class="empty-state-text">Select "All Schemes" or clear active filters to view VTU Circle syllabus copies, question banks, and GPA calculators.</p>
          </div>
        `;
      } else {
        elements.externalGrid.innerHTML = externalResources.map(createExternalCardHtml).join('');
      }
    }
  }

  // Card Template — Official Google Drive Resource (Priority 1)
  function createDriveCardHtml(item) {
    return `
      <article class="feature-card is-drive-card" id="card-${item.id}">
        <div class="card-top-meta">
          <span class="card-badge-drive">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/>
            </svg>
            OFFICIAL CLUB DRIVE
          </span>
          <span class="card-scheme-pill">${escapeHtml(item.schemeLabel || '')} • ${escapeHtml(item.semesterLabel || '')}</span>
        </div>

        <h3 class="card-title">${escapeHtml(item.title)}</h3>
        <p class="card-description">${escapeHtml(item.description)}</p>

        <div class="card-access-notice">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
          Folder access permissions configured by club owner
        </div>

        <div class="card-action-row">
          <a href="${item.url}" 
             target="_blank" 
             rel="noopener noreferrer" 
             class="btn-pill-blue"
             title="Open official Google Drive folder for ${escapeHtml(item.title)}">
            Open Drive Folder ▸
          </a>
        </div>
      </article>
    `;
  }

  // Card Template — External Academic Resource (Priority 2)
  function createExternalCardHtml(item) {
    return `
      <article class="feature-card is-external-card" id="card-${item.id}">
        <div class="card-top-meta">
          <span class="card-badge-external">
            EXTERNAL REFERENCE ↗
          </span>
          <span class="card-scheme-pill">${escapeHtml(item.semesterLabel || 'General')}</span>
        </div>

        <h3 class="card-title">${escapeHtml(item.title)}</h3>
        <p class="card-description">${escapeHtml(item.description)}</p>

        <div class="card-access-notice">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          Independent external academic reference portal (VTU Circle)
        </div>

        <div class="card-action-row">
          <a href="${item.url}" 
             target="_blank" 
             rel="noopener noreferrer" 
             class="btn-pill-black"
             title="Visit ${escapeHtml(item.title)}">
            Open External Resource ↗
          </a>
        </div>
      </article>
    `;
  }

  // Event Listeners Setup
  function setupEventListeners() {
    // Search input
    if (elements.searchInput) {
      elements.searchInput.addEventListener('input', (e) => {
        state.searchQuery = e.target.value.trim();
        renderResources();
      });
    }

    // Scheme Pipeline Nodes
    elements.schemeNodes.forEach((node) => {
      node.addEventListener('click', (e) => {
        elements.schemeNodes.forEach((n) => n.classList.remove('active'));
        const target = e.currentTarget;
        target.classList.add('active');
        state.activeScheme = target.dataset.scheme || 'all';
        renderSemesterFilters();
        renderResources();
      });
    });

    // Announcement dismiss
    if (elements.announcementClose && elements.announcementBar) {
      elements.announcementClose.addEventListener('click', () => {
        elements.announcementBar.style.display = 'none';
      });
    }

    // FAQ Accordion
    document.querySelectorAll('.faq-accordion-item').forEach((item) => {
      item.addEventListener('click', () => {
        item.classList.toggle('open');
      });
    });
  }

  // Reset Filters
  function resetAllFilters() {
    state.activeScheme = 'all';
    state.activeSemester = 'all';
    state.activeCategory = 'all';
    state.searchQuery = '';
    state.driveOnly = false;

    if (elements.searchInput) elements.searchInput.value = '';

    elements.schemeNodes.forEach((n) => {
      n.classList.toggle('active', n.dataset.scheme === 'all');
    });

    renderSemesterFilters();
    renderCategoryFilters();
    renderResources();
  }

  function renderErrorState() {
    if (elements.driveGrid) {
      elements.driveGrid.innerHTML = `
        <div class="empty-state-box">
          <h4 class="empty-state-title">Unable to Connect to Academic Resource Service</h4>
          <p class="empty-state-text">Please check your network connection or verify that the local server is running on port 3000.</p>
        </div>
      `;
    }
  }

  function escapeHtml(text) {
    if (!text) return '';
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Run on DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
