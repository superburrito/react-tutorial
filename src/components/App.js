import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';

class App extends React.Component {
	constructor() {
		super();

		// Bind methods to the component
		this.addFish = this.addFish.bind(this);
		this.updateFish = this.updateFish.bind(this);
		this.removeFish = this.removeFish.bind(this);
		this.loadSamples = this.loadSamples.bind(this);
		this.addToOrder = this.addToOrder.bind(this);
		this.removeFromOrder = this.removeFromOrder.bind(this);
		
		// initial state AKA getInitialState
		this.state = {
			fishes: {}, // synced with Firebase
			order: {} // synced with localStorage
		};
	}

	// runs before App component is rendered
	componentWillMount() {
		this.ref = base.syncState(`${this.props.params.storeId}/fishes`
			,{
				context: this,
				state: 'fishes'
			});

		// check if there is an order in localStorage
		const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);
		if (localStorageRef) {
			this.setState({
				order: JSON.parse(localStorageRef)
			})
		}
	}

	// allows us to perform any necessary cleanup before component is unmounted and destroyed
	componentWillUnmount() {
		base.removeBinding(this.ref);
	}

	// allows us to do something with the updated props and states, before re-render
	componentWillUpdate(nextProps, nextState) {
		localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify(nextState.order));
	}

	// Called in the child component
	addFish(fish) {
		// best practice: first copy current state
		const fishes = Object.assign({}, this.state.fishes);
		// add new fish
		const timestamp = Date.now();
		fishes[`fish-${timestamp}`] = fish;
		// update our state
		this.setState({ fishes: fishes });
	}

	updateFish(key, fish) {
		const fishes = Object.assign({}, this.state.fishes);
		fishes[key] = fish;
		this.setState({ fishes }); 
	}

	removeFish(key) {
		const fishes = Object.assign({}, this.state.fishes);
		fishes[key] = null; // firebase does not allow delete operation
		this.setState({ fishes });
	}

	loadSamples() {
		this.setState({ fishes: sampleFishes });
	}

	addToOrder(key) {
		// copy state
		const order = Object.assign({}, this.state.order);
		// add order
		if (order[key]) {
			order[key] += 1;
		} else {
			order[key] = 1;
		}
		// update state
		this.setState({ order: order });
	}

	removeFromOrder(key) {
		const order = Object.assign({}, this.state.order);
		delete order[key];
		this.setState({ order })
	}

	render() {
		return (
			<div className="catch-of-the-day">
				<div className="menu">
					<Header tagline="Fresh Seafood Market"/> {/*<--insert props*/}
					<ul className="list-of-fishes">
						{
							Object
								.keys(this.state.fishes)
								.map((key) => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder}/>)
						}						
					</ul>
				</div>
				<Order 
					fishes={this.state.fishes} 
					order={this.state.order}
					removeFromOrder={this.removeFromOrder}
					params={this.props.params}
				/>
				<Inventory 
					fishes={this.state.fishes} 
					addFish={this.addFish}
					updateFish={this.updateFish}  
					removeFish={this.removeFish}
					loadSamples={this.loadSamples}
					storeId={this.props.params.storeId}
				/>
			</div>
		)
	}
}

App.propTypes = {
	params: React.PropTypes.object.isRequired
}

export default App;
 