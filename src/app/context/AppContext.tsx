import { createContext, useContext, useState, ReactNode } from 'react';

export type MoodType = 'casual' | 'elegant' | 'luxurious' | 'playful';

export interface InviteData {
  id: string;
  eventName: string;
  date: string;
  time: string;
  location: string;
  theme: string;
  language: string;
  animated: boolean;
  mood: MoodType;
  customColors?: {
    primary: string;
    secondary: string;
    text: string;
  };
  copyVariant?: 'formal' | 'fun' | 'minimal';
  description?: string;
  createdAt: string;
}

interface AppContextType {
  invites: InviteData[];
  currentInvite: InviteData | null;
  setCurrentInvite: (invite: InviteData | null) => void;
  saveInvite: (invite: InviteData) => void;
  deleteInvite: (id: string) => void;
  updateInvite: (id: string, updates: Partial<InviteData>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [invites, setInvites] = useState<InviteData[]>([]);
  const [currentInvite, setCurrentInvite] = useState<InviteData | null>(null);

  const saveInvite = (invite: InviteData) => {
    setInvites(prev => {
      const existing = prev.find(i => i.id === invite.id);
      if (existing) {
        return prev.map(i => i.id === invite.id ? invite : i);
      }
      return [...prev, invite];
    });
  };

  const deleteInvite = (id: string) => {
    setInvites(prev => prev.filter(i => i.id !== id));
  };

  const updateInvite = (id: string, updates: Partial<InviteData>) => {
    setInvites(prev => prev.map(i => i.id === id ? { ...i, ...updates } : i));
    if (currentInvite?.id === id) {
      setCurrentInvite({ ...currentInvite, ...updates });
    }
  };

  return (
    <AppContext.Provider value={{
      invites,
      currentInvite,
      setCurrentInvite,
      saveInvite,
      deleteInvite,
      updateInvite,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};