import { createContext, useContext, useReducer, useEffect } from "react";
import { checkAuthStatus, logoutUser } from "../services/authService";

const AuthContext = createContext();

const initialState = {
  user: null,
  loading: true,
};

function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload, loading: false };
    case "LOGOUT":
      return { ...state, user: null, loading: false };
    case "SET_LOADING":
      return {...state, loading: true};
    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // useEffect to await 
  useEffect(() => {
    async function fetchAuth() {
      const user = await checkAuthStatus();
      if (user) {
        dispatch({ type: "LOGIN", payload: user });
      } else {
        dispatch({ type: "LOGOUT" });
      }
    }
    fetchAuth();
  }, []);

  const login = (userData) => {
    dispatch({ type: "LOGIN", payload: userData });
  };

  const logout = async () => {
    await logoutUser();
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook for using auth context
export function useAuth() {
  return useContext(AuthContext);
}