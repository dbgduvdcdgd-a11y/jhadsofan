
import React, { useCallback, useRef } from 'react';
import { UploadIcon } from './icons/UploadIcon';

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
  imageUrl: string | null;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelect, imageUrl }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageSelect(file);
    }
  };

  const onDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
  };
  
  const onDrop = useCallback((event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
        onImageSelect(file);
    }
  }, [onImageSelect]);

  const triggerFileSelect = () => {
    inputRef.current?.click();
  };

  return (
    <div className="h-full">
        <label
            onDragOver={onDragOver}
            onDrop={onDrop}
            onClick={triggerFileSelect}
            className={`flex flex-col items-center justify-center w-full h-full border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-300
            ${imageUrl ? 'border-purple-500 bg-gray-700/20' : 'border-gray-600 bg-gray-800 hover:bg-gray-700 hover:border-purple-500'}`}
        >
            {imageUrl ? (
            <div className="relative w-full h-full p-2">
                <img src={imageUrl} alt="معاينة" className="object-contain w-full h-full max-h-[300px] rounded-md" />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <span className="text-white font-semibold">تغيير الصورة</span>
                </div>
            </div>
            ) : (
            <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center p-4">
                <UploadIcon className="w-10 h-10 mb-4 text-gray-400" />
                <p className="mb-2 text-sm text-gray-400">
                <span className="font-semibold text-purple-400">انقر للتحميل</span> أو اسحب وأفلت
                </p>
                <p className="text-xs text-gray-500">SVG, PNG, JPG or WEBP</p>
            </div>
            )}
            <input
            ref={inputRef}
            id="dropzone-file"
            type="file"
            className="hidden"
            accept="image/png, image/jpeg, image/webp, image/svg+xml"
            onChange={handleFileChange}
            />
        </label>
    </div>
  );
};

export default ImageUploader;
