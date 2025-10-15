import { useAddDeviceHooks } from "../../../hooks/useAddDeviceModalHooks";
import { useToastHooks } from "../../../hooks/useToastHooks";
import { useUserDataHooks } from "../../../hooks/useUserDataHooks";
import { API, ConnectDeviceResponseEnum } from "../../../utils/api_interface";


export default function ConnectDeviceModal() {
  const { userId } = useUserDataHooks();
  const { connectDeviceModalState, hideConnectDeviceModal, connectDeviceId, setConnectDeviceId } = useAddDeviceHooks();
  const { showMessage } = useToastHooks();

  const onConnectDevice = async () => {
    const result = await API.connect_device(connectDeviceId);
    if(result == ConnectDeviceResponseEnum.Authorized) {
      showMessage({
        title: "Success!",
        message: "Successfully connect to the device. If you haven't configure the device you should follow the instruction!",
        timeout: 4000
      });
    }
    else if(result == ConnectDeviceResponseEnum.NotFound) {
      showMessage({
        title: "ID is not found",
        message: "Please check your device ID",
        timeout: 5000
      });
    }
    else if(result == ConnectDeviceResponseEnum.Unauthorized) {
      showMessage({
        title: "Unauthorized!",
        timeout: 4000
      });
    }
    else if(result == ConnectDeviceResponseEnum.Error) {
      showMessage({
        title: "Error Detected!",
        message: "There's an unknown error occured!",
        timeout: 4000
      });
    }
  }

  return <>
    <div className={`fixed top-0 left-0 w-full h-full duration-200 ${connectDeviceModalState ? "opacity-100 z-101" : "opacity-0 pointer-events-none"}`}>
      <div className="fixed top-0 left-0 bg-black/20 w-full h-full" onClick={hideConnectDeviceModal}></div>
      <div className="p-8 max-w-[400px] fixed top-1/2 left-1/2 -translate-1/2 bg-gray-200 flex flex-col gap-2 z-100">
        <div className="w-full h-fit pb-4">
          <h1 className="font-bold text-center w-full text-xl">Add Device</h1>
        </div>
        <input type="text" className="p-4 outline-none bg-gray-500 text-white!" placeholder="Device ID" value={connectDeviceId} onChange={(e) => setConnectDeviceId(e.target.value)} />
        <button className="px-4 py-2 rounded-full bg-gray-500 text-white text-sm font-thin cursor-pointer hover:brightness-110" onClick={onConnectDevice}>Connect Device!</button>
        <div className="w-full h-fit mt-6">
          <h1 className="font-bold w-full text-center text-lg">Intruction for adding new device</h1>
          <div className="px-4 mt-4">
            <ol className="list-decimal">
              <li>Turn on the <b>GAIA</b> device</li>
              <li>Connect to the WiFi that has the same name as in the label below the lid</li>
              <li>Open your browser and type in the url: <b>"192.168.4.1"</b></li>
              <li>Open Security tab</li>
              <li>Copy <b>Device ID</b> in the device ID info and put it here</li>
              <li>Put <b>`{userId}`</b> (your user ID) in the user ID section in there</li>
              <li>Refresh to see the effect</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  </>;
}