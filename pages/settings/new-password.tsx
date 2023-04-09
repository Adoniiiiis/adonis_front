import ChangePasswordAxios from '@/Axios/ChangePasswordAxios';
import { reduxUserType } from '@/Types/ReduxUserType';
import SettingsLayout from '@/layouts/SettingsLayout';
import { languageStrings } from '@/utils/languageStrings';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

export default function NewPassword() {
  const [password, setPassword] = useState('');
  const [password_confirmation, setConfirmPassword] = useState('');
  const [isBtnDisplayed, setIsBtnDisplayed] = useState(false);
  const userId: number = useSelector((state: reduxUserType) => state.user.id);
  const [langStrings, setLangStrings] = useState<any>(null);

  useEffect(() => {
    setLangStrings(languageStrings);
  }, [languageStrings]);

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (
      password !== '' &&
      password_confirmation !== '' &&
      password.length >= 3 &&
      password === password_confirmation
    ) {
      ChangePasswordAxios(userId, password, password_confirmation).then(() => {
        toast.success(langStrings && langStrings.toastPasswordChange);
      });
    }
  };

  useEffect(() => {
    if (
      password !== '' &&
      password_confirmation !== '' &&
      password === password_confirmation &&
      password.length >= 3
    ) {
      setIsBtnDisplayed(true);
    } else {
      setIsBtnDisplayed(false);
    }
  }, [password, password_confirmation]);

  const submitBtn = isBtnDisplayed ? (
    <button
      type="submit"
      className="cursor-pointer w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
    >
      Changer mon mot de passe
    </button>
  ) : (
    <button
      type="button"
      className="cursor-not-allowed disabled:opacity-50 w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
      disabled
    >
      Changer mon mot de passe
    </button>
  );

  return (
    <SettingsLayout>
      <section>
        <div className="flex flex-col">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white mb-4 mt-4">
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
                placeholder="******"
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
                placeholder="******"
              />
            </div>

            {submitBtn}
          </form>
        </div>
      </section>
    </SettingsLayout>
  );
}
