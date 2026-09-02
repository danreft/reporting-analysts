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
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from 'recharts';
import './styles.css';

declare global {
  interface Window {
    __reportingAnalystsRoot?: Root;
  }
}

type Page = 'executive' | 'productivity' | 'aging' | 'workload' | 'integrity' | 'future';

const green = {
  header: '#006637',
  dark: '#234E2A',
  mid: '#358540',
  accent: '#7BBD5C',
  soft: '#90B75D',
  pale: '#E6EEE7',
  rail: '#F5F7F6',
  border: '#CFD5D0',
  warning: '#C97A1C',
  danger: '#A33C1B',
  note: '#FFF9E6',
};

const tabs: { id: Page; label: string }[] = [
  { id: 'executive', label: 'Executive Overview' },
  { id: 'productivity', label: 'Analyst Productivity' },
  { id: 'aging', label: 'Aging & Escalations' },
  { id: 'workload', label: 'Workload Distribution' },
  { id: 'integrity', label: 'Data Integrity' },
  { id: 'future', label: 'Future Options' },
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
  { week: 'Apr W1', fields: 812, reports: 41, velocity: 22.4, escalations: 17 },
  { week: 'Apr W2', fields: 934, reports: 46, velocity: 24.8, escalations: 19 },
  { week: 'Apr W3', fields: 1028, reports: 52, velocity: 27.1, escalations: 23 },
  { week: 'Apr W4', fields: 918, reports: 49, velocity: 25.9, escalations: 28 },
  { week: 'Apr W5', fields: 1116, reports: 57, velocity: 29.8, escalations: 24 },
  { week: 'May W1', fields: 1214, reports: 61, velocity: 31.5, escalations: 31 },
  { week: 'May W2', fields: 1076, reports: 54, velocity: 28.7, escalations: 26 },
];

const weeklyUtilization = [
  { week: 'Apr W1',  avery: 128, jordan: 96, priya: 78, mateo: 112, nora: 64, samuel: 84, elena: 60, marcus: 104 },
  { week: 'Apr W2',  avery: 133, jordan: 99, priya: 81, mateo: 118, nora: 68, samuel: 88, elena: 63, marcus: 110 },
  { week: 'Apr W3', avery: 138, jordan: 102, priya: 84, mateo: 122, nora: 70, samuel: 91, elena: 65, marcus: 114 },
  { week: 'Apr W4', avery: 135, jordan: 100, priya: 83, mateo: 120, nora: 69, samuel: 89, elena: 64, marcus: 112 },
  { week: 'Apr W5', avery: 140, jordan: 103, priya: 86, mateo: 125, nora: 71, samuel: 92, elena: 66, marcus: 116 },
  { week: 'May W1',  avery: 144, jordan: 105, priya: 87, mateo: 130, nora: 73, samuel: 95, elena: 69, marcus: 120 },
  { week: 'May W2', avery: 142, jordan: 104, priya: 86, mateo: 128, nora: 72, samuel: 94, elena: 68, marcus: 118 },
];

const weeklyCrop = [
  { week: 'Apr W1',  avery: 468, jordan: 344, priya: 263, mateo: 427, nora: 168, samuel: 233, elena: 138, marcus: 297 },
  { week: 'Apr W2',  avery: 486, jordan: 358, priya: 271, mateo: 441, nora: 175, samuel: 241, elena: 143, marcus: 308 },
  { week: 'Apr W3', avery: 502, jordan: 371, priya: 280, mateo: 456, nora: 181, samuel: 249, elena: 149, marcus: 319 },
  { week: 'Apr W4', avery: 494, jordan: 363, priya: 275, mateo: 448, nora: 178, samuel: 245, elena: 146, marcus: 313 },
  { week: 'Apr W5', avery: 519, jordan: 382, priya: 287, mateo: 469, nora: 185, samuel: 256, elena: 152, marcus: 327 },
  { week: 'May W1',  avery: 541, jordan: 396, priya: 296, mateo: 487, nora: 191, samuel: 265, elena: 158, marcus: 339 },
  { week: 'May W2', avery: 530, jordan: 388, priya: 290, mateo: 477, nora: 188, samuel: 260, elena: 155, marcus: 333 },
];

const weeklyFertilizer = [
  { week: 'Apr W1',  avery: 416, jordan: 321, priya: 242, mateo: 436, nora: 148, samuel: 203, elena: 118, marcus: 308 },
  { week: 'Apr W2',  avery: 431, jordan: 333, priya: 251, mateo: 451, nora: 155, samuel: 211, elena: 124, marcus: 319 },
  { week: 'Apr W3', avery: 449, jordan: 347, priya: 261, mateo: 468, nora: 161, samuel: 219, elena: 129, marcus: 331 },
  { week: 'Apr W4', avery: 440, jordan: 339, priya: 256, mateo: 459, nora: 158, samuel: 215, elena: 126, marcus: 325 },
  { week: 'Apr W5', avery: 462, jordan: 356, priya: 268, mateo: 481, nora: 165, samuel: 224, elena: 132, marcus: 340 },
  { week: 'May W1',  avery: 481, jordan: 370, priya: 278, mateo: 500, nora: 172, samuel: 233, elena: 138, marcus: 354 },
  { week: 'May W2', avery: 471, jordan: 362, priya: 273, mateo: 490, nora: 169, samuel: 228, elena: 135, marcus: 347 },
];

const dataViz = ['#358540', '#234E2A', '#90B75D', '#2F8080', '#00A9E0', '#305C9E', '#C97A1C', '#8A6500'] as const;

const analystEntrySeries = [
  { key: 'avery', name: 'Avery Chen', color: dataViz[0] },
  { key: 'jordan', name: 'Jordan Miles', color: dataViz[1] },
  { key: 'priya', name: 'Priya Nair', color: dataViz[2] },
  { key: 'mateo', name: 'Mateo Ruiz', color: dataViz[3] },
  { key: 'nora', name: 'Nora Patel', color: dataViz[4] },
  { key: 'samuel', name: 'Samuel Brooks', color: dataViz[5] },
  { key: 'elena', name: 'Elena Foster', color: dataViz[6] },
  { key: 'marcus', name: 'Marcus Lee', color: dataViz[7] },
] as const;

const weeklyAnalystTeamEntries = [
  { week: 'Apr W1', fields: { avery: 216, jordan: 184, priya: 148, mateo: 173, nora: 96, samuel: 129, elena: 88, marcus: 154 }, reports: { avery: 10, jordan: 9, priya: 7, mateo: 8, nora: 5, samuel: 6, elena: 4, marcus: 7 } },
  { week: 'Apr W2', fields: { avery: 244, jordan: 205, priya: 169, mateo: 191, nora: 112, samuel: 147, elena: 97, marcus: 171 }, reports: { avery: 12, jordan: 10, priya: 8, mateo: 9, nora: 5, samuel: 7, elena: 5, marcus: 8 } },
  { week: 'Apr W3', fields: { avery: 268, jordan: 227, priya: 188, mateo: 214, nora: 121, samuel: 162, elena: 106, marcus: 184 }, reports: { avery: 13, jordan: 11, priya: 9, mateo: 10, nora: 6, samuel: 8, elena: 5, marcus: 9 } },
  { week: 'Apr W4', fields: { avery: 238, jordan: 198, priya: 176, mateo: 203, nora: 116, samuel: 151, elena: 101, marcus: 178 }, reports: { avery: 11, jordan: 10, priya: 8, mateo: 10, nora: 6, samuel: 7, elena: 5, marcus: 8 } },
  { week: 'Apr W5', fields: { avery: 286, jordan: 241, priya: 206, mateo: 231, nora: 134, samuel: 176, elena: 119, marcus: 197 }, reports: { avery: 14, jordan: 12, priya: 10, mateo: 11, nora: 7, samuel: 9, elena: 6, marcus: 9 } },
  { week: 'May W1', fields: { avery: 309, jordan: 267, priya: 224, mateo: 249, nora: 146, samuel: 188, elena: 128, marcus: 216 }, reports: { avery: 15, jordan: 13, priya: 11, mateo: 12, nora: 7, samuel: 9, elena: 6, marcus: 10 } },
  { week: 'May W2', fields: { avery: 274, jordan: 236, priya: 201, mateo: 226, nora: 128, samuel: 171, elena: 116, marcus: 203 }, reports: { avery: 13, jordan: 12, priya: 10, mateo: 11, nora: 6, samuel: 8, elena: 6, marcus: 10 } },
];

