import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="flex flex-wrap justify-between items-center border-t my-6 p-3">
      <p className="text-xs text-zinc-400">
        &copy; 2024 <span className="font-bold">Donation</span>With
        <span className="font-bold">Crypto</span>, Inc.
      </p>
      <p className="text-xs text-zinc-400">
        Created by{' '}
        <Link
          href="https://github.com/luuanfaria"
          target="_blank"
          className="hover:text-orange-500 transition-colors ease-in"
        >
          @luuanfaria
        </Link>
      </p>
    </footer>
  )
}
