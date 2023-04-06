import React, { FC, useState } from 'react';
import colors from 'tailwindcss/colors';
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

const listPages = [
  {
    name: 'Paramètres',
    routeName: '/parameters',
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
    name: 'Accueil',
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
    name: 'Favoris',
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
    name: 'Profil',
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

const Navbar: FC = () => {
  const router = useRouter();
  const [desktopNavbarFull, setDesktopNavbarFull] = useState(true);

  return (
    <>
      {/* Phone navbar */}
      <div className="lg:hidden flex flex-row bg-zinc-800 rounded-full fixed bottom-8 justify-around w-80 h-14 left-1/2 -translate-x-1/2 overflow-hidden">
        {listPages.map((el, i) => (
          <>
            {el.routeName === router.pathname ? (
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
        className={`lg:flex shrink-0 hidden flex-col font-medium bg-zinc-800 rounded-r-[5px] justify-center gap-y-8 ${
          desktopNavbarFull ? 'w-56' : 'w-20'
        } transition-all ease-in-out h-screen overflow-hidden text-white`}
      >
        {listPages.map((el, i) => (
          <>
            {el.routeName === router.pathname ? (
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
                  {el.name.toUpperCase()}
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
                  {el.name.toUpperCase()}
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
