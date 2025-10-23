export default function ChatbotChatMessages() {
      // Retrieve chat messages herebg-gray-600/50 w-full h-full
      
      return <>
            <ChatBubble message="I've never been this good before! Thanks for asking me! So, what is your plan for the aquaponics system today? :D" />
            <ChatBubble message="I'm fine thanks! How about you" side />
            <ChatBubble message="Hello! How are you today?" />
            <ChatBubble message="Hello!" side />
      </>;
}


interface ChatBubbleProps {
      message: string,
      side?: boolean
}

function ChatBubble(props: ChatBubbleProps) {

      return <div className={`w-full p-4 flex flex-col ${props.side && "items-end"} bg-gray-600 text-white rounded-2xl`}>
            <p className={`font-semibold ${props.side && "text-right"}`}>{props.side ? "You" : "AI Chatbot"}</p>
            <p className={`w-3/5 font-thin text-left ${props.side && "text-right"}`}>
                  {props.message}
            </p>
      </div>
}