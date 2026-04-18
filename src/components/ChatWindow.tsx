import { useState, useRef, useEffect } from "react";
import { Chat } from "@/data/chats";
import Icon from "@/components/ui/icon";

interface Props {
  chat: Chat | null;
  onBack: () => void;
}

const avatarColors = [
  "from-purple-500 to-pink-500",
  "from-cyan-500 to-blue-500",
  "from-emerald-500 to-cyan-500",
  "from-orange-500 to-pink-500",
  "from-violet-500 to-purple-500",
  "from-rose-500 to-orange-500",
];

export default function ChatWindow({ chat, onBack }: Props) {
  const [messages, setMessages] = useState(chat?.messages ?? []);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const chatId = chat?.id ?? 0;

  useEffect(() => {
    setMessages(chat?.messages ?? []);
  }, [chat]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!chat) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-4 text-muted-foreground">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center text-4xl">
          💬
        </div>
        <div className="text-center">
          <p className="font-semibold text-foreground mb-1">Выберите чат</p>
          <p className="text-sm">чтобы начать переписку</p>
        </div>
      </div>
    );
  }

  const colorIdx = (chat.id - 1) % avatarColors.length;

  const send = () => {
    const text = input.trim();
    if (!text) return;
    setMessages(prev => [
      ...prev,
      { id: Date.now(), text, time: "сейчас", out: true },
    ]);
    setInput("");
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden animate-slide-right">
      {/* Header */}
      <div className="glass border-b border-border px-4 py-3 flex items-center gap-3 flex-shrink-0">
        <button
          onClick={onBack}
          className="md:hidden w-8 h-8 rounded-xl flex items-center justify-center hover:bg-muted transition-colors"
        >
          <Icon name="ArrowLeft" size={18} />
        </button>
        <div className="relative flex-shrink-0">
          <div
            className={`w-10 h-10 rounded-xl bg-gradient-to-br ${avatarColors[colorIdx]} flex items-center justify-center text-white font-semibold text-xs`}
          >
            {chat.avatar}
          </div>
          {chat.online && (
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-background" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm truncate">{chat.name}</p>
          <p className={`text-xs ${chat.online ? "text-emerald-400" : "text-muted-foreground"}`}>
            {chat.online ? "в сети" : "не в сети"}
          </p>
        </div>
        <div className="flex gap-1">
          <button className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
            <Icon name="Phone" size={16} />
          </button>
          <button className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
            <Icon name="Video" size={16} />
          </button>
          <button className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
            <Icon name="MoreVertical" size={16} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-2">
        <div className="flex justify-center mb-2">
          <span className="text-[10px] text-muted-foreground bg-muted px-3 py-1 rounded-full">Сегодня</span>
        </div>
        {messages.map((msg, i) => (
          <div
            key={msg.id}
            className={`flex ${msg.out ? "justify-end" : "justify-start"} animate-message`}
            style={{ animationDelay: `${i * 20}ms` }}
          >
            <div
              className={`max-w-[72%] rounded-2xl px-4 py-2.5 ${
                msg.out
                  ? "bubble-out rounded-br-sm text-white"
                  : "bubble-in rounded-bl-sm text-foreground"
              }`}
            >
              <p className="text-sm leading-relaxed">{msg.text}</p>
              <div className={`flex items-center gap-1 mt-1 ${msg.out ? "justify-end" : "justify-start"}`}>
                <span className={`text-[10px] ${msg.out ? "text-purple-200" : "text-muted-foreground"}`}>
                  {msg.time}
                </span>
                {msg.out && (
                  <Icon name="CheckCheck" size={12} className="text-purple-200" />
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-4 py-3 flex-shrink-0 border-t border-border glass">
        <div className="flex items-end gap-2">
          <button className="w-9 h-9 rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors flex-shrink-0">
            <Icon name="Paperclip" size={18} />
          </button>
          <div className="flex-1 bg-muted rounded-2xl px-4 py-2.5 flex items-center">
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Напишите сообщение..."
              rows={1}
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground resize-none outline-none leading-relaxed max-h-28"
            />
            <button className="ml-2 text-muted-foreground hover:text-foreground transition-colors flex-shrink-0">
              <Icon name="Smile" size={18} />
            </button>
          </div>
          <button
            onClick={send}
            disabled={!input.trim()}
            className="w-9 h-9 rounded-xl flex items-center justify-center bg-gradient-to-br from-purple-600 to-violet-600 text-white flex-shrink-0 hover:opacity-90 transition-all disabled:opacity-40 disabled:cursor-not-allowed glow-purple"
          >
            <Icon name="Send" size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
