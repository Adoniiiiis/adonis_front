import React, { createContext, useState, useContext, useEffect } from 'react';
import { axios } from '@/Axios/AxiosSetup';
import LoginAxios from '@/Axios/LoginAxios';
import { useRouter } from 'next/router';
import RegisterAxios from '@/Axios/RegisterAxios';
import { useDispatch } from 'react-redux';
import { ADD_USER } from '@/Redux/Reducers/UserSlice';
import { useCookies } from 'react-cookie';

const AuthContext = createContext({});

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(null);
  const [errors, setErrors] = useState<any>(null);
  const router = useRouter();
  const dispatch = useDispatch();
  // const [cookies, setCookie] = useCookies(['tokens']);

  // useEffect(() => {
  //   async function loadUserFromCookies() {
  //     const token = cookies['tokens'];
  //     if (token) {
  //     }
  //   }
  //   loadUserFromCookies();
  // }, []);

  // const getUser = () => {
  //   const request = axios({
  //     method: 'get',
  //     url: 'api/user',
  //   });
  //   request.then((res) => {
  //     console.log(res.data);
  //     setUser(res.data);
  //   });
  // };

  const login = async (
    email: string,
    password: string,
    isRememberMeClicked: boolean
  ) => {
    LoginAxios(email, password, isRememberMeClicked).then((res: any) => {
      if (res.status === 'success') {
        // getUser();
        dispatch(ADD_USER(res.userData));
        router.push('/');
      } else {
        setErrors(res.message);
      }
    });
  };

  const register = async ({ data, isTermsChecked }: any) => {
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
                // getUser();
                dispatch(ADD_USER(res.userData));
                router.push('/');
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
    axios.post('/logout').then(() => {
      setUser(null);
    });
  };

  return (
    <AuthContext.Provider value={{ user, errors, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
