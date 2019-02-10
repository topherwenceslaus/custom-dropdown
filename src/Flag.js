import React, { Component } from 'react'

const Flag =(props)=>{ console.log(props)
     return <img src={props.flag} style={{ width: '5%', height: '10%', verticalAlign: 'middle' }} alt='' />
}

export default Flag