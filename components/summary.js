//
// summary.js
// Renders the high‑level validation summary banner.
// This component provides immediate pass/fail feedback
// before the user reads detailed stats or errors.
//

export function renderSummary(result) {
    const banner = document.getElementById("summary-banner");
    const placeholder = document.getElementById("summary-placeholder");

    // If no result was returned (e.g., file too large), clear banner
    if (!result) {
        banner.style.display = "block"
        placeholder.style.display = "block"
        banner.innerHTML = "";
        banner.appendChild(placeholder);
        return;
    }

    const {passed, stats} = result;
    banner.style.display = "block";


    const statusText = passed ? "Validation Passed" : "Validation Failed";
    const description = passed ? "Your file meets all structural requirements and is ready for upload." : "Issues were detected in the file. Review the details below.";

    // Render banner with contextual styling
    banner.innerHTML = `
    <div class="summary-banner-inner ${passed ? "summary-success" : "summary-error"}">
        <div class="summary-main">
            <h2>${statusText}</h2>
            <p>${description}</p>
        </div>
        <div class="summary-meta">
            <span>Total rows: ${stats.totalRows}</span>
            <span>Invalid rows: ${stats.invalidRows}</span>
        </div>
    </div>
    `;
}