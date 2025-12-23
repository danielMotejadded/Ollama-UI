import Logo from "../assets/logo.png";
export default function Navbar() {
  return (
    <nav className="h-1/5 w-full">
      <div className="bg-zinc-800 flex justify-between p-4">
        <div className="flex">
          <img
            src={Logo}
            alt="brand logo skull in fire"
            className="w-20 h-20"
          />
          <div>
            <h2 className="font-bold text-yellow-500 text-2xl">HARINI UI</h2>
            <p className="text-white">Fire as hell</p>
          </div>
        </div>
        <div className="text-white flex items-center">
          <ul className="flex  gap-6 list-none">
            <li>Model</li>
            <li>Status</li>
            <li>Settings</li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
