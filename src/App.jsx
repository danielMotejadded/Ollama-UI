import Navbar from "./components/Navbar";
import Aside from "./components/Aside";
import Main from "./components/Main";
import { useChats } from "./hooks/useChats";

function App() {
  const {
    chats,
    activeChat,
    activeChatId,
    setActiveChatId,
    createNewChat,
    setChats,
  } = useChats();

  return (
    <div className="flex h-screen w-screen">
      <Aside
        chats={chats}
        activeChatId={activeChatId}
        onNewChat={createNewChat}
        onSelectChat={setActiveChatId}
      />

      <div className="w-full flex flex-col overflow-hidden">
        <Navbar />
        <Main
          key={activeChat?.id}
          activeChat={activeChat}
          setChats={setChats}
        />
      </div>
    </div>
  );
}

export default App;
