import Logo from "../assets/logo.png";
export default function Navbar() {
  return (
    <nav className=" w-full">
      <div className="bg-zinc-900 flex justify-end p-8">
     
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
