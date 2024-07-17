import { TypeAnimation } from "react-type-animation";
import gemini from '../assets/images/gemini.png';
import chatgpt from '../assets/images/chatgpt.png';
import llama from '../assets/images/meta.png';

const titleImages = {
  Gemini: gemini,
  Llama: llama,
};

const ChatWindow = ({ title, messages }) => {
  const imageUrl = titleImages[title] || '';

  return (
    <div className="flex-1 overflow-y-hidden bg-white p-6 rounded-lg shadow-md h-96">
      <div className="sticky top-0 bg-white z-10 pb-2 border-b border-gray-200 flex items-center space-x-2">
        {imageUrl && <img src={imageUrl} alt={title} className="w-fit h-10" />}
      </div>
      <div className="h-full overflow-y-scroll p-4 pb-9">
        {messages?.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 ${msg.isUser ? "text-right" : "text-left"}`}
          >
            <span
              className={`inline-block px-4 py-2 rounded-lg ${
                msg.isUser ? "bg-indigo-600 text-white" : "bg-gray-200"
              }`}
            >
              {msg.isUser ? (
                <div>{msg.text}</div>
              ) : (
                <TypeAnimation
                  sequence={[msg.text]}
                  speed={90}
                  cursor={false}
                />
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatWindow;
