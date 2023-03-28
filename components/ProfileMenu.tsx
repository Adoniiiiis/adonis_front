import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { BsGearFill } from 'react-icons/bs';
import { useState } from 'react';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { LOGOUT_USER } from '@/Redux/Reducers/UserSlice';
import { useRouter } from 'next/router';
import useAuth from '@/context/AuthContext';

export default function ProfileMenu() {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const { logout }: any = useAuth();

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    setAnchorEl(null);
    logout();
    dispatch(LOGOUT_USER());
    router.push('/login');
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <BsGearFill size={30} color="#27272A" />
      </Button>
      <Menu
        elevation={0}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <div className="border-gray-300 border-2 rounded-md">
          <MenuItem onClick={handleClose}>
            <Link href="/changePassword">Changer mon mot de passe</Link>
          </MenuItem>
          <MenuItem onClick={handleLogout}>Me déconnecter</MenuItem>
        </div>
      </Menu>
    </div>
  );
}
