import React, { Component } from "react";
import { browserHistory } from 'react-router';
import GifList from './GifList';
import SearchBar from './SearchBar';
import request from 'superagent';
import GifModal from './GifModal';
import ResultList from './ResultList';

import Carousel from 'react-bootstrap/lib/Carousel';
import Jumbotron from 'react-bootstrap/lib/Jumbotron';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';

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
      modalIsOpen: false,
      weather: [],
      budget: 0,
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

   // If the user clicks on submit
   handleTermChange(destinationTo, destinationFrom, fromWhen, toWhen, budget){
    // Set up variables
    const APIKEYSKYSCANNER = 'so692797585697172589856171924497';

    var country = 'US'
    var currency =  'SEK';
    var locale = 'en-US';
    var error = false;
   
    if(fromWhen == '' && toWhen ==''){
      var fromWhen = 'anytime';
      var toWhen = 'anytime';
    }

    const urlPlaceFrom = 'http://partners.api.skyscanner.net/apiservices/autosuggest/v1.0/'+country+'/'+currency+'/'+locale +
                         '/?query='+ destinationFrom +'&apiKey=' + APIKEYSKYSCANNER;

    const urlPlaceTo = 'http://partners.api.skyscanner.net/apiservices/autosuggest/v1.0/'+country+'/'+currency+'/'+locale +
                       '/?query='+ destinationTo +'&apiKey=' + APIKEYSKYSCANNER; 

    // Frist check the from destination
    request.get(urlPlaceFrom, (err, res) => {
        if(res.status == 200 && res.body.Places[0] != undefined) {
        var destinationFromId = res.body.Places[0].PlaceId;
      
      // Second check the to destination -> if empty or string anywhere use anywhere
      request.get(urlPlaceTo, (err, res) => {

      if(destinationTo.length == 0 || destinationTo.toLowerCase() == 'anywhere' 
          || res.status == 200  &&  res.body.Places[0] != undefined){

        if(res.status == 200){
          var destinationToId = res.body.Places[0].PlaceId;
        }
        else {
          var destinationToId = 'anywhere';
        }

       const urlSkyscanner = 'http://partners.api.skyscanner.net/apiservices/browsequotes/v1.0/'+ country + '/' + currency +'/'+ 
                locale +'/' + destinationFromId + '/' + destinationToId + '/'+ fromWhen +'/'+ toWhen +'?apikey=' + APIKEYSKYSCANNER;

        // Finally get the flights
        request.get(urlSkyscanner, (err, res) => {
        //console.log(res.body);
        this.setState({ quotes: res.body.Quotes, places: res.body.Places, currency:currency, budget:budget});

        });
        //});
         }else {console.log("Wrong input TO destination");} 
      });
    }else {console.log("Wrong input FROM destination");} 
    });
  }

  render() {
    return (
      <div id="home">
        <Navbar style={{marginBottom: 0 + "px"}}>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="#">YoloTrip</a>
      </Navbar.Brand>
    </Navbar.Header>
    <Nav>
      <NavItem eventKey={1} href="#">Home</NavItem>
      <NavItem eventKey={2} href="#">About Us</NavItem>
      <NavDropdown eventKey={3} title="Other" id="basic-nav-dropdown">
        <MenuItem eventKey={3.1}>Action</MenuItem>
        <MenuItem eventKey={3.2}>Another action</MenuItem>
        <MenuItem eventKey={3.3}>Something else here</MenuItem>
        <MenuItem divider />
        <MenuItem eventKey={3.4}>Separated link</MenuItem>
      </NavDropdown>
    </Nav>
  </Navbar>
        <Jumbotron className="jumbo" style={{marginBottom: 0 + "px"}}>
          <h1>YoloTrip</h1>
          <p> Make the most out of your travel, lets YoloSearch! </p>
        </Jumbotron>

<SearchBar className="SearchBar" onTermChange={this.handleTermChange} />
<ResultList quotes={this.state.quotes} places={this.state.places} currency={this.state.currency}  budget = {this.state.budget}  />

  <Carousel className="carousel" style={{margin: 0 + "px"}}>
    <Carousel.Item>
      <img width={100 + "%"} height={500}  src="/images/hotel.jpeg"/>
      <Carousel.Caption>
        <h2>Fantasic Hotels</h2>
        <p>Find the best hotels</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img width={100 + "%"} height={500}  src="/images/flight.jpg"/>
      <Carousel.Caption>
        <h2>Best Flights</h2>
        <p>Find cheap and comfortable flights</p>
      </Carousel.Caption>
    </Carousel.Item>
  </Carousel>
      </div>
    );
  }
}