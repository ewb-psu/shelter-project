/** @format */

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import ThemeDataContext from '../context/themeData/ThemeDataContext';
import logo from '../../Assets/211-logo.png';

const MainLayout = (props) => {
	const themeDataContext = useContext(ThemeDataContext);
	console.log(themeDataContext);
	return (
		<div>
			<div
				className='w-full flex-none'
				style={{
					height: '20px',
					backgroundImage:
						'linear-gradient(to right, rgba(33, 241, 141, 0), #21F18D)',
				}}></div>
			<div className=' mx-5 sm:mx-16 lg:mx-32 grid grid-auto-rows grid-cols-4'>
				<div className='col-start-1 col-span-4 lg:-col-span-1 row-start-1 '>
					<div className='mx-auto lg:mx-0' style={{ width: '300px' }}>
						<Link to='/'>
							{' '}
							<img className='w-full pt-5' alt='211 logo' src={logo} />
						</Link>
					</div>
				</div>
				<div className=' col-start-1 col-span-4 row-start-2 lg:col-start-2 lg:col-span-3 lg:row-start-1'>
					<nav className='lg:w-4/5 lg:ml-auto'>
						<ul className='mt-12 flex p-2 flex-wrap justify-center rounded border shadow text-sm'>
							<Link to='/'>
								{' '}
								<li className='px-5 border  active:bg-green-200 hover:bg-indigo-400 '>
									Home
								</li>
							</Link>
							<Link to='resources'>
								{' '}
								<li className='px-5 border active:bg-green-200 hover:bg-indigo-400'>
									Find Resources
								</li>
							</Link>

							<li className='px-5 border active:bg-green-200 hover:bg-indigo-400'>
								About Us
							</li>
							<li className='px-5 border active:bg-green-200 hover:bg-indigo-400'>
								Our Programs
							</li>
							<li className='px-5 border active:bg-green-200 hover:bg-indigo-400'>
								For Providers
							</li>
							<li className='px-5 border active:bg-green-200 hover:bg-indigo-400'>
								Our Data
							</li>
						</ul>
					</nav>
				</div>
			</div>

			<div id='m-0 main-container '>{props.children}</div>
		</div>
	);
};

export default MainLayout;
