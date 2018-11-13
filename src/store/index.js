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
        contractTender
    }
});

export default store;
