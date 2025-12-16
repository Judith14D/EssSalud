import LoginCard from "../../components/login/LoginCard";
import loginBg from "../../assets/images/FondoImg.jpg";

export default function Login() {
  return (
    <div
      className="relative min-h-screen w-full 
      bg-cover bg-center bg-no-repeat 
      flex items-center justify-center px-4"
      style={{
        backgroundImage: `url(${loginBg})`,
      }}
    >
      <LoginCard />
    </div>
  );
}
