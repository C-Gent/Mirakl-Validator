export function initDropzone(onfileSelected) {
  const zone = document.getElementById("upload-zone");
  const input = document.getElementById("file-input");

  zone.addEventListener("click", () => input.click());

  zone.addEventListener("dragover", (e) => {
    e.preventDefault();
    zone.classList.add("drag-over");
  });

  zone.addEventListener("dragleave", () => {
    zone.classList.remove("drag-over");
  });

  zone.addEventListener("drop", (e) => {
    e.preventDefault();
    zone.classList.remove("drag-over");

    const file = e.dataTransfer.files[0];
    if (file) onfileSelected(file);
  });

  input.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) onfileSelected(file);
  });
}
