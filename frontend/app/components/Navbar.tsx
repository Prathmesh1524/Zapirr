"use client"
import Link from "next/link"
import { navData } from "../data"
import { SlArrowDown} from "react-icons/sl";
import {ButtonComp } from "./Button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { GrClose } from "react-icons/gr";

export default function Navbar() {
    const  router = useRouter();
    return (
        <div className=" container mx-auto  border-b-1 px-7 border-slate-200 shadow-xl bg-stone-100 pt-2 "
            data-aos="fade-up"
            data-aos-offset="100">
            <div className="flex items-center justify-between">
                <ul className="flex  gap-2 ">
                        <div className="flex mb-0">
                        <div className="text-3xl text-orange-500 font-extrabold">__</div>
                    <Link href={"/"}> <div className="text-3xl font-extrabold font-sans pb-1.5  ">zapier</div></Link>
                        {navData.map((items, index) => {
                            return <li key={index} className= "hidden md:flex flex-row hover:bg-stone-200 px-3  cursor-pointer  items-center  gap-1"> 
                                {items.name}
                                <SlArrowDown className="text-sm pt-1" />
                            </li>
                        })}
                        </div>

                </ul>
               
                <div className="flex gap-3">
                <div className="hidden md:flex flex-row gap-5  ">
                    <Link className="pt-1 hover:bg-stone-200 px-2" href={"/"}>Explore apps</Link>
                    <Link className="pt-1 hover:bg-stone-200 px-2"  href={"/"}>contact sales</Link>
            
                </div>
                        <div>
                    <Link className="pt-1 hover:bg-stone-200 px-5 font-medium"  href="/signup"> Signup </Link>                            
                <ButtonComp  size="small"
                onClick={()=> 
                    router.push("/signin")
                }  > 
                    Signin </ButtonComp>
                </div>
                </div>

            </div>
        </div>

    )
}