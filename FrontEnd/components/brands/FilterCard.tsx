import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

interface FilterCardProps {
  search: string;
  setSearch: (v: string) => void;
  onFilter: () => void;
  onReset: () => void;
}

export function FilterCard({ search, setSearch, onFilter, onReset }: FilterCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Filter Brands</CardTitle>
          <Link href="brand/add">
            <Button variant="default" className="mt-4">+ Add New Brand</Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-4 items-end">
        <Input
          placeholder="Search by name..."
          className="max-w-xs"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <Button variant="outline" onClick={onFilter}>Apply Filter</Button>
        <Button variant="ghost" onClick={onReset}>Reset</Button>
      </CardContent>
    </Card>
  );
}
