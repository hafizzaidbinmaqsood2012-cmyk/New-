import React, { useState } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { Download, Check, FileCode, Sparkles, FolderArchive, Copy, X } from 'lucide-react';
import { ALL_PROJECT_FILES } from '../data/allProjectFiles';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExportProjectModal: React.FC<ExportModalProps> = ({ isOpen, onClose }) => {
  const [isZipping, setIsZipping] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [selectedFileIndex, setSelectedFileIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleDownloadZip = async () => {
    try {
      setIsZipping(true);
      const zip = new JSZip();

      // Add each file to the zip structure
      ALL_PROJECT_FILES.forEach((file) => {
        // Strip leading slash if present
        const cleanPath = file.path.startsWith('/') ? file.path.slice(1) : file.path;
        zip.file(cleanPath, file.content);
      });

      const blob = await zip.generateAsync({ type: 'blob' });
      saveAs(blob, 'avendora-haute-parfumerie.zip');
      setIsZipping(false);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 5000);
    } catch (err) {
      console.error('Failed to generate ZIP:', err);
      setIsZipping(false);
    }
  };

  const currentFile = ALL_PROJECT_FILES[selectedFileIndex] || ALL_PROJECT_FILES[0];

  const handleCopyCurrentFile = () => {
    navigator.clipboard.writeText(currentFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className="bg-white border border-[#CBD5E1] shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden animate-fade-in">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-[#0F2C59] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FolderArchive className="w-6 h-6 text-amber-300 shrink-0" />
            <div>
              <h2 className="font-serif text-lg sm:text-xl font-bold tracking-wide">
                AVENDORA Source Code Exporter ({ALL_PROJECT_FILES.length} Files)
              </h2>
              <p className="text-xs text-white/80 font-sans">
                Export the complete codebase as a structured .ZIP or inspect and copy individual files.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleDownloadZip}
              disabled={isZipping}
              className="bg-amber-400 hover:bg-amber-300 text-[#0F2C59] px-4 py-2.5 text-xs font-sans uppercase font-bold tracking-wider flex items-center gap-2 shadow-md transition-all cursor-pointer disabled:opacity-50"
            >
              {isZipping ? (
                <Sparkles className="w-4 h-4 animate-spin" />
              ) : downloadSuccess ? (
                <Check className="w-4 h-4 text-emerald-800" />
              ) : (
                <Download className="w-4 h-4" />
              )}
              <span>{isZipping ? 'Generating ZIP...' : downloadSuccess ? 'Downloaded!' : 'Download ZIP Bundle'}</span>
            </button>

            <button
              onClick={onClose}
              className="text-white/80 hover:text-white p-1.5 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content Explorer: Left file list + Right code preview */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 overflow-hidden min-h-[450px]">
          {/* File list sidebar */}
          <div className="md:col-span-4 border-r border-[#E2E8F0] bg-[#F8FAFC] overflow-y-auto max-h-[50vh] md:max-h-[60vh] p-3 space-y-1">
            <div className="text-[11px] uppercase font-sans tracking-wider text-[#64748B] px-3 py-2 font-bold">
              Project Manifest ({ALL_PROJECT_FILES.length} Files)
            </div>
            {ALL_PROJECT_FILES.map((file, idx) => (
              <button
                key={file.path}
                onClick={() => setSelectedFileIndex(idx)}
                className={`w-full text-left px-3 py-2 text-xs font-mono truncate flex items-center gap-2 transition-colors cursor-pointer ${
                  selectedFileIndex === idx
                    ? 'bg-[#0F2C59] text-white font-bold'
                    : 'text-[#475569] hover:bg-[#E2E8F0] hover:text-[#111111]'
                }`}
              >
                <FileCode className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{file.path}</span>
              </button>
            ))}
          </div>

          {/* Code Viewer Panel */}
          <div className="md:col-span-8 bg-[#0B132B] text-[#E0E7FF] flex flex-col overflow-hidden max-h-[50vh] md:max-h-[60vh]">
            <div className="p-3 bg-[#070D1F] border-b border-white/10 flex items-center justify-between">
              <span className="font-mono text-xs text-amber-300 font-semibold truncate">
                {currentFile.path}
              </span>
              <button
                onClick={handleCopyCurrentFile}
                className="bg-white/10 hover:bg-white/20 text-white px-3 py-1 text-xs font-sans flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy File Content'}</span>
              </button>
            </div>

            <pre className="flex-1 p-4 overflow-auto font-mono text-xs leading-relaxed text-blue-100/90 whitespace-pre">
              <code>{currentFile.content}</code>
            </pre>
          </div>
        </div>

        {/* Footer info bar */}
        <div className="p-3 bg-[#F1F5F9] border-t border-[#E2E8F0] text-xs text-[#64748B] flex flex-col sm:flex-row items-center justify-between gap-2 px-6">
          <span>
            Ready to import: run <code>npm install</code> &amp; <code>npm run dev</code>
          </span>
          <span className="font-semibold text-[#0F2C59]">
            AVENDORA Haute Parfumerie • Vite + React 19 + TypeScript + Tailwind
          </span>
        </div>
      </div>
    </div>
  );
};
