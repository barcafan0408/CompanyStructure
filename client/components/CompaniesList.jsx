import React from 'react';
import Company from './Company.jsx';

import Masonry from 'react-masonry-component';

import './CompaniesList.less';

const CompaniesList = React.createClass({   

	render() {
		const masonryOptions = {
            itemSelector: '.Company',
            columnWidth: 250,
            gutter: 10,
            isFitWidth: true
        };

		return (
            <Masonry
                className='CompaniesList'
                options={masonryOptions}
            >                
                {
                    this.props.companies.map(company =>                        
                        <Company className='Company'
                            key={company.id}
                            name={company.name}
                            annualEarnings={company.annualEarnings}
                            annualEarningsSum={company.annualEarningsSum}
                            last={company.last}
                            level={company.level}
                            onDelete={this.props.onCompanyDelete.bind(null, company)}
                        >                               
                        </Company>
                    )
                }
            </Masonry>
        );
	}
});

export default CompaniesList;