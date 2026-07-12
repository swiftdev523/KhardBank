import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import usersData from "../data/users.json";

const SESSION_KEY = "vaultis_session";

const AuthContext = createContext(null);

function readSession() {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function sanitizeUser(user) {
  const { password: _password, ...rest } = user;
  return rest;
}

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(usersData);
  const [currentUser, setCurrentUser] = useState(() => readSession());
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Restore session on load before routes render protected content.
    setCurrentUser(readSession());
    setReady(true);
  }, []);

  const login = useCallback(
    (username, password) => {
      const match = users.find(
        (u) =>
          u.username.toLowerCase() === username.trim().toLowerCase() &&
          u.password === password,
      );
      if (!match) {
        return { success: false, error: "Incorrect username or password." };
      }
      const sessionUser = sanitizeUser(match);
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
      setCurrentUser(sessionUser);
      return { success: true };
    },
    [users],
  );

  const signup = useCallback(({ username, password, name, email }) => {
    const id = `usr_${Date.now()}`;
    const avatarInitials = name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0].toUpperCase())
      .join("");

    const newUser = {
      id,
      username,
      password,
      name,
      email,
      avatarInitials: avatarInitials || username.slice(0, 2).toUpperCase(),
      memberSince: new Date().toISOString().slice(0, 10),
    };

    setUsers((prev) => [...prev, newUser]);
    const sessionUser = sanitizeUser(newUser);
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
    setCurrentUser(sessionUser);
    return { success: true };
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(SESSION_KEY);
    setCurrentUser(null);
  }, []);

  const value = useMemo(
    () => ({
      currentUser,
      isAuthenticated: Boolean(currentUser),
      ready,
      login,
      signup,
      logout,
    }),
    [currentUser, ready, login, signup, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
