import type { IInvoiceAlerts, IInvoiceFolder } from "../interfaces";

export const getInvoiceAlerts = (folders: IInvoiceFolder[]): IInvoiceAlerts =>
  folders
    .flatMap((folder) => folder.invoices)
    .reduce<IInvoiceAlerts>(
      (alerts, invoice) => ({
        overdue: alerts.overdue + (invoice.status === "overdue" ? 1 : 0),
        pending: alerts.pending + (invoice.status === "pending" ? 1 : 0),
      }),
      { overdue: 0, pending: 0 },
    );
