import { NextResponse } from "next/server";
import { readExpenses, addExpense } from "@/lib/db";

export async function GET() {
  const data = readExpenses();
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const body = await request.json();
  const newExpense = addExpense({
    title: body.title,
    amount: parseFloat(body.amount),
    category: body.category,
    date: body.date,
  });
  return NextResponse.json(newExpense);
}
