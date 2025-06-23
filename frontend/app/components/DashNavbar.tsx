import Link from "next/link"
import { ButtonComp } from "./Button"

export default function DashNavbar (){
    return (
        <div className="">
            
            <div className=" border-b-1 px-7 border-slate-200 shadow-xl bg-stone-100 pt-2 "
            data-aos="fade-up"
            data-aos-offset="100">
            <div className="flex items-center justify-between">
                <ul className="flex  gap-2 ">
                        <div className="flex mb-0">
                        <div className="text-3xl text-orange-500 font-extrabold">__</div>
                    <Link href={"/"}> <div className="text-3xl font-extrabold font-sans pb-1.5  ">zapier</div></Link>
                       
                        </div>

                </ul>
               
                <div className="flex gap-3">
                <div className="hidden md:flex flex-row gap-5  ">
                    <Link className="pt-1 hover:bg-stone-200 px-2" href={"/"}>Explore apps</Link>
                    <Link className="pt-1 hover:bg-stone-200 px-2"  href={"/"}>contact sales</Link>

            
                </div>
                        <div>
                    <Link className="pt-1 hover:bg-stone-200 px-5 font-medium"  href="/signup">  </Link>                            
                    <button className=" bg-indigo-500 rounded-md hover:bg-indigo-600 px-5 py-2 cursor-pointer text-white font-bold">upgrade </button>
                </div>
                </div>

            </div>
        </div>

        </div>
    )
}