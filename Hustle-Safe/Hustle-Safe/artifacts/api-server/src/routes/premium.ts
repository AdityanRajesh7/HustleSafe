import { Router } from "express";
import { db, premiumHistoryTable, workersTable, zonesTable, policiesTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const TIER_BASE: Record<string, number> = { basic: 15, standard: 25, pro: 40 };

const router = Router();

router.get("/premium/history/:workerId", async (req, res) => {
  try {
    const { workerId } = req.params;
    const history = await db.select().from(premiumHistoryTable)
      .where(eq(premiumHistoryTable.worker_id, workerId))
      .orderBy(premiumHistoryTable.week_start);

    const [worker] = await db.select().from(workersTable).where(eq(workersTable.id, workerId));
    const [policy] = await db.select().from(policiesTable).where(eq(policiesTable.worker_id, workerId));
    const [zone] = worker ? await db.select().from(zonesTable).where(eq(zonesTable.id, worker.zone_id)) : [null];

    const tier = worker?.policy_tier || "standard";
    const basePremium = TIER_BASE[tier] || 25;
    const zoneGds = zone?.gds_score || 20;
    const zoneAdjustment = parseFloat(((zoneGds / 100) * basePremium * 0.3).toFixed(2));
    const workerScore = parseFloat(worker?.fraud_score || "0.05");
    const workerAdjustment = parseFloat((workerScore * basePremium * 0.2).toFixed(2));
    const currentPremium = parseFloat((basePremium + zoneAdjustment + workerAdjustment).toFixed(2));

    const explanations: string[] = [];
    if (zoneGds > 50) explanations.push(`Zone risk elevated (GDS ${zoneGds})`);
    if (workerScore < 0.2) explanations.push("Low fraud risk — loyalty discount applied");
    if (explanations.length === 0) explanations.push("Standard rate for your zone and profile");

    res.json({
      history,
      current_premium: currentPremium,
      base_premium: basePremium,
      zone_adjustment: zoneAdjustment,
      worker_adjustment: workerAdjustment,
      explanation: explanations.join(". "),
    });
  } catch (err) {
    req.log.error({ err }, "Failed to get premium history");
    res.status(500).json({ error: "Failed to get premium history" });
  }
});

export default router;
