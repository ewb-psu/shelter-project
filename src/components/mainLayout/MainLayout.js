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
			<div className='grid grid-auto-rows grid-cols-3'>
				<div className=' col-start-1 col-span-3 lg:-col-span-1  row-start-1 '>
					<div className='mx-auto lg:ml-16' style={{ width: '300px' }}>
						<Link to='/'>
							{' '}
							<img className='w-full pl-5 pt-5' alt='211 logo' src={logo} />
						</Link>
					</div>
				</div>
				<div className=' col-start-1 col-span-3 row-start-2 lg:col-start-2 lg:col-span-2 lg:row-start-1'>
				<nav className=''>
					<ul className='flex  mt-10 mr-16 flex-wrap justify-center rounded shadow'>
						<li className='pr-5 pl-2'>
							<Link to='/'>Home</Link>
						</li>
						<li className='px-5'>
							<Link to='resources'> Find Resources</Link>
						</li>
						<li className='px-5'>About Us</li>
						<li className='px-5'>Our Programs</li>
						<li className='px-5'>For Providers</li>
						<li className='pl-5 pr-2'>Our Data</li>
					</ul>
				</nav>
				</div>
			</div>
			{/* 
			<div className='flex' style={{ height: '15vh', width: '100vw' }}>
				<div className='flex-none' style={{ width: '300px' }}>
					<Link to='/'>
						{' '}
						<img className='w-full pl-5 pt-5' alt='211 logo' src={logo} />
					</Link>
				</div>
				<nav className='flex-grow flex items-center justify-center'>
					<ul className='flex justify-center rounded shadow'>
						<li className='pr-5 pl-2'>
							<Link to='/'>Home</Link>
						</li>
						<li className='px-5'>
							<Link to='resources'> Find Resources</Link>
						</li>
						<li className='px-5'>About Us</li>
						<li className='px-5'>Our Programs</li>
						<li className='px-5'>For Providers</li>
						<li className='pl-5 pr-2'>Our Data</li>
					</ul>
				</nav>
			</div> */}

			{/* <div className={'app ' + themeDataContext.themeColor}>
				<div id='left-gutter-container'> */}
			{/* <button
						className=''
						onClick={(e) =>
							themeDataContext.setThemeColor(
								themeDataContext.themeColor === 'light' ? 'dark' : 'light'
							)
						}>
						Swap Theme
					</button> */}
			{/* </div> */}

			<div id='m-0 main-container '>{props.children}</div>
			{/* // </div> */}
		</div>
	);
};

export default MainLayout;
