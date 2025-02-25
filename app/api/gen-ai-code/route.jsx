import { GenAiCode } from "@/configs/AiModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { prompt } = await req.json();
  try {
    const result = await GenAiCode.sendMessage(prompt);
    const resp = await result.response.text();
    return NextResponse.json(JSON.parse(resp));
  } catch (e) {
    console.error("Error generating AI code:", e);
    return NextResponse.json({ error: e.message });
  }
}