# Changelog
All notable changes to this project will be documented in this file.

The format is based on **Keep a Changelog**  
and this project adheres to **Semantic Versioning**.

---

## [1.2.0] - (Unreleased)
### Added
- 2026-07-16: Introduced initial UI skeleton for v1.2 including dashboard layout, header, and component placeholders.
- 2026-07-16: Pre-release Github Pages deployment workflow
- 2026-07-16: README documentation for branching and release process
- 2026-07-16: - File Info Panel showing filename, size, row count, and header status.
- 2026-07-17: Modular drag-and-drop upload component.
- 2026-07-17: Modular file information panel with adaptive file size formatting.
- 2026-07-17: Semantic HTML5 layout structure (<main>, <section>, <article>).

### Changed
- 2026-07-17: Updated UI styling for header, panels, spacing, and background contrast.
- 2026-07-17: Converted validator.js and UI scripts to ES module architecture.
- 2026-07-17: Improved drag-over highlight behaviour and accessibility.
- 2026-07-17: Refactored upload flow to use component-based orchestration.

### Planned
- 2026-07-16: Drag-and-drop upload component with unified validation entry point.
- 2026-07-16: Improved drag-over styling for clearer visual feedback.
- Planned UI refresh including:
  - Statistics cards (Rows Checked, Errors, Warnings)
  - Modern dashboard layout
  - Fluent/Azure-inspired styling
  - Optional dark mode support

### Notes
Development for this version will occur on branch:

feature/1.2-ui-refresh

---

## [1.1.0] - 2026-07-15
### Added
- **Safe DOM Rendering**
  - Removed all HTML injection points
  - Ensured all uploaded content is rendered as plain text

- **HTML Tag Detection**
  - Validation rejects files containing `<script>`, `<img>`, `<iframe>`, `<object>`, or embedded HTML

- **CSV Formula Injection Protection**
  - Rejects fields beginning with `=`, `+`, `-`, or `@`
  - Prevents spreadsheet formula execution

- **File Size Validation**
  - Maximum upload size set to **10 MB**

- **Self-Referencing Parent Detection**
  - Rejects rows where a category is its own parent

- **Circular Hierarchy Detection**
  - Detects loops such as A → B → A or A → B → C → A

- **Duplicate Hierarchy Detection**
  - Ensures no duplicate hierarchy codes exist

- **Parent Existence Validation**
  - Ensures all parent codes exist in the file

- **CSV Corruption Detection**
  - Detects Excel-induced quoting issues caused by commas in labels

- **Validation Dashboard**
  - Added summary showing file name, rows checked, and error count

### Changed
- Improved internal validation structure for future extensibility

### Fixed
- Runtime variable handling in Bruno API workflow
- Issues caused by Excel CSV UTF-8 (Comma Delimited) exports

---

## [1.0.0] - Initial Release
### Added
- Basic CSV upload
- Header validation
- Parent existence validation
- Duplicate hierarchy detection
- Initial GitHub Pages deployment
