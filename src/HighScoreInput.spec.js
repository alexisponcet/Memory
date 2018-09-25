import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import App from './App';
import HighScoreInput from './HighScoreInput';

describe('<HighScoreInput />', () => {

	// setup
	const guesses = 38;
	const winner = "Alexis";

	it('renders the name of the winner', () => {
		const wrapperApp = shallow(<App />);
		const wrapper = shallow(
			<HighScoreInput guesses={guesses} onStored={wrapperApp.instance().displayHallOfFame}/>
		);
		wrapper.setState({winner : winner});

		expect(wrapper.find('input')).to.have.prop('value').deep.equal(winner);
	})

	it('should trigger its `onChange` prop when changed and set the name of' +
		' the winner', () => {
		const wrapperApp = shallow(<App />);
		const wrapper = shallow(
			<HighScoreInput guesses={guesses} onStored={wrapperApp.instance().displayHallOfFame}/>
		);
		const input_wrapper = wrapper.find('input');

		const mockedEvent = {target: {value : winner}};
		input_wrapper.simulate('change', mockedEvent);
		expect(wrapper.state().winner).to.equal(winner.toUpperCase());
	})

	it('should persist the name of the winner', () => {
		const wrapperApp = shallow(<App />);
		const wrapper = shallow(
			<HighScoreInput guesses={guesses} onStored={wrapperApp.instance().displayHallOfFame}/>
		);
		const form_wrapper = wrapper.find('form');
		const mockedEvent = { preventDefault: () => {target: {value : winner}} };

		form_wrapper.simulate('submit', mockedEvent);
	})
})