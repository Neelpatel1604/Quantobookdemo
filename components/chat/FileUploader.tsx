'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { FileUp, X, File as FileIcon } from 'lucide-react';

export default function FileUploader() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = () => {
    if (selectedFile) {
      // In a real implementation, you would upload the file to your server here
      alert(`File "${selectedFile.name}" would be uploaded in the real implementation.`);
    } else {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const handleClearFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept=".pdf,.csv,.xlsx,.xls,.doc,.docx"
      />
      
      {selectedFile ? (
        <div className="flex items-center gap-1 md:gap-2 p-2 border border-blue-200 bg-blue-50 rounded-lg text-xs md:text-sm">
          <div className="flex items-center gap-1 md:gap-2 flex-1 overflow-hidden">
            <FileIcon size={16} className="text-blue-500 flex-shrink-0" />
            <span className="truncate">{selectedFile.name}</span>
            <span className="text-xs text-gray-500 hidden sm:inline">
              ({Math.round(selectedFile.size / 1024)} KB)
            </span>
          </div>
          <div className="flex-shrink-0 flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              className="p-1 h-6 w-6 md:h-7 md:w-7"
              onClick={handleClearFile}
            >
              <X size={12} className="md:w-4 md:h-4" />
            </Button>
            <Button
              size="sm"
              className="text-xs px-2 md:px-3 h-6 md:h-8"
              onClick={handleUpload}
            >
              Upload
            </Button>
          </div>
        </div>
      ) : (
        <Button 
          variant="outline" 
          onClick={handleUpload}
          className="w-full text-gray-600 border-dashed border-gray-300 hover:border-blue-300 hover:bg-blue-50 text-xs md:text-sm h-8 md:h-10"
        >
          <FileUp size={14} className="mr-1 md:mr-2 md:w-4 md:h-4" />
          <span className="hidden sm:inline">Upload Files (PDF, CSV, Excel, Word)</span>
          <span className="sm:hidden">Upload Files</span>
        </Button>
      )}
      
      <div className="text-xs text-gray-500 mt-1 md:mt-2 text-center">
        <span className="hidden sm:inline">Attach documents related to your financial queries</span>
        <span className="sm:hidden">Attach financial documents</span>
      </div>
    </div>
  );
} 