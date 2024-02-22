import NextTopLoader from "nextjs-toploader";
import RegisterCard from "./components/Register.user";

const Register = () => {
  return (
    <main className=" mx-auto w-[100%] md:pt-0 lg:pt-0 pt-12 bg-banner">
      <NextTopLoader color="#ffffff" showSpinner={false} />
      <RegisterCard />
    </main>
  );
};

export default Register;
