import { useState } from 'react';

interface PersonalitySelectorProps {
  onSelect: (personality: 'girlfriend' | 'boyfriend') => void;
}

export default function PersonalitySelector({ onSelect }: PersonalitySelectorProps) {
  const [selected, setSelected] = useState<'girlfriend' | 'boyfriend' | null>(null);

  const handleSelect = (personality: 'girlfriend' | 'boyfriend') => {
    setSelected(personality);
    onSelect(personality);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-4">
      <h1 className="text-3xl font-bold mb-8 text-white">Choose Your CyberLover</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
        <button
          onClick={() => handleSelect('girlfriend')}
          className={`p-6 rounded-xl border-2 transition-all ${
            selected === 'girlfriend'
              ? 'border-pink-500 bg-pink-900/20'
              : 'border-gray-700 hover:border-pink-700 bg-gray-800'
          }`}
        >
          <div className="text-center">
            <div className="text-4xl mb-4">👩</div>
            <h2 className="text-xl font-semibold mb-2 text-white">Cyber Girlfriend</h2>
            <p className="text-gray-300">
              A caring and understanding AI companion who will be there for you
            </p>
          </div>
        </button>

        <button
          onClick={() => handleSelect('boyfriend')}
          className={`p-6 rounded-xl border-2 transition-all ${
            selected === 'boyfriend'
              ? 'border-blue-500 bg-blue-900/20'
              : 'border-gray-700 hover:border-blue-700 bg-gray-800'
          }`}
        >
          <div className="text-center">
            <div className="text-4xl mb-4">👨</div>
            <h2 className="text-xl font-semibold mb-2 text-white">Cyber Boyfriend</h2>
            <p className="text-gray-300">
              A supportive and affectionate AI companion who will be there for you
            </p>
          </div>
        </button>
      </div>
    </div>
  );
} 