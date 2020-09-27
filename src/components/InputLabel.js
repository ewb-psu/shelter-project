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
				className='input-container grid grid-auto-rows grid-cols-4'>
				<label
					id={this.props.label.toLowerCase().replace(' ', '-') + '-input-label'}
					htmlFor={this.props.label.toLowerCase().replace(' ', '-') + '-input'}
					className='input-label col-start-1 col-span-2 lg:col-start-2 lg:col-span-1'text-center>
					{this.props.label}
				</label>
				<div className='col-start-1 col-span-4 lg:col-start-3 lg:col-span-2 row-start-2 lg:row-start-1 '>{this.props.children}</div>
			</div>
		);
	}
}

export default InputLabel;
