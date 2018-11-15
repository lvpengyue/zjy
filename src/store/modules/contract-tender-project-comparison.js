import util from 'util';
import $apiConf from '../$api-conf';



const state = {

    /**
     * 招标询比价
     * @type {Object}
     */
    data: '',
    add: '', // 编辑招标询比价结果
    edit: '', // 编辑招标询比价结果
    del: '', // 删除招标询比价
};

const CONTRACT_TENDER_PROJECT_COMPARISON_SET_DATA = 'CONTRACT_TENDER_PROJECT_COMPARISON_SET_DATA';
const CONTRACT_TENDER_PROJECT_COMPARISON_SET_ADD = 'CONTRACT_TENDER_PROJECT_COMPARISON_SET_ADD';
const CONTRACT_TENDER_PROJECT_COMPARISON_SET_EDIT = 'CONTRACT_TENDER_PROJECT_COMPARISON_SET_EDIT';
const CONTRACT_TENDER_PROJECT_COMPARISON_SET_DEL = 'CONTRACT_TENDER_PROJECT_COMPARISON_SET_DEL';

const mutations = {

    /**
     * 招标询比价列表
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [CONTRACT_TENDER_PROJECT_COMPARISON_SET_DATA](state, mutation) {
        state.data = mutation.payload;
    },

    /**
     * 新增数据
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [CONTRACT_TENDER_PROJECT_COMPARISON_SET_ADD](state, mutation) {
        state.add = mutation.payload;
    },

    /**
     * 编辑数据
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [CONTRACT_TENDER_PROJECT_COMPARISON_SET_EDIT](state, mutation) {
        state.edit = mutation.payload;
    },

    /**
     * 删除招标询比价数据
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [CONTRACT_TENDER_PROJECT_COMPARISON_SET_DEL](state, mutation) {
        state.del = mutation.payload;
    }
};

const actions = {
    /**
     * 调用招标询比价列表接口
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async contractTenderProjectComparisonGetData({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.PROJECT_COMPARISON_GET,
                params: params
            });

            commit({
                type: CONTRACT_TENDER_PROJECT_COMPARISON_SET_DATA,
                payload: response
            });
        } catch (error) {
            console.log(`获取招标询比价列表数据失败:${error.code}`);
        }
    },

    /**
     * 调用新增招标询比价接口
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async contractTenderProjectComparisonGetAdd({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.PROJECT_COMPARISON_ADD,
                params: JSON.stringify(params)
            });

            commit({
                type: CONTRACT_TENDER_PROJECT_COMPARISON_SET_ADD,
                payload: response
            });
        } catch (error) {
            console.log(`编辑招标询比价失败:${error.code}`);
        }
    },

     /**
     * 调用编辑招标询比价接口
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async contractTenderProjectComparisonGetEdit({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.PROJECT_COMPARISON_EDIT,
                params: JSON.stringify(params)
            });

            commit({
                type: CONTRACT_TENDER_PROJECT_COMPARISON_SET_EDIT,
                payload: response
            });
        } catch (error) {
            console.log(`编辑招标询比价失败:${error.code}`);
        }
    },

    /**
     * 调用启用、禁用招标询比价接口（删除）
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async contractTenderProjectComparisonGetDel({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.PROJECT_COMPARISON_DELETE,
                params: params
            });

            commit({
                type: CONTRACT_TENDER_PROJECT_COMPARISON_SET_DEL,
                payload: response
            });
        } catch (error) {
            console.log(`删除招标询比价失败:${error.code}`);
        }
    }
};

const getters = {

    /**
     * 招标询比价列表数据
     * @param {Object} state state
     * @return {Object} data 招标询比价列表数据
     */
    contractTenderProjectComparisonData(state) {
        return state.data;
    },

    /**
     * 新增招标询比价
     * @param {Object} state state
     * @return {Object} add 编辑
     */
    contractTenderProjectComparisonAdd(state) {
        return state.add;
    },

    /**
     * 编辑招标询比价
     * @param {Object} state state
     * @return {Object} add 编辑
     */
    contractTenderProjectComparisonEdit(state) {
        return state.edit;
    },

    /**
     * 获取删除详情
     * @param {Object} state state
     * @return {Object} del 删除详情
     */
    contractTenderProjectComparisonDel(state) {
        return state.del;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
