import { getDb } from "@/lib/db";

export async function POST(req) {
  const body = await req.json();
  const { amount, date, description, category } = body;

  if (!amount || !date || !description || !category) {
    return new Response(JSON.stringify({ error: "Missing fields" }), { status: 400 });
  }

  const db = await getDb();
  const result = await db.collection("transactions").insertOne({
    amount: Number(amount),
    date: new Date(date),
    description,
    category,
  });

  return new Response(JSON.stringify({ success: true, id: result.insertedId }), { status: 201 });
}

export async function GET() {
  const db = await getDb();
  const transactions = await db.collection("transactions").find().sort({ date: -1 }).toArray();
  return new Response(JSON.stringify(transactions), { status: 200 });
}
