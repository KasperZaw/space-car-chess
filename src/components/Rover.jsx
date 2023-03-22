import React from 'react'
import carImage from "../img/rover.png";
const Rover = ({boxRef}) => {
  
    return (
    <div>
        <img src={carImage} alt="car" className="box up"  ref={boxRef}/>
    </div>
  )
}

export default Rover