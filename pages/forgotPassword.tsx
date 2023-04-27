import ForgotPasswordAxios from '@/Axios/ForgotPasswordAxios';
import React, { useState, useEffect } from 'react';

export default function ForgotPassword() {
  const [email, setEmail] = useState<string>('');
  const [isBtnDisplayed, setIsBtnDisplayed] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    ForgotPasswordAxios(email);
  };

  useEffect(() => {
    email !== '' && email.includes('@')
      ? setIsBtnDisplayed(true)
      : setIsBtnDisplayed(false);
  }, [email]);

  const submitBtn = isBtnDisplayed ? (
    <button
      type="submit"
      className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
    >
      Envoyer un email de récupération
    </button>
  ) : (
    <button
      type="button"
      className="disabled:opacity-50 w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
      disabled
    >
      Envoyer un email de récupération
    </button>
  );

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white -mb-[10px]">
              Mot de passe oublié?
            </h1>
            <p className="text-[0.9em] text-gray-700">
              Entre ton addresse email pour recevoir un email te permettant de
              récupérer ton mot de passe!
            </p>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={(e) => handleSubmit(e)}
            >
              <div className="-mt-[5px]">
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
              {submitBtn}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
