import { useAddDeviceHooks } from "../../../hooks/dashboard_hooks/useDashboardAddDeviceHook";
import { dateFormat } from "../../../utils/date_formatting";
import { useDeviceDataHooks } from "../../../hooks/device_hooks/useDeviceDataHooks";
import UseDeviceDataHooksEffect from "../../../hooks/device_hooks/useDeviceDataHooksEffect";

export default function DeviceList() {
  const { devicesData, setDeviceSearchKeyword, deviceSearchKeyword } = useDeviceDataHooks();
  const { showConnectDeviceModal } = useAddDeviceHooks();

  return <>
    <UseDeviceDataHooksEffect />
    <div className="w-full h-full flex flex-col">
      <div className="w-full h-fit p-4 flex flex-col gap-2">
        <input id="device-search-keyword" type="text" className="bg-gray-400 px-6 py-3 outline-none w-full rounded-full" placeholder="Search for device name" value={deviceSearchKeyword} onChange={(e) => setDeviceSearchKeyword(e.target.value.toLowerCase())} />
        <button className="md:w-fit p-2 md:py-4 md:px-8 bg-gray-500 text-white rounded-full text-sm cursor-pointer hover:brightness-110" onClick={showConnectDeviceModal}>Add Device</button>
        <div className="mt-4 w-full h-full flex flex-col gap-4 overflow-y-auto overflow-x-hidden">
          {devicesData?.filter((data) => data.device_name.toLowerCase().includes(deviceSearchKeyword)).map((data, index) => {
            return <DeviceCard key={index} device_id={data.id} device_last_seen={data.last_online ? new Date(data.last_online) : undefined} device_name={data.device_name} />
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
  const { setDeviceId } = useDeviceDataHooks();
  const handleClick = () => {
    setDeviceId(props.device_id);
    window.location.href = `/monitor/`;
  }

  return <button className="relative text-left p-4 flex flex-row justify-between bg-gray-300 rounded-2xl cursor-pointer hover:brightness-105" onClick={handleClick}>
    <h1 className="text-xl font-semibold">{props.device_name}</h1>
    {props.device_last_seen ? <p className="font-thin">{dateFormat(props.device_last_seen)}</p> : <p className="opacity-50 text-sm absolute bottom-3">Device has never online.</p>}
  </button>
}