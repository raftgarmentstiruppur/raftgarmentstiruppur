"use client"

import { useState, useEffect } from "react"

const WA_NUMBER = "919843166345"
const WA_DEFAULT_MSG = encodeURIComponent("Hello! I'd like to enquire about Raft Garments products.")

const STORAGE_KEY = "wa_bubble_seen"

export default function WhatsAppButton() {
  const [showBubble, setShowBubble] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Never show again if user has already seen it
    if (localStorage.getItem(STORAGE_KEY)) return

    const showTimer = setTimeout(() => {
      setShowBubble(true)
      // Mark as seen immediately so refreshing never shows it again
      localStorage.setItem(STORAGE_KEY, "1")

      const hideTimer = setTimeout(() => {
        setShowBubble(false)
      }, 5000)
      return () => clearTimeout(hideTimer)
    }, 2000)

    return () => clearTimeout(showTimer)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">

      {/* Chat bubble */}
      <div
        className={`transition-all duration-500 ease-out ${
          showBubble
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-4 scale-95 pointer-events-none"
        }`}
      >
        <div className="relative bg-white rounded-2xl rounded-br-none shadow-xl px-4 py-3 max-w-[220px] border border-gray-100">
          {/* Close */}
          <button
            onClick={() => setShowBubble(false)}
            className="absolute -top-2 -right-2 w-5 h-5 bg-gray-400 hover:bg-gray-600 text-white rounded-full text-[10px] flex items-center justify-center transition-colors"
            aria-label="Close"
          >
            ✕
          </button>

          {/* Header */}
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center shrink-0">
              <WhatsAppIcon className="w-4 h-4 fill-white" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-800 leading-tight">Raft Garments</p>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] inline-block" />
                <p className="text-[10px] text-gray-400">Online</p>
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="bg-[#f0fdf4] rounded-xl rounded-tl-none px-3 py-2">
            <p className="text-xs text-gray-700 leading-relaxed">
              👋 Hi! Looking for quality knitwear? Chat with us — we reply instantly!
            </p>
            <p className="text-[10px] text-gray-400 text-right mt-1">now</p>
          </div>
        </div>
        {/* Tail */}
        <div className="w-4 h-4 bg-white border-r border-b border-gray-100 rotate-45 ml-auto mr-5 -mt-2 shadow-sm" />
      </div>

      {/* WhatsApp button */}
      <div className="relative">
        {/* Pulse rings */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20 animation-delay-300" />

        <a
          href={`https://wa.me/${WA_NUMBER}?text=${WA_DEFAULT_MSG}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          onClick={() => setShowBubble(false)}
          className="relative w-14 h-14 rounded-full bg-[#25D366] shadow-lg shadow-green-500/40 flex items-center justify-center hover:scale-110 hover:shadow-green-500/60 transition-all duration-300"
        >
          <WhatsAppIcon className="w-7 h-7 fill-white" />
        </a>
      </div>

    </div>
  )
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M16 0C7.163 0 0 7.163 0 16c0 2.822.737 5.469 2.027 7.773L0 32l8.469-2.004A15.938 15.938 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.27 13.27 0 01-6.771-1.854l-.485-.288-5.027 1.189 1.213-4.899-.317-.503A13.267 13.267 0 012.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.27-9.951c-.398-.199-2.354-1.162-2.719-1.294-.365-.133-.631-.199-.897.199-.265.398-1.029 1.294-1.261 1.56-.232.265-.465.299-.863.1-.398-.199-1.681-.619-3.202-1.977-1.183-1.056-1.982-2.36-2.214-2.758-.232-.398-.025-.613.174-.811.179-.178.398-.465.597-.697.199-.232.265-.398.398-.664.133-.265.066-.497-.033-.697-.1-.199-.897-2.162-1.228-2.96-.324-.778-.653-.672-.897-.684l-.764-.013c-.265 0-.697.1-1.062.497-.365.398-1.394 1.362-1.394 3.32 0 1.96 1.427 3.853 1.626 4.118.199.265 2.808 4.287 6.803 6.013.951.411 1.693.656 2.271.839.955.304 1.824.261 2.511.158.766-.114 2.354-.963 2.686-1.893.332-.93.332-1.727.232-1.893-.099-.166-.365-.265-.763-.464z" />
    </svg>
  )
}
