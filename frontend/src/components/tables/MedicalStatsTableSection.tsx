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

    if (isLoading)
        return (
            <div className="flex items-center justify-center p-12">
                <div className="text-lg text-gray-500">데이터를 불러오는 중...</div>
            </div>
        );
    if (isError)
        return (
            <div className="flex items-center justify-center p-12">
                <div className="text-lg text-red-500">데이터를 불러오는데 실패했습니다.</div>
            </div>
        );

    return (
        <div className="p-6">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    의료기관 진료비 통계 테이블
                </h2>
                <p className="text-sm text-gray-500">
                    총 {totalCount.toLocaleString()}개의 데이터 | 페이지당 100개 표시
                </p>
            </div>
            <div className="bg-white rounded-lg shadow-md border border-gray-200">
                <div className="p-4 border-b border-gray-200">
                    <TablePagination table={table} count={totalCount} />
                </div>
                <div className="overflow-x-auto">
                    <MedicalStatsTable table={table} />
                </div>
                <div className="p-4 border-t border-gray-200 bg-gray-50">
                    <TablePagination table={table} count={totalCount} />
                </div>
            </div>
        </div>
    );
};

export default MedicalStatsTableSection;
