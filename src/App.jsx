import Navbar from "./components/Navbar";
import Aside from "./components/Aside";
import Main from "./components/Main";

function App() {
  return (
    <>
      <div className="flex h-screen w-screen">
        <div className="h-full">
          <Aside />
        </div>
        <div className="w-full flex flex-col">
          <Navbar />
          <Main />
        </div>
      </div>
    </>
  );
}

export default App;
