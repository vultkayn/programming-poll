import React, { useEffect } from "react";

const AuthContext = React.createContext(null);
export default AuthContext;

export function AuthProvider ({ children, apiClient }) {
  useEffect(() => {
    const requestInterceptor = apiClient.interceptors.request.use(
      (config) => {
        if (typeof config.data === FormData) {
          let object = {};
          config.data.forEach((value, key) => object[key] = value);
          config.data = JSON.stringify(object);
        }
      }
    );


    return (() => {
      apiClient.interceptors.eject(requestInterceptor);
    });
  }, [apiClient]);


  async function login (formData) {
    try {
      const response = await apiClient.post(`/api/auth/login`, formData);
      return response.data;
    } catch (error) {
      console.error(error);
      return {};
    }
  }

  async function get () {

  }

  const context = {
    login,
    signup,
    send: apiClient.request,
  };

  return (
    <AuthContext.Provider value={context}>
      {children}
    </AuthContext.Provider>
  );
}