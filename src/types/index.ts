
export interface User {
  id: string;
  username: string;
  email: string;
  avatar: string;
  bio: string;
  createdAt: Date;
  highScores: Record<string, number>;
}

export interface Game {
  id: string;
  title: string;
  description: string;
  mood: 'calm' | 'bold' | 'cozy' | 'curious' | 'romantic' | 'reflective' | 'playful';
  coverImage: string;
  vibe: string;
  gameplay: string;
  colorTheme: string;
}

export interface LeaderboardEntry {
  userId: string;
  username: string;
  avatar: string;
  gameId: string;
  score: number;
  timestamp: Date;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  suggestedUsernames: string[];
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, username: string, password: string) => Promise<void>;
  signOut: () => void;
  checkUsernameAvailability: (username: string) => Promise<boolean>;
  updateProfile: (data: Partial<User>) => Promise<void>;
}
