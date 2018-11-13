import util from 'util';
import $apiConf from '../$api-conf';



const state = {

    /**
     * 管理员修改他人信息
     * @type {Object}
     */
    data: ''
};

const EDIT_USER_SET_DATA = 'EDIT_USER_SET_DATA';

const mutations = {

    /**
     * 设置管理员修改他人信息数据
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [EDIT_USER_SET_DATA](state, mutation) {
        state.data = mutation.payload;
    }
};

const actions = {
    /**
     * 调用管理员修改他人信息接口
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async editUserGetData({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.ERP_MODIFY_AGENT,
                params: params
            });

            commit({
                type: EDIT_USER_SET_DATA,
                payload: response
            });
        } catch (error) {
            console.log(`管理员修改他人信息失败:${error.code}`);
        }
    }
};

const getters = {

    /**
     * 获取管理员修改他人信息数据
     * @param {Object} state state
     * @return {Object} data 管理员修改他人信息数据
     */
    editUserData(state) {
        return state.data;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
