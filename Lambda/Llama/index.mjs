
import Replicate from 'replicate';

const REPLICATE_API_TOKEN = 'r8_KLHNbvo6TUqYTVdAsx7iBA9oGOQvBJX0yOH2C';

const replicate = new Replicate({
  auth: REPLICATE_API_TOKEN,
});
 
export const handler = async (event) => {
  console.log("Received event:", JSON.stringify(event, null, 2));
  
  let body;
  let statusCode = 200;
  // Headers for CORS
  const headers =  {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
  }
 
  try {
    const prompt = event.body;

    const input = {
      prompt,
    };

    const events = await replicate.stream('meta/llama-2-70b-chat', { input });

    let response = '';
    for await (const event of events) {
      response += event.toString();
    }
    body = JSON.stringify(response);
  } catch (err) {
    statusCode = 400;
    body = JSON.stringify({ error: err.message });
  }
 
  return {
    statusCode,
    headers,
    body
  };
};