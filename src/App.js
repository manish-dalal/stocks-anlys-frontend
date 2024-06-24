import { LineChart, CartesianGrid, XAxis, Legend, YAxis, Line } from 'recharts';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './App.css';
import { getDaysArray, fetchData, colorsArray } from './utils';
import { useCallback, useEffect, useState } from 'react';

const App = () => {
  const { innerWidth: width, innerHeight: height } = window;
  const daysList = getDaysArray(10);
  const [loading, setloading] = useState(false);
  const [date, setdate] = useState(daysList[0]);
  const [type, setType] = useState('1');
  const [apiResponse, setapiResponse] = useState({
    stocksKeys: [],
    stocksMap: {},
    data: [],
  });
  const [opacity, setOpacity] = useState({});
  const zeroLegendMap = apiResponse.stocksKeys.reduce((acArr, element) => ({ ...acArr, [element]: 0 }), {})

  const handleMouseEnter = (o) => {
    // const { dataKey } = o;
    // const obje = apiResponse.stocksMap;
    // Object.keys(obje).forEach((v) => (obje[v] = 0.1));
    // setOpacity({ ...obje, [dataKey]: 1 });
  };

  const handleMouseLeave = (o) => {
    // const { dataKey } = o;
    // const obje = apiResponse.stocksMap;
    // Object.keys(obje).forEach((v) => (obje[v] = 1));
    // setOpacity({ ...obje, [dataKey]: 1 });
  };

  const handleClick = (o) => {
    // const { dataKey } = o;
    // const obje = { ...zeroLegendMap };
    // const lastOpValue = opacity[dataKey];
    // Object.keys(obje).forEach((v) => (obje[v] = dataKey === v ? (lastOpValue ? 0.1 : 1) : opacity[v] || 1));
    // setOpacity({ ...obje });
  };

  const loadData = useCallback(async () => {
    try {
      setloading(true);
      const response = await fetchData(date);
      setapiResponse(response);
      setloading(false);
    } catch (error) {
      console.log('error', error);
      setloading(false);
    }
  }, [date]);

  const finalResponse = apiResponse.data.map((el) => ({
    createdAt: el.createdAt,
    ...zeroLegendMap,
    ...(type === '1' ? el.oiMap : el.priceMap),
  }));

  const sortedLegend = apiResponse.stocksKeys.sort(function (a, b) {
    return apiResponse.stocksMap[b] - apiResponse.stocksMap[a];
  });

  const resetChanges = () => {
    setdate(daysList[0]);
    setType('1');
    setOpacity({});
  };

  useEffect(() => {
    loadData();
  }, [date, loadData]);

  useEffect(() => {
    const myInterval = setInterval(loadData, 120 * 1000);
    return () => clearInterval(myInterval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='App'>
      <div className='App-header'>
        <Form.Select onChange={(el) => setdate(el.target.value)} value={date}>
          {daysList.map((e, i) => (
            <option key={i} value={e}>
              {e}
            </option>
          ))}
        </Form.Select>
        <Form.Select onChange={(el) => setType(el.target.value)} value={type}>
          <option value='1'>OI</option>
          <option value='2'>Price change</option>
        </Form.Select>

        <Button variant='info' disabled={loading} onClick={loading ? () => {} : loadData}>
          {loading ? 'Loading...' : 'Refresh'}
        </Button>

        <Button variant='warning' disabled={loading} onClick={loading ? () => {} : resetChanges}>
          Reset
        </Button>
      </div>
      <LineChart
        width={width}
        height={height - 100}
        data={finalResponse}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='createdAt' />
        <YAxis />
        {/* <Tooltip /> */}
        <Legend onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleClick} />
        {sortedLegend.map((name, i) => (
          <Line
            type='monotone'
            key={i}
            dataKey={name}
            strokeOpacity={opacity[name] || 1}
            stroke={colorsArray[i % 16]}
          />
        ))}
      </LineChart>
    </div>
  );
};

export default App;
