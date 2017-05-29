import React from 'react';

const ResultItem = ({currency, minPrice, CityNameInD, CountryNameInD, NameInD, CityNameInO, CountryNameInO, NameInO,
										 CityNameOutD, CountryNameOutD, NameOutD, CityNameOutO, CountryNameOutO, NameOutO,
					departureInboundDate, departureOutboundDate}) => {
  return (
  <div className="result-item">
  	<h2> Inbound destination {CityNameInD}, {CountryNameInD}, {NameInD} </h2>
  	<h2> Inbound Origin {CityNameInO}, {CountryNameInO}, {NameInO} </h2>
	<h3> Inbound Depature on the {departureInboundDate} </h3>

	<h2> Outbound destination {CityNameOutD}, {CountryNameOutD}, {NameOutD} </h2>
  	<h2> Outbound Origin {CityNameOutO}, {CountryNameOutO}, {NameOutO} </h2>
	  <h3> Outbound Depature on the {departureOutboundDate}</h3>
	 
	  <h4> Price {minPrice} {currency}</h4>
	  
  </div>
  )
};

export default ResultItem;