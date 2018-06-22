import mongoose from 'mongoose';

import config from '../../etc/config.json';

import '../models/Company';

const Company = mongoose.model('Company');

export function setUpConnection(){
	mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`);
}

export function listCompanies(){
	return Company.find();
}

export function createCompany(data) {
    const company = new Company({
        name: data.name,
        annualEarnings: data.annualEarnings,
        type: data.type,
        parentCompany: data.parentCompany
    });

    return company.save();
}

export function deleteCompany(id) {
    return Company.findById(id).remove();
}