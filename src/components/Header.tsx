import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  return (
    <nav
      className=" flex w-full justify-center py-4 items-center 
        border-b border-gray-300  backdrop-blur-2xl font-mono text-sm px-4 lg:px-0"
    >
      <div className="max-w-6xl flex w-full items-center justify-between">
        <div className="font-medium text-xl text-indigo-900 flex items-center gap-2">
          {/* <div>logo</div> */}
          <Link href="/">markdown-to-image</Link>
        </div>
        <div className="flex items-center justify-center gap-1 text-sm font-light text-indigo-900/90">
          <p
            className="py-2 px-4 rounded-full flex justify-center items-center
                lg:hover:bg-indigo-300 duration-200"
          >
            <Link href="/">Web Editor</Link>
          </p>
          <p
            className="py-2 px-4 rounded-full flex justify-center items-center
                lg:hover:bg-indigo-300 duration-200"
          >
            <Link href="/docs">Docs</Link>
          </p>
          <p
            className="py-2 px-4 rounded-full flex justify-center items-center
                lg:hover:bg-indigo-300 duration-200
                "
          >
          </p>
        </div>
      </div>
    </nav>
  )
}
