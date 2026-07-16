# Mirakl Hierarchy Validator

A browser‑based validation tool for Mirakl Category Hierarchy import files.  
Designed to prevent malformed hierarchy imports, detect CSV corruption, and ensure clean data before uploading to Mirakl.

Hosted via GitHub Pages — no installation required.

---

## 📌 Current Version  
**v1.1.0 — Hardening Release (Live)**

---

# 1. Overview

The Mirakl Hierarchy Validator checks hierarchy CSV files prior to import into Mirakl.  
It was created to solve recurring issues during category onboarding, including:

- Excel‑induced CSV corruption  
- Invalid parent/child relationships  
- Circular references  
- Unsafe HTML or formula injection  
- Incorrect hierarchy depth  
- Unexpected Mirakl import behaviour  

The validator is implemented as a static HTML/CSS/JavaScript application and deployed through GitHub Pages.

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
Prevents XSS and script execution.

### ✔ HTML Tag Detection  
Rejects files containing:

- `<script>`
- `<img>`
- `<iframe>`
- `<object>`
- Any embedded HTML

### ✔ CSV Formula Injection Protection  
Rejects fields beginning with:

- `=`
- `+`
- `-`
- `@`

Prevents spreadsheet formula execution.

### ✔ File Size Validation  
Maximum file size: **10 MB**  
Improves browser stability and prevents accidental large uploads.

### ✔ Self‑Referencing Parent Detection  
Rejects rows where a category is its own parent.

### ✔ Circular Hierarchy Detection  
Detects loops such as:

- A → B → A  
- A → B → C → A  

### ✔ Duplicate Hierarchy Detection  
Ensures no duplicate hierarchy codes exist.

### ✔ Parent Existence Validation  
Ensures all parent codes exist in the file.

### ✔ Validation Dashboard  
Displays:

- File name  
- Rows checked  
- Error count  

---

# 6. Current Security Posture

The validator now includes:

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

# 7. Upcoming Release — v1.2 UI Refresh

The next version focuses on modernising the interface.

### Planned Features

- Drag‑and‑drop upload zone  
- File information panel  
- Statistics cards  
- Dashboard layout  
- Responsive design  
- Fluent/Azure‑style UI  
- Optional dark mode  

Development branch:

feature/1.2-ui-refresh


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

## Development & Release Workflow

This project uses a structured branching model to keep production stable while allowing active development on upcoming versions.

### Branches

- **main**  
  Stable production branch. GitHub Pages deploys from this branch.

- **pre-release/<version>**  
  Staging branch for upcoming versions (e.g., `pre-release/1.2`).  
  GitHub Actions deploys this branch to a separate pre-release Pages environment.

- **feature/<version>-<feature-name>**  
  Individual feature branches created from the pre-release branch.  
  Each feature is merged into the corresponding pre-release branch via pull request.

### Deployment

- **Production site**  
  Automatically deployed from `main` via GitHub Pages.

- **Pre-release site**  
  Automatically deployed from `pre-release/<version>` using GitHub Actions  
  (`.github/workflows/pre-release.yml`).

### Release Process

1. Develop features in `feature/<version>-*` branches.  
2. Merge features into `pre-release/<version>`.  
3. Pre-release builds are deployed automatically.  
4. When the version is complete, merge `pre-release/<version>` into `main`.  
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


This will expand during v1.2 to include UI components.

---

# 12. Restart Instructions for New Contributors

If starting fresh, the key context is:

- Project: Mirakl Hierarchy Validator  
- Current Version: v1.1.0  
- Next Branch: feature/1.2-ui-refresh  
- Completed Work: full security hardening  
- Next Objective: modern UI redesign  

This README provides everything needed to continue development.

