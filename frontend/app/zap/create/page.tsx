"use client"
import { ButtonComp } from "@/app/components/Button";
import DashNavbar from "@/app/components/DashNavbar";
import { ZapCell } from "@/app/components/ZapCell";
import { BACKEND_URL } from "@/app/config";
import axios from "axios";
import { on } from "events";
import { useRouter } from "next/navigation";
import { act, useEffect, useState } from "react";


function useavaliablethings() {
  const [avaliableAction, setavaliableAction] = useState([])
  const [avaliableTrigger, setavaliableTrigger] = useState([]);

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/v1/trigger/available`)
      .then(x => setavaliableTrigger(x.data.availableTrigger))

    axios.get(`${BACKEND_URL}/api/v1/actions/available`)
      .then(x => setavaliableAction(x.data.availableActions))

      console.log("avaliableAction", avaliableAction);
    console.log("avaliableTrigger", avaliableTrigger);
      

  }, [])
  return {
    avaliableAction,
    avaliableTrigger
  }
}

export default function CreateZap() {
  
  const { avaliableAction, avaliableTrigger } = useavaliablethings()
  const [seletedTrigger, setselectedTrigger] = useState<{
    id: string;
    name: string;
  }>();
  const [selectedActions, setselectedActiions] = useState<{
    index: number,
    avaliableActionId: string,
    avaliableAcionName: string
  }[]>([]);

  const [showModal, setShowModal] = useState<null | number>(null);
  const router = useRouter();
  return (
    <div className="h-[70vh]">
      <DashNavbar />
      <div className="bg-slate-200 w-full flex justify-end items-center px-4 md:px-8 py-3">
                <button
                 onClick={()=>{
                  if(!seletedTrigger?.id) {
                    alert("Please select a trigger first")
                    return;
                  }
                  axios.post(`${BACKEND_URL}/api/v1/zap`,{
                        "AvaliableTriggerID": seletedTrigger.id,
                    "triggerMetadata": {},
                    "actions": selectedActions.map( x => ({
                        AvaliableActionId: x.avaliableActionId,
                        "actionMetadata": {}
                    }))
              },{
                headers:{
                  Authorization: localStorage.getItem("token")
                }
              })
                router.push("/dashboard")
                 }}
         className=" justify-end rounded-lg px-3 md:px-6 text-lg md:text-xl hover:shadow-lg  py-2 hover:shadow-amber-300  text-center cursor-pointer bg-orange-500 hover:bg-orange-600 text-white curosr-pointer ">
          Publish</button>
           </div>


      <div className="w-full flex flex-col  min-h-screen bg-slate-200 justify-center items-center ">
        <ZapCell onClick={() => {
          setShowModal(1)
        }} name={seletedTrigger ? seletedTrigger.name : "Trigger"} index={1} />
        <div className="">
          {selectedActions.map((action, ind) => <div className="pt-4 flex justify-center text-center">
            <ZapCell onClick={() => {
              setShowModal(action.index)
            }} name={action.avaliableAcionName ? action.avaliableAcionName : "Action"} index={action.index} />
          </div>
          )}
        </div>
        <div className=" pt-5">
          <div onClick={() => {
            setselectedActiions(a => [...a, {
              index: a.length + 2,
              avaliableActionId: "",
              avaliableAcionName: ""
            }])
          }} className="cursor-pointer text-2xl  ">+</div>
        </div>
        {showModal && <Modal index={showModal} availableItems={showModal === 1 ? avaliableTrigger : avaliableAction}
          onSelect={(props: { name: string, id: string } | null) => {
            if (props === null) {
              setShowModal(null);
              return
            }
            if (showModal === 1) {
              setselectedTrigger({
                id: props.id,
                name: props.name
              })
            } else {
              setselectedActiions(a => {
                let newActions = [...a];
                newActions[showModal - 2] = {
                  index: showModal,
                  avaliableActionId: props.id,
                  avaliableAcionName: props.name
                }

                return newActions;
              });
            }


          }} />}
      </div>
    </div>
  )
}






function Modal({ type, index, onSelect, availableItems }: {
  type?: "actions" | "trigger"; index: number; onSelect: ((props: null | { name: string, id: string })
    => void), availableItems: { id: string, name: string, image: string }[]
    
})
 {
  return (
    <div className="relative inset-0   flex justify-center  items-center ">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <button
          type="button"
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-900 cursor-pointer"
          onClick={onSelect.bind(null, null)}
        >
          <svg
            className="w-4 h-4"

            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
        </button>

        {/* Modal Content */}
        <div className="text-center">
          <button className="mb-5 cursor-pointer text-lg font-normal w-[30vh]   text-gray-700">
            Select{index === 1 ? " Trigger" : " Action"}
          </button>
        
        
        </div>
  
<div className="gap-3 pt-4 space-y-3">
          {availableItems.map(({ id, name, image }) => (
            <div key={id} onClick={()=>{
              onSelect({ id, name })
            }} className="flex  gap-3 p-2 border cursor-pointer hover:bg-gray-100 rounded-lg">
            <img src={image} alt={name} className="w-9 h-9 object-contain" />
            <span className="text-xl text-gray-800 ">{name}</span>
            </div>
          ))}
          </div>


      </div>
    </div>
  );
}
