import React, { Component } from 'react';
import Dropdown from './Dropdown';
import countries from './Country'
import Utils from './Utils'
import CountryCodes from './CountryCodes'

class App extends Component {
    constructor(){
    super()
    this.state = {
      telephoneNumber:'',
      selectedCOuntry : '',
      countryCode:'',
      country: countries,
      countryDialCodes :CountryCodes
    }
  }

  resetState = ()=>{
    let temp = JSON.parse(JSON.stringify(this.state.country))
    temp.forEach(item => item.selected = false);
    return temp
  }

  resetThenSet = (id, key, title , code) => {
    let temp = this.resetState()
    temp.map((country)=>{
        if(country.title ===title){
          country.selected = true
        }
    })
    this.setState({
      country: temp,
      selectedCOuntry: title,
      countryCode:code
    })
  }

  numberChange(e){
    let {value}  = e.target
    this.setState({
      telephoneNumber : value
    })

    this.updateFlagFromNumber(value)
  }

  getDialCode = number => {
    let dialCode = '';

    // only interested in international numbers (starting with a plus)
    if (number.charAt(0) === '+') {
      let numericChars = '';

      // iterate over chars
      for (let i = 0, max = number.length; i < max; i++) {
        const c = number.charAt(i);

        // if char is number
        if (Utils.isNumeric(c)) {
          numericChars += c;
          // if current numericChars make a valid dial code
          if (this.state.countryDialCodes[numericChars]) {
            // store the actual raw string (useful for matching later)
            dialCode = number.substr(0, i + 1);
          }
          // longest dial code is 4 chars
          if (numericChars.length === 4) {
            break;
          }
        }
      }
    }

    return dialCode;
  }

  setFlag = (countryCode)=>{
      let temp = this.resetState(), title= ''
     temp.map((country)=>{
        if(country.code ==countryCode){
          country.selected = true
          title = country.title
        }
    })

    this.setState({
      country: temp,
      selectedCOuntry: title,
      countryCode:countryCode
    })
  }

  updateFlagFromNumber = (number) => {

    // try and extract valid dial code from input
    const dialCode = this.getDialCode(number);
    let countryCode = null;


    if (dialCode) {
      const alreadySelected =
        this.state.countryCode &&
        this.state.countryCode === Utils.getNumeric(dialCode)

        if(!alreadySelected){
          countryCode = Utils.getNumeric(dialCode)
        }
    }
    if (countryCode !== null) {

      this.setFlag(countryCode);
    }
  }

  render() {

    const {countryCode , telephoneNumber } = this.state
    return (
      <div className="App">

        <div className="wrapper">
          <Dropdown
            title= {this.state.selectedCOuntry || "Select your country"}
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
