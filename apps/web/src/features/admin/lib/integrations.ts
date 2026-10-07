import { Calculator, CalendarCheck, Cloud, HardHat, House, Wrench } from "@electrical-hero/core/icons";

/** Icon type from the shared icon set (a direct lucide-react import can resolve to a second copy). */
type Icon = typeof Wrench;

export type IntegrationId = "servicetitan" | "jobber" | "housecall-pro" | "procore" | "salesforce" | "quickbooks";

export type Integration = {
  id: IntegrationId;
  name: string;
  category: string;
  icon: Icon;
  /** What a real connection would bring into Electrical Hero. */
  syncs: string[];
};

/** Typical contractor software. Connections are simulated on the admin page; nothing calls these vendors. */
export const INTEGRATIONS: Integration[] = [
  {
    id: "servicetitan",
    name: "ServiceTitan",
    category: "Field service management",
    icon: Wrench,
    syncs: ["Customer sites → accounts", "Technicians → trainees", "Work orders → scenario ideas"],
  },
  {
    id: "jobber",
    name: "Jobber",
    category: "Client management & scheduling",
    icon: CalendarCheck,
    syncs: ["Clients & properties → accounts", "Team members → trainees"],
  },
  {
    id: "housecall-pro",
    name: "Housecall Pro",
    category: "Field service management",
    icon: House,
    syncs: ["Customers → accounts", "Employees → trainees", "Job history → scenario ideas"],
  },
  {
    id: "procore",
    name: "Procore",
    category: "Construction project management",
    icon: HardHat,
    syncs: ["Projects → accounts", "Drawings & specs → site files"],
  },
  {
    id: "salesforce",
    name: "Salesforce",
    category: "CRM",
    icon: Cloud,
    syncs: ["Accounts & sites → accounts", "Contacts → site contacts"],
  },
  {
    id: "quickbooks",
    name: "QuickBooks Online",
    category: "Customers & billing",
    icon: Calculator,
    syncs: ["Customers → accounts"],
  },
];

/** TradesQuest's future API host. It isn't live yet, so the admin page never sends requests there. */
export const TRADESQUEST_BASE_URL = "https://stonebyte.bid";

/** Shows only the last four characters, e.g. "••••••••3f9a". */
export const maskKey = (key: string): string => (key.length <= 4 ? "••••" : `${"•".repeat(8)}${key.slice(-4)}`);

/** A loose sanity check until TradesQuest publishes its key format. */
export const isPlausibleKey = (key: string): boolean => /^\S{16,}$/.test(key.trim());
