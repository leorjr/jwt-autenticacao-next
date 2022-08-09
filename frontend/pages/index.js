import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function HomeScreen() {
  const router = useRouter();

  const [values, setValues] = useState({
    usuario: "leonardo",
    senha: "123456",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    router.push("/auth-page-ssr");
    // router.push("/auth-page-static");
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
    </div>
  );
}
