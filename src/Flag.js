import React, { Component } from 'react'

const Flag =(props)=>{ 
     //Future logic
     // const flag = `https://flag.com/country/${props.name}.png`
     return <img src={props.flag || "https://einfon.com/wp-content/uploads/2017/05/Flag-Of-USA.jpg"} style={{ width: '5%', height: '10%', verticalAlign: 'middle' }} alt='' />
}

export default Flag