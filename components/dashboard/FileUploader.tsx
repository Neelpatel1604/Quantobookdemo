'use client';

import { useState, useRef } from 'react';
import { FileUp, X, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface FileUploaderProps {
  acceptedFileTypes?: string;
  maxSize?: number; // In MB
  onUpload?: (file: File) => void;
  label?: string;
  description?: string;
}

export default function FileUploader({
  acceptedFileTypes = ".pdf,.csv,.xlsx,.xls",
  maxSize = 10, // 10MB
  onUpload,
  label = "Upload Files",
  description = "Drag and drop files here or click to browse"
}: FileUploaderProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      validateAndSetFile(files[0]);
    }
  };

  const validateAndSetFile = (file: File) => {
    setError(null);
    
    // Check file type
    const fileType = file.name.split('.').pop()?.toLowerCase() || '';
    const isValidType = acceptedFileTypes.includes(`.${fileType}`);
    
    if (!isValidType) {
      setError(`Invalid file type. Accepted types: ${acceptedFileTypes}`);
      return;
    }
    
    // Check file size
    const fileSize = file.size / (1024 * 1024); // Convert to MB
    if (fileSize > maxSize) {
      setError(`File too large. Maximum size: ${maxSize}MB`);
      return;
    }
    
    setSelectedFile(file);
    if (onUpload) {
      onUpload(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      // In a real implementation, you would upload the file to your server here
      alert(`File "${selectedFile.name}" would be uploaded in the real implementation.`);
    } else {
      fileInputRef.current?.click();
    }
  };

  const handleClearFile = () => {
    setSelectedFile(null);
    setError(null);
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
        accept={acceptedFileTypes}
      />
      
      {selectedFile ? (
        <Card className="p-4 border border-blue-200 bg-blue-50 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-full">
              <FileUp className="h-5 w-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium">{selectedFile.name}</h4>
              <p className="text-xs text-gray-500">
                {(selectedFile.size / 1024).toFixed(1)} KB
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="p-1 h-8 w-8 rounded-full"
                onClick={handleClearFile}
              >
                <X className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                onClick={handleUpload}
              >
                Upload
              </Button>
            </div>
          </div>
        </Card>
      ) : (
        <div 
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            isDragging 
              ? 'border-blue-400 bg-blue-50' 
              : error
                ? 'border-red-300 bg-red-50'
                : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleUpload}
        >
          <div className="flex flex-col items-center justify-center cursor-pointer">
            {error ? (
              <>
                <div className="mb-3 p-3 bg-red-100 rounded-full">
                  <AlertCircle className="h-6 w-6 text-red-500" />
                </div>
                <p className="text-sm text-red-600 mb-2">{error}</p>
              </>
            ) : (
              <>
                <div className="mb-3 p-3 bg-gray-100 rounded-full">
                  <FileUp className="h-6 w-6 text-gray-500" />
                </div>
                <h3 className="text-sm font-medium mb-1">{label}</h3>
                <p className="text-xs text-gray-500 mb-3">{description}</p>
              </>
            )}
            <Button size="sm" variant="secondary" type="button">
              Browse Files
            </Button>
          </div>
        </div>
      )}
    </div>
  );
} 