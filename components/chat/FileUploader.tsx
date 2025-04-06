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
        <div className="flex items-center gap-2 p-2 border border-blue-200 bg-blue-50 rounded-lg">
          <div className="flex items-center gap-2 flex-1 text-sm">
            <FileIcon size={16} className="text-blue-500" />
            <span className="truncate">{selectedFile.name}</span>
            <span className="text-xs text-gray-500">
              ({Math.round(selectedFile.size / 1024)} KB)
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="p-1 h-7 w-7"
            onClick={handleClearFile}
          >
            <X size={14} />
          </Button>
          <Button
            size="sm"
            className="text-xs px-3"
            onClick={handleUpload}
          >
            Upload
          </Button>
        </div>
      ) : (
        <Button 
          variant="outline" 
          onClick={handleUpload}
          className="w-full text-gray-600 border-dashed border-gray-300 hover:border-blue-300 hover:bg-blue-50"
        >
          <FileUp size={16} className="mr-2" />
          Upload Files (PDF, CSV, Excel, Word)
        </Button>
      )}
      
      <div className="text-xs text-gray-500 mt-2 text-center">
        Attach documents related to your financial queries
      </div>
    </div>
  );
} 