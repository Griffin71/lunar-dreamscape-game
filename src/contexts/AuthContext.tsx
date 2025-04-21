
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User, AuthContextType } from "@/types";

// Sample avatar URLs - in a real app, these would be stored in a database
const avatarOptions = [
  "/avatars/avatar-1.png",
  "/avatars/avatar-2.png",
  "/avatars/avatar-3.png",
  "/avatars/avatar-4.png",
  "/avatars/avatar-5.png",
];

// Create auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data for development
const MOCK_USER: User = {
  id: "user-001",
  username: "luna_player",
  email: "player@example.com",
  avatar: avatarOptions[0],
  bio: "Cosmic explorer and puzzle solver",
  createdAt: new Date(),
  highScores: {
    "luna-dash": 2500,
    "lunas-light": 1800,
    "shadowbound": 750,
  },
};

// Helper function to generate username suggestions
const generateUsernameSuggestions = (username: string): string[] => {
  const suggestions: string[] = [];
  
  // Add a random number
  suggestions.push(`${username}${Math.floor(Math.random() * 1000)}`);
  
  // Add a prefix
  const prefixes = ["cosmic_", "lunar_", "star_", "astral_"];
  suggestions.push(`${prefixes[Math.floor(Math.random() * prefixes.length)]}${username}`);
  
  // Add a suffix
  const suffixes = ["_player", "_gamer", "_cosmic", "_explorer"];
  suggestions.push(`${username}${suffixes[Math.floor(Math.random() * suffixes.length)]}`);
  
  return suggestions;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [suggestedUsernames, setSuggestedUsernames] = useState<string[]>([]);
  
  // Simulate loading user from storage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Update localStorage when user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const signIn = async (email: string, password: string) => {
    // In a real app, this would make an API request
    setIsLoading(true);
    
    // Simulate network request
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    if (email === "player@example.com" && password === "password") {
      setUser(MOCK_USER);
    } else {
      throw new Error("Invalid email or password");
    }
    
    setIsLoading(false);
  };

  const signUp = async (email: string, username: string, password: string) => {
    // In a real app, this would make an API request
    setIsLoading(true);
    
    // Simulate network request
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Simulate email uniqueness check
    if (email === "player@example.com") {
      throw new Error("Email already in use");
    }
    
    // Create a new user
    const newUser: User = {
      id: `user-${Math.random().toString(36).substring(2, 9)}`,
      username,
      email,
      avatar: avatarOptions[Math.floor(Math.random() * avatarOptions.length)],
      bio: "",
      createdAt: new Date(),
      highScores: {},
    };
    
    setUser(newUser);
    setIsLoading(false);
  };

  const signOut = () => {
    setUser(null);
  };

  const checkUsernameAvailability = async (username: string): Promise<boolean> => {
    // Simulate API request
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    // For demo purposes: username "luna_player" is taken
    const isAvailable = username !== "luna_player";
    
    if (!isAvailable) {
      setSuggestedUsernames(generateUsernameSuggestions(username));
    }
    
    return isAvailable;
  };

  const updateProfile = async (data: Partial<User>) => {
    setIsLoading(true);
    
    // Simulate network request
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    if (user) {
      setUser({
        ...user,
        ...data,
      });
    }
    
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        suggestedUsernames,
        signIn,
        signUp,
        signOut,
        checkUsernameAvailability,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
