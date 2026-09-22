import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";
import { uploadMedia } from "@/lib/cms";
export async function POST(request: Request) { if (!(await isAdmin())) return NextResponse.json({ error: "Silakan masuk sebagai admin." }, { status: 401 }); const data = await request.formData(); const file = data.get("file"); if (!(file instanceof File)) return NextResponse.json({ error: "File tidak ditemukan." }, { status: 400 }); if (file.size > 10 * 1024 * 1024) return NextResponse.json({ error: "Maksimum ukuran file 10 MB." }, { status: 400 }); try { return NextResponse.json({ url: await uploadMedia(file) }); } catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Unggah gagal." }, { status: 502 }); } }
