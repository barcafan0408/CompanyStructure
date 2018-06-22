import React from 'react';

import CompaniesStore from '../stores/CompaniesStore';
import CompanyActions from '../actions/CompanyActions';

import NewCompany from './NewCompany.jsx';
import CompaniesList from './CompaniesList.jsx';

import './App.less';

function getStateFromFlux() {
    return {
        isLoading: CompaniesStore.isLoading(),        
        companies: CompaniesStore.getCompanies(),
    };
}

const App = React.createClass({
	getInitialState() {
        return getStateFromFlux();
    },

    componentWillMount() {        
        CompanyActions.loadCompanies();
    },

    componentDidMount() {
        CompaniesStore.addChangeListener(this._onChange);
    },

    componentWillUnmount() {
        CompaniesStore.removeChangeListener(this._onChange);
    },

    handleCompanyAdd(companyData) {
        CompanyActions.createCompany(companyData);
    },

    handleCompanyDelete(company) {
        CompanyActions.deleteCompany(company.id);
        this.deleteChilds(company.childs);        
    },

    deleteChilds(childCompanies){
        for(var i=0; i<childCompanies.length; i++){
            CompanyActions.deleteCompany(childCompanies[i].id);
            this.deleteChilds(childCompanies[i].childs);    
        }
    },

	render() {
		return (
			<div className='App'>				
                <NewCompany className='NewCompany' companies={this.state.companies} onCompanyAdd={this.handleCompanyAdd}/>
                <div className='Companies'>
                    <h2 className='Title'>Companies' structure</h2>
                    <CompaniesList className='CompaniesList' companies={this.state.companies} onCompanyDelete={this.handleCompanyDelete} />
                </div>
		 	</div>
		);
	},

	_onChange() {
        this.setState(getStateFromFlux());
    }

});

export default App;