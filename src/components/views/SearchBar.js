import React from 'react';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '',
                    fromDestination: '',  
                    toDestination:'',
                    when:'',
                    showOptions: false,
                  };

    this.onInputChangeFrom = this.onInputChangeFrom.bind(this); 
    this.onInputChangeTo = this.onInputChangeTo.bind(this); 
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onInputChangeFrom(event) {
    this.setState({fromDestination: event.target.value});
  }

 onInputChangeTo(event) {
    this.setState({toDestination: event.target.value});
  }

onInputChangeWhen(event){
  this.setState({when: event.target.value});
}
  onFormSubmit(event) {
    event.preventDefault();
    console.log("in onFormSubmit");
    //console.log('Subimtted: ' + this.state.toDestination +  '  ' + this.state.fromDestination);
    this.props.onTermChange(this.state.toDestination, this.state.fromDestination);
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
          {this.state.showOptions && 
          <input className="inputText" placeholder="To..." type="text" value={this.state.toDestination} onChange={this.onInputChangeTo} />
          }
          {this.state.showOptions && 
          <input className="inputText" placeholder="When..." type="text" value={this.state.when} onChange={this.onInputChangeWhen} />
          }

        </form>   
      </div>
    );
  }
}

export default SearchBar;