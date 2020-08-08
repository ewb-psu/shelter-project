/** @format */

import React, { useContext } from 'react';
import ShelterCard from './shelterCard';
import PropTypes from 'prop-types';
import ApiDataContext from './context/apiData/ApiDataContext';

const Shelters = ({ shelters }) => {

  const apiDataContext = useContext(ApiDataContext)
  console.log(apiDataContext)
	return (
		<div>
			{/* {console.log(shelters)} */}
			<h1> Relevant Shelters </h1>
			<ul className='shetlerList'>
				{apiDataContext.resources &&
					apiDataContext.resources.map((resource) => (
						<li key={resource.Id}>
							<ShelterCard {...resource} />
						</li>
					))}
				{/* {shelters &&
					shelters.map((shelter) => (
						<li key={shelter.Id}>
							<ShelterCard {...shelter} />
						</li>
					))} */}
			</ul>
		</div>
	);
};

export default Shelters;

Shelters.propTypes = {
	shelters: PropTypes.arrayOf(
		PropTypes.shape({
			Id: PropTypes.number,
			Name: PropTypes.string,
			Address: PropTypes.string,
			Website: PropTypes.string,
			Resources: PropTypes.arrayOf(PropTypes.string),
			Contact: PropTypes.string,
		})
	),
};

Shelters.defaultProps = {
	shelters: [],
};
