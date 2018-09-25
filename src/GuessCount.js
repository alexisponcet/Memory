import React from 'react';

import './GuessCount.css';

import PropTypes from 'prop-types';


const GuessCount = ( {guesses}) => (
    <div className='guesses'>
        {guesses}
    </div>
)

GuessCount.propType = {
    guesses: PropTypes.string.isRequired,

}

export default GuessCount;