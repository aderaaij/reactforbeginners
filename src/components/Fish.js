import React from 'react';
import { formatPrice } from '../helpers.js';

class Fish extends React.Component {
    render() {
        const { details, index } = this.props;
        const isAvailable = details.status === 'available';
        const buttonText = isAvailable ? 'Add To Order' : 'Sold out!';
        return (
            <li className="menu-fish">
                <img src={ details.image } alt={ details.name }/>
                <h3>
                    { details.name }
                    <span className="price">{formatPrice(details.price)}</span>
                </h3>
                <p>{details.desc}</p>
                <button onClick={ () => this.props.addToOrder(index) } disabled={ !isAvailable }>{buttonText}</button>
            </li>
        )
    }
}

export default Fish;