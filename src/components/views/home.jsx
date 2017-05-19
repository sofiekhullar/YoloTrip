import React, { Component } from "react";
import { browserHistory } from 'react-router';
import GifList from './GifList';
import SearchBar from './SearchBar';
import request from 'superagent';
import GifModal from './GifModal';

export default class Home extends Component {
  componentDidMount() {
    browserHistory.push('/');
  }
  constructor(props) {
    super(props);

    this.state = {
      gifs: [],
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

      request
        .get(url)
        .accept('application/json')
        .end(function(err, res){
          console.log(res.body);

          for (var i = 0; i < res.body.Quotes.length; i++) { 
              console.log(res.body.Quotes[i]);
          }
        });
        
    /*request.get(url, (err, res) => {
      //this.setState({ gifs: res.body.data })
    });*/
  }

  render() {
    return (
      <div id="home">
        <h1>YoloTrip</h1>
            <SearchBar onTermChange={this.handleTermChange} />
             <GifList  gifs={this.state.gifs}
                  onGifSelect={selectedGif => this.openModal(selectedGif) } />
            <GifModal modalIsOpen={this.state.modalIsOpen}
                  selectedGif={this.state.selectedGif}
                  onRequestClose={ () => this.closeModal() } />
      </div>
    );
  }
}