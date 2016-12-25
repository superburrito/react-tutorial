import React from 'react';

// Examples of a stateless functional component
// "Component with no methods other than render() {...}" -Wes Bos  
const Header = (props) => {
	return (
		<header className="top">
			<h1>
				Catch 
				<span className="ofThe">
					<span className="of">of</span>
					<span className="the">the</span>
				</span>
				Day
			</h1>
			<h3 className="tagline">
				<span>{props.tagline}</span>
			</h3>
		</header>
	)
}


Header.propTypes = {
	// we type-check for passed properties and make them REQUIRED
	tagline: React.PropTypes.string.isRequired 
}

export default Header;
