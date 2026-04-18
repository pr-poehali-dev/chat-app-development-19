import { useState, useMemo } from "react";
import { chats } from "@/data/chats";
import ChatList from "@/components/ChatList";
import ChatWindow from "@/components/ChatWindow";
import Icon from "@/components/ui/icon";

export default function Index() {
  const [activeId, setActiveId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showChat, setShowChat] = useState(false);

  const activeChat = chats.find(c => c.id === activeId) ?? null;

  const filteredChats = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return chats;
    return chats.filter(
      c =>
        c.name.toLowerCase().includes(q) ||
        c.lastMessage.toLowerCase().includes(q) ||
        c.messages.some(m => m.text.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  const totalUnread = chats.reduce((s, c) => s + c.unread, 0);

  const handleSelect = (id: number) => {
    setActiveId(id);
    setShowChat(true);
  };

  const handleBack = () => {
    setShowChat(false);
  };

  return (
    <div className="h-screen flex overflow-hidden bg-background">
      {/* Background blobs */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/8 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/5 rounded-full blur-3xl" />
      </div>

      {/* Sidebar */}
      <aside
        className={`
          ${showChat ? "hidden md:flex" : "flex"}
          w-full md:w-80 lg:w-96
          flex-col h-full border-r border-border
          bg-background/90 backdrop-blur-xl
          flex-shrink-0 relative z-10
        `}
      >
        {/* Header */}
        <div className="px-4 pt-5 pb-3 flex-shrink-0">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center glow-purple">
                <Icon name="MessageCircle" size={16} className="text-white" />
              </div>
              <span className="font-bold text-base" style={{ fontFamily: "Montserrat, sans-serif" }}>
                Сообщения
              </span>
              {totalUnread > 0 && (
                <span className="text-[10px] font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full px-2 py-0.5">
                  {totalUnread}
                </span>
              )}
            </div>
            <div className="flex gap-1">
              <button className="w-8 h-8 rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                <Icon name="PenSquare" size={16} />
              </button>
              <button className="w-8 h-8 rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                <Icon name="Settings" size={16} />
              </button>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Icon
              name="Search"
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Поиск по чатам и сообщениям..."
              className="w-full bg-muted rounded-xl pl-9 pr-9 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-purple-500/50 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <Icon name="X" size={14} />
              </button>
            )}
          </div>

          {searchQuery && (
            <p className="text-xs text-muted-foreground mt-2 px-1">
              Найдено: {filteredChats.length} чат{filteredChats.length !== 1 ? "а" : ""}
            </p>
          )}
        </div>

        {/* Filter tabs */}
        {!searchQuery && (
          <div className="px-4 mb-2 flex-shrink-0">
            <div className="flex gap-1 bg-muted rounded-xl p-1">
              {["Все", "Личные", "Группы"].map((tab, i) => (
                <button
                  key={tab}
                  className={`flex-1 text-xs py-1.5 rounded-lg transition-all ${
                    i === 0
                      ? "bg-gradient-to-r from-purple-600 to-violet-600 text-white font-semibold shadow"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Chat list */}
        <div className="flex-1 overflow-y-auto py-1">
          <ChatList
            chats={filteredChats}
            activeId={activeId}
            onSelect={handleSelect}
            searchQuery={searchQuery}
          />
        </div>

        {/* Bottom nav */}
        <div className="flex-shrink-0 border-t border-border px-2 py-2">
          <div className="flex">
            {[
              { icon: "MessageCircle", label: "Чаты", active: true },
              { icon: "Users", label: "Контакты", active: false },
              { icon: "Bell", label: "Уведомления", active: false },
              { icon: "User", label: "Профиль", active: false },
            ].map(item => (
              <button
                key={item.icon}
                className={`flex-1 flex flex-col items-center gap-1 py-2 rounded-xl transition-all ${
                  item.active
                    ? "text-purple-400"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon name={item.icon} size={18} />
                <span className="text-[10px] font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Chat area */}
      <main
        className={`
          ${showChat ? "flex" : "hidden md:flex"}
          flex-1 flex-col h-full overflow-hidden relative z-10
        `}
      >
        <ChatWindow chat={activeChat} onBack={handleBack} />
      </main>
    </div>
  );
}
