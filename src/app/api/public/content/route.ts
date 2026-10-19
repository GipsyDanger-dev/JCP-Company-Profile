import { NextResponse } from "next/server";
import { cmsFallbacks, getCms } from "@/lib/cms";

export async function GET(request: Request) {
  const contentKey = new URL(request.url).searchParams.get("key");
  if (contentKey !== "navigation" && contentKey !== "portfolio" && contentKey !== "services") return NextResponse.json({ error: "Konten tidak tersedia." }, { status: 404 });
  const fallback = contentKey === "portfolio" ? cmsFallbacks.portfolio : contentKey === "services" ? cmsFallbacks.services : cmsFallbacks.navigation;
  return NextResponse.json(await getCms(contentKey, fallback), { headers: { "Cache-Control": "no-store" } });
}
