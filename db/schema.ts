import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const waitlist = pgTable("waitlist", {
    id: serial("id").primaryKey(),
    email: text("email").notNull().unique(),
    country: text("country"),
    city: text("city"),
    region: text("region"),
    ip: text("ip"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});
