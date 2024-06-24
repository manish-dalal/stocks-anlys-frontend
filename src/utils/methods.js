import axios from 'axios';
import moment from 'moment';

export const getDaysArray = (total) => {
  const arr = [];
  const today = new Date();
  for (let dt = 0; dt <= total; dt++) {
    arr.push(today.toISOString().slice(0, 10));
    today.setDate(today.getDate() - 1);
  }
  return arr;
};

const transformResponse = ({ data, type, minDiff }) => {
  const response = data;
  let stocksMap = {};
  const finalRes = response.positions.map((e) => {
    const topList = JSON.parse(e.text);
    const oiMap = {};
    const priceMap = {};
    stocksMap = topList.reduce((acArr, element) => {
      if (
        (type === '1' && Math.abs(parseFloat(element['%chng in OI'])) >= minDiff) ||
        (type === '2' && Math.abs(parseFloat(element['%chng'])) >= minDiff)
      ) {
        oiMap[element.Symbol] = element['%chng in OI'];
        priceMap[element.Symbol] = element['%chng'];
        return { ...acArr, [element.Symbol]: element['%chng in OI'] };
      }

      return { ...acArr };
    }, stocksMap);
    return {
      createdAt: moment(e.createdAt).format('h:mm'),
      oiMap,
      priceMap,
    };
  });
  //   data: finalRes.sort(function (a, b) {
  //     return a.createdAt.localeCompare(b.createdAt);
  //   }),
  const latestData = response.positions.length ? response.positions[response.positions.length - 1] : [];
  return {
    latestDate: latestData.createdAt,
    latestData: JSON.parse(latestData.text),
    stocksKeys: Object.keys(stocksMap),
    stocksMap,
    data: finalRes,
  };
};

export const fetchData = ({ date, type, minDiff }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(
        `https://8948bdad-9d60-4da8-9923-5762f04c45d8-00-1y1zyfk9ljr44.sisko.replit.dev/api/position/v1/list?date=${date}`
      );
      const transformedRes = transformResponse({ data: response.data, type, minDiff });
      return resolve(transformedRes);
    } catch (error) {
      return resolve({});
    }
  });
};

export const colorsArray = [
  '#059212',
  '#773EBB',
  '#A3AFE0',
  '#D98CBF',
  '#772E8A',
  '#152E0F',
  '#D1B375',
  '#44AEC1',
  '#34699D',
  '#392060',
  '#433DB8',
  '#C14478',
  '#75D175',
  '#923CB4',
  '#0A141F',
  '#3E822B',
  '#CF81D5',
];
