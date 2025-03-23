import React, { useState } from "react";
import "./DragAndDropUpload.scss";
import { IoCloudUploadSharp } from "react-icons/io5";

interface FileItem {
  name: string;
  size: number;
  type: string;
  preview: string; // Preview URL for the image
  id: string; // Unique identifier for each file
}

interface DragAndDropUploadProps {
  onUpload: (file: File) => void; // Prop to notify parent component when a file is uploaded
}

function DragAndDropUpload({ onUpload }: DragAndDropUploadProps) {
  const [files, setFiles] = useState<FileItem[]>([]); // To store the uploaded files

  // Handle file selection via drag and drop
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFiles = e.dataTransfer.files;
    processFiles(droppedFiles);
  };

  // Handle file selection via file input
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      processFiles(e.target.files);
    }
  };

  // Process files and store them in state, including the image preview
  const processFiles = (fileList: FileList) => {
    const newFiles: FileItem[] = [];
    Array.from(fileList).forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newFiles.push({
          name: file.name,
          size: file.size,
          type: file.type,
          preview: reader.result as string, // Store the preview URL
          id: file.name + Date.now().toString(), // Generate a unique ID for each file
        });
        setFiles((prevFiles) => [...prevFiles, ...newFiles]); // Update the state with the new files and preview

        // Call the onUpload prop when a file is added
        onUpload(file); // Pass the file to the parent component
      };
      reader.readAsDataURL(file); // Read the file as a data URL (base64)
    });
  };

  // Handle drag over event to allow dropping
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleIconClick = () => {
    // Trigger the file input click
    const fileInput = document.getElementById("fileInput") as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  };

  // Remove the selected file from the state
  const handleRemoveFile = (id: string) => {
    setFiles(files.filter((file) => file.id !== id)); // Remove the file from the state
  };

  // Handle the image change (select a new image to replace the current one)
  const handleChangeFile = (id: string) => {
    const fileInput = document.getElementById("fileInput") as HTMLInputElement;
    if (fileInput) {
      // Clear the file input value to allow selecting the same file again
      fileInput.value = ""; // Reset the file input
      fileInput.click(); // Open the file input dialog
      fileInput.onchange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
          const file = e.target.files[0]; // Get the first selected file
          const reader = new FileReader();
          reader.onloadend = () => {
            // Update the state with the new file
            setFiles((prevFiles) =>
              prevFiles.map((f) =>
                f.id === id
                  ? {
                      ...f,
                      preview: reader.result as string,
                      name: file.name,
                      size: file.size,
                    }
                  : f
              )
            );
          };
          reader.readAsDataURL(file); // Read the new file as a data URL
        }
      };
    }
  };

  return (
    <div className="dragAndDropUpload">
      <div className="upload-container">
        <div
          className="drop-area"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          {/* Hidden File Input */}
          <input
            id="fileInput"
            type="file"
            multiple
            onChange={handleFileInputChange}
            className="fileInput"
          />

          {/* Conditionally render the upload icon only when no files are uploaded */}
          {files.length === 0 && (
            <div className="dragAndDropIconContainer" onClick={handleIconClick}>
              <IoCloudUploadSharp className="dragAndDropIcon" />
            </div>
          )}
        </div>

        <p>Drag and drop files here or click to select</p>

        {files.length > 0 && (
          <div className="file-list">
            {files.map((file, index) => (
              <div key={index}>
                {file.type.startsWith("image") && (
                  <div className="image-preview">
                    <img src={file.preview} alt={`preview-${file.name}`} />
                  </div>
                )}
                <div className="file-list-btn-group">
                  <button
                    className="remove-btn"
                    onClick={() => handleRemoveFile(file.id)}
                  >
                    Remove
                  </button>
                  {/* <button
                    className="change-btn"
                    onClick={() => handleChangeFile(file.id)}
                  >
                    Change
                  </button> */}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default DragAndDropUpload;
