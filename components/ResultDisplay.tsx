
import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';

interface ResultDisplayProps {
  originalImageUrl: string | null;
  editedImageUrl: string | null;
  isLoading: boolean;
  error: string | null;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ originalImageUrl, editedImageUrl, isLoading, error }) => {
  const LoadingSkeleton = () => (
    <div className="w-full h-full bg-gray-700 rounded-lg animate-pulse flex flex-col items-center justify-center p-4 text-center">
        <SparklesIcon className="w-16 h-16 text-gray-500 mb-4 animate-pulse" />
        <p className="text-gray-400 font-semibold">يقوم الذكاء الاصطناعي بسحره...</p>
        <p className="text-gray-500 text-sm mt-2">قد يستغرق هذا بضع لحظات.</p>
    </div>
  );

  const Placeholder = () => (
    <div className="w-full h-full flex flex-col items-center justify-center text-center text-gray-500 p-4">
      <div className="w-24 h-24 mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full">
            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-gray-400">ستظهر صورتك هنا</h3>
      <p className="text-sm">قم بتحميل صورة وابدأ في التعديل.</p>
    </div>
  );

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center text-center text-red-400 bg-red-900/20 border border-red-500/50 rounded-lg p-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-lg font-semibold">حدث خطأ</h3>
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  const imageUrl = editedImageUrl || originalImageUrl;

  if (imageUrl) {
    return (
        <div className="w-full h-full relative">
            <img src={imageUrl} alt={editedImageUrl ? "الصورة المعدلة" : "الصورة الأصلية"} className="object-contain w-full h-full max-h-[calc(100vh-250px)] rounded-lg" />
            {editedImageUrl && (
                <a 
                    href={editedImageUrl} 
                    download="edited-image.png"
                    className="absolute bottom-4 left-4 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors text-sm font-semibold flex items-center gap-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    تحميل
                </a>
            )}
        </div>
    );
  }

  return <Placeholder />;
};

export default ResultDisplay;
