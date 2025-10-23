import { useEffect } from "react";
import { useChatbotMessageHooks } from './useChatbotMessageHooks';
import { API } from "../../utils/api_interface";
import { useChatbotPageHooks } from "./useChatbotPageHooks";

let initialized = false;

export default function UseChatbotMessageHooksEffect() {
      const { deviceIdContext, hasHydrated } = useChatbotPageHooks();
      const { setMessages } = useChatbotMessageHooks();

      useEffect(() => {
            if(!deviceIdContext || !hasHydrated || initialized) return;
            initialized = true;

            API.get_chat_histories(deviceIdContext).then((data) => {
                  if(!data) return;
                  
                  
                  setMessages(data.map((data) => {
                        const date_created_at = new Date(data.created_at);
                        return {
                              message: data.message,
                              from_user: data.from_user,
                              timestamp: date_created_at
                        };
                  }));
            })
      }, [deviceIdContext, hasHydrated]);

      return <></>;
}