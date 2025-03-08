import { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoggedInStatus = async () => {
      try {
        const response = await fetch('http://localhost:8080/auth/check-auth', {
          credentials: 'include'
        });
        
        if (response.ok) {
          const userData = await response.json();
          setCurrentUser(userData);
        } else {
          setCurrentUser(null);
        }
      } catch (error) {
        console.error('Authentication check failed:', error);
        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkLoggedInStatus();
  }, []);

  const login = async (email, password) => {
    const response = await fetch('http://localhost:8080/auth/login-admin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', 
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }

    const userResponse = await fetch('http://localhost:8080/auth/check-auth', {
      credentials: 'include'
    });

    if (userResponse.ok) {
      const userData = await userResponse.json();
      setCurrentUser(userData);
      return userData;
    }
  };

  const logout = async () => {
    try {
      await fetch('http://localhost:8080/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      
      setCurrentUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const register = async (name, email, password) => {
    const response = await fetch('http://localhost:8080/auth/register-admin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Registration failed');
    }

    return await response.json();
  };

  const value = {
    currentUser,
    loading,
    login,
    logout,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);