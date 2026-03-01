"use client";

import { useEffect, useState } from "react";
import {
  MessageSquare,
  Plus,
  Search,
  MoreHorizontal,
  ChevronLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { api } from "@/lib/api";

interface Conversation {
  _id: string;
  messages: {
    role: string;
    content: string;
  }[];
  createdAt: string;
}

interface ChatSidebarProps {
  activeConversation: string | null;
  onSelectConversation: (chat: any) => void;
  onNewChat: () => void;
  isOpen: boolean;
  onToggle: () => void;
}

export function ChatSidebar({
  activeConversation,
  onSelectConversation,
  onNewChat,
  isOpen,
  onToggle,
}: ChatSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [conversations, setConversations] = useState<Conversation[]>([]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const data = await api.getChats();
        setConversations(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchChats();
  }, []);

  const filtered = conversations.filter((c) =>
    c.messages[0]?.content
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <aside
      className={cn(
        "flex h-full flex-col bg-sidebar text-sidebar-foreground transition-all duration-300",
        isOpen ? "w-64" : "w-0 overflow-hidden"
      )}
    >
      <div className="flex items-center justify-between p-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="h-8 w-8"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <Button variant="ghost" size="icon" onClick={onNewChat}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div className="px-3 pb-2">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5" />
          <Input
            placeholder="Search chats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-8 pl-8 text-sm"
          />
        </div>
      </div>

      <ScrollArea className="flex-1 px-2">
        {filtered.map((conv) => (
          <div key={conv._id} className="group relative">
            <button
              onClick={() => onSelectConversation(conv)}
              className={cn(
                "flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm transition-colors",
                activeConversation === conv._id
                  ? "bg-sidebar-accent"
                  : "hover:bg-sidebar-accent/50"
              )}
            >
              <MessageSquare className="h-4 w-4 opacity-60" />
              <span className="truncate">
                {conv.messages[0]?.content || "New Chat"}
              </span>
            </button>

            {/* <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1 h-6 w-6 opacity-0 group-hover:opacity-100"
                >
                  <MoreHorizontal className="h-3.5 w-3.5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Rename</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu> */}
          </div>
        ))}
      </ScrollArea>
    </aside>
  );
}