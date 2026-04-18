import { Chat } from "@/data/chats";

interface Props {
  chats: Chat[];
  activeId: number | null;
  onSelect: (id: number) => void;
  searchQuery: string;
}

const avatarColors = [
  "from-purple-500 to-pink-500",
  "from-cyan-500 to-blue-500",
  "from-emerald-500 to-cyan-500",
  "from-orange-500 to-pink-500",
  "from-violet-500 to-purple-500",
  "from-rose-500 to-orange-500",
];

export default function ChatList({ chats, activeId, onSelect, searchQuery }: Props) {
  if (chats.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-48 text-muted-foreground gap-3">
        <div className="text-4xl">🔍</div>
        <p className="text-sm">Ничего не найдено</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-0.5 px-2">
      {chats.map((chat, i) => (
        <div
          key={chat.id}
          className={`chat-item rounded-xl px-3 py-3 ${activeId === chat.id ? "active" : ""}`}
          style={{ animationDelay: `${i * 40}ms` }}
          onClick={() => onSelect(chat.id)}
        >
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div
                className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${avatarColors[i % avatarColors.length]} flex items-center justify-center text-white font-semibold text-sm`}
              >
                {chat.avatar}
              </div>
              {chat.online && (
                <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-background" />
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-0.5">
                <span className="font-semibold text-sm text-foreground truncate">{chat.name}</span>
                <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">{chat.time}</span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground truncate pr-2">
                  {highlight(chat.lastMessage, searchQuery)}
                </p>
                {chat.unread > 0 && (
                  <span className="flex-shrink-0 min-w-5 h-5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-[10px] text-white font-bold px-1.5">
                    {chat.unread}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function highlight(text: string, query: string) {
  if (!query) return text;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-purple-500/30 text-purple-300 rounded px-0.5">{text.slice(idx, idx + query.length)}</mark>
      {text.slice(idx + query.length)}
    </>
  );
}
