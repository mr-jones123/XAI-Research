
import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from 'uuid';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Basic validation for environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    "Supabase URL or Anon Key is missing. Please check your .env.local file."
  );
}

// Initialize Supabase client
const supabase = createClient(supabaseUrl || "", supabaseAnonKey || "");

/**
 * Inserts a new chat session into the Supabase 'chat_sessions' table.
 * @param chatId The unique ID for the chat session.
 * @param userId The user ID associated with the chat session (e.g., "anon" or authenticated user ID).
 * @returns The data returned by Supabase on successful insertion, or throws an error.
 */
export async function insertChatSession(chatId: string, userId: string) {
  // If the userId is "anon", generate a UUID for it to match the UUID column type
  const finalUserId = userId === "anon" ? uuidv4() : userId;

  console.log(
    `[insertChatSession] Attempting to insert chat session: { id: "${chatId}", user_id: "${finalUserId}" }`
  );

  try {
    const { data, error } = await supabase.from("chat_sessions").insert([
      {
        id: chatId,
      },
    ]);

    if (error) {
      console.error(
        "[Supabase Error] Failed to insert chat session:",
        error.message, // Log the message property
        error.code,    // Log the code property
        error.details, // Log the details property
        error          // Log the full error object for inspection
      );
      throw new Error(`Supabase insertion failed: ${error.message || JSON.stringify(error)}`);
    }

    console.log("[Supabase Success] Chat session inserted:", data);
    return data;
  } catch (err) {
    console.error("[insertChatSession] Unexpected error during insertion:", err);
    throw err;
  }
}
