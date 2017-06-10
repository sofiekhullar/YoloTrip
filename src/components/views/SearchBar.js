import React from 'react';

var today = new Date();
var todayDate = today.getFullYear() + "-" + today.getDate() + "-" + (today.getMonth()+1);

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '',
                    fromDestination: '',  
                    toDestination:'',
                    fromWhen: '',
                    toWhen:'',
                    showOptions: false,
                  };

    this.onInputChangeFrom = this.onInputChangeFrom.bind(this); 
    this.onInputChangeTo = this.onInputChangeTo.bind(this); 
    this.onInputChangeFromWhen = this.onInputChangeFromWhen.bind(this);
    this.onInputChangeToWhen = this.onInputChangeToWhen.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onInputChangeFrom(event) {
    this.setState({fromDestination: event.target.value});
  }

 onInputChangeTo(event) {
    this.setState({toDestination: event.target.value});
  }

onInputChangeFromWhen(event){
  this.setState({fromWhen: event.target.value});
  console.log(event.target.value);
}

onInputChangeToWhen(event){
  this.setState({toWhen: event.target.value});
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
          <button className="buttonShowPref" type="button" onClick={(e) => this.handleClick(e)}>Show me more preferences:</button>
          <br/>
          {this.state.showOptions && <input className="inputText" placeholder="To..." type="text" value={this.state.toDestination} onChange={this.onInputChangeTo} />}
          <br/>
          {this.state.showOptions && <span>From when:</span>}
          {this.state.showOptions && <input className="inputText" type="date" max={todayDate} min="2017-06-10" value={this.state.fromWhen} onChange={this.onInputChangeFromWhen} />}
          {this.state.showOptions && <span>To when:</span>}
          {this.state.showOptions && <input className="inputText" type="date" max={todayDate} min="2017-06-10" value={this.state.toWhen} onChange={this.onInputChangeToWhen} />   
          }
        </form>   
      </div>
    );
  }
}

export default SearchBar;