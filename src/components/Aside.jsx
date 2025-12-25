import Logo from '../assets/logo.png'
export default function Aside() {
  return (
    <aside className="w-64  bg-zinc-900 p-4 text-white h-full">
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
      <ul>
        <li>Topic</li>
      </ul>
    </aside>
  );
}
