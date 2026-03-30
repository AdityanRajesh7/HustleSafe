import { pgTable, uuid, text, decimal, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const claimsTable = pgTable("claims", {
  id: uuid("id").primaryKey().defaultRandom(),
  worker_id: uuid("worker_id").notNull(),
  policy_id: uuid("policy_id"),
  zone_id: text("zone_id"),
  disruption_type: text("disruption_type"),
  disruption_start: timestamp("disruption_start", { withTimezone: true }),
  disruption_end: timestamp("disruption_end", { withTimezone: true }),
  hours_affected: decimal("hours_affected", { precision: 4, scale: 2 }),
  hourly_rate: decimal("hourly_rate", { precision: 8, scale: 2 }).default("90").notNull(),
  payout_amount: decimal("payout_amount", { precision: 10, scale: 2 }),
  fraud_score: decimal("fraud_score", { precision: 3, scale: 2 }).default("0.0").notNull(),
  status: text("status").default("pending").notNull(),
  fraud_signals: jsonb("fraud_signals").default({}).notNull(),
  resolution_notes: text("resolution_notes"),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  paid_at: timestamp("paid_at", { withTimezone: true }),
});

export const insertClaimSchema = createInsertSchema(claimsTable).omit({ id: true, created_at: true });
export type InsertClaim = z.infer<typeof insertClaimSchema>;
export type Claim = typeof claimsTable.$inferSelect;
