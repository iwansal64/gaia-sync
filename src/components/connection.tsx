import UseConnectionHooksEffect from "../hooks/useConnectionHooks";
import UseSensorDataHooksEffect from "../hooks/useSensorDataHooks";

export default function Connection() {
  return <>
    <UseConnectionHooksEffect />
    <UseSensorDataHooksEffect />
  </>;
}