import React from 'react';
import { getFunName } from '../helpers.js';

class StorePicker extends React.Component {

	// Non-render methods are not bound to the component
	goToStore(e) { // e for Event
		e.preventDefault(); // prevents auto-refresh on form submission
		console.log("URL was changed.");
		// first grab text from the box
		const storeId = this.storeInput.value;
		// transition URL from / to /store/:storeId
		console.log(`Going to ${storeId}`);
		this.context.router.transitionTo(`/store/${storeId}`);
	}

	// Render method is bound to the component (i.e. StorePicker)
	render() {
		return (
			<form className="store-selector" onSubmit={(e) => this.goToStore(e)}> 
				<h2>Please Enter A Store</h2>
				<input type="text" required placeholder="Store Name" defaultValue={getFunName()} ref={(input) => {this.storeInput = input}} />
				<button type="submit">Visit Store -></button> 
			</form>
	 	)
	}
}

/* Use contextTypes to "pull" router from the parent component 
   it will then be used as this.storeInput */
StorePicker.contextTypes = {
	router: React.PropTypes.object
}

export default StorePicker;

