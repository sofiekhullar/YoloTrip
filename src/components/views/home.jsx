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
      results: [],
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

    const APIKEY = 'so692797585697172589856171924497';
    var country = 'FR'
    var currency =  'eur';
    var locale = 'en-US';
    var originPlace = 'uk'
    var destinationPlace = 'us';

    //const url = `http://api.giphy.com/v1/gifs/search?q=${destinationTo.replace(/\s/g, '+')}&api_key=dc6zaTOxFJmzC`;
    const url = 'http://partners.api.skyscanner.net/apiservices/browsequotes/v1.0/'+ country + '/' + currency +'/'+ 
                 locale +'/' + originPlace + '/' + destinationPlace+ '/anytime/anytime?apikey=' + APIKEY;

    console.log("handleTermChange " + destinationTo + " " + destinationFrom);

    request.get(url, (err, res) => {
      //console.log(res.body.data);
      //console.log(res.body.Quotes);
      this.setState({ results: res.body.Quotes })
    });
  }

  render() {
    return (
      <div id="home">
        <h1>YoloTrip</h1>
            <SearchBar onTermChange={this.handleTermChange} />
            <ResultList results={this.state.results} />
      </div>
    );
  }
}