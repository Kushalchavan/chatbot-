"use client"

import { Sparkles, Code, BookOpen, Lightbulb } from "lucide-react"

interface WelcomeScreenProps {
  onSuggestionClick: (suggestion: string) => void
}

const suggestions = [
  {
    icon: Code,
    title: "Write code",
    description: "Help me build a React component",
  },
  {
    icon: BookOpen,
    title: "Explain a concept",
    description: "What are design patterns?",
  },
  {
    icon: Lightbulb,
    title: "Brainstorm ideas",
    description: "Project ideas for a portfolio",
  },
  {
    icon: Sparkles,
    title: "Help me write",
    description: "Draft a professional email",
  },
]

export function WelcomeScreen({ onSuggestionClick }: WelcomeScreenProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4">
      <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-full bg-primary">
        <Sparkles className="h-6 w-6 text-primary-foreground" />
      </div>
      <h1 className="mb-2 text-2xl font-semibold text-foreground text-balance">
        How can I help you today?
      </h1>
      <p className="mb-8 text-sm text-muted-foreground">
        Start a conversation or try one of the suggestions below
      </p>
      <div className="grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-2">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion.title}
            onClick={() => onSuggestionClick(suggestion.description)}
            className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 text-left transition-colors hover:bg-accent"
          >
            <suggestion.icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <div>
              <p className="text-sm font-medium text-foreground">
                {suggestion.title}
              </p>
              <p className="text-xs text-muted-foreground">
                {suggestion.description}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
