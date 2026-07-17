import { EXPECTED_HEADER, formatFileSize } from "../validator.js";

export function renderFileInfo(file, content) {
  document.getElementById("info-name").textContent = file.name;
  document.getElementById("info-size").textContent =
    formatFileSize(file.size);

  const rows = content
    .replace(/\r/g, "")
    .split("\n")
    .filter((line) => line.trim() !== "");

  document.getElementById("info-rows").textContent = rows.length;

  const headerValid = rows[0]?.trim() === EXPECTED_HEADER;
  document.getElementById("info-header").textContent = headerValid
    ? "valid"
    : "Invalid";

  document.getElementById("info-uploaded").textContent =
    new Date().toLocaleString();
}
