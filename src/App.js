import 'bootstrap/dist/css/bootstrap.min.css';
import { useCallback, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import './App.css';
import { Graph, StocksTable } from './components';
import { fetchData, getDaysArray } from './utils';

const App = () => {
  const daysList = getDaysArray(10);
  const [loading, setloading] = useState(false);
  const [date, setdate] = useState(daysList[0]);
  const [type, setType] = useState('1');
  const [minDiff, setMinDiff] = useState(0.1);
  const [apiResponse, setapiResponse] = useState({
    stocksKeys: [],
    stocksMap: {},
    data: [],
    latestData: [],
    latestDate: '',
  });

  const loadData = useCallback(async () => {
    try {
      setloading(true);
      const response = await fetchData({ date, type, minDiff });
      if (response.data) {
        setapiResponse(response);
      }
      setloading(false);
    } catch (error) {
      console.log('error', error);
      setloading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, minDiff, type]);

  const resetChanges = () => {
    setdate(daysList[0]);
    setType('1');
    setMinDiff(0.1);
  };

  useEffect(() => {
    loadData();
    const myInterval = setInterval(() => loadData(), 120 * 1000);
    return () => clearInterval(myInterval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, minDiff, type]);

  return (
    <div className='App'>
      <div className='App-header'>
        <div className='App-header-r'>
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
          <Form.Select onChange={(el) => setMinDiff(el.target.value)} value={minDiff}>
            <option value={0.1}>0.1</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={5}>5</option>
            <option value={7}>7</option>
            <option value={10}>10</option>
          </Form.Select>
        </div>
        <div className='App-header-r'>
          <Button
            className='refresh-button'
            variant='info'
            disabled={loading}
            onClick={loading ? () => {} : loadData}
          >
            {loading && <Spinner as='span' animation='border' size='sm' role='status' aria-hidden='true' />}
            {loading ? 'Loading...' : 'Refresh'}
          </Button>

          <Button variant='warning' disabled={loading} onClick={loading ? () => {} : resetChanges}>
            Reset
          </Button>
        </div>
      </div>

      <Graph apiResponse={apiResponse} type={type} />

      <StocksTable apiResponse={apiResponse} />
    </div>
  );
};

export default App;
