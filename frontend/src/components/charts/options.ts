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

export default options;
