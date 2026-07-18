//
// ui.js
// Orchestrates the upload → validation → UI rendering pipeline.
// Uses async/await to ensure validation results are available
// before rendering summary and stats.
//

import { initDropzone } from "./components/dropzone.js";
import { renderFileInfo } from "./components/filePanel.js";
import { renderStats } from "./components/cards.js";
import { renderSummary } from "./components/summary.js";
import { renderErrorCategories } from "./components/errorCategories.js";
import { validateUploadedFile } from "./validator.js";

// Initialise dropzone and handle file selection
initDropzone(async (file) => {

  if (!file) {
    renderSummary(null);

    const statsPanel = document.getElementById("stats-panel");
    const statsPlaceholder = document.getElementById("stats-placeholder");

    statsPanel.innerHTML = "";
    statsPanel.appendChild(statsPlaceholder);
    statsPlaceholder.style.display = "block;"
    renderErrorCategories({}, false);
    return;
  }

  // Run validation asynchronously and retrieve structured result
  const result = await validateUploadedFile(file, renderFileInfo);

  renderSummary(result);

  const statsPlaceholder =document.getElementById("stats-placeholder");
  statsPlaceholder.style.display = "none";

  renderStats(result.stats);
  renderErrorCategories(result.categories, true);
});
