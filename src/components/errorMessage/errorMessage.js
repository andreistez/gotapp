import React from 'react'
import './errorMessage.css'

const ErrorMessage = ( { msg } ) => {
	return <span className="error">{ msg }</span>
}

export default ErrorMessage