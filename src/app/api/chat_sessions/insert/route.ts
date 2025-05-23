import { createClient } from "@/utils/supabase/server";
import { v4 as uuidv4 } from 'uuid';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const supabase = await createClient();


  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return NextResponse.json(
      { error: "Not authenticated" },
      { status: 401 }
    );
  }

  const { chatId: inputChatId } = await req.json();
  const chatId = inputChatId || uuidv4();


  const { error: insertError } = await supabase
    .from('chat_sessions')
    .insert({
      id: chatId,
      user_id: user.id,
      created_at: new Date().toISOString(),
      title: 'New Chat'
    });

  if (insertError?.code === '23505') {
    return NextResponse.json(
      { success: true, chatId },
      { status: 200 }
    );
  }


  if (insertError) {
    return NextResponse.json(
      { error: "Database insert failed", details: insertError.message },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { success: true, chatId },
    { status: 200 }
  );
}