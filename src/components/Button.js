import React from 'react'

const Button = ({isActive,clicked}) =>{
    return(
        <div>
            <button onClick={clicked}>{isActive ? "Cargar usuario Nuevo" : "Cargar usuario"}</button>
        </div>
    )
}

export default Button