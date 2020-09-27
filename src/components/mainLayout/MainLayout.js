/** @format */

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../Nav'
import ThemeDataContext from '../context/themeData/ThemeDataContext';
import logo from '../../Assets/211-logo.png';

const MainLayout = (props) => {
	const themeDataContext = useContext(ThemeDataContext);
	console.log(themeDataContext);
	return (
		<>
			<div
				className='w-full flex-none'
				style={{
					height: '20px',
					backgroundImage:
						'linear-gradient(to right, rgba(1, 169, 198, 0.2),rgba(1, 169, 198, 0.8))',
				}}></div>
			<header className=' mx-5 sm:mx-16 lg:mx-32 grid grid-auto-rows grid-cols-4'>
				<div className={` ${themeDataContext.showNav ? 'col-start-1 col-span-4 lg:-col-span-1 row-start-1' : 'col-start-2 col-span-2 row-start-1 flex items-center justify-center' } `}>
					<div className='mx-auto lg:mx-0' style={{ width: '300px' }}>
						<Link to='/'>
							<img className='w-full pt-5' alt='211 logo' src={logo} />
						</Link>
					</div>
				</div>
				<div className=' col-start-1 col-span-4 row-start-2 lg:col-start-2 lg:col-span-3 lg:row-start-1'>
					{themeDataContext.showNav && <Nav />}
				</div>
			</header>

			<main id='m-0 main-container '>{props.children}</main>
		</>
	);
};

export default MainLayout;
