import React, { useState, useCallback } from 'react';
import ImageUploader from './components/ImageUploader';
import PromptInput from './components/PromptInput';
import ResultDisplay from './components/icons/ResultDisplay';
import { SparklesIcon } from './components/icons/SparklesIcon';
import { editImageWithPrompt } from './services/geminiService';
import { fileToBase64 } from './utils/fileUtils';

const App: React.FC = () => {
  const [originalImageFile, setOriginalImageFile] = useState<File | null>(null);
  const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);
  const [editedImageUrl, setEditedImageUrl] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageSelect = (file: File) => {
    setOriginalImageFile(file);
    setEditedImageUrl(null);
    setError(null);
    
    const reader = new FileReader();
    reader.onloadend = () => {
      setOriginalImageUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleGenerate = useCallback(async () => {
    if (!originalImageFile || !prompt) {
      setError('يرجى تحميل صورة وكتابة وصف للتعديل.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setEditedImageUrl(null);

    try {
      const { base64, mimeType } = await fileToBase64(originalImageFile);
      const resultBase64 = await editImageWithPrompt(base64, mimeType, prompt);
      const newImageUrl = `data:${mimeType};base64,${resultBase64}`;
      setEditedImageUrl(newImageUrl);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsLoading(false);
    }
  }, [originalImageFile, prompt]);
  
  const handleReset = () => {
    setOriginalImageFile(null);
    setOriginalImageUrl(null);
    setEditedImageUrl(null);
    setPrompt('');
    setError(null);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6 lg:p-8 flex flex-col items-center">
      <header className="w-full max-w-6xl text-center mb-8">
        <div className="flex items-center justify-center gap-4">
          <SparklesIcon className="w-10 h-10 text-purple-400" />
          <h1 className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
            محرر الصور بالذكاء الاصطناعي
          </h1>
        </div>
        <p className="text-lg text-gray-400 mt-4 max-w-2xl mx-auto">
          حوّل صورك بوصف بسيط. قم بتحميل صورة، صف التعديل الذي تريده، ودع الذكاء الاصطناعي يبدع.
        </p>
      </header>

      <main className="w-full max-w-6xl flex-grow flex flex-col lg:flex-row-reverse gap-8">
        <div className="lg:w-1/2 w-full flex flex-col bg-gray-800/50 rounded-2xl p-6 border border-gray-700 backdrop-blur-sm">
          <div className="flex-grow flex flex-col gap-6">
            <div className="flex-grow">
              <ImageUploader onImageSelect={handleImageSelect} imageUrl={originalImageUrl} />
            </div>
            <PromptInput
              value={prompt}
              onChange={setPrompt}
              onSubmit={handleGenerate}
              isLoading={isLoading}
              isDisabled={!originalImageFile}
            />
            {originalImageUrl && (
               <button
                  onClick={handleReset}
                  className="w-full py-2 text-center text-gray-400 hover:text-white transition-colors duration-200 rounded-lg"
                  disabled={isLoading}
                >
                  البدء من جديد
                </button>
            )}
          </div>
        </div>

        <div className="lg:w-1/2 w-full flex items-center justify-center bg-gray-800/50 rounded-2xl p-6 border border-gray-700 min-h-[400px] lg:min-h-0">
          <ResultDisplay
            originalImageUrl={originalImageUrl}
            editedImageUrl={editedImageUrl}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </main>

       <footer className="w-full max-w-6xl text-center mt-8 text-gray-500 text-sm">
        <p>مدعوم بواسطة Gemini API</p>
      </footer>
    </div>
  );
};

export default App;