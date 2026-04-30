import { useState } from 'react';
import PatientPerChart from '../components/charts/PatientPerDayChart';
import useMedicalStats from '../hook/useMedicalStats';

const Dashboard = () => {
    const [year, setYear] = useState(2023);
    const [page, setPage] = useState(1);

    const { data, isLoading, isError } = useMedicalStats({ page: page, perPage: 10, year: year });

    if (isLoading) return <div>Loading..</div>;
    if (isError) return <div>Error</div>;

    const handleYear = (year: number) => {
        setYear(year);
    };

    const moveNextPage = (isNext: boolean) => {
        if (isNext) {
            setPage((prev) => prev + 1);
        } else {
            setPage((prev) => prev - 1);
        }
    };

    return (
        <div>
            <div>
                <div>
                    <button onClick={() => handleYear(2023)}>2023</button>
                    <button onClick={() => handleYear(2024)}>2024</button>
                </div>
                <PatientPerChart data={data} />
                <div>
                    <button onClick={() => moveNextPage(false)} disabled={page === 1}>
                        prev
                    </button>
                    <button onClick={() => moveNextPage(true)} disabled={page === 10}>
                        next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