const statusBreakdown = [
  { status: 'Analyst Queue', reports: 38, fields: 672 },
  { status: 'Analyst Team', reports: 153, fields: 4420 },
  { status: 'Reports Complete', reports: 36, fields: 826 },
  { status: 'Not Paid / Report Sent', reports: 71, fields: 2214 },
];

const agingStageBreakdown = statusBreakdown.filter((stage) => stage.status !== 'Not Paid / Report Sent');

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
  { week: 'Apr W1', reports: 9, maya: 3, lena: 4, owen: 2 },
  { week: 'Apr W2', reports: 12, maya: 5, lena: 4, owen: 3 },
  { week: 'Apr W3', reports: 10, maya: 4, lena: 3, owen: 3 },
  { week: 'Apr W4', reports: 14, maya: 6, lena: 5, owen: 3 },
  { week: 'Apr W5', reports: 11, maya: 4, lena: 4, owen: 3 },
  { week: 'May W1', reports: 16, maya: 7, lena: 6, owen: 3 },
  { week: 'May W2', reports: 18, maya: 8, lena: 6, owen: 4 },
];

const reportDetails = [
  { id: 'AGR-24118', dealTitle: 'Hendrickson Farms 2026 Soil Analysis', grower: 'Hendrickson Farms', createdDate: '4/02/26', completedDate: '5/14/26', transitionTimestamp: '5/14/26 9:12 AM', daysSinceCompletion: 18, analyst: 'Avery Chen', status: 'Print Prep', priority: 'High', fields: 214, remaining: 37, days: 46, stageDays: 12, print: 'Required', crop: 628, fertilizer: 584, sla: 'Breached' },
  { id: 'AGR-24109', dealTitle: 'Blue River Acres Fertilizer Review', grower: 'Blue River Acres', createdDate: '4/09/26', completedDate: '5/17/26', transitionTimestamp: '5/17/26 2:44 PM', daysSinceCompletion: 15, analyst: 'Mateo Ruiz', status: 'Fertilizer History', priority: 'High', fields: 188, remaining: 64, days: 39, stageDays: 15, print: 'Required', crop: 512, fertilizer: 621, sla: 'At Risk' },
  { id: 'AGR-24097', dealTitle: 'Prairie View Co-op Annual Report', grower: 'Prairie View Co-op', createdDate: '4/15/26', completedDate: '5/19/26', transitionTimestamp: '5/19/26 11:03 AM', daysSinceCompletion: 13, analyst: 'Marcus Lee', status: 'QA Review', priority: 'Medium', fields: 132, remaining: 18, days: 33, stageDays: 9, print: 'Required', crop: 388, fertilizer: 334, sla: 'At Risk' },
  { id: 'AGR-24131', dealTitle: 'Cedar Ridge Farms Crop History', grower: 'Cedar Ridge Farms', createdDate: '5/13/26', completedDate: '5/28/26', transitionTimestamp: '5/28/26 4:21 PM', daysSinceCompletion: 4, analyst: 'Samuel Brooks', status: 'Crop History', priority: 'Medium', fields: 196, remaining: 51, days: 5, stageDays: 2, print: 'Not Required', crop: 304, fertilizer: 212, sla: 'Needs Review' },
  { id: 'AGR-24142', dealTitle: 'Miller Seed Partners Field Assessment', grower: 'Miller Seed Partners', createdDate: '4/24/26', completedDate: '5/21/26', transitionTimestamp: '5/21/26 8:55 AM', daysSinceCompletion: 11, analyst: 'Avery Chen', status: 'Field Review', priority: 'High', fields: 301, remaining: 202, days: 24, stageDays: 14, print: 'Required', crop: 740, fertilizer: 712, sla: 'At Risk' },
  { id: 'AGR-24156', dealTitle: 'Lakebend Ag QA Report', grower: 'Lakebend Ag', createdDate: '4/30/26', completedDate: '5/23/26', transitionTimestamp: '5/23/26 1:17 PM', daysSinceCompletion: 9, analyst: 'Jordan Miles', status: 'QA Review', priority: 'Low', fields: 42, remaining: 6, days: 18, stageDays: 4, print: 'Not Required', crop: 106, fertilizer: 98, sla: 'On Track' },
  { id: 'AGR-24162', dealTitle: 'North Fork Growers Field Review', grower: 'North Fork Growers', createdDate: '5/02/26', completedDate: '5/25/26', transitionTimestamp: '5/25/26 10:38 AM', daysSinceCompletion: 7, analyst: 'Priya Nair', status: 'Field Review', priority: 'Medium', fields: 76, remaining: 29, days: 16, stageDays: 6, print: 'Not Required', crop: 194, fertilizer: 171, sla: 'On Track' },
  { id: 'AGR-24170', dealTitle: 'Summit Valley Farms Intake', grower: 'Summit Valley Farms', createdDate: '5/10/26', completedDate: '5/29/26', transitionTimestamp: '5/29/26 3:05 PM', daysSinceCompletion: 3, analyst: 'Nora Patel', status: 'Intake', priority: 'Low', fields: 18, remaining: 16, days: 8, stageDays: 3, print: 'Not Required', crop: 44, fertilizer: 39, sla: 'On Track' },
  { id: 'AGR-24183', dealTitle: 'Redstone Grain Print Preparation', grower: 'Redstone Grain', createdDate: '5/13/26', completedDate: '5/28/26', transitionTimestamp: '5/28/26 2:49 PM', daysSinceCompletion: 4, analyst: 'Elena Foster', status: 'Print Prep', priority: 'Medium', fields: 64, remaining: 8, days: 5, stageDays: 2, print: 'Required', crop: 160, fertilizer: 147, sla: 'On Track' },
];

const allFieldRows: [string, string, string, string, string, string, string, string, string][] = [
  ['North 80', 'Complete', 'Jordan Miles', '100%', '5/15/26 3:42 PM', '0', '42', '38', '6-15 Years'],
  ['East Pivot', 'QA Review', 'Avery Chen', '91%', '5/14/26 10:18 AM', '2', '35', '31', '16-30 Years'],
  ['River Bottom', 'Crop History', 'Marcus Lee', '74%', '5/12/26 2:06 PM', '8', '28', '24', '30+ Years'],
  ['South Ridge', 'Fertilizer History', 'Mateo Ruiz', '68%', '5/10/26 4:31 PM', '11', '31', '29', '16-30 Years'],
  ['Home Quarter', 'Print Prep', 'Elena Foster', '96%', '5/16/26 9:44 AM', '1', '18', '17', '0-5 Years'],
  ['West 120', 'Field Review', 'Priya Nair', '52%', '5/09/26 1:27 PM', '14', '22', '20', '30+ Years'],
];

type FilteredData = {
  filteredAnalysts: typeof analysts;
  filteredReports: typeof reportDetails;
  filteredNotPaid: typeof notPaidAuditActivity;
  agingDays: number;
  filteredEntrySeries: readonly (typeof analystEntrySeries)[number][];
  periodDays: number;
};

function getPeriodDays(timeFrame: string): number {
  if (timeFrame.match(/^W\d|W\d$/)) return 5;           // single week
  if (timeFrame.match(/^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \d{4}$/)) return 22; // month
  if (timeFrame.match(/^Q[1-4] \d{4}$/)) return 65;    // quarter
  if (timeFrame.match(/^\d{4}$/)) return 260;           // full year
  return 260;
}

type NavigateAction = {
  page: Page;
  analyst?: string;
  status?: string;
  agingThreshold?: string;
};

type Navigate = (action: NavigateAction) => void;

function fmt(n: number) {
  return n.toLocaleString();
}

function useSortable(initialKey: string, initialDir: 'asc' | 'desc' = 'asc') {
  const [sortKey, setSortKey] = React.useState(initialKey);
  const [sortDir, setSortDir] = React.useState<'asc' | 'desc'>(initialDir);

  const handleSort = (key: string) => {
    if (key === sortKey) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else { setSortKey(key); setSortDir('asc'); }
  };

  const sortData = <T extends Record<string, unknown>>(data: T[]) =>
    [...data].sort((a, b) => {
      const av = a[sortKey], bv = b[sortKey];
      const cmp = typeof av === 'number' && typeof bv === 'number'
        ? av - bv
        : String(av ?? '').localeCompare(String(bv ?? ''));
      return sortDir === 'asc' ? cmp : -cmp;
    });

  return { sortKey, sortDir, handleSort, sortData };
}

