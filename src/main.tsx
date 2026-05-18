import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import './styles.css';

type Page = 'executive' | 'productivity' | 'aging' | 'workload' | 'detail';

const green = {
  header: '#006637',
  dark: '#254E2A',
  mid: '#3D654D',
  accent: '#78BD3C',
  soft: '#90B775',
  pale: '#E6EEE7',
  rail: '#F5F7F6',
  border: '#CFD5D0',
  warning: '#D5741C',
  danger: '#C41E3A',
  note: '#FFF9E6',
};

const tabs: { id: Page; label: string }[] = [
  { id: 'executive', label: 'Executive Overview' },
  { id: 'productivity', label: 'Analyst Productivity' },
  { id: 'aging', label: 'Aging & Escalations' },
  { id: 'workload', label: 'Workload Distribution' },
];

const analysts = [
  { name: 'Avery Chen', team: 'North Plains', reports: 41, fields: 1268, completedFields: 842, completedReports: 22, velocity: 31.2, aged: 214, crop: 3280, fertilizer: 2914, utilization: 142, print: 9 },
  { name: 'Jordan Miles', team: 'Central Corn Belt', reports: 35, fields: 936, completedFields: 1094, completedReports: 31, velocity: 38.4, aged: 92, crop: 2410, fertilizer: 2248, utilization: 104, print: 4 },
  { name: 'Priya Nair', team: 'Delta South', reports: 29, fields: 714, completedFields: 768, completedReports: 24, velocity: 27.6, aged: 61, crop: 1842, fertilizer: 1695, utilization: 86, print: 3 },
  { name: 'Mateo Ruiz', team: 'Western Irrigated', reports: 32, fields: 1088, completedFields: 681, completedReports: 18, velocity: 24.1, aged: 188, crop: 2990, fertilizer: 3055, utilization: 128, print: 7 },
  { name: 'Nora Patel', team: 'Great Lakes', reports: 24, fields: 482, completedFields: 612, completedReports: 20, velocity: 22.8, aged: 38, crop: 1176, fertilizer: 1038, utilization: 72, print: 1 },
  { name: 'Samuel Brooks', team: 'North Plains', reports: 27, fields: 695, completedFields: 534, completedReports: 16, velocity: 19.7, aged: 119, crop: 1635, fertilizer: 1422, utilization: 94, print: 5 },
  { name: 'Elena Foster', team: 'Central Corn Belt', reports: 22, fields: 392, completedFields: 487, completedReports: 15, velocity: 18.2, aged: 44, crop: 970, fertilizer: 828, utilization: 68, print: 2 },
  { name: 'Marcus Lee', team: 'Delta South', reports: 31, fields: 846, completedFields: 456, completedReports: 13, velocity: 16.8, aged: 176, crop: 2084, fertilizer: 2160, utilization: 118, print: 8 },
];

const weekly = [
  { week: 'Apr 1', fields: 812, reports: 41, velocity: 22.4, escalations: 17 },
  { week: 'Apr 8', fields: 934, reports: 46, velocity: 24.8, escalations: 19 },
  { week: 'Apr 15', fields: 1028, reports: 52, velocity: 27.1, escalations: 23 },
  { week: 'Apr 22', fields: 918, reports: 49, velocity: 25.9, escalations: 28 },
  { week: 'Apr 29', fields: 1116, reports: 57, velocity: 29.8, escalations: 24 },
  { week: 'May 6', fields: 1214, reports: 61, velocity: 31.5, escalations: 31 },
  { week: 'May 13', fields: 1076, reports: 54, velocity: 28.7, escalations: 26 },
];

const statusBreakdown = [
  { status: 'Intake', reports: 38, fields: 672 },
  { status: 'Field Review', reports: 64, fields: 1840 },
  { status: 'Crop History', reports: 47, fields: 1398 },
  { status: 'Fertilizer History', reports: 42, fields: 1182 },
  { status: 'QA Review', reports: 36, fields: 826 },
  { status: 'Print Prep', reports: 22, fields: 412 },
  { status: 'Complete', reports: 71, fields: 2214 },
];

const agingBuckets = [
  { bucket: '0-7', reports: 84, fields: 1560 },
  { bucket: '8-14', reports: 61, fields: 1248 },
  { bucket: '15-30', reports: 47, fields: 1126 },
  { bucket: '31-60', reports: 28, fields: 648 },
  { bucket: '61+', reports: 13, fields: 318 },
];

const fieldAgeByAnalyst = analysts.map((a) => ({
  name: a.name.split(' ')[0],
  current: Math.max(0, Math.round(a.fields * 0.58)),
  aging: a.aged,
  breached: Math.round(a.aged * 0.32),
}));

const reportDetails = [
  { id: 'AGR-24118', grower: 'Hendrickson Farms', analyst: 'Avery Chen', status: 'Print Prep', priority: 'High', fields: 214, remaining: 37, days: 46, stageDays: 12, print: 'Required', crop: 628, fertilizer: 584, sla: 'Breached' },
  { id: 'AGR-24109', grower: 'Blue River Acres', analyst: 'Mateo Ruiz', status: 'Fertilizer History', priority: 'High', fields: 188, remaining: 64, days: 39, stageDays: 15, print: 'Required', crop: 512, fertilizer: 621, sla: 'At Risk' },
  { id: 'AGR-24097', grower: 'Prairie View Co-op', analyst: 'Marcus Lee', status: 'QA Review', priority: 'Medium', fields: 132, remaining: 18, days: 33, stageDays: 9, print: 'Required', crop: 388, fertilizer: 334, sla: 'At Risk' },
  { id: 'AGR-24131', grower: 'Cedar Ridge Farms', analyst: 'Samuel Brooks', status: 'Crop History', priority: 'Medium', fields: 96, remaining: 51, days: 27, stageDays: 11, print: 'Not Required', crop: 304, fertilizer: 212, sla: 'Needs Review' },
  { id: 'AGR-24142', grower: 'Miller Seed Partners', analyst: 'Avery Chen', status: 'Field Review', priority: 'High', fields: 301, remaining: 202, days: 24, stageDays: 14, print: 'Required', crop: 740, fertilizer: 712, sla: 'At Risk' },
  { id: 'AGR-24156', grower: 'Lakebend Ag', analyst: 'Jordan Miles', status: 'QA Review', priority: 'Low', fields: 42, remaining: 6, days: 18, stageDays: 4, print: 'Not Required', crop: 106, fertilizer: 98, sla: 'On Track' },
  { id: 'AGR-24162', grower: 'North Fork Growers', analyst: 'Priya Nair', status: 'Field Review', priority: 'Medium', fields: 76, remaining: 29, days: 16, stageDays: 6, print: 'Not Required', crop: 194, fertilizer: 171, sla: 'On Track' },
  { id: 'AGR-24170', grower: 'Summit Valley Farms', analyst: 'Nora Patel', status: 'Intake', priority: 'Low', fields: 18, remaining: 16, days: 8, stageDays: 3, print: 'Not Required', crop: 44, fertilizer: 39, sla: 'On Track' },
];

function fmt(n: number) {
  return n.toLocaleString();
}

function KPI({ title, value, subtitle, tone }: { title: string; value: string | number; subtitle: string; tone?: 'danger' | 'warning' }) {
  return (
    <div className="kpi-card">
      <div className="kpi-title">{title}</div>
      <div className={`kpi-value ${tone ?? ''}`}>{value}</div>
      <div className="kpi-subtitle">{subtitle}</div>
    </div>
  );
}

function Slicer({ title, options }: { title: string; options: string[] }) {
  return (
    <div className="slicer">
      <div className="slicer-title">{title}</div>
      <select>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}

function ChartBox({ title, source, height = 240, children }: { title: string; source: string; height?: number; children: React.ReactNode }) {
  return (
    <div className="chart-box">
      <div className="chart-title">{title}</div>
      <div className="chart-source">{source}</div>
      <div style={{ height }}>{children}</div>
    </div>
  );
}

function Status({ value }: { value: string }) {
  const className = value === 'Breached' || value === 'Required' || value === 'Critical' ? 'status danger' : value === 'At Risk' || value === 'Needs Review' ? 'status warning' : 'status good';
  return <span className={className}>{value}</span>;
}

function ExecutiveOverview() {
  const openFields = analysts.reduce((sum, a) => sum + a.fields, 0);
  const completedFields = analysts.reduce((sum, a) => sum + a.completedFields, 0);
  const completedReports = analysts.reduce((sum, a) => sum + a.completedReports, 0);
  const agedReports = reportDetails.filter((r) => r.days >= 30).length;
  const printInterventions = reportDetails.filter((r) => r.print === 'Required').length;

  return (
    <PageFrame>
      <div className="grid seven">
        <KPI title="Fields Completed" value={fmt(completedFields)} subtitle="Current period" />
        <KPI title="Reports Completed" value={fmt(completedReports)} subtitle="Closed reports" />
        <KPI title="Avg Fields per Report" value="31.8" subtitle="Open workload" />
        <KPI title="Field Completion Velocity" value="27.3" subtitle="Fields / analyst day" />
        <KPI title="Aged Reports" value={agedReports} subtitle="30+ days in-flight" tone="warning" />
        <KPI title="Print Interventions" value={printInterventions} subtitle="Manager action needed" tone="danger" />
        <KPI title="Days In-Flight" value="24.6" subtitle="Average open age" />
      </div>
      <div className="grid six">
        <KPI title="Open Fields" value={fmt(openFields)} subtitle="Assigned field backlog" />
        <KPI title="Crop History Entries" value={fmt(analysts.reduce((s, a) => s + a.crop, 0))} subtitle="Open + completed" />
        <KPI title="Fertilizer History Entries" value={fmt(analysts.reduce((s, a) => s + a.fertilizer, 0))} subtitle="Open + completed" />
        <KPI title="Active Analysts" value={analysts.length} subtitle="Assigned this period" />
        <KPI title="Over Capacity Analysts" value="4" subtitle="Above workload target" tone="warning" />
        <KPI title="SLA Breach Rate" value="7.8%" subtitle="Open reports" tone="warning" />
      </div>

      <div className="grid two">
        <RiskPanel />
        <InsightPanel />
      </div>

      <div className="grid two">
        <ChartBox title="Fields Completed by Week" source="FactFields, DimDate | COUNT(FieldID) completed by week" height={260}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={weekly} margin={{ top: 10, right: 25, bottom: 12, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={green.border} />
              <XAxis dataKey="week" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Line type="monotone" dataKey="fields" stroke={green.dark} strokeWidth={2} dot={{ r: 4, fill: green.dark }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartBox>
        <ChartBox title="Report Status Breakdown" source="FactReports | COUNT(ReportID) by current status" height={260}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={statusBreakdown} layout="vertical" margin={{ top: 5, right: 20, bottom: 5, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={green.border} />
              <XAxis type="number" tick={{ fontSize: 10 }} />
              <YAxis dataKey="status" type="category" width={116} tick={{ fontSize: 10 }} />
              <Tooltip />
              <Bar dataKey="reports" fill={green.dark} />
            </BarChart>
          </ResponsiveContainer>
        </ChartBox>
      </div>

      <div className="grid two">
        <ChartBox title="Workload Distribution by Analyst" source="FactFields, DimAnalyst | Open field count by analyst" height={260}>
          <AnalystBar dataKey="fields" color={green.dark} />
        </ChartBox>
        <ChartBox title="Aged Reports by Field Age Band" source="FactReports, FactFields | Open reports by field age band" height={260}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={agingBuckets} margin={{ top: 10, right: 20, bottom: 20, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={green.border} />
              <XAxis dataKey="bucket" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="reports">
                {agingBuckets.map((_, i) => <Cell key={i} fill={[green.accent, green.soft, green.warning, green.danger, '#8B1026'][i]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartBox>
      </div>

      <AgingTable />
    </PageFrame>
  );
}

function AnalystProductivity() {
  return (
    <PageFrame>
      <div className="grid six">
        <KPI title="Top Analyst" value="Jordan Miles" subtitle="1,094 fields completed" />
        <KPI title="Avg Fields / Analyst" value="684" subtitle="Current period" />
        <KPI title="Avg Fields / Day" value="24.9" subtitle="Per active analyst day" />
        <KPI title="Reports Completed" value="159" subtitle="Current period" />
        <KPI title="Aging Fields Owned" value="932" subtitle="15+ days open" tone="warning" />
        <KPI title="Below Target Analysts" value="3" subtitle="Under velocity goal" tone="warning" />
      </div>
      <SectionTitle>High Performing Analysts</SectionTitle>
      <div className="grid two">
        <ChartBox title="Fields Completed by Analyst" source="FactFields, DimAnalyst | Completed field count by analyst" height={260}>
          <AnalystBar dataKey="completedFields" color={green.dark} />
        </ChartBox>
        <ChartBox title="Reports Completed by Analyst" source="FactReports, DimAnalyst | Completed reports by analyst" height={260}>
          <AnalystBar dataKey="completedReports" color={green.accent} />
        </ChartBox>
      </div>
      <div className="grid two">
        <ChartBox title="Field Completion Velocity by Analyst" source="FactFields | Completed fields per active analyst day" height={220}>
          <AnalystBar dataKey="velocity" color={green.header} />
        </ChartBox>
        <ChartBox title="Productivity Trend" source="FactFields, DimDate | Weekly completed fields and reports" height={220}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={weekly} margin={{ top: 5, right: 25, bottom: 10, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={green.border} />
              <XAxis dataKey="week" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Line type="monotone" dataKey="fields" stroke={green.dark} strokeWidth={2} />
              <Line type="monotone" dataKey="reports" stroke={green.accent} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </ChartBox>
      </div>
      <SectionTitle>Analysts Needing Attention</SectionTitle>
      <div className="grid two">
        <ChartBox title="Aging Fields by Analyst" source="FactFields | Open fields over selected aging threshold" height={260}>
          <AnalystBar dataKey="aged" color={green.warning} />
        </ChartBox>
        <ChartBox title="Print Intervention Ownership" source="FactReports | Reports requiring print intervention by analyst" height={260}>
          <AnalystBar dataKey="print" color={green.danger} />
        </ChartBox>
      </div>
      <AnalystTable />
    </PageFrame>
  );
}

function AgingEscalations() {
  return (
    <PageFrame>
      <div className="warning-band">
        <strong>Escalation Review Required</strong>
        <span> 18 reports are breached or blocked. 932 aging fields are tied to reports requiring manager intervention.</span>
      </div>
      <div className="grid eight">
        <KPI title="Aged Reports" value="88" subtitle="15+ days open" tone="warning" />
        <KPI title="Aged Fields" value="932" subtitle="15+ days open" tone="warning" />
        <KPI title="SLA Breaches" value="18" subtitle="Past target" tone="danger" />
        <KPI title="At-Risk Reports" value="31" subtitle="Approaching target" tone="warning" />
        <KPI title="Print Interventions" value="39" subtitle="Required reports" tone="danger" />
        <KPI title="Avg Stage Days" value="8.7" subtitle="Current stage" />
        <KPI title="Oldest Report" value="46" subtitle="Days in-flight" tone="danger" />
        <KPI title="Blocked Fields" value="286" subtitle="Awaiting action" tone="warning" />
      </div>
      <div className="grid two">
        <ChartBox title="Reports by Aging Bucket" source="FactReports | Open reports by days in-flight" height={320}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={agingBuckets} margin={{ top: 10, right: 20, bottom: 20, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={green.border} />
              <XAxis dataKey="bucket" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="reports">
                {agingBuckets.map((_, i) => <Cell key={i} fill={[green.accent, green.soft, green.warning, green.danger, '#8B1026'][i]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartBox>
        <ChartBox title="SLA Status by Current Stage" source="FactReports | Report count by status and SLA classification" height={320}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={statusBreakdown.map((s, i) => ({ ...s, onTrack: Math.max(6, s.reports - 18 - i), atRisk: 8 + i, breached: Math.max(2, i - 1) }))} layout="vertical" margin={{ top: 5, right: 20, bottom: 5, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={green.border} />
              <XAxis type="number" tick={{ fontSize: 10 }} />
              <YAxis dataKey="status" type="category" width={116} tick={{ fontSize: 10 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="onTrack" stackId="a" fill={green.accent} name="On Track" />
              <Bar dataKey="atRisk" stackId="a" fill={green.warning} name="At Risk" />
              <Bar dataKey="breached" stackId="a" fill={green.danger} name="Breached" />
            </BarChart>
          </ResponsiveContainer>
        </ChartBox>
      </div>
      <div className="grid two">
        <ChartBox title="Days In-Flight by Stage" source="FactReports | Average days in current stage" height={260}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={statusBreakdown.map((s, i) => ({ status: s.status, days: [4.2, 7.6, 10.8, 12.4, 8.9, 14.2, 2.1][i] }))} layout="vertical" margin={{ top: 5, right: 20, bottom: 5, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={green.border} />
              <XAxis type="number" tick={{ fontSize: 10 }} />
              <YAxis dataKey="status" type="category" width={116} tick={{ fontSize: 10 }} />
              <Tooltip />
              <Bar dataKey="days" fill={green.warning} />
            </BarChart>
          </ResponsiveContainer>
        </ChartBox>
        <ChartBox title="Escalations Opened Over Time" source="FactEscalations, DimDate | New escalation count by week" height={260}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={weekly} margin={{ top: 5, right: 25, bottom: 10, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={green.border} />
              <XAxis dataKey="week" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Line type="monotone" dataKey="escalations" stroke={green.danger} strokeWidth={2} dot={{ fill: green.danger, r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartBox>
      </div>
      <div className="hidden-section" aria-hidden="true">
        <AgingTable />
      </div>
    </PageFrame>
  );
}

function WorkloadDistribution() {
  return (
    <PageFrame>
      <div className="warning-band">
        <strong>Workload Imbalance Needs Review</strong>
        <span> 4 analysts are above capacity while 3 analysts have available capacity.</span>
      </div>
      <div className="grid eight">
        <KPI title="Open Reports" value="241" subtitle="Assigned + unassigned" />
        <KPI title="Open Fields" value={fmt(6421)} subtitle="Active backlog" />
        <KPI title="Crop History Entries" value={fmt(16387)} subtitle="Current workload" />
        <KPI title="Fertilizer History Entries" value={fmt(14925)} subtitle="Current workload" />
        <KPI title="Over Capacity" value="4" subtitle="Analysts" tone="warning" />
        <KPI title="With Capacity" value="3" subtitle="Analysts" />
        <KPI title="Unassigned Reports" value="19" subtitle="Awaiting owner" tone="warning" />
        <KPI title="Avg Workload Index" value="94" subtitle="Target = 100" />
      </div>
      <SectionTitle>Workload Balance</SectionTitle>
      <div className="grid two">
        <ChartBox title="Open Fields by Analyst" source="FactFields, DimAnalyst | Open field count by analyst" height={260}>
          <AnalystBar dataKey="fields" color={green.dark} />
        </ChartBox>
        <ChartBox title="Capacity Utilization by Analyst" source="FactAssignments, DimAnalyst | Workload index / capacity target" height={260}>
          <AnalystBar dataKey="utilization" color={green.warning} />
        </ChartBox>
      </div>
      <div className="grid two">
        <ChartBox title="Aging Work by Analyst" source="FactFields | Current, aging, and breached field ownership" height={260}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={fieldAgeByAnalyst} layout="vertical" margin={{ top: 5, right: 20, bottom: 5, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={green.border} />
              <XAxis type="number" tick={{ fontSize: 10 }} />
              <YAxis dataKey="name" type="category" width={76} tick={{ fontSize: 10 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="current" stackId="a" fill={green.dark} name="Current" />
              <Bar dataKey="aging" stackId="a" fill={green.warning} name="Aging" />
              <Bar dataKey="breached" stackId="a" fill={green.danger} name="Breached" />
            </BarChart>
          </ResponsiveContainer>
        </ChartBox>
        <ChartBox title="Open History Volume by Analyst" source="FactCropHistory, FactFertilizerHistory | Open history entries by analyst" height={260}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={analysts.map((a) => ({ name: a.name.split(' ')[0], crop: a.crop, fertilizer: a.fertilizer }))} margin={{ top: 5, right: 20, bottom: 45, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={green.border} />
              <XAxis dataKey="name" angle={-25} textAnchor="end" height={55} tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="crop" fill={green.dark} name="Crop History" />
              <Bar dataKey="fertilizer" fill={green.accent} name="Fertilizer History" />
            </BarChart>
          </ResponsiveContainer>
        </ChartBox>
      </div>
      <AnalystTable />
    </PageFrame>
  );
}

function ReportDetail() {
  const reportsInView = reportDetails.length;
  const totalFields = reportDetails.reduce((sum, report) => sum + report.fields, 0);
  const fieldsRemaining = reportDetails.reduce((sum, report) => sum + report.remaining, 0);
  const fieldCompletion = `${(((totalFields - fieldsRemaining) / totalFields) * 100).toFixed(1)}%`;
  const avgDays = (reportDetails.reduce((sum, report) => sum + report.days, 0) / reportsInView).toFixed(1);
  const avgStageDays = (reportDetails.reduce((sum, report) => sum + report.stageDays, 0) / reportsInView).toFixed(1);
  const cropEntries = reportDetails.reduce((sum, report) => sum + report.crop, 0);
  const fertilizerEntries = reportDetails.reduce((sum, report) => sum + report.fertilizer, 0);
  const fieldRows = [
    ['North 80', 'Complete', '100%', '0', '5/15/26'],
    ['East Pivot', 'QA Review', '91%', '2', '5/14/26'],
    ['River Bottom', 'Crop History', '74%', '8', '5/12/26'],
    ['South Ridge', 'Fertilizer History', '68%', '11', '5/10/26'],
    ['Home Quarter', 'Print Prep', '96%', '1', '5/16/26'],
    ['West 120', 'Field Review', '52%', '14', '5/09/26'],
  ];
  return (
    <PageFrame>
      <div className="grid eight">
        <KPI title="Reports in View" value={reportsInView} subtitle="Filtered detail set" />
        <KPI title="Total Fields" value={fmt(totalFields)} subtitle="Across reviewed reports" />
        <KPI title="Fields Remaining" value={fmt(fieldsRemaining)} subtitle="Before completion" tone="warning" />
        <KPI title="Field Completion" value={fieldCompletion} subtitle="Required fields" />
        <KPI title="Avg Days In-Flight" value={avgDays} subtitle="Across reviewed reports" tone="warning" />
        <KPI title="Avg Days in Stage" value={avgStageDays} subtitle="Current workflow stage" tone="warning" />
        <KPI title="Crop History Entries" value={fmt(cropEntries)} subtitle="Across reviewed reports" />
        <KPI title="Fertilizer Entries" value={fmt(fertilizerEntries)} subtitle="Across reviewed reports" />
      </div>
      <div className="grid two">
        <ChartBox title="Field Completion by Status" source="FactFields | Field count by completion status across reports in view" height={260}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={[{ status: 'Complete', count: 177 }, { status: 'In Review', count: 14 }, { status: 'In Progress', count: 18 }, { status: 'Blocked', count: 5 }]} margin={{ top: 10, right: 20, bottom: 20, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={green.border} />
              <XAxis dataKey="status" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="count" fill={green.dark} />
            </BarChart>
          </ResponsiveContainer>
        </ChartBox>
        <ChartBox title="Days In-Flight by Current Stage" source="FactReports | Average days in-flight by current workflow stage" height={260}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={[{ stage: 'Intake', days: 3 }, { stage: 'Field Review', days: 11 }, { stage: 'Crop History', days: 9 }, { stage: 'Fertilizer History', days: 11 }, { stage: 'QA Review', days: 8 }, { stage: 'Print Prep', days: 12 }]} layout="vertical" margin={{ top: 5, right: 20, bottom: 5, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={green.border} />
              <XAxis type="number" tick={{ fontSize: 10 }} />
              <YAxis dataKey="stage" type="category" width={116} tick={{ fontSize: 10 }} />
              <Tooltip />
              <Bar dataKey="days" fill={green.warning} />
            </BarChart>
          </ResponsiveContainer>
        </ChartBox>
      </div>
    </PageFrame>
  );
}

function AnalystBar({ dataKey, color }: { dataKey: keyof (typeof analysts)[number]; color: string }) {
  const data = [...analysts].sort((a, b) => Number(b[dataKey]) - Number(a[dataKey])).map((a) => ({ ...a, short: a.name.split(' ')[0] }));
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} layout="vertical" margin={{ top: 5, right: 20, bottom: 5, left: 10 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={green.border} />
        <XAxis type="number" tick={{ fontSize: 10 }} />
        <YAxis dataKey="short" type="category" width={76} tick={{ fontSize: 10 }} />
        <Tooltip />
        <Bar dataKey={dataKey as string} fill={color} />
      </BarChart>
    </ResponsiveContainer>
  );
}

function RiskPanel() {
  const rows = [
    ['Reports past SLA', '18 reports require action', 'Critical'],
    ['Reports requiring print intervention', '39 active reports', 'Critical'],
    ['Reports with stale update', '22 reports not updated in 7 days', 'Needs Review'],
    ['Unassigned reports', '19 reports awaiting owner', 'Needs Review'],
    ['Field completion quality', '96.4% required fields complete', 'Passed'],
  ];
  return (
    <div className="table-box compact">
      <div className="chart-title">Operational Risk Check</div>
      {rows.map((row) => <div className="risk-row" key={row[0]}><div><div className="risk-main">{row[0]}</div><div className="risk-sub">{row[1]}</div></div><Status value={row[2]} /></div>)}
    </div>
  );
}

function InsightPanel() {
  return (
    <div className="table-box compact">
      <div className="chart-title">Management Insights</div>
      {[
        ['Highest Field Throughput', 'Jordan Miles', '1,094 fields completed'],
        ['Most Overloaded Analyst', 'Avery Chen', '142% utilization / 1,268 open fields'],
        ['Largest Bottleneck', 'Print Prep', '14.2 avg days in stage'],
      ].map((item) => <div className="insight" key={item[0]}><div className="insight-label">{item[0]}</div><div className="insight-value">{item[1]}</div><div className="insight-sub">{item[2]}</div></div>)}
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <div className="section-title">{children}</div>;
}

function PageFrame({ children }: { children: React.ReactNode }) {
  return <div className="page-frame">{children}</div>;
}

function AgingTable() {
  return (
    <div className="table-box">
      <div className="chart-title">Aging Report Detail Table</div>
      <div className="chart-source">FactReports, FactFields, DimAnalyst | Open reports requiring operational review</div>
      <table>
        <thead>
          <tr><th>Report ID</th><th>Grower / Account</th><th>Analyst</th><th>Status</th><th>Priority</th><th className="right">Fields</th><th className="right">Remaining</th><th className="right">Days</th><th>Print</th><th>SLA</th></tr>
        </thead>
        <tbody>
          {reportDetails.map((r) => (
            <tr key={r.id}>
              <td className="strong">{r.id}</td><td>{r.grower}</td><td>{r.analyst}</td><td>{r.status}</td><td>{r.priority}</td>
              <td className="right">{r.fields}</td><td className="right">{r.remaining}</td><td className="right">{r.days}</td><td><Status value={r.print} /></td><td><Status value={r.sla} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AnalystTable() {
  return (
    <div className="table-box">
      <div className="chart-title">Analyst Productivity Table</div>
      <div className="chart-source">FactFields, FactReports, DimAnalyst | Field-level productivity and active workload by analyst</div>
      <table>
        <thead>
          <tr><th>Analyst</th><th>Team</th><th className="right">Open Reports</th><th className="right">Open Fields</th><th className="right">Completed Fields</th><th className="right">Reports Complete</th><th className="right">Fields / Day</th><th className="right">Aging Fields</th><th className="right">Crop Hist.</th><th className="right">Fert. Hist.</th><th className="right">Util. %</th></tr>
        </thead>
        <tbody>
          {analysts.map((a) => (
            <tr key={a.name}>
              <td className="strong">{a.name}</td><td>{a.team}</td><td className="right">{a.reports}</td><td className="right">{fmt(a.fields)}</td><td className="right">{fmt(a.completedFields)}</td><td className="right">{a.completedReports}</td><td className="right">{a.velocity}</td><td className="right">{a.aged}</td><td className="right">{fmt(a.crop)}</td><td className="right">{fmt(a.fertilizer)}</td><td className={`right ${a.utilization > 115 ? 'cell-danger' : a.utilization > 95 ? 'cell-warning' : ''}`}>{a.utilization}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function App() {
  const [activePage, setActivePage] = React.useState<Page>('executive');
  const renderPage = () => {
    if (activePage === 'productivity') return <AnalystProductivity />;
    if (activePage === 'aging') return <AgingEscalations />;
    if (activePage === 'workload') return <WorkloadDistribution />;
    if (activePage === 'detail') return <ReportDetail />;
    return <ExecutiveOverview />;
  };

  return (
    <div className="app">
      <header className="top-header">
        <div className="brand">
          <div className="power-icon"><span /><span /><span /><span /></div>
          <div>Reporting Analyst Operations</div>
        </div>
        <div className="refresh">
          <div>Last Refreshed: May 18, 2026, 8:15 AM</div>
          <div>Data Source: Agricultural Reports + Field History Tables</div>
        </div>
      </header>
      <nav className="tabs">
        {tabs.map((tab) => <button className={activePage === tab.id ? 'active' : ''} key={tab.id} onClick={() => setActivePage(tab.id)}>{tab.label}</button>)}
      </nav>
      <div className="body">
        <aside className="filters">
          <div className="filters-title">Filters</div>
          <Slicer title="Time Frame" options={['Year to Date', 'Last 30 days', 'Last 90 days', 'Current Quarter']} />
          <Slicer title="Analyst" options={['All Analysts', ...analysts.map((a) => a.name)]} />
          <Slicer title="Report Status" options={['All', ...statusBreakdown.map((s) => s.status)]} />
          <Slicer title="Aging Threshold" options={['15+ days', '30+ days', '45+ days', '60+ days']} />
          <Slicer title="Field Age Band" options={['All', '0-7', '8-14', '15-30', '31-60', '61+']} />
          <div className="quality-note">
            <div>Data Quality Notes</div>
            <p>12 reports have stale field updates</p>
            <p>7 reports need print queue review</p>
            <p>4 field history imports pending</p>
          </div>
        </aside>
        <main>{renderPage()}</main>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
