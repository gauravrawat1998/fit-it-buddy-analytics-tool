import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileSpreadsheet, CheckCircle, AlertCircle } from 'lucide-react';
import { readExcelFile, processExcelData, getUniqueHotels } from '../utils/excelReader';
import { useAppDispatch } from '../hooks/useRedux';
import { setExcelData } from '../store/slices/excelDataSlice';
import { setAvailableCompanies } from '../store/slices/filtersSlice';

interface FileUploadProps {
  onFileProcessed: (data: any[]) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileProcessed }) => {
  const dispatch = useAppDispatch();
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFile(files[0]);
    }
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  }, []);

  const handleFile = async (file: File) => {
    const validTypes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel',
      'text/csv'
    ];

    if (!validTypes.includes(file.type)) {
      setError('Please upload a valid Excel file (.xlsx, .xls, .csv)');
      return;
    }

    setError(null);
    setUploadedFile(file);
    setIsProcessing(true);

    try {
     const data = await readExcelFile(file, 'Monthly numbers');
      // const processedData = processExcelData(data);
      const companiesName = getUniqueHotels(data)
      console.log(data, "data");
      console.log(companiesName, "companiesName");

      // Store in Redux
      dispatch(setExcelData({ 
        data: data, 
        fileName: file.name 
      }));
      dispatch(setAvailableCompanies(companiesName));
      
      // Simulate processing time for better UX
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      onFileProcessed(data);
      setIsProcessing(false);
    } catch (err) {
      setError('Error processing file. Please try again.');
      setIsProcessing(false);
    }
  };

  const LoadingAnimation = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-12"
    >
      <div className="relative">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full"
        />
        <FileSpreadsheet className="w-6 h-6 text-blue-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      </div>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-4 text-lg font-medium text-gray-700"
      >
        Processing your Excel file...
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-sm text-gray-500 mt-2"
      >
        This won't take long!
      </motion.p>
    </motion.div>
  );

  if (isProcessing) {
    return (
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          <LoadingAnimation />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className={`
          relative bg-white rounded-2xl shadow-lg border-2 border-dashed transition-all duration-300 cursor-pointer
          ${isDragging 
            ? 'border-blue-400 bg-blue-50 scale-105' 
            : 'border-gray-300 hover:border-blue-300 hover:bg-blue-50/50'
          }
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept=".xlsx,.xls,.csv"
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        <div className="p-8 text-center">
          <AnimatePresence mode="wait">
            {uploadedFile && !error ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex flex-col items-center"
              >
                <CheckCircle className="w-12 h-12 text-green-500 mb-4" />
                <p className="text-lg font-medium text-gray-900 mb-2">
                  File uploaded successfully!
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  {uploadedFile.name}
                </p>
                <div className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  Ready to process
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="upload"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex flex-col items-center"
              >
                <motion.div
                  animate={{ 
                    y: isDragging ? -5 : 0,
                    scale: isDragging ? 1.1 : 1 
                  }}
                  className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4"
                >
                  <Upload className="w-8 h-8 text-white" />
                </motion.div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Upload your Excel file
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Drag & drop your file here or click to browse
                </p>
                
                <div className="flex flex-wrap justify-center gap-2 text-xs text-gray-500">
                  <span className="px-2 py-1 bg-gray-100 rounded">XLSX</span>
                  <span className="px-2 py-1 bg-gray-100 rounded">XLS</span>
                  <span className="px-2 py-1 bg-gray-100 rounded">CSV</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center"
        >
          <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
          <p className="text-sm text-red-700">{error}</p>
        </motion.div>
      )}
    </div>
  );
};

export default FileUpload;