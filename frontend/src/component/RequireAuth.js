import { useEffect, useState } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { validateToken } from "./Auth";

export function RequireAuth({ children, role }) {
  const [isValid, setIsValid] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const checkToken = async () => {
      const data = await validateToken();
      if (data && (!role || data.role === role)) {
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    };

    setIsValid(null);
    checkToken();
  }, [role]);

  console.log({ isValid });

  if (isValid === null) {
    return <div>Loading...</div>;
  }

  if (isValid === false) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
