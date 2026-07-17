# Mirakl Hierarchy Validator  
A browser‑based validation tool for Mirakl Category Hierarchy import files.  
Designed to prevent malformed hierarchy imports, detect CSV corruption, and ensure clean data before uploading to Mirakl.

Hosted via GitHub Pages — no installation required.

---

## 📌 Current Version  
**v1.2.0 — UI Modernisation Release (Pre‑Release)**  
Previous stable: **v1.1.0 — Hardening Release**

---

# 1. Overview

The **Mirakl Hierarchy Validator** checks hierarchy CSV files prior to import into Mirakl.  
It was created to solve recurring issues during category onboarding, including:

- Excel‑induced CSV corruption  
- Invalid parent/child relationships  
- Circular references  
- Unsafe HTML or formula injection  
- Incorrect hierarchy depth  
- Unexpected Mirakl import behaviour  

The validator is implemented as a static HTML/CSS/JavaScript application and deployed through GitHub Pages.

The **v1.2.0 UI Refresh** introduces a modern, component‑based interface with:

- Drag‑and‑drop upload  
- File information panel  
- Validation summary banner  
- Statistics cards  
- Categorized collapsible error viewer  
- Responsive two‑panel layout  
- Modular ES‑module architecture  

---

# 2. Supported Mirakl Fields

The validator expects the standard Mirakl hierarchy structure:

- `hierarchy-code`  
- `hierarchy-label`  
- `hierarchy-parent-code`

Booker Marketplace uses **three levels only**:

- L1  
- L2  
- L3  

Source taxonomies (e.g., Shopify) may contain deeper levels (L4–L8).  
These must be truncated before import.

---

# 3. Major Issues Solved

### ✔ Excel CSV Corruption  
Excel wraps rows containing commas in quotes, causing Mirakl to interpret the entire row as a single field.

Example:

"aa-4;Handbags, Wallets & Cases;aa"


This caused malformed imports and incorrect root category creation.

**Solution:**  
Files must be UTF‑8, semicolon‑delimited, and saved using VS Code — not Excel.

---

# 4. Mirakl API Workflow (Bruno)

The project uses Bruno collections for:

### **H01 — Import Hierarchy**  
Uploads the CSV file and returns an import ID.

### **H02 — Get Import Status**  
Checks whether the import is pending, running, complete, or failed.

### **H03 — Download Error Report**  
Retrieves row‑level validation errors from Mirakl.

**Important:**  
Runtime variables (`bru.setVar`, `bru.getVar`) work reliably.  
Environment variables require an active environment.

---

# 5. Version 1.1 — Hardening Release

The v1.1 release focused on security, stability, and data integrity.

### ✔ Safe DOM Rendering  
No HTML is ever injected into the DOM.

### ✔ HTML Tag Detection  
Rejects files containing `<script>`, `<img>`, `<iframe>`, `<object>`, etc.

### ✔ CSV Formula Injection Protection  
Rejects fields beginning with `=`, `+`, `-`, `@`.

### ✔ File Size Validation  
Maximum file size: **10 MB**

### ✔ Self‑Referencing Parent Detection  
Rejects rows where a category is its own parent.

### ✔ Circular Hierarchy Detection  
Detects loops such as A → B → A.

### ✔ Duplicate Hierarchy Detection  
Ensures no duplicate hierarchy codes exist.

### ✔ Parent Existence Validation  
Ensures all parent codes exist in the file.

### ✔ Validation Dashboard  
Displays file name, rows checked, and error count.

---

# 6. Version 1.2 — UI Modernisation Release

The v1.2 release introduces a complete UI overhaul and a modular ES‑module architecture.

### ✔ Drag‑and‑Drop Upload Zone  
Modern file input with highlight states.

### ✔ File Information Panel  
Displays filename, size, row count, header validity, and timestamp.

### ✔ Validation Summary Banner  
High‑visibility pass/fail indicator with contextual messaging.

### ✔ Statistics Cards  
Shows total rows, valid rows, invalid rows, duplicates, missing parents, and circular references.

### ✔ Categorized Error Viewer  
Errors are grouped into collapsible categories:

- Header Errors  
- Column Structure Errors  
- HTML Tag Errors  
- Formula Injection Errors  
- Self‑Reference Errors  
- Blank Field Errors  
- Duplicate Code Errors  
- Missing Parent Errors  
- Circular Reference Errors  

### ✔ Two‑Panel Layout  
Left panel: upload, metadata, summary, stats  
Right panel: categorized errors

### ✔ Modular Component Architecture  
New `/components` directory:

- `dropzone.js`  
- `filePanel.js`  
- `summary.js`  
- `cards.js`  
- `errorCategories.js`

### ✔ Async Validation Pipeline  
File reading → metadata → validation → summary → stats → categories.

---

# 7. Current Security Posture

The validator includes:

- Safe DOM rendering  
- HTML injection protection  
- Formula injection protection  
- File size limits  
- Duplicate detection  
- Parent validation  
- Circular reference detection  
- CSV corruption detection  

**Risk Level:** Low  
(for a static browser‑based validator)

---

# 8. Future Roadmap

### v1.3  
Exportable validation reports (CSV/HTML)

### v1.4  
Mirakl Attribute Validator

### v1.5  
Mirakl Value Validator

### v2.0  
Full Mirakl Import Validation Suite  
(categories, attributes, values, shipping templates, carriers, payment methods)

---

# 9. Lessons Learned

### Bruno  
Use runtime variables.  
Avoid environment variables unless an environment is selected.

### Excel  
Do not trust Excel CSV UTF‑8 (Comma Delimited).  
Always inspect output.

### Mirakl  
A “successful” import does not guarantee valid data.  
Pre‑validation is essential.

---

# 10. Development Workflow

This project uses a structured branching model to keep production stable while allowing active development on upcoming versions.

### Branches

- **main**  
  Stable production branch. GitHub Pages deploys from this branch.

- **pre-release/<version>**  
  Staging branch for upcoming versions (e.g., `pre-release/1.2.0`).  
  GitHub Actions deploys this branch to a separate pre-release Pages environment.

- **feature/<version>-<feature-name>**  
  Individual feature branches created from the pre-release branch.  
  Each feature is merged into the corresponding pre-release branch via pull request.

### Deployment

- **Production site**  
  Automatically deployed from `main`.

- **Pre-release site**  
  Automatically deployed from `pre-release/<version>`.

### Release Process

1. Develop features in `feature/<version>-*` branches.  
2. Merge features into `pre-release/<version>`.  
3. Pre-release builds deploy automatically.  
4. Merge `pre-release/<version>` into `main`.  
5. Tag the release (e.g., `v1.2.0`).  
6. GitHub Pages updates the production site.

---

# 11. Repository Structure

mirakl-validator/
│
├── README.md
├── index.html
├── style.css
├── validator.js
└── components/
├── dropzone.js
├── filePanel.js
├── summary.js
├── cards.js
└── errorCategories.js

---

# 12. Contributor Restart Guide

If starting fresh, the key context is:

- Project: Mirakl Hierarchy Validator  
- Current Version: v1.2.0 (pre-release)  
- Active Branch: `pre-release/1.2.0`  
- Feature Branches: `feature/1.2.5-*`  
- Architecture: modular ES‑modules  
- UI: two‑panel layout with summary, stats, and categorized errors  

This README provides everything needed to continue development.

