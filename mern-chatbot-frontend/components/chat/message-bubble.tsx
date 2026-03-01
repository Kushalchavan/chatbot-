"use client"

import { cn } from "@/lib/utils"
import { Copy, ThumbsUp, ThumbsDown, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

interface MessageBubbleProps {
  message: Message
  isLast?: boolean
}

export function MessageBubble({ message, isLast }: MessageBubbleProps) {
  const [copied, setCopied] = useState(false)
  const isUser = message.role === "user"

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      className={cn(
        "group flex gap-3 px-4 py-4 md:px-8 lg:px-16",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && (
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
          AI
        </div>
      )}

      <div
        className={cn(
          "flex max-w-[75%] flex-col gap-1",
          isUser && "items-end"
        )}
      >
        <div
          className={cn(
            "rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
            isUser
              ? "bg-secondary text-secondary-foreground"
              : "text-foreground"
          )}
        >
          {message.content.split("\n").map((line, i) => (
            <p key={i} className={cn(i > 0 && "mt-2")}>
              {line}
            </p>
          ))}
        </div>

        {!isUser && (
          <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-muted-foreground hover:text-foreground"
              onClick={handleCopy}
            >
              <Copy className="h-3.5 w-3.5" />
              <span className="sr-only">{copied ? "Copied" : "Copy"}</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-muted-foreground hover:text-foreground"
            >
              <ThumbsUp className="h-3.5 w-3.5" />
              <span className="sr-only">Like</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-muted-foreground hover:text-foreground"
            >
              <ThumbsDown className="h-3.5 w-3.5" />
              <span className="sr-only">Dislike</span>
            </Button>
            {isLast && (
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-muted-foreground hover:text-foreground"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span className="sr-only">Regenerate</span>
              </Button>
            )}
          </div>
        )}
      </div>

      {isUser && (
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-semibold text-secondary-foreground">
          U
        </div>
      )}
    </div>
  )
}
