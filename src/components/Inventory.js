import React from 'react';
import AddFishForm from './AddFishForm';
import base from '../base';

class Inventory extends React.Component {
    constructor() {
        super();
        this.renderInventory = this.renderInventory.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.renderLogin = this.renderLogin.bind(this);
        this.authenticate = this.authenticate.bind(this);
        this.authHandler = this.authHandler.bind(this);
        this.logOut = this.logOut.bind(this);
        this.state = {
            uid: null,
            owner: null,
        }
    }

    componentDidMount() {
        base.onAuth((user) => {
            if (user) {
                this.authHandler(null, { user });
            }
        });
    }

    handleChange(e, key) {
        const fish = this.props.fishes[key];
        // Take a copy of the fish and update with new data
        const updatedFish = {
            ...fish,
            [e.target.name]: e.target.value
        }
        this.props.updateFish(key, updatedFish);
        console.log(updatedFish);
    }

    authenticate(provider) {
        console.log(`Trying to login with ${provider}`);
        base.authWithOAuthPopup(provider, this.authHandler);
    }

    logOut() {
        base.unauth();
        this.setState({ uid: null, })
    }

    authHandler(err, authData) {
        console.log(authData);
        if (err) {
            console.error(err);
            return;
        }

        // grab store info
        const storeRef = base.database().ref(this.props.storeId);

        // Query FireBase once for stored date
        storeRef.once('value', (snapshot) => {
            const data = snapshot.val() || {};

            if (!data.owner) {
                storeRef.set({
                    owner: authData.user.uid,
                })
            }

            this.setState({
                uid: authData.user.uid,
                owner: data.owner || authData.user.uid,
            });
        });

    }

    // Grab store info

    renderLogin() {
        return (
            <nav className="login">
                <h2>Inventory</h2>
                <p>Sign in to manage your store's inventory</p>
                <button className="github" onClick={ () => this.authenticate('github') }>Github</button>
                <button className="facebook" onClick={ () => this.authenticate('facebook') }>Facebook</button>
                <button className="twitter" onClick={ () => this.authenticate('twitter') }>Twitter</button>
            </nav>
        )
    }

    renderInventory(key) {
        const fish = this.props.fishes[key];
        return (
            <div className="fish-edit" key={key}>
                <input type="text" name="name" value={ fish.name } placeholder="Fish Name" onChange={ (e) => this.handleChange(e, key) }/>
                <input type="text" name="price" value={ fish.price } placeholder="Fish Price" onChange={ (e) => this.handleChange(e, key) }/>
                <select type="text" name="status" value={ fish.status } placeholder="Fish Status" onChange={ (e) => this.handleChange(e, key) }>
                    <option value="available">Fresh!</option>
                    <option value="unavailable">Sold Out!</option>
                </select>
                <textarea name="desc" value={ fish.desc } placeholder="Fish Desc" onChange={ (e) => this.handleChange(e, key) }></textarea>
                <input type="text" name="image" value={ fish.image } placeholder="Fish Image" onChange={ (e) => this.handleChange(e, key) }/>
                <button onClick={ () => this.props.removeFish(key) }>Remove Fish</button>
            </div>
        )
    }

    render() {
        const logout = <button onClick={ this.logOut }>Log Out!</button>
         // Check if user is not logged in
        if (!this.state.uid) {
            return <div>{ this.renderLogin() }</div>
        }

        // Check if user is owner of current store
        if (this.state.uid !== this.state.owner) {
            return (
                <div>
                    <p>Sorry, you aren't the owner of this store.</p>
                    { logout }
                </div>
            )
        }

        return (
            <div>
                <h2>Inventory</h2>
                { logout }
                { Object.keys(this.props.fishes).map(this.renderInventory) }
                <AddFishForm addFish={this.props.addFish}/>
                <button onClick={ this.props.loadSamples }>Load sample fishes</button>
            </div>
        )
    }

    static propTypes = {
        fishes: React.PropTypes.object.isRequired,
        updateFish: React.PropTypes.func.isRequired,
        addFish: React.PropTypes.func.isRequired,
        loadSamples: React.PropTypes.func.isRequired,
        removeFish: React.PropTypes.func.isRequired,
        storeId: React.PropTypes.string.isRequired,
    };
}

export default Inventory;