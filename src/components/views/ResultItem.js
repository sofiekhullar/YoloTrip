import React from 'react';
import request from 'superagent';
import Panel from 'react-bootstrap/lib/Panel';


class ResultItem extends React.Component {
  constructor(props) {
  super(props);
  
  this.state = {
         weather: 0,
         showWeather: false,
         inBudget: true,
         showBeerPrice: false,
         beerPrice: 0,
      }
  }

componentDidMount(){

      const self = this;
      var city = this.props.CityNameInO;
      city = city.replace(" ","-");
      var beerPrice = "https://www.numbeo.com/cost-of-living/in/" + city + "?displayCurrency=USD";
      var beerArray, beer, beerArray2;
      var priceFound = true;
      
      request
       .get(beerPrice)
       .end(function(err, res){

          beer = res.text;          
          beerArray = beer.split('(0.5 liter draught) </td> <td style="text-align: right" class="priceValue tr_highlighted"> ');
         
          if(beerArray.length > 1)
           {
              beerArray2 = beerArray[1].split("&nbsp");
              self.setState({showBeerPrice: !self.state.showBeerPrice});
              self.setState({beerPrice: beerArray2[0]});
           }
       });

       const weatherKEY = '3a8af41b9edc4b79977153509171406'
        var baseURL = 'http://api.worldweatheronline.com/premium/v1/';
        var date = this.props.departureInboundDate;
        date = date.slice(0,'2009-07-20'.length);
        date = "2016" + date.slice('2009'.length, date.length);
        console.log("Lets get som weather!");
        var url = baseURL + 'past-weather.ashx?q=' + this.props.CityNameInO + '&format=' + 'json' + '&extra=' + 'isDayTime' + '&'+ date +'=' + '2009-07-20' + '&key=' + weatherKEY;
        var weather = 0;
        request.get(url, (err, res) => {
          if(res.status == 200){
          weather = (parseInt(res.body.data.weather[0].maxtempC) + parseInt(res.body.data.weather[0].mintempC))/2;
          self.setState({ weather: weather});
           this.setState({
                showWeather: !this.state.showWeather
        });
  }  });
}


  withinBudget(){
    if(this.props.budget != 0 && this.props.budget < this.props.minPrice){
        return false;
    }
    else{
        return true;
    }
  }



  render(){
      if(this.withinBudget()){
      return (
        <div style={{paddingLeft: 100 + "px", paddingRight: 100 + "px"}}>
        <br/>
      <Panel bsStyle="default" header={this.props.CityNameInD + " - " + this.props.CityNameInO + " " + this.props.minPrice +" "+ this.props.currency} style={{marginRight: 5 + "px"}}>
        <h3>{this.props.CountryNameInD}, {this.props.NameInD} - {this.props.CountryNameInO}, {this.props.NameInO}</h3>
        <h4>{this.props.departureOutboundDate.slice(0,'2009-07-20'.length)}</h4>

        <h3>{this.props.CountryNameOutD}, {this.props.NameOutD} - {this.props.CountryNameOutO}, {this.props.NameOutO} </h3>
        <h4>{this.props.departureInboundDate.slice(0,'2009-07-20'.length)}</h4>
        <h4>Price: {this.props.minPrice} {this.props.currency}</h4>
        {this.state.showWeather && <h3>Temperature in {this.props.CityNameInO} is around {this.state.weather}</h3>}
        {this.state.showBeerPrice && <h3>Price of beer in {this.props.CityNameInO} is {this.state.beerPrice} USD</h3>}
      </Panel>
      </div>

    );
    }else {
      return(<div></div>);
    }
  }
}

 
export default ResultItem;