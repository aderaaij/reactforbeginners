import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';
import base from '../base';

class App extends React.Component {
    constructor() {
        super();
        this.addFish = this.addFish.bind(this);
        this.updateFish = this.updateFish.bind(this);
        this.loadSamples = this.loadSamples.bind(this);
        this.addToOrder = this.addToOrder.bind(this);
        // Initial state
        this.state = {
            fishes: {},
            order: {},
        };
    }

    componentWillMount() {
        // This runs right before the app is rendered
        this.ref = base.syncState(`${this.props.params.storeId}/fishes`,
            {
                context: this,
                state: 'fishes',
            }
        );

        // Check if there's an order in localStorage
        const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);
        // Update our app component's order state
        if (localStorageRef) {
            this.setState({
                order: JSON.parse(localStorageRef),
            });
        }
    }

    componentWillUpdate(nextProps, nextState) {
        console.log('Something changed');
        console.log({ nextProps, nextState });
        localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify(nextState.order));
    }

    componenetWillUnmount() {
        base.removeBinding(this.ref);
    }

    addFish(fish) {
        const fishes = { ...this.state.fishes }
        // Add in our new fish
        const timeStamp = Date.now();
        fishes[`fish-${timeStamp}`] = fish;
        // Update our state
        // Set state
        this.setState({ fishes })
    }

    updateFish(key, updatedFish) {
        const fishes = { ...this.state.fishes }
        fishes[key] = updatedFish;
        this.setState({ fishes });
    }

    loadSamples() {
        // const self = this;
        // fetch('https://jsonplaceholder.typicode.com/posts')
        //     .then(response => {
        //         console.log('response', response)
        //         return response.json()
        //     }).then(json => {
        //         console.log(json)
        //         this.setState({
        //             fishes: json
        //         });
        //     }).catch(ex => {
        //         console.log('parsing failed', ex)
        //     });
        this.setState({
            fishes: sampleFishes,
        });
    }
    addToOrder(key) {
        // Take a copy of our state
        const order = { ...this.state.order };
        // Update or add new number of fish ordered
        order[key] = order[key] + 1 || 1;
        // Update our state
        this.setState({ order })
    }
    render() {
        // console.log(this);
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Whuut Seafood something" />
                    <ul className="list-of-fishes">
                        {
                            Object.keys(this.state.fishes)
                            .map(key => <Fish key={ key } index={ key } details={ this.state.fishes[key] } addToOrder={this.addToOrder} />)
                        }
                    </ul>
                </div>
                <Order
                    fishes={ this.state.fishes }
                    order={ this.state.order }
                    params={ this.props.params}
                />
                <Inventory
                    addFish={ this.addFish }
                    loadSamples={ this.loadSamples }
                    fishes={ this.state.fishes }
                    updateFish={ this.updateFish }
                />
            </div>
        )
    }
}

export default App;