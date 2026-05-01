import MedicalStatsChartSection from '../components/charts/MedicalStatsChartSection';
import MedicalStatsTableSection from '../components/tables/MedicalStatsTableSection';

const DashboardHome = () => {
    return (
        <div>
            <MedicalStatsChartSection />
            <MedicalStatsTableSection />
        </div>
    );
};

export default DashboardHome;
