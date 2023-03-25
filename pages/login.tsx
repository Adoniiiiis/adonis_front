import React, { useState } from 'react';
import Link from 'next/link';
import LoginAxios from '@/Axios/LoginAxios';
import { useRouter } from 'next/router';
import { ADD_USER } from '@/Redux/Reducers/UserSlice';
import { useDispatch } from 'react-redux';
import { LoginAxiosType } from '../Types/LoginAxiosType';

export default function login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRememberMeClicked, setIsRememberMeClicked] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { push } = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    LoginAxios(email, password, isRememberMeClicked).then(
      (res: LoginAxiosType) => {
        if (res.status === 'success') {
          dispatch(ADD_USER(res.userData));
          push('/');
        } else {
          setErrorMessage(res.message);
        }
      }
    );
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Connecte-toi à ton compte
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={(e) => handleSubmit(e)}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="yesmangaming@outlook.fr"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Mot de passe
                </label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      onClick={() =>
                        setIsRememberMeClicked(!isRememberMeClicked)
                      }
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Se souvenir de moi
                    </label>
                  </div>
                  <Link
                    href="/forgotPassword"
                    className="text-sm font-medium text-primary-600
                  hover:underline dark:text-primary-500 md:ml-24 ml-32"
                  >
                    Mot de passe oublié?
                  </Link>
                </div>
              </div>
              {errorMessage && (
                <p className="text-red-600 text-[1em] flex justify-center">
                  {errorMessage}
                </p>
              )}
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Se connecter
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Pas encore de compte?&nbsp;{' '}
                <Link
                  href="/register"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  S'inscrire
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
