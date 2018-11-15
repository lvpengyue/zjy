import util from 'util';
import $apiConf from '../$api-conf';



const state = {

    /**
     * 物资采购合同
     * @type {Object}
     */
    data: '',
    add: '',
    edit: '', // 编辑物资采购合同结果
    del: '', // 删除物资采购合同
};

const CONTRACT_TENDER_CONTRACT_SET_DATA = 'CONTRACT_TENDER_CONTRACT_SET_DATA';
const CONTRACT_TENDER_CONTRACT_SET_ADD = 'CONTRACT_TENDER_CONTRACT_SET_ADD';
const CONTRACT_TENDER_CONTRACT_SET_EDIT = 'CONTRACT_TENDER_CONTRACT_SET_EDIT';
const CONTRACT_TENDER_CONTRACT_SET_DEL = 'CONTRACT_TENDER_CONTRACT_SET_DEL';

const mutations = {

    /**
     * 物资采购合同
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [CONTRACT_TENDER_CONTRACT_SET_DATA](state, mutation) {
        state.data = mutation.payload;
    },

    /**
     * 新增数据
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [CONTRACT_TENDER_CONTRACT_SET_ADD](state, mutation) {
        state.add = mutation.payload;
    },


    /**
     * 修改数据
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [CONTRACT_TENDER_CONTRACT_SET_EDIT](state, mutation) {
        state.edit = mutation.payload;
    },


    /**
     * 删除物资采购合同数据
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [CONTRACT_TENDER_CONTRACT_SET_DEL](state, mutation) {
        state.del = mutation.payload;
    }
};

const actions = {
    /**
     * 调用物资采购合同接口
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async contractTenderContractGetData({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.CONTRACT_GET,
                params: params
            });

            commit({
                type: CONTRACT_TENDER_CONTRACT_SET_DATA,
                payload: response
            });
        } catch (error) {
            console.log(`获取物资采购合同数据失败:${error.code}`);
        }
    },

    /**
     * 调用新增物资采购合同接口
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async contractTenderContractGetAdd({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.CONTRACT_ADD,
                params: JSON.stringify(params)
            });

            commit({
                type: CONTRACT_TENDER_CONTRACT_SET_ADD,
                payload: response
            });
        } catch (error) {
            console.log(`新增物资采购合同失败:${error.code}`);
        }
    },

    /**
     * 调用编辑物资采购合同接口
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async contractTenderContractGetEdit({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.CONTRACT_EDIT,
                params: JSON.stringify(params)
            });

            commit({
                type: CONTRACT_TENDER_CONTRACT_SET_EDIT,
                payload: response
            });
        } catch (error) {
            console.log(`修改物资采购合同失败:${error.code}`);
        }
    },

    /**
     * 调用启用、禁用物资采购合同接口（删除）
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async contractTenderContractGetDel({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.CONTRACT_DELETE,
                params: params
            });

            commit({
                type: CONTRACT_TENDER_CONTRACT_SET_DEL,
                payload: response
            });
        } catch (error) {
            console.log(`删除物资采购合同失败:${error.code}`);
        }
    }
};

const getters = {

    /**
     * 物资采购合同数据
     * @param {Object} state state
     * @return {Object} data 物资采购合同数据
     */
    contractTenderContractData(state) {
        return state.data;
    },

    /**
     * 新增物资采购合同
     * @param {Object} state state
     * @return {Object} add 新增
     */
    contractTenderContractEdit(state) {
        return state.edit;
    },

    /**
     * 获取删除详情
     * @param {Object} state state
     * @return {Object} del 删除详情
     */
    contractTenderContractDel(state) {
        return state.del;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
