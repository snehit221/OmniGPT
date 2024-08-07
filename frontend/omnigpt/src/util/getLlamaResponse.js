import axios from "axios";

export const getLlamaResponse = async (inputText) => {
  try {
    const response = await axios.post(
      import.meta.env.VITE_LLAMA_API_ENDPOINT,
      {
        prompt: inputText,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      return response.data;
    } else {
      console.log("Llama Resonse :"+response)
      return "Free tier limit reached"
    }
  } catch (error) {
    console.error(error);
    return "Free tier limit reached";
  }
};
