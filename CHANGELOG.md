# Changelog

All notable changes to this project will be documented in this file.

The format is based on **Keep a Changelog**  
and this project adheres to **Semantic Versioning**.

---

## [1.2.0] - (Unreleased)

### Added

- 2026-07-16: Introduced initial UI skeleton for v1.2 including dashboard layout, header, and component placeholders.
- 2026-07-16: Pre-release GitHub Pages deployment workflow.
- 2026-07-16: README documentation for branching and release process.
- 2026-07-16: File Info Panel showing filename, size, row count, and header status.
- 2026-07-17: Modular drag-and-drop upload component.
- 2026-07-17: Modular file information panel with adaptive file size formatting.
- 2026-07-17: Semantic HTML5 layout structure (`<main>`, `<section>`, `<article>`).
- 2026-07-17: Validation Stats Panel showing key metrics (total rows, valid rows, invalid rows, duplicates, missing parents, circular references).
- 2026-07-17: New `cards.js` component for modular stats rendering.
- 2026-07-17: Validation Summary Banner providing immediate pass/fail status.
- 2026-07-17: New `summary.js` component for modular summary rendering.
- 2026-07-17: Categorized error viewer with collapsible sections.
- 2026-07-17: New `errorCategories.js` component for rendering grouped validation errors.

### Changed

- 2026-07-17: Updated UI styling for header, panels, spacing, and background contrast.
- 2026-07-17: Converted validator.js and UI scripts to ES module architecture.
- 2026-07-17: Improved drag-over highlight behaviour and accessibility.
- 2026-07-17: Refactored upload flow to use component-based orchestration.
- 2026-07-17: Updated validator.js to expose structured validation statistics.
- 2026-07-17: Updated UI layout to integrate stats panel under file information.
- 2026-07-17: Refactored validator.js to return structured validation statistics.
- 2026-07-17: Updated `validateUploadedFile()` to use async Promise-based workflow.
- 2026-07-17: Updated ui.js to await stats and render the stats panel.
- 2026-07-17: Cleaned and modernised validation engine for clarity and maintainability.
- 2026-07-17: Updated validator.js to return a pass/fail flag alongside stats.
- 2026-07-17: Updated ui.js to render the summary banner before stats.
- 2026-07-17: Improved UI flow by visually grouping summary and stats in the left panel.
- 2026-07-17: Refined Validation Summary Banner copy for clarity and professionalism.
- 2026-07-17: Added best-practice inline comments across summary.js, ui.js, and validator.js.
- 2026-07-17: Improved contributor readability and onboarding for validation components.
- 2026-07-17: Updated validator.js to return categorized error structures.
- 2026-07-17: Updated UI to display grouped errors instead of a flat list.
- 2026-07-17: Improved right-panel layout and readability for complex validation output.

### Planned

- Planned UI refresh including:
  - Modern dashboard layout
  - Fluent/Azure-inspired styling
  - Optional dark mode support

### Notes

Development for this version will occur on branch:

`pre-release/1.2.0`

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