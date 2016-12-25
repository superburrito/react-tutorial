// Import React + CSS modules
import React from 'react'; // String, looks in node_modules
import { render } from 'react-dom';
import { BrowserRouter, Match, Miss } from 'react-router';

// Import styles
import './css/style.css';

// Import components
import App from './components/App';
import StorePicker from './components/StorePicker'; // pass relative path
import NotFound from './components/NotFound';

// ** Our react router is also a component**
const Root = () => {
	return (
		<BrowserRouter>
			<div>
				<Match exactly pattern="/" component={StorePicker}/>
				<Match pattern="/store/:storeId" component={App}/> 
				<Miss component={NotFound}/>
			</div>
		</BrowserRouter>
	)
}

// Render
render(<Root/>, document.getElementById('main'));
 