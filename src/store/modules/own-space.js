import util from 'util';
import $apiConf from '../$api-conf';



const state = {

    /**
     * 用户详情
     * @type {Object}
     */
    data: '',
    modify: '' // 编辑详情
};

const OWN_SPACE_SET_DATA = 'OWN_SPACE_SET_DATA';
const OWN_SPACE_SET_MODIFY = 'OWN_SPACE_SET_MODIFY';

const mutations = {

    /**
     * 设置用户详情数据
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [OWN_SPACE_SET_DATA](state, mutation) {
        state.data = mutation.payload;
    },
    /**
     * 设置用户编辑详情
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [OWN_SPACE_SET_MODIFY](state, mutation) {
        state.modify = mutation.payload;
    }
};

const actions = {
    /**
     * 调用用户详情接口
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async ownSpaceGetData({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.USER_GET,
                params: params
            });

            commit({
                type: OWN_SPACE_SET_DATA,
                payload: response
            });
        } catch (error) {
            console.log(`获取用户详情失败:${error.code}`);
        }
    },

    /**
     * 调用用户修改接口
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async ownSpaceGetModify({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.ERP_MODIFY_USER_DETAIL,
                params: params
            });

            commit({
                type: OWN_SPACE_SET_MODIFY,
                payload: response
            });
        } catch (error) {
            console.log(`修改用户信息失败:${error.code}`);
        }
    }
};

const getters = {

    /**
     * 获取用户详情数据
     * @param {Object} state state
     * @return {Object} data 用户详情数据
     */
    ownSpaceData(state) {
        return state.data;
    },
    /**
     * 获取编辑详情
     * @param {Object} state state
     * @return {Object} modify 用户编辑
     */
    ownSpaceModify(state) {
        return state.modify;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
