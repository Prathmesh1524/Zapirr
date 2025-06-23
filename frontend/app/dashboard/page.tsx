"use client";
import { act, useEffect, useState } from "react";
import DashNavbar from "../components/DashNavbar";
import { Sider } from "../components/Sider";
import axios from "axios";
import { SlArrowRight } from "react-icons/sl";
import { BACKEND_URL, WEBHOOK_URL } from "../config";
import { useRouter } from "next/navigation";
import Loader from "../loading";

// Type definition
interface Zap {
  id: string;
  userId: number;
  actions: {
    id: string;
    ZapID: string;
    actionID: string;
    sortingOrder: number;
    ActionType: {
      id: string;
      name: string;
      "image":string;
    };
  }[];
  trigger: {
    id: string;
    ZapID: string;
    triggerID: string;
    type: {
      id: string;
      name: string;
      "image": string;  
    };
  };
}

// Custom hook to fetch Zaps
function useZap() {
  const [loading, setLoading] = useState(true);
  const [zaps, setZaps] = useState<Zap[]>([]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/zap`, {
        headers: {
          Authorization: localStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log("Zaps response:", res.data);
        const zapData = Array.isArray(res.data.zaps) ? res.data.zaps : [];
        setZaps(zapData); 
      })
      .catch((err) => {
        console.error("Error fetching zaps:", err);
        setZaps([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return {
    loading,
    zaps,
  };
}

// Page Component
export default function DashboardPage() {
  const router= useRouter();
  const { loading, zaps } = useZap();

  return (
    <div>
      <DashNavbar />
      <div>
        <Sider/>
      </div>

      <div className="md:pl-64 px-9">
        <div className="md:px-52 flex flex-row justify-between items-center w-full h-16 bg-white">
          <div className="text-2xl font-bold">Zaps</div>
          <div>
            <button onClick={()=>{
                router.push("/zap/create")
            }}
             className="bg-indigo-500 rounded-md hover:bg-indigo-600 px-4 py-2 cursor-pointer text-white font-bold">
              Create
            </button>
          </div>
        </div>
      </div>

      <div className="md:px-64  px-4">
        {loading ? (
            <div className="flex pt-20 justify-center items-center">
          <Loader/>
            </div>
        ) : zaps.length === 0 ? (
          <div className="text-gray-500 pt-4">No Zaps found.</div>
        ) : (
          <Zapilist zaps={zaps} />
        )}
      </div>
    </div>
  );
}

// Zap list rendering component
 function Zapilist({ zaps }: { zaps: Zap[] }) {
    const router = useRouter()
  return (
    <div className="md:pl-16 flex h-[70vh] justify-center ">
      <table className="table-auto w-full border ">
        <thead>
          <tr className="bg-slate-200 border">
            <th>zap ID</th>
            <th className="p-2 text-left"> ID</th>
            <th className="p-2 text-left">Trigger  Name</th>
            <th className="p-2 text-left">Actions</th>
            <th className="p-2 text-left">WebHook URL</th>
            <th className="p-2 text-left"></th>
          </tr>
        </thead>
        <tbody>
          {zaps.map((z) => (
            <tr key={z.id} className="border-t hover:bg-slate-100 transition-colors duration-200">
                <table className="p-2 flex justify-center items-center pt-14 ml-6 w-[50px] h-[40px]"> <img  src={z.trigger.type.image}/></table>
              <td className="p-2">{z.trigger?.type?.id ?? "N/A"}</td>
              <td className="p-2">{z.trigger?.type?.name ?? "N/A"}</td>
              <td className="p-2">
                {z.actions?.length > 0 ? (
                  z.actions.map((action) => (
                    <div className="w-[50px] h-[40px] flex justify-center items-center  gap-x-3" key={action.id}>
                      <img className=" flex flex-col  py-2.5 pb-3" src={action.ActionType.image} alt="" />
                      <div>

                      {action.ActionType.name} 
                      </div>
                    </div>
                  ))
                  
                ) : (
                  <div className="text-gray-400">No Actions</div>
                )}
              </td>
              <div className="pl-8">{`${WEBHOOK_URL}/catch/1/${z.id}`}</div>
              <div className="justify-end flex items-center">
              <button onClick={()=>{
                router.push("/zap" + z.id); 
              }} className="  cursor-pointer hover:shadow-2xl "><SlArrowRight/></button>
              </div>

              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
