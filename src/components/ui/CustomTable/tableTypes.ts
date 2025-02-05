import { ColumnDef } from "@tanstack/react-table";

export interface TableProps<T> {
  data: T[];
  columns: ColumnDef<T, string>[];
  isLoading?: boolean;
  error?: string | null | undefined;
  currentPage: number;
  totalCount?: number;
  pageSize: number;
  onPageChange?: (newPage: number) => void;
}