import axios from "axios";

export const getLlamaResponse = async (inputText) => {
  try {
    const response = await axios.post(
      "https://nr5w39czhh.execute-api.us-east-1.amazonaws.com/prod/llama",
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
      throw new Error(response.data.error || "Error generating response.");
    }
  } catch (error) {
    console.error(error);
    return "Error generating response.";
  }
};
