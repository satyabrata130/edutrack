import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";

export function useAuth() {
  const {
    login,
    clear,
    isAuthenticated,
    isInitializing,
    isLoggingIn,
    identity,
    loginStatus,
  } = useInternetIdentity();

  const queryClient = useQueryClient();

  const logout = () => {
    clear();
    queryClient.clear();
  };

  const principalText = identity?.getPrincipal()?.toString() ?? null;

  return {
    login,
    logout,
    isAuthenticated,
    isInitializing,
    isLoggingIn,
    identity,
    principalText,
    loginStatus,
  };
}
