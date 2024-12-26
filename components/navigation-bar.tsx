import Link from 'next/link'

export function NavigationBar() {
  return (
    <nav className="bg-gray-900/80 backdrop-blur-sm text-white py-4 shadow-md">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/">
          <h1 className="text-2xl font-bold">
            <span className="text-yellow-400">School Bus</span> Tracker
          </h1>
        </Link>
      </div>
    </nav>
  )
}
