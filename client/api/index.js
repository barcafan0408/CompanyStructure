import axios from 'axios';

import { apiPrefix } from '../../etc/config.json';

export default {
    listCompanies() {
        return axios.get(`${apiPrefix}/companies`);
    },

	createCompany(data) {
        return axios.post(`${apiPrefix}/companies`, data);
    },

    deleteCompany(companyId) {
        return axios.delete(`${apiPrefix}/companies/${companyId}`);
    },

}