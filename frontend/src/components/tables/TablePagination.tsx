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
        <>
            <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                이전
            </button>

            <span>
                {currentPage} / {totalPages}
            </span>

            <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                다음
            </button>

            <span>
                총 {totalRows.toLocaleString()}개 중 {startRow}-{endRow} 표시
            </span>
        </>
    );
};

export default TablePagination;
