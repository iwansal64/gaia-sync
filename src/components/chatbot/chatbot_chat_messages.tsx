import { useChatbotMessageHooks } from "../../hooks/chatbot_hooks/useChatbotMessageHooks";
import UseChatbotMessageHooksEffect from "../../hooks/chatbot_hooks/useChatbotMessageHooksEffect";
import { dynamicDateFormat } from "../../utils/date_formatting";

export default function ChatbotChatMessages() {
      // Retrieve chat messages here
      const { messages } = useChatbotMessageHooks();
      
      return <>
            <UseChatbotMessageHooksEffect />
            {(() => {
                  if(!messages) return <></>
                  
                  return messages.map((message_data, index) => <ChatBubble key={index} message={message_data.message} from_user={message_data.from_user} timestamp={message_data.timestamp} />);
            })()}
      </>;
}


interface ChatBubbleProps {
      message: string,
      from_user?: boolean,
      timestamp: Date
}

function ChatBubble(props: ChatBubbleProps) {

      return <div className={`w-full p-4 flex flex-col gap-2 bg-gray-600 text-white rounded-2xl`}>
            <div className="flex items-center justify-between">
                  <p className={`font-semibold`}>{props.from_user ? "You" : "AI Chatbot"}</p>
                  <p className="text-xs font-thin">{dynamicDateFormat(props.timestamp)}</p>
            </div>
            <p className={`w-3/5 font-thin text-left`}>
                  {props.message}
            </p>
      </div>
}