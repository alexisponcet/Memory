import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import App from './App';
import HallOfFame, {HOF_KEY, saveHOFEntry} from './HallOfFame';

describe('<HallOfFame />', () => {

	// setup
	const FAKE_HOF_TEST = [
		{ id: 0, guesses: 140, date: '13/10/2018', player: 'Alex' },
		{ id: 1, guesses: 145, date: '14/10/2018', player: 'Sarah' },
		{ id: 2, guesses: 143, date: '17/10/2018', player: 'Erwin' },
		{ id: 3, guesses: 144, date: '20/10/2018', player: 'Christophe' },
	]
	const player = 'Clem';

	it('renders a Hall of Fame', () => {
		const wrapper = shallow(<HallOfFame entries={FAKE_HOF_TEST} />);

		expect(wrapper.find('tr')).to.have.length(FAKE_HOF_TEST.length);
	})

	describe('when the player is good enough',() =>{
		it('add the score to the first place of HoF', () => {
			const entry = { guesses: 120, player: player };
			const wrapper = shallow(<App />);
			const instance = wrapper.instance();
			localStorage.setItem(HOF_KEY, []);

			saveHOFEntry(entry, instance.displayHallOfFame);

			const index = instance.state.hallOfFame.findIndex(hof => hof.player === player);
			expect(index).deep.equal(0);
		})

		it('add the score to the second place of HoF', () => {
			const entry = { guesses: 142, player: player };
			const wrapper = shallow(<App />);
			const instance = wrapper.instance();
			localStorage.setItem(HOF_KEY, JSON.stringify(FAKE_HOF_TEST));

			saveHOFEntry(entry, instance.displayHallOfFame);

			const index = instance.state.hallOfFame.findIndex(hof => hof.player === player);
			expect(index).deep.equal(1);
		})
	})

	describe('when the player is not good enough',() => {
		it('do not add the score', () => {
			const entry = { guesses: 200, player: player};
			const wrapper = shallow(<App/>);
			const instance = wrapper.instance();
			localStorage.setItem(HOF_KEY, JSON.stringify(FAKE_HOF_TEST));

			saveHOFEntry(entry, instance.displayHallOfFame);

			const index = instance.state.hallOfFame.findIndex(hof => hof.player === player);
			expect(index).deep.equal(-1);
		})
	})
})