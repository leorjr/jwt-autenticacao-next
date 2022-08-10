import { authService } from "../services/auth/authService";

export async function getServerSideProps(ctx) {
  try {
    const session = await authService.getSession(ctx);
    return {
      props: {
        session,
      },
    };
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: "/?error=unauthorized",
      },
    };
  }
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
