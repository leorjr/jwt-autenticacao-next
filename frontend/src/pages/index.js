import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { authService } from "../services/auth/authService";

export default function HomeScreen() {
  const router = useRouter();

  const [values, setValues] = useState({
    usuario: "omariosouto",
    senha: "safepassword",
  });

  const handleSubmit = (event) => {
    /**
     * HANDLESUBMIT:
     * está fazendo o papel de CONTROLLER;
     * Pega os dados do usuário e passa para o serviço executar determinada ação;
     */

    /**
     * AUTHSERVICE
     * Está fazendo o papel de serviço (contendo a regra de negócio da app);
     * Onde se encontra a lógica que será executada para algo;
     */

    event.preventDefault();

    authService
      .login({ username: values.usuario, password: values.senha })
      .then(() => {
        router.push("/auth-page-ssr");
        // router.push("/auth-page-static");
      })
      .catch((err) => {
        window.alert("Usuário ou senha incorretos");
      });
  };

  const handleChange = (event) => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;

    setValues((currentValues) => {
      return {
        ...currentValues,
        [fieldName]: fieldValue,
      };
    });
  };

  // useEffect(() => {
  //   console.log(values);
  // }, [values]);

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={(event) => handleSubmit(event)}>
        <input
          placeholder="Usuário"
          name="usuario"
          value={values.usuario}
          onChange={handleChange}
        />
        <input
          placeholder="Senha"
          name="senha"
          type="password"
          value={values.senha}
          onChange={handleChange}
        />
        <pre>{JSON.stringify(values, null, 2)}</pre>
        <div>
          <button>Entrar</button>
        </div>
      </form>
      <p>
        <a href="/auth-page-ssr">Auth Page SSR</a>
      </p>
      <p>
        <a href="/auth-page-static">Auth Page Static</a>
      </p>
    </div>
  );
}
