import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { groupTransactionsByMonth } from "@/lib/utils";

export default function TransactionList() {
  const [transactions, setTransactions] = useState([]);
  const [editing, setEditing] = useState(null); // currently editing transaction
  const [updatedTx, setUpdatedTx] = useState({ amount: "", description: "" });

  const fetchTransactions = async () => {
    const res = await fetch("/api/transactions");
    const data = await res.json();
    setTransactions(data);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleDelete = async (id) => {
    const res = await fetch(`/api/transactions/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setTransactions((prev) => prev.filter((tx) => tx._id !== id));
    } else {
      alert("Failed to delete transaction.");
    }
  };

  const handleEdit = (tx) => {
    setEditing(tx);
    setUpdatedTx({ amount: tx.amount, description: tx.description });
  };

  const handleUpdate = async () => {
    if (!updatedTx.amount || !updatedTx.description) return alert("All fields are required.");

    const res = await fetch(`/api/transactions/${editing._id}`, {
      method: "PUT",
      body: JSON.stringify(updatedTx),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      const updatedTransaction = await res.json();
      setTransactions((prev) =>
        prev.map((tx) => (tx._id === updatedTransaction._id ? updatedTransaction : tx))
      );
      setEditing(null); // Close edit mode
    } else {
      const data = await res.json();
      alert(data.message || "Failed to update transaction.");
    }
  };

  const monthlyData = groupTransactionsByMonth(transactions);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Spending Overview</h2>

      <div className="w-full h-64 bg-card rounded-xl p-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={monthlyData}>
            <XAxis dataKey="month" stroke="currentColor" />
            <YAxis stroke="currentColor" />
            <Tooltip />
            <Bar dataKey="total" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <h2 className="text-2xl font-bold">Transactions</h2>
      {transactions.map((tx) => (
        <Card key={tx._id}>
          <CardHeader className="flex justify-between items-center">
            <CardTitle className="text-lg font-semibold">₹{tx.amount}</CardTitle>
            <span className="text-sm text-muted-foreground">{tx.category}</span>
          </CardHeader>
          <CardContent className="space-y-2">
            {editing && editing._id === tx._id ? (
              // Show edit form when in edit mode for the current transaction
              <div>
                <input
                  type="number"
                  value={updatedTx.amount}
                  onChange={(e) => setUpdatedTx({ ...updatedTx, amount: e.target.value })}
                  className="p-2 border rounded"
                />
                <input
                  type="text"
                  value={updatedTx.description}
                  onChange={(e) => setUpdatedTx({ ...updatedTx, description: e.target.value })}
                  className="p-2 border rounded ml-2"
                />
                <div className="mt-2">
                  <button
                    onClick={handleUpdate}
                    disabled={!updatedTx.amount || !updatedTx.description}
                    className="text-blue-500 hover:underline"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditing(null)} // Close edit mode
                    className="text-gray-500 hover:underline ml-2"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <p>{tx.description}</p>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <p>{new Date(tx.date).toLocaleDateString()}</p>
                  <div className="space-x-2">
                    <button
                      onClick={() => handleEdit(tx)}
                      className="text-blue-500 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(tx._id)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
