import { getDb } from "@/lib/db";
import { ObjectId } from "mongodb";

export async function DELETE(req, { params }) {
  const db = await getDb();

  const { id } = await params;

  const collection = db.collection("transactions");

  try {
    if (!ObjectId.isValid(id)) {
      return new Response("Invalid ObjectId", { status: 400 });
    }

    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 1) {
      return new Response("Deleted", { status: 200 });
    } else {
      return new Response("Transaction not found", { status: 404 });
    }
  } catch (err) {
    console.error("Error deleting transaction:", err); 
    return new Response("Error deleting transaction", { status: 500 });
  }
}

export async function PUT(req, { params }) {
    const db = await getDb();
  
    const { id } = await params;
  
    const collection = db.collection("transactions");
  
    try {
      if (!ObjectId.isValid(id)) {
        return new Response("Invalid ObjectId", { status: 400 });
      }
  
      const updatedData = await req.json();
  
      const result = await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updatedData } 
      );
  
      if (result.modifiedCount === 1) {
        const updatedTransaction = await collection.findOne({ _id: new ObjectId(id) });
        return new Response(JSON.stringify(updatedTransaction), { status: 200 });
      } else {
        return new Response("Transaction not found or no changes", { status: 404 });
      }
    } catch (err) {
      console.error("Error updating transaction:", err); 
      return new Response("Error updating transaction", { status: 500 });
    }
  }
  