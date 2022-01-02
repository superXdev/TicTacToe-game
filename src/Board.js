import React, { Component } from 'react'

import Square from './Square'

const calculateWinner = (squares) => {
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],

		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],

		[0, 4, 8],
		[2, 4, 6],
	]

	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i]

		if(
			squares[a] &&
			squares[a] === squares[b] &&
			squares[a] === squares[c]
		) {
			return squares[a]
		}
	}

	return ''
}

class Board extends Component {
	state = {
		squares: ['', '', '', '', '', '', '', '', ''],
		isXTurn: true,
		histories: []
	}

	handleClick = number => () => {
		if(this.state.squares[number] || calculateWinner(this.state.squares)) {
			return
		}

		const newSquares = [...this.state.squares]
		const newHistory = this.state.histories
		const mark = (this.state.isXTurn) ? 'X' : 'O'

		newSquares[number] = mark
		let row, column
		if(number < 3) {
			row = 1
			column = number + 1
		} else if(number < 6) {
			row = 2
			column = (number + 1) - 3
		} else {
			row = 3
			column = (number + 1) - 6
		}

		newHistory[newHistory.length] = {mark: mark, column: column, row: row}

		this.setState({
			squares: newSquares,
			isXTurn: !this.state.isXTurn,
			histories: newHistory
		})
	}

	handleReset = () => {
		this.setState({
			squares: [],
			isXTurn: true,
			histories: []
		})
	}

	render() {
		const { squares } = this.state

		const winner = calculateWinner(this.state.squares)

		

		return(
			<div className="Board">
				<h1>{(winner) ? `The winner is ${winner}` : ''}</h1>
				<h2>Next turn: {(this.state.isXTurn) ? 'X' : 'O'}</h2>
				<div className="row">
					<Square value={squares[0]} onClick={this.handleClick(0)} />
					<Square value={squares[1]} onClick={this.handleClick(1)} />
					<Square value={squares[2]} onClick={this.handleClick(2)} />
				</div>
				<div className="row">
					<Square value={squares[3]} onClick={this.handleClick(3)} />
					<Square value={squares[4]} onClick={this.handleClick(4)} />
					<Square value={squares[5]} onClick={this.handleClick(5)} />
				</div>
				<div className="row">
					<Square value={squares[6]} onClick={this.handleClick(6)} />
					<Square value={squares[7]} onClick={this.handleClick(7)} />
					<Square value={squares[8]} onClick={this.handleClick(8)} />
				</div>
				<button className="reset" onClick={this.handleReset}>Reset</button>
				<h3>History</h3>
				<ol>
					{this.state.histories.map((data, index) => {
						return <li key={index}>{data.mark} => column: {data.column}, row: {data.row}</li>
					})}
				</ol>
			</div>
		)
	}
}

export default Board