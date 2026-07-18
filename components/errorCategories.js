//
// errorCategories.js
// Renders categorized validation errors into collapsible sections.
// Each category is independently expandable/collapsible.
// This improves readability for large files and complex error sets.
//

// Icon mapping for each category
const CATEGORY_ICONS ={
  header: "🧩",
  columns: "📐",
  html: "🔧",
  formula: "⚠️",
  selfReference: "🔁",
  blankFields: "⬜",
  duplicates: "♻️",
  missingParents: "🏷️",
  circular: "🔄"
};

// Severity mapping for badges
const CATEGORY_SEVERITY = {
    header: "critical",
    columns: "critical",
    html: "critical",
    formula: "critical",
    selfReference: "critical",
    blankFields: "warning",
    duplicates: "warning",
    missingParents: "critical",
    circular: "critical"
};

export function renderErrorCategories(categories, hasFile) {
    const container = document.getElementById("results");

    container.innerHTML = "";

    // Render each category block
    Object.entries(categories).forEach(([categoryName, errors], index) => {
        // Skip categories with no errors
        if (errors.length === 0) return;

        // Wrapper for each category
        const categoryBlock = document.createElement("div");
        categoryBlock.className = "category-block";

        // Sticky Header container
        const header = document.createElement("div");
        header.className = "category-header sticky";
        header.setAttribute("role", "button");
        header.setAttribute("tabindex", "0")
        header.setAttribute("aria-expanded", "true");

        // Icon + label
        const icon = CATEGORY_ICONS[categoryName] || "📁";
        const label = formatCategoryName(categoryName);

        // Severity Badge
        const severity = CATEGORY_SEVERITY[categoryName];
        const badge = document.createElement("span");
        badge.className = `severity-badge severity-${severity}`;
        badge.textContent = severity.toUpperCase();

        header.innerHTML = `
            <span class="category-icon">${icon}</span>
            <span class="category-title">${label} (${errors.length})</span>
        `;

        header.appendChild(badge);

        // Collaspable body
        const body = document.createElement("div");
        body.className = "category-body expanded";

        // Populate error items
        errors.forEach((err, i) => {
            const item = document.createElement("div");
            item.className = "error-item fade-in";
            item.style.animationDelay = `${i * 40}ms`
            item.textContent = err;
            body.appendChild(item);
        });

        // Toggle collapse on header click
        header.addEventListener("click", () => {
            const isCollapsed = body.classList.toggle("collapsed");
            header.setAttribute("aria-expanded", !isCollapsed);
        });

        // Keyboard accessibility
        header.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                header.click();
            }
        });

        categoryBlock.appendChild(header);
        categoryBlock.appendChild(body);
        container.appendChild(categoryBlock);
    });

    // Toolbar controls
    setupToolbarControls();
}

//
// Converts internal category keys into human-readable labels.
//

function formatCategoryName(key) {
    const map = {
        header: "Header Errors",
        columns: "Column Structure Errors",
        html: "HTML Tag Errors",
        formula: "Formula Injection Errors",
        selfReference: "Self-Reference Errors",
        blankFields: "Balnk Field Errors",
        duplicates: "Duplicate Code Errors",
        missingParents: "Missing Parent Errors",
        circular: "Circular Reference Errors"
    };

    return map[key] || key;
}

//
// Expand All / Collapse All toolbar
//

function setupToolbarControls() {
    const expandBtn = document.getElementById("expand-all");
    const collapseBtn = document.getElementById("collapse-all");

    expandBtn.addEventListener("click", () => {
        document.querySelectorAll(".category-body").forEach((body) => {
            body.classList.remove("collapsed");
        });
        document.querySelectorAll(".category-header").forEach((header) => {
            header.setAttribute("aria-expanded", "true");
        });
    });

    collapseBtn.addEventListener("click", () => {
        document.querySelectorAll(".category-body").forEach((body) => {
            body.classList.add("collapsed");
        });
        document.querySelectorAll(".category-header").forEach((header) => {
            header.setAttribute("aria-expanded", "false");
        });
    });
}