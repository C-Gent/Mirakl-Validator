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
import { validateUploadedFile } from "./validator.js";

// Initialise dropzone and handle file selection
initDropzone(async (file) => {
  // Run validation asynchronously and retrieve structured result
  const result = await validateUploadedFile(file, renderFileInfo);

  if (!result) return;

  renderSummary(result);
  renderStats(result.stats);
});
