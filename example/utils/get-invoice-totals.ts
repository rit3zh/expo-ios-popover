import type { IInvoiceItem } from "../interfaces";

export const getInvoiceTotals = (invoices: IInvoiceItem[]) =>
  invoices.reduce(
    (totals, invoice) => ({
      total: totals.total + invoice.amount,
      outstanding:
        invoice.status === "paid"
          ? totals.outstanding
          : totals.outstanding + invoice.amount,
    }),
    { total: 0, outstanding: 0 },
  );
