import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin-auth";
import { AdminConsole } from "./admin-console";
export default async function AdminPage() { if (!(await isAdmin())) redirect("/admin/login"); return <AdminConsole />; }
