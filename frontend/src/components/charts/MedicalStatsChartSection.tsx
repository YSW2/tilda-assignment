import { useState } from 'react';
import useMedicalStats from '../../hook/useMedicalStats';
import PatientPerChart from './PatientPerDayChart';

const MedicalStatsChartSection = () => {
    const [year, setYear] = useState(2023);
    const [page, setPage] = useState(1);

    const perPage = 10;

    const { data, totalCount, isLoading, isError } = useMedicalStats({
        page: page,
        perPage: perPage,
        year: year,
    });

    const maxPage = Math.ceil(totalCount / perPage);

    if (isLoading)
        return (
            <div className="flex items-center justify-center p-12">
                <div className="text-lg text-gray-500">차트를 불러오는 중...</div>
            </div>
        );
    if (isError)
        return (
            <div className="flex items-center justify-center p-12">
                <div className="text-lg text-red-500">차트를 불러오는데 실패했습니다.</div>
            </div>
        );

    const handleYear = (year: number) => {
        setYear(year);
        setPage((prev) => Math.min(prev, maxPage)); //연도 변경 시 maxPage 벗어나는 경우 방지
    };

    const moveNextPage = (isNext: boolean) => {
        if (isNext) {
            setPage((prev) => prev + 1);
        } else {
            setPage((prev) => prev - 1);
        }
    };

    return (
        <div className="p-6">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    환자수 대비 입내원일수 차트
                </h2>
                <p className="text-sm text-gray-500">진료과목별 환자수와 입내원일수 비교 분석</p>
            </div>
            <div className="bg-white rounded-lg shadow-md border border-gray-200">
                <div className="p-4 border-b border-gray-200 flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => handleYear(2023)}
                            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                                year === 2023
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                            }`}
                        >
                            2023년
                        </button>
                        <button
                            onClick={() => handleYear(2024)}
                            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                                year === 2024
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                            }`}
                        >
                            2024년
                        </button>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => moveNextPage(false)}
                            disabled={page <= 1}
                            className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white transition-colors"
                        >
                            이전
                        </button>
                        <span className="px-4 py-1.5 text-sm font-medium text-gray-700 bg-gray-50 border border-gray-300 rounded-md">
                            {page} / {maxPage}
                        </span>
                        <button
                            onClick={() => moveNextPage(true)}
                            disabled={page >= maxPage}
                            className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white transition-colors"
                        >
                            다음
                        </button>
                    </div>
                </div>
                <div className="p-6">
                    <PatientPerChart data={data} />
                </div>
                <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>
                            현재 <span className="font-semibold text-gray-800">{year}년</span>{' '}
                            데이터 표시 중
                        </span>
                        <span>
                            총 <span className="font-semibold text-gray-800">{totalCount}</span>개
                            데이터 중{' '}
                            <span className="font-semibold text-gray-800">
                                {(page - 1) * perPage + 1}-{Math.min(page * perPage, totalCount)}
                            </span>{' '}
                            표시
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MedicalStatsChartSection;
