import nookies from "nookies";

const REFRESH_TOKEN_NAME = "REFRESH_TOKEN_NAME";

const controllers = {
  async storeRefreshToken(req, res) {
    const ctx = { req, res };

    // console.log("refresh", req.body);

    nookies.set(ctx, REFRESH_TOKEN_NAME, req.body.refresh_token, {
      httpOnly: true,
      sameSite: "lax",
    });

    res.json({
      data: {
        message: "Stored with success!",
      },
    });
  },
  //   async getInformation(req, res) {
  //     res.json({
  //       status: 404,
  //       message: "Not Found",
  //     });
  //   },
  async getInformation(req, res) {
    const ctx = { req, res };

    res.json({
      status: 201,
      //   cookies: req.cookies,
      cookies: nookies.get(ctx),
    });
  },
  async regerenareToken(req, res) {
    const ctx = { req, res };

    const cookies = nookies.get(ctx);
    const refresh_token = cookies[REFRESH_TOKEN_NAME];

    const url = "http://localhost:4000/api/refresh";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh_token }),
    };

    const refreshedResponse = await fetch(url, options)
      .then(async (res) => {
        const resposta = await res.json();
        return resposta;
      })
      .catch((err) => {
        return err;
      });

    try {
      nookies.set(
        ctx,
        REFRESH_TOKEN_NAME,
        refreshedResponse.data.refresh_token,
        {
          httpOnly: true,
          sameSite: "lax",
        }
      );

      res.json({ refreshedResponse });
    } catch (err) {
      res.status(401).json({ msg: "unauthorized", status: 401 });
    }
  },
};

const controllerBy = {
  POST: controllers.storeRefreshToken,
  //   GET: controllers.getInformation,
  GET: controllers.regerenareToken,
};

export default function handler(request, response) {
  //   if (controllerBy[request.method])
  //     return controllerBy[request.method](request, response);

  //   response.status(404).json({
  //     status: 404,
  //     message: "Not Found",
  //   });

  return controllerBy[request.method](request, response);
}
