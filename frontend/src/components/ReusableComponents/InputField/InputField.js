import React from 'react'

const InputField = ({ label, onChange, name, type, value }) => {

    if (type === 'textarea' && onChange && value) return (
        <div className="input-group">
            <label htmlFor="">{ label }</label> 
            <textarea onChange={ (e) => onChange(e, name) } name={ name } value={ value || '' }  />
        </div>
    )

    if (type === 'textarea') return (
        <div className="input-group">
            <label htmlFor="">{ label }</label> 
            <textarea name={ name }  />
        </div>
    )

    if (onChange && value) return (
        <div className="input-group">
            <label htmlFor="">{ label }</label> 
            <input onChange={ (e) => onChange(e, name) }  type={ type } name={ name } value={ value || '' }  />
        </div>
    )

    return (
        <div className="input-group">
            <label htmlFor="">{ label }</label> 
            <input  type={ type } name={ name }  />
        </div>
    )
}

export default InputField
