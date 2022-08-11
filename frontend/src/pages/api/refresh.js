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
};

const controllerBy = {
  POST: controllers.storeRefreshToken,
  GET: controllers.getInformation,
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
