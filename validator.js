//
// ===============================
//  VALIDATOR MODULE (CLEANED)
// ===============================
//

export const EXPECTED_HEADER =
  "hierarchy-code;hierarchy-label;hierarchy-parent-code";

//
// Adaptive file size formatter
//
export function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
  if (bytes < 1024 * 1024 * 1024)
    return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
  return `${(bytes / 1024 / 1024 / 1024).toFixed(2)} GB`;
}

//
// Main entry point for uploaded files
//
export function validateUploadedFile(file, onMetadataReady) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

    if (!file) {
      alert("Please select a CSV file.");
      resolve(null);
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      alert(`File Size ${formatFileSize(file.size)} exceeds the 10MB limit`);
      resolve(null);
      return;
    }

    reader.onload = function (event) {
      const content = event.target.result;

      // Update file info panel
      onMetadataReady(file, content);

      // Run validation + return stats
      const stats = runValidation(content);
      resolve(stats);
    };

    reader.readAsText(file, "UTF-8");
  });
}

//
// ===============================
//  VALIDATION ENGINE
// ===============================
//

function runValidation(content) {
  const lines = content
    .replace(/\r/g, "")
    .split("\n")
    .filter((line) => line.trim() !== "");

  const errors = [];

  // Stats object
  let totalRows = Math.max(0, lines.length - 1);
  let validRows = 0;
  let invalidRows = 0;
  let duplicates = 0;
  let missingParents = 0;
  let circularRefs = 0;

  //
  // Empty file
  //
  if (lines.length === 0) {
    errors.push("File is empty.");
    renderResults(errors);

    return {
      totalRows: 0,
      validRows: 0,
      invalidRows: 0,
      duplicates: 0,
      missingParents: 0,
      circularRefs: 0,
    };
  }

  //
  // Header validation
  //
  if (lines[0].trim() !== EXPECTED_HEADER) {
    errors.push(
      `Invalid header.
Expected: ${EXPECTED_HEADER}
Found: ${lines[0]}`,
    );
  }

  //
  // Row validation
  //
  const hierarchyCodes = new Set();
  const parentChecks = [];
  const hierarchyMap = new Map();

  for (let i = 1; i < lines.length; i++) {
    const lineNumber = i + 1;
    const line = lines[i];
    let lineHasError = false;

    if (line.startsWith('"') && line.endsWith('"')) {
      errors.push(`Line ${lineNumber}: Entire row wrapped in quotes.`);
      lineHasError = true;
    }

    const columns = line.split(";");

    if (columns.length !== 3) {
      errors.push(
        `Line ${lineNumber}: Expected 3 columns, found ${columns.length}.`,
      );
      invalidRows++;
      continue;
    }

    const code = columns[0].trim();
    const label = columns[1].trim();
    const parent = columns[2].trim();

    //
    // HTML tag detection
    //
    const htmlTagPattern = /<[^>]+>/;

    if (htmlTagPattern.test(code)) {
      errors.push(`Line ${lineNumber}: HTML tags detected in hierarchy-code.`);
      lineHasError = true;
    }

    if (htmlTagPattern.test(label)) {
      errors.push(`Line ${lineNumber}: HTML tags detected in hierarchy-label.`);
      lineHasError = true;
    }

    if (htmlTagPattern.test(parent)) {
      errors.push(
        `Line ${lineNumber}: HTML tags detected in hierarchy-parent-code.`,
      );
      lineHasError = true;
    }

    //
    // CSV formula injection detection
    //
    const dangerousPrefixes = ["=", "+", "-", "@"];

    function containsFormulaInjection(value) {
      return dangerousPrefixes.some((prefix) => value.startsWith(prefix));
    }

    if (containsFormulaInjection(code)) {
      errors.push(
        `Line ${lineNumber}: Possible CSV formula injection in hierarchy-code.`,
      );
      lineHasError = true;
    }

    if (containsFormulaInjection(label)) {
      errors.push(
        `Line ${lineNumber}: Possible CSV formula injection in hierarchy-label.`,
      );
      lineHasError = true;
    }

    if (containsFormulaInjection(parent)) {
      errors.push(
        `Line ${lineNumber}: Possible CSV formula injection in hierarchy-parent-code.`,
      );
      lineHasError = true;
    }

    //
    // Self-referencing parent
    //
    if (code && parent && code === parent) {
      errors.push(
        `Line ${lineNumber}: hierarchy-code '${code}' cannot reference itself as a parent.`,
      );
      lineHasError = true;
    }

    //
    // Blank fields
    //
    if (!code) {
      errors.push(`Line ${lineNumber}: hierarchy-code is blank.`);
      lineHasError = true;
    }

    if (!label) {
      errors.push(`Line ${lineNumber}: hierarchy-label is blank.`);
      lineHasError = true;
    }

    //
    // Duplicate detection
    //
    if (hierarchyCodes.has(code)) {
      errors.push(`Line ${lineNumber}: Duplicate hierarchy-code '${code}'.`);
      duplicates++;
      lineHasError = true;
    }

    hierarchyCodes.add(code);

    parentChecks.push({ lineNumber, code, parent });
    hierarchyMap.set(code, parent);

    if (lineHasError) invalidRows++;
    else validRows++;
  }

  //
  // Missing parent detection
  //
  parentChecks.forEach((item) => {
    if (item.parent && !hierarchyCodes.has(item.parent)) {
      errors.push(
        `Line ${item.lineNumber}: Parent '${item.parent}' does not exist for hierarchy-code '${item.code}'.`,
      );
      missingParents++;
      invalidRows++;
    }
  });

  //
  // Circular reference detection
  //
  hierarchyMap.forEach((parent, code) => {
    const visited = new Set();
    let currentParent = parent;

    while (currentParent) {
      if (visited.has(currentParent)) {
        errors.push(`Circular hierarchy detected involving '${code}'.`);
        circularRefs++;
        break;
      }
      visited.add(currentParent);
      currentParent = hierarchyMap.get(currentParent);
    }
  });

  //
  // Render errors
  //
  renderResults(errors);

  //
  // Return stats object
  //
  return {
    totalRows,
    validRows,
    invalidRows,
    duplicates,
    missingParents,
    circularRefs,
  };
}

//
// ===============================
//  RESULTS RENDERER
// ===============================
//

function renderResults(errors) {
  const results = document.getElementById("results");
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
