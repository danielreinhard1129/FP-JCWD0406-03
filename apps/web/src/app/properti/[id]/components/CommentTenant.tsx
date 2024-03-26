import Image from 'next/image';
import { useState } from 'react';

const CommentTenant = ({ item }: any) => {
  const [value, setValue] = useState('');

  return (
    <>
      <div className="mt-4">
        <h4 className="text-lg font-bold mb-2">Replies</h4>
        {/* Iterate through replies and display them */}

        <div className="bg-gray-100 p-2 rounded-lg mb-2 flex items-center">
          <Image
            width={24}
            height={24}
            className="mr-2 rounded-full"
            src={'/images/no-profile.svg'}
            alt={''}
          />
          <div>
            <h5 className="text-sm font-bold">asdsad</h5>
            <p className="text-gray-600 text-sm">asdasasd</p>
          </div>
        </div>

        {/* Input for reply */}
        <div className="flex items-center">
          <input
            type="text"
            onChange={(e) => setValue(e.target.value)}
            name="reply"
            className="border rounded-l-lg py-1 px-2 focus:outline-none focus:ring-2 focus:ring-gray-300 flex-grow"
            placeholder="Write a reply..."
          />
          <button className="bg-gray-300 text-gray-700 py-1 px-4 rounded-r-lg focus:outline-none hover:bg-gray-400">
            Reply
          </button>
        </div>
      </div>
    </>
  );
};

export default CommentTenant;
