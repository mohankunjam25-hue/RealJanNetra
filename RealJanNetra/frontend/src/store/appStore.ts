import { create } from 'zustand';
import type { User, UserLocation } from '../types';

interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  currentLocation: UserLocation;
  
  // Actions
  setUser: (user: User | null) => void;
  setAuth: (status: boolean) => void;
  updateLocation: (location: Partial<UserLocation>) => void;
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  isAuthenticated: false,
  currentLocation: {
    state: 'Madhya Pradesh',
    district: 'Bhopal',
    block: 'Bhopal North',
    village: 'Arera Colony'
  },

  setUser: (user) => set({ user }),
  setAuth: (status) => set({ isAuthenticated: status }),
  updateLocation: (newLoc) => set((state) => ({
    currentLocation: { ...state.currentLocation, ...newLoc }
  })),
}));
