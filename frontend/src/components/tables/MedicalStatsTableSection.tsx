import columns from './columns';
import useMedicalStats from '../../hook/useMedicalStats';
import MedicalStatsTable from './MedicalStatsTable';
import TablePagination from './TablePagination';
import {
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { useMemo } from 'react';

const MedicalStatsTableSection = () => {
    const perPage = 5000;

    const {
        data: data2023,
        isLoading: isLoading2023,
        isError: isError2023,
        totalCount: totalCount2023,
    } = useMedicalStats({
        page: 1,
        perPage: perPage,
        year: 2023,
    });

    const {
        data: data2024,
        isLoading: isLoading2024,
        isError: isError2024,
        totalCount: totalCount2024,
    } = useMedicalStats({
        page: 1,
        perPage: perPage,
        year: 2024,
    });

    const isLoading = isLoading2023 || isLoading2024;
    const isError = isError2023 || isError2024;
    const totalCount = totalCount2023 + totalCount2024;

    const combinedData = useMemo(
        () => [...(data2023 || []), ...(data2024 || [])],
        [data2023, data2024],
    );

    const table = useReactTable({
        data: combinedData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(), // 정렬 기능
        getFilteredRowModel: getFilteredRowModel(), // 필터링 기능
        getPaginationRowModel: getPaginationRowModel(), // 페이지네이션
        initialState: {
            pagination: {
                pageSize: 100,
            },
        },
    });

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error</div>;

    return (
        <div>
            <TablePagination table={table} count={totalCount} />
            <MedicalStatsTable table={table} />
        </div>
    );
};

export default MedicalStatsTableSection;
