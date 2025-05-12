import Chatbot from "@/components/chatbot"

export default function ChatPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen w-full pt-16 pr-4">
      <div className="w-full px-4 sm:px-12">
        <Chatbot chatId={params.id} />
      </div>
    </div>
  )
}
