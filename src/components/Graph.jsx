import React, { useState } from 'react';
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import { colorsArray } from '../utils';
import { GraphTooltip } from './GraphTooltip';

export const Graph = ({ apiResponse, type }) => {
  const { innerWidth: width, innerHeight: height } = window;
  const [opacity, setOpacity] = useState({});
  const zeroLegendMap = apiResponse.stocksKeys.reduce((acArr, element) => ({ ...acArr, [element]: 0 }), {});

  const handleMouseEnter = (o) => {
    const { dataKey } = o;
    const obje = apiResponse.stocksMap;
    Object.keys(obje).forEach((v) => (obje[v] = 0.1));
    setOpacity({ ...obje, [dataKey]: 1 });
  };

  const handleMouseLeave = (o) => {
    const { dataKey } = o;
    const obje = apiResponse.stocksMap;
    Object.keys(obje).forEach((v) => (obje[v] = 0));
    setOpacity({ ...obje, [dataKey]: 0 });
  };

  const finalResponse = apiResponse.data.map((el) => ({
    createdAt: el.createdAt,
    ...zeroLegendMap,
    ...(type === '1' ? el.oiMap : el.priceMap),
  }));

  const sortedLegend = apiResponse.stocksKeys.sort(function (a, b) {
    return apiResponse.stocksMap[b] - apiResponse.stocksMap[a];
  });

  // const deviceLimit = width < 400 ? 10 : 20;
  const limitedData = sortedLegend
  // .slice(0, deviceLimit);

  return (
    <LineChart
      width={width}
      height={height - 100}
      data={finalResponse}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray='3 3' />
      <XAxis dataKey='createdAt' />
      <YAxis width={20} domain={type === '1' ? [0, 'auto'] : [-5, 'auto']}  />
      <Tooltip content={<GraphTooltip />} />
      <Legend
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        payload={limitedData.map((el, i) => ({
          value: el,
          type: 'line',
          color: colorsArray[i % 16],
          dataKey: el,
        }))}
      />
      {sortedLegend.map((name, i) => (
        <Line
          type='monotone'
          key={i}
          dataKey={name}
          dot={false}
          label={name}
          strokeWidth={(opacity[name] === 1 ? 4 : 1) || 1}
          strokeOpacity={opacity[name] || 1}
          stroke={colorsArray[i % 16]}
        />
      ))}
    </LineChart>
  );
};
