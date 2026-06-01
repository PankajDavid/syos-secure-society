import { useState, createContext, useContext } from 'react';

type Role = 'super_admin' | 'society_admin' | 'guard' | 'resident';

interface RoleContext {
  role: Role;
  setRole: (r: Role) => void;
}

export const RoleCtx = createContext<RoleContext>({ role: 'society_admin', setRole: () => {} });

export function useRole() {
  return useContext(RoleCtx);
}
