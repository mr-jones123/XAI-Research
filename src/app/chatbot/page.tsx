"use client";
import { useChat } from "@ai-sdk/react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
export default function Chatbot() {
  const { messages, input, handleInputChange, handleSubmit } = useChat(); // provided by Vercel
  return (
    <div className="flex flex-col justify-center items-center">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Chatbot</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] pr-4">
            {messages.map((m) => (
              <div key={m.id}>
                {m.role === "user" ? (
                  <div className="flex space-x-4 mb-5">
                    <Avatar>
                      <AvatarFallback>XY</AvatarFallback>
                    </Avatar>
                    <span className="bg-black text-white rounded-sm p-3">
                      {m.content}
                    </span>
                  </div>
                ) : (
                  <div className="flex space-x-4 mb-5">
                    <Avatar>
                      <AvatarFallback>AI</AvatarFallback>
                    </Avatar>
                    <span className="bg-gray-500 text-white rounded-sm p-3">
                      {m.content}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </ScrollArea>
        </CardContent>
        <CardFooter>
          <form onSubmit={handleSubmit} className="flex w-full space-x-2">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Type your message..."
              className="flex-grow"
            />
            <Button type="submit" size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}