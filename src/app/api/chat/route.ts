import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // Parse the incoming request body
    const { input } = await req.json();

    // Send the input to the Flask backend
    const flaskResponse = await fetch("http://localhost:5000/lime-algorithm", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ input }),
    });

    if (!flaskResponse.ok) {
      throw new Error(`Flask server returned status ${flaskResponse.status}`);
    }

    const data = await flaskResponse.json();

    const prompt = {
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: "Explain the important top keywords that resulted in the output of an LLM"
        },
        {
          role: "user",
          content: JSON.stringify(data)
        }
      ],
      temperature: 0.7,
      max_tokens: 200
    };

    const llmResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(prompt)  
    });

    if (!llmResponse.ok) {
      throw new Error(`LLM API returned status ${llmResponse.status}`);
    }

    const llmData = await llmResponse.json();
    const explanation = llmData.choices[0].message.content;

    return NextResponse.json({
      LIMEOutput: data.LIMEOutput,
      AIResponse : data.AIResponse,
      explanation: explanation
    });

  } catch (error) {
    console.error('API Route Error:', error);
    return NextResponse.json(
      { status: 500 }
    );
  }
}