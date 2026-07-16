const uploadZone = document.getElementById("upload-zone");
const fileInput = document.getElementById("file-input");

uploadZone.addEventListener("click", () => fileInput.click());

uploadZone.addEventListener("dragover", (e) => {
  e.preventDefault();
  uploadZone.classList.add("drag-over");
});

uploadZone.addEventListener("dragleave", () => {
  uploadZone.classList.remove("drag-over");
});

uploadZone.addEventListener("drop", (e) => {
  e.preventDefault();
  uploadZone.classList.remove("drag-over");

  const file = e.dataTransfer.files[0];
  if (file) {
    validateUploadedFile(file);
  }
});

fileInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) {
    validateUploadedFile(file);
  }
});
