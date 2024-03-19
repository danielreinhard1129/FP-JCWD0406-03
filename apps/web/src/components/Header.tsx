'use client';

import { loginAction, logoutAction } from '@/lib/features/userSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { baseUrl } from '@/utils/config';
import axios from 'axios';
import { X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { toast } from 'react-toastify';
import Button1 from './ui/button1';

function Header() {
  const router = useRouter();

  const [menu, setMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const toggleMenu = () => {
    setMenu(!menu);
  };
  const user = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();

  const handleLogout = () => {
    localStorage.removeItem('token_auth');
    dispatch(logoutAction());
    toast.success(' Logout  successful', {
      position: 'top-center',
      autoClose: 1000,
      theme: 'light',
    });

    router.push('/login');
  };
  useEffect(() => {
    const token = localStorage.getItem('token_auth');

    const keepLogin = async () => {
      try {
        const { data } = await axios.get(baseUrl + '/user/keeplogin', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch(loginAction(data.data));
      } catch (error) {
        console.log(error);
      }
    };
    keepLogin();
  }, []);

  return (
    <>
      <div className="md:sticky md:top-0   bg-blue-900 md:shadow-none z-20 ">
        {/* DESKTOP */}
        <div className=" hidden lg:block animate-in fade-in zoom-in px-12 mx-auto p-4 ">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center text-[25px]">
              <Image src="/images/logo.png" alt="logo" width={40} height={30} />
              <h1 className=" text-white font-bold">
                Rumah.<span className=" text-orange-500">123</span>{' '}
              </h1>
            </Link>
            <div className="flex gap-[20px] xl:gap-[50px] text-[16px] items-center select-none">
              <p className={`nav-link gap-2`}>Destinations</p>
              <p className={` nav-link gap-2`}>Hotels</p>
              <p className={` nav-link gap-2`}>Flights</p>
              <p className={` nav-link gap-2`}>Bookings</p>
              {user.id ? (
                <div className="relative">
                  <button
                    className="bg-transparent hover:bg-green-600 text-orange-600 font-semibold hover:text-white py-2 px-6 border border-white hover:border-transparent rounded"
                    onClick={toggleDropdown}
                  >
                    {user.username}
                  </button>
                  {showDropdown && (
                    <div className="absolute top-[50px] left-0 w-[200px] bg-white rounded shadow-lg">
                      <ul>
                        <li className="px-4 py-2 hover:bg-gray-100">
                          <Link href={`/profile-user/${user.id}`}>
                            <p className="text-black">Profile</p>
                          </Link>
                        </li>
                        <li className="px-4 py-2 hover:bg-gray-100">
                          <button
                            onClick={handleLogout}
                            className="text-black hover:text-white"
                          >
                            Logout
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/login"
                  className="bg-transparent hover:bg-green-600 text-orange-600 font-semibold hover:text-white py-2 px-6 border border-white hover:border-transparent rounded"
                >
                  Login
                </Link>
              )}

              {/* button */}
              <Button1 />
            </div>
          </div>
        </div>

        {/* MOBILE */}
        <div
          className={` block lg:hidden shadow-sm  fixed top-0 w-full z-[9999]   py-4 animate-in fade-in zoom-in  ${
            menu ? ' bg-gray-500 py-2' : 'bg-blue-900'
          } `}
        >
          <div className="flex justify-between mx-[10px]">
            <div className="flex gap-[50px] text-[16px] items-center select-none">
              <Link href="/" className="flex items-center text-[25px]">
                <Image
                  src="/images/logo.png"
                  alt="logo"
                  width={40}
                  height={30}
                />
                <h1 className=" text-white font-bold">
                  Rumah.<span className=" text-orange-500">123</span>{' '}
                </h1>
              </Link>
            </div>
            <div className="flex items-center gap-[40px]">
              {menu ? (
                <X
                  className="cursor-pointer animate-in fade-in zoom-in text-black"
                  onClick={toggleMenu}
                />
              ) : (
                <GiHamburgerMenu
                  onClick={toggleMenu}
                  className="cursor-pointer animate-in fade-in zoom-in"
                />
              )}
            </div>
          </div>
          {menu ? (
            <div className="my-8 select-none animate-in slide-in-from-right ">
              <div className="flex flex-col gap-8 mt-8 mx-4 ">
                <div className="flex gap-[20px] xl:gap-[50px] text-[16px] flex-col select-none ">
                  <p className=" nav-link-mobile font-[600] cursor-pointer">
                    Destinations
                  </p>
                  <p className=" nav-link-mobile font-[600] cursor-pointer">
                    Hotels
                  </p>
                  <p className=" nav-link-mobile font-[600] cursor-pointer">
                    Flights
                  </p>

                  <p className=" nav-link-mobile font-[600] cursor-pointer">
                    Bookings
                  </p>

                  {user.id ? (
                    <div className="relative">
                      <button
                        className="bg-transparent hover:bg-green-600 text-orange-600 font-semibold hover:text-white py-2 px-6 border border-white hover:border-transparent rounded"
                        onClick={toggleDropdown}
                      >
                        {user.username}
                      </button>
                      {showDropdown && (
                        <div className="absolute top-[50px] left-0 w-[200px] bg-white rounded shadow-lg">
                          <ul>
                            <li className="px-4 py-2 hover:bg-gray-100">
                              <Link href={`/profile-user/${user.id}`}>
                                <p className="text-black">Profile</p>
                              </Link>
                            </li>
                            <li className="px-4 py-2 hover:bg-gray-100">
                              <button
                                onClick={handleLogout}
                                className="text-black hover:text-white"
                              >
                                Logout
                              </button>
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href="/login"
                      className="bg-transparent hover:bg-green-600 text-orange-600 font-semibold hover:text-white py-2 px-6 border border-white hover:border-transparent rounded"
                    >
                      Login
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </>
  );
}

export default Header;
