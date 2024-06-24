import './GraphTooltip.css';

export const GraphTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const filterPayload = payload.filter((el) => el.value);
    return (
      <div className='graph-tooltip'>
        <div className='graph-tooltip-heading'>{label}</div>
        {filterPayload.map((element, index) => (
          <div key={index} className='graph-tooltip-row'>
            <div className='graph-tooltip-label' style={{ color: element.color }}>
              {element.dataKey}
            </div>
            <div className='graph-tooltip-value'>{element.value}</div>
          </div>
        ))}
      </div>
    );
  }

  return null;
};
