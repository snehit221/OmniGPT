import React,{useState} from 'react'

function ChatList() {

  const chatlist=[
    {
      id:1,
      message:"How to integrate APIs in ReactJS?",
    },
    {
      id:2,
      message:"How to deploy a ReactJS application on Vercel?", 
    },
    {
      id:3,
      message:"What is react component?", 
    },
    {
      id:4,
      message:"How to import tailwind class in ReactJS jdkjwed wdblwjdk wqbdlwd wkdnlkw wdbwejkd?", 
    },
    {
        id:1,
        message:"How to integrate APIs in ReactJS?",
      },
      {
        id:2,
        message:"How to deploy a ReactJS application on Vercel?", 
      },
      {
        id:3,
        message:"What is react component?", 
      },
      {
        id:4,
        message:"How to import tailwind class in ReactJS jdkjwed wdblwjdk wqbdlwd wkdnlkw wdbwejkd?", 
      },
      {
        id:1,
        message:"How to integrate APIs in ReactJS?",
      },
      {
        id:2,
        message:"How to deploy a ReactJS application on Vercel?", 
      },
      {
        id:3,
        message:"What is react component?", 
      },
    //   {
    //     id:4,
    //     message:"How to import tailwind class in ReactJS jdkjwed wdblwjdk wqbdlwd wkdnlkw wdbwejkd?", 
    //   },
    //   {
    //     id:1,
    //     message:"How to integrate APIs in ReactJS?",
    //   },
    //   {
    //     id:2,
    //     message:"How to deploy a ReactJS application on Vercel?", 
    //   },
    //   {
    //     id:3,
    //     message:"What is react component?", 
    //   },
    //   {
    //     id:4,
    //     message:"How to import tailwind class in ReactJS jdkjwed wdblwjdk wqbdlwd wkdnlkw wdbwejkd?", 
    //   },
  ]
  const [chats,setChats] = useState(chatlist)

  return (
    <div className=' h-full w-full pt-4 px-2 text-white border-r border-gray-500 overflow-y-auto'>
        {/* bg-gray-800 */}
      {chats.map((chat,key)=>(
        <div key={key} className=' p-4 border-b border-gray-500 hover:bg-gray-800 hover:cursor-pointer hover:rounded-lg'>
          <p className='truncate'>{chat.message}</p>
        </div>
      ))}
    </div>
  )
}

export default ChatList