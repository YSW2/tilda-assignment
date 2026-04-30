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
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                yAxisID: 'y-left',
                tension: 0.1,
            },
            {
                label: '입내원일수',
                data: visitDayData,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                yAxisID: 'y-right',
                tension: 0.1,
            },
        ],
    };

    return (
        <div style={{ width: '100%', padding: '0px' }}>
            <div style={{ height: '400px' }}>
                <Line data={chartData} options={options} />
            </div>
        </div>
    );
};

export default PatientPerChart;
