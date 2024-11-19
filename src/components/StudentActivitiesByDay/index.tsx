import React, { useEffect, useRef } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themesAnimated from '@amcharts/amcharts5/themes/Animated';

export interface ActivityData {
  date: string;
  activities: number;
}

interface StudentActivitiesByDayProps {
  data: ActivityData[];
}

const StudentActivitiesByDay: React.FC<StudentActivitiesByDayProps> = ({
  data,
}) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<am5.Root | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Crear una nueva instancia de root
    const root = am5.Root.new(chartRef.current);
    rootRef.current = root;
    root.interfaceColors.set('background', am5.color(0xffffff)); // Establecer el fondo a blanco
    root._logo?.dispose();

    // Configurar el tema
    root.setThemes([am5themesAnimated.new(root)]);

    // Crear el contenedor del gráfico
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: 'panX',
        wheelY: 'zoomX',
        pinchZoomX: true,
      })
    );

    // Configurar los ejes
    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: 'date',
        renderer: am5xy.AxisRendererX.new(root, {}),
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    // Configurar la serie
    const series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: 'Actividades',
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: 'activities',
        categoryXField: 'date',
        tooltip: am5.Tooltip.new(root, {
          labelText: '{valueY}',
        }),
      })
    );

    series.columns.template.setAll({
      tooltipText: '{categoryX}: {valueY}',
      width: am5.percent(50),
      fillOpacity: 0.8,
    });

    // Pasar datos al gráfico
    xAxis.data.setAll(data);
    series.data.setAll(data);

    // Aparecer el gráfico con animación y manejar la promesa
    chart
      .appear(1000, 100)
      .then(() => {
        console.log('Chart animation completed');
      })
      .catch((error) => {
        console.error('Error during chart animation:', error);
      });

    return () => {
      // Limpiar la instancia de root al desmontar el componente
      if (rootRef.current) {
        rootRef.current.dispose();
        rootRef.current = null;
      }
    };
  }, [data]);

  return <div ref={chartRef} style={{ width: '100%', height: '200px' }} />;
};

export default StudentActivitiesByDay;
