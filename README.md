# NEURON NET — Academic Resource Platform

> Official Centralized Academic Portal for the Department of Computer Science & Engineering (Artificial Intelligence & Machine Learning), AMC Engineering College, Bengaluru.

Developed and maintained by **NEURON NET Academic Club**.

---

## 1. Overview & Core Mission

NEURON NET is an academic platform designed to give students centralized, seamless access to semester-wise study materials, lecture notes, academic resources, VTU/Autonomous syllabus copies, previous-year question papers (PYQP), and academic calculation utilities.

### Primary Principle
The official Google Drive folders maintained by the NEURON NET Academic Club serve as the authoritative primary source of study materials. No file migration or duplication is performed; students access and browse materials through verified direct links to the official Google Drive folders.

---

## 2. Institutional Brand Hierarchy

The platform reflects the verified three-tier institutional hierarchy:
1. **Institutional Identity**: AMC Engineering College (Autonomous Institution, NAAC A+ | NBA Accredited)
2. **Departmental Identity**: Department of Computer Science & Engineering (Artificial Intelligence & Machine Learning)
3. **Platform & Club Identity**: NEURON NET Academic Club

The original asset logos are preserved under `public/assets/logos/`:
- `amc-college-logo.jpg`: AMC Engineering College Official Logo
- `cse-aiml-dept-logo.jpg`: CSE (AI & ML) Department Official Shield Crest
- `neuron-net-club-logo.jpg`: NEURON NET Academic Club Official Emblem

---

## 3. Resource Architecture

The platform organizes 16 verified academic resources into two clear priorities:

### Priority 1: Official Club Google Drive Resources (10 Repositories)
#### Autonomous Scheme
1. **C Cycle (Autonomous)**: `https://drive.google.com/drive/folders/1DKPhWVLe8I7o_SbA2QeJ5pA3c0zOM7e?usp=sharing`
2. **P Cycle (Autonomous)**: `https://drive.google.com/drive/folders/1JHo8uPNaLhsA0UkckpxyCUEqUyVHQNne?usp=sharing`
3. **3rd Semester (Autonomous)**: `https://drive.google.com/drive/folders/12EzrbLaV5KSqzZLkaK_BDmwJI6oWx1ZT?usp=sharing`

#### VTU Scheme
4. **C Cycle (VTU)**: `https://drive.google.com/drive/folders/1S9d5e4j8_8FgRng6CspTZ05jNJoiXso7?usp=sharing`
5. **P Cycle (VTU)**: `https://drive.google.com/drive/folders/1FciRg9oqHptrkeNpJefZZ-nsmJLVn5nn?usp=sharing`
6. **3rd Semester (VTU)**: `https://drive.google.com/drive/folders/1ChizQVDfIYL6qVlBDLge45ClAMGAQBx?usp=sharing`
7. **4th Semester (VTU)**: `https://drive.google.com/drive/folders/1trUoWQUW4XoX_oXt4X5pZ0q9loEPzVYF?usp=sharing`
8. **5th Semester (VTU)**: `https://drive.google.com/drive/folders/17ZZS_w1oVSm5Bz3yGDyYT_U6oegbHE05?usp=sharing`
9. **6th Semester (VTU)**: `https://drive.google.com/drive/folders/1bEB2JrfuDoH3YiUvZn7tx9zHgrNSi-ca?usp=sharing`
10. **7th Semester (VTU)**: `https://drive.google.com/drive/folders/1ODRE1J8RSteZxF1mzESfWDnFl6PoALTs?usp=sharing`

### Priority 2: External Academic Resources & Tools (6 References)
11. **5th Semester Resources (VTU Circle)**: `https://vtucircle.com/5th-semester-2022-scheme-cse-ise/`
12. **7th Semester Resources (VTU Circle)**: `https://vtucircle.com/7th-semester-2022-scheme-cse-ise/`
13. **VTU Official Syllabus Repository**: `https://vtucircle.com/vtu-syllabus/`
14. **Previous-Year Question Papers (VTU)**: `https://vtucircle.com/vtu-question-paper/`
15. **VTU SGPA Calculator**: `https://vtucircle.com/vtu-sgpa-calculator/`
16. **VTU CGPA Calculator**: `https://vtucircle.com/vtu-cgpa-calculator/`

---

## 4. Technology Stack & Design System

- **Backend Architecture**: Node.js v22+, TypeScript, Express.js (v5)
- **Security**: Strict URL Allowlisting (`drive.google.com`, `vtucircle.com`), Helmet Content Security Policy, CORS
- **Design Aesthetic**: Monad Editorial Technology Aesthetic:
  - Page Canvas: Warm Parchment `#f6f3f1`
  - Typography: Monospace UI (JetBrains Mono / Diatype Mono) paired with Editorial Serif (Newsreader / Untitled Serif) locked at weight 400
  - Signature Action Accent: Lake Blue `#2b59d1` pill buttons with trailing glyphs (`▸`)
  - Atmospheric Gradient Washes: Coral, Sky Blue, Mint
  - Border Style: Hairline 1px solid Ash `#cecac8`, 40px rounded cards, 100px pill buttons

---

## 5. API Reference

### Endpoints

| Method | Endpoint | Description | Query Parameters |
|--------|----------|-------------|------------------|
| `GET` | `/api/health` | System health, service status, resource balance metrics | None |
| `GET` | `/api/resources` | Returns active resources list | `scheme`, `semester`, `category`, `search`, `page`, `limit` |
| `GET` | `/api/resources/:id` | Returns single resource by ID or slug | `id` (path param) |
| `GET` | `/api/resource-categories` | Supported categories with descriptions | None |
| `GET` | `/api/academic-structure` | Schemes, semesters, and live counts | None |
| `GET` | `/api/brand` | Brand config with institutional logos and titles | None |

---

## 6. Development & Deployment Guide

### Prerequisites
- Node.js `v18+` (Tested on `v22.14.0`)
- npm `v9+` (Tested on `v11.16.0`)

### Installation
```bash
npm install
```

### Running Development Server
```bash
npm run dev
```

### Running Test Verification Suite
```bash
npm test
```
The test suite executes 18 automated unit and integration tests verifying:
- Complete 16 resource count integrity (10 Google Drive + 6 External)
- Exact URL character-for-character verification
- HTTPS and domain allowlist enforcement
- Full-text search and scheme/semester filtering
- Academic structure and brand hierarchy configuration

### Production Build & Run
```bash
npm run build
npm start
```
The server will start on port `3000` (or `PORT` defined in `.env`).

---

## 7. Managing & Updating Resource Links

All resources are configured in a single canonical source of truth:
`src/data/resources.data.ts`

### Safe Link Update Procedure
1. Open `src/data/resources.data.ts`.
2. Locate the resource by `id` (e.g., `res-auto-3rd-sem`).
3. Replace the `url` property with the updated Google Drive URL.
4. Verify that the URL is an HTTPS Google Drive link (`https://drive.google.com/drive/folders/...`).
5. Run `npm test` to verify link validity and schema compliance.
6. Run `npm run build` to recompile into `dist/`.
