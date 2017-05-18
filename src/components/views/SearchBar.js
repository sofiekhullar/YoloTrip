import React from 'react';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '',
                    fromDestination: '',  
                    toDestination:''
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

  onFormSubmit(event) {
    event.preventDefault();
    this.props.onTermChange(this.state.toDestination, this.state.fromDestination);
    //this.props.onTermChange(this.state.fromDestination);
    console.log('Subimtted: ' + this.state.toDestination +  '  ' + this.state.fromDestination);
} 

  render() {
    return (
      <div className="search">
        <form onSubmit={this.onFormSubmit} className="input-group">
          <input placeholder="From..." type="text" value={this.state.fromDestination} onChange={this.onInputChangeFrom} />
          <input placeholder="To..." type="text" value={this.state.toDestination} onChange={this.onInputChangeTo} />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default SearchBar;