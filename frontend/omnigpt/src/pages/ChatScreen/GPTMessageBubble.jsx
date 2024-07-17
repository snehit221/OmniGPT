import React,{useRef,useEffect} from "react";
import { TypeAnimation } from "react-type-animation";
import { ToastContainer, toast } from "react-toastify";

function GPTMessageBubble({ gptResponse }) {

    const ref = useRef();
    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
    }, [gptResponse]);
    
    const handleCopy = (copyMesage) => {
        console.log("Inside handle copy");
        navigator.clipboard.writeText(copyMesage).then(() => {
          console.log("Text copied to clipboard:", copyMesage);
          toast.success("Copied to clipboard");
        }).catch((error) => {
          console.error("Failed to copy text:", error);
        });
      };


  return (
    <div className="w-full flex my-3  gap-3">
      <div className="flex flex-col flex-1 rounded-lg overflow-hidden">
        <div className="flex bg-gray-900 justify-between p-3">
          <div className=" text-white">{gptResponse.gpt1}</div>
          <div className=" text-white hover:cursor-pointer"
          onClick={() => handleCopy(gptResponse.message1)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path d="M7.5 3.375c0-1.036.84-1.875 1.875-1.875h.375a3.75 3.75 0 0 1 3.75 3.75v1.875C13.5 8.161 14.34 9 15.375 9h1.875A3.75 3.75 0 0 1 21 12.75v3.375C21 17.16 20.16 18 19.125 18h-9.75A1.875 1.875 0 0 1 7.5 16.125V3.375Z" />
              <path d="M15 5.25a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963A5.23 5.23 0 0 0 17.25 7.5h-1.875A.375.375 0 0 1 15 7.125V5.25ZM4.875 6H6v10.125A3.375 3.375 0 0 0 9.375 19.5H16.5v1.125c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V7.875C3 6.839 3.84 6 4.875 6Z" />
            </svg>
          </div>
        </div>
        <div className=" h-full w-full p-3 text-black bg-gray-300 ">
          <TypeAnimation
            sequence={[gptResponse.message1]}
            speed={90}
            cursor={false}
          />
        </div>
      </div>
      <div className="flex flex-col flex-1 rounded-lg overflow-hidden">
        <div className="flex bg-gray-900 justify-between p-3">
          <div className=" text-white">{gptResponse.gpt2}</div>
          <div className=" text-white hover:cursor-pointer"
          onClick={() => handleCopy(gptResponse.message2)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path d="M7.5 3.375c0-1.036.84-1.875 1.875-1.875h.375a3.75 3.75 0 0 1 3.75 3.75v1.875C13.5 8.161 14.34 9 15.375 9h1.875A3.75 3.75 0 0 1 21 12.75v3.375C21 17.16 20.16 18 19.125 18h-9.75A1.875 1.875 0 0 1 7.5 16.125V3.375Z" />
              <path d="M15 5.25a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963A5.23 5.23 0 0 0 17.25 7.5h-1.875A.375.375 0 0 1 15 7.125V5.25ZM4.875 6H6v10.125A3.375 3.375 0 0 0 9.375 19.5H16.5v1.125c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V7.875C3 6.839 3.84 6 4.875 6Z" />
            </svg>
          </div>
        </div>
        <div className="h-full w-full p-3 text-black bg-gray-300">
          <TypeAnimation
            sequence={[gptResponse.message2]}
            speed={90}
            cursor={false}
          />
        </div>
      </div>
      <ToastContainer />
      <div ref={ref}></div>
    </div>
  );
}

export default GPTMessageBubble;
