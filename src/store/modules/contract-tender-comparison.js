import util from 'util';
import $apiConf from '../$api-conf';



const state = {

    /**
     * 比价
     * @type {Object}
     */
    data: '',
    add: '',
    edit: '', // 编辑比价结果
    del: '', // 删除比价
};

const CONTRACT_TENDER_COMPARISON_SET_DATA = 'CONTRACT_TENDER_COMPARISON_SET_DATA';
const CONTRACT_TENDER_COMPARISON_SET_ADD = 'CONTRACT_TENDER_COMPARISON_SET_ADD';
const CONTRACT_TENDER_COMPARISON_SET_EDIT = 'CONTRACT_TENDER_COMPARISON_SET_EDIT';
const CONTRACT_TENDER_COMPARISON_SET_DEL = 'CONTRACT_TENDER_COMPARISON_SET_DEL';

const mutations = {

    /**
     * 比价列表
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [CONTRACT_TENDER_COMPARISON_SET_DATA](state, mutation) {
        state.data = mutation.payload;
    },

    /**
     * 新增数据
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [CONTRACT_TENDER_COMPARISON_SET_ADD](state, mutation) {
        state.add = mutation.payload;
    },

    /**
     * 修改数据
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [CONTRACT_TENDER_COMPARISON_SET_EDIT](state, mutation) {
        state.edit = mutation.payload;
    },


    /**
     * 删除比价数据
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [CONTRACT_TENDER_COMPARISON_SET_DEL](state, mutation) {
        state.del = mutation.payload;
    }
};

const actions = {
    /**
     * 调用比价列表接口
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async contractTenderComparisonGetData({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.COMPARISON_GET,
                params: params
            });

            commit({
                type: CONTRACT_TENDER_COMPARISON_SET_DATA,
                payload: response
            });
        } catch (error) {
            console.log(`获取比价列表数据失败:${error.code}`);
        }
    },

    /**
     * 调用新增比价接口
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async contractTenderComparisonGetAdd({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.COMPARISON_ADD,
                params: JSON.stringify(params)
            });

            commit({
                type: CONTRACT_TENDER_COMPARISON_SET_ADD,
                payload: response
            });
        } catch (error) {
            console.log(`新增比价失败:${error.code}`);
        }
    },

    /**
     * 调用编辑比价接口
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async contractTenderComparisonGetEdit({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.COMPARISON_EDIT,
                params: JSON.stringify(params)
            });

            commit({
                type: CONTRACT_TENDER_COMPARISON_SET_EDIT,
                payload: response
            });
        } catch (error) {
            console.log(`修改比价失败:${error.code}`);
        }
    },

    /**
     * 调用启用、禁用比价接口（删除）
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async contractTenderComparisonGetDel({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.COMPARISON_DELETE,
                params: params
            });

            commit({
                type: CONTRACT_TENDER_COMPARISON_SET_DEL,
                payload: response
            });
        } catch (error) {
            console.log(`删除比价失败:${error.code}`);
        }
    }
};

const getters = {

    /**
     * 比价列表数据
     * @param {Object} state state
     * @return {Object} data 比价列表数据
     */
    contractTenderComparisonData(state) {
        return state.data;
    },

    /**
     * 新增比价
     * @param {Object} state state
     * @return {Object} add 新增
     */
    contractTenderComparisonAdd(state) {
        return state.add;
    },

    /**
     * 编辑比价
     * @param {Object} state state
     * @return {Object} add 新增
     */
    contractTenderComparisonEdit(state) {
        return state.edit;
    },

    /**
     * 获取删除详情
     * @param {Object} state state
     * @return {Object} del 删除详情
     */
    contractTenderComparisonDel(state) {
        return state.del;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
