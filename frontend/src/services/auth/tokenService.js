import nookies from "nookies";

const ACCESS_TOKEN_KEY = "ACCESS_TOKEN_KEY";
const REFRESH_TOKEN_KEY = "REFRESH_TOKEN_KEY";

const ONE_SECOND = 1;
const ONE_MINUT = ONE_SECOND * 60;
const ONE_HOUR = ONE_MINUT * 60;
const ONE_DAY = ONE_HOUR * 24;
const ONE_YEAR = ONE_DAY * 365;

export const tokenService = {
  save: (accessToken, ctx = null) => {
    // localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    // sessionStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    nookies.set(ctx, ACCESS_TOKEN_KEY, accessToken, {
      maxAge: ONE_YEAR,
      path: "/",
    });
  },
  get: (ctx = null) => {
    // return localStorage.getItem(ACCESS_TOKEN_KEY);
    // return sessionStorage.getItem(ACCESS_TOKEN_KEY);
    const cookies = nookies.get(ctx);
    return cookies[ACCESS_TOKEN_KEY] || "";
  },
  delete: (ctx = null) => {
    // localStorage.removeItem(ACCESS_TOKEN_KEY);
    // sessionStorage.removeItem(ACCESS_TOKEN_KEY);
    nookies.destroy(ctx, ACCESS_TOKEN_KEY);
    nookies.destroy(ctx, REFRESH_TOKEN_KEY);
  },
};
