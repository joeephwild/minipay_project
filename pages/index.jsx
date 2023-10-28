import Head from "next/head";
import Hero from "../components/Hero";
import Image from "next/image";
import { logo } from "../assets/images";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between bg-black px-9 py-[10px]">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <Image src={logo} alt="logo" className="h-8 w-8 mr-2" />
        <span className="font-semibold text-xl tracking-tight">Lacent</span>
      </div>
      <div className="block lg:hidden">
        <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default function Home() {
  // const { logIn, currentUser, modalOpen, setModalOpen } = useFlow();
  return (
    <div>
      <Navbar />
     <Hero />
    </div>
  );
}
