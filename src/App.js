import React, { Component } from 'react';
import Dropdown from './Dropdown';
import AllCountries from './Country'
import Utils from './Utils'

class App extends Component {
    constructor(){
    super()
    this.countries = AllCountries.getCountries()
    this.countryCodes = {};
    this.state = {
      telephoneNumber:'',
      selectedCountry : '',
      countryCode:''
    }
  }

  addCountryCodes(){
    let countryCodes= this.countryCodes
      this.countries.forEach(country => {
        countryCodes[country.dialCode] = [country.iso2 , country.name]
      });
  }

  componentDidMount(){
      this.addCountryCodes()
  }

  setCountry = (countryCode) => {
    this.setState({
      selectedCountry: this.countryCodes[countryCode][1],
      countryCode:countryCode
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

    if (number.charAt(0) === '+') {
      let numericChars = '';
      for (let i = 0, max = number.length; i < max; i++) {
        const c = number.charAt(i);

        // if char is number
        if (Utils.isNumeric(c)) {
          numericChars += c;
          // if current numericChars make a valid dial code
          if (this.countryCodes[numericChars]) {
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
    //Directly we can invoke setCountry - Timebeing handled here
    this.setCountry(countryCode)
  }

  updateFlagFromNumber = (number) => {
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
            title= {this.state.selectedCountry || "Select your country"}
            list={this.countries}
            setCountry={this.setCountry}
          />
          <input type="text" value={telephoneNumber} onChange={(e)=>this.numberChange(e)}/>
        </div>

        <p> Selected country {`+${countryCode}`} {telephoneNumber}</p>
      </div>
    );
  }
}

export default App;
