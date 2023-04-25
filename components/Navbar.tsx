import React, { FC, useState, useEffect } from 'react';
import colors from 'tailwindcss/colors';
import { languageStrings } from '@/utils/languageStrings';
import {
  BsHouseDoor,
  BsHouseDoorFill,
  BsBookmark,
  BsBookmarkFill,
  BsPerson,
  BsFillPersonFill,
  BsGear,
  BsGearFill,
} from 'react-icons/bs';
import { useRouter } from 'next/router';
import useLang from '@/hooks/useLang';

const Navbar: FC = () => {
  const router = useRouter();
  const [desktopNavbarFull, setDesktopNavbarFull] = useState<boolean>(false);
  const langStrings = useLang();

  const listPages = [
    {
      name: langStrings && langStrings.settings,
      routeName: '/settings',
      routeSubNames: ['/settings/new-password', '/settings/appearance'],
      icon: {
        default: <BsGear color="white" size={32} />,
        active: (
          <BsGearFill
            className="drop-shadow-[0_0px_12px_rgba(34,211,238,.5)]"
            color={colors.cyan[400]}
            size={32}
          />
        ),
      },
    },
    {
      name: langStrings && langStrings.homepage,
      routeName: '/',
      icon: {
        default: <BsHouseDoor color="white" size={32} />,
        active: (
          <BsHouseDoorFill
            className="drop-shadow-[0_0px_12px_rgba(34,211,238,.5)]"
            color={colors.cyan[400]}
            size={32}
          />
        ),
      },
    },
    {
      name: langStrings && langStrings.bookmarks,
      routeName: '/bookmarks',
      icon: {
        default: <BsBookmark color="white" size={32} />,
        active: (
          <BsBookmarkFill
            className="drop-shadow-[0_0px_12px_rgba(34,211,238,.5)]"
            color={colors.cyan[400]}
            size={32}
          />
        ),
      },
    },
    {
      name: langStrings && langStrings.profile,
      routeName: '/profile',
      icon: {
        default: <BsPerson color="white" size={32} />,
        active: (
          <BsFillPersonFill
            className="drop-shadow-[0_0px_12px_rgba(34,211,238,.5)]"
            color={colors.cyan[400]}
            size={32}
          />
        ),
      },
    },
  ];

  return (
    <>
      {/* Phone navbar */}
      <div className="lg:hidden flex flex-row bg-zinc-800 rounded-full fixed z-10 bottom-8 justify-around w-80 h-14 left-1/2 -translate-x-1/2 overflow-hidden">
        {listPages.map((el, i) => (
          <>
            {router.pathname === el.routeName ||
            (el.routeSubNames && el.routeSubNames.includes(router.pathname)) ? (
              <>
                <div
                  className={`h-1.5 w-1.5 absolute rounded-full bottom-1 transition-all ease-in-out bg-cyan-400 ${
                    i === 0
                      ? 'left-[37px]'
                      : i === 1
                      ? 'left-[117px]'
                      : i === 2
                      ? 'right-[117px]'
                      : 'right-[37px]'
                  } `}
                />
                <div className="my-auto pb-1">{el.icon.active}</div>
              </>
            ) : (
              <div
                onClick={() => router.push(el.routeName)}
                className="my-auto pb-1"
              >
                {el.icon.default}
              </div>
            )}
          </>
        ))}
      </div>

      {/* Desktop navbar */}
      <div
        onMouseOver={() => setDesktopNavbarFull(true)}
        onMouseOut={() => setDesktopNavbarFull(false)}
        className={`lg:flex lg:fixed z-0 shrink-0 hidden flex-col bg-zinc-800 font-medium rounded-r-[5px] justify-center h-screen gap-y-8 ${
          desktopNavbarFull ? 'w-56' : 'w-20'
        } transition-all ease-in-out overflow-hidden text-white`}
      >
        {listPages.map((el, i) => (
          <>
            {router.pathname === el.routeName ||
            (el.routeSubNames && el.routeSubNames.includes(router.pathname)) ? (
              <div className="flex flex-row cursor-pointer pl-6 relative">
                <div
                  className={`h-full py-[25px] bottom-[-6px] w-1 hidden lg:block absolute rounded-[5px] left-0 transition-all duration-300 bg-cyan-400`}
                />
                <div className="pb-1">{el.icon.active}</div>
                <div
                  className={`mt-1 ml-4 text-cyan-400 transition-all opacity-1 duration-150 ${
                    desktopNavbarFull || 'opacity-0'
                  }`}
                >
                  {langStrings && el.name.toUpperCase()}
                </div>
              </div>
            ) : (
              <div
                onClick={() => router.push(el.routeName)}
                className="pb-1 flex flex-row cursor-pointer pl-6"
              >
                <div>{el.icon.default}</div>
                <div
                  className={`mt-1 ml-4 opacity-1 transition-all duration-150 ${
                    desktopNavbarFull || 'opacity-0'
                  }`}
                >
                  {langStrings && el.name.toUpperCase()}
                </div>
              </div>
            )}
          </>
        ))}
      </div>
    </>
  );
};

export default Navbar;
