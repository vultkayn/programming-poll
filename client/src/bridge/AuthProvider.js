import debug from "debug";
import React, { useEffect } from "react";
import { redirect } from "react-router-dom";

const AuthContext = React.createContext(null);
export default AuthContext;

function handleRedirect(error, codes = [301, 302, 303]) {
  if (codes.includes(error.response.status)) {
    console.log("status included error res is: ", error.response);
    // FIXME improve security check of redirection message
    if (error.response.data !== "" && error.response.data[0] === "/") {
      return redirect(error.response.data);
    }
  }
  return false;
}

export function AuthProvider({ children, apiClient }) {
  const [identity, setIdentity] = React.useState({});

  useEffect(() => {
    const requestInterceptor = apiClient.interceptors.request.use((config) => {
      if (typeof config.data === FormData) {
        let object = {};
        config.data.forEach((value, key) => (object[key] = value));
        config.data = JSON.stringify(object);
      }
      return config;
    });

    const responseInterceptor = apiClient.interceptors.response.use((res) => {
      if (res.data && res.status >= 200 && res.status < 300) {
        if ("univID" in res.data)
          setIdentity({ ...identity, univID: res.data.univID });
        if ("email" in res.data)
          setIdentity({ ...identity, email: res.data.email });
        if ("id" in res.data) setIdentity({ ...identity, id: res.data.id });
      }
      return res;
    });

    return () => {
      apiClient.interceptors.request.eject(requestInterceptor);
      apiClient.interceptors.response.eject(responseInterceptor);
    };
  }, [apiClient]);

  // Action of /account/login
  async function login({ request, params }) {
    try {
      setIdentity({});
      const formData = await request.formData();
      const body = Object.fromEntries(formData);
      const response = await apiClient.post("/api/auth/login", body);
      return response.data;
    } catch (error) {
      debug("bta-poll-client:auth")("AuthProvider::login failed with", error);
      console.error("AuthProvider::login failed with", error);
      return error.response.data; // FIXME report error type.
    }
  }

  async function logout() {
    try {
      const response = await apiClient.get("/api/auth/logout");
      setIdentity({});
      return handleRedirect({ response: response });
    } catch (error) {
      const redirect = handleRedirect(error);
      if (redirect !== false) return redirect;

      debug("bta-poll-client:auth")("AuthProvider::logout failed with", error);
      return error.response.data;
    }
  }

  // Action of /account/signup
  async function signup({ request, params }) {
    try {
      setIdentity({});
      const formData = await request.formData();
      const userInfos = Object.fromEntries(formData);
      const response = await apiClient.post("/api/auth", userInfos);
      return response.data;
    } catch (error) {
      debug("bta-poll-client:auth")("AuthProvider::signup failed with", error);
      return error.response.data;
    }
  }

  async function get() {
    try {
      const response = await apiClient.get("/api/users");
      return response.data;
    } catch (error) {
      const redirect = handleRedirect(error);
      if (redirect !== false) return redirect;

      debug("bta-poll-client:auth")("AuthProvider::get failed with", error);
      return error.response.data;
    }
  }

  // Action of /profile
  async function update({request, params}) {
    try {
      const formData = await request.formData();
      const updates = Object.fromEntries(formData);
      const response = await apiClient.put("/api/users", updates);
      return response.data;
    } catch (error) {
      let redirect = handleRedirect(error);
      if (redirect !== false) return redirect;

      debug("bta-poll-client:auth")("AuthProvider::update failed with", error);
      return error.response.data;
    }
  }

  function logged() {
    return (
      identity !== null &&
      ("univID" in identity || "id" in identity || "email" in identity)
    );
  }

  const context = {
    identity,
    login,
    logout,
    signup,
    update,
    get,
    logged,
    send: apiClient.request,
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
}
