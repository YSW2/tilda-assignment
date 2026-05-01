import type { MedicalStats } from '../../type/medicalStats';
import options from './options';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface Param {
    data: MedicalStats[];
}

const PatientPerChart = ({ data }: Param) => {
    const labels = data.map((item) => item['진료과목(표시과목)']);
    const patientData = data.map((item) => item.환자수);
    const visitDayData = data.map((item) => item.입내원일수);

    const chartData = {
        labels,
        datasets: [
            {
                label: '환자수',
                data: patientData,
                borderColor: 'rgb(59, 130, 246)', // Blue-500
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                pointBackgroundColor: 'rgb(59, 130, 246)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(59, 130, 246)',
                borderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6,
                yAxisID: 'y-left',
                tension: 0.3,
            },
            {
                label: '입내원일수',
                data: visitDayData,
                borderColor: 'rgb(239, 68, 68)', // Red-500
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                pointBackgroundColor: 'rgb(239, 68, 68)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(239, 68, 68)',
                borderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6,
                yAxisID: 'y-right',
                tension: 0.3,
            },
        ],
    };

    return (
        <div className="w-full">
            <div className="h-[500px]">
                <Line data={chartData} options={options} />
            </div>
        </div>
    );
};

export default PatientPerChart;
