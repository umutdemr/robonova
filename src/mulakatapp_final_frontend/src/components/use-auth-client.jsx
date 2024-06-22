import { AuthClient } from "@dfinity/auth-client";
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const defaultOptions = {
  createOptions: {
    idleOptions: {
      disableIdle: true,
    },
  },
  identityProvider:
    process.env.DFX_NETWORK === "ic"
      ? "https://identity.ic0.app"
      : "http://localhost:4943?canisterId=dmalx-m4aaa-aaaaa-qaanq-cai",
};

export const useAuthClient = (options = defaultOptions) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authClient, setAuthClient] = useState(null);
  const [identity, setIdentity] = useState(null);
  const [principal, setPrincipal] = useState(null);

  useEffect(() => {
    AuthClient.create(options.createOptions)
      .then(async (client) => {
        await updateAuthState(client);
      })
      .catch((error) => console.error("Error creating auth client:", error));
  }, []);

  const login = () => {
    authClient.login({
      ...options.loginOptions,
      onSuccess: () => {
        updateAuthState(authClient);
      },
    });
  };

  async function updateAuthState(client) {
    try {
      const isAuthenticated = await client.isAuthenticated();
      setIsAuthenticated(isAuthenticated);

      const identity = client.getIdentity();
      setIdentity(identity);

      const principal = identity.getPrincipal();
      setPrincipal(principal);

      setAuthClient(client);
    } catch (error) {
      console.error("Error updating auth state:", error);
    }
  }

  async function logout() {
    try {
      await authClient?.logout();
      await updateAuthState(authClient);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  }

  return {
    isAuthenticated,
    login,
    logout,
    authClient,
    identity,
    principal,
  };
};

export const AuthProvider = ({ children }) => {
  const auth = useAuthClient();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
