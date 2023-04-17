import React, { createContext, useState, useContext, useEffect } from 'react';
import LoginAxios from '@/Axios/LoginAxios';
import { useRouter } from 'next/router';
import RegisterAxios from '@/Axios/RegisterAxios';
import { RegisterType } from '@/Types/RegisterType';
import Axios from 'axios';
import { toast } from 'react-toastify';
import { loginResponseType } from '@/Types/LoginResponseType';
import { registerResponseType } from '@/Types/RegisterResponseType';
import { userType } from '@/Types/UserType';
import { useDispatch } from 'react-redux';
import { ADD_USER } from '@/Redux/Reducers/UserSlice';
import { languageStrings } from '@/utils/languageStrings';

type AuthContextType = {
  getToken: () => string;
  getUser: () => userType;
  errors: string | null;
  login: (email: string, password: string) => void;
  register: (data: RegisterType, isTermsChecked: boolean) => void;
  logout: () => void;
};

const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: any) => {
  const router = useRouter();
  const [user, setUser] = useState<object | null>(null);
  const [errors, setErrors] = useState<string | null>(null);
  const dispatch = useDispatch();
  const [langStrings, setLangStrings] = useState<any>(null);

  useEffect(() => {
    setLangStrings(languageStrings);
  }, [languageStrings]);

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
    router.push('/');
  };

  const getToken = () => {
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('token') != 'undefined') {
        const token: any = localStorage.getItem('token');
        const userToken = JSON.parse(token);
        return userToken;
      }
    }
  };

  const getUser = () => {
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('user') != 'undefined' || null) {
        const userToken: any = localStorage.getItem('user');
        const userData = JSON.parse(userToken);
        return userData;
      }
    }
  };

  const login = (email: string, password: string) => {
    LoginAxios(email, password).then((res: loginResponseType) => {
      if (res.status === 'success') {
        toast.success(
          `${langStrings && langStrings.toastLogin} ${res.user.username}!`
        );
        dispatch(ADD_USER(res.user));
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
            RegisterAxios(data).then((res: registerResponseType) => {
              if (res && res.status === 'error') {
                setErrors(res.message);
              } else {
                toast.success(langStrings && langStrings.toastRegister);
                dispatch(ADD_USER(res.user));
                router.push('/login');
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
    // const token = getToken();
    // const logoutAxios = Axios.create({
    //   baseURL: 'http://localhost',
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // });
    // logoutAxios.post('/logout').then(() => {
    localStorage.clear();
    setUser(null);
    toast.success(langStrings && langStrings.toastLogout);
    router.push('/login');
    // });
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
