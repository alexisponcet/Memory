import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { spy } from 'sinon';

import Card, {HIDDEN_SYMBOL} from './Card';

describe('<Card/>', () => {

	// setup
	const symbol = "😁";
	const hidden = "hidden";
	const visible = "visible";
	const index = 0;
	const onClick = spy();

	it('should trigger its `onClick` prop when clicked', () => {
		const wrapper_HiddenCard = shallow(
			<Card card={symbol} feedback={hidden} index={index} onClick={onClick} />
		);

		wrapper_HiddenCard.simulate('click');
		expect(onClick).to.have.been.calledWith(index);
		expect(onClick).to.have.been.calledOnceWithExactly(index);
		expect(onClick).to.have.been.calledOnce();
	})

	describe('when the card is hidden', () => {
		it('renders the symbol ?', () => {
			const wrapper_HiddenCard = shallow(
				<Card card={symbol} feedback={hidden} index={index} onClick={onClick} />
			);

			expect(wrapper_HiddenCard.find('.symbol')).to.contain.text(HIDDEN_SYMBOL);
		})
	})

	describe('when the card is visible', () => {
		it('renders the symbol of the card', () => {
			const wrapper_VisibleCard = shallow(
				<Card card={symbol} feedback={visible} index={index} onClick={onClick} />
			);

			expect(wrapper_VisibleCard.find('.symbol')).to.contain.text(symbol);
		})
	})

	it('should match its reference snapshot', () => {
		const wrapper = shallow(
			<Card card="😁" feedback="hidden" index={0} onClick={onClick} />
		);

		expect(wrapper).to.matchSnapshot();
	})
})