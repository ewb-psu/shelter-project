/** @format */

import React from 'react';
// import '../Assets/InputLabel.scss';

class InputLabel extends React.Component {
	render() {
		return (
			<div
				id={
					this.props.label.toLowerCase().replace(' ', '-') + '-input-container'
				}
				className='input-container flex flex-wrap w-full'>
				<div
					id={this.props.label.toLowerCase().replace(' ', '-') + '-input-label'}
					className='input-label mr-16'>
					{this.props.label} 
				</div>
				{this.props.children}
			</div>
		);
	}
}

export default InputLabel;
