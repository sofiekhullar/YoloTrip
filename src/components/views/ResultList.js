import React from 'react';
import ResultItem from './ResultItem';

const ResultList = (props) => {
  	const resultItem = props.results.map((flight) => {
  		//console.log(props.results[1].QuoteId);
  		console.log("detta är flight  " + flight.InboundLeg.DepartureDate);
    return <ResultItem key={flight.QuoteId} minPrice={flight.MinPrice} departureInboundDate={flight.InboundLeg.DepartureDate}
    		 departureOutboundDate= {flight.OutboundLeg.DepartureDate}/>
  });

  return (
    <ul>{resultItem}</ul>
  );
};
export default ResultList;