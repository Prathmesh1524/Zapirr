
"use client"
import { useState } from "react";
import { InputComponent } from "../components/Input";
import axios from "axios";
import { useRouter } from "next/navigation";
import { BACKEND_URL } from "../config";
import Navbar from "../components/Navbar";


export default function SininPage  () {
    const router = useRouter()
    const [email,setemail] = useState("");
    const [password,setpassword] = useState("");
    return (
        <>
        <Navbar/>
        <div className="flex flex-col md:flex-row text-center justify-center items-center h-screen pr-4">
            <div className="flex  flex-col md:flex-row md:justify-center p-11 gap-11">

            <div className="max-w-[80vh] pb-10">
                <h2 className="text-2xl font-bold pb-4">Automate across your teams</h2>
                <p className="tex-md pb-10">Zapier Enterprise empowers everyone in your business to securely automate their work in minutes, not months—no coding required.</p>
                <button  className="bg-indigo-500 hover:bg-indigo-600 px-7 py-3 cursor-pointer text-white font-bold" >Explore Zapier Enterprise</button>
            </div>
         
            </div>
            <div className="flex flex-col md:h-[50vh] w-[50vh] md:w-[70vh] border bg-stone-50 hover:bg-stone-100 p-6 gap-8">
            <div className="text-3xl font-bold">Login</div>
             <InputComponent label="Email" type="text" placeholder="Email" onChange={e =>{
                  setemail(e.target.value)
             }} />
              <InputComponent label="Password" type="password" placeholder="Password" onChange={e =>{
                setpassword(e.target.value)
            }} />
            <button
  onClick={async () => {
    try {
                    const res = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, {
                     username: email,
                        password,
                    });                    
                    localStorage.setItem("token", res.data.token);
                    console.log("Login successful:", res.data);
                    router.push("/dashboard");
                } catch (error) {
                    console.error("Login failed:", error);
                    
                    alert("Login failed. Please check your credentials.");
                }
            }}
            className="bg-indigo-500 rounded-full hover:bg-indigo-600 px-5 py-2 cursor-pointer text-white font-bold"
                >
                Login
                </button>


            </div>
        </div>
            </>
    )
}