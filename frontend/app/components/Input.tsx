"use client";
export const InputComponent = ({label ,placeholder,type ="text",onChange}:{
    label:string;
    placeholder:string;
    type? : "text"| "password";
    onChange : (e:React.ChangeEvent<HTMLInputElement>) => void;
}) => {
    return <div className="">
        <div className="pb-2 font-bold ">{label}</div>
        <input  className="md:w-[50vh] px-5 py-2 border font-bold" type={type} placeholder={placeholder} onChange={onChange} />
    </div>
}