import NextTopLoader from "nextjs-toploader";
import LoginCard from "./components/CardLogin";

const page = () => {
  return (
    <main className=" mx-auto w-[100%] md:pt-0 lg:pt-0 pt-12 bg-login">
      <NextTopLoader color="#ffffff" showSpinner={false} />

      <LoginCard />
    </main>
  );
};

export default page;
