/** @format */

import React from 'react';
import { Link } from 'react-router-dom'
const Nav = () => {
	return (
		<nav className='lg:w-4/5 lg:ml-auto'>
			<ul className='mt-12 flex p-2 flex-wrap justify-center rounded border shadow text-sm'>
					{' '}
					<li className='px-5 border  active:bg-themeTealFlat hover:bg-themeTeal'>
						<a href='https://www.211info.org/'>Home</a>
					</li>
				<Link to='/resources'>
					{' '}
					<li className='px-5 border active:bg-themeTealFlat hover:bg-themeTeal'>
						Find Resources
					</li>
				</Link>

				<li className='px-5 border active:bg-themeTealFlat hover:bg-themeTeal'>
					<a href='https://www.211info.org/about'>
					About Us
					</a>
				</li>
				<li className='px-5 border active:bg-themeTealFlat hover:bg-themeTeal'>
					<a href='https://www.211info.org/programs'>
					Our Programs
					</a>
				</li>
				<li className='px-5 border active:bg-themeTealFlat hover:bg-themeTeal'>
					<a href='http://www.navigateresources.net/info/Request.aspx'>
					For Providers
					</a>
				</li>
				<li className='px-5 border active:bg-themeTealFlat hover:bg-themeTeal'>
					<a href='https://www.211info.org/reporting'>
					Our Data
					</a>
				</li>
			</ul>
		</nav>
	);
};

export default Nav;
