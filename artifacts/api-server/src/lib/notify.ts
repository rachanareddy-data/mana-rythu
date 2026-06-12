import { db, notificationsTable } from "@workspace/db";

export async function notify(
  userId: number,
  type: "info" | "price" | "order" | "alert",
  title: string,
  message: string,
): Promise<void> {
  try {
    await db.insert(notificationsTable).values({ userId, type, title, message });
  } catch {
    // best-effort — never fail the parent operation
  }
}
