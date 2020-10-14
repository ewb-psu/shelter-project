/** @format */

import React from 'react';
import { Link } from 'react-router-dom'
const Nav = () => {
	return (
		<nav className='w-full flex flex-wrap'>
			<ul className='mt-12 xl:ml-32 flex p-2 flex-wrap justify-center text-sm space-x-3 '>
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
			<button className='mt-12 border border-orange-600 rounded-full px-5 mx-auto lg:ml-auto lg:mx-0 hover:bg-orange-600 text-orange-600 hover:text-white'>Donate</button>
		</nav>
	);
};

export default Nav;
