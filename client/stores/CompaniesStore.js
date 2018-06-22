import { EventEmitter } from 'events';

import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';

const CHANGE_EVENT = 'change';

let _loadingError = null;
let _isLoading = true;

let _companies = [];
let _companiesTree = [];

function formatCompany(company) {
    return {
        id: company._id,
        name: company.name,
        annualEarnings: company.annualEarnings,
        type: company.type,
        parentCompany: company.parentCompany,
        childs: [],
        annualEarningsSum: 0,
        level: 0,
        last: true
    };
}

function addChilds(currentCompany, level) {    
    currentCompany.level = level + 1;
    currentCompany.annualEarningsSum = currentCompany.annualEarnings;
    for (var i = 0; i < _companies.length; i++) {        
        if (_companies[i].parentCompany==currentCompany.id){
            currentCompany.childs.push(_companies[i]); 
            addChilds(_companies[i], currentCompany.level);
            currentCompany.annualEarningsSum += _companies[i].annualEarningsSum;
            currentCompany.last = false;   
        }
    }        
}

function copySortCompanies(from, to){
    for (var i = 0; i < from.length; i++) {
        to.push(from[i]); 
        if (from[i].childs.length) {
            copySortCompanies(from[i].childs, to);    
        }   
    }
}

const TasksStore = Object.assign({}, EventEmitter.prototype, {
    isLoading() {
        return _isLoading;
    },    

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    getCompanies() {
        return _companies;
    },    
});

AppDispatcher.register(function(action) {
    switch(action.type) {
        case AppConstants.LOAD_REQUEST: {
            _isLoading = true;

            TasksStore.emitChange();
            break;
        }

        case AppConstants.LOAD_SUCCESS: {
            _isLoading = false;
            

            _companies = action.companies.map( formatCompany );
            
            _companiesTree = [];
            for (var i = 0; i < _companies.length; i++) {
                if (_companies[i].type=="Main"){
                    _companiesTree.push(_companies[i]);    
                }
            }

            for (var i = 0; i < _companiesTree.length; i++) {
                addChilds(_companiesTree[i], 0);
            }

            _companies = [];
            copySortCompanies(_companiesTree, _companies);

            _loadingError = null;

            TasksStore.emitChange();
            break;
        }

        case AppConstants.LOAD_FAIL: {
            _loadingError = action.error;

            TasksStore.emitChange();
            break;
        }

        default: {
            console.log('No such handler');
        }
    }
});

export default TasksStore;