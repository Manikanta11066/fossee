import { useRef, useState } from "react";

export default function UploadPanel({ onUpload }) {
  const fileRef = useRef();
  const [fileName, setFileName] = useState("");

  const handleUpload = () => {
    if (!fileRef.current.files.length) {
      alert("Please select a CSV file.");
      return;
    }
    onUpload(fileRef.current.files[0]);
  };

  return (
    <div className="upload-modern">
      <h3 className="upload-title"></h3>

      {/* Custom file input */}
      <label className="file-picker">
        <input
          type="file"
          accept=".csv"
          ref={fileRef}
          onChange={(e) => setFileName(e.target.files[0]?.name || "")}
        />
        <span className="file-text">
          {fileName ? fileName : "Choose a CSV file"}
        </span>
      </label>

      <button className="liquid-btn" onClick={handleUpload}>
        Upload File
      </button>

      <p className="upload-info">
        Expected columns: Equipment Name, Type, Flowrate, Pressure, Temperature
      </p>
    </div>
  );
}
