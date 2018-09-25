import React, { Component } from 'react';

import './HighScoreInput.css';

import PropTypes from 'prop-types';
import { saveHOFEntry } from './HallOfFame';

class HighScoreInput extends Component {

	state = {
		winner : '',
	}

	/**
	 * Update the local state with the name of the current player
	 * @param value : the name of the player
	 */
	handleWinnerUpdate = ( {target : {value}}) => {
		this.setState({ winner: value.toUpperCase() });
	}

	/**
	 * Build the new player and store it in the hall of fame
	 * @param event : from the form (disable the default behaviour)
	 */
	persistWinner = (event) => {
		event.preventDefault();
		const newEntry = { guesses: this.props.guesses, player: this.state.winner };
		saveHOFEntry(newEntry, this.props.onStored);
	}

	render() {
		return (
			<form className="highScoreInput" onSubmit={this.persistWinner}>
				<p>
					<label>
						Congratulatation ! Type your username :
						<input type="text"
						       autoComplete="given-name"
						       value = {this.state.winner}
							   onChange={this.handleWinnerUpdate}/>
					</label>
					<button type="submit">Let's go !</button>
				</p>
			</form>
		)
	}
}

HighScoreInput.propTypes = {
	guesses: PropTypes.number.isRequired,
	onStored: PropTypes.func.isRequired,
}

export default HighScoreInput;