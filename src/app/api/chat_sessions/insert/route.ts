import { v4 as uuidv4 } from 'uuid';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { chatId: inputChatId } = await req.json();
  const chatId = inputChatId || uuidv4();

  // Simply return the chatId without any database operations
  // since we're removing all user sessions and authentication
  return NextResponse.json(
    { success: true, chatId },
    { status: 200 }
  );
}