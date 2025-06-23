"use client";
import Link from "next/link";
import Img1 from "../assets/img/fe1.png";
import Image from "next/image";
import { ButtonComp } from "./Button";
import { useRouter } from 'next/navigation';
import { BsGoogle } from "react-icons/bs";

export default function FirstComponent() {
  const router = useRouter();

  return (
    <div className=" flex flex-col pt-8 items-center  justify-center md:px-4 md:py-8 border-x-0 md:border-l md:border-r md:border-slate-300">
      <div className="flex flex-col md:flex-row  justify-center content-center md:items-center md:justify-between ">
        {/* Left content */}
        <div className="max-w-lg md:pl-26 justify-center items-center text-center ">
          <div
            className="text-md text-gray-900 mb-4"
            data-aos="fade-up"
            data-aos-delay="150"
          >
            Scale AI agents with Zapier
          </div>
          <h2
            className="text-4xl font-bold text-gray-700 pb-11"
            style={{ fontFamily: '"Degular Display", "Inter", sans-serif' }}
          >
            The most connected AI orchestration platform
          </h2>
          <div className="text-lg pb-10">
            Build and ship AI workflows in minutes—no IT bottlenecks, no complexity. Just results.
          </div>

          <div className="flex flex-col md:flex-row gap-5">
    <ButtonComp
    size="Big"
    onClick={() => {
        router.push('/signup');
    }}
  >
    Start free with login
  </ButtonComp>

  <button className=" justify-center cursor-pointer text-center md:px-10 bg-white px-4 py-2 border border-slate-300 hover:border-slate-500 hover:shadow-md hover:shadow-amber-200 flex items-center gap-2 rounded-md ">
    <BsGoogle className="text-xl" />
    Login with Google
  </button>
</div>

        </div>

        {/* Image */}
        <div className="md:mt-0 pt-5 md:pl-26 md:pr-26">
          <Image 
            data-aos="fade-left"
            data-aos-offset="200"
            src={Img1}
            alt="Zapier AI platform"
          />
        </div>
      </div>
      <div className="pt-6 text-md md:text-lg ">
        {/* img */}
        
        <p>Your complete toolkit for AI automation
        </p>
      </div>
    </div>
  );
}
