import { useMemo, useState } from "react";
import { INVOICE_FOLDERS } from "../constants";
import type { TInvoiceFilter } from "../interfaces";

export const useInvoiceFolders = () => {
  const [filter, setFilter] = useState<TInvoiceFilter>("all");

  const folders = useMemo(
    () =>
      filter === "all"
        ? INVOICE_FOLDERS
        : INVOICE_FOLDERS.filter((folder) => folder.status === filter),
    [filter],
  );

  return { folders, filter, setFilter };
};
