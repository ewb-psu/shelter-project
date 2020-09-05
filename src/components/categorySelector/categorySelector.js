/** @format */

import React, { useState, useContext, useEffect } from 'react';
import ExclusiveOption from '../ExclusiveOption';
import ApiDataContext from '../context/apiData/ApiDataContext';
import FieldSelectorContext from '../context/fieldSelectorContext/FieldSelectorContext';
import ThemeDataContext from '../context/themeData/ThemeDataContext';

const CategorySelector = () => {
	const apiDataContext = useContext(ApiDataContext);
	const fieldSelectorContext = useContext(FieldSelectorContext);
	const themeDataContext = useContext(ThemeDataContext);
	const [categories, setCategories] = useState([]);
	const [keys, setKeys] = useState([]);
	const handleSetKeys = (keyValue) => {
		setKeys([...keys, keyValue]);
	};

	useEffect(() => {
		const labelsWithImages = createLabelWithImage(
			apiDataContext.categories,
			'category'
		);
		setCategories([labelsWithImages]);

		//look for categories in localStorage. if its there, use it to determine which tier of buttons should be expanded or collapsed when navigating backwards..
		if (JSON.parse(localStorage.getItem('categories')))
			setCategories(JSON.parse(localStorage.getItem('categories')));

		if (JSON.parse(localStorage.getItem('keys')))
			setKeys(JSON.parse(localStorage.getItem('keys')));
	}, []);


	//categoryType needs to be 'category' or 'subcategory'
	const createLabelWithImage = (array, categoryType) => {
		const svgPathEndings =
			themeDataContext.themeColor === 'light' ? '-black.svg' : '-white.svg';
		let objArray = [];
		for (const item of array) {
			let obj = {};
			obj['label'] = item[categoryType];
			obj['image'] = '../dog' + svgPathEndings;
			objArray.push(obj);
		}
		return objArray;
	};

	//TODO need to make menu collapse back down to first button row
	//TODO change second and third row UI/UX
	const appendCategory = (row, id) => {
		let newCategory = categories.slice();
		//remove subCategories and keys if user clicks at a higher level of the tree
		for (let i = row; i < categories.length -1 ; i++) {
			newCategory.pop(); 
			keys.pop();	
		}

		//keep options from growing
		if (row >= 2) {
			localStorage.setItem('categories', JSON.stringify(categories));
			localStorage.setItem('keys', JSON.stringify(keys));

			fieldSelectorContext.setCategoryId('');
			fieldSelectorContext.setCategorySelected(3);

			return;
		}

		//Category has been selected. Show subcategory
		if (row === 0) {
			newCategory[row + 1] = createLabelWithImage(
				apiDataContext.categories[id]['subcat'],
				'subcategory'
			);
			setCategories(newCategory);
			handleSetKeys(id);
			localStorage.setItem('categories', JSON.stringify(newCategory));
			localStorage.setItem('keys', JSON.stringify(keys));
			fieldSelectorContext.setCategoryId(
				apiDataContext.categories[id]['categoryID']
			);
			fieldSelectorContext.setCategorySelected(1);
		}
		//subcategory has been selectd. Show subbestCategory.
		else {
			try {
				newCategory[row + 1] = createLabelWithImage(
					apiDataContext.categories[keys[0]]['subcat'][id]['subcatterm'],
					'sterm'
				);
				setCategories(newCategory);
				localStorage.setItem('categories', JSON.stringify(newCategory));
				localStorage.setItem('keys', JSON.stringify(keys));
				fieldSelectorContext.setCategoryId(
					apiDataContext.categories[keys[0]]['subcat'][id]['subcategoryID']
				);
				fieldSelectorContext.setCategoryId(
					apiDataContext.categories[keys[0]]['subcat'][id]['subcategoryID']
				);
				handleSetKeys(id);
				fieldSelectorContext.setCategorySelected(2);
				fieldSelectorContext.setButtonState({
					...fieldSelectorContext.buttonState,
					subCat: [
						{
							...fieldSelectorContext.buttonState.subCat[0],
							subCatTerm: [{ sterm: null }],
						},
					],
				});
			} catch (error) {
				console.log(
					apiDataContext.categories[id]['subcat'] +
						'does not have subCategories ' +
						error
				);
			}
		}
	};

	const handleScrollResourcesLeft = (e) => {
		console.log('trigger left', e.target)
		if(e.target.id === 'scrollLeft0') {
			const noScroll = document.querySelector('.no-scroll0')
			console.log(noScroll)
			noScroll.scrollBy(-50, 0)
		} else if(e.target.id === 'scrollLeft1') {
			const noScroll = document.querySelector('.no-scroll1')
			console.log(noScroll)
			noScroll.scrollBy(-50, 0)
		} else {
			const noScroll = document.querySelector('.no-scroll2')
			console.log(noScroll)
			noScroll.scrollBy(-50, 0)
		}
	}
	const handleScrollResourcesRight = (e) => {
		console.log('trigger right', e.target)
		if(e.target.id === 'scrollRight0') {
			const noScroll = document.querySelector('.no-scroll0')
			console.log(noScroll)
			noScroll.scrollBy(50, 0)
		} else if(e.target.id === 'scrollRight1') {
			const noScroll = document.querySelector('.no-scroll1')
			console.log(noScroll)
			noScroll.scrollBy(50, 0)
		} else {
			const noScroll = document.querySelector('.no-scroll2')
			console.log(noScroll)
			noScroll.scrollBy(50, 0)
		}
	}

	return categories.map((categories, i) => (
		<div className='grid grid-auto-rows grid-cols-12'>
			<div id={`scrollLeft${i}`} className='col-start-1 col-span-1 flex justify-center items-center cursor-pointer' onClick={handleScrollResourcesLeft}>
				{'<'}
			</div>
			<div className='col-start-2 col-span-10'>

			<ExclusiveOption
				items={categories}
				appendCategory={appendCategory}
				key={i}
				row={i}
			/>
			</div>
			<div id={`scrollRight${i}`} className='col-start-12 col-span-1 flex justify-center items-center cursor-pointer' onClick={handleScrollResourcesRight}>
				{'>'}
			</div>
		</div>
	));
};

export default CategorySelector;
