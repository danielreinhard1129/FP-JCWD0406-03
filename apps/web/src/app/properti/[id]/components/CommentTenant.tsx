import Image from 'next/image';
import { useState } from 'react';

const CommentTenant = ({ item }: any) => {
  return (
    <>
      {item.TenantReply.map((i: any) => {
        return (
          <div key={i.id} className="mt-4">
            <h4 className="text-lg font-bold mb-2">Replies</h4>
            {/* Iterate through replies and display them */}

            <div className="bg-gray-100 p-2 rounded-lg mb-2 flex items-center">
              <Image
                width={24}
                height={24}
                className="mr-2 rounded-full"
                src={
                  i.image === null
                    ? '/images/no-profile.svg'
                    : `http://localhost:8000/photo-profile/${i.image}`
                }
                alt={''}
              />
              <div>
                <h5 className="text-sm font-bold">{i.usernameTenant}</h5>
                <p className="text-gray-600 text-sm">{i.reply}</p>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default CommentTenant;
