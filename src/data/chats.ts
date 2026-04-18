export interface Message {
  id: number;
  text: string;
  time: string;
  out: boolean;
}

export interface Chat {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  messages: Message[];
}

export const chats: Chat[] = [
  {
    id: 1,
    name: "Алина Морозова",
    avatar: "АМ",
    lastMessage: "Окей, завтра в 10:00 на встрече 👍",
    time: "сейчас",
    unread: 2,
    online: true,
    messages: [
      { id: 1, text: "Привет! Как дела с проектом?", time: "09:30", out: false },
      { id: 2, text: "Всё отлично! Почти закончили основную часть", time: "09:32", out: true },
      { id: 3, text: "Когда сможете показать результаты?", time: "09:33", out: false },
      { id: 4, text: "Завтра пришлю превью — нужно ещё поправить пару деталей", time: "09:35", out: true },
      { id: 5, text: "Окей, завтра в 10:00 на встрече 👍", time: "сейчас", out: false },
    ],
  },
  {
    id: 2,
    name: "Команда дизайна",
    avatar: "КД",
    lastMessage: "Макеты готовы, смотри в Figma",
    time: "14:22",
    unread: 0,
    online: false,
    messages: [
      { id: 1, text: "Нужно обновить цвета в кнопках", time: "13:10", out: true },
      { id: 2, text: "Уже работаем над этим!", time: "13:45", out: false },
      { id: 3, text: "Вот референсы для нового стиля", time: "14:00", out: false },
      { id: 4, text: "Отлично, именно то что нужно!", time: "14:18", out: true },
      { id: 5, text: "Макеты готовы, смотри в Figma", time: "14:22", out: false },
    ],
  },
  {
    id: 3,
    name: "Максим Петров",
    avatar: "МП",
    lastMessage: "Договорились! Увидимся на конференции",
    time: "вчера",
    unread: 0,
    online: true,
    messages: [
      { id: 1, text: "Слушай, ты будешь на TechConf в пятницу?", time: "вчера", out: false },
      { id: 2, text: "Да, планирую быть!", time: "вчера", out: true },
      { id: 3, text: "Давай пересечёмся там, есть интересное предложение", time: "вчера", out: false },
      { id: 4, text: "Договорились! Увидимся на конференции", time: "вчера", out: true },
    ],
  },
  {
    id: 4,
    name: "Отдел маркетинга",
    avatar: "ОМ",
    lastMessage: "Новая кампания стартует в понедельник",
    time: "пн",
    unread: 5,
    online: false,
    messages: [
      { id: 1, text: "Коллеги, нужно обсудить Q4 стратегию", time: "пн", out: false },
      { id: 2, text: "Готов к обсуждению", time: "пн", out: true },
      { id: 3, text: "Новая кампания стартует в понедельник", time: "пн", out: false },
    ],
  },
  {
    id: 5,
    name: "Сергей Иванов",
    avatar: "СИ",
    lastMessage: "Спасибо за помощь с презентацией!",
    time: "пн",
    unread: 0,
    online: false,
    messages: [
      { id: 1, text: "Привет, можешь глянуть мои слайды?", time: "вс", out: false },
      { id: 2, text: "Конечно, скидывай", time: "вс", out: true },
      { id: 3, text: "Исправил как советовал — намного лучше стало", time: "пн", out: false },
      { id: 4, text: "Спасибо за помощь с презентацией!", time: "пн", out: false },
    ],
  },
  {
    id: 6,
    name: "Катя Белова",
    avatar: "КБ",
    lastMessage: "Жду твоё мнение по концепции 🎨",
    time: "вс",
    unread: 1,
    online: true,
    messages: [
      { id: 1, text: "Сделала новый вариант логотипа", time: "вс", out: false },
      { id: 2, text: "Вау, смотрится очень круто!", time: "вс", out: true },
      { id: 3, text: "Жду твоё мнение по концепции 🎨", time: "вс", out: false },
    ],
  },
];
