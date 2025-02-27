import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table"
import { Button } from "./button"
import { cn } from "../../lib/utils"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  })

  return (
    <div className="rounded-md border border-zinc-700">
        <Table>
            <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="border-zinc-700">
                {headerGroup.headers.map((header) => {
                    return (
                    <TableHead key={header.id}>
                        {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                            )}
                    </TableHead>
                    )
                })}
                </TableRow>
            ))}
            </TableHeader>
            <TableBody>
            {table.getRowModel().rows?.length ? (
                table.getPaginationRowModel().rows.map((row) => (
                <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="border-0"
                >
                    {row.getVisibleCells().map((cell) => (
                    <TableCell width={cell.column.getSize()} key={cell.id} className={cn("text-white", `${cell.column.getSize}px`)}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                    ))}
                </TableRow>
                ))
            ) : (
                <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                </TableCell>
                </TableRow>
            )}
            </TableBody>
        </Table>
        <div className="flex gap-2 items-center py-2 px-4 border-t-1 border-zinc-700 w-full">
            <h1 className="text-white">{table.getState().pagination.pageIndex + 1} of {table.getPageCount()}</h1>
            <Button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} className="btn btn-primary">{"<"}</Button>
            <Button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} className="btn btn-primary">{">"}</Button>
        </div>
    </div>
  )
}
