import React from 'react';
import request from 'superagent';

class ResultItem extends React.Component {
  constructor(props) {
  super(props);
  
  this.state = {
         weather: 0,
      }
  }

  componentDidMount(){
    const self = this;
    const weatherKEY = '98c0acae069441c794464806171006'
    var baseURL = 'http://api.worldweatheronline.com/premium/v1/';
    var date = this.props.departureInboundDate;
    date = date.slice(0,'2009-07-20'.length);
    date = "2016" + date.slice('2009'.length, date.length);

    var url = baseURL + 'past-weather.ashx?q=' + this.props.CityNameInO + '&format=' + 'json' + '&extra=' + 'isDayTime' + '&'+ date +'=' + '2009-07-20' + '&key=' + weatherKEY;
    var weather = 0;
    request.get(url, (err, res) => {
      weather = (parseInt(res.body.data.weather[0].maxtempC) + parseInt(res.body.data.weather[0].mintempC))/2;
      self.setState({ weather: weather});
  });  
}
  render(){
      return (
      <div className="result-item">
        <h2>Inbound destination {this.props.CityNameInD}, {this.props.CountryNameInD}, {this.props.NameInD} </h2>
        <h2>Inbound Origin {this.props.CityNameInO}, {this.props.CountryNameInO}, {this.props.NameInO}</h2>
        <h3>Inboud departure date: {this.props.departureInboundDate}</h3>

        <h2>Outbound destination {this.props.CityNameOutD}, {this.props.CountryNameOutD}, {this.props.NameOutD} </h2>
        <h2> Outbound Origin {this.props.CityNameOutO}, {this.props.CountryNameOutO}, {this.props.NameOutO} </h2>
        <h3>Outbound Depature date: {this.props.departureOutboundDate}</h3>
        <h2>Temperature in {this.props.CityNameInO} is around {this.state.weather}</h2>
      </div>
    );
  }
}
 
export default ResultItem;