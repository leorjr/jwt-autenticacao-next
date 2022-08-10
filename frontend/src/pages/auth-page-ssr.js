import nookies from "nookies";
import { tokenService } from "../services/auth/tokenService";

export async function getServerSideProps(ctx) {
  const cookies = nookies.get(ctx);
  console.log("cookies", cookies);
  return {
    props: {
      token: tokenService.get(ctx),
    },
  };
}

function AuthPageSSR(props) {
  return (
    <div>
      <h1>Auth Page Server Side Render</h1>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </div>
  );
}

export default AuthPageSSR;
