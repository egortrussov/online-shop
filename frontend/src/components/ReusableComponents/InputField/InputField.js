import React from 'react'

import './css/style.css'

const InputField = ({ label, onChange, name, type, value }) => {

    if (type === 'textarea' && onChange && value) return (
        <div className="input-group">
            
            <span className="input-label">{ label }</span>
            <textarea onChange={ (e) => onChange(e, name) } name={ name } value={ value || '' }  />
            <label htmlFor={ name }></label> 
        </div>
    )

    if (type === 'textarea') return (
        <div className="input-group">
            
            <span className="input-label">{ label }</span>
            <textarea name={ name }  />
            <label htmlFor={ name }></label> 
        </div>
    )

    if (onChange && value) return (
        <div className="input-group">
            
            <span className="input-label">{ label }</span>
            <input autoComplete={ name === 'email' ? "true" : "false" } onChange={ (e) => onChange(e, name) }  type={ type } name={ name } value={ value || '' }  />
            <label htmlFor={ name }></label> 
        </div>
    )

    return (
        <div className="input-group">
            
            <span className="input-label">{ label }</span>
            <input  autoComplete={ name === 'email' ? "true" : "false" } type={ type } name={ name }  />
            <label htmlFor={ name }></label> 
        </div>
    )
}

export default InputField
