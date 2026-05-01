import { flexRender, type Table } from '@tanstack/react-table';
import type { MedicalStats } from '../../type/medicalStats';

interface Param {
    table: Table<MedicalStats>;
}

const MedicalStatsTable = ({ table }: Param) => {
    // 숫자 컬럼 리스트
    const numericColumns = [
        '명세서청구건수',
        '보험자부담금',
        '요양급여비용총액',
        '환자수',
        '입내원일수',
    ];

    return (
        <div className="overflow-x-auto">
            <table className="w-full border-collapse">
                <thead className="bg-gray-100 sticky top-0 z-10">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                const headerText = header.column.columnDef.header as string;
                                const isNumeric = numericColumns.includes(headerText);
                                return (
                                    <th
                                        key={header.id}
                                        className={`px-4 py-3 border-b-2 border-gray-300 ${
                                            isNumeric ? 'text-right' : 'text-left'
                                        } text-sm font-semibold text-gray-700 whitespace-nowrap bg-gray-100`}
                                    >
                                        {/* 정렬 버튼 */}
                                        <div
                                            onClick={header.column.getToggleSortingHandler()}
                                            className="cursor-pointer select-none hover:text-gray-900 flex items-center gap-1 justify-between"
                                        >
                                            <span>
                                                {flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext(),
                                                )}
                                            </span>
                                            {/* 정렬 표시 */}
                                            <span className="text-gray-500">
                                                {
                                                    {
                                                        asc: '↑',
                                                        desc: '↓',
                                                    }[header.column.getIsSorted() as string]
                                                }
                                                {!header.column.getIsSorted() && (
                                                    <span className="opacity-30">↕</span>
                                                )}
                                            </span>
                                        </div>
                                    </th>
                                );
                            })}
                        </tr>
                    ))}
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {table.getRowModel().rows.map((row, rowIndex) => (
                        <tr
                            key={row.id}
                            className={`hover:bg-blue-50 transition-colors ${
                                rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                            }`}
                        >
                            {row.getVisibleCells().map((cell) => {
                                const headerText = cell.column.columnDef.header as string;
                                const isNumeric = numericColumns.includes(headerText);
                                return (
                                    <td
                                        key={cell.id}
                                        className={`px-4 py-3 text-sm text-gray-800 whitespace-nowrap ${
                                            isNumeric ? 'text-right font-medium' : 'text-left'
                                        }`}
                                    >
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MedicalStatsTable;
