'use client'

import { useState } from "react";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import NavBar from "./components/NavBar";

export default function Home() {
  const [activePage, setActivePage] = useState("home");

  return (
    <main className="bg-[#121910] w-[100dvw] h-auto flex flex-col">
      <NavBar onSelectPage={setActivePage} />

      <div className="flex-1 p-4 text-white">
        {activePage === "home" && <TransactionList />}
        {activePage === "add-transaction" && <TransactionForm />}
        {activePage === "report" && <div>Report Page</div>}
      </div>
    </main>
  );
}
