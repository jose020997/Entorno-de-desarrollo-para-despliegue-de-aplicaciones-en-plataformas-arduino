import React, { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LinearScale, PointElement, LineElement, Tooltip, Legend, TimeScale, Filler } from 'chart.js';
import 'chartjs-adapter-date-fns';

// Registrar componentes de Chart.js
ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend, TimeScale, Filler);


export default function LineChart({ datos, color, color3}) {
  // Determina si los datos de X son fechas o números
  const isTimeScale = datos.every(d => d.x instanceof Date);

  const options = {
    responsive: true,
    scales: {
      x: {
        type: isTimeScale ? 'time' : 'linear',
        time: isTimeScale ? {
          unit: 'day',
          tooltipFormat: 'PPP',
        } : undefined,
        position: 'bottom',
        title: {
          display: true,
          text: isTimeScale ? 'Fechas' : 'Valores en el eje X',
        },
      },
      y: {
        suggestedMin: 0,
        suggestedMax: Math.max(...datos.map(d => d.y)) + 10,
        title: {
          display: true,
          text: 'Valores en el eje Y',
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const chartData = useMemo(() => ({
    datasets: [{
      label: 'Datos',
      data: datos,
      tension: 0.4,
      borderColor: color || '#3b82f6', // Color de la línea
      pointRadius: 6,
      pointBackgroundColor: color || '#3b82f6', // Color de los puntos
      pointBorderColor: 'rgba(255, 255, 255, 0.7)', // Color del borde de los puntos
      backgroundColor: color3 ||'#B7D4F1', // Color de fondo con opacidad
      fill: true, // Esto debe estar en true para el relleno
    }],
  }), [datos, color]);

  return <Line options={options} data={chartData} />;
}
