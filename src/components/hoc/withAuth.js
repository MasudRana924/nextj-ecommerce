"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    const { token } = useSelector((state) => state.login);

    useEffect(() => {
      if (!token) {
        router.push("/login"); // Redirect to login if not authenticated
      }
    }, [token, router]);

    // Render the component only if authenticated
    if (!token) {
      return null; // Optionally, display a loading spinner
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
