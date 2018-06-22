import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../constants/AppConstants';

import api from '../api';

const CompanyActions = {
    
    loadCompanies() {
        AppDispatcher.dispatch({
            type: Constants.LOAD_REQUEST
        });

        api.listCompanies()
        .then(({ data }) =>
            AppDispatcher.dispatch({
                type: Constants.LOAD_SUCCESS,
                companies: data
            })
        )
        .catch(err =>
            AppDispatcher.dispatch({
                type: Constants.LOAD_FAIL,
                error: err
            })
        );
    },

    createCompany(company) {
        api.createCompany(company)
        .then(() =>
            this.loadCompanies()
        )        
        .catch(err =>
            console.error(err)
        );
    },

    deleteCompany(companyId) {
        api.deleteCompany(companyId)
        .then(() =>
            this.loadCompanies()
        )
        .catch(err =>
            console.error(err)
        );
    }
    
};

export default CompanyActions;