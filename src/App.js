import React, { Component } from 'react';
import Dropdown from './Dropdown';

class App extends Component {
    constructor(){
    super()
    this.state = {
      selectedCOuntry : '',
      country: [
        {
          id: 0,
          title: 'US',
          selected: false,
          key: 'country',
          flag:'https://einfon.com/wp-content/uploads/2017/05/Flag-Of-USA.jpg'
        },
        {
          id: 1,
          title: 'UK',
          selected: false,
          key: 'country',
          flag:'https://einfon.com/wp-content/uploads/2017/05/Flag-Of-USA.jpg'
        },
        {
          id: 2,
          title: 'IND',
          selected: false,
          key: 'country',
          flag:'https://einfon.com/wp-content/uploads/2017/05/Flag-Of-USA.jpg'
        },
        {
          id: 3,
          title: 'NZ',
          selected: false,
          key: 'country',
          flag:'https://einfon.com/wp-content/uploads/2017/05/Flag-Of-USA.jpg'
        },
        {
          id: 4,
          title: 'AUS',
          selected: false,
          key: 'country',
          flag:'https://einfon.com/wp-content/uploads/2017/05/Flag-Of-USA.jpg'
        }
      ]
    }
  
  }


  resetThenSet = (id, key, title) => {
    let temp = JSON.parse(JSON.stringify(this.state[key]))
    temp.forEach(item => item.selected = false);
    temp[id].selected = true;
    this.setState({
      [key]: temp,
      selectedCOuntry: title
    })
  }

  render() {
    return (
      <div className="App">

        <div className="wrapper">
          <Dropdown
            title="Select your country"
            list={this.state.country}
            resetThenSet={this.resetThenSet}
          />
        </div>

        <p> Selected country {this.state.selectedCOuntry}</p>
      </div>
    );
  }
}

export default App;