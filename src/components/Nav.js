/** @format */

import React from 'react';
import { Link } from 'react-router-dom'
const Nav = () => {
	return (
		<nav className='lg:w-4/5 lg:ml-auto'>
			<ul className='mt-12 flex p-2 flex-wrap justify-center rounded border shadow text-sm'>
				<Link to='/'>
					{' '}
					<li className='px-5 border  active:bg-themeTealFlat hover:bg-themeTeal'>
						Home
					</li>
				</Link>
				<Link to='resources'>
					{' '}
					<li className='px-5 border active:bg-themeTealFlat hover:bg-themeTeal'>
						Find Resources
					</li>
				</Link>

				<li className='px-5 border active:bg-themeTealFlat hover:bg-themeTeal'>
					About Us
				</li>
				<li className='px-5 border active:bg-themeTealFlat hover:bg-themeTeal'>
					Our Programs
				</li>
				<li className='px-5 border active:bg-themeTealFlat hover:bg-themeTeal'>
					For Providers
				</li>
				<li className='px-5 border active:bg-themeTealFlat hover:bg-themeTeal'>
					Our DATA
				</li>
			</ul>
		</nav>
	);
};

export default Nav;
