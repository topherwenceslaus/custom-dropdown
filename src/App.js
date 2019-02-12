import React, { Component } from 'react';
import Dropdown from './Dropdown';
import AllCountries from './Country'
import Utils from './Utils'

class App extends Component {
    constructor(props){
    super(props)
    this.countries = AllCountries.getCountries()
    this.countryCodes = {};
    this.defaultCountry = props.defaultCountry || null
    this.state = {
      telephoneNumber:'',
      selectedCountry : '',
      countryCode:'',
      isValidNumber: false
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
      if(this.defaultCountry){
          this.setFlag(this.defaultCountry)
      }
  }

  setFlag = (countryCode,isValidNumber = true) => {
    const newNumber = this.updateDialCode(countryCode)

    this.setState({
      selectedCountry: this.countryCodes[countryCode][1],
      countryCode:countryCode,
      telephoneNumber : newNumber,
      isValidNumber:isValidNumber
    })
  }

  numberChange(e){
    let {value}  = e.target
    this.setState({
      telephoneNumber : value
    },this.updateFlagFromNumber(value))
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

  updateDialCode = (newDialCode) => {
    const currentNumber = this.state.telephoneNumber;
    if (!newDialCode) {
      return currentNumber;
    }
    let newNumber = currentNumber;
    newDialCode = `+${newDialCode}`;

    if (currentNumber.charAt(0) === '+') {
      const prevDialCode = this.getDialCode(currentNumber);  
      if (prevDialCode) {
        newNumber = currentNumber.replace(prevDialCode, newDialCode);
      } else {
        newNumber = newDialCode;
      }
    } 
    else{
      return `${newDialCode}${newNumber}`
    }
    return newNumber
  }




  updateFlagFromNumber = (number) => {
    const dialCode = this.getDialCode(number);
    let isValidNumber = false
    let countryCode = null;
    if (dialCode) {
      const alreadySelected =
        this.state.countryCode &&
        this.state.countryCode === Utils.getNumeric(dialCode)
       
        if(!alreadySelected){
          countryCode = Utils.getNumeric(dialCode)
        }

        isValidNumber = true
    }
    if (countryCode !== null) {
      this.setFlag(countryCode,isValidNumber);
    }
    else{
      this.setState({
        isValidNumber
      })
    }
  }

  render() {
    const { telephoneNumber } = this.state
    return (
      <div className="App">

        <div className="wrapper">
          <Dropdown
            title= {this.state.selectedCountry || "Select your country"}
            list={this.countries}
            setFlag={this.setFlag}
          />
          <input type="text" value={telephoneNumber} onChange={(e)=>this.numberChange(e)}/>
        </div>

        <p> {this.state.isValidNumber ? "valid dialcode" : "not  valid code"}</p>
      </div>
    );
  }
}

export default App;
