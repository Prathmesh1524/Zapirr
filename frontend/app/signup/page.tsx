
"use client"
import { useState } from "react";
import { InputComponent } from "../components/Input";
import axios from "axios";
import { useRouter } from "next/navigation";
import { BACKEND_URL } from "../config";
import Navbar from "../components/Navbar";



export default function SinUpPage  () {
    const router= useRouter();
    const [name,setname] =useState("")
    const [email,setemail] = useState("");
    const [password,setpassword] = useState("");
    return (
        <>
        <Navbar/>
        <div className="flex flex-col md:flex-row text-center justify-center items-center h-screen pr-4">
            <div className="flex  flex-col md:flex-row md:justify-center p-11 gap-11">

            <div className="max-w-[80vh] pb-10">
                <h2 className="text-2xl font-bold pb-4">AI Automation starts and scales with Zapier</h2>
                <p className="tex-md md:pb-10">Orchestrate AI across your teams, tools, and processes. Turn ideas into automated action today, and power tomorrow’s business growth.</p>
           
            </div>
         
            </div>
            <div className="flex flex-col md:h-[70vh] w-[50vh] md:w-[70vh] border bg-stone-50 hover:bg-stone-100 p-6 gap-8">
            <div className="text-3xl font-bold">Signup</div>
            <InputComponent label="Name" type="text" placeholder="Name" onChange={e =>{
                console.log(e.target.value)
                  setname(e.target.value)
             }} />
             <InputComponent label="Email" type="text" placeholder="Email" onChange={e =>{
                 console.log(e.target.value)
                  setemail(e.target.value)
             }} />
              <InputComponent label="Password" type="password" placeholder="Password" onChange={e =>{
                console.log(e.target.value)
                setpassword(e.target.value)
            }} />
                <button onClick={async ()=>{
                    try{

                        const res= await axios.post(`${BACKEND_URL}/api/v1/user/signup`,{
                            username:email,
                            name,
                            password
                        })
                        router.push("/signin")
                    }catch(err){    
                        console.log(err)
                    }
                    
                }}
                
                className="bg-indigo-500 rounded-full hover:bg-indigo-600 px-4 py-2 cursor-pointer text-white font-bold">Signup</button>

            </div>
        </div>
                </>
    )
}