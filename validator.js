const EXPECTED_HEADER =
    "hierarchy-code;hierarchy-label;hierarchy-parent-code";

document
    .getElementById("validateButton")
    .addEventListener("click", validateFile);

function validateFile() {

    const file =
        document.getElementById("fileInput").files[0];

    if (!file) {
        alert("Please select a CSV file.");
        return;
    }

    const reader = new FileReader();

    reader.onload = function (event) {

        const content = event.target.result;

        runValidation(content);
    };

    reader.readAsText(file, "UTF-8");
}

function runValidation(content) {

    const lines = content
        .replace(/\r/g, "")
        .split("\n")
        .filter(line => line.trim() !== "");

    const errors = [];

    if (lines.length === 0) {
        errors.push("File is empty.");
        renderResults(errors);
        return;
    }

    if (lines[0].trim() !== EXPECTED_HEADER) {

        errors.push(
            `Invalid header.
Expected:
${EXPECTED_HEADER}

Found:
${lines[0]}`
        );
    }

    const hierarchyCodes = new Set();

    const parentChecks = [];

    for (let i = 1; i < lines.length; i++) {

        const lineNumber = i + 1;

        const line = lines[i];

        if (
            line.startsWith('"') &&
            line.endsWith('"')
        ) {
            errors.push(
                `Line ${lineNumber}: Entire row wrapped in quotes.`
            );
        }

        const columns = line.split(";");

        if (columns.length !== 3) {

            errors.push(
                `Line ${lineNumber}: Expected 3 columns, found ${columns.length}.`
            );

            continue;
        }

        const code = columns[0].trim();
        const label = columns[1].trim();
        const parent = columns[2].trim();

        if (!code) {

            errors.push(
                `Line ${lineNumber}: hierarchy-code is blank.`
            );
        }

        if (!label) {

            errors.push(
                `Line ${lineNumber}: hierarchy-label is blank.`
            );
        }

        if (hierarchyCodes.has(code)) {

            errors.push(
                `Line ${lineNumber}: Duplicate hierarchy-code '${code}'.`
            );
        }

        hierarchyCodes.add(code);

        parentChecks.push({
            lineNumber,
            code,
            parent
        });
    }

    parentChecks.forEach(item => {

        if (
            item.parent &&
            !hierarchyCodes.has(item.parent)
        ) {

            errors.push(
                `Line ${item.lineNumber}: Parent '${item.parent}' does not exist for hierarchy-code '${item.code}'.`
            );
        }
    });

    renderResults(errors);
}

function renderResults(errors) {

    const results =
        document.getElementById("results");

    if (errors.length === 0) {

        results.innerHTML = `
            <h2 class="success">
                ✅ Validation Passed
            </h2>

            <p>
                File is safe to upload to Mirakl.
            </p>
        `;

        return;
    }

    let html = `
        <h2 class="error">
            ❌ Validation Failed
        </h2>
    `;

    errors.forEach(error => {

        html += `
            <div class="error-item">
                ${error}
            </div>
        `;
    });

    results.innerHTML = html;
}