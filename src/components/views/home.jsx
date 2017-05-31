import React, { Component } from "react";
import { browserHistory } from 'react-router';
import GifList from './GifList';
import SearchBar from './SearchBar';
import request from 'superagent';
import GifModal from './GifModal';

import ResultList from './ResultList';

export default class Home extends Component {
  componentDidMount() {
    browserHistory.push('/');
  }
  constructor(props) {
    super(props);

    this.state = {
      quotes: [],
      places: [],
      currency: null,
      selectedGif: null,
      modalIsOpen: false

    }
    this.handleTermChange = this.handleTermChange.bind(this);
  }
  
  openModal(gif) {
    this.setState({
      modalIsOpen: true,
      selectedGif: gif
    });
  }

  closeModal() {
    this.setState({
      modalIsOpen: false,
      selectedGif: null
    });
  }

   handleTermChange(destinationTo, destinationFrom) {

    const APIKEYSKYSCANNER = 'so692797585697172589856171924497';
    const APIKEYWEATHER = '9a71d4dcab054321261b7ecab76ec667'

    var country = 'FR'
    var currency =  'SEK';
    var locale = 'sv-SE';
    var error = false;

    const urlPlaceFrom = 'http://partners.api.skyscanner.net/apiservices/autosuggest/v1.0/'+country+'/'+currency+'/'+locale +
                         '/?query='+ destinationFrom +'&apiKey=' + APIKEYSKYSCANNER;

    const urlPlaceTo = 'http://partners.api.skyscanner.net/apiservices/autosuggest/v1.0/'+country+'/'+currency+'/'+locale +
                       '/?query='+ destinationTo +'&apiKey=' + APIKEYSKYSCANNER; 

    // Frist check the from destination
    request.get(urlPlaceFrom, (err, res) => {
        if(res.status == 200 && res.body.Places[0] != undefined) {
        var destinationFromId = res.body.Places[0].PlaceId;
      
      // Frist check the to destination
      request.get(urlPlaceTo, (err, res) => {
      if(res.status == 200  &&  res.body.Places[0] != undefined){
        var destinationToId = res.body.Places[0].PlaceId;

        const urlWeather = 'http://samples.openweathermap.org/data/2.5/history/city?q='+ destinationTo +'&appid=' + APIKEYWEATHER;

        request.get(urlWeather, (err, res) => {
          console.log(res.body);
        const urlSkyscanner = 'http://partners.api.skyscanner.net/apiservices/browsequotes/v1.0/'+ country + '/' + currency +'/'+ 
                 locale +'/' + destinationToId + '/' + destinationFromId+ '/anytime/anytime?apikey=' + APIKEYSKYSCANNER;

        // Finally get the flights
        request.get(urlSkyscanner, (err, res) => {
        console.log(res.body);
        this.setState({ quotes: res.body.Quotes, places: res.body.Places, currency:currency});

        });
        });
         }else {console.log("Wrong input TO destination");} 
      });
    }else {console.log("Wrong input FROM destination");} 
    });
  }

  render() {
    return (
      <div id="home">
        <h1>YoloTrip</h1>
            <SearchBar onTermChange={this.handleTermChange} />
            <ResultList quotes={this.state.quotes} places={this.state.places} currency={this.state.currency} />
      </div>
    );
  }
}