function Th({ col, label, sortKey, sortDir, onSort, className }: { col: string; label: string; sortKey: string; sortDir: 'asc' | 'desc'; onSort: (col: string) => void; className?: string }) {
  const active = col === sortKey;
  return (
    <th className={`sortable${active ? ' sorted' : ''}${className ? ' ' + className : ''}`} onClick={() => onSort(col)}>
      {label}{active ? (sortDir === 'asc' ? ' ▲' : ' ▼') : ''}
    </th>
  );
}

function KPI({ title, value, subtitle, tone, onNavigate }: { title: string; value: string | number; subtitle: string; tone?: 'danger' | 'warning'; onNavigate?: () => void }) {
  return (
    <div className={`kpi-card ${onNavigate ? 'clickable' : ''}`} onClick={onNavigate} role={onNavigate ? 'button' : undefined} tabIndex={onNavigate ? 0 : undefined} onKeyDown={onNavigate ? (e) => e.key === 'Enter' && onNavigate() : undefined}>
      <div className="kpi-title">{title}</div>
      <div className={`kpi-value ${tone ?? ''}`}>{value}</div>
      <div className="kpi-subtitle">{subtitle}</div>
    </div>
  );
}

const timeFrameTree = [
  {
    year: '2026', quarters: [
      { q: 'Q1 2026', months: [
        { m: 'Jan 2026', weeks: ['Jan W1', 'Jan W2', 'Jan W3', 'Jan W4'] },
        { m: 'Feb 2026', weeks: ['Feb W1', 'Feb W2', 'Feb W3', 'Feb W4'] },
        { m: 'Mar 2026', weeks: ['Mar W1', 'Mar W2', 'Mar W3', 'Mar W4', 'Mar W5'] },
      ]},
      { q: 'Q2 2026', months: [
        { m: 'Apr 2026', weeks: ['Apr W1', 'Apr W2', 'Apr W3', 'Apr W4'] },
        { m: 'May 2026', weeks: ['May W1', 'May W2', 'May W3', 'May W4'] },
        { m: 'Jun 2026', weeks: ['Jun W1', 'Jun W2', 'Jun W3', 'Jun W4', 'Jun W5'] },
      ]},
      { q: 'Q3 2026', months: [
        { m: 'Jul 2026', weeks: ['Jul W1', 'Jul W2', 'Jul W3', 'Jul W4', 'Jul W5'] },
        { m: 'Aug 2026', weeks: ['Aug W1', 'Aug W2', 'Aug W3', 'Aug W4'] },
        { m: 'Sep 2026', weeks: ['Sep W1', 'Sep W2', 'Sep W3', 'Sep W4'] },
      ]},
      { q: 'Q4 2026', months: [
        { m: 'Oct 2026', weeks: ['Oct W1', 'Oct W2', 'Oct W3', 'Oct W4', 'Oct W5'] },
        { m: 'Nov 2026', weeks: ['Nov W1', 'Nov W2', 'Nov W3', 'Nov W4'] },
        { m: 'Dec 2026', weeks: ['Dec W1', 'Dec W2', 'Dec W3', 'Dec W4'] },
      ]},
    ],
  },
  {
    year: '2025', quarters: [
      { q: 'Q1 2025', months: [
        { m: 'Jan 2025', weeks: ['Jan W1', 'Jan W2', 'Jan W3', 'Jan W4'] },
        { m: 'Feb 2025', weeks: ['Feb W1', 'Feb W2', 'Feb W3', 'Feb W4'] },
        { m: 'Mar 2025', weeks: ['Mar W1', 'Mar W2', 'Mar W3', 'Mar W4', 'Mar W5'] },
      ]},
      { q: 'Q2 2025', months: [
        { m: 'Apr 2025', weeks: ['Apr W1', 'Apr W2', 'Apr W3', 'Apr W4'] },
        { m: 'May 2025', weeks: ['May W1', 'May W2', 'May W3', 'May W4'] },
        { m: 'Jun 2025', weeks: ['Jun W1', 'Jun W2', 'Jun W3', 'Jun W4', 'Jun W5'] },
      ]},
      { q: 'Q3 2025', months: [
        { m: 'Jul 2025', weeks: ['Jul W1', 'Jul W2', 'Jul W3', 'Jul W4', 'Jul W5'] },
        { m: 'Aug 2025', weeks: ['Aug W1', 'Aug W2', 'Aug W3', 'Aug W4'] },
        { m: 'Sep 2025', weeks: ['Sep W1', 'Sep W2', 'Sep W3', 'Sep W4'] },
      ]},
      { q: 'Q4 2025', months: [
        { m: 'Oct 2025', weeks: ['Oct W1', 'Oct W2', 'Oct W3', 'Oct W4', 'Oct W5'] },
        { m: 'Nov 2025', weeks: ['Nov W1', 'Nov W2', 'Nov W3', 'Nov W4'] },
        { m: 'Dec 2025', weeks: ['Dec W1', 'Dec W2', 'Dec W3', 'Dec W4'] },
      ]},
    ],
  },
];

