import React, { Component } from 'react'
import Flag from './Flag'
import './Global.css'
class Dropdown extends Component{
  constructor(props){
    super(props)
    this.state = {
      listOpen: false
    }
    this.close = this.close.bind(this)
    this.selectItem = this.selectItem.bind(this)
    this.toggleList = this.toggleList.bind(this)
  }

  componentDidMount(){
      window.addEventListener('click', this.close)
  }

  componentWillUnmount(){
    window.removeEventListener('click', this.close)
  }

  close(){
    this.setState({
      listOpen: false
    })
  }

  selectItem(e){
    const countryCode = e.target.id
    this.setState({
      listOpen: false
    }, this.props.setCountry(countryCode))
  }

  toggleList(e){
    e.stopPropagation()
    this.setState(prevState => ({
      listOpen: !prevState.listOpen
    }))
  }

  render(){
    const{list,title} = this.props
    const{listOpen} = this.state
    return(
      <div className="dd-wrapper">
        <div className="dd-header" onClick={this.toggleList}>
          <div className="dd-header-title">{title}</div>
          +
        </div>
        {listOpen && <ul className="dd-list" onClick={e => e.stopPropagation()}>
          {list.map((item)=> (
            <li className="dd-list-item" key={item.dialCode} id={item.dialCode} onClick={this.selectItem}><Flag/>{item.name} </li>
          ))}
        </ul>}
      </div>
    )
  }
}

export default Dropdown
