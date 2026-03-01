"use client"

import { PanelLeft, Share, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ChatHeaderProps {
  isSidebarOpen: boolean
  onToggleSidebar: () => void
}

export function ChatHeader({ isSidebarOpen, onToggleSidebar }: ChatHeaderProps) {
  return (
    <header className="flex h-12 items-center justify-between border-b border-border px-3">
      <div className="flex items-center gap-2">
        {!isSidebarOpen && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleSidebar}
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
          >
            <PanelLeft className="h-4 w-4" />
            <span className="sr-only">Open sidebar</span>
          </Button>
        )}
        <button className="flex items-center gap-1 rounded-lg px-2 py-1 text-sm font-medium text-foreground transition-colors hover:bg-accent">
          ChatBOT <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
        </button>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-muted-foreground hover:text-foreground"
      >
        <Share className="h-4 w-4" />
        <span className="sr-only">Share chat</span>
      </Button>
    </header>
  )
}
