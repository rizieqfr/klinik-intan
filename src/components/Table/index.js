import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
  } from '@tanstack/react-table'
  import { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import DataTablePagination from './DataTablePagination'
import { TableCell, TableRow } from '../ui/table'
  
  export default function Table({ data, columns }) {
  
    const [sorting, setSorting] = useState([])
    const [filtering, setFiltering] = useState('')
  
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
          sorting: sorting,
          globalFilter: filtering,
        },
        onSortingChange: setSorting,
        onGlobalFilterChange: setFiltering,
    })
  
    return (
      <div className=''>
        <div className='flex items-center justify-start w-[50%] gap-3 bg-white shadow py-[10px] rounded-lg my-4 border-2'>
            <FiSearch className='text-black text-xl ml-5'/>
            <input onChange={e => setFiltering(e.target.value)} value={filtering} type="text" className='outline-none w-full mr-3 text-[14px]' placeholder='Search ...' />
        </div>
        <table className='w-full mb-3'>
          <thead className=''>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className='text-start pb-3 px-3 border-b border-black'
                  >
                    {header.isPlaceholder ? null : (
                      <div>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
  
          <tbody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <tr key={row.id} className=''>
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className='py-2 px-3  border-b  border-slate-600'>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center text-black">
                  Tidak ada hasil
                </TableCell>
              </TableRow>
            )}
          </tbody>
        </table>
        <DataTablePagination table={table} />

      </div>
    )
  }