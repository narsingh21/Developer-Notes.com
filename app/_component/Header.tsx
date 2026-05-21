import Link from "next/link";

interface HeaderProps {
  title?: string;
  className?: string;
}

export function Header({
  title = 'Developer Notes',
  className = '',
}: HeaderProps) {
  return (
    <header className={`w-full bg-white text-black px-6 py-4 ${className}`}>
      <div className='max-w-7xl mx-auto flex justify-between'>
        <h1 className='text-xl font-bold'>{title}</h1>
        <Link href='/blogs' >Resource</Link>
        <Link href='/blogs' >New</Link>
        <Link href='/blogs' >blogs</Link>
      </div>
    </header>
  );
}
