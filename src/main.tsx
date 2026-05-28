import React from 'react';
import ReactDOM, { type Root } from 'react-dom/client';
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

declare global {
  interface Window {
    __reportingAnalystsRoot?: Root;
  }
}

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
  { id: 'detail', label: 'Report Detail' },
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

const analystEntrySeries = [
  { key: 'avery', name: 'Avery Chen', color: green.dark },
  { key: 'jordan', name: 'Jordan Miles', color: green.accent },
  { key: 'priya', name: 'Priya Nair', color: green.mid },
  { key: 'mateo', name: 'Mateo Ruiz', color: green.warning },
  { key: 'nora', name: 'Nora Patel', color: green.soft },
  { key: 'samuel', name: 'Samuel Brooks', color: green.header },
  { key: 'elena', name: 'Elena Foster', color: '#9AA55A' },
  { key: 'marcus', name: 'Marcus Lee', color: green.danger },
] as const;

const weeklyAnalystTeamEntries = [
  { week: 'Apr 1', fields: { avery: 216, jordan: 184, priya: 148, mateo: 173, nora: 96, samuel: 129, elena: 88, marcus: 154 }, reports: { avery: 10, jordan: 9, priya: 7, mateo: 8, nora: 5, samuel: 6, elena: 4, marcus: 7 } },
  { week: 'Apr 8', fields: { avery: 244, jordan: 205, priya: 169, mateo: 191, nora: 112, samuel: 147, elena: 97, marcus: 171 }, reports: { avery: 12, jordan: 10, priya: 8, mateo: 9, nora: 5, samuel: 7, elena: 5, marcus: 8 } },
  { week: 'Apr 15', fields: { avery: 268, jordan: 227, priya: 188, mateo: 214, nora: 121, samuel: 162, elena: 106, marcus: 184 }, reports: { avery: 13, jordan: 11, priya: 9, mateo: 10, nora: 6, samuel: 8, elena: 5, marcus: 9 } },
  { week: 'Apr 22', fields: { avery: 238, jordan: 198, priya: 176, mateo: 203, nora: 116, samuel: 151, elena: 101, marcus: 178 }, reports: { avery: 11, jordan: 10, priya: 8, mateo: 10, nora: 6, samuel: 7, elena: 5, marcus: 8 } },
  { week: 'Apr 29', fields: { avery: 286, jordan: 241, priya: 206, mateo: 231, nora: 134, samuel: 176, elena: 119, marcus: 197 }, reports: { avery: 14, jordan: 12, priya: 10, mateo: 11, nora: 7, samuel: 9, elena: 6, marcus: 9 } },
  { week: 'May 6', fields: { avery: 309, jordan: 267, priya: 224, mateo: 249, nora: 146, samuel: 188, elena: 128, marcus: 216 }, reports: { avery: 15, jordan: 13, priya: 11, mateo: 12, nora: 7, samuel: 9, elena: 6, marcus: 10 } },
  { week: 'May 13', fields: { avery: 274, jordan: 236, priya: 201, mateo: 226, nora: 128, samuel: 171, elena: 116, marcus: 203 }, reports: { avery: 13, jordan: 12, priya: 10, mateo: 11, nora: 6, samuel: 8, elena: 6, marcus: 10 } },
];

const weeklyFieldsEnteringAnalystTeam = weeklyAnalystTeamEntries.map((entry) => ({
  week: entry.week,
  ...entry.fields,
}));

const weeklyReportsEnteringAnalystTeam = weeklyAnalystTeamEntries.map((entry) => ({
  week: entry.week,
  ...entry.reports,
}));

const statusBreakdown = [
  { status: 'Intake', reports: 38, fields: 672 },
  { status: 'Field Review', reports: 64, fields: 1840 },
  { status: 'Crop History', reports: 47, fields: 1398 },
  { status: 'Fertilizer History', reports: 42, fields: 1182 },
  { status: 'QA Review', reports: 36, fields: 826 },
  { status: 'Print Prep', reports: 22, fields: 412 },
  { status: 'Complete', reports: 71, fields: 2214 },
];

const agingStageBreakdown = statusBreakdown.filter((stage) => stage.status !== 'Complete');

const daysInFlightBuckets = [
  { bucket: '0-5 Days', reports: 42 },
  { bucket: '6-10 Days', reports: 67 },
  { bucket: '11-15 Days', reports: 51 },
  { bucket: '15+ Days', reports: 88 },
];

const postReportStageDeals = [
  { title: 'Hendrickson Farms 2026 Nutrient Renewal', stage: 'Awaiting First Payment', owner: 'Camila Torres', dateEntered: '5/06/26', agingDays: 21, fields: 214, reportStatus: 'Awaiting Payment', print: 'Required' },
  { title: 'Blue River Acres Crop Protection Addendum', stage: 'DocuSign', owner: 'Mason Hall', dateEntered: '5/12/26', agingDays: 15, fields: 188, reportStatus: 'Waiting on Signature', print: 'Required' },
  { title: 'Prairie View Co-op Multi-Field Review', stage: 'Awaiting First Payment', owner: 'AL Renee Kim', dateEntered: '5/10/26', agingDays: 17, fields: 132, reportStatus: 'Payment Review', print: 'Required' },
  { title: 'Cedar Ridge Farms Irrigated Corn Package', stage: 'DocuSign', owner: 'Elliot Shaw', dateEntered: '5/18/26', agingDays: 9, fields: 196, reportStatus: 'Waiting on Signature', print: 'Not Required' },
  { title: 'Miller Seed Partners Soybean Rotation Plan', stage: 'Awaiting First Payment', owner: 'AL Renee Kim', dateEntered: '5/15/26', agingDays: 12, fields: 301, reportStatus: 'Awaiting Payment', print: 'Required' },
  { title: 'Lakebend Ag Conservation Acreage Update', stage: 'DocuSign', owner: 'Camila Torres', dateEntered: '5/22/26', agingDays: 5, fields: 42, reportStatus: 'In Progress', print: 'Not Required' },
  { title: 'North Fork Growers Split-Field Agreement', stage: 'Awaiting First Payment', owner: 'Mason Hall', dateEntered: '5/20/26', agingDays: 7, fields: 76, reportStatus: 'Payment Review', print: 'Not Required' },
  { title: 'Redstone Grain Year-End Report Package', stage: 'DocuSign', owner: 'Elliot Shaw', dateEntered: '5/24/26', agingDays: 3, fields: 64, reportStatus: 'Waiting on Signature', print: 'Required' },
];

const notPaidAuditActivity = [
  { id: 'AGR-24118', client: 'Hendrickson Farms', assignedAnalyst: 'Avery Chen', movedBy: 'Maya Grant', previousStatus: 'Report Complete', currentStatus: 'Not Paid', transitionTimestamp: '5/18/26 9:42 AM', daysSinceCompletion: 9, fields: 214, print: 'Required', qaFlag: 'High Risk' },
  { id: 'AGR-24109', client: 'Blue River Acres', assignedAnalyst: 'Mateo Ruiz', movedBy: 'Lena Ortiz', previousStatus: 'Report Complete', currentStatus: 'Not Paid', transitionTimestamp: '5/18/26 11:16 AM', daysSinceCompletion: 6, fields: 188, print: 'Required', qaFlag: 'Needs Review' },
  { id: 'AGR-24097', client: 'Prairie View Co-op', assignedAnalyst: 'Marcus Lee', movedBy: 'Maya Grant', previousStatus: 'Report Complete', currentStatus: 'Not Paid', transitionTimestamp: '5/17/26 2:38 PM', daysSinceCompletion: 13, fields: 132, print: 'Required', qaFlag: 'High Risk' },
  { id: 'AGR-24156', client: 'Lakebend Ag', assignedAnalyst: 'Jordan Miles', movedBy: 'Owen Price', previousStatus: 'Report Complete', currentStatus: 'Not Paid', transitionTimestamp: '5/16/26 10:04 AM', daysSinceCompletion: 2, fields: 42, print: 'Not Required', qaFlag: 'Normal' },
  { id: 'AGR-24183', client: 'Redstone Grain', assignedAnalyst: 'Elena Foster', movedBy: 'Lena Ortiz', previousStatus: 'Report Complete', currentStatus: 'Not Paid', transitionTimestamp: '5/15/26 4:27 PM', daysSinceCompletion: 5, fields: 64, print: 'Required', qaFlag: 'Needs Review' },
  { id: 'AGR-24142', client: 'Miller Seed Partners', assignedAnalyst: 'Avery Chen', movedBy: 'Maya Grant', previousStatus: 'Report Complete', currentStatus: 'Not Paid', transitionTimestamp: '5/14/26 8:55 AM', daysSinceCompletion: 10, fields: 301, print: 'Required', qaFlag: 'High Risk' },
  { id: 'AGR-24162', client: 'North Fork Growers', assignedAnalyst: 'Priya Nair', movedBy: 'Owen Price', previousStatus: 'Report Complete', currentStatus: 'Not Paid', transitionTimestamp: '5/13/26 1:18 PM', daysSinceCompletion: 3, fields: 76, print: 'Not Required', qaFlag: 'Normal' },
  { id: 'AGR-24131', client: 'Cedar Ridge Farms', assignedAnalyst: 'Samuel Brooks', movedBy: 'Lena Ortiz', previousStatus: 'Report Complete', currentStatus: 'Not Paid', transitionTimestamp: '5/12/26 3:09 PM', daysSinceCompletion: 7, fields: 196, print: 'Not Required', qaFlag: 'Needs Review' },
];

const notPaidAuditTrend = [
  { week: 'Apr 1', reports: 9, maya: 3, lena: 4, owen: 2 },
  { week: 'Apr 8', reports: 12, maya: 5, lena: 4, owen: 3 },
  { week: 'Apr 15', reports: 10, maya: 4, lena: 3, owen: 3 },
  { week: 'Apr 22', reports: 14, maya: 6, lena: 5, owen: 3 },
  { week: 'Apr 29', reports: 11, maya: 4, lena: 4, owen: 3 },
  { week: 'May 6', reports: 16, maya: 7, lena: 6, owen: 3 },
  { week: 'May 13', reports: 18, maya: 8, lena: 6, owen: 4 },
];

const fieldAgeByAnalyst = analysts.map((a) => ({
  name: a.name.split(' ')[0],
  current: Math.max(0, Math.round(a.fields * 0.58)),
  aging: a.aged,
  breached: Math.round(a.aged * 0.32),
}));

const reportDetails = [
  { id: 'AGR-24118', grower: 'Hendrickson Farms', createdDate: '4/02/26', completedDate: '', analyst: 'Avery Chen', status: 'Print Prep', priority: 'High', fields: 214, remaining: 37, days: 46, stageDays: 12, print: 'Required', crop: 628, fertilizer: 584, sla: 'Breached' },
  { id: 'AGR-24109', grower: 'Blue River Acres', createdDate: '4/09/26', completedDate: '', analyst: 'Mateo Ruiz', status: 'Fertilizer History', priority: 'High', fields: 188, remaining: 64, days: 39, stageDays: 15, print: 'Required', crop: 512, fertilizer: 621, sla: 'At Risk' },
  { id: 'AGR-24097', grower: 'Prairie View Co-op', createdDate: '4/15/26', completedDate: '', analyst: 'Marcus Lee', status: 'QA Review', priority: 'Medium', fields: 132, remaining: 18, days: 33, stageDays: 9, print: 'Required', crop: 388, fertilizer: 334, sla: 'At Risk' },
  { id: 'AGR-24131', grower: 'Cedar Ridge Farms', createdDate: '5/13/26', completedDate: '', analyst: 'Samuel Brooks', status: 'Crop History', priority: 'Medium', fields: 196, remaining: 51, days: 5, stageDays: 2, print: 'Not Required', crop: 304, fertilizer: 212, sla: 'Needs Review' },
  { id: 'AGR-24142', grower: 'Miller Seed Partners', createdDate: '4/24/26', completedDate: '', analyst: 'Avery Chen', status: 'Field Review', priority: 'High', fields: 301, remaining: 202, days: 24, stageDays: 14, print: 'Required', crop: 740, fertilizer: 712, sla: 'At Risk' },
  { id: 'AGR-24156', grower: 'Lakebend Ag', createdDate: '4/30/26', completedDate: '', analyst: 'Jordan Miles', status: 'QA Review', priority: 'Low', fields: 42, remaining: 6, days: 18, stageDays: 4, print: 'Not Required', crop: 106, fertilizer: 98, sla: 'On Track' },
  { id: 'AGR-24162', grower: 'North Fork Growers', createdDate: '5/02/26', completedDate: '', analyst: 'Priya Nair', status: 'Field Review', priority: 'Medium', fields: 76, remaining: 29, days: 16, stageDays: 6, print: 'Not Required', crop: 194, fertilizer: 171, sla: 'On Track' },
  { id: 'AGR-24170', grower: 'Summit Valley Farms', createdDate: '5/10/26', completedDate: '', analyst: 'Nora Patel', status: 'Intake', priority: 'Low', fields: 18, remaining: 16, days: 8, stageDays: 3, print: 'Not Required', crop: 44, fertilizer: 39, sla: 'On Track' },
  { id: 'AGR-24183', grower: 'Redstone Grain', createdDate: '5/13/26', completedDate: '', analyst: 'Elena Foster', status: 'Print Prep', priority: 'Medium', fields: 64, remaining: 8, days: 5, stageDays: 2, print: 'Required', crop: 160, fertilizer: 147, sla: 'On Track' },
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

function ChartBox({ title, source, context, height = 240, children }: { title: string; source?: string; context?: string; height?: number; children: React.ReactNode }) {
  return (
    <div className="chart-box">
      <div className="chart-title">{title}</div>
      {source ? <div className="chart-source">{source}</div> : null}
      <div style={{ height }}>{children}</div>
      {context ? <div className="chart-context">{context}</div> : null}
    </div>
  );
}

function Status({ value }: { value: string }) {
  const className = value === 'Breached' || value === 'Required' || value === 'Critical' ? 'status danger' : value === 'At Risk' || value === 'Needs Review' ? 'status warning' : 'status good';
  return <span className={className}>{value}</span>;
}

function getDayTone(days: number) {
  if (days >= 11) return 'overdue';
  if (days >= 6) return 'watch';
  return 'normal';
}

function getAttentionReason(report: (typeof reportDetails)[number]) {
  const completionRate = (report.fields - report.remaining) / report.fields;
  if (report.print === 'Required') return 'Print Intervention Needed';
  if (report.fields >= 180) return 'High Field Count';
  if (report.days >= 11) return 'Aging Threshold Exceeded';
  if (completionRate < 0.7) return 'Low Completion Progress';
  return 'Low Completion Progress';
}

function PrintBadge({ value }: { value: string }) {
  const needed = value === 'Required';
  return <span className={`print-badge ${needed ? 'urgent' : 'neutral'}`}>{needed ? 'Needed' : 'Not Needed'}</span>;
}

function DayBadge({ days, urgent }: { days: number; urgent?: boolean }) {
  return <span className={`day-badge ${urgent ? 'urgent' : getDayTone(days)}`}>{days}</span>;
}

function ExecutiveOverview() {
  const openFields = analysts.reduce((sum, a) => sum + a.fields, 0);
  const completedFields = analysts.reduce((sum, a) => sum + a.completedFields, 0);
  const completedReports = analysts.reduce((sum, a) => sum + a.completedReports, 0);
  const agedReports = reportDetails.filter((r) => r.days >= 30).length;
  const printInterventions = reportDetails.filter((r) => r.print === 'Required').length;
  const latestAnalystTeamEntries = weeklyAnalystTeamEntries[weeklyAnalystTeamEntries.length - 1];
  const fieldsEnteredThisWeek = Object.values(latestAnalystTeamEntries.fields).reduce((sum, value) => sum + value, 0);
  const reportsEnteredThisWeek = Object.values(latestAnalystTeamEntries.reports).reduce((sum, value) => sum + value, 0);
  const avgFieldsPerEnteredReport = (fieldsEnteredThisWeek / reportsEnteredThisWeek).toFixed(1);
  const attentionReports = reportDetails.map((report) => ({
    ...report,
    completedFields: report.fields - report.remaining,
    attentionReason: getAttentionReason(report),
  }));

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
          <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
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
          <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
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

      <SectionTitle>Entered Analyst Team Stage</SectionTitle>
      <div className="grid three">
        <KPI title="Fields Entered This Week" value={fmt(fieldsEnteredThisWeek)} subtitle="Entered Analyst Team stage" />
        <KPI title="Reports Entered This Week" value={fmt(reportsEnteredThisWeek)} subtitle="New analyst-stage workload" />
        <KPI title="Avg Fields per Entered Report" value={avgFieldsPerEnteredReport} subtitle="Current week mix" />
      </div>
      <div className="grid two">
        <ChartBox title="Fields Entering Analyst Team Stage by Week" source="FactFields, DimDate, DimAnalyst | COUNT(FieldID) entered Analyst Team by week" height={260}>
          <AnalystTeamEntryChart data={weeklyFieldsEnteringAnalystTeam} valueLabel="Fields" />
        </ChartBox>
        <ChartBox title="Reports Entering Analyst Team Stage by Week" source="FactReports, DimDate, DimAnalyst | COUNT(ReportID) entered Analyst Team by week" height={260}>
          <AnalystTeamEntryChart data={weeklyReportsEnteringAnalystTeam} valueLabel="Reports" />
        </ChartBox>
      </div>

      <div className="grid two">
        <ChartBox title="Workload Distribution by Analyst" source="FactFields, DimAnalyst | Open field count by analyst" height={260}>
          <AnalystBar dataKey="fields" color={green.dark} />
        </ChartBox>
        <ChartBox title="Aging by Days In-Flight" height={260}>
          <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
            <BarChart data={daysInFlightBuckets} margin={{ top: 10, right: 20, bottom: 20, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={green.border} />
              <XAxis dataKey="bucket" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="reports">
                {daysInFlightBuckets.map((_, i) => <Cell key={i} fill={[green.accent, green.soft, green.warning, green.danger][i]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartBox>
      </div>

      <ReportsRequiringAttentionTable reports={attentionReports} />
    </PageFrame>
  );
}

type EntryTooltipPayload = {
  color?: string;
  dataKey?: string | number;
  name?: string;
  value?: number;
};

function EntryTooltip({ active, label, payload, valueLabel }: { active?: boolean; label?: string; payload?: EntryTooltipPayload[]; valueLabel: string }) {
  if (!active || !payload?.length) return null;
  const rows = [...payload].sort((a, b) => Number(b.value ?? 0) - Number(a.value ?? 0));

  return (
    <div className="entry-tooltip">
      <div className="entry-tooltip-title">{label}</div>
      <div className="entry-tooltip-subtitle">{valueLabel} entering Analyst Team</div>
      <div className="entry-tooltip-rows">
        {rows.map((row) => (
          <div className="entry-tooltip-row" key={row.dataKey}>
            <span className="entry-tooltip-dot" style={{ backgroundColor: row.color }} />
            <span className="entry-tooltip-name">{row.name}</span>
            <span className="entry-tooltip-value">{fmt(Number(row.value ?? 0))}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AnalystTeamEntryChart({ data, valueLabel }: { data: Array<{ week: string } & Record<(typeof analystEntrySeries)[number]['key'], number>>; valueLabel: string }) {
  return (
    <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
      <BarChart data={data} margin={{ top: 10, right: 20, bottom: 20, left: 10 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={green.border} />
        <XAxis dataKey="week" tick={{ fontSize: 11 }} />
        <YAxis tick={{ fontSize: 11 }} />
        <Tooltip content={<EntryTooltip valueLabel={valueLabel} />} cursor={{ fill: 'rgba(37, 78, 42, 0.08)' }} />
        <Legend wrapperStyle={{ fontSize: 11 }} />
        {analystEntrySeries.map((analyst) => (
          <Bar key={analyst.key} dataKey={analyst.key} fill={analyst.color} name={analyst.name} />
        ))}
      </BarChart>
    </ResponsiveContainer>
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
      <AnalystTable />
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
          <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
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
    </PageFrame>
  );
}

function AgingEscalations() {
  const attentionReports = reportDetails.map((report) => ({
    ...report,
    completedFields: report.fields - report.remaining,
    attentionReason: getAttentionReason(report),
  }));
  const agedReports = 88;
  const avgDaysInFlight = (attentionReports.reduce((sum, report) => sum + report.days, 0) / attentionReports.length).toFixed(1);
  const oldestReport = attentionReports.reduce((oldest, report) => (report.days > oldest.days ? report : oldest), attentionReports[0]);
  const printInterventionNeeded = attentionReports.filter((report) => report.print === 'Required').length;
  const handoffUsers = new Set(notPaidAuditActivity.map((report) => report.movedBy)).size;
  const avgCompleteToNotPaid = (notPaidAuditActivity.reduce((sum, report) => sum + report.daysSinceCompletion, 0) / notPaidAuditActivity.length).toFixed(1);
  const handoffExceptions = notPaidAuditActivity.filter((report) => report.qaFlag !== 'Normal').length;

  return (
    <PageFrame>
      <div className="warning-band">
        <strong>Escalation Review Required</strong>
        <span> 18 reports are breached or blocked. 932 aging fields are tied to reports requiring manager intervention.</span>
      </div>
      <div className="grid four">
        <KPI title="Aged Reports" value={agedReports} subtitle="15+ days in-flight" tone="warning" />
        <KPI title="Avg Days In-Flight" value={avgDaysInFlight} subtitle="Reports requiring attention" tone="warning" />
        <KPI title="Oldest Active Report" value={oldestReport.days} subtitle={`${oldestReport.id} days in-flight`} tone="danger" />
        <KPI title="Print Intervention Needed" value={printInterventionNeeded} subtitle="Active reports" tone="danger" />
      </div>
      <div className="grid two">
        <ChartBox title="Aging by Days In-Flight" height={320}>
          <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
            <BarChart data={daysInFlightBuckets} margin={{ top: 10, right: 20, bottom: 20, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={green.border} />
              <XAxis dataKey="bucket" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="reports">
                {daysInFlightBuckets.map((_, i) => <Cell key={i} fill={[green.accent, green.soft, green.warning, green.danger][i]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartBox>
        <ChartBox title="SLA Status by Current Stage" height={320}>
          <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
            <BarChart data={agingStageBreakdown.map((s, i) => ({ ...s, onTrack: Math.max(6, s.reports - 18 - i), atRisk: 8 + i, breached: Math.max(2, i - 1) }))} layout="vertical" margin={{ top: 5, right: 20, bottom: 5, left: 10 }}>
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
        <ChartBox title="Days In-Flight by Stage" height={260}>
          <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
            <BarChart data={agingStageBreakdown.map((s, i) => ({ status: s.status, days: [4.2, 7.6, 10.8, 12.4, 8.9, 14.2][i] }))} layout="vertical" margin={{ top: 5, right: 20, bottom: 5, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={green.border} />
              <XAxis type="number" tick={{ fontSize: 10 }} />
              <YAxis dataKey="status" type="category" width={116} tick={{ fontSize: 10 }} />
              <Tooltip />
              <Bar dataKey="days" fill={green.warning} />
            </BarChart>
          </ResponsiveContainer>
        </ChartBox>
        <ChartBox title="Escalations Opened Over Time" height={260}>
          <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
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
      <PostReportStageAgingTable />
      <ReportsRequiringAttentionTable reports={attentionReports} />
      <SectionTitle>Completion to Not Paid Audit Tracking</SectionTitle>
      <div className="grid four">
        <KPI title="Reports Moved to Not Paid This Week" value={notPaidAuditActivity.length} subtitle="Report Complete to Not Paid" tone="warning" />
        <KPI title="Analysts Performing Handoffs" value={handoffUsers} subtitle="Moved By users" />
        <KPI title="Avg Time Between Complete and Not Paid" value={`${avgCompleteToNotPaid} days`} subtitle="Completion to handoff" />
        <KPI title="Handoff Exceptions" value={handoffExceptions} subtitle="Needs Review + High Risk" tone="danger" />
      </div>
      <div className="grid two">
        <ChartBox title="Reports Moved to Not Paid by Week" source="FactReportStatusHistory, DimDate, DimUser | COUNT(ReportID) moved from Report Complete to Not Paid by week" height={260}>
          <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
            <BarChart data={notPaidAuditTrend} margin={{ top: 10, right: 20, bottom: 20, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={green.border} />
              <XAxis dataKey="week" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="reports" fill={green.warning} />
            </BarChart>
          </ResponsiveContainer>
        </ChartBox>
        <ChartBox title="Not Paid Handoffs by Moved By User" source="FactReportStatusHistory, DimUser | Status transitions grouped by user moving report" height={260}>
          <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
            <BarChart data={notPaidAuditTrend} margin={{ top: 10, right: 20, bottom: 20, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={green.border} />
              <XAxis dataKey="week" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="maya" stackId="a" fill={green.dark} name="Maya Grant" />
              <Bar dataKey="lena" stackId="a" fill={green.accent} name="Lena Ortiz" />
              <Bar dataKey="owen" stackId="a" fill={green.warning} name="Owen Price" />
            </BarChart>
          </ResponsiveContainer>
        </ChartBox>
      </div>
      <NotPaidAuditTable />
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
          <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
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
          <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
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
    ['North 80', 'Complete', 'Jordan Miles', '100%', '5/15/26 3:42 PM', '0', '42', '38', '6-15 Years'],
    ['East Pivot', 'QA Review', 'Avery Chen', '91%', '5/14/26 10:18 AM', '2', '35', '31', '16-30 Years'],
    ['River Bottom', 'Crop History', 'Marcus Lee', '74%', '5/12/26 2:06 PM', '8', '28', '24', '30+ Years'],
    ['South Ridge', 'Fertilizer History', 'Mateo Ruiz', '68%', '5/10/26 4:31 PM', '11', '31', '29', '16-30 Years'],
    ['Home Quarter', 'Print Prep', 'Elena Foster', '96%', '5/16/26 9:44 AM', '1', '18', '17', '0-5 Years'],
    ['West 120', 'Field Review', 'Priya Nair', '52%', '5/09/26 1:27 PM', '14', '22', '20', '30+ Years'],
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
          <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
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
          <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
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
      <div className="table-box detail-table">
        <div className="chart-title">Report Detail</div>
        <div className="chart-source">FactReports | Report-level status, aging, ownership, print, and history volume</div>
        <table>
          <thead>
            <tr>
              <th>Report ID</th>
              <th>Client</th>
              <th>Created Date</th>
              <th>Assigned Analyst</th>
              <th>Status</th>
              <th>Completed Date</th>
              <th>Priority</th>
              <th>SLA</th>
              <th className="right">Days In-Flight</th>
              <th className="right">Days in Stage</th>
              <th className="right">Total Fields</th>
              <th className="right">Remaining Fields</th>
              <th>Print Intervention</th>
              <th className="right">Crop History</th>
              <th className="right">Fertilizer History</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {reportDetails.map((report) => (
              <tr key={report.id}>
                <td className="strong">{report.id}</td>
                <td>{report.grower}</td>
                <td>{report.createdDate}</td>
                <td>{report.analyst}</td>
                <td>{report.status}</td>
                <td>{report.completedDate || '--'}</td>
                <td>{report.priority}</td>
                <td><Status value={report.sla} /></td>
                <td className="right"><DayBadge days={report.days} urgent={report.print === 'Required'} /></td>
                <td className="right">{report.stageDays}</td>
                <td className="right">{report.fields}</td>
                <td className="right">{report.remaining}</td>
                <td><PrintBadge value={report.print} /></td>
                <td className="right">{fmt(report.crop)}</td>
                <td className="right">{fmt(report.fertilizer)}</td>
                <td><a className="report-link" href={`#report-${report.id}`} aria-label={`View report ${report.id}`}>Open</a></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="table-box detail-table field-detail-table">
        <div className="chart-title">Field Detail</div>
        <div className="chart-source">FactFields | Field-level progress for the selected report detail context</div>
        <table>
          <thead>
            <tr>
              <th>Field</th>
              <th>Status</th>
              <th>Completing Analyst</th>
              <th className="right">Completion %</th>
              <th>Completed Timestamp</th>
              <th className="right">Open Items</th>
              <th className="right">Crop History</th>
              <th className="right">Fertilizer History</th>
              <th>Field Age Band</th>
            </tr>
          </thead>
          <tbody>
            {fieldRows.map(([field, status, completingAnalyst, completion, completedTimestamp, openItems, cropHistory, fertilizerHistory, fieldAgeBand]) => (
              <tr key={field}>
                <td className="strong">{field}</td>
                <td>{status}</td>
                <td>{completingAnalyst}</td>
                <td className="right">{completion}</td>
                <td>{completion === '100%' ? completedTimestamp : ''}</td>
                <td className="right">{openItems}</td>
                <td className="right">{cropHistory}</td>
                <td className="right">{fertilizerHistory}</td>
                <td>{fieldAgeBand}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageFrame>
  );
}

function AnalystBar({ dataKey, color }: { dataKey: keyof (typeof analysts)[number]; color: string }) {
  const data = [...analysts].sort((a, b) => Number(b[dataKey]) - Number(a[dataKey])).map((a) => ({ ...a, short: a.name.split(' ')[0] }));
  return (
    <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
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

function ReportsRequiringAttentionTable({ reports }: { reports: Array<(typeof reportDetails)[number] & { completedFields: number; attentionReason: string }> }) {
  return (
    <div className="table-box attention-table">
      <div className="chart-title">Reports Requiring Attention</div>
      <table>
        <thead>
          <tr>
            <th>Report ID</th>
            <th>Client</th>
            <th>Assigned Analyst</th>
            <th>Status</th>
            <th className="right">Days In-Flight</th>
            <th className="right">Total Fields</th>
            <th className="right">Completed Fields</th>
            <th className="right">Remaining Fields</th>
            <th>Print Intervention</th>
            <th>Attention Reason</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => {
            const urgent = report.print === 'Required';
            return (
              <tr className={urgent ? 'row-urgent' : getDayTone(report.days)} key={report.id}>
                <td className="strong">{report.id}</td>
                <td>{report.grower}</td>
                <td>{report.analyst}</td>
                <td>{report.status}</td>
                <td className="right"><DayBadge days={report.days} urgent={urgent} /></td>
                <td className="right">{report.fields}</td>
                <td className="right">{report.completedFields}</td>
                <td className="right">{report.remaining}</td>
                <td><PrintBadge value={report.print} /></td>
                <td><span className={`reason ${urgent ? 'urgent' : getDayTone(report.days)}`}>{report.attentionReason}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function getPostReportAgingClass(deal: (typeof postReportStageDeals)[number]) {
  if (deal.stage === 'Awaiting First Payment' && deal.agingDays > 14) return 'post-stage-critical';
  if (deal.agingDays > 14) return 'post-stage-urgent';
  if (deal.agingDays > 7) return 'post-stage-warning';
  return '';
}

function PostReportStageAgingTable() {
  return (
    <div className="table-box post-stage-table">
      <div className="chart-title">DocuSign &amp; Awaiting First Payment Aging Matrix</div>
      <div className="chart-source">FactDeals, FactReports, DimOwner | Post-report workflow aging by current stage</div>
      <table>
        <thead>
          <tr>
            <th>Deal Title</th>
            <th>Stage</th>
            <th>Owner (Sales Rep / AL)</th>
            <th>Date Entered Stage</th>
            <th className="right">Aging Days in Current Stage</th>
            <th className="right">Total Fields</th>
            <th>Report Status</th>
            <th>Print Intervention</th>
          </tr>
        </thead>
        <tbody>
          {postReportStageDeals.map((deal) => (
            <tr className={`${getPostReportAgingClass(deal)} ${deal.print === 'Required' ? 'print-highlight' : ''}`} key={deal.title}>
              <td className="strong">{deal.title}</td>
              <td>{deal.stage}</td>
              <td>{deal.owner}</td>
              <td>{deal.dateEntered}</td>
              <td className={`right ${deal.agingDays > 14 ? 'cell-danger' : deal.agingDays > 7 ? 'cell-warning' : ''}`}>{deal.agingDays}</td>
              <td className="right">{deal.fields}</td>
              <td>{deal.reportStatus}</td>
              <td><PrintBadge value={deal.print} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function getQaFlagClass(value: string) {
  if (value === 'High Risk') return 'qa-flag high-risk';
  if (value === 'Needs Review') return 'qa-flag needs-review';
  return 'qa-flag normal';
}

function NotPaidAuditTable() {
  return (
    <div className="table-box audit-table">
      <div className="chart-title">Report Complete &rarr; Not Paid Activity</div>
      <div className="chart-source">FactReportStatusHistory, FactReports, DimAnalyst, DimUser | Report status handoff audit detail</div>
      <table>
        <thead>
          <tr>
            <th>Report ID</th>
            <th>Client</th>
            <th>Assigned Analyst</th>
            <th>Moved By</th>
            <th>Previous Status</th>
            <th>Current Status</th>
            <th>Transition Timestamp</th>
            <th className="right">Days Since Completion</th>
            <th className="right">Total Fields</th>
            <th>Print Intervention</th>
            <th>QA Flag</th>
          </tr>
        </thead>
        <tbody>
          {notPaidAuditActivity.map((report) => (
            <tr className={`${report.daysSinceCompletion >= 8 ? 'delay-risk' : ''} ${report.qaFlag === 'High Risk' ? 'audit-high-risk' : report.qaFlag === 'Needs Review' ? 'audit-review' : ''}`} key={report.id}>
              <td className="strong">{report.id}</td>
              <td>{report.client}</td>
              <td>{report.assignedAnalyst}</td>
              <td>{report.movedBy}</td>
              <td>{report.previousStatus}</td>
              <td>{report.currentStatus}</td>
              <td>{report.transitionTimestamp}</td>
              <td className={`right ${report.daysSinceCompletion >= 8 ? 'cell-danger' : report.daysSinceCompletion >= 5 ? 'cell-warning' : ''}`}>{report.daysSinceCompletion}</td>
              <td className="right">{report.fields}</td>
              <td><PrintBadge value={report.print} /></td>
              <td><span className={getQaFlagClass(report.qaFlag)}>{report.qaFlag}</span></td>
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
          <Slicer title="Report Status" options={['All', ...(activePage === 'aging' ? agingStageBreakdown : statusBreakdown).map((s) => s.status)]} />
          <Slicer title="Aging Threshold" options={['15+ days', '30+ days', '45+ days', '60+ days']} />
          <Slicer title="Field Age Band" options={['All', '0-5 Years', '6-15 Years', '16-30 Years', '30+ Years']} />
          <div className="quality-note">
            <div>Notes</div>
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

const rootElement = document.getElementById('root')!;
const root = window.__reportingAnalystsRoot ?? ReactDOM.createRoot(rootElement);
window.__reportingAnalystsRoot = root;
root.render(<App />);
