import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";

import { Chat } from "@/components/chat";
import { DataStreamHandler } from "@/components/data-stream-handler";
import { getChatById, getMessagesByChatId } from "@/lib/db/queries";
import { convertToUIMessages } from "@/lib/utils";

export default function Page(props: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<div className="flex h-dvh" />}>
      <ChatPage params={props.params} />
    </Suspense>
  );
}

async function ChatPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const chat = await getChatById({ id });

  if (!chat) {
    redirect("/");
  }

  const userId = "d3b07384-d99e-4c22-901c-6d5d5c1f618a";
  const isReadonly = userId !== chat.userId;

  const messages = await getMessagesByChatId({ id });
  const uiMessages = convertToUIMessages(messages);

  return (
    <>
      <Chat
        id={chat.id}
        initialMessages={uiMessages}
        isReadonly={isReadonly}
      />
      <DataStreamHandler />
    </>
  );
}
