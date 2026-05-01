import MedicalStatsChartSection from '../components/charts/MedicalStatsChartSection';
import MedicalStatsTableSection from '../components/tables/MedicalStatsTableSection';

const DashboardHome = () => {
    return (
        <div className="bg-gray-50 min-h-full">
            <MedicalStatsChartSection />
            <MedicalStatsTableSection />
        </div>
    );
};

export default DashboardHome;
