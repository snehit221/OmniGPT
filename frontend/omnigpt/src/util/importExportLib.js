import { db } from "../config/firebase";
import { addDoc, doc, collection, setDoc } from "firebase/firestore";

export const exportFile = (obj, filename) => {
  const blob = new Blob([JSON.stringify(obj, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${filename}.json`;
  a.click();
  URL.revokeObjectURL(url);
};

export const importFile = async (file) => {
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onload = async (event) => {
      try {
        const content = JSON.parse(event.target.result);
        const docRef = await addDoc(collection(db, "chats"), {
          messages: content,
        });
        const firstMessage = content.find((message) => message.id === "1");
        const lastMessage = content.reduce((prev, current) => {
          return parseInt(prev.id) > parseInt(current.id) ? prev : current;
        });
        const lastTimestamp = lastMessage.timestamp;
        const conversation = {
            firstMessage: firstMessage.message,
            lastTimestamp
        }
        const conversationRef = doc(db, 'conversations', localStorage.getItem("user"));
        await setDoc(conversationRef, { [docRef.id]: conversation }, { merge: true });
        resolve(content);
      } catch (error) {
        console.error(error);
        reject(new Error("File is not valid JSON"));
      }
    };

    reader.onerror = () => {
      reject(new Error("File reading error"));
    };

    reader.readAsText(file);
  });
};
