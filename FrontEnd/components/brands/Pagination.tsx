import React from "react";
import { Button } from "@/components/ui/button";

interface PaginationProps {
  page: number;
  pageSize: number;
  total: number;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
}

export function Pagination({ page, pageSize, total, setPage, setPageSize }: PaginationProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center mt-4 gap-2">
      <div className="text-sm text-muted-foreground">Page {page} of {Math.ceil(total / pageSize)}</div>
      <div className="flex gap-2 items-center">
        <Button size="sm" variant="outline" disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</Button>
        <Button size="sm" variant="outline" disabled={page * pageSize >= total} onClick={() => setPage(page + 1)}>Next</Button>
        <label htmlFor="pageSize" className="sr-only">Rows per page</label>
        <select
          id="pageSize"
          className="border rounded px-2 py-1 text-sm"
          value={pageSize}
          onChange={e => { setPageSize(Number(e.target.value)); setPage(1); }}
        >
          {[5, 10, 20, 50].map(size => (
            <option key={size} value={size}>{size} / page</option>
          ))}
        </select>
      </div>
    </div>
  );
}
