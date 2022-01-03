import React from 'react'

const Square = ({ value, onClick }) => (
	<button className={(value === 'X') ? 'Square red' : 'Square green'} onClick={onClick}>{value}</button>
)

export default Square