import React from 'react';

import './NewCompany.less';

const NewCompany = React.createClass({

    getInitialState() {
        return {
            name: '',
            annualEarnings: 0,
            type: 'Main',
            parentCompany: '',
        };
    },

    handleNameChange(event) {
        this.setState({ name: event.target.value });
    },

    handleAnnualEarningsChange(event) {
        this.setState({ annualEarnings: event.target.value });
    },

    handleCompanyTypeChange(event) {
        this.setState({ type: event.target.value, parentCompany:'' });
    },

    handleParentCompanyChange(event) {
        this.setState({ parentCompany: event.target.value });
    },

    handleCompanyAdd() {
        if(this.state.type=="Subsidiary" && this.state.parentCompany==''){
            return;        
        }
        const addNewCompany = {
            name: this.state.name,
            annualEarnings: this.state.annualEarnings,
            type: this.state.type,
            parentCompany: this.state.parentCompany
        };

        this.props.onCompanyAdd(addNewCompany);
        this.setState({ name: '', annualEarnings: 0, type: 'Main', parentCompany: '', });
    },

	render() {
		
        return (
            <div className='NewCompany'>                
                <h3>Create new company</h3>
                <div className='NewCompany_block'>
                    <label className='NewCompany_label'>
                        Company name:
                    </label>                    
                    <input
                        type='text'
                        className='NewCompany_field'
                        placeholder='Enter company name'
                        value={this.state.name}
                        onChange={this.handleNameChange}                    
                    />
                </div>
                <div className='NewCompany_block'>
                    <label className='NewCompany_label'>
                        Estimated annual earnings:
                    </label>                    
                    <input
                        type='number'
                        className='NewCompany_field'
                        step='1000'
                        min='0'
                        value={this.state.annualEarnings}
                        onChange={this.handleAnnualEarningsChange}                    
                    />
                </div>
                <div className='NewCompany_block'>
                    <label className='NewCompany_label'>
                        Company type:
                    </label> 
                    <select 
                        className='NewCompany_field'
                        value={this.state.type}
                        onChange={this.handleCompanyTypeChange}
                    >
                        <option value="Main">Main company</option>
                        <option value="Subsidiary">Subsidiary company</option>                        
                    </select>                    
                </div>
                
                {this.state.type=='Subsidiary' ?  
                    <div className='NewCompany_block'>
                    <label className='NewCompany_label'>
                        Parent company:
                    </label>                     
                    <select 
                        className='NewCompany_field'                         
                        onChange={this.handleParentCompanyChange}>
                        <option disabled selected value> -- select a company -- </option>
                        {
                            this.props.companies.map(company =>                        
                            <option
                                value={company.id}                            
                            >     
                                {company.name}                          
                            </option>
                            )
                        }                        
                    </select>                    
                </div>
                : null}

                <div className='NewCompany_footer'>                    
                    <button
                        className='NewCompany_button'
                        disabled={!this.state.name}
                        onClick={this.handleCompanyAdd}
                    >
                        Add
                    </button>
                </div>
            </div>
        );
	}
});

export default NewCompany;