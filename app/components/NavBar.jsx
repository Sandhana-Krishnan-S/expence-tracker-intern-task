"use client";

import {
  Sheet,
  SheetContent,
  SheetTrigger
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export default function NavBar({ onSelectPage }) {
  return (
    <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6">
      {/* Mobile Nav */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-2 py-6 text-white">
            <button onClick={() => onSelectPage("home")} className="text-lg font-semibold text-left">Home</button>
            <button onClick={() => onSelectPage("add-transaction")} className="text-lg font-semibold text-left">Add-Transaction</button>
            <button onClick={() => onSelectPage("report")} className="text-lg font-semibold text-left">Report</button>
          </nav>
        </SheetContent>
      </Sheet>

      {/* Logo */}
      <div className="mr-6 hidden lg:flex">
        <MountainIcon className="h-6 w-6 text-white" />
      </div>

      {/* Desktop Nav */}
      <nav className="ml-auto hidden lg:flex gap-6">
        <button
          onClick={() => onSelectPage("home")}
          className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium hover:bg-gray-100 hover:text-gray-900 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50"
        >
          Home
        </button>
        <button
          onClick={() => onSelectPage("add-transaction")}
          className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium hover:bg-gray-100 hover:text-gray-900 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50"
        >
          Add-Transaction
        </button>
        <button
          onClick={() => onSelectPage("report")}
          className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium hover:bg-gray-100 hover:text-gray-900 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50"
        >
          Report
        </button>
      </nav>
    </header>
  );
}

function MenuIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24"
      viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}

function MountainIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24"
      viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round">
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}
