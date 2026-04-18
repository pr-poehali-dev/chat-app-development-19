import { useState } from "react";
import Icon from "@/components/ui/icon";

export default function TaxiOrder() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto">
      {/* Header */}
      <div className="glass border-b border-border px-4 py-4 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
            <Icon name="Car" size={18} className="text-white" />
          </div>
          <div>
            <p className="font-semibold text-sm" style={{ fontFamily: "Montserrat, sans-serif" }}>Найти кто отвезет-привезет</p>
            <p className="text-xs text-muted-foreground">Быстро и надёжно</p>
          </div>
        </div>
      </div>

      <div className="flex-1 px-4 py-5 flex flex-col gap-5">
        {/* Map placeholder */}
        <div className="relative rounded-2xl overflow-hidden h-44 bg-gradient-to-br from-slate-800 to-slate-900 border border-border flex items-center justify-center">
          <div className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: "radial-gradient(circle at 2px 2px, rgba(168,85,247,0.4) 1px, transparent 0)",
              backgroundSize: "28px 28px"
            }}
          />
          <div className="text-center text-muted-foreground">
            <div className="text-3xl mb-2">🗺️</div>
            <p className="text-xs">Карта маршрута</p>
          </div>
          <div className="absolute top-3 right-3">
            <div className="w-7 h-7 rounded-lg bg-background/80 backdrop-blur flex items-center justify-center text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
              <Icon name="Maximize2" size={14} />
            </div>
          </div>
        </div>

        {/* Route inputs */}
        <div className="flex flex-col gap-2">
          <div className="relative flex items-center bg-muted rounded-xl px-4 py-3 gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 flex-shrink-0" />
            <input
              value={from}
              onChange={e => setFrom(e.target.value)}
              placeholder="Откуда?"
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
            />
            {from && (
              <button onClick={() => setFrom("")} className="text-muted-foreground hover:text-foreground">
                <Icon name="X" size={14} />
              </button>
            )}
          </div>

          <div className="flex items-center px-6">
            <div className="w-px h-4 bg-border" />
          </div>

          <div className="relative flex items-center bg-muted rounded-xl px-4 py-3 gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-purple-400 flex-shrink-0" />
            <input
              value={to}
              onChange={e => setTo(e.target.value)}
              placeholder="Куда?"
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
            />
            {to && (
              <button onClick={() => setTo("")} className="text-muted-foreground hover:text-foreground">
                <Icon name="X" size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Options */}
        <div className="flex gap-2">
          {[
            { icon: "Clock", label: "Сейчас" },
            { icon: "Users", label: "1 пасс." },
            { icon: "Briefcase", label: "Багаж" },
          ].map(opt => (
            <button
              key={opt.label}
              className="flex-1 flex items-center justify-center gap-1.5 bg-muted rounded-xl py-2.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <Icon name={opt.icon} size={13} />
              {opt.label}
            </button>
          ))}
        </div>

        {/* Order button */}
        <button
          className="w-full py-6 rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold text-lg shadow-xl hover:opacity-90 transition-all active:scale-95"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          🚕 Увезет • Привезет
        </button>

        {/* Info */}
        <div className="flex gap-3">
          {[
            { icon: "Clock", label: "~5 мин", sub: "до подачи" },
            { icon: "Shield", label: "Безопасно", sub: "проверен. водители" },
            { icon: "Star", label: "4.9 ★", sub: "рейтинг" },
          ].map(item => (
            <div key={item.label} className="flex-1 bg-muted rounded-xl p-3 flex flex-col items-center gap-1">
              <Icon name={item.icon} size={16} className="text-muted-foreground" />
              <span className="text-xs font-semibold text-foreground">{item.label}</span>
              <span className="text-[10px] text-muted-foreground text-center">{item.sub}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}