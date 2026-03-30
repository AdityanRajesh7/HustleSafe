import { AppLayout } from "@/components/layout/AppLayout";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell } from "recharts";

const lossData = [
  { week: 'W1', premium: 120000, claims: 45000 },
  { week: 'W2', premium: 125000, claims: 50000 },
  { week: 'W3', premium: 130000, claims: 180000 }, // Disruption spike
  { week: 'W4', premium: 140000, claims: 60000 },
  { week: 'W5', premium: 145000, claims: 55000 },
  { week: 'W6', premium: 150000, claims: 40000 },
];

const tierData = [
  { name: 'Basic', value: 30, color: '#94A3B8' },
  { name: 'Standard', value: 50, color: '#4F46E5' },
  { name: 'Pro', value: 20, color: '#0F172A' },
];

export function InsurerAnalytics() {
  return (
    <AppLayout>
      <div className="space-y-8 pb-12">
        <div>
          <h1 className="text-3xl font-display font-bold">Platform Analytics</h1>
          <p className="text-muted-foreground mt-1">Financial performance and risk distribution.</p>
        </div>

        <div className="grid grid-cols-4 gap-6">
          <div className="bg-card rounded-3xl p-6 border border-border shadow-sm">
            <div className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2">Gross Premium</div>
            <div className="text-3xl font-display font-bold">₹8.1L</div>
          </div>
          <div className="bg-card rounded-3xl p-6 border border-border shadow-sm">
            <div className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2">Claims Paid</div>
            <div className="text-3xl font-display font-bold text-destructive">₹4.3L</div>
          </div>
          <div className="bg-card rounded-3xl p-6 border border-border shadow-sm">
            <div className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2">Loss Ratio</div>
            <div className="text-3xl font-display font-bold">53%</div>
          </div>
          <div className="bg-card rounded-3xl p-6 border border-border shadow-sm">
            <div className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2">Active Policies</div>
            <div className="text-3xl font-display font-bold text-primary">2,847</div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-card rounded-3xl p-6 border border-border shadow-sm">
            <h3 className="font-bold text-lg mb-6">Premium vs Claims (Weekly)</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={lossData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorPremium" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorClaims" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
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
                    {tierData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
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
      </div>
    </AppLayout>
  );
}
