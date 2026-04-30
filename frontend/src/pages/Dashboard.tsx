import PatientPerChart from '../components/charts/PatientPerDayChart';
import useMedicalStats from '../hook/useMedicalStats';

const Dashboard = () => {
    const { data, isLoading, isError } = useMedicalStats({ page: 1, perPage: 10 });

    if (isLoading) return <div>Loading..</div>;
    if (isError) return <div>Error</div>;

    return (
        <div>
            <PatientPerChart data={data} />
        </div>
    );
};

export default Dashboard;
