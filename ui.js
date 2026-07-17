import { initDropzone } from "./components/dropzone.js";
import { renderFileInfo } from "./components/filePanel.js";
import { validateUploadedFile } from "./validator.js";

initDropzone((file) => {
  validateUploadedFile(file, renderFileInfo);
});
