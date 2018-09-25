import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import GuessCount from './GuessCount';

describe('<GuessCount />', () => {

	// setup
	const guesses = 10;
	const wrapper = shallow(<GuessCount guesses={guesses}/>);

	it('renders the number of tries', () => {
		expect(wrapper).to.contain.text(String(guesses));
	})
})