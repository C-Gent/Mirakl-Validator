const EXPECTED_HEADER = "hierarchy-code;hierarchy-label;hierarchy-parent-code";

document
  .getElementById("validateButton")
  .addEventListener("click", validateFile);

function formatFileSize(bytes) {
  return (bytes / 1024 / 1024).toFixed(2);
}

function validateFile() {
  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
  const file = document.getElementById("fileInput").files[0];

  if (file.size > MAX_FILE_SIZE) {
    alert(`File Size ${formatFileSize(file.size)} MB exceeds 10MB limit`);

    return;
  }

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
    .filter((line) => line.trim() !== "");

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
${lines[0]}`,
    );
  }

  const hierarchyCodes = new Set();

  const parentChecks = [];

  for (let i = 1; i < lines.length; i++) {
    const lineNumber = i + 1;

    const line = lines[i];

    if (line.startsWith('"') && line.endsWith('"')) {
      errors.push(`Line ${lineNumber}: Entire row wrapped in quotes.`);
    }

    const columns = line.split(";");

    if (columns.length !== 3) {
      errors.push(
        `Line ${lineNumber}: Expected 3 columns, found ${columns.length}.`,
      );

      continue;
    }

    const code = columns[0].trim();
    const label = columns[1].trim();
    const parent = columns[2].trim();

    // Detect HTML Tags

    const htmlTagPattern = /<[^>]+>/;

    if (htmlTagPattern.test(code)) {
      errors.push(`Line ${lineNumber}: HTML tags detected in hierarchy-code.`);
    }

    if (htmlTagPattern.test(label)) {
      errors.push(`Line ${lineNumber}: HTML tags detected in hierarchy-label.`);
    }

    if (htmlTagPattern.test(parent)) {
      errors.push(
        `Line ${lineNumber}: HTML tags detected in hierarchy-parent-code.`,
      );
    }

    // Detect possible CSV Formula Injection

    const dangerousPrefixes = ["=", "+", "-", "@"];

    function containsFormulaInjection(value) {
      return dangerousPrefixes.some((prefix) => value.startsWith(prefix));
    }

    if (containsFormulaInjection(code)) {
      errors.push(
        `Line ${lineNumber}: Possible CSV formula injection detected in hierarchy-code.`,
      );
    }

    if (containsFormulaInjection(label)) {
      errors.push(
        `Line ${lineNumber}: Possible CSV formula injection detected in hierarchy-parent-code.`,
      );
    }

    if (containsFormulaInjection(parent)) {
      errors.push(
        `Line ${lineNumber}: Possible CSV formula injection detected in hierarchy-parent-code.`,
      );
    }

    if (!code) {
      errors.push(`Line ${lineNumber}: hierarchy-code is blank.`);
    }

    if (!label) {
      errors.push(`Line ${lineNumber}: hierarchy-label is blank.`);
    }

    if (hierarchyCodes.has(code)) {
      errors.push(`Line ${lineNumber}: Duplicate hierarchy-code '${code}'.`);
    }

    hierarchyCodes.add(code);

    parentChecks.push({
      lineNumber,
      code,
      parent,
    });
  }

  parentChecks.forEach((item) => {
    if (item.parent && !hierarchyCodes.has(item.parent)) {
      errors.push(
        `Line ${item.lineNumber}: Parent '${item.parent}' does not exist for hierarchy-code '${item.code}'.`,
      );
    }
  });

  renderResults(errors);
}

//
// SECURITY NOTE
//
// Uploaded file content must never be rendered
// using innerHTML.
//
// Always use textContent when displaying data
// originating from uploaded files.
//

function renderResults(errors) {
  const results = document.getElementById("results");

  // Clear existing content safely
  results.replaceChildren();

  if (errors.length === 0) {
    const successHeading = document.createElement("h2");

    successHeading.className = "success";
    successHeading.textContent = "✅ Validation Passed";

    const successMessage = document.createElement("p");

    successMessage.textContent = "File is safe to upload to Mirakl.";

    results.appendChild(successHeading);
    results.appendChild(successMessage);

    return;
  }

  const errorHeading = document.createElement("h2");

  errorHeading.className = "error";
  errorHeading.textContent = "❌ Validation Failed";

  results.appendChild(errorHeading);

  errors.forEach((error) => {
    const errorDiv = document.createElement("div");

    errorDiv.className = "error-item";

    errorDiv.textContent = error;

    results.appendChild(errorDiv);
  });
}
