import Logo from "../assets/logo.png";

export default function Aside({
  chats,
  activeChatId,
  onNewChat,
  onSelectChat,
}) {
  return (
    <aside className="w-64 bg-zinc-900 p-4 text-white h-full">
      <div className="flex items-center gap-3">
        <img
          src={Logo}
          alt="brand logo skull in fire"
          className="w-20 h-20"
        />
        <div>
          <h2 className="font-bold text-yellow-500 text-2xl">
            HARINI UI
          </h2>
          <p className="text-white">Fire as hell</p>
        </div>
      </div>

      <button
        onClick={onNewChat}
        className="mt-6 w-full rounded bg-zinc-800 px-3 py-2 text-left hover:bg-zinc-700"
      >
        + Nowy czat
      </button>

      <ul className="mt-4 space-y-1">
        {chats.map(chat => (
          <li key={chat.id}>
            <button
              onClick={() => onSelectChat(chat.id)}
              className={`w-full text-left rounded px-3 py-2 ${
                chat.id === activeChatId
                  ? "bg-yellow-500 text-black"
                  : "hover:bg-zinc-800"
              }`}
            >
              {chat.title}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
