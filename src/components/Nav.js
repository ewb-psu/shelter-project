/** @format */

import React from 'react';
import { Link } from 'react-router-dom'
const Nav = () => {
	return (
		<nav className=''>
			<ul className='mt-12 flex flex-wrap justify-center text-sm space-x-3 '>
				<Link to='/'>
					{' '}
					<li className=' font-medium  active:bg-themeTealFlat hover:text-themeTeal'>
						Home
					</li>
				</Link>
				<Link to='resources'>
					{' '}
					<li className=' font-medium bold active:bg-themeTealFlat hover:text-themeTeal'>
						Find Resources
					</li>
				</Link>

				<li className=' font-medium bold active:bg-themeTealFlat hover:text-themeTeal'>
					About Us
				</li>
				<li className=' font-medium bold active:bg-themeTealFlat hover:text-themeTeal'>
					Our Programs
				</li>
				<li className=' font-medium bold active:bg-themeTealFlat hover:text-themeTeal'>
					For Providers
				</li>
				<li className=' font-medium bold active:bg-themeTealFlat hover:text-themeTeal'>
					Our Data
				</li>
			</ul>
		</nav>
	);
};

export default Nav;
