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
        <div className='flex items-center justify-start w-[500px] gap-3 bg-white py-[10px] rounded-lg mb-4'>
            <FiSearch className='text-black text-xl ml-5'/>
            <input onChange={e => setFiltering(e.target.value)} value={filtering} type="text" className='outline-none w-full mr-3 text-[14px]' placeholder='Search Pasien...' />
        </div>
        <table className='w-full border'>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className='text-start pb-3'
                  >
                    {header.isPlaceholder ? null : (
                      <div>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {
                          { asc: '🔼', desc: '🔽' }[
                            header.column.getIsSorted() ?? null
                          ]
                        }
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
  
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className='pb-4'>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          {/* <tfoot>
            {table.getFooterGroups().map(footerGroup => (
              <tr key={footerGroup.id}>
                {footerGroup.headers.map(header => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </tfoot> */}
        </table>
        <div>
          <button onClick={() => table.setPageIndex(0)}>First page</button>
          <button
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
          >
            Previous page
          </button>
          <button
            disabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
          >
            Next page
          </button>
          <button onClick={() => table.setPageIndex(table.getPageCount() - 1)}>
            Last page
          </button>
        </div>
      </div>
    )
  }