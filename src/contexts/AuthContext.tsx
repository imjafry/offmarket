import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  username: string;
  email: string;
  subscriptionType: 'basic' | 'premium';
  subscriptionExpiry: string;
  isActive: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkSubscription: () => boolean;
  extendSubscription: (days: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock users database (in real app, this would be an API)
  const mockUsers: User[] = [
    {
      id: '1',
      username: 'marie.dubois',
      email: 'marie.dubois@example.ch',
      subscriptionType: 'premium',
      // Set far-future expiry to simulate lifetime membership for testing
      subscriptionExpiry: '2099-12-31',
      isActive: true
    },
    {
      id: '2',
      username: 'pierre.martin',
      email: 'pierre.martin@example.ch',
      subscriptionType: 'basic',
      subscriptionExpiry: '2099-12-31',
      isActive: true
    },
    {
      id: '3',
      username: 'sophie.laurent',
      email: 'sophie.laurent@example.ch',
      subscriptionType: 'premium',
      subscriptionExpiry: '2023-01-15', // Expired intentionally
      isActive: false
    }
  ];

  // Check if user is logged in on app start
  useEffect(() => {
    const checkAuth = () => {
      const savedUser = localStorage.getItem('offmarket_user');
      if (savedUser) {
        const userData = JSON.parse(savedUser);
        // Check if subscription is still valid
        if (new Date(userData.subscriptionExpiry) > new Date()) {
          setUser(userData);
        } else {
          // Subscription expired
          localStorage.removeItem('offmarket_user');
          setUser(null);
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Find user in mock database
    const foundUser = mockUsers.find(u => u.username === username);
    
    if (foundUser && foundUser.isActive) {
      // Check subscription validity
      if (new Date(foundUser.subscriptionExpiry) > new Date()) {
        setUser(foundUser);
        localStorage.setItem('offmarket_user', JSON.stringify(foundUser));
        setIsLoading(false);
        return true;
      } else {
        // Subscription expired
        setIsLoading(false);
        return false;
      }
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('offmarket_user');
  };

  const checkSubscription = (): boolean => {
    if (!user) return false;
    return new Date(user.subscriptionExpiry) > new Date();
  };

  const extendSubscription = (days: number) => {
    if (user) {
      const newExpiry = new Date(user.subscriptionExpiry);
      newExpiry.setDate(newExpiry.getDate() + days);
      
      const updatedUser = {
        ...user,
        subscriptionExpiry: newExpiry.toISOString().split('T')[0]
      };
      
      setUser(updatedUser);
      localStorage.setItem('offmarket_user', JSON.stringify(updatedUser));
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user && checkSubscription(),
    isLoading,
    login,
    logout,
    checkSubscription,
    extendSubscription
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
