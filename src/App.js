import React, { Component } from 'react';
import Dropdown from './Dropdown';

class App extends Component {
    constructor(){
    super()
    this.state = {
      telephoneNumber:'',
      selectedCOuntry : '',
      countryCode:'',
      country: [
        {
          id: 0,
          title: 'US',
          code: '1',
          selected: false,
          key: 'country',
          flag:'https://einfon.com/wp-content/uploads/2017/05/Flag-Of-USA.jpg'
        },
        {
          id: 1,
          title: 'UK',
          code: '44',
          selected: false,
          key: 'country',
          flag:'https://einfon.com/wp-content/uploads/2017/05/Flag-Of-USA.jpg'
        },
        {
          id: 2,
          title: 'IND',
          code: '91',
          selected: false,
          key: 'country',
          flag:'https://einfon.com/wp-content/uploads/2017/05/Flag-Of-USA.jpg'
        },
        {
          id: 3,
          title: 'NZ',
          selected: false,
          code: '33',
          key: 'country',
          flag:'https://einfon.com/wp-content/uploads/2017/05/Flag-Of-USA.jpg'
        },
        {
          id: 4,
          title: 'AUS',
          selected: false,
          code: '88',
          key: 'country',
          flag:'https://einfon.com/wp-content/uploads/2017/05/Flag-Of-USA.jpg'
        }
      ]
    }
  
  }


  resetThenSet = (id, key, title , code) => {
    console.log(key)
    let temp = JSON.parse(JSON.stringify(this.state[key]))
    temp.forEach(item => item.selected = false);
    temp[id].selected = true;
    this.setState({
      [key]: temp,
      selectedCOuntry: title,
      countryCode:code
    })
  }

  numberChange(e){
    let {value}  = e.target
    this.setState({
      telephoneNumber : value
    })
  }

  render() {

    const {countryCode , telephoneNumber } = this.state
    return (
      <div className="App">

        <div className="wrapper">
          <Dropdown
            title="Select your country"
            list={this.state.country}
            resetThenSet={this.resetThenSet}
          />
          <input type="text" value={telephoneNumber} onChange={(e)=>this.numberChange(e)}/>
        </div>

        <p> Selected country {`+${countryCode}`} {telephoneNumber}</p>
      </div>
    );
  }
}

export default App;