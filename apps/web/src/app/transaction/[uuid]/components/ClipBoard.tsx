import { useState } from 'react';
import { FiClipboard } from 'react-icons/fi'; // Import library icon
import { toast } from 'react-toastify';

const ClipBoard: React.FC = () => {
  const [copySuccess, setCopySuccess] = useState(false);
  const [value, setValue] = useState('780 0112 6130 5188');
  const copyToClipboard = () => {
    navigator.clipboard.writeText(value);
    setCopySuccess(true);
    // Setelah 2 detik, kembalikan status copySuccess menjadi false
    setTimeout(() => {
      setCopySuccess(false);
    }, 1000);

    // Tampilkan toast setelah menyalin ke clipboard
    toast.success('Copied', {
      position: 'bottom-center',
      autoClose: 1000,
      theme: 'light',
    });
  };
  return (
    <div className="flex">
      <input
        type="text"
        value={value}
        className="px-4 py-3.5 bg-gray-100 text-[#333] w-full text-bold border rounded-md outline-none"
        onChange={(e) => setValue(e.target.value)}
        disabled
        readOnly
      />
      <button
        onClick={copyToClipboard}
        className="flex items-center justify-center px-3 border border-transparent rounded-md focus:outline-none  "
      >
        <FiClipboard className="h-5 w-5 text-gray-500" />
      </button>
    </div>
  );
};

export default ClipBoard;