function TimeFrameSlicer({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = React.useState(false);
  const [expandedYears, setExpandedYears] = React.useState<Set<string>>(new Set(['2026']));
  const [expandedQuarters, setExpandedQuarters] = React.useState<Set<string>>(new Set());
  const [expandedMonths, setExpandedMonths] = React.useState<Set<string>>(new Set());
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const toggle = (set: Set<string>, key: string): Set<string> => {
    const next = new Set(set);
    next.has(key) ? next.delete(key) : next.add(key);
    return next;
  };

  return (
    <div className="slicer" ref={ref}>
      <div className="slicer-title">Time Frame</div>
      <div className="multi-select">
        <button className="multi-select-trigger" onClick={() => setOpen((o) => !o)}>
          <span className="multi-select-label">{value}</span>
          <span className="multi-select-arrow">{open ? '▲' : '▼'}</span>
        </button>
        {open && (
          <div className="multi-select-dropdown">
            {timeFrameTree.map(({ year, quarters }) => (
              <div key={year}>
                <label className="multi-select-option tree-node-year">
                  <input type="radio" checked={value === year} onChange={() => { onChange(year); setOpen(false); }} />
                  <span style={{ flex: 1 }}>{year}</span>
                  <span className="tree-chevron" onClick={(e) => { e.preventDefault(); setExpandedYears(toggle(expandedYears, year)); }}>
                    {expandedYears.has(year) ? '▾' : '▸'}
                  </span>
                </label>
                {expandedYears.has(year) && quarters.map(({ q, months }) => (
                  <div key={q}>
                    <label className="multi-select-option tree-node-quarter">
                      <input type="radio" checked={value === q} onChange={() => { onChange(q); setOpen(false); }} />
                      <span style={{ flex: 1 }}>{q}</span>
                      <span className="tree-chevron" onClick={(e) => { e.preventDefault(); setExpandedQuarters(toggle(expandedQuarters, q)); }}>
                        {expandedQuarters.has(q) ? '▾' : '▸'}
                      </span>
                    </label>
                    {expandedQuarters.has(q) && months.map(({ m, weeks }) => (
                      <div key={m}>
                        <label className="multi-select-option tree-node-month">
                          <input type="radio" checked={value === m} onChange={() => { onChange(m); setOpen(false); }} />
                          <span style={{ flex: 1 }}>{m}</span>
                          <span className="tree-chevron" onClick={(e) => { e.preventDefault(); setExpandedMonths(toggle(expandedMonths, m)); }}>
                            {expandedMonths.has(m) ? '▾' : '▸'}
                          </span>
                        </label>
                        {expandedMonths.has(m) && weeks.map((w) => (
                          <label key={w} className="multi-select-option tree-node-week">
                            <input type="radio" checked={value === w} onChange={() => { onChange(w); setOpen(false); }} />
                            <span>{w}</span>
                          </label>
                        ))}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

type SlicerProps =
  | { title: string; options: string[]; multiSelect: true; value: string[]; onChange: (v: string[]) => void }
  | { title: string; options: string[]; multiSelect?: false; value: string; onChange: (v: string) => void };

function Slicer(props: SlicerProps) {
  const { title, options, multiSelect } = props;
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const label = multiSelect
    ? (props.value.length === 0 ? 'All' : props.value.length === 1 ? props.value[0] : `${props.value.length} selected`)
    : props.value;

  const handleOptionClick = (option: string) => {
    if (multiSelect) {
      const cur = props.value;
      props.onChange(cur.includes(option) ? cur.filter((v) => v !== option) : [...cur, option]);
    } else {
      props.onChange(option);
      setOpen(false);
    }
  };

  const isChecked = (option: string) => multiSelect ? props.value.includes(option) : props.value === option;

  return (
    <div className="slicer" ref={ref}>
      <div className="slicer-title">{title}</div>
      <div className="multi-select">
        <button className="multi-select-trigger" onClick={() => setOpen((o) => !o)}>
          <span className="multi-select-label">{label}</span>
          <span className="multi-select-arrow">{open ? '▲' : '▼'}</span>
        </button>
        {open && (
          <div className="multi-select-dropdown">
            {multiSelect && (
              <label className="multi-select-option">
                <input type="checkbox" checked={props.value.length === 0} onChange={() => props.onChange([])} />
                <span>All</span>
              </label>
            )}
            {options.map((option) => (
              <label className="multi-select-option" key={option}>
                <input
                  type={multiSelect ? 'checkbox' : 'radio'}
                  checked={isChecked(option)}
                  onChange={() => handleOptionClick(option)}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        )}
      </div>
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

function ExecutiveOverview({ fd, navigate }: { fd: FilteredData; navigate: Navigate }) {
  const { filteredAnalysts, filteredReports, agingDays, filteredEntrySeries, periodDays } = fd;

  const openFields = filteredAnalysts.reduce((sum, a) => sum + a.fields, 0);
  const completedFields = filteredAnalysts.reduce((sum, a) => sum + a.completedFields, 0);
  const completedReports = filteredAnalysts.reduce((sum, a) => sum + a.completedReports, 0);
  const agedReports = filteredReports.filter((r) => r.days >= agingDays).length;
  const printInterventions = filteredReports.filter((r) => r.print === 'Required').length;
  const totalFields = filteredReports.reduce((sum, r) => sum + r.fields, 0);
  const avgFieldsPerReport = filteredReports.length > 0 ? (totalFields / filteredReports.length).toFixed(1) : '—';
  const avgDays = filteredReports.length > 0 ? (filteredReports.reduce((sum, r) => sum + r.days, 0) / filteredReports.length).toFixed(1) : '—';
  const avgVelocity = filteredAnalysts.length > 0 ? (filteredAnalysts.reduce((sum, a) => sum + a.completedReports, 0) / (filteredAnalysts.length * periodDays)).toFixed(1) : '—';

  const filteredKeys = new Set(filteredEntrySeries.map((s) => s.key));
  const weeklyFieldsFiltered = weeklyAnalystTeamEntries.map((entry) => ({
    week: entry.week,
    ...Object.fromEntries(Object.entries(entry.fields).filter(([k]) => filteredKeys.has(k as (typeof analystEntrySeries)[number]['key']))),
  }));
  const weeklyReportsFiltered = weeklyAnalystTeamEntries.map((entry) => ({
    week: entry.week,
    ...Object.fromEntries(Object.entries(entry.reports).filter(([k]) => filteredKeys.has(k as (typeof analystEntrySeries)[number]['key']))),
  }));

  const latestEntry = weeklyAnalystTeamEntries[weeklyAnalystTeamEntries.length - 1];
  const fieldsEnteredThisWeek = Object.entries(latestEntry.fields)
    .filter(([k]) => filteredKeys.has(k as (typeof analystEntrySeries)[number]['key']))
    .reduce((sum, [, v]) => sum + v, 0);
  const reportsEnteredThisWeek = Object.entries(latestEntry.reports)
    .filter(([k]) => filteredKeys.has(k as (typeof analystEntrySeries)[number]['key']))
    .reduce((sum, [, v]) => sum + v, 0);
  const avgFieldsPerEnteredReport = reportsEnteredThisWeek > 0 ? (fieldsEnteredThisWeek / reportsEnteredThisWeek).toFixed(1) : '—';

  const overCapacity = filteredAnalysts.filter((a) => a.utilization > 115).length;
  const breachedReports = filteredReports.filter((r) => r.sla === 'Breached').length;
  const slaBreachRate = filteredReports.length > 0 ? `${((breachedReports / filteredReports.length) * 100).toFixed(1)}%` : '—';

  const attentionReports = filteredReports.map((report) => ({
    ...report,
    completedFields: report.fields - report.remaining,
    attentionReason: getAttentionReason(report),
  }));

  return (
    <PageFrame>
      <SectionTitle>Operations</SectionTitle>
      <div className="grid four">
        <KPI title="Active Analysts" value={filteredAnalysts.filter((a) => a.reports > 0).length} subtitle="With ≥1 report in timeframe" onNavigate={() => navigate({ page: 'productivity' })} />
        <KPI title="SLA Breach Rate" value={slaBreachRate} subtitle="Open reports" tone="warning" onNavigate={() => navigate({ page: 'aging' })} />
        <KPI title="Days In-Flight" value={avgDays} subtitle="Average open age" onNavigate={() => navigate({ page: 'aging' })} />
        <KPI title="Aged Analyst Stage" value={agedReports} subtitle={`${agingDays}+ days in-flight`} tone="warning" onNavigate={() => navigate({ page: 'aging' })} />
      </div>

      <SectionTitle>Fields &amp; Reports</SectionTitle>
      <div className="grid four">
        <KPI title="Reports Completed" value={fmt(completedReports)} subtitle="Closed reports" onNavigate={() => navigate({ page: 'productivity' })} />
        <KPI title="Fields Completed" value={fmt(completedFields)} subtitle="Current period" onNavigate={() => navigate({ page: 'productivity' })} />
        <KPI title="Report Completion Velocity" value={avgVelocity} subtitle="Reports / analyst day" onNavigate={() => navigate({ page: 'productivity' })} />
        <KPI title="Reports with Hindcasting" value={fmt(Math.round(completedReports * 0.62))} subtitle="Completed reports this period" onNavigate={() => navigate({ page: 'productivity' })} />
        <KPI title="Report Acres This Period" value={fmt(filteredAnalysts.reduce((s, a) => s + a.completedReports, 0) * 1840)} subtitle="RFS submitted acres" onNavigate={() => navigate({ page: 'productivity' })} />
        <KPI title="Crop History Entries" value={fmt(filteredAnalysts.reduce((s, a) => s + a.crop, 0))} subtitle="Open + completed" onNavigate={() => navigate({ page: 'workload' })} />
        <KPI title="Fertilizer History Entries" value={fmt(filteredAnalysts.reduce((s, a) => s + a.fertilizer, 0))} subtitle="Open + completed" onNavigate={() => navigate({ page: 'workload' })} />
        <KPI title="Avg Fields per Report" value={avgFieldsPerReport} subtitle="Open workload" onNavigate={() => navigate({ page: 'workload' })} />
        <KPI title="Open Fields" value={fmt(openFields)} subtitle="Assigned field backlog" onNavigate={() => navigate({ page: 'workload' })} />
      </div>
      <div className="grid two">
        <ChartBox title="Report Status by Stage" source="FactReports | COUNT(ReportID) by Pipedrive stage" height={260}>
          <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
            <BarChart data={statusBreakdown} layout="vertical" margin={{ top: 5, right: 20, bottom: 5, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={green.border} />
              <XAxis type="number" tick={{ fontSize: 10 }} />
              <YAxis dataKey="status" type="category" width={148} tick={{ fontSize: 10 }} />
              <Tooltip />
              <Bar dataKey="reports" fill={dataViz[0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartBox>
        <ChartBox title="Fields Completed by Week" source="FactFields, DimDate | COUNT(FieldID) completed by week" height={260}>
          <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
            <LineChart data={weekly} margin={{ top: 10, right: 25, bottom: 12, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={green.border} />
              <XAxis dataKey="week" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Line type="monotone" dataKey="fields" stroke={dataViz[0]} strokeWidth={2} dot={{ r: 4, fill: dataViz[0] }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartBox>
      </div>

      <SectionTitle>Entered Analyst Team Stage</SectionTitle>
      <div className="grid two">
        <KPI title="Reports Entered This Week" value={fmt(reportsEnteredThisWeek)} subtitle="Entered Analyst Team stage" />
        <KPI title="Avg Fields per Entered Report" value={avgFieldsPerEnteredReport} subtitle="Current week mix" />
      </div>
      <div className="grid two">
      <ChartBox title="Reports Entering Analyst Team Stage by Week" source="FactReports, DimDate, DimAnalyst | COUNT(ReportID) entered Analyst Team by week" height={280}>
        {(() => {
          const data = weeklyReportsFiltered.map((rw) => ({
            week: rw.week,
            ...Object.fromEntries(filteredEntrySeries.map((s) => [s.name, (rw as unknown as Record<string, number>)[s.key] ?? 0])),
          }));
          return (
            <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
              <BarChart data={data} margin={{ top: 10, right: 20, bottom: 20, left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={green.border} />
                <XAxis dataKey="week" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: 10 }} />
                {filteredEntrySeries.map((s) => (
                  <Bar key={s.key} dataKey={s.name} fill={s.color} />
                ))}
              </BarChart>
            </ResponsiveContainer>
          );
        })()}
      </ChartBox>
      <ChartBox title="Hindcasting Fields" source="FactFields, FactReports, DimDate | Fields and Reports entering Analyst Team stage by week" height={280}>
        {(() => {
          const combined = weeklyFieldsFiltered.map((fw, i) => {
            const rw = weeklyReportsFiltered[i];
            const totalFields = filteredEntrySeries.reduce((s, a) => s + (((fw as unknown) as Record<string, number>)[a.key] ?? 0), 0);
            const totalReports = filteredEntrySeries.reduce((s, a) => s + (((rw as unknown) as Record<string, number>)[a.key] ?? 0), 0);
            return { week: fw.week, Fields: totalFields, Reports: totalReports };
          });
          return (
            <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
              <BarChart data={combined} margin={{ top: 10, right: 40, bottom: 20, left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={green.border} />
                <XAxis dataKey="week" tick={{ fontSize: 11 }} />
                <YAxis yAxisId="left" tick={{ fontSize: 11 }} />
                <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar yAxisId="left" dataKey="Fields" fill={dataViz[0]} name="Fields" />
                <Bar yAxisId="right" dataKey="Reports" fill={dataViz[3]} name="Reports" />
              </BarChart>
            </ResponsiveContainer>
          );
        })()}
      </ChartBox>
      </div>

      <div className="grid two">
        <ChartBox title="Workload Distribution by Analyst" source="FactFields, DimAnalyst | Open field count by analyst" height={260}>
          <AnalystBar dataKey="fields" color={dataViz[0]} data={filteredAnalysts} />
        </ChartBox>
        <ChartBox title="Aging by Days In-Flight" height={260}>
          <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
            <BarChart data={daysInFlightBuckets} margin={{ top: 10, right: 20, bottom: 20, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={green.border} />
              <XAxis dataKey="bucket" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="reports">
                {daysInFlightBuckets.map((_, i) => <Cell key={i} fill={dataViz[i]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartBox>
      </div>

      <ChartBox title="Productivity Trend" source="FactFields, DimDate | Weekly completed fields and reports" height={260}>
        <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
          <LineChart data={weekly} margin={{ top: 10, right: 40, bottom: 12, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={green.border} />
            <XAxis dataKey="week" tick={{ fontSize: 11 }} />
            <YAxis yAxisId="left" tick={{ fontSize: 11 }} />
            <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} />
            <Tooltip />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Line yAxisId="left" type="monotone" dataKey="fields" stroke={dataViz[0]} strokeWidth={2} name="Fields" />
            <Line yAxisId="right" type="monotone" dataKey="reports" stroke={dataViz[1]} strokeWidth={2} name="Reports" />
          </LineChart>
        </ResponsiveContainer>
      </ChartBox>

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

function AnalystTeamEntryChart({ data, valueLabel, series }: { data: Array<{ week: string } & Record<string, number>>; valueLabel: string; series: typeof analystEntrySeries | ReadonlyArray<(typeof analystEntrySeries)[number]> }) {
  return (
    <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
      <BarChart data={data} margin={{ top: 10, right: 20, bottom: 20, left: 10 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={green.border} />
        <XAxis dataKey="week" tick={{ fontSize: 11 }} />
        <YAxis tick={{ fontSize: 11 }} />
        <Tooltip content={<EntryTooltip valueLabel={valueLabel} />} cursor={{ fill: 'rgba(37, 78, 42, 0.08)' }} />
        <Legend wrapperStyle={{ fontSize: 11 }} />
        {series.map((analyst) => (
          <Bar key={analyst.key} dataKey={analyst.key} fill={analyst.color} name={analyst.name} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}

function AnalystProductivity({ fd, navigate }: { fd: FilteredData; navigate: Navigate }) {
  const { filteredAnalysts, filteredEntrySeries, periodDays } = fd;
  const topAnalyst = [...filteredAnalysts].sort((a, b) => b.completedFields - a.completedFields)[0];
  const avgFields = filteredAnalysts.length > 0 ? Math.round(filteredAnalysts.reduce((s, a) => s + a.completedFields, 0) / filteredAnalysts.length) : 0;
  const avgVelocity = filteredAnalysts.length > 0 ? (filteredAnalysts.reduce((s, a) => s + a.completedFields, 0) / (filteredAnalysts.length * periodDays)).toFixed(1) : '—';
  const totalCompleted = filteredAnalysts.reduce((s, a) => s + a.completedReports, 0);
  const totalAging = filteredAnalysts.reduce((s, a) => s + a.aged, 0);
  return (
    <PageFrame>
      <div className="grid six">
        <KPI title="Reports Completed" value={fmt(totalCompleted)} subtitle="Current period" onNavigate={() => navigate({ page: 'workload' })} />
        <KPI title="Avg Fields / Analyst" value={fmt(avgFields)} subtitle="Current period" onNavigate={() => navigate({ page: 'workload' })} />
        <KPI title="Aging Fields Owned" value={fmt(totalAging)} subtitle="15+ days open" tone="warning" onNavigate={() => navigate({ page: 'aging' })} />
        <KPI title="Change Request Rate" value={fmt(Math.round(totalCompleted * 0.08))} subtitle="Report change requests this period" tone="warning" />
        <KPI title="Change Request Turnaround" value="3.2" subtitle="Median days to completion" />
        <KPI title="Note Acknowledgment Rate" value="78%" subtitle="Mentions ack'd within 24 hrs" />
      </div>
      <AnalystTable data={filteredAnalysts} periodDays={periodDays} />
      <SectionTitle>Analysts Needing Attention</SectionTitle>
      <div className="grid two">
        <ChartBox title="Analyst Needing Attention" source="FactFields, DimAnalyst | Completed fields as % of total assigned fields per analyst" height={260}>
          {(() => {
            const surfaceData = [...filteredAnalysts]
              .map(a => ({ short: a.name.split(' ')[0], name: a.name, pct: a.completedFields + a.fields > 0 ? Math.round((a.completedFields / (a.completedFields + a.fields)) * 100) : 0 }))
              .sort((a, b) => b.pct - a.pct);
            return (
              <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                <BarChart data={surfaceData} layout="vertical" margin={{ top: 5, right: 30, bottom: 5, left: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={green.border} />
                  <XAxis type="number" tick={{ fontSize: 10 }} unit="%" domain={[0, 100]} />
                  <YAxis dataKey="short" type="category" width={76} tick={{ fontSize: 10 }} />
                  <Tooltip formatter={(value: unknown) => (typeof value === 'number' ? `${value}%` : '')} labelFormatter={(_, payload) => payload?.[0]?.payload?.name ?? ''} />
                  <Bar dataKey="pct" name="Surface Utilization">
                    {surfaceData.map((d, i) => (
                      <Cell key={i} fill={d.pct >= 55 ? dataViz[0] : d.pct >= 40 ? green.warning : green.danger} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            );
          })()}
        </ChartBox>
        <ChartBox title="Print Intervention Ownership" source="FactReports | Reports requiring print intervention by analyst" height={260}>
          <AnalystBar dataKey="print" color={dataViz[0]} data={filteredAnalysts} />
        </ChartBox>
      </div>
    </PageFrame>
  );
}

function AgingEscalations({ fd, navigate }: { fd: FilteredData; navigate: Navigate }) {
  const { filteredReports, filteredNotPaid, agingDays } = fd;

  const attentionReports = filteredReports.map((report) => ({
    ...report,
    completedFields: report.fields - report.remaining,
    attentionReason: getAttentionReason(report),
  }));
  const agedReports = filteredReports.filter((r) => r.days >= agingDays).length;
  const avgDaysInFlight = attentionReports.length > 0
    ? (attentionReports.reduce((sum, r) => sum + r.days, 0) / attentionReports.length).toFixed(1)
    : '—';
  const oldestReport = attentionReports.reduce((oldest, report) => (report.days > oldest.days ? report : oldest), attentionReports[0]);
  const printInterventionNeeded = attentionReports.filter((r) => r.print === 'Required').length;
  const handoffUsers = new Set(filteredNotPaid.map((r) => r.movedBy)).size;
  const avgCompleteToNotPaid = filteredNotPaid.length > 0
    ? (filteredNotPaid.reduce((sum, r) => sum + r.daysSinceCompletion, 0) / filteredNotPaid.length).toFixed(1)
    : '—';
  const handoffExceptions = filteredNotPaid.filter((r) => r.qaFlag !== 'Normal').length;
  const sortedDays = [...attentionReports].map((r) => r.days).sort((a, b) => a - b);
  const medianCycleTime = sortedDays.length > 0
    ? sortedDays.length % 2 === 1
      ? sortedDays[Math.floor(sortedDays.length / 2)]
      : ((sortedDays[sortedDays.length / 2 - 1] + sortedDays[sortedDays.length / 2]) / 2).toFixed(1)
    : '—';
  const parkedNoHistory = filteredReports.filter((r) => r.days >= 30 && r.status === 'Field Review').length;

  return (
    <PageFrame>
      <div className="warning-band">
        <strong>Escalation Review Required</strong>
        <span> {agedReports} reports are breached or blocked. Aging fields are tied to reports requiring manager intervention.</span>
      </div>
      <div className="grid five">
        <KPI title="Aged Analyst Stage" value={agedReports} subtitle={`${agingDays}+ days in-flight`} tone="warning" onNavigate={() => navigate({ page: 'workload' })} />
        <KPI title="Oldest Active Report" value={oldestReport?.days ?? '—'} subtitle={oldestReport ? `${oldestReport.id} days in-flight` : ''} tone="danger" onNavigate={oldestReport ? () => navigate({ page: 'workload', analyst: oldestReport.analyst }) : undefined} />
        <KPI title="Print Intervention Needed" value={printInterventionNeeded} subtitle="Active reports" tone="danger" onNavigate={() => navigate({ page: 'workload' })} />
        <KPI title="Median Cycle Time" value={medianCycleTime} subtitle="Days, Analyst Team → Report Complete" />
        <KPI title="Parked 30+ Days (No Field History)" value={parkedNoHistory} subtitle="Awaiting field history" tone="warning" />
      </div>
      <div className="grid two">
        <ChartBox title="Days In-Flight by Stage" height={300}>
          <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
            <BarChart data={agingStageBreakdown.map((s, i) => ({ status: s.status, days: [4.2, 7.6, 10.8, 12.4, 8.9, 14.2][i] }))} layout="vertical" margin={{ top: 5, right: 20, bottom: 5, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={green.border} />
              <XAxis type="number" tick={{ fontSize: 10 }} />
              <YAxis dataKey="status" type="category" width={116} tick={{ fontSize: 10 }} />
              <Tooltip />
              <Bar dataKey="days" fill={dataViz[0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartBox>
        <ChartBox title="Reports Moved to Report Complete by Week" source="FactReportStatusHistory, DimDate, DimUser | COUNT(ReportID) moved from Report Complete to Not Paid by week" height={300}>
          <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
            <BarChart data={notPaidAuditTrend} margin={{ top: 10, right: 20, bottom: 20, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={green.border} />
              <XAxis dataKey="week" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="reports" fill={dataViz[0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartBox>
      </div>
      <ReportsRequiringAttentionTable reports={attentionReports} />
    </PageFrame>
  );
}

function WorkloadDistribution({ fd, navigate }: { fd: FilteredData; navigate: Navigate }) {
  const { filteredAnalysts, filteredEntrySeries, periodDays } = fd;
  const openFields = filteredAnalysts.reduce((s, a) => s + a.fields, 0);
  const cropTotal = filteredAnalysts.reduce((s, a) => s + a.crop, 0);
  const fertTotal = filteredAnalysts.reduce((s, a) => s + a.fertilizer, 0);
  const overCapacity = filteredAnalysts.filter((a) => a.utilization > 115).length;
  const withCapacity = filteredAnalysts.filter((a) => a.utilization < 85).length;
  const avgUtil = filteredAnalysts.length > 0 ? Math.round(filteredAnalysts.reduce((s, a) => s + a.utilization, 0) / filteredAnalysts.length) : 0;

  const filteredFieldAgeByAnalyst = filteredAnalysts.map((a) => ({
    name: a.name.split(' ')[0],
    current: Math.max(0, Math.round(a.fields * 0.58)),
    aging: a.aged,
    breached: Math.round(a.aged * 0.32),
  }));

  return (
    <PageFrame>
      <div className="warning-band">
        <strong>Workload Imbalance Needs Review</strong>
        <span> {overCapacity} analysts are above capacity while {withCapacity} analysts have available capacity.</span>
      </div>
      <div className="grid one">
        <KPI title="Unassigned Reports" value="19" subtitle="Awaiting owner" tone="warning" onNavigate={() => navigate({ page: 'workload' })} />
      </div>
      <SectionTitle>Workload Balance</SectionTitle>
      <div className="grid two">
        <ChartBox title="Open Reports by Analyst" source="FactFields, DimAnalyst | Open field count by analyst" height={260}>
          <AnalystBar dataKey="fields" color={dataViz[0]} data={filteredAnalysts} />
        </ChartBox>
        <ChartBox title="Aging Work by Analyst" source="FactFields | Current, aging, and breached field ownership" height={260}>
          <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
            <BarChart data={filteredFieldAgeByAnalyst} layout="vertical" margin={{ top: 5, right: 20, bottom: 5, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={green.border} />
              <XAxis type="number" tick={{ fontSize: 10 }} />
              <YAxis dataKey="name" type="category" width={76} tick={{ fontSize: 10 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="current" stackId="a" fill={dataViz[0]} name="Current" />
              <Bar dataKey="aging" stackId="a" fill={green.warning} name="Aging" />
              <Bar dataKey="breached" stackId="a" fill={green.danger} name="Passed Due" />
            </BarChart>
          </ResponsiveContainer>
        </ChartBox>
      </div>
      <SectionTitle>Analyst Productivity</SectionTitle>
      <div className="grid four">
        <KPI title="Open Reports" value={filteredAnalysts.reduce((s, a) => s + a.reports, 0)} subtitle="Assigned + unassigned" onNavigate={() => navigate({ page: 'workload' })} />
        <KPI title="Open Fields" value={fmt(openFields)} subtitle="Active backlog" onNavigate={() => navigate({ page: 'workload' })} />
        <KPI title="Crop History Entries" value={fmt(cropTotal)} subtitle="Current workload" onNavigate={() => navigate({ page: 'workload' })} />
        <KPI title="Fertilizer History Entries" value={fmt(fertTotal)} subtitle="Current workload" onNavigate={() => navigate({ page: 'workload' })} />
      </div>
      <ChartBox title="Hindcasting Reports" source="FactCropHistory, FactFertilizerHistory, DimDate, DimAnalyst | Weekly crop and fertilizer history entries by analyst" height={300}>
        {(() => {
          const combined = weeklyCrop.map((cw, i) => {
            const fw = weeklyFertilizer[i];
            const cropTotal = filteredEntrySeries.reduce((s, a) => s + ((cw as unknown as Record<string, number>)[a.key] ?? 0), 0);
            const fertTotal = filteredEntrySeries.reduce((s, a) => s + ((fw as unknown as Record<string, number>)[a.key] ?? 0), 0);
            return { week: cw.week, Crop: cropTotal, Fertilizer: fertTotal };
          });
          return (
            <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
              <LineChart data={combined} margin={{ top: 10, right: 40, bottom: 12, left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={green.border} />
                <XAxis dataKey="week" tick={{ fontSize: 11 }} />
                <YAxis yAxisId="left" tick={{ fontSize: 11 }} domain={['auto', 'auto']} />
                <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} domain={['auto', 'auto']} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Line yAxisId="left" type="monotone" dataKey="Crop" stroke={dataViz[0]} strokeWidth={2} dot={false} name="Crop History" />
                <Line yAxisId="right" type="monotone" dataKey="Fertilizer" stroke={dataViz[3]} strokeWidth={2} dot={false} name="Fertilizer History" />
              </LineChart>
            </ResponsiveContainer>
          );
        })()}
      </ChartBox>
    </PageFrame>
  );
}



function AnalystBar({ dataKey, color, data, unit }: { dataKey: keyof (typeof analysts)[number]; color: string; data: typeof analysts; unit?: string }) {
  const sorted = [...data].sort((a, b) => Number(b[dataKey]) - Number(a[dataKey])).map((a) => ({ ...a, short: a.name.split(' ')[0] }));
  return (
    <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
      <BarChart data={sorted} layout="vertical" margin={{ top: 5, right: 20, bottom: 5, left: 10 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={green.border} />
        <XAxis type="number" tick={{ fontSize: 10 }} unit={unit} />
        <YAxis dataKey="short" type="category" width={76} tick={{ fontSize: 10 }} />
        <Tooltip formatter={(value: unknown) => (typeof value === 'number' ? (unit ? `${value}${unit}` : value) : '')} />
        <Bar dataKey={dataKey as string} fill={color}>
          {dataKey === 'utilization' ? sorted.map((a, i) => (
            <Cell key={i} fill={a.utilization > 115 ? green.danger : a.utilization < 85 ? green.accent : color} />
          )) : null}
        </Bar>
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


function SectionTitle({ children }: { children: React.ReactNode }) {
  return <div className="section-title">{children}</div>;
}

function PageFrame({ children }: { children: React.ReactNode }) {
  return <div className="page-frame">{children}</div>;
}

function ReportsRequiringAttentionTable({ reports }: { reports: Array<(typeof reportDetails)[number] & { completedFields: number; attentionReason: string }> }) {
  const { sortKey, sortDir, handleSort, sortData } = useSortable('daysSinceCompletion', 'desc');
  const sorted = sortData(reports as unknown as Record<string, unknown>[]) as typeof reports;
  const T = ({ col, label, className }: { col: string; label: string; className?: string }) =>
    <Th col={col} label={label} sortKey={sortKey} sortDir={sortDir} onSort={handleSort} className={className} />;
  return (
    <div className="table-box attention-table">
      <div className="chart-title">Reports Requiring Attention</div>
      <table>
        <colgroup>
          <col style={{ width: 110 }} />
          <col />
          <col style={{ width: 140 }} />
          <col style={{ width: 150 }} />
          <col style={{ width: 130 }} />
          <col style={{ width: 90 }} />
        </colgroup>
        <thead>
          <tr>
            <T col="id" label="Report ID" />
            <T col="dealTitle" label="Report Title" />
            <T col="analyst" label="Assigned Analyst" />
            <T col="transitionTimestamp" label="Transition Timestamp" />
            <T col="daysSinceCompletion" label="Days Since Completion" className="right" />
            <T col="fields" label="Total Fields" className="right" />
          </tr>
        </thead>
        <tbody>
          {sorted.map((report) => (
            <tr key={report.id}>
              <td className="strong">{report.id}</td>
              <td>{report.dealTitle}</td>
              <td>{report.analyst}</td>
              <td>{report.transitionTimestamp}</td>
              <td className="right"><DayBadge days={report.daysSinceCompletion} urgent={false} /></td>
              <td className="right">{report.fields}</td>
            </tr>
          ))}
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


function getQaFlagClass(value: string) {
  if (value === 'High Risk') return 'qa-flag high-risk';
  if (value === 'Needs Review') return 'qa-flag needs-review';
  return 'qa-flag normal';
}

function NotPaidAuditTable({ data }: { data: typeof notPaidAuditActivity }) {
  const { sortKey, sortDir, handleSort, sortData } = useSortable('daysSinceCompletion');
  const sorted = sortData(data as unknown as Record<string, unknown>[]) as typeof notPaidAuditActivity;
  const T = ({ col, label, className }: { col: string; label: string; className?: string }) =>
    <Th col={col} label={label} sortKey={sortKey} sortDir={sortDir} onSort={handleSort} className={className} />;
  return (
    <div className="table-box audit-table">
      <div className="chart-title">Report Complete &rarr; Not Paid Activity</div>
      <div className="chart-source">FactReportStatusHistory, FactReports, DimAnalyst, DimUser | Report status handoff audit detail</div>
      <table>
        <thead>
          <tr>
            <T col="id" label="Report ID" />
            <T col="client" label="Client" />
            <T col="assignedAnalyst" label="Assigned Analyst" />
            <T col="movedBy" label="Moved By" />
            <T col="transitionTimestamp" label="Transition Timestamp" />
            <T col="daysSinceCompletion" label="Days Since Completion" className="right" />
            <T col="fields" label="Total Fields" className="right" />
            <T col="print" label="Print Intervention" />
            <T col="qaFlag" label="QA Flag" />
          </tr>
        </thead>
        <tbody>
          {sorted.map((report) => (
            <tr className={`${report.daysSinceCompletion >= 8 ? 'delay-risk' : ''} ${report.qaFlag === 'High Risk' ? 'audit-high-risk' : report.qaFlag === 'Needs Review' ? 'audit-review' : ''}`} key={report.id}>
              <td className="strong">{report.id}</td>
              <td>{report.client}</td>
              <td>{report.assignedAnalyst}</td>
              <td>{report.movedBy}</td>
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

function AnalystTable({ data, periodDays = 260 }: { data: typeof analysts; periodDays?: number }) {
  const { sortKey, sortDir, handleSort, sortData } = useSortable('completedFields');
  const sorted = sortData(data as unknown as Record<string, unknown>[]) as typeof analysts;
  const T = ({ col, label, className }: { col: string; label: string; className?: string }) =>
    <Th col={col} label={label} sortKey={sortKey} sortDir={sortDir} onSort={handleSort} className={className} />;
  return (
    <div className="table-box">
      <div className="chart-title">Analyst Productivity Table</div>
      <div className="chart-source">FactFields, FactReports, DimAnalyst | Field-level productivity and active workload by analyst</div>
      <table>
        <thead>
          <tr>
            <T col="name" label="Analyst" />
            <T col="reports" label="Open Reports" className="right" />
            <T col="fields" label="Open Fields" className="right" />
            <T col="completedReports" label="Completed Reports" className="right" />
            <T col="completedFields" label="Completed Fields" className="right" />
            <T col="velocity" label="Fields / Day" className="right" />
            <T col="aged" label="Aging Reports" className="right" />
            <th className="right">Hindcasting Reports</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((a) => (
            <tr key={a.name}>
              <td className="strong">{a.name}</td>
              <td className="right">{a.reports}</td>
              <td className="right">{fmt(a.fields)}</td>
              <td className="right">{a.completedReports}</td>
              <td className="right">{fmt(a.completedFields)}</td>
              <td className="right">{(a.completedFields / periodDays).toFixed(1)}</td>
              <td className="right">{a.aged}</td>
              <td className="right">{fmt(a.crop + a.fertilizer)}</td>
            </tr>
          ))}
        </tbody>
        {(() => {
          const n = sorted.length;
          if (n === 0) return null;
          const sum = (key: keyof typeof sorted[0]) => sorted.reduce((s, a) => s + (a[key] as number), 0);
          const avg = (key: keyof typeof sorted[0]) => (sum(key) / n);
          return (
            <tfoot>
              <tr className="totals-row">
                <td className="strong">Total / Avg</td>
                <td className="right">{sum('reports')}</td>
                <td className="right">{fmt(sum('fields'))}</td>
                <td className="right">{sum('completedReports')}</td>
                <td className="right">{fmt(sum('completedFields'))}</td>
                <td className="right">{(sum('completedFields') / (n * periodDays)).toFixed(1)}</td>
                <td className="right">{fmt(sum('aged'))}</td>
                <td className="right">{fmt(sum('crop') + sum('fertilizer'))}</td>
              </tr>
            </tfoot>
          );
        })()}
      </table>
    </div>
  );
}

const agingThresholdOptions = ['15+ days', '30+ days', '45+ days', '60+ days'];

function parseAgingDays(option: string) {
  return parseInt(option);
}

function DataIntegrity() {
  const notes = [
    '12 reports have stale field updates',
    '7 reports need print queue review',
    '4 field history imports pending',
  ];
  return (
    <PageFrame>
      <RiskPanel />
      <div className="table-box compact" style={{ marginTop: 16 }}>
        <div className="chart-title">Notes</div>
        {notes.map((note) => <p key={note} style={{ margin: '6px 0', fontSize: 13, color: '#358540' }}>{note}</p>)}
      </div>
    </PageFrame>
  );
}

function PostReportStageAgingTable() {
  const { sortKey, sortDir, handleSort, sortData } = useSortable('agingDays');
  const sorted = sortData(postReportStageDeals as unknown as Record<string, unknown>[]) as typeof postReportStageDeals;
  const T = ({ col, label, className }: { col: string; label: string; className?: string }) =>
    <Th col={col} label={label} sortKey={sortKey} sortDir={sortDir} onSort={handleSort} className={className} />;
  return (
    <div className="table-box post-stage-table">
      <div className="chart-title">DocuSign &amp; Awaiting First Payment Aging Matrix</div>
      <div className="chart-source">FactDeals, FactReports, DimOwner | Post-report workflow aging by current stage</div>
      <table>
        <thead>
          <tr>
            <T col="title" label="Report Title" />
            <T col="stage" label="Stage" />
            <T col="owner" label="Owner (Sales Rep / AL)" />
            <T col="dateEntered" label="Date Entered Stage" />
            <T col="agingDays" label="Aging Days in Current Stage" className="right" />
            <T col="fields" label="Total Fields" className="right" />
            <T col="reportStatus" label="Report Status" />
            <T col="print" label="Print Intervention" />
          </tr>
        </thead>
        <tbody>
          {sorted.map((deal) => (
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

function FutureOptions({ fd, navigate }: { fd: FilteredData; navigate: Navigate }) {
  const { filteredAnalysts, filteredReports, filteredNotPaid } = fd;
  const printInterventions = filteredReports.filter((r) => r.print === 'Required').length;
  const overCapacity = filteredAnalysts.filter((a) => a.utilization > 115).length;
  const withCapacity = filteredAnalysts.filter((a) => a.utilization < 85).length;
  const avgCompleteToNotPaid = filteredNotPaid.length > 0
    ? (filteredNotPaid.reduce((sum, r) => sum + r.daysSinceCompletion, 0) / filteredNotPaid.length).toFixed(1)
    : '—';

  return (
    <PageFrame>
      <SectionTitle>Executive Overview</SectionTitle>
      <div className="grid two">
        <KPI title="Print Interventions" value={printInterventions} subtitle="Manager action needed" tone="danger" onNavigate={() => navigate({ page: 'aging' })} />
        <KPI title="Over Capacity Analysts" value={overCapacity} subtitle="Above workload target" tone="warning" onNavigate={() => navigate({ page: 'workload' })} />
      </div>
      <PostReportStageAgingTable />
      <SectionTitle>Workload Distribution</SectionTitle>
      <div className="grid one">
        <KPI title="With Capacity" value={withCapacity} subtitle="Analysts under 85% utilization" onNavigate={() => navigate({ page: 'workload' })} />
      </div>
      <ChartBox title="Open History Volume by Analyst" source="FactCropHistory, FactFertilizerHistory | Open history entries by analyst" height={260}>
        <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
          <BarChart data={filteredAnalysts.map((a) => ({ name: a.name.split(' ')[0], crop: a.crop, fertilizer: a.fertilizer }))} margin={{ top: 5, right: 20, bottom: 45, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={green.border} />
            <XAxis dataKey="name" angle={-25} textAnchor="end" height={55} tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 10 }} />
            <Tooltip />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Bar dataKey="crop" fill={dataViz[0]} name="Crop History" />
            <Bar dataKey="fertilizer" fill={dataViz[1]} name="Fertilizer History" />
          </BarChart>
        </ResponsiveContainer>
      </ChartBox>
      <SectionTitle>Aging &amp; Escalations</SectionTitle>
      <div className="grid two">
        <KPI title="Reports Moved to Not Paid This Week" value={filteredNotPaid.length} subtitle="Report Complete to Not Paid" tone="warning" onNavigate={() => navigate({ page: 'aging' })} />
        <KPI title="Avg Time Between Complete and Not Paid" value={avgCompleteToNotPaid !== '—' ? `${avgCompleteToNotPaid} days` : '—'} subtitle="Completion to handoff" onNavigate={() => navigate({ page: 'aging' })} />
      </div>
      <ChartBox title="Not Paid Handoffs by Moved By User" source="FactReportStatusHistory, DimUser | Status transitions grouped by user moving report" height={260}>
          <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
            <BarChart data={notPaidAuditTrend} margin={{ top: 10, right: 20, bottom: 20, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={green.border} />
              <XAxis dataKey="week" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="maya" stackId="a" fill={dataViz[0]} name="Maya Grant" />
              <Bar dataKey="lena" stackId="a" fill={dataViz[1]} name="Lena Ortiz" />
              <Bar dataKey="owen" stackId="a" fill={dataViz[2]} name="Owen Price" />
            </BarChart>
          </ResponsiveContainer>
        </ChartBox>
      <NotPaidAuditTable data={filteredNotPaid} />
    </PageFrame>
  );
}

function App() {
  const [activePage, setActivePage] = React.useState<Page>('executive');
  const [analystFilter, setAnalystFilter] = React.useState<string[]>([]);
  const [statusFilter, setStatusFilter] = React.useState<string[]>([]);
  const [timeFrame, setTimeFrame] = React.useState('2026');
  const [agingThreshold, setAgingThreshold] = React.useState('15+ days');
  const agingDays = parseAgingDays(agingThreshold);

  const filteredAnalysts = analystFilter.length === 0
    ? analysts
    : analysts.filter((a) => analystFilter.includes(a.name));

  const filteredReports = reportDetails.filter((r) => {
    if (analystFilter.length > 0 && !analystFilter.includes(r.analyst)) return false;
    if (statusFilter.length > 0 && !statusFilter.includes(r.status)) return false;
    return true;
  });

  const filteredNotPaid = analystFilter.length === 0
    ? notPaidAuditActivity
    : notPaidAuditActivity.filter((r) => analystFilter.includes(r.assignedAnalyst));

  const filteredEntrySeries = analystFilter.length === 0
    ? analystEntrySeries
    : analystEntrySeries.filter((s) => analystFilter.includes(s.name));

  const fd: FilteredData = {
    filteredAnalysts,
    filteredReports,
    filteredNotPaid,
    agingDays,
    filteredEntrySeries,
    periodDays: getPeriodDays(timeFrame),
  };

  const navigate: Navigate = ({ page, analyst, status, agingThreshold: aging }) => {
    setActivePage(page);
    if (analyst !== undefined) setAnalystFilter(analyst ? [analyst] : []);
    if (status !== undefined) setStatusFilter(status ? [status] : []);
    if (aging !== undefined) setAgingThreshold(aging);
  };

  const statusOptions = ['Soils Complete / Analyst Queue', 'Analyst Team', 'Reports Complete'];

  const renderPage = () => {
    if (activePage === 'productivity') return <AnalystProductivity fd={fd} navigate={navigate} />;
    if (activePage === 'aging') return <AgingEscalations fd={fd} navigate={navigate} />;
    if (activePage === 'workload') return <WorkloadDistribution fd={fd} navigate={navigate} />;
    if (activePage === 'integrity') return <DataIntegrity />;
    if (activePage === 'future') return <FutureOptions fd={fd} navigate={navigate} />;
    return <ExecutiveOverview fd={fd} navigate={navigate} />;
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
          <TimeFrameSlicer value={timeFrame} onChange={setTimeFrame} />
          <Slicer title="Analyst" options={analysts.map((a) => a.name)} multiSelect value={analystFilter} onChange={setAnalystFilter} />
          <Slicer title="Stage" options={statusOptions} multiSelect value={statusFilter} onChange={setStatusFilter} />
          <Slicer title="Aging Threshold" options={agingThresholdOptions} value={agingThreshold} onChange={(v) => setAgingThreshold(v)} />
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
