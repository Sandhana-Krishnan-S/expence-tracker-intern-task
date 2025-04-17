"use client";
import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

function groupByCategoryForMonth(transactions, month, year) {
  const categoryTotals = {};

  transactions.forEach((tx) => {
    const date = new Date(tx.date);
    const txMonth = date.getMonth();
    const txYear = date.getFullYear();

    if (txMonth === month && txYear === year) {
      const category = tx.category || "Uncategorized";
      categoryTotals[category] = (categoryTotals[category] || 0) + Number(tx.amount);
    }
  });

  return Object.entries(categoryTotals)
    .map(([category, total]) => ({
      name: category,
      value: total,
    }))
    .sort((a, b) => b.value - a.value); 
}

const COLORS = [
  "#8884d8", "#82ca9d", "#ffc658", "#ff7f50",
  "#00c49f", "#ff69b4", "#a28ff7", "#f4a261", "#2a9d8f"
];

export default function CategoryPieChart() {
  const [transactions, setTransactions] = useState([]);
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const fetchTransactions = async () => {
      const res = await fetch("/api/transactions");
      const data = await res.json();
      setTransactions(data);
    };
    fetchTransactions();
  }, []);

  const categoryData = groupByCategoryForMonth(transactions, month, year);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <select
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
          className="border p-2 rounded"
        >
          {months.map((m, i) => (
            <option key={i} value={i}>{m}</option>
          ))}
        </select>

        <input
          type="number"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className="border p-2 rounded w-24"
        />
      </div>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Spending by Category ({months[month]} {year})</CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          {categoryData.length === 0 ? (
            <p className="text-muted-foreground">No data for this month.</p>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {categoryData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>
      {categoryData.length > 0 && (
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Category Totals</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {categoryData.map((item, idx) => (
              <div
                key={item.name}
                className="flex justify-between border-b pb-1"
              >
                <span className="font-medium">{item.name}</span>
                <span className="text-muted-foreground">₹{item.value.toFixed(2)}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
