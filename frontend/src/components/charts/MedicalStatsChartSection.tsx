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

    if (isLoading) return <div>Loading..</div>;
    if (isError) return <div>Error</div>;

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
        <>
            <div>
                <button onClick={() => handleYear(2023)}>2023</button>
                <button onClick={() => handleYear(2024)}>2024</button>
            </div>
            <PatientPerChart data={data} />
            <div>
                <button onClick={() => moveNextPage(false)} disabled={page <= 1}>
                    prev
                </button>
                <button onClick={() => moveNextPage(true)} disabled={page >= maxPage}>
                    next
                </button>
            </div>
        </>
    );
};

export default MedicalStatsChartSection;
