import { IoIosArrowBack } from "react-icons/io";

export default function BackButton() {
      const handleBack = () => {
            window.location.href = "/";
      }
      
      return <button onClick={handleBack} className="aspect-square p-2 bg-transparent border-white border-2 rounded-full cursor-pointer">
            <IoIosArrowBack color="white" fontSize={24} />
      </button>;
}