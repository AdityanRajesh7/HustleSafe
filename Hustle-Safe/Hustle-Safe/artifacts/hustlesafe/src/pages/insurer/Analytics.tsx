import { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line, Legend, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell } from "recharts";
import { Loader2 } from "lucide-react";

// Fallbacks for the demo
const fallbackLossData = [
  { week: 'W1', premium: 120000, claims: 45000 },
  { week: 'W2', premium: 125000, claims: 50000 },
  { week: 'W3', premium: 130000, claims: 180000 },
  { week: 'W4', premium: 140000, claims: 60000 },
  { week: 'W5', premium: 145000, claims: 55000 },
  { week: 'W6', premium: 150000, claims: 40000 },
];

const fallbackTierData = [
  { name: 'Basic', value: 30, color: '#94A3B8' },
  { name: 'Standard', value: 50, color: '#4F46E5' },
  { name: 'Pro', value: 20, color: '#0F172A' },
];

const fallbackHourlyForecast = [
  { time: '08:00', Koramangala: 32, Indiranagar: 28, Whitefield: 20, Electronic_City: 15, HSR_Layout: 25, BTM_Layout: 30, Marathahalli: 22, Jayanagar: 18 },
  { time: '10:00', Koramangala: 35, Indiranagar: 30, Whitefield: 22, Electronic_City: 18, HSR_Layout: 28, BTM_Layout: 32, Marathahalli: 25, Jayanagar: 20 },
  { time: '12:00', Koramangala: 40, Indiranagar: 35, Whitefield: 25, Electronic_City: 20, HSR_Layout: 30, BTM_Layout: 35, Marathahalli: 28, Jayanagar: 22 },
  { time: '14:00', Koramangala: 55, Indiranagar: 45, Whitefield: 30, Electronic_City: 25, HSR_Layout: 40, BTM_Layout: 45, Marathahalli: 35, Jayanagar: 28 },
  { time: '16:00', Koramangala: 86, Indiranagar: 78, Whitefield: 45, Electronic_City: 35, HSR_Layout: 65, BTM_Layout: 75, Marathahalli: 50, Jayanagar: 40 },
  { time: '18:00', Koramangala: 60, Indiranagar: 55, Whitefield: 35, Electronic_City: 28, HSR_Layout: 45, BTM_Layout: 50, Marathahalli: 40, Jayanagar: 35 },
  { time: '20:00', Koramangala: 45, Indiranagar: 40, Whitefield: 28, Electronic_City: 22, HSR_Layout: 35, BTM_Layout: 40, Marathahalli: 30, Jayanagar: 25 },
  { time: '22:00', Koramangala: 30, Indiranagar: 28, Whitefield: 20, Electronic_City: 15, HSR_Layout: 25, BTM_Layout: 30, Marathahalli: 22, Jayanagar: 18 },
];

const fallback7DayForecast = [
  { Koramangala: 86, Indiranagar: 78, Whitefield: 45, Electronic_City: 35, HSR_Layout: 65, BTM_Layout: 75, Marathahalli: 50, Jayanagar: 40 }, // Today
  { Koramangala: 45, Indiranagar: 35, Whitefield: 25, Electronic_City: 18, HSR_Layout: 30, BTM_Layout: 35, Marathahalli: 28, Jayanagar: 22 }, // Tomorrow
  { Koramangala: 55, Indiranagar: 42, Whitefield: 30, Electronic_City: 22, HSR_Layout: 38, BTM_Layout: 45, Marathahalli: 35, Jayanagar: 28 },
  { Koramangala: 30, Indiranagar: 25, Whitefield: 20, Electronic_City: 15, HSR_Layout: 22, BTM_Layout: 28, Marathahalli: 25, Jayanagar: 20 },
  { Koramangala: 65, Indiranagar: 50, Whitefield: 35, Electronic_City: 25, HSR_Layout: 42, BTM_Layout: 55, Marathahalli: 40, Jayanagar: 30 },
  { Koramangala: 30, Indiranagar: 25, Whitefield: 20, Electronic_City: 15, HSR_Layout: 22, BTM_Layout: 28, Marathahalli: 25, Jayanagar: 20 },
  { Koramangala: 28, Indiranagar: 22, Whitefield: 18, Electronic_City: 12, HSR_Layout: 20, BTM_Layout: 25, Marathahalli: 20, Jayanagar: 18 },
];

const getNext7DaysLabels = () => Array.from({ length: 7 }).map((_, i) => {
  const d = new Date(); d.setDate(d.getDate() + i);
  let label = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  if (i === 0) label += " (Today)";
  return label;
});

// New hardcoded state for the top level KPIs
const FALLBACK_OVERVIEW = {
  active_policies: 2847,
  total_paid_out: 430000,
  loss_ratio: 53.0,
  monthly_premium: 810000
};

export function InsurerAnalytics() {
  const [ai7DayData, setAi7DayData] = useState<any[]>([]);
  const [aiHourlyData, setAiHourlyData] = useState<any[]>([]);
  const [lossData, setLossData] = useState<any[]>(fallbackLossData);
  const [tierData, setTierData] = useState<any[]>(fallbackTierData);
  const [overviewData, setOverviewData] = useState<any>(FALLBACK_OVERVIEW);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000);

        const [forecast7dRes, forecast24hRes, historyRes, overviewRes] = await Promise.all([
          fetch('/api/zones/forecast/7-day', { signal: controller.signal }).catch(() => null),
          fetch('/api/zones/forecast/24-hour', { signal: controller.signal }).catch(() => null),
          fetch('/api/analytics/history', { signal: controller.signal }).catch(() => null),
          fetch('/api/analytics/overview', { signal: controller.signal }).catch(() => null)
        ]);

        clearTimeout(timeoutId);

        // API Check: Overview KPIs
        if (overviewRes && overviewRes.ok) {
          const data = await overviewRes.json();
          setOverviewData(data);
          console.log("✅ [Insurer Analytics] Overview API connected successfully.");
        } else {
          console.warn("⚠️ [Insurer Analytics] Overview API offline. Using hardcoded FALLBACK_OVERVIEW.");
          setOverviewData(FALLBACK_OVERVIEW);
        }

        const dynamicDates = getNext7DaysLabels();
        let processed7Day = fallback7DayForecast.map((item, idx) => ({ ...item, day: dynamicDates[idx] }));
        if (forecast7dRes && forecast7dRes.ok) {
          const data = await forecast7dRes.json();
          if (data.forecast) processed7Day = data.forecast.map((item: any, idx: number) => ({ ...item, day: dynamicDates[idx] || `Day ${idx + 1}` }));
        }
        setAi7DayData(processed7Day);

        let processedHourly = fallbackHourlyForecast;
        if (forecast24hRes && forecast24hRes.ok) {
          const data = await forecast24hRes.json();
          if (data.forecast) processedHourly = data.forecast;
        }
        setAiHourlyData(processedHourly);

        if (historyRes && historyRes.ok) {
          const data = await historyRes.json();
          if (data.lossData) setLossData(data.lossData);
          if (data.tierData) setTierData(data.tierData);
        }

      } catch (error) {
        console.error("❌ [Insurer Analytics] Fetch failed, forcing dynamically synced fallbacks.", error);
        setOverviewData(FALLBACK_OVERVIEW);
        const dynamicDates = getNext7DaysLabels();
        setAi7DayData(fallback7DayForecast.map((item, idx) => ({ ...item, day: dynamicDates[idx] })));
        setAiHourlyData(fallbackHourlyForecast);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  const formatLakhs = (val: number) => val >= 100000 ? `₹${(val / 100000).toFixed(1)}L` : `₹${val?.toLocaleString() || 0}`;

  return (
    <AppLayout>
      <div className="space-y-8 pb-12">
        <div>
          <h1 className="text-3xl font-display font-bold">Platform Analytics</h1>
          <p className="text-muted-foreground mt-1">Financial performance and risk distribution.</p>
        </div>

        {/* 4 DYNAMIC KPIs */}
        <div className="grid grid-cols-4 gap-6">
          <div className="bg-card rounded-3xl p-6 border border-border shadow-sm">
            <div className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2">Gross Premium</div>
            <div className="text-3xl font-display font-bold">{formatLakhs(overviewData.monthly_premium || FALLBACK_OVERVIEW.monthly_premium)}</div>
          </div>
          <div className="bg-card rounded-3xl p-6 border border-border shadow-sm">
            <div className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2">Claims Paid</div>
            <div className="text-3xl font-display font-bold text-destructive">{formatLakhs(overviewData.total_paid_out || FALLBACK_OVERVIEW.total_paid_out)}</div>
          </div>
          <div className="bg-card rounded-3xl p-6 border border-border shadow-sm">
            <div className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2">Loss Ratio</div>
            <div className="text-3xl font-display font-bold">{overviewData.loss_ratio || FALLBACK_OVERVIEW.loss_ratio}%</div>
          </div>
          <div className="bg-card rounded-3xl p-6 border border-border shadow-sm">
            <div className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2">Active Policies</div>
            <div className="text-3xl font-display font-bold text-primary">{overviewData.active_policies?.toLocaleString() || FALLBACK_OVERVIEW.active_policies}</div>
          </div>
        </div>

        {/* Financial Charts */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-card rounded-3xl p-6 border border-border shadow-sm">
            <h3 className="font-bold text-lg mb-6">Premium vs Claims (Weekly)</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={lossData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorPremium" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorClaims" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #E5E7EB' }} />
                  <Area type="monotone" dataKey="premium" stroke="#4F46E5" strokeWidth={3} fillOpacity={1} fill="url(#colorPremium)" />
                  <Area type="monotone" dataKey="claims" stroke="#EF4444" strokeWidth={3} fillOpacity={1} fill="url(#colorClaims)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-card rounded-3xl p-6 border border-border shadow-sm">
            <h3 className="font-bold text-lg mb-6">Policy Tier Distribution</h3>
            <div className="h-[300px] flex items-center">
              <ResponsiveContainer width="60%" height="100%">
                <PieChart>
                  <Pie data={tierData} innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                    {tierData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-4 w-[40%] pl-4">
                {tierData.map(t => (
                  <div key={t.name} className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: t.color }}></div>
                    <div>
                      <div className="font-bold text-sm">{t.name}</div>
                      <div className="text-xs text-muted-foreground">{t.value}% of users</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* AI FORECASTS: 24 HOUR AND 7 DAY */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">

          {/* Chart 1: 24-Hour Micro Flow */}
          <div className="bg-card rounded-3xl p-8 border border-border shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="font-display font-bold text-xl flex items-center gap-2">
                  24-Hour Micro Flow
                </h3>
                <p className="text-muted-foreground text-xs mt-1">Hourly risk distribution for today.</p>
              </div>
            </div>
            <div className="h-[300px] w-full flex items-center justify-center">
              {isLoading ? (<Loader2 className="w-8 h-8 animate-spin text-primary" />) : (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={aiHourlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                    <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#6B7280' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#6B7280' }} domain={[0, 100]} />
                    <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #E5E7EB', color: '#000' }} itemStyle={{ color: '#000', fontSize: '10px', fontWeight: 'bold' }} />
                    <Line type="monotone" dataKey="Koramangala" stroke="#EF4444" strokeWidth={2} dot={false} activeDot={{ r: 6 }} />
                    <Line type="monotone" dataKey="Indiranagar" stroke="#F97316" strokeWidth={2} dot={false} activeDot={{ r: 6 }} />
                    <Line type="monotone" dataKey="Whitefield" stroke="#3B82F6" strokeWidth={2} dot={false} activeDot={{ r: 6 }} />
                    <Line type="monotone" dataKey="Electronic_City" name="Electronic City" stroke="#10B981" strokeWidth={2} dot={false} activeDot={{ r: 6 }} />
                    <Line type="monotone" dataKey="HSR_Layout" name="HSR Layout" stroke="#8B5CF6" strokeWidth={2} dot={false} activeDot={{ r: 6 }} />
                    <Line type="monotone" dataKey="BTM_Layout" name="BTM Layout" stroke="#EC4899" strokeWidth={2} dot={false} activeDot={{ r: 6 }} />
                    <Line type="monotone" dataKey="Marathahalli" stroke="#14B8A6" strokeWidth={2} dot={false} activeDot={{ r: 6 }} />
                    <Line type="monotone" dataKey="Jayanagar" stroke="#6366F1" strokeWidth={2} dot={false} activeDot={{ r: 6 }} />
                    <Line type="monotone" dataKey={() => 60} stroke="#94A3B8" strokeWidth={1} strokeDasharray="5 5" dot={false} activeDot={false} name="Disruption Threshold" />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          {/* Chart 2: 7-Day Macro Flow */}
          <div className="bg-card rounded-3xl p-8 border border-border shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="font-display font-bold text-xl flex items-center gap-2">
                  7-Day Macro Flow
                </h3>
                <p className="text-muted-foreground text-xs mt-1">Weekly risk projection for premium modeling.</p>
              </div>
            </div>
            <div className="h-[300px] w-full flex items-center justify-center">
              {isLoading ? (<Loader2 className="w-8 h-8 animate-spin text-primary" />) : (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={ai7DayData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#6B7280' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#6B7280' }} domain={[0, 100]} />
                    <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #E5E7EB', color: '#000' }} itemStyle={{ color: '#000', fontSize: '10px', fontWeight: 'bold' }} />
                    <Line type="monotone" dataKey="Koramangala" stroke="#EF4444" strokeWidth={2} dot={false} activeDot={{ r: 6 }} />
                    <Line type="monotone" dataKey="Indiranagar" stroke="#F97316" strokeWidth={2} dot={false} activeDot={{ r: 6 }} />
                    <Line type="monotone" dataKey="Whitefield" stroke="#3B82F6" strokeWidth={2} dot={false} activeDot={{ r: 6 }} />
                    <Line type="monotone" dataKey="Electronic_City" name="Electronic City" stroke="#10B981" strokeWidth={2} dot={false} activeDot={{ r: 6 }} />
                    <Line type="monotone" dataKey="HSR_Layout" name="HSR Layout" stroke="#8B5CF6" strokeWidth={2} dot={false} activeDot={{ r: 6 }} />
                    <Line type="monotone" dataKey="BTM_Layout" name="BTM Layout" stroke="#EC4899" strokeWidth={2} dot={false} activeDot={{ r: 6 }} />
                    <Line type="monotone" dataKey="Marathahalli" stroke="#14B8A6" strokeWidth={2} dot={false} activeDot={{ r: 6 }} />
                    <Line type="monotone" dataKey="Jayanagar" stroke="#6366F1" strokeWidth={2} dot={false} activeDot={{ r: 6 }} />
                    <Line type="monotone" dataKey={() => 60} stroke="#94A3B8" strokeWidth={1} strokeDasharray="5 5" dot={false} activeDot={false} name="Disruption Threshold" />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

        </div>
      </div>
    </AppLayout>
  );
}