import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
export function groupTransactionsByMonth(transactions) {
  const monthMap = {};

  transactions.forEach((tx) => {
    const date = new Date(tx.date);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`; 
    const label = date.toLocaleString("default", { month: "short", year: "numeric" }); 

    if (!monthMap[monthKey]) {
      monthMap[monthKey] = { label, total: 0 };
    }

    monthMap[monthKey].total += Number(tx.amount);
  });

  return Object.entries(monthMap)
    .sort(([a], [b]) => new Date(a) - new Date(b))
    .map(([_, value]) => ({
      month: value.label,
      total: value.total,
    }));
}

