import Vue from 'vue';
import Vuex from 'vuex';

import $apis from './modules/$apis';
import app from './modules/app';
import user from './modules/user';
import login from './modules/login';

import ownSpace from './modules/own-space';
import main from './modules/main';
import editUser from './modules/edit-user';
import permissionIndex from './modules/permission-index';
import permissionRole from './modules/permission-role';
import permissionResource from './modules/permission-resource';
import news from './modules/news';
import contractMaterial from './modules/contract-material';
import contractIn from './modules/contract-in';
import contractOut from './modules/contract-out';
import contractTender from './modules/contract-tender';
import contractTenderCompany from './modules/contract-tender-company';
import contractTenderComparison from './modules/contract-tender-comparison';
import contractTenderContract from './modules/contract-tender-contract';
import contractTenderInquiry from './modules/contract-tender-inquiry';
import contractTenderPayment from './modules/contract-tender-payment';
import contractTenderProjectComparison from './modules/contract-tender-project-comparison';
import contractTenderQuotation from './modules/contract-tender-quotation';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        //
    },
    mutations: {
        //
    },
    actions: {

    },
    modules: {
        app,
        main,
        user,
        $apis,
        login,
        ownSpace,
        history,
        editUser,
        permissionIndex,
        permissionRole,
        permissionResource,
        news,
        contractMaterial,
        contractIn,
        contractOut,
        contractTender,
        contractTenderCompany,
        contractTenderComparison,
        contractTenderContract,
        contractTenderInquiry,
        contractTenderPayment,
        contractTenderProjectComparison,
        contractTenderQuotation
    }
});

export default store;
