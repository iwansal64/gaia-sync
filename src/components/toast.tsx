import { useEffect } from "react";
import { useToastHooks } from "../hooks/useToastHooks";

export default function Toast() {
  const { isOpen, title, message } = useToastHooks();

  return <>
    <div className={`fixed duration-750 top-2 right-0 ${isOpen ? "-translate-x-2" : "translate-x-[120%]"} w-[80vw] min-w-48 max-w-[500px] h-fit p-4 z-100 bg-white border-1 border-black rounded-2xl`}>
      <h3 className="text-md font-medium">
        {title}
      </h3>
      <p className="text-sm font-thin">
        {message}
      </p>
    </div>
  </>;
}