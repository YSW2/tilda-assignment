import type { MedicalStats } from '../../type/medicalStats';
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

const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
        mode: 'index' as const,
        intersect: false,
    },
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: '진료과목별 환자수 대비 입내원일수',
        },
        tooltip: {
            callbacks: {
                label: function (context: any) {
                    let label = context.dataset.label || '';
                    if (label) {
                        label += ': ';
                    }
                    label += context.parsed.y.toLocaleString();
                    return label;
                },
            },
        },
    },
    scales: {
        x: {
            title: {
                display: false,
                text: '진료과목(표시과목)',
            },
            ticks: {
                maxRotation: 45,
                minRotation: 45,
            },
        },
        'y-left': {
            type: 'linear' as const,
            position: 'left' as const,
            title: {
                display: true,
                text: '환자수',
            },
            ticks: {
                callback: function (value: any) {
                    return value.toLocaleString();
                },
            },
        },
        'y-right': {
            type: 'linear' as const,
            position: 'right' as const,
            title: {
                display: true,
                text: '입내원일수',
            },
            grid: {
                drawOnChartArea: false,
            },
            ticks: {
                callback: function (value: any) {
                    return value.toLocaleString();
                },
            },
        },
    },
};

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
