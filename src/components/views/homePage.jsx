import React, { Component } from "react";
import { browserHistory } from 'react-router';
import { Link } from 'react-router';
import SearchBar from './SearchBar';
import GifList from './GifList';
import GifModal from './GifModal';
import request from 'superagent';

// npm install --save superagent
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
    };

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

  const url = `http://api.giphy.com/v1/gifs/search?q=${destinationTo.replace(/\s/g, '+')}&api_key=dc6zaTOxFJmzC`;
  //const url = `http://android.momondo.com/api/3.0/Currency/List?all=all`
  //const url = `http://partners.api.skyscanner.net/apiservices/browsequotes/v1.0/FR/eur/en-US/uk/us/anytime/anytime?apikey=so692797585697172589856171924497`;
    //const url = `https://api.github.com/users/sofiekhullar`;
    console.log('I handleTermChange ' + destinationTo + ' ' + destinationFrom);

    request.get(url, (err, res) => {
        console.log(res);
        this.setState({ gifs: res.body.data })
    });
  }
  render() {
    return (
      <div>
        <h1>YoloTrip </h1>
        <SearchBar onTermChange={this.handleTermChange} />
        <GifList  gifs={this.state.gifs} onGifSelect={selectedGif => this.openModal(selectedGif) } />
        <GifModal modalIsOpen={this.state.modalIsOpen} selectedGif={this.state.selectedGif} onRequestClose={ () => this.closeModal() } />
      </div>
    );
  }
}



/*module.exports = React.createClass({

  constructor:function(props) {
    super(props);

    this.state = {
      gifs: [
        {
          id: 1,
          url: 'http://fakeimg.pl/300/'
        },
        {
          id: 2,
          url: 'http://fakeimg.pl/300/'
        },
        {
          id: 3,
          url: 'http://fakeimg.pl/300/'
        }
      ]
    }
  },

  getInitialState: function() {
    return {
      searchFrom: '',
      searchTo: '',
      searches: []
    };
  },
 
  submit: function(ev) {
     ev.preventDefault();
 
    var newSeachFrom = <SerachMessage message={this.state.searchFrom} />;
    var newSeachTo = <SerachMessage message={this.state.searchTo} />;
 
    this.setState({
      searches: this.state.searches.concat([newSeachFrom]),
      searchFrom: '',
      searchTo:''
    });
  },
 
  updateInputFrom: function(ev) {
    this.setState({
      searchFrom: ev.target.value
    });
  },

  updateInputTo: function(ev) {
    this.setState({
      searchTo: ev.target.value
    });
  },

  handleTermChange:function(term) {
    console.log(term);
  },
 
  render: function() {
    return <div>
      <h1> Welcome to YOLOTRIP!</h1>
      <SearchBar onTermChange={this.handleTermChange}/>
      <div>{this.state.searches}</div>
      <form onSubmit={this.submit}>
        <input onChange={this.updateInputFrom} value={this.state.searchFrom} type="text" placeholder="Search from" />
        <input onChange={this.updateInputTo} value={this.state.searchTo} type="text" placeholder="Search To" />
        <Link to="/result">
          <input type="submit" value="Send"/>
        </Link>
        
      </form>
    </div>;
  }
});*/