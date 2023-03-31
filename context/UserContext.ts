import { createContext, useContext, useState } from 'react';

export const UserContext = createContext(null);

export function useUserContext() {
  return useContext(UserContext);
}
