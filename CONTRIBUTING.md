# Contributing to Mirakl Hierarchy Validator

Thank you for your interest in contributing to the **Mirakl Hierarchy Validator**.  
This project powers safe, reliable validation for Mirakl hierarchy imports and is actively evolving through the v1.2 UI Modernisation release.

This guide explains how to contribute, how the project is structured, and how to work effectively within the branching and release workflow.

---

# 1. Code of Conduct

By participating in this project, you agree to uphold a respectful, constructive, and inclusive environment.

---

# 2. How to Contribute

There are several ways to contribute:

- Fix bugs  
- Improve UI components  
- Add new validation rules  
- Enhance documentation  
- Improve accessibility  
- Add new features (attributes, values, etc.)  
- Refactor or modernise existing code  

All contributions must follow the branching model described below.

---

# 3. Branching Model

This project uses a structured branching model to keep production stable while allowing active development.

### **main**
- Stable production branch  
- GitHub Pages deploys from this branch  
- Only merge into `main` when a version is fully complete

### **pre-release/<version>**
- Staging branch for upcoming versions  
- Example: `pre-release/1.2.0`  
- GitHub Actions deploys this branch to a pre-release environment  
- All feature branches merge into this branch

### **feature/<version>-<feature-name>**
- Individual feature branches  
- Created from the corresponding `pre-release/<version>` branch  
- Example:  
  - `feature/1.2.5-Validation-Summary`  
  - `feature/1.2.6-Error-Categories`

### **Release Workflow**
1. Create a feature branch from `pre-release/<version>`.  
2. Implement changes.  
3. Submit a pull request into `pre-release/<version>`.  
4. Pre-release build deploys automatically.  
5. When the version is complete, merge `pre-release/<version>` into `main`.  
6. Tag the release (e.g., `v1.2.0`).  
7. GitHub Pages updates the production site.

---

# 4. Project Structure

mirakl-validator/
│
├── README.md
├── CHANGELOG.md
├── CONTRIBUTING.md
├── index.html
├── style.css
├── validator.js
└── components/
├── dropzone.js
├── filePanel.js
├── summary.js
├── cards.js
└── errorCategories.js


### Component Responsibilities

| Component | Purpose |
|----------|---------|
| `dropzone.js` | Drag‑and‑drop upload logic |
| `filePanel.js` | File metadata rendering |
| `summary.js` | Pass/fail summary banner |
| `cards.js` | Validation statistics cards |
| `errorCategories.js` | Collapsible categorized error viewer |
| `validator.js` | Core validation engine |

---

# 5. Development Setup

This project is intentionally lightweight — no build tools, no bundlers, no frameworks.

### Requirements
- A modern browser (Chrome, Edge, Firefox, Safari)
- A text editor (VS Code recommended)
- Git

### Running Locally
Simply open `index.html` in your browser.  
No server required.

### Recommended VS Code Extensions
- ESLint  
- Prettier  
- Live Server (optional)

---

# 6. Coding Standards

### General
- Use **ES modules** (`import` / `export`)  
- Use **semantic HTML** (`<main>`, `<section>`, `<article>`)  
- Use **strict DOM safety** (never use `innerHTML` with uploaded content)  
- Use **best‑practice comments** explaining intent, not just behaviour  
- Keep functions small and single‑responsibility  
- Prefer pure functions where possible  
- Avoid global state

### JavaScript Style
- Use `const` and `let` (never `var`)  
- Use arrow functions for callbacks  
- Use descriptive variable names  
- Avoid deeply nested logic  
- Prefer early returns  
- Keep UI rendering separate from validation logic

### CSS Style
- Use CSS variables for colours, spacing, and shadows  
- Keep layout responsive  
- Avoid inline styles  
- Group related styles together  
- Use BEM‑style naming where appropriate

---

# 7. Validation Engine Guidelines

When adding or modifying validation rules:

- All errors must be categorized  
- Each category must map to a collapsible section  
- Error messages must be clear, consistent, and user‑friendly  
- No HTML from uploaded files may ever be injected into the DOM  
- All validation must be deterministic and reproducible  
- Avoid expensive operations on large files (10MB limit)

---

# 8. UI Component Guidelines

When adding new UI components:

- Place them in `/components`  
- Export a single render function  
- Keep DOM manipulation isolated to that component  
- Use semantic HTML elements  
- Add comments explaining structure and purpose  
- Ensure accessibility (keyboard focus, ARIA roles where needed)

---

# 9. Pull Request Requirements

All PRs must include:

- A clear description of the change  
- Screenshots for UI changes  
- Inline comments for new logic  
- Updates to `CHANGELOG.md`  
- Updates to `README.md` if relevant  
- Confirmation that the feature branch is based on the correct `pre-release/<version>` branch

PRs will not be merged if:

- They introduce unsafe DOM rendering  
- They mix unrelated features  
- They lack documentation  
- They break the UI layout  
- They bypass the branching model

---

# 10. Testing Guidelines

This project does not yet include automated tests.  
Manual testing is required:

### Test Cases
- Valid hierarchy file  
- Missing header  
- Incorrect header  
- Extra columns  
- Missing parent  
- Duplicate codes  
- Circular references  
- HTML injection  
- Formula injection  
- Empty file  
- Large file (10MB limit)

### UI Tests
- Drag‑and‑drop behaviour  
- Summary banner accuracy  
- Stats panel accuracy  
- Collapsible error categories  
- Responsive layout  
- Accessibility (keyboard navigation)

---

# 11. Release Checklist

Before merging into `main`:

- All features merged into `pre-release/<version>`  
- README updated  
- CHANGELOG updated  
- CONTRIBUTING updated  
- Manual testing complete  
- Version tagged  
- GitHub Pages deployment verified

---

# 12. Questions & Support

If you have questions, suggestions, or need guidance, please open:

- A GitHub Issue  
- A GitHub Discussion  
- Or a Draft Pull Request

We welcome contributions of all sizes.

---

Thank you for helping improve the Mirakl Hierarchy Validator!
