import util from 'util';
import $apiConf from '../$api-conf';



const state = {

    /**
     * 登陆
     * @type {Object}
     */
    data: '',
    permission: [] // 权限的数组
};

const LOGIN_SET_DATA = 'LOGIN_SET_DATA';
const LOGIN_SET_PERMISSION = 'LOGIN_SET_PERMISSION';

const mutations = {

    /**
     * 设置登陆数据
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [LOGIN_SET_DATA](state, mutation) {
        state.data = mutation.payload;
    },

    /**
     * 设置登陆数据
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [LOGIN_SET_PERMISSION](state, mutation) {
        state.permission = mutation.payload;
    }
};

const actions = {
    /**
     * 调用登陆接口
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async loginGetData({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.LOGIN,
                params: JSON.stringify(params)
            });

            commit({
                type: LOGIN_SET_DATA,
                payload: response
            });
        } catch (error) {
            console.log(`登陆失败:${error.code}`);
        }
    },

    /**
     * 设置权限列表
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async loginGetPermission({
        commit,
        dispatch,
        state
    }, params) {
        commit({
            type: LOGIN_SET_PERMISSION,
            payload: params
        });
    },

    /**
     * 调用登出接口
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async loginGetLogout({
        dispatch,
        state
    }) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.LOGOUT
            });
        } catch (error) {
            console.log(`登出失败:${error.code}`);
        }
    }
};

const getters = {

    /**
     * 获取登陆数据
     * @param {Object} state state
     * @return {Object} data 申请退款
     */
    loginData(state) {
        return state.data;
    },

    loginPermission(state) {
        return state.permission;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
