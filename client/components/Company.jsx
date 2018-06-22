import React from 'react';

import './Company.less';

const Company = React.createClass({

	render() {		
        return (
            <div className='Company' >
                <span className='Company_del-icon' onClick={this.props.onDelete}> × </span>                
                <div className='Company_text' style={{paddingLeft: this.props.level*5+'px'}}> {'-'.repeat(this.props.level)} {this.props.name} | {this.props.annualEarnings}$ {this.props.last ? '' : ' | ' + this.props.annualEarningsSum + '$'}
                </div>
            </div>
        );
	}
});

export default Company;