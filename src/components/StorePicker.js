import React from 'react';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
    // constructor() {
    //     super();
    //     this.goToStore = this.goToStore.bind(this);
    // }
    goToStore(event) {
        event.preventDefault();
        // First grab text from input
        const storeId = this.storeInput.value;
        console.log(`Going to ${storeId}`)
        // Second transition from /  to /store/store:id
        this.context.router.transitionTo(`store/${storeId}`);
    }
    render() {
        return (
            <form className="store-selector" onSubmit={(e) => this.goToStore(e)}>
                <h2>Please enter a store</h2>
                <input type="text" required placeholder="Store Name" defaultValue={getFunName()} ref={(input) => { this.storeInput = input }}/>
                <button type="submit">Visit Store ➡️</button>
            </form>
        )
    }
}

StorePicker.contextTypes = {
    router: React.PropTypes.object
}

export default StorePicker;