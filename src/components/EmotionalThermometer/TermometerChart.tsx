import { useRef, useLayoutEffect } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
// FIXME: fix this eslint error
// eslint-disable-next-line @typescript-eslint/naming-convention
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
// FIXME: fix this eslint error
// eslint-disable-next-line @typescript-eslint/naming-convention
import am5locales_es_ES from '@amcharts/amcharts5/locales/es_ES';
import { type TermometerChartProps } from './interfaces';

const TermometerChart = ({ data }: TermometerChartProps) => {
  const chartRef = useRef(null);

  useLayoutEffect(() => {
    const root = am5.Root.new('chartdiv');

    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([am5themes_Animated.new(root)]);

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: false,
        wheelX: 'panX',
        wheelY: 'zoomX',
        paddingRight: 0,
        paddingLeft: 0,
      })
    );

    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    const xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        dateFormats: { day: 'dd-MM' },
        tooltipDateFormat: 'dd-MM-yyyy',
        baseInterval: { timeUnit: 'day', count: 1 },
        gridIntervals: [{ timeUnit: 'day', count: 1 }],
        renderer: am5xy.AxisRendererX.new(root, {}),
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    xAxis.get('renderer').labels.template.setAll({
      rotation: -56,
      centerY: am5.p50,
      fontSize: 12,
    });

    const yAxis = chart.yAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: 'category',
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    yAxis.get('renderer').labels.template.setAll({
      fontSize: 12,
    });

    yAxis.data.setAll([
      {
        category: 'Muy malo',
      },
      {
        category: 'Malo',
      },
      {
        category: 'Neutral',
      },
      {
        category: 'Bueno',
      },
      {
        category: 'Muy bueno',
      },
    ]);

    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    const series = chart.series.push(
      am5xy.LineSeries.new(root, {
        minBulletDistance: 10,
        xAxis,
        yAxis,
        valueXField: 'date',
        categoryYField: 'category',
        stroke: am5.color('#3C4AC5'),
        fill: am5.color('#3D4487'),
        tooltip: am5.Tooltip.new(root, {
          pointerOrientation: 'horizontal',
          labelText: '{category}',
        }),
      })
    );

    series.strokes.template.setAll({
      strokeWidth: 2,
    });

    series.data.setAll(data);

    series.bullets.push(() => {
      return am5.Bullet.new(root, {
        sprite: am5.Circle.new(root, {
          radius: 4,
          fill: series.get('fill'),
          stroke: root.interfaceColors.get('background'),
          strokeWidth: 1,
        }),
      });
    });

    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    const cursor = chart.set(
      'cursor',
      am5xy.XYCursor.new(root, {
        xAxis,
      })
    );
    cursor.lineY.set('visible', false);

    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    // FIXME: fix this eslint error
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    series.appear(1000, 100);
    // FIXME: fix this eslint error
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    chart.appear(1000, 100);

    const createRange = (
      value: string,
      endValue: string,
      label: string,
      color: am5.Color,
      dashed?: boolean
    ) => {
      const rangeDataItem = yAxis.makeDataItem({
        category: value,
        endCategory: endValue,
      });

      const range = yAxis.createAxisRange(rangeDataItem);

      if (endValue) {
        // FIXME: fix this ts error
        // @ts-expect-error ts-error(2532) object is possibly 'undefined'
        range.get('axisFill').setAll({
          fill: color,
          fillOpacity: 0.2,
          visible: true,
        });
      } else {
        // FIXME: fix this ts error
        // @ts-expect-error ts-error(2532) object is possibly 'undefined'
        range.get('grid').setAll({
          stroke: color,
          strokeOpacity: 1,
          strokeWidth: 2,
          location: 1,
        });

        if (dashed) {
          // FIXME: fix this ts error
          // @ts-expect-error ts-error(2532) object is possibly 'undefined'
          range.get('grid').set('strokeDasharray', [5, 3]);
        }
      }

      if (label) {
        // FIXME: fix this ts error
        // @ts-expect-error ts-error(2532) object is possibly 'undefined'
        range.get('label').setAll({
          text: label,
          location: 1,
          fontSize: 19,
          inside: true,
          centerX: am5.p0,
          centerY: am5.p100,
        });
      }
    };

    // FIXME: fix this ts error
    // @ts-expect-error ts-error(2345): Argument of type 'undefined' is not assignable to parameter of type 'string'
    createRange(undefined, 'Malo', undefined, am5.color('#E300001F'));

    root.locale = am5locales_es_ES;

    // FIXME: fix this ts error
    // @ts-expect-error ts-error(18048) 'root._logo' is possibly 'undefined'
    root._logo.dispose();
    // FIXME: fix this ts error
    // @ts-expect-error ts-error(2322) Type 'Root' is not assignable to type 'null'
    chartRef.current = root;

    return () => {
      root.dispose();
    };
  }, [data]);

  return <div id='chartdiv' style={{ width: '100%', height: '300px' }} />;
};

export default TermometerChart;
