"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Chatbot from "@/components/chatbot";

export default function ChatPage() {

  return (
    <div className="w-full px-4 sm:px-12">
      <Chatbot/>
    </div>
  );
}
