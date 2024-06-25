import React from 'react';
import Table from 'react-bootstrap/Table';

export const StocksTable = ({ apiResponse }) => {
  const halfLength = apiResponse.latestData.length ? Math.floor(apiResponse.latestData.length / 2) : 0
  const halfData = apiResponse.latestData.slice(0, halfLength)
  const secondHalfData = apiResponse.latestData.slice(halfLength, apiResponse.latestData.length)
  return (
    <div className='table-container-row'>
      <Table striped>
        <thead>
          <tr>
            <th>#</th>
            <th>Symbol</th>
            <th>Price %chng</th>
            <th>%chng in OI</th>
          </tr>
        </thead>
        <tbody>
          {halfData.map((row, index) => {
            return (
              <tr key={`table-row-${index}`}>
                <td>{index + 1}</td>
                <td className='table-symbol' onClick={() => navigator.clipboard.writeText(row.Symbol)}>
                  {row.Symbol}
                </td>
                <td>{row['%chng']}</td>
                <td>{row['%chng in OI']}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Table striped>
        <thead>
          <tr>
            <th>#</th>
            <th>Symbol</th>
            <th>Price %chng</th>
            <th>%chng in OI</th>
          </tr>
        </thead>
        <tbody>
          {secondHalfData.map((row, index) => {
            return (
              <tr key={`table-row-${index}`}>
                <td>{halfLength + index + 1}</td>
                <td className='table-symbol' onClick={() => navigator.clipboard.writeText(row.Symbol)}>
                  {row.Symbol}
                </td>
                <td>{row['%chng']}</td>
                <td>{row['%chng in OI']}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};
