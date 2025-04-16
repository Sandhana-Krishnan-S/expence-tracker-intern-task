"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  

export default function TransactionForm({ onAdd }) {
  const [form, setForm] = useState({
    amount: "",
    date: "",
    description: "",
    category: "Uncategorized",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/transactions", {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      setForm({ amount: "", date: "", description: "", category: "Uncategorized" });
      onAdd(); // Refresh the list
    } else {
      console.error("Failed to add transaction");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg">
      <Input
        name="amount"
        placeholder="Amount"
        value={form.amount}
        onChange={handleChange}
        type="number"
        required
        className="w-full"
      />
      <Input
        name="date"
        type="date"
        value={form.date}
        onChange={handleChange}
        required
        className="w-full"
      />
      <Input
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        required
        className="w-full"
      />
      <Select value={form.category} onValueChange={(value) => setForm({ ...form, category: value })}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select Category" />
        </SelectTrigger>
        <SelectContent>
            <SelectItem value="Food">Food</SelectItem>
            <SelectItem value="Transport">Transport</SelectItem>
            <SelectItem value="Entertainment">Entertainment</SelectItem>
            <SelectItem value="Uncategorized">Uncategorized</SelectItem>
        </SelectContent>
      </Select>
      <Button type="submit" className="w-full bg-black text-white">
        Add Transaction
      </Button>
    </form>
  );
}
