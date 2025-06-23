import { SlOptions } from "react-icons/sl";
export const ZapCell = ({ name, index,onClick }: {
    name?: string;
    index: number
    onClick?: () => void;   
}) => {
    return (
        <div onClick={onClick} className="border border-black w-md gap-5 flex justify-center text-center text-2xl ">
            <div className=" px-7 py-7  flex  gap-5 ">
                
                    <div className="font-bold text-2x  ">
                        {index}
                    </div>
                    {name}
            </div>
            <button  className="cursor-pointer flex pl-36 pt-8">
                    <SlOptions />
                    </button>
        </div>

    )
}