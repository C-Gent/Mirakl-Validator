//
// errorCategories.js
// Renders categorized validation errors into collapsible sections.
// Each category is independently expandable/collapsible.
// This improves readability for large files and complex error sets.
//

export function renderErrorCategories(categories) {
    const container = document.getElementById("results");

    // Clear previous results before rendering new ones
    container.replaceChildren();

    // Count total errors across all categories
    const totalErrors = Object.values(categories).reduce((sum, arr) => sum + arr.length, 0);

    // If no errors exist, show a simple success message
    if (totalErrors === 0) {
        const successHeading = document.createElement("h2");
        successHeading.className = "success";
        successHeading.textContent = "No validation errors detected.";
        container.appendChild(successHeading);
        return;
    }

    // Render each category block
    Object.entries(categories).forEach(([categoryName, errors]) => {
        // Skip categories with no errors
        if (errors.length === 0) return;

        // Wrapper for each category
        const categoryBlock = document.createElement("div");
        categoryBlock.className = "category-block";

        // Clickable header
        const header = document.createElement("div");
        header.className = "category-header";
        header.textContent = `${formatCategoryName(categoryName)} (${errors.length})`;

        // Collaspable body
        const body = document.createElement("div");
        body.className = "category-body";

        // Populate error items
        errors.forEach((err) => {
            const item = document.createElement("div");
            item.className = "error-item";
            item.textContent = err;
            body.appendChild(item);
        });

        // Toggle collapse on header click
        header.addEventListener("click", () => {
            body.classList.toggle("collapsed");
        });

        categoryBlock.appendChild(header);
        categoryBlock.appendChild(body);
        container.appendChild(categoryBlock);
    });
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