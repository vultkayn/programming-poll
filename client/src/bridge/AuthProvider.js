import debug from "debug";
import React, { useEffect } from "react";

const AuthContext = React.createContext(null);
export default AuthContext;

export function AuthProvider ({ children, apiClient }) {
  const [identity, setIdentity] = React.useState({});

  useEffect(() => {
    const requestInterceptor = apiClient.interceptors.request.use(
      (config) => {
        if (typeof(config.data) === FormData) {
          let object = {};
          config.data.forEach((value, key) => object[key] = value);
          config.data = JSON.stringify(object);
        }
        return config;
      }
    );

    const responseInterceptor = apiClient.interceptors.response.use(
      (res) => {
        if (res.data && res.status >= 200 && res.status < 300) {
          if ("univID" in res.data) setIdentity({...identity, univID: res.data.univID});
          if ("email" in res.data) setIdentity({...identity, email: res.data.email});
          if ("id" in res.data) setIdentity({...identity, id: res.data.id});
        }
        return res;
      }
    );

    return (() => {
      apiClient.interceptors.eject(requestInterceptor);
      apiClient.interceptors.eject(responseInterceptor);
    });
  }, [apiClient]);


  async function login (formData) {
    try {
      const response = await apiClient.post('/api/auth/login', formData);
      return response.data;
    } catch (error) {
      debug("bta-poll-client:auth")("AuthProvider::login failed with", error);
      return {};
    }
  }

  async function signup (formData) {
    try {
      const response = await apiClient.post('/api/auth', formData);
      return response.data;
    } catch (error) {
      debug("bta-poll-client:auth")("AuthProvider::signup failed with", error);
      return {};
    }
  }
  
  async function get () {
    try {
      const response = await apiClient.get('/api/users');
      return response.data;
    } catch (error) {
      debug("bta-poll-client:auth")("AuthProvider::get failed with", error);
      return {};
    }
  }

  async function update (formData) {
    try {
      const response = await apiClient.put('/api/users', formData);
      return response.data;
    } catch (error) {
      debug("bta-poll-client:auth")("AuthProvider::update failed with", error);
      return {};
    }
  }

  const context = {
    identity,
    login,
    signup,
    update,
    get,
    send: apiClient.request,
  };

  return (
    <AuthContext.Provider value={context}>
      {children}
    </AuthContext.Provider>
  );
}