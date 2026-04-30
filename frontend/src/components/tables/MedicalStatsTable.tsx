import { flexRender, type Table } from '@tanstack/react-table';
import type { MedicalStats } from '../../type/medicalStats';

interface Param {
    table: Table<MedicalStats>;
}

const MedicalStatsTable = ({ table }: Param) => {
    return (
        <>
            <table>
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th key={header.id}>
                                    {/* 정렬 버튼 */}
                                    <div onClick={header.column.getToggleSortingHandler()}>
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext(),
                                        )}
                                        {/* 정렬 표시 */}
                                        {{ asc: ' ↑', desc: ' ↓' }[
                                            header.column.getIsSorted() as string
                                        ] ?? null}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default MedicalStatsTable;
