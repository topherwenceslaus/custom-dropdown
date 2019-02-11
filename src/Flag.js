import React, { Component } from 'react'

const Flag =(props)=>{ 
     return <img src={props.flag || "https://einfon.com/wp-content/uploads/2017/05/Flag-Of-USA.jpg"} style={{ width: '5%', height: '10%', verticalAlign: 'middle' }} alt='' />
}

export default Flag