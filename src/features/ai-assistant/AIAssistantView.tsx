import React, { useState } from 'react'
import { useRepoStore } from '../../store/repoStore'

interface Message {
  sender: 'user' | 'assistant'
  content: string
}

export const AIAssistantView: React.FC = () => {
  const { selectedRepo } = useRepoStore()
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'assistant',
      content: `I'm connected to **${selectedRepo?.fullName || 'the active repository'}** context. Ask me anything about the architecture, vulnerabilities, or complex modules in this project.`
    }
  ])
  const [input, setInput] = useState('')

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMsg: Message = { sender: 'user', content: input }
    setMessages((prev) => [...prev, userMsg])
    setInput('')

    setTimeout(() => {
      let reply = "I've analyzed the current workspace logic. "
      if (input.toLowerCase().includes('auth')) {
        reply += "The middleware validates JWT headers against the local VITE_SUPABASE_ANON_KEY config environment. Refer to `src/services/supabase.ts` for details."
      } else if (input.toLowerCase().includes('debt')) {
        reply += "Our Tech Debt scoring outlines `src/services/PaymentProcessor.ts` as a major cognitive complexity hotspot (CC: 84) due to nested promise handlers."
      } else {
        reply += `Here is a high-level summary of **${selectedRepo?.name}**. It is primarily written in ${selectedRepo?.language || 'JavaScript'} and operates as a modular SaaS application.`
      }

      setMessages((prev) => [...prev, { sender: 'assistant', content: reply }])
    }, 1000)
  }

  return (
    <div className="flex-1 flex overflow-hidden">
      <div className="flex-1 flex flex-col relative max-w-4xl mx-auto w-full">
        {/* Chat window */}
        <div className="flex-1 overflow-y-auto custom-scroll p-md md:p-lg space-y-md pb-32">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-sm w-full ${msg.sender === 'user' ? 'justify-end' : ''}`}>
              {msg.sender === 'assistant' && (
                <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 text-primary flex items-center justify-center shrink-0 mt-1">
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>smart_toy</span>
                </div>
              )}
              <div className={`p-md rounded-xl max-w-[80%] text-body-sm leading-relaxed border ${
                msg.sender === 'user' ? 'bg-surface-container-high border-outline-variant/30 text-on-surface' : 'bg-surface-container-lowest border-outline-variant/20'
              }`}>
                {msg.content}
              </div>
            </div>
          ))}
        </div>

        {/* Input box */}
        <div className="absolute bottom-0 left-0 w-full p-md bg-gradient-to-t from-surface via-surface/90 to-transparent">
          <form onSubmit={handleSend} className="max-w-4xl mx-auto glass-panel rounded-xl border border-outline-variant/40 flex items-center p-xs shadow-md">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent border-0 ring-0 focus:ring-0 outline-none text-sm py-sm px-md text-on-surface w-full block"
              placeholder="Ask anything about the codebase..."
            />
            <button type="submit" className="bg-primary hover:bg-primary/90 text-on-primary p-2 rounded-lg shrink-0 flex items-center justify-center transition-transform active:scale-95">
              <span className="material-symbols-outlined text-sm">send</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
