import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Worker } from '@workspace/api-client-react';

export type UserRole = 'worker' | 'insurer' | null;

interface AuthState {
  role: UserRole;
  worker: Worker | null;
  isAuthenticated: boolean;
  loginWorker: (worker: Worker) => void;
  loginInsurer: () => void;
  logout: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      role: null,
      worker: null,
      isAuthenticated: false,
      loginWorker: (worker) => set({ role: 'worker', worker, isAuthenticated: true }),
      loginInsurer: () => set({ role: 'insurer', worker: null, isAuthenticated: true }),
      logout: () => set({ role: null, worker: null, isAuthenticated: false }),
    }),
    {
      name: 'hustlesafe-auth',
    }
  )
);
