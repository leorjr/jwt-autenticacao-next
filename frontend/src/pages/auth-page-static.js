import React, { useEffect, useState } from "react";
import { authService } from "../services/auth/authService";
import { useRouter } from "next/router";

const useSession = () => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    authService
      .getSession()
      .then((response) => {
        setSession(response.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return {
    data: session,
    loading,
    error,
  };
};

function AuthPageStatic(props) {
  const router = useRouter();
  const session = useSession();

  if (!session.loading && !session.data) {
    console.log("redireciona o usuário para a home");
    router.push("/?error=401");
  }

  return (
    <div>
      <p>
        <a href="/logout">Logout</a>
      </p>
      <h1>Auth Page Static</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}

export default AuthPageStatic;
