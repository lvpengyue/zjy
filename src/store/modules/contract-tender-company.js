import util from 'util';
import $apiConf from '../$api-conf';



const state = {

    /**
     * 公司比价单列表
     * @type {Object}
     */
    data: '',
    add: '', // 新增公司比价单结果
    edit: '', // 编辑公司比价单结果
    del: '', // 删除公司比价单
};

const CONTRACT_TENDER_COMPANY_SET_DATA = 'CONTRACT_TENDER_COMPANY_SET_DATA';
const CONTRACT_TENDER_COMPANY_SET_ADD = 'CONTRACT_TENDER_COMPANY_SET_ADD';
const CONTRACT_TENDER_COMPANY_SET_EDIT = 'CONTRACT_TENDER_COMPANY_SET_EDIT';
const CONTRACT_TENDER_COMPANY_SET_DEL = 'CONTRACT_TENDER_COMPANY_SET_DEL';

const mutations = {

    /**
     * 公司比价单列表
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [CONTRACT_TENDER_COMPANY_SET_DATA](state, mutation) {
        state.data = mutation.payload;
    },

    /**
     * 新增数据
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [CONTRACT_TENDER_COMPANY_SET_ADD](state, mutation) {
        state.add = mutation.payload;
    },

    /**
     * 修改数据
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [CONTRACT_TENDER_COMPANY_SET_EDIT](state, mutation) {
        state.edit = mutation.payload;
    },


    /**
     * 删除公司比价单数据
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [CONTRACT_TENDER_COMPANY_SET_DEL](state, mutation) {
        state.del = mutation.payload;
    }
};

const actions = {
    /**
     * 调用公司比价单列表接口
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async contractTenderCompanyGetData({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.COMPANY_GET,
                params: params
            });

            commit({
                type: CONTRACT_TENDER_COMPANY_SET_DATA,
                payload: response
            });
        } catch (error) {
            console.log(`获取公司比价单列表数据失败:${error.code}`);
        }
    },

    /**
     * 调用新增公司比价单接口
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async contractTenderCompanyGetAdd({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.COMPANY_ADD,
                params: JSON.stringify(params)
            });

            commit({
                type: CONTRACT_TENDER_COMPANY_SET_ADD,
                payload: response
            });
        } catch (error) {
            console.log(`新增公司比价单失败:${error.code}`);
        }
    },

    /**
     * 调用编辑公司比价单接口
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async contractTenderCompanyGetEdit({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.COMPANY_EDIT,
                params: JSON.stringify(params)
            });

            commit({
                type: CONTRACT_TENDER_COMPANY_SET_EDIT,
                payload: response
            });
        } catch (error) {
            console.log(`修改公司比价单失败:${error.code}`);
        }
    },

    /**
     * 调用启用、禁用公司比价单接口（删除）
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async contractTenderCompanyGetDel({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.COMPANY_DELETE,
                params: params
            });

            commit({
                type: CONTRACT_TENDER_COMPANY_SET_DEL,
                payload: response
            });
        } catch (error) {
            console.log(`删除公司比价单失败:${error.code}`);
        }
    }
};

const getters = {

    /**
     * 公司比价单列表数据
     * @param {Object} state state
     * @return {Object} data 公司比价单列表数据
     */
    contractTenderCompanyData(state) {
        return state.data;
    },

    /**
     * 新增公司比价单
     * @param {Object} state state
     * @return {Object} add 新增
     */
    contractTenderCompanyAdd(state) {
        return state.add;
    },

    /**
     * 新增公司比价单
     * @param {Object} state state
     * @return {Object} add 新增
     */
    contractTenderCompanyEdit(state) {
        return state.edit;
    },

    /**
     * 获取删除详情
     * @param {Object} state state
     * @return {Object} del 删除详情
     */
    contractTenderCompanyDel(state) {
        return state.del;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
