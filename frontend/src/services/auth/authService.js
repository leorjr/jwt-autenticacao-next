import { tokenService } from "./tokenService";

export const authService = {
  login: async ({ username, password }) => {
    return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    }).then(async (response) => {
      if (!response.ok) throw new Error("Testeeeeee");

      const respostaFormatada = await response.json();

      //   console.log(respostaFormatada);

      tokenService.save(respostaFormatada.data.access_token);
    });
  },
  getSession: async (ctx = null) => {
    const token = tokenService.get(ctx);

    return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/session`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(async (response) => {
      const respostaFormatada = await response.json();

      if (!respostaFormatada.data) throw new Error("Não autorizado");

      return respostaFormatada;
    });
  },
};
