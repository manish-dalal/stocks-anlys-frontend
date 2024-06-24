import React from 'react';
import Table from 'react-bootstrap/Table';

export const StocksTable = ({ apiResponse }) => {
  return (
    <div>
    <div>{apiResponse.latestDate}</div>
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
        {apiResponse.latestData.map((row, index) => {
          return (
            <tr key={`table-row-${index}`}>
              <td>{index}</td>
              <td>{row.Symbol}</td>
              <td>{row['%chng']}</td>
              <td>{row['%chng in OI']}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  </div>
  )
}
