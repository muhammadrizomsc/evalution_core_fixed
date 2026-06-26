import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore, type UserRole } from "@/stores/auth-store";

interface Props {
  allowedRoles?: UserRole[];
}

export function PrivateRoute({ allowedRoles }: Props) {
  const { user, initialized, loading } = useAuthStore();

  if (!initialized || loading) {
    return (
      <div className="flex min-h-svh items-center justify-center">
        <div className="size-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
