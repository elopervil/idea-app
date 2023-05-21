import React, { useReducer, createContext } from "react";
import jwtDecode from "jwt-decode";

//Creamos un estado inicial
const initialState = {
  user: null,
};

//Comprobamos si existe algun token en el localstorage y si este esta caducado.
if (localStorage.getItem("token")) {
  const decodedToken = jwtDecode(localStorage.getItem("token"));

  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("token");
  } else {
    initialState.user = decodedToken;
  }
}

//Creamos el contexto de Autenticacion
const AuthContext = createContext({
  user: null,
  login: (userData) => {},
  logout: () => {},
});

/*Creamos funcion para utilizar en el hook useReducer de React,
Segun la accion a realizar LOGIN o LOGOUT asi actualizara el estado de nuestro contexto*/
function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}

//Provider de autenticacion
function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (userData) => {
    localStorage.setItem("token", userData.token);
    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  };

  function logout() {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
  }

  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />
  );
}

export { AuthContext, AuthProvider };
