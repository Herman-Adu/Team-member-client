import NavLink from "./NavLink";

export default function Header() {
  // Navigation items array
  const navItems = [
    { label: "Home", path: "/" },
    { label: "Our Team", path: "/our-team" },
    { label: "About", path: "/about-us" },
    //{ label: "Contact", path: "/contact" },
  ];

  return (
    <header className="bg-white/50 backdrop-blur z-10">
      <div className="max-w-5xl pl-5 pr-5 mx-auto flex items-center justify-between">
        <h2 className="text-2xl text-gray-500 py-6">Adu Dev LTD</h2>
        <nav>
          <ul className="flex gap-x-7 text-gray-500 text-sm">
            {navItems.map((item, index) => (
              <li
                key={index}
                className="flex items-center p-1 text-lg gap-x-2 text-slate-600 hover:text-orange-500"
              >
                <NavLink path={item.path} label={item.label} />
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
