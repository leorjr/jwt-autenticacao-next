import { tokenService } from "../services/auth/tokenService";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function LogoutPage() {
  const router = useRouter();
  const urlServerSideNextAPi = "http://localhost:3000/api/refresh";

  useEffect(async () => {
    tokenService.delete();
    // try {
    //   tokenService.delete();

    //   //   await fetch(urlServerSideNextAPi, {
    //   //     method: "DELETE",
    //   //   });
    // } catch (err) {
    //   alert(err);
    // }

    setTimeout(() => {
      router.push("/");
    }, 1000);
  }, []);

  return (
    <>
      <p>Você será deslogado em instantes...</p>
    </>
  );
}
