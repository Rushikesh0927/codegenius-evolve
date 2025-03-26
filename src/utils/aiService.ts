
import { toast } from "sonner";

// Define the API key - in production, you'd want to store this securely
// For this demo, we'll use the provided key directly
const API_KEY = "AIzaSyCBxcqJ9BSZi4AHF7X-v8_3ND1zuPjnRK8";

// Types for our API
interface AIRequestOptions {
  text: string;
  maxTokens?: number;
  temperature?: number;
  language?: string;
}

interface AIResponse {
  text: string;
  isError: boolean;
  errorMessage?: string;
}

// Main function to get AI completions
export async function getAICompletion({
  text,
  maxTokens = 1024,
  temperature = 0.7,
  language = "typescript"
}: AIRequestOptions): Promise<AIResponse> {
  try {
    console.log("Sending AI request with text:", text);

    // For demo purposes, we'll simulate the API call
    // In production, you'd make the actual fetch request to Google AI Studio
    // const response = await fetch("https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Authorization": `Bearer ${API_KEY}`
    //   },
    //   body: JSON.stringify({
    //     contents: [{ parts: [{ text }] }],
    //     generationConfig: {
    //       maxOutputTokens: maxTokens,
    //       temperature
    //     }
    //   })
    // });
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate API response based on the request
    let simulatedResponse = "";
    
    if (text.includes("hello") || text.includes("hi")) {
      simulatedResponse = "Hello! I'm your coding assistant. How can I help you today?";
    } else if (text.includes("function") || text.includes("code")) {
      simulatedResponse = `Here's a sample ${language} function that might help:\n\n\`\`\`${language}\nfunction processData(input: string): string {\n  // Process the input\n  return input.trim().toUpperCase();\n}\n\`\`\`\n\nYou can use this as a starting point for your implementation.`;
    } else {
      simulatedResponse = "I understand you need assistance with coding. Could you provide more details about what you're trying to accomplish?";
    }
    
    console.log("AI response:", simulatedResponse);
    
    return {
      text: simulatedResponse,
      isError: false
    };
    
    // In production, you'd process the actual API response:
    // if (!response.ok) {
    //   throw new Error(`API error: ${response.status} ${response.statusText}`);
    // }
    // const data = await response.json();
    // return {
    //   text: data.candidates[0].content.parts[0].text,
    //   isError: false
    // };
  } catch (error) {
    console.error("Error in AI request:", error);
    toast.error("An error occurred while communicating with the AI");
    return {
      text: "",
      isError: true,
      errorMessage: error instanceof Error ? error.message : "Unknown error occurred"
    };
  }
}
