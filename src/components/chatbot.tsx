"use client";
import { useChat } from "@ai-sdk/react";
import {
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

export default function Chatbot() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div className="flex justify-center items-center p-2 sm:p-4 w-full">
      <div className="w-full max-w-4xl">
        <CardHeader className="p-3 sm:p-4">
          <CardTitle className="text-md sm:text-lg md:text-xl">
            Xee.AI
          </CardTitle>
        </CardHeader>
        <CardContent className="p-2 sm:p-4">
          <ScrollArea className="h-[300px] sm:h-[400px] pr-2">
            <div className="space-y-3">
              {messages.map((m, index) => {
                if (m.role === "user") {
                  return (
                    <div key={m.id} className="flex items-start space-x-2 sm:space-x-3">
                      <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                      <div className="bg-blue-500 text-white rounded-lg px-3 py-2 max-w-[80%] sm:max-w-[70%] text-sm sm:text-base">
                        {m.content}
                      </div>
                    </div>
                  );
                } else {
                  // Try to get the previous user message.
                  const userMessage =
                    index > 0 && messages[index - 1].role === "user"
                      ? messages[index - 1]
                      : null;
                  return (
                    <div key={m.id} className="flex items-start space-x-2 sm:space-x-3">
                      <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
                        <AvatarFallback>AI</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="bg-gray-500 text-white rounded-lg px-3 py-2 max-w-[80%] sm:max-w-[70%] text-sm sm:text-base">
                          {m.content}
                        </span>
                        <Dialog>
                          <DialogTrigger>Click for explanations!</DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>
                                Explanation for your query: <span className="bold italic">{userMessage?.content || null}</span>
                              </DialogTitle>
                            </DialogHeader>
                          
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter className="p-2 sm:p-4">
          <form onSubmit={handleSubmit} className="flex w-full space-x-2">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Type your message..."
              className="flex-grow text-sm sm:text-base"
            />
            <Button
              type="submit"
              size="icon"
              className="h-8 w-8 sm:h-10 sm:w-10"
            >
              <Send className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </form>
        </CardFooter>
      </div>
    </div>
  );
}
