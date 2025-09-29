import UseConnectionHooksEffect from "../hooks/useConnectionHooks";
import UseDataHooksEffect from "../hooks/useDataHooks";

export default function Connection() {
  return <>
    <UseConnectionHooksEffect />
    <UseDataHooksEffect />
  </>;
}