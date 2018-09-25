import React, { Component } from 'react';
import shuffle from 'lodash.shuffle';

import './App.css';

import Card from './Card';
import GuessCount from './GuessCount';
import HallOfFame from './HallOfFame';
import HighScoreInput from './HighScoreInput';

export const SIDE = 8;
export const SYMBOLS = '🍞🥐🥖🥞🧀🍖🍗🥓🍔🍟🍕🌭🌮🌯🥙🥚🍳🥘🍲🥗🍿🍇🍈🍉🍊🍋🍌🍍🍎🍏🍐🍑';
export const VISUAL_PAUSE_MSECS = 750;

class App extends Component {

	state = {
		cards: this.generateCards(),
		currentPair: [],
		guesses: 0,
		hallOfFame: null,
		matchedCardIndices: [],
	}

	/**
	 * Initialize the array of hidden cards
	 * @returns Array : the array of hidden cards (shuffled)
	 */
    generateCards() {
        const result = [];
        const size = SIDE * SIDE;
        const candidates = shuffle(SYMBOLS);
        while (result.length < size) {
            const card = candidates.pop();
            result.push(card, card);
        }
        return shuffle(result);
    }

	/**
	 * Check if the player has chosen 2 cards
	 * @param index : the index of the last clicked card
	 */
    handleCardClick = index => {
        const { currentPair } = this.state;

        if (currentPair.length === 2) {
            return;
        }

        if (currentPair.length === 0) {
            this.setState({ currentPair: [index] });
            return;
        }

        this.handleNewPairClosedBy(index);
    }

	/**
	 * Check if the player has found a pair of cards
	 * @param index : the index of the last clicked card
	 */
	handleNewPairClosedBy(index){
		const { cards, currentPair, guesses, matchedCardIndices } = this.state;

		const newGuesses = guesses + 1;
		const newPair = [currentPair[0], index];
		const matched = (cards[newPair[0]] === cards[newPair[1]]
							&& newPair[0] !== newPair[1]);
		this.setState({guesses : newGuesses, currentPair : newPair});
		if (matched){
			this.setState({matchedCardIndices: [...matchedCardIndices, ...newPair]});
		}
		setTimeout(() => this.setState({ currentPair: [] }), VISUAL_PAUSE_MSECS);
	}

	/**
	 * Check the state of the card
	 * @param index : the index of the card
	 * @returns String : the state of the card
	 */
	getFeedbackForCard(index) {
        const { currentPair, matchedCardIndices } = this.state;
        const indexMatched = matchedCardIndices.includes(index);

        if (currentPair.length < 2) {
            return indexMatched || index === currentPair[0] ? 'visible' : 'hidden';
        }

        if (currentPair.includes(index)) {
            return indexMatched ? 'justMatched' : 'justMismatched';
        }

        return indexMatched ? 'visible' : 'hidden';
    }

	/**
	 * Display the hall of fame
	 * @param hallOfFame : the hall of fame after being updated
	 */
	displayHallOfFame = (hallOfFame) => {
		this.setState({ hallOfFame });
	}

    render() {
        const { cards, guesses, hallOfFame, matchedCardIndices } = this.state;
        const won = matchedCardIndices.length === cards.length;
        return (
            <div className="memory">
                <GuessCount guesses = {guesses} />
                {cards.map((card, index) =>
                    <Card card={card}
                          feedback={this.getFeedbackForCard(index)}
                          index={index}
                          key={index}
                          onClick={this.handleCardClick}
                    />
                )}
	            {
		            won &&
		            (hallOfFame ? (
			            <HallOfFame entries={hallOfFame} />
		            ) : (
			            <HighScoreInput guesses={guesses} onStored={this.displayHallOfFame} />
		            ))
	            }
            </div>
        )
    }
}

export default App;