export default function NewChatButtn({ onNewChat }) {
  return (
    <button
      onClick={onNewChat}
      className="w-full px-3 py-2 bg-zinc-700 hover:bg-zinc-600 text-white rounded"
    >
      + New chat
    </button>
  );
}
