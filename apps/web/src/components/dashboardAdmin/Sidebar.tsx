'use client';
import { useAppSelector } from '@/lib/hooks';
import Image from 'next/image';
import Link from 'next/link';
import {
  MdAttachMoney,
  MdDashboard,
  MdShoppingBag,
  MdSupervisedUserCircle,
} from 'react-icons/md';

const menuItems = [
  {
    title: 'Pages',
    list: [
      {
        title: 'Dashboard',
        path: '/admin',
        icon: <MdDashboard />,
      },
      {
        title: 'Property',
        path: '/admin/property',
        icon: <MdSupervisedUserCircle />,
      },
      {
        title: 'Room',
        path: '/admin/room',
        icon: <MdShoppingBag />,
      },
      {
        title: 'Transactions',
        path: '/admin/transaction',
        icon: <MdAttachMoney />,
      },
    ],
  },
];

const CardSidebar = () => {
  const user = useAppSelector((state) => state.user);
  const { id } = useAppSelector((state) => state.user);

  const imageUrl = user?.image
    ? `http://localhost:8000/photo-profile/${user.image}`
    : '/images/no-profile.svg';

  return (
    <div className="sticky min-h-[100vh]">
      <div className="flex items-center gap-5 mb-[20px]">
        <Image
          className="rounded-full object-cover"
          src={imageUrl}
          alt="gambar logo"
          width="50"
          height="50"
        />
        <div className="flex flex-col">
          <p className="font-[500]">{user.username}</p>
        </div>
      </div>
      <ul className="list-none">
        {menuItems.map((category) => (
          <li key={category.title}>
            <span className="text-[#b7bac1] font-bold text-[13px] my-[10px] mx-0">
              {category.title}
            </span>
            {category.list.map((item) => (
              <Link
                href={item.path}
                key={item.title}
                className={`p-[20px] flex items-center gap-[10px] hover:bg-[#2e374a] my-[5px] mx-0`}
              >
                {item.icon}
                {item.title}
              </Link>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CardSidebar;
