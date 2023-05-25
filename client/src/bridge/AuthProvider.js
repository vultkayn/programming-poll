import debug from "debug";
import React, { useContext, useEffect } from "react";
import { redirect } from "react-router-dom";

const AuthContext = React.createContext({
  identity: {},
  login: async (formData) => {},
  logout: async () => {},
  signup: async (formData) => {},
  update: async ({ request, params }) => {},
  get: async ({ params }) => {},
  logged: () => {},
});

function handleRedirect(error, codes = [301, 302, 303]) {
  if (codes.includes(error.response.status)) {
    console.log("status included error res is: ", error.response);
    // FIXME improve security check of redirection message
    if (error.response.data !== "" && error.response.data[0] === "/") {
      // BUG potential XSS
      return redirect(error.response.data);
    }
  }
  return false;
}

export function AuthProvider({ children, apiClient }) {
  const [identity, setIdentity] = React.useState({});

  useEffect(() => {
    console.log("provider: identity is", identity);
    return () => {};
  }, [identity]);

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
      let newIdentity = {};

      if ("univID" in res.data) newIdentity.univID = res.data.univID;
      if ("email" in res.data) newIdentity.email = res.data.email;
      if ("id" in res.data) newIdentity.id = res.data.id;

      setIdentity({ ...identity, ...newIdentity });
      return res;
    },
    (err) => {
      if (err.status == 304) {
        console.log("interceptors 304");
        let newIdentity = {};

        if ("univID" in err.data) newIdentity.univID = err.data.univID;
        if ("email" in err.data) newIdentity.email = err.data.email;
        if ("id" in err.data) newIdentity.id = err.data.id;
  
        setIdentity({ ...identity, ...newIdentity });
        return err;
      }
      return err;
    });

    return () => {
      console.error("Ejecting intercepts");
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
      await apiClient.post("/api/auth/login", body);
      return redirect("/");
    } catch (error) {
      return error.response;
    }
  }

  async function logout() {
    try {
      const response = await apiClient.get("/api/auth/logout");
      setIdentity({});
      return response.data;
    } catch (error) {
      const redirect = handleRedirect(error);
      if (redirect !== false) return redirect;

      debug("client:auth")("AuthProvider::logout failed with", error);
      return error.response;
    }
  }

  // Action of /account/signup
  async function signup(formData) {
    try {
      setIdentity({});
      const userInfos = Object.fromEntries(formData);
      const response = await apiClient.post("/api/auth", userInfos);
      return response.data;
    } catch (error) {
      debug("client:auth")("AuthProvider::signup failed with", error);
      return error.response;
    }
  }

  async function get() {
    try {
      const response = await apiClient.get("/api/users");
      return response.data;
    } catch (error) {
      const redirect = handleRedirect(error);
      if (redirect !== false) return redirect;

      debug("client:auth")("AuthProvider::get failed with", error);
      return error.response;
    }
  }

  // Action of /profile/edit
  async function update({ request, params }) {
    try {
      const formData = await request.formData();
      const updates = Object.fromEntries(formData);
      await apiClient.put("/api/users", updates);
      return redirect("/profile");
    } catch (error) {
      let redirect = handleRedirect(error);
      if (redirect !== false) return redirect;

      debug("client:auth")("AuthProvider::update failed with", error);
      return error.response;
    }
  }

  function logged() {
    return "univID" in identity || "email" in identity || "id" in identity;
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

export default function useAuth() {
  return useContext(AuthContext);
}
