import ForgotPasswordAxios from '@/Axios/ForgotPasswordAxios';
import ResetPasswordAxios from '@/Axios/ResetPasswordAxios';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';

export default function resetPassword() {
  const [password, setPassword] = useState('');
  const [password_confirmation, setConfirmPassword] = useState('');
  const [isBtnDisplayed, setIsBtnDisplayed] = useState(false);
  const router = useRouter();
  const token: any = router.query['token][email'];
  const email: any = router.query.email;

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    ResetPasswordAxios(token, email, password, password_confirmation);
  };

  useEffect(() => {
    if (
      password !== '' &&
      password_confirmation !== '' &&
      password === password_confirmation
    ) {
      setIsBtnDisplayed(true);
    } else {
      setIsBtnDisplayed(false);
    }
  }, [password, password_confirmation]);

  const submitBtn = isBtnDisplayed ? (
    <button
      type="submit"
      className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
    >
      Réinitialiser mon mot de passe
    </button>
  ) : (
    <button
      type="button"
      className="disabled:opacity-50 w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
      disabled
    >
      Réinitialiser mon mot de passe
    </button>
  );

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white -mb-[10px]">
              Changer mon mot de passe
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={(e) => handleSubmit(e)}
            >
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Nouveau mot de passe
                </label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  name="password"
                  id="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="yesmangaming@outlook.fr"
                />
              </div>

              <div>
                <label
                  htmlFor="confirm_password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirmation du nouveau mot de passe
                </label>
                <input
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type="password"
                  name="confirm_password"
                  id="confirm_password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="yesmangaming@outlook.fr"
                />
              </div>

              {submitBtn}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
