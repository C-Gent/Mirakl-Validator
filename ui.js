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
    document.getElementById("file-info").classList.add("hidden");
    document.getElementById("summary-banner").classList.add("hidden");
    renderSummary(null);
    renderErrorCategories({}, false);
    document.getElementById("stats-panel").classList.add("hidden");
    loadUploadHistory();
    loadRecentErrors();
    return;
  }

  // Run validation asynchronously and retrieve structured result
  const result = await validateUploadedFile(file, renderFileInfo);

  document.getElementById("file-info").classList.remove("hidden");
  document.getElementById("summary-banner").classList.remove("hidden");
  renderSummary(result);
  document.getElementById("stats-panel").classList.remove("hidden");
  renderStats(result.stats);
  renderErrorCategories(result.categories, true);

  saveUploadHistory(file);
  saveRecentErrors(result);
  loadUploadHistory();
  loadRecentErrors();
});

// Upload History
function saveUploadHistory(file) {
  const history = JSON.parse(localStorage.getItem("uploadHistory") || "[]");
  history.unshift({
    name: file.name,
    date: new Date().toLocaleString()
  });
  localStorage.setItem("uploadHistory", JSON.stringify(history.slice(0, 3)));
}

function loadUploadHistory() {
  const list = document.getElementById("history-list");
  list.innerHTML = "";
  const history = JSON.parse(localStorage.getItem("uploadHistory") || "[]");
  history.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - ${item.date}`;
    list.appendChild(li);
  });
}

// Recent Errors
function saveRecentErrors(result) {
  localStorage.setItem("recentErrors", JSON.stringify(result));
}

function loadRecentErrors() {
  const container = document.getElementById("recent-errors-content");
  const data = JSON.parse(localStorage.getItem("recentErrors") || "null");

  if (!data) {
    container.textContent = "No previous validation results.";
    return;
  }

  container.textContent = `Last result: ${data.passed ? "Passed" : "Failed"} - ${data.stats.invalidRows} invalid rows`;
}

// Collapse / Expand Left Panel
const leftPanel = document.querySelector(".left-panel");
document.getElementById("collapse-left").addEventListener("click", () => {
  leftPanel.classList.add("collapsed");
});

document.getElementById("expand-left").addEventListener("click", () => {
  leftPanel.classList.remove("collapsed");
});
