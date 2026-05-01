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
            labels: {
                usePointStyle: true,
                padding: 20,
                font: {
                    size: 13,
                    weight: 500,
                },
                color: '#374151', // gray-700
            },
        },
        title: {
            display: true,
            text: '진료과목별 환자수 대비 입내원일수',
            font: {
                size: 16,
                weight: 'bold' as const,
            },
            color: '#1f2937', // gray-800
            padding: {
                top: 10,
                bottom: 20,
            },
        },
        tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleColor: '#fff',
            bodyColor: '#fff',
            padding: 12,
            borderColor: 'rgba(255, 255, 255, 0.2)',
            borderWidth: 1,
            titleFont: {
                size: 13,
                weight: 'bold' as const,
            },
            bodyFont: {
                size: 12,
            },
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
                display: true,
                text: '진료과목(표시과목)',
                font: {
                    size: 13,
                    weight: 'bold' as const,
                },
                color: '#374151', // gray-700
                padding: { top: 10 },
            },
            ticks: {
                maxRotation: 45,
                minRotation: 45,
                color: '#6b7280', // gray-500
                font: {
                    size: 11,
                },
            },
            grid: {
                color: 'rgba(229, 231, 235, 0.5)', // gray-200
                drawBorder: false,
            },
        },
        'y-left': {
            type: 'linear' as const,
            position: 'left' as const,
            title: {
                display: true,
                text: '환자수',
                font: {
                    size: 13,
                    weight: 'bold' as const,
                },
                color: 'rgb(59, 130, 246)',
            },
            ticks: {
                callback: function (value: any) {
                    return value.toLocaleString();
                },
                count: 6,
                color: '#6b7280', // gray-500
                font: {
                    size: 11,
                },
            },
            grid: {
                color: 'rgba(229, 231, 235, 0.5)', // gray-200
                drawBorder: false,
            },
        },
        'y-right': {
            type: 'linear' as const,
            position: 'right' as const,
            title: {
                display: true,
                text: '입내원일수',
                font: {
                    size: 13,
                    weight: 'bold' as const,
                },
                color: 'rgb(239, 68, 68)',
            },
            grid: {
                drawOnChartArea: false,
            },
            ticks: {
                callback: function (value: any) {
                    return value.toLocaleString();
                },
                count: 6,
                color: '#6b7280', // gray-500
                font: {
                    size: 11,
                },
            },
        },
    },
};

export default options;
