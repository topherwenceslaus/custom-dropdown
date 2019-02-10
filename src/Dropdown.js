import React, { Component } from 'react'
import Flag from './Flag'
import './Global.css'
class Dropdown extends Component{
  constructor(props){
    super(props)
    this.state = {
      listOpen: false,
      headerTitle: this.props.title
    }
    this.close = this.close.bind(this)
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

  selectItem(title, id, stateKey , code){
    this.setState({
      headerTitle: title,
      listOpen: false
    }, this.props.resetThenSet(id, stateKey , title, code))
  }

  toggleList(e){
      e.stopPropagation()
    this.setState(prevState => ({
      listOpen: !prevState.listOpen
    }))
  }

  render(){
    const{list} = this.props
    const{listOpen, headerTitle} = this.state
    return(
      <div className="dd-wrapper">
        <div className="dd-header" onClick={(e) => this.toggleList(e)}>
          <div className="dd-header-title">{headerTitle}</div>
          +
        </div>
        {listOpen && <ul className="dd-list" onClick={e => e.stopPropagation()}>
          {list.map((item)=> (
            <li className="dd-list-item" key={item.id} onClick={() => this.selectItem(item.title, item.id, item.key , item.code)}><Flag flag={item.flag}/>{item.title} </li>
          ))}
        </ul>}
      </div>
    )
  }
}

export default Dropdown