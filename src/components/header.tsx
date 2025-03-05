import Link from "next/link";

const Header = () => {
  return (
    <header className="flex items-center justify-between px-16 py-6 bg-gray-100 border-b border-gray-100 mb-4">
      <h2 className="font-semibold text-[30px] leading-[1.2] text-gray-900">
        Weather forecast
      </h2>
      <ul className="flex gap-8 font-medium text-[16px] leading-[1.25] text-gray-900 text-center">
        <Link href={"./"}>Home</Link>
        <Link href={"./favorites"}>Favorites</Link>
      </ul>
    </header>
  );
}

export default Header