"use client"

import { ReactNode } from "react";


export const ButtonComp = ( {children,onClick,size= "small"} :{ 
  children: ReactNode,
  onClick: ()=> void,
  size?: "Big"| "small"
 }) =>{
return (
  <button onClick={onClick} className={`${size==="small" ? "text-lg rounded-full font-semibold cursor-pointer " : ""}
   ${size==="Big" ? " rounded-lg px-3 md:px-6 text-lg md:text-xl hover:shadow-lg  py-2 hover:shadow-amber-300  text-center cursor-pointer": "text-md px-6"}
   bg-orange-500 hover:bg-orange-600 text-white curosr-pointer 
  `}>
{children}
  </button>
)
}