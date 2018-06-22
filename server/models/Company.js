import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CompanySchema = new Schema({
	name: {type: String, require: true},
	annualEarnings: {type: Number, require: true, min: 0},
	type: {type: String, require: true},
	parentCompany: {type: String}
});

const Company = mongoose.model('Company', CompanySchema);