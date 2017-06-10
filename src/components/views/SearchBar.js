import React from 'react';
import Button from 'react-bootstrap/lib/Button';

var today = new Date();
var todayDate = today.getFullYear() + "-" + today.getDate() + "-" + (today.getMonth()+1);

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value:'',
                    fromDestination: '',  
                    toDestination:'',
                    fromWhen: '',
                    toWhen:'',
                    buget:0,
                    showOptions: false,
                  };

    this.onInputChangeFrom = this.onInputChangeFrom.bind(this); 
    this.onInputChangeTo = this.onInputChangeTo.bind(this); 
    this.onInputChangeFromWhen = this.onInputChangeFromWhen.bind(this);
    this.onInputChangeToWhen = this.onInputChangeToWhen.bind(this);
    this.onInputChangeBudget = this.onInputChangeBudget.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onInputChangeFrom(event) {
    this.setState({fromDestination: event.target.value});
  }

 onInputChangeTo(event) {
    this.setState({toDestination: event.target.value});
  }

onInputChangeFromWhen(event){
  document.getElementById('pickToDate').disabled = false;
  this.setState({fromWhen: event.target.value});
}

onInputChangeToWhen(event){
  this.setState({toWhen: event.target.value});
}

onInputChangeBudget(event){
   this.setState({budget: event.target.value});
   document.getElementById('rangeValue').innerHTML = "Yolo I can spend " + event.target.value + " sek";
}
  onFormSubmit(event) {
    event.preventDefault();
    console.log("in onFormSubmit");
    //console.log('Subimtted: ' + this.state.toDestination +  '  ' + this.state.fromDestination);
    this.props.onTermChange(this.state.toDestination, this.state.fromDestination, this.state.fromWhen, this.state.toWhen);
} 
 handleClick() {
    console.log("Klickat!" + this.state.showOptions);
    this.setState({
        showOptions: !this.state.showOptions
      });
  }
  render() {
    return (
      <div className="search">
        <form onSubmit={this.onFormSubmit} className="SearchBar">
          <input className="inputTextFrom" placeholder="From..." type="text" value={this.state.fromDestination} onChange={this.onInputChangeFrom} />
          <input className="sumbitButton" type="submit" value="YoloSearch" />
          <br/>
          <Button className="buttonShowPref" onClick={(e) => this.handleClick(e)}>Show me more preferences:</Button>
          <br/>
          {this.state.showOptions && <input className="inputText" placeholder="To..." type="text" value={this.state.toDestination} onChange={this.onInputChangeTo} />}
          <br/>
          {this.state.showOptions && <label>From when:</label>}
          {this.state.showOptions && <input className="inputText" type="date" max={todayDate} min="2017-06-10" value={this.state.fromWhen} onChange={this.onInputChangeFromWhen}/>}
          {this.state.showOptions && <label>To when:</label>}
          {this.state.showOptions && <input className="inputText" disabled="true" id="pickToDate" type="date" max={todayDate} min="2017-06-10" value={this.state.toWhen} onChange={this.onInputChangeToWhen} />}
          <br/>
          {this.state.showOptions && <label>How much money can you spend?</label>}
          {this.state.showOptions &&  <input type="range" name="points" min="1000" max="10000" onChange={this.onInputChangeBudget}/>}
          <br/>
          {this.state.showOptions && <label id="rangeValue"></label>}
        </form>   
      </div>
    );
  }
}

export default SearchBar;