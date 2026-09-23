import { NextResponse } from "next/server";
import { cmsFallbacks, getCms } from "@/lib/cms";

export async function GET(request: Request) {
  const contentKey = new URL(request.url).searchParams.get("key");
  if (contentKey !== "navigation") return NextResponse.json({ error: "Konten tidak tersedia." }, { status: 404 });
  return NextResponse.json(await getCms("navigation", cmsFallbacks.navigation), { headers: { "Cache-Control": "no-store" } });
}
