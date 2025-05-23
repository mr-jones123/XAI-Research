import { createClient } from "../utils/supabase/client";


export async function insertChatSession(chatId: string) {
  const supabase = createClient();


  const { data: { user }, error: userError } = await supabase.auth.getUser();
  console.log("User data:", user);
  if (userError || !user) {
    console.error("[insertChatSession] No authenticated user found");
    throw new Error("User not authenticated.");
  }

  const { data, error } = await supabase.from("chat_sessions").insert([

    {
      id: chatId,
      user_id: user.id,
    },
  ]);

  if (error) {
    console.error("[Supabase Error] Failed to insert chat session:", error);
    throw new Error("Supabase insertion failed.");
  }

  return data;
}