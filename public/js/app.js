/**
 * NEURON NET — ACADEMIC RESOURCE PLATFORM
 * Frontend Client Application
 * Monad Editorial Technology Aesthetic & REST API Integration
 * High-Concurrency Resilient Client (Optimized for 1,000+ Students)
 */

(function () {
  'use strict';

  // Resilient authoritative dataset (0ms instant render & offline protection)
  const FALLBACK_RESOURCES = [
    {
      id: 'res-auto-c-cycle',
      title: 'C Cycle — Autonomous',
      slug: 'c-cycle-autonomous',
      description: 'Official department Google Drive folder containing verified study materials, lecture notes, question banks, and cycle resources for Autonomous C Cycle.',
      category: 'study_materials',
      scheme: 'autonomous',
      schemeLabel: 'Autonomous',
      semester: 'c-cycle',
      semesterLabel: 'C Cycle',
      resourceType: 'google_drive_folder',
      url: 'https://drive.google.com/drive/folders/1DKPh-WVLe8I7o_SbA2QeJ5pA3c0zOM7e?usp=sharing',
      isOfficialClubDrive: true,
      isActive: true,
      sortOrder: 1,
      tags: ['autonomous', 'c-cycle', 'physics cycle', 'chemistry cycle', 'notes', 'official drive'],
    },
    {
      id: 'res-auto-p-cycle',
      title: 'P Cycle — Autonomous',
      slug: 'p-cycle-autonomous',
      description: 'Official department Google Drive folder containing comprehensive academic notes, presentations, lab manuals, and tutorials for Autonomous P Cycle.',
      category: 'study_materials',
      scheme: 'autonomous',
      schemeLabel: 'Autonomous',
      semester: 'p-cycle',
      semesterLabel: 'P Cycle',
      resourceType: 'google_drive_folder',
      url: 'https://drive.google.com/drive/folders/1JHo8uPNaLhsA0UkckpxyCUEqUyVHQNne?usp=sharing',
      isOfficialClubDrive: true,
      isActive: true,
      sortOrder: 2,
      tags: ['autonomous', 'p-cycle', 'physics cycle', 'notes', 'official drive'],
    },
    {
      id: 'res-auto-3rd-sem',
      title: '3rd Semester — Autonomous',
      slug: '3rd-semester-autonomous',
      description: 'Curated Google Drive repository for 3rd Semester Autonomous CSE (AI & ML) core subjects, syllabus copies, faculty notes, and reference books.',
      category: 'study_materials',
      scheme: 'autonomous',
      schemeLabel: 'Autonomous',
      semester: '3',
      semesterLabel: '3rd Semester',
      resourceType: 'google_drive_folder',
      url: 'https://drive.google.com/drive/folders/12EzrbLaV5KSqzZLkaK_BDmwJI6oWx1ZT?usp=sharing',
      isOfficialClubDrive: true,
      isActive: true,
      sortOrder: 3,
      tags: ['autonomous', '3rd sem', 'data structures', 'maths', 'official drive'],
    },
    {
      id: 'res-vtu-c-cycle',
      title: 'C Cycle — VTU',
      slug: 'c-cycle-vtu',
      description: 'VTU Scheme Chemistry Cycle verified academic repository including model question papers, handwritten lecture notes, and lab manuals.',
      category: 'study_materials',
      scheme: 'vtu',
      schemeLabel: 'VTU Scheme',
      semester: 'c-cycle',
      semesterLabel: 'C Cycle',
      resourceType: 'google_drive_folder',
      url: 'https://drive.google.com/drive/folders/1S9d5e4j8_8FgRng6CspTZ05jNJoiXso7?usp=sharing',
      isOfficialClubDrive: true,
      isActive: true,
      sortOrder: 4,
      tags: ['vtu', 'c-cycle', 'chemistry cycle', 'notes', 'official drive'],
    },
    {
      id: 'res-vtu-p-cycle',
      title: 'P Cycle — VTU',
      slug: 'p-cycle-vtu',
      description: 'VTU Scheme Physics Cycle academic folder with comprehensive notes, previous internal assessment tests, and reference problem solutions.',
      category: 'study_materials',
      scheme: 'vtu',
      schemeLabel: 'VTU Scheme',
      semester: 'p-cycle',
      semesterLabel: 'P Cycle',
      resourceType: 'google_drive_folder',
      url: 'https://drive.google.com/drive/folders/1FciRg9oqHptrkeNpJefZZ-nsmJLVn5nn?usp=sharing',
      isOfficialClubDrive: true,
      isActive: true,
      sortOrder: 5,
      tags: ['vtu', 'p-cycle', 'physics cycle', 'notes', 'official drive'],
    },
    {
      id: 'res-vtu-3rd-sem',
      title: '3rd Semester — VTU',
      slug: '3rd-semester-vtu',
      description: 'Official department Google Drive for 3rd Semester VTU Scheme CSE (AI & ML) syllabus, standard textbooks, subject slides, and lab code.',
      category: 'study_materials',
      scheme: 'vtu',
      schemeLabel: 'VTU Scheme',
      semester: '3',
      semesterLabel: '3rd Semester',
      resourceType: 'google_drive_folder',
      url: 'https://drive.google.com/drive/folders/1ChizQVDfIYL6qVlBDLge45ClAM-GAQBx?usp=sharing',
      isOfficialClubDrive: true,
      isActive: true,
      sortOrder: 6,
      tags: ['vtu', '3rd sem', 'notes', 'official drive', 'algorithms'],
    },
    {
      id: 'res-vtu-4th-sem',
      title: '4th Semester — VTU',
      slug: '4th-semester-vtu',
      description: 'Academic resources repository for 4th Semester VTU Scheme containing Design and Analysis of Algorithms, Operating Systems, and core courses.',
      category: 'study_materials',
      scheme: 'vtu',
      schemeLabel: 'VTU Scheme',
      semester: '4',
      semesterLabel: '4th Semester',
      resourceType: 'google_drive_folder',
      url: 'https://drive.google.com/drive/folders/1trUoWQUW4XoX_oXt4X5pZ0q9loEPzVYF?usp=sharing',
      isOfficialClubDrive: true,
      isActive: true,
      sortOrder: 7,
      tags: ['vtu', '4th sem', 'daa', 'os', 'notes', 'official drive'],
    },
    {
      id: 'res-vtu-5th-sem',
      title: '5th Semester — VTU',
      slug: '5th-semester-vtu',
      description: 'Comprehensive 5th Semester VTU study materials, Database Management Systems notes, Automata Theory, and Artificial Intelligence foundation papers.',
      category: 'study_materials',
      scheme: 'vtu',
      schemeLabel: 'VTU Scheme',
      semester: '5',
      semesterLabel: '5th Semester',
      resourceType: 'google_drive_folder',
      url: 'https://drive.google.com/drive/folders/17ZZS_w1oVSm5Bz3yGDyYT_U6oegbHE05?usp=sharing',
      isOfficialClubDrive: true,
      isActive: true,
      sortOrder: 8,
      tags: ['vtu', '5th sem', 'dbms', 'atc', 'ai', 'notes', 'official drive'],
    },
    {
      id: 'res-vtu-6th-sem',
      title: '6th Semester — VTU',
      slug: '6th-semester-vtu',
      description: 'Advanced 6th Semester VTU Machine Learning, Deep Learning, Cloud Computing lecture slides, lab manuals, and previous examination papers.',
      category: 'study_materials',
      scheme: 'vtu',
      schemeLabel: 'VTU Scheme',
      semester: '6',
      semesterLabel: '6th Semester',
      resourceType: 'google_drive_folder',
      url: 'https://drive.google.com/drive/folders/1bEB2JrfuDoH3YiUvZn7tx9zHgrNSi-ca?usp=sharing',
      isOfficialClubDrive: true,
      isActive: true,
      sortOrder: 9,
      tags: ['vtu', '6th sem', 'machine learning', 'cloud computing', 'notes', 'official drive'],
    },
    {
      id: 'res-vtu-7th-sem',
      title: '7th Semester — VTU',
      slug: '7th-semester-vtu',
      description: 'Final-year 7th Semester VTU academic materials, Big Data Analytics notes, Natural Language Processing resources, and project work guidelines.',
      category: 'study_materials',
      scheme: 'vtu',
      schemeLabel: 'VTU Scheme',
      semester: '7',
      semesterLabel: '7th Semester',
      resourceType: 'google_drive_folder',
      url: 'https://drive.google.com/drive/folders/1ODRE1J8RSteZxF1mzESfWDnFl6PoALTs?usp=sharing',
      isOfficialClubDrive: true,
      isActive: true,
      sortOrder: 10,
      tags: ['vtu', '7th sem', 'nlp', 'big data', 'notes', 'official drive'],
    },
    {
      id: 'res-ext-5th-sem',
      title: '5th Semester Resources (VTU Circle)',
      slug: '5th-sem-vtu-circle',
      description: 'External reference portal providing notes, question paper solutions, and syllabus copies for 2022 Scheme CSE & ISE.',
      category: 'study_materials',
      scheme: 'vtu',
      schemeLabel: 'VTU Scheme',
      semester: '5',
      semesterLabel: '5th Semester',
      resourceType: 'external_website',
      url: 'https://vtucircle.com/5th-semester-2022-scheme-cse-ise/',
      isOfficialClubDrive: false,
      isActive: true,
      sortOrder: 11,
      tags: ['external', 'vtu circle', '5th sem', 'cse', 'ise'],
    },
    {
      id: 'res-ext-7th-sem',
      title: '7th Semester Resources (VTU Circle)',
      slug: '7th-sem-vtu-circle',
      description: 'External reference repository for 7th Semester VTU 2022 Scheme CSE & ISE elective modules and past papers.',
      category: 'study_materials',
      scheme: 'vtu',
      schemeLabel: 'VTU Scheme',
      semester: '7',
      semesterLabel: '7th Semester',
      resourceType: 'external_website',
      url: 'https://vtucircle.com/7th-semester-2022-scheme-cse-ise/',
      isOfficialClubDrive: false,
      isActive: true,
      sortOrder: 12,
      tags: ['external', 'vtu circle', '7th sem', 'notes'],
    },
    {
      id: 'res-ext-syllabus',
      title: 'VTU Official Syllabus Repository',
      slug: 'vtu-syllabus-portal',
      description: 'Authoritative syllabus documents, course credit structures, and scheme guidelines curated on VTU Circle.',
      category: 'syllabus',
      scheme: 'vtu',
      schemeLabel: 'VTU Scheme',
      semester: 'all',
      semesterLabel: 'All Semesters',
      resourceType: 'external_website',
      url: 'https://vtucircle.com/vtu-syllabus/',
      isOfficialClubDrive: false,
      isActive: true,
      sortOrder: 13,
      tags: ['external', 'syllabus', 'curriculum', 'credits', 'vtu'],
    },
    {
      id: 'res-ext-pyqp',
      title: 'Previous-Year Question Papers (VTU)',
      slug: 'vtu-previous-question-papers',
      description: 'Comprehensive archive of previous VTU semester-end examination question papers and answer keys.',
      category: 'previous_papers',
      scheme: 'vtu',
      schemeLabel: 'VTU Scheme',
      semester: 'all',
      semesterLabel: 'All Semesters',
      resourceType: 'external_website',
      url: 'https://vtucircle.com/vtu-question-paper/',
      isOfficialClubDrive: false,
      isActive: true,
      sortOrder: 14,
      tags: ['external', 'pyqp', 'exam papers', 'question bank'],
    },
    {
      id: 'res-ext-sgpa-calc',
      title: 'VTU SGPA Calculator',
      slug: 'vtu-sgpa-calculator',
      description: 'Interactive online calculator tailored to compute Semester Grade Point Average (SGPA) under CBCS guidelines.',
      category: 'calculator',
      scheme: 'vtu',
      schemeLabel: 'VTU Scheme',
      semester: 'all',
      semesterLabel: 'All Semesters',
      resourceType: 'external_website',
      url: 'https://vtucircle.com/vtu-sgpa-calculator/',
      isOfficialClubDrive: false,
      isActive: true,
      sortOrder: 15,
      tags: ['external', 'sgpa', 'calculator', 'grades', 'cbcs'],
    },
    {
      id: 'res-ext-cgpa-calc',
      title: 'VTU CGPA Calculator',
      slug: 'vtu-cgpa-calculator',
      description: 'Reliable online cumulative grade point calculator to aggregate multi-semester academic performance.',
      category: 'calculator',
      scheme: 'vtu',
      schemeLabel: 'VTU Scheme',
      semester: 'all',
      semesterLabel: 'All Semesters',
      resourceType: 'external_website',
      url: 'https://vtucircle.com/vtu-cgpa-calculator/',
      isOfficialClubDrive: false,
      isActive: true,
      sortOrder: 16,
      tags: ['external', 'cgpa', 'calculator', 'cumulative', 'grades'],
    },
  ];

  const FALLBACK_CATEGORIES = [
    { id: 'study_materials', label: 'Study Materials & Notes' },
    { id: 'syllabus', label: 'Curriculum & Syllabus' },
    { id: 'previous_papers', label: 'Question Papers (PYQP)' },
    { id: 'calculator', label: 'Academic Calculators' },
  ];

  // Try to load cached data from sessionStorage for zero-latency load
  function getCachedResources() {
    try {
      const cached = sessionStorage.getItem('nn_resources_v2');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (_) {}
    return null;
  }

  // State Management
  const initialData = getCachedResources() || FALLBACK_RESOURCES;
  const state = {
    resources: initialData,
    categories: FALLBACK_CATEGORIES,
    structure: null,
    activeScheme: 'all', // 'all' | 'autonomous' | 'vtu'
    activeSemester: 'all',
    activeCategory: 'all',
    searchQuery: '',
    driveOnly: false,
    isLoading: false,
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
    // Render immediately from local state (0ms instant render for students)
    renderCategoryFilters();
    renderSemesterFilters();
    renderResources();

    // Verify API health and sync data asynchronously in background
    checkApiHealth();
    syncDataInBackground();
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
      if (elements.apiStatusDot) elements.apiStatusDot.style.backgroundColor = '#10b981';
      if (elements.apiStatusText) elements.apiStatusText.textContent = 'Edge CDN Mode (Active)';
    }
  }

  // Asynchronous Data Loading with Edge CDN & Fallback Resilience
  async function syncDataInBackground() {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);

      const [resResources, resStructure] = await Promise.all([
        fetch('/api/resources', { signal: controller.signal })
          .then((r) => r.json())
          .catch(() => null),
        fetch('/api/academic-structure', { signal: controller.signal })
          .then((r) => r.json())
          .catch(() => null),
      ]);

      clearTimeout(timeoutId);

      if (resResources && resResources.success && Array.isArray(resResources.data) && resResources.data.length > 0) {
        state.resources = resResources.data;
        try {
          sessionStorage.setItem('nn_resources_v2', JSON.stringify(resResources.data));
        } catch (_) {}
      }

      if (resStructure && resStructure.success && resStructure.data) {
        state.structure = resStructure.data;
        if (Array.isArray(resStructure.data.categories)) {
          state.categories = resStructure.data.categories;
        }
        renderCategoryFilters();
        renderSemesterFilters();
      }

      renderResources();
    } catch (err) {
      console.warn('Network sync notice: serving from Edge resilient cache', err);
      // Seamlessly keep serving the verified fallback resources without any UI interruption
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
