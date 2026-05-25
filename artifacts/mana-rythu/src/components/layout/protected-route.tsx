import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Redirect, Route } from "wouter";

export function ProtectedRoute({ 
  component: Component, 
  roles,
  path,
  ...rest 
}: { 
  component: React.ComponentType<any>, 
  roles?: string[],
  path: string
}) {
  const { isAuthenticated, user } = useAuth();

  return (
    <Route path={path} {...rest}>
      {(params) => {
        if (!isAuthenticated || !user) {
          return <Redirect to="/login" />;
        }

        if (roles && !roles.includes(user.role)) {
          return <Redirect to="/" />;
        }

        return <Component {...params} />;
      }}
    </Route>
  );
}
