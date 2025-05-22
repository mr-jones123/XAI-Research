// app/chatbot/page.tsx
import { redirect } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

export default function ChatbotRedirectPage() {
  const newChatId = uuidv4();
  redirect(`/chatbot/${newChatId}`);
}
