import Link from 'next/link';

const links = [
  { href: '/projects/v3', label: 'Projects' },
  { href: '/about', label: 'About' },
  { href: '/process', label: 'Process' },
  { href: '/contact', label: 'Contact' },
];

export default function Footer() {
  return (
    <footer className="bg-[#f6f4ef] px-5 pb-10 text-neutral-950 sm:px-8 lg:px-12">
      <div className="border-t border-neutral-950/15 pt-5">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <p className="text-sm font-semibold uppercase leading-none tracking-[-0.02em]">Atelier SOW</p>
            <p className="mt-4 max-w-[360px] text-sm leading-6 text-neutral-500">
              서울특별시 서초구 서초대로 78길 44, 서초나산스위트
            </p>
          </div>

          <div className="flex flex-col gap-2 text-xs uppercase tracking-[0.18em] text-neutral-500">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="transition-colors hover:text-neutral-950">
                {link.label}
              </Link>
            ))}
          </div>

          <div className="text-xs leading-6 text-neutral-500 md:text-right">
            <p>T. +82 10 5647 4032</p>
            <p>E. sowarch@naver.com</p>
            <p className="mt-4 uppercase tracking-[0.18em]">© {new Date().getFullYear()} Atelier SOW</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
