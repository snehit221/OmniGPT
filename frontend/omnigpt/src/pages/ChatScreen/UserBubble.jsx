import React,{useRef,useEffect} from "react";



function UserBubble({message}) {

    const ref = useRef();
    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
    }, [message]);

  return (
    <div className="w-full flex gap-2 justify-end">
        <p className="w-fit p-3 my-1 text-white bg-gray-600 rounded-lg rounded-tl-none">{message}</p>
        <div ref={ref}></div>
    </div>
  )
}

export default UserBubble