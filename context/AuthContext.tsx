import React, { createContext, useState, useContext, useEffect } from 'react';
import LoginAxios from '@/Axios/LoginAxios';
import { useRouter } from 'next/router';
import RegisterAxios from '@/Axios/RegisterAxios';
import { RegisterType } from '@/Types/RegisterType';
import Axios from 'axios';
import { toast } from 'react-toastify';

const AuthContext = createContext({});

export const AuthProvider = ({ children }: any) => {
  const router = useRouter();
  const [user, setUser] = useState<object | null>(null);
  const [errors, setErrors] = useState<any>(null);
  // const [token, setToken] = useState<any>(null);

  useEffect(() => {
    function authRedirect() {
      const userToken = getToken();
      if (!user) {
        if (!userToken) {
          router.push('/login');
        } else {
          router.push(router.pathname);
        }
      }
    }
    authRedirect();
  }, []);

  const saveTokenAndRedirect = (user: object, token: string) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', JSON.stringify(token));
    setUser(user);
    setToken(token);
    router.push('/');
  };

  const getToken = () => {
    const token: any = localStorage.getItem('token');
    const userToken = token && JSON.parse(token);
    return userToken;
  };

  const getUser = () => {
    const userToken: any = localStorage.getItem('user');
    const userData = userToken && JSON.parse(userToken);
    return userData;
  };

  const login = (email: string, password: string) => {
    LoginAxios(email, password).then((res: any) => {
      if (res.status === 'success') {
        const notify = () => toast.success(`Bienvenue ${res.user.username}!`);
        notify();
        saveTokenAndRedirect(res.user, res.access_token);
      } else {
        setErrors(res.message);
      }
    });
  };

  const register = (data: RegisterType, isTermsChecked: boolean) => {
    if (
      data.name !== '' &&
      data.email !== '' &&
      data.username !== '' &&
      data.password !== '' &&
      data.confirm_password !== ''
    ) {
      if (data.password.length >= 3) {
        if (data.password === data.confirm_password) {
          if (isTermsChecked) {
            RegisterAxios(data).then((res: any) => {
              if (res && res.status === 'error') {
                setErrors(res.message);
              } else {
                const notify = () => toast.success('Compte créé avec succès!');
                notify();
                saveTokenAndRedirect(res.user, res.access_token);
              }
            });
          } else {
            setErrors('*Vous devez accepter les termes et conditions');
          }
        } else {
          setErrors('*Les deux mots de passe doivent être identiques');
        }
      } else {
        setErrors('*Le mot de passe doit faire au moins 3 caractères');
      }
    } else {
      setErrors('*Veuillez remplir tous les champs');
    }
  };

  const logout = () => {
    const token = getToken();
    const logoutAxios = Axios.create({
      baseURL: 'http://localhost',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    logoutAxios.post('/logout').then(() => {
      localStorage.clear();
      setUser(null);
      const notify = () => toast.success('Vous êtes déconnecté');
      notify();
      router.push('/login');
    });
  };

  return (
    <AuthContext.Provider
      value={{
        getToken,
        getUser,
        errors,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
