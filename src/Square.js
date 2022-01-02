import React from 'react'

const Square = ({ value, onClick }) => (
	<button className="Square" onClick={onClick}>{value}</button>
)

export default Square