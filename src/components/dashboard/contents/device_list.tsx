import UseUserDataHooksEffect, { useUserDataHooks } from "../../../hooks/useUserDataHooks";
import { dateFormat } from "../../../utils/date_formatting";

export default function DeviceList() {
  const { devicesData } = useUserDataHooks();

  return <>
    <UseUserDataHooksEffect />
    <div className="w-full h-full flex flex-col">
      <div className="w-full h-fit px-2 bg-gray-400 flex flex-row">
        <input type="text" className="px-6 py-6 outline-none w-full" placeholder="Search for device name" />
      </div>
      <div className="w-full py-4 px-4 flex flex-row justify-end">
        <button className="py-4 px-8 bg-gray-500 text-white rounded-full text-sm cursor-pointer hover:brightness-110">Add Device</button>
      </div>
      <div className="w-full h-full p-4 box-border flex justify-center items-center">
        <div className="w-[90%] h-[90%] grid grid-cols-4 auto-rows-[200px] gap-4 overflow-y-auto overflow-x-hidden p-4">
          {devicesData?.map((data) => {
            return <DeviceCard device_id={data.id} device_last_seen={data.last_login ? new Date(data.last_login) : undefined} device_name={data.device_name} />
          })}
        </div>
      </div>
    </div>
  </>;
}


interface DeviceCardProps {
  device_name: string,
  device_last_seen?: Date,
  device_id: string
}

function DeviceCard(props: DeviceCardProps) {
  return <button className="relative text-left p-4 flex flex-col bg-gray-300 rounded-2xl cursor-pointer hover:brightness-105" onClick={() => { window.location.href = `/monitor/?id=${props.device_id}`; }}>
    <h1>{props.device_name}</h1>
    <p className="absolute bottom-3">{props.device_last_seen ? dateFormat(props.device_last_seen) : "Device has never online."}</p>
  </button>
}