import React, { useState, useEffect } from "react";
import { Particles } from "@/components/ui/particles";
import BackgroundGradient from "@/components/ui/background-gradient";

import UploadPanel from "./components/UploadPanel";
import SummaryCards from "./components/SummaryCards";
import TypeBarChart from "./components/TypeBarChart";
import PreviewTable from "./components/PreviewTable";


import Login from "./Login";

import "./styles.css";

export default function App() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [datasetId, setDatasetId] = useState(null);
  const [rows, setRows] = useState([]); // full parsed CSV rows
  const [columns, setColumns] = useState([]);
  const [summary, setSummary] = useState(null);
  const [history, setHistory] = useState([]); // backend upload history
  const [hasUserUploaded, setHasUserUploaded] = useState(false); // track session uploads

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleLogin = (ok) => setIsAuthorized(!!ok);

  async function fetchHistory() {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/history/");
      const json = await res.json();
      setHistory(Array.isArray(json) ? json : []);
    } catch (err) {
      console.warn("history load failed", err);
    }
  }

  async function handleUpload(file) {
    if (!file) return;

    // parse client-side CSV preview
    const text = await file.text();
    const lines = text.trim().split("\n").map((r) => r.split(",").map(c => c.trim()));
    const hdr = lines[0] || [];
    const formatted = lines
      .slice(1)
      .filter(row => row.length === hdr.length && row.some(cell => cell !== ""))
      .map(row => hdr.reduce((o,k,i) => { o[k]=row[i] ?? ""; return o; }, {}));

    setRows(formatted);
    setColumns(hdr);

    // upload CSV to backend
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("http://127.0.0.1:8000/api/upload/", {
        method: "POST",
        body: fd,
      });
      const json = await res.json();
      if (!res.ok) {
        alert("Upload failed: " + (json.detail || JSON.stringify(json)));
        return;
      }
      setSummary(json.summary || null);
      setDatasetId(json.id || null);
      setHasUserUploaded(true); // mark upload done in session
      await fetchHistory(); // refresh history with new file
    } catch (err) {
      console.error("upload error", err);
      alert("Upload error — check console");
    }
  }

  function downloadPdf() {
    if (!datasetId) {
      alert("Upload a dataset first");
      return;
    }
    window.open(`http://127.0.0.1:8000/api/report/${datasetId}/`, "_blank");
  }

  return (
    <div className="app-root">
      {/* Particles background */}
      <Particles quantity={120} ease={60} color="255,160,60" />

      <div className="ui-container">
        <h1 className="page-title">LabViz</h1>

        {!isAuthorized ? (
          <div className="center-login">
            <Login onLogin={handleLogin} />
          </div>
        ) : (
          <>
            {/* Upload panel */}
            <BackgroundGradient className="bg-wrapper">
              <div className="card upload-card">
                <h2 className="card-title">Upload Dataset</h2>
                <UploadPanel onUpload={handleUpload} />
              </div>
            </BackgroundGradient>

            {/* Summary */}
            <BackgroundGradient className="bg-wrapper" style={{ marginTop: 20 }}>
              <div className="card summary-block">
                <h2 className="card-title">Summary</h2>
                {summary ? <SummaryCards summary={summary} /> : <p className="muted">No summary yet</p>}
              </div>
            </BackgroundGradient>

            {/* Equipment type chart */}
            <BackgroundGradient className="bg-wrapper" style={{ marginTop: 20 }}>
              <div className="card chart-block">
                <h2 className="card-title">Equipment Type Distribution</h2>
                {summary ? <TypeBarChart summary={summary} /> : <p className="muted">No data</p>}
              </div>
            </BackgroundGradient>

            {/* History – show only after user uploads */}
            <BackgroundGradient className="bg-wrapper" style={{ marginTop: 20 }}>
              <div className="card history-block">
                <h2 className="card-title">History</h2>
                {(history.length === 0 && !hasUserUploaded) ? (
                  <p className="muted">No uploads yet</p>
                ) : (
                  <ul className="history-list">
                    {history.map(h => <li key={h.id}>{h.original_filename}</li>)}
                  </ul>
                )}
              </div>
            </BackgroundGradient>

            {/* Preview first 10 rows */}
            <BackgroundGradient className="bg-wrapper" style={{ marginTop: 20 }}>
              <div className="card preview-block">
                <h2 className="card-title">Preview Table (first 10 rows)</h2>
                {rows.length > 0 ? (
                  <PreviewTable columns={columns} rows={rows.slice(0, 10)} />
                ) : (
                  <p className="muted">No data</p>
                )}
              </div>
            </BackgroundGradient>

            {/* Download report */}
            <div style={{ marginTop: 28, textAlign: "center" }}>
              <button className="liquid-btn" onClick={downloadPdf} disabled={!datasetId}>
                Download PDF Report
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
