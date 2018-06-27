import React from 'react';

import './EditCompany.less';

const EditCompany = React.createClass({

    getInitialState() {
        return {
            name: this.props.company.name,
            annualEarnings: this.props.company.annualEarnings
        };
    },

    componentWillReceiveProps(nextProps) {
        this.setState({
            name: nextProps.company.name,
            annualEarnings: nextProps.company.annualEarnings,
        });
    },

    handleNameChange(event) {
        this.setState({ name: event.target.value });
    },

    handleAnnualEarningsChange(event) {
        this.setState({ annualEarnings: event.target.value });
    },     

    handleCompanyEditFinished(){
        this.props.onCompanyEditFinish({id:this.props.company.id, name:this.state.name, annualEarnings:this.state.annualEarnings});
    },

	render() {
		
        return (
            <div className='EditCompany'>                
                <h3>Edit company</h3>
                <div className='EditCompany_block'>
                    <label className='EditCompany_label'>
                        Company name:
                    </label>                    
                    <input
                        type='text'
                        className='EditCompany_field'
                        placeholder='Enter company name'
                        value={this.state.name}
                        onChange={this.handleNameChange}                    
                    />
                </div>
                <div className='EditCompany_block'>
                    <label className='EditCompany_label'>
                        Estimated annual earnings:
                    </label>                    
                    <input
                        type='number'
                        className='EditCompany_field'
                        step='1000'
                        min='0'
                        value={this.state.annualEarnings}
                        onChange={this.handleAnnualEarningsChange}                    
                    />
                </div>
                <div className='EditCompany_footer'>                    
                    <button
                        className='EditCompany_button'  
                        disabled={!this.state.name}                      
                        onClick={this.handleCompanyEditFinished}
                    >
                        Change
                    </button>
                </div>
            </div>
        );
	}
});

export default EditCompany;