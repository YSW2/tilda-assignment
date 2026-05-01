import type { Table } from '@tanstack/react-table';
import type { MedicalStats } from '../../type/medicalStats';

interface Param {
    table: Table<MedicalStats>;
    count: number;
}

const TablePagination = ({ table, count }: Param) => {
    const currentPage = table.getState().pagination.pageIndex + 1;
    const totalPages = table.getPageCount();
    const pageSize = table.getState().pagination.pageSize;
    const totalRows = count;
    const startRow = table.getState().pagination.pageIndex * pageSize + 1;
    const endRow = Math.min(startRow + pageSize - 1, totalRows);
    return (
        <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-2">
                <button
                    onClick={() => table.setPageIndex(0)}
                    disabled={!table.getCanPreviousPage()}
                    className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white transition-colors"
                >
                    처음
                </button>
                <button
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                    className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white transition-colors"
                >
                    이전
                </button>

                <span className="px-4 py-1.5 text-sm font-medium text-gray-700 bg-gray-50 border border-gray-300 rounded-md">
                    {currentPage} / {totalPages}
                </span>

                <button
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                    className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white transition-colors"
                >
                    다음
                </button>
                <button
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    disabled={!table.getCanNextPage()}
                    className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white transition-colors"
                >
                    마지막
                </button>
            </div>

            <span className="text-sm text-gray-600">
                총 <span className="font-semibold text-gray-800">{totalRows.toLocaleString()}</span>개
                중{' '}
                <span className="font-semibold text-gray-800">
                    {startRow.toLocaleString()}-{endRow.toLocaleString()}
                </span>{' '}
                표시
            </span>
        </div>
    );
};

export default TablePagination;
