
import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  isDisabled: boolean;
}

const PromptInput: React.FC<PromptInputProps> = ({ value, onChange, onSubmit, isLoading, isDisabled }) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      if (!isDisabled && !isLoading) {
        onSubmit();
      }
    }
  };
    
  return (
    <div className="flex flex-col gap-4">
        <label htmlFor="prompt-input" className="font-semibold text-gray-300">
            صف التعديل الذي تريده
        </label>
        <div className="relative">
            <textarea
                id="prompt-input"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="مثال: اجعل السماء مليئة بالنجوم، أضف قطة ترتدي قبعة ساحر..."
                rows={3}
                className="w-full p-4 pr-12 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200 resize-none disabled:opacity-50"
                disabled={isDisabled}
            />
        </div>
        <button
            onClick={onSubmit}
            disabled={isLoading || isDisabled || !value.trim()}
            className="flex items-center justify-center gap-2 w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 transform active:scale-95"
        >
            {isLoading ? (
                <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>جاري المعالجة...</span>
                </>
            ) : (
                <>
                    <SparklesIcon className="w-5 h-5" />
                    <span>إنشاء الصورة</span>
                </>
            )}
        </button>
    </div>
  );
};

export default PromptInput;
