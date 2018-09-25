import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import App, {SIDE, SYMBOLS, VISUAL_PAUSE_MSECS} from './App';
import GuessCount from './GuessCount';
import Card from './Card';
import HallOfFame from './HallOfFame';
import HighScoreInput from './HighScoreInput';

describe('<App />', () => {

	describe('Structure App', () => {
		// Initial State : won === false
		describe('when starting a game', () => {
			const wrapper = shallow(<App/>);

			it('has a guessCount with 0', () => {
				expect(wrapper).to.have.descendants(GuessCount);

				expect(wrapper.find(GuessCount)).to.have.prop('guesses').deep.equal(0);
			})

			it('has 36 cards', () => {
				expect(wrapper.find(Card)).to.have.lengthOf(SIDE * SIDE);
			})
		})

		// Final State : won === true
		describe('when finishing a game', () => {

			describe('when first one', () => {
				const wrapper = shallow(<App/>);
				const guesses = 20;
				wrapper.setState({matchedCardIndices : [], cards : [], hallOfFame : null, guesses : 20});

				it('has new HighScoreInput', () => {
					// callback
					expect(wrapper).to.have.descendants(HighScoreInput);
					expect(wrapper.find(HighScoreInput)).to.have.prop('guesses').deep.equal(guesses);
				})
			})

			describe('when not first one', () => {
				const wrapper = shallow(<App/>);
				const hallOfFame = [{id: 0, guesses: 22, date: '08/09/2018', player: 'Jane' }];
				wrapper.setState({matchedCardIndices : [], cards : [], hallOfFame : hallOfFame});

				it('has Hall of Fame', () => {
					expect(wrapper).to.have.descendants(HallOfFame);
					expect(wrapper.find(HallOfFame)).to.have.prop('entries').deep.equal(hallOfFame);
				})
			})
		})
	})

	describe('when a card is clicked', () => {
		const stub = sinon.stub(App.prototype, 'generateCards')
			.returns([...SYMBOLS.repeat(2)]);
		const wrapper = shallow(<App/>);
		const instance = wrapper.instance();
		const firstCard = 0, secondCard = 1, thirdCard = 2;
		const firstCardMatched = (SIDE*SIDE)/2 + firstCard;

		it('add the first card in the current list of cards', () => {
			wrapper.setState({guesses : 0, currentPair: []});

			instance.handleCardClick(firstCard);

			expect(JSON.stringify(wrapper.state().currentPair)).to.equal(JSON.stringify([firstCard]));
		})

		it('add the second card in the current list of cards and ' +
			'do not match with the first one', () => {
			wrapper.setState({guesses : 0, currentPair: [firstCard]});

			instance.handleCardClick(secondCard);

			expect(JSON.stringify(wrapper.state().currentPair)).to.equal(JSON.stringify([firstCard, secondCard]));
			expect(wrapper.state().guesses).to.equal(1);
		})

		it('add the second card in the current list of cards and ' +
			'match with the first one', () => {
			wrapper.setState({guesses : 0, currentPair: [firstCard]});

			instance.handleCardClick(firstCardMatched);

			expect(JSON.stringify(wrapper.state().matchedCardIndices)).to.equal(JSON.stringify([firstCard, firstCardMatched]));
			expect(wrapper.state().guesses).to.equal(1);
		})

		it('do not add the third card in the current list of card', () => {
			wrapper.setState({guesses : 0, currentPair: [firstCard, secondCard]});

			instance.handleCardClick(thirdCard);

			expect(wrapper.state().currentPair).to.length(2);
		})

		it('reset current list of cards after 750ms', () => {
			const clock = sinon.useFakeTimers();
			const wrapper = shallow(<App/>);

			wrapper.instance().handleNewPairClosedBy(thirdCard);
			clock.tick(VISUAL_PAUSE_MSECS);

			expect(wrapper.state().currentPair).to.length(0);
			clock.restore();
		})

		it('should match its reference snapshot', () => {
			expect(wrapper).to.matchSnapshot();
			stub.restore();
		})
	})
})