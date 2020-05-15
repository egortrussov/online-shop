import React from 'react'

const InputField = ({ label, handleChange, name, type }) => {

    if (type === 'textarea') return (
        <div className="input-group">
            <label htmlFor="">{ label }</label> 
            <textarea name={ name }  />
        </div>
    )

    return (
        <div className="input-group">
            <label htmlFor="">{ label }</label> 
            <input type={ type } name={ name }  />
        </div>
    )
}

export default InputField
