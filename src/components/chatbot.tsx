  "use client"
  import { useState } from "react";
  import { Input } from "@/components/ui/input";
  import { Button } from "@/components/ui/button";
  import { Card, CardContent } from "@/components/ui/card";

  interface ResponseType {
    // explanation: string;
    AIResponse : string;
    LIMEOutput: string;
  }

  export default function Chatbot() {
    const [input, setInput] = useState("");
    const [response, setResponse] = useState<ResponseType | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:5000/lime-algorithm", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ input }),
        });
    
        if (!res.ok) {
          throw new Error(`Server error: ${res.status}`);  // Handle non-200 responses
        }
    
        const text = await res.text();  
    
        if (!text) {
          throw new Error("Empty response from server"); 
        }
    
        const data = JSON.parse(text);  
        setResponse(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };
    return (
      <div className="max-w-xl mx-auto p-4">
        <h1 className="text-xl font-bold mb-4">XAI Chatbot</h1>
        <div className="flex gap-2 mb-4">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter a sentence..."
          />
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Analyzing..." : "Submit"}
          </Button>
        </div>
        {response && (
          <Card className="mt-4">
            <CardContent className="p-4">
              <p className="text-lg font-bold italic">AI Response: {response.AIResponse}</p>
              <p className="text-lg font-semibold">Explanation:</p>
              <hr className="my-2" />
              <p>LIME Output: <strong>{response.LIMEOutput}</strong></p>
            </CardContent>
          </Card>
        )}
      </div>
    );
  }
