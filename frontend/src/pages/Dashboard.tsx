import MedicalStatsChartSection from '../components/charts/MedicalStatsChartSection';
import MedicalStatsTableSection from '../components/tables/MedicalStatsTableSection';

const Dashboard = () => {
    return (
        <div>
            <MedicalStatsChartSection />
            <MedicalStatsTableSection />
        </div>
    );
};

export default Dashboard;
