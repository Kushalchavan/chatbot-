"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChatSidebar } from "@/components/chat/chat-sidebar";
import { ChatHeader } from "@/components/chat/chat-header";
import { ChatInput } from "@/components/chat/chat-input";
import { WelcomeScreen } from "@/components/chat/welcome-screen";
import { MessageBubble, type Message } from "@/components/chat/message-bubble";
import { ScrollArea } from "@/components/ui/scroll-area";
import { api } from "@/lib/api";

export default function ChatPage() {
  const router = useRouter();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeConversation, setActiveConversation] = useState<string | null>(
    null,
  );
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatId, setChatId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  // 🔐 Protect Route
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
    }
  }, [router]);

  // Auto scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
    };

    setMessages((prev) => [...prev, userMessage]);

    // Add temporary loading message
    const loadingMessage: Message = {
      id: "loading",
      role: "assistant",
      content: "Thinking...",
    };

    setMessages((prev) => [...prev, loadingMessage]);
    setIsLoading(true);

    try {
      const chat = await api.sendMessage(content, chatId || undefined);

      setChatId(chat._id);

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: chat.messages[chat.messages.length - 1].content,
      };

      setMessages((prev) =>
        prev.filter((msg) => msg.id !== "loading").concat(assistantMessage),
      );
    } catch (error: any) {
      setMessages((prev) =>
        prev
          .filter((msg) => msg.id !== "loading")
          .concat({
            id: Date.now().toString(),
            role: "assistant",
            content: error.message || "Something went wrong",
          }),
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewChat = () => {
    setMessages([]);
    setActiveConversation(null);
    setChatId(null); // important reset
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSend(suggestion);
  };

  return (
    <div className="flex h-dvh bg-background">
      <ChatSidebar
        activeConversation={activeConversation}
        onSelectConversation={(chat) => {
          setActiveConversation(chat._id);
          setChatId(chat._id);

          setMessages(
            chat.messages.map((m: any, index: number) => ({
              id: index.toString(),
              role: m.role,
              content: m.content,
            })),
          );
        }}
        onNewChat={handleNewChat}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(false)}
      />

      <main className="flex flex-1 flex-col overflow-hidden">
        <ChatHeader
          isSidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen(true)}
        />

        <div className="flex flex-1 flex-col overflow-hidden">
          {messages.length === 0 ? (
            <WelcomeScreen onSuggestionClick={handleSuggestionClick} />
          ) : (
            <ScrollArea className="flex-1" ref={scrollRef}>
              <div className="py-4">
                {messages.map((message, index) => (
                  <MessageBubble
                    key={message.id}
                    message={message}
                    isLast={
                      index === messages.length - 1 &&
                      message.role === "assistant"
                    }
                  />
                ))}
              </div>
            </ScrollArea>
          )}

          <ChatInput onSend={handleSend} isLoading={isLoading} />
        </div>
      </main>
    </div>
  );
}
