// Purpose: This file is used to create a chat session with the google generative AI model. It is used to generate responses to the user's input.

const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;  //API key for the google generative AI
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };

  const CodegenerationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  

    export const chatSession = model.startChat({  //exporting the chat session
      generationConfig,
      history: [
      ],
    });

    export const GenAiCode=model.startChat({
      generationConfig: CodegenerationConfig,
      history: [
      ],
    })
  
    // const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    // console.log(result.response.text());
 