import React from 'react'

import './css/style.css'

const InputField = ({ label, onChange, name, type, value, isMini }) => {

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
        <div className={ `input-group ${ isMini ? 'mini' : '' }` }>
            
            <span className="input-label">{ label }</span>
            <input className={ `${ isMini ? 'mini' : '' }` } autoComplete={ name === 'email' ? "true" : "false" } onChange={ (e) => onChange(e, name) }  type={ type } name={ name } value={ value || '' }  />
            <label htmlFor={ name }></label> 
        </div>
    )

    return (
        <div className="input-group">
            
            <span className="input-label">{ label }</span>
            <input  autoComplete={ name === 'email' ? "on" : "false" } type={ type } name={ name }  />
            <label htmlFor={ name }></label> 
        </div>
    )
}

export default InputField
