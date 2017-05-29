import React from 'react';
import ResultItem from './ResultItem';

const ResultList = (props) => {
  	const resultItem = props.quotes.map((flight) => {
  	//console.log(props.results[1].QuoteId);
  	//console.log("Places:  " + props.places[0].PlaceId);
  	//console.log(flight.InboundLeg.DestinationId ) OriginId

  	var placesArray = props.places;

  	// Id for inbound trip
  	var placeIdDestinationInboundLeg = flight.InboundLeg.DestinationId;
  	var placeIdOriginInboundLeg = flight.InboundLeg.OriginId;

  	// Id for outbound trip
  	var placeIdDestinationOutboundLeg = flight.OutboundLeg.DestinationId;
  	var placeIdOriginOutboundLeg= flight.OutboundLeg.OriginId;

	 for (var i = 0; i < placesArray.length; i++) {
	    if (placesArray[i].PlaceId === placeIdDestinationInboundLeg) {
	    	var CityNameInD = placesArray[i].CityName;
	    	var CountryNameInD = placesArray[i].CountryName;
	    	var NameInD  = placesArray[i].Name;
	   }
	    if (placesArray[i].PlaceId === placeIdOriginInboundLeg) {
	    	var CityNameInO = placesArray[i].CityName;
	    	var CountryNameInO = placesArray[i].CountryName;
	    	var NameInO  = placesArray[i].Name;
	   }
	    if (placesArray[i].PlaceId === placeIdDestinationOutboundLeg) {
	    	var CityNameOutD = placesArray[i].CityName;
	    	var CountryNameOutD = placesArray[i].CountryName;
	    	var NameOutD = placesArray[i].Name;
	   }
 		if (placesArray[i].PlaceId === placeIdOriginOutboundLeg) {
	    	var CityNameOutO = placesArray[i].CityName;
	    	var CountryNameOutO = placesArray[i].CountryName;
	    	var NameOutO = placesArray[i].Name;
	   }
	  }
  	//console.log(placesArray.filter(function(a){ return a.PlaceId == placeIdDestination })[0]);

    return <ResultItem key={flight.QuoteId} 
    						currency={props.currency} 
    						minPrice={flight.MinPrice} 
    						CityNameInD = {CityNameInD}
    						CountryNameInD = {CountryNameInD}
    						NameInD = {NameInD}
    						CityNameInO = {CityNameInO}
    						CountryNameInO = {CountryNameInO}
    						NameInO = {NameInO}

    						CityNameOutD = {CityNameOutD}
    						CountryNameOutD = {CountryNameOutD}
    						NameOutD = {NameOutD}
    						CityNameOutO = {CityNameOutO}
    						CountryNameOutO = {CountryNameOutO}
    						NameOutO = {NameOutO}

    						departureInboundDate={flight.InboundLeg.DepartureDate}
    		 				departureOutboundDate= {flight.OutboundLeg.DepartureDate}/>
  });

  return (
    <div className="result-list">{resultItem}</div>
  );
};
export default ResultList;