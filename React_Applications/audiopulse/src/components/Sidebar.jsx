import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { HiOutlineMenu } from'react-icons/hi';
import { RiCloseLine } from'react-icons/ri';

import { logoAP } from '../assets/constants';
import { links } from '../assets/constants';

// Component for reusing the navigation bar on both mobile and desktop
const NavLinks = ({ handleClick }) => (
  <div className='mt-10'>
    {links.map((item) => (
      <NavLink 
      key={item.name}
      to={item.to}
      className="flex flex-row justify-start items-center my-8 text-sm font-medium text-gray-400 hover:text-pink-300"
      /* If handleClick exists only then call it (call only on mobile devices) */
      onClick={() => handleClick && handleClick()}> 
        <item.icon className='w-6 h-6 mr-2'/>
        {item.name}
      </NavLink>
    ))};
  </div>
);

const Sidebar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <> {/* This is just a react fragment */}
      <div className="md:flex hidden flex-col w-[240px] py-10 px-4 bg-[#1e131e]">
        <img src={logoAP} alt="logo" className="w-full h-18 object-contain"/>
        <NavLinks />
      </div>

      {/* Mobile Sidebar. This div is just the icon to open menu (mobile) */}
      <div className="absolute md:hidden block top-6 right-3"> 
        {mobileMenuOpen ? ( 
          <RiCloseLine className="w-6 h-6 text-white mr-2" onClick={() => setMobileMenuOpen(false)}/> /* self closing icon */ 
          ) : (
          <HiOutlineMenu className="w-6 h-6 text-white mr-2" onClick={() => setMobileMenuOpen(true)}/>
          )}
      </div>

      <div className={`absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white/10 to-[#a8517d]
                      backdrop-blur-lg z-10 p-6 md:hidden smooth-transition ${mobileMenuOpen ? 'left-0' : '-left-full'}`}>
        <img src={logoAP} alt="logo" className="w-full h-14 object-contain"/>
        <NavLinks handleClick={() => setMobileMenuOpen(false)}/>
      </div>
    </>
  )
};

export default Sidebar;
