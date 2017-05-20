import React from 'react';

const ResultItem = ({minPrice, departureInboundDate, departureOutboundDate}) => {
  return (
  <div className="result-item">
	  <h3> Inbound Depature on the {departureInboundDate}</h3>
	  <h3> Outbound Depature on the {departureOutboundDate}</h3>
	 
	  <h4> Price {minPrice}</h4>
	  
  </div>
  )
};

export default ResultItem;