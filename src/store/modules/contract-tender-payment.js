import util from 'util';
import $apiConf from '../$api-conf';



const state = {

    /**
     * 合同支付进度列表
     * @type {Object}
     */
    data: '',
    add: '', // 新增合同支付进度结果
    edit: '', // 编辑合同支付进度结果
    del: '', // 删除合同支付进度
};

const CONTRACT_TENDER_PAYMENT_SET_DATA = 'CONTRACT_TENDER_PAYMENT_SET_DATA';
const CONTRACT_TENDER_PAYMENT_SET_ADD = 'CONTRACT_TENDER_PAYMENT_SET_ADD';
const CONTRACT_TENDER_PAYMENT_SET_EDIT = 'CONTRACT_TENDER_PAYMENT_SET_EDIT';
const CONTRACT_TENDER_PAYMENT_SET_DEL = 'CONTRACT_TENDER_PAYMENT_SET_DEL';

const mutations = {

    /**
     * 合同支付进度
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [CONTRACT_TENDER_PAYMENT_SET_DATA](state, mutation) {
        state.data = mutation.payload;
    },

    /**
     * 新增数据
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [CONTRACT_TENDER_PAYMENT_SET_ADD](state, mutation) {
        state.add = mutation.payload;
    },

    /**
     * 修改数据
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [CONTRACT_TENDER_PAYMENT_SET_EDIT](state, mutation) {
        state.edit = mutation.payload;
    },


    /**
     * 删除合同支付进度数据
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [CONTRACT_TENDER_PAYMENT_SET_DEL](state, mutation) {
        state.del = mutation.payload;
    }
};

const actions = {
    /**
     * 调用合同支付进度接口
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async contractTenderPaymentGetData({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.PAYMENT_GET,
                params: params
            });

            commit({
                type: CONTRACT_TENDER_PAYMENT_SET_DATA,
                payload: response
            });
        } catch (error) {
            console.log(`获取合同支付进度数据失败:${error.code}`);
        }
    },

    /**
     * 调用新增合同支付进度接口
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async contractTenderPaymentGetAdd({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.PAYMENT_ADD,
                params: JSON.stringify(params)
            });

            commit({
                type: CONTRACT_TENDER_PAYMENT_SET_ADD,
                payload: response
            });
        } catch (error) {
            console.log(`新增合同支付进度失败:${error.code}`);
        }
    },

    /**
     * 调用编辑合同支付进度接口
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async contractTenderPaymentGetEdit({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.PAYMENT_EDIT,
                params: JSON.stringify(params)
            });

            commit({
                type: CONTRACT_TENDER_PAYMENT_SET_EDIT,
                payload: response
            });
        } catch (error) {
            console.log(`修改合同支付进度失败:${error.code}`);
        }
    },

    /**
     * 调用启用、禁用合同支付进度接口（删除）
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async contractTenderPaymentGetDel({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.PAYMENT_DELETE,
                params: params
            });

            commit({
                type: CONTRACT_TENDER_PAYMENT_SET_DEL,
                payload: response
            });
        } catch (error) {
            console.log(`删除合同支付进度失败:${error.code}`);
        }
    }
};

const getters = {

    /**
     * 合同支付进度数据
     * @param {Object} state state
     * @return {Object} data 合同支付进度数据
     */
    contractTenderPaymentData(state) {
        return state.data;
    },

    /**
     * 新增合同支付进度
     * @param {Object} state state
     * @return {Object} add 新增
     */
    contractTenderPaymentAdd(state) {
        return state.add;
    },

    /**
     * 新增合同支付进度
     * @param {Object} state state
     * @return {Object} add 新增
     */
    contractTenderPaymentEdit(state) {
        return state.edit;
    },

    /**
     * 获取删除详情
     * @param {Object} state state
     * @return {Object} del 删除详情
     */
    contractTenderPaymentDel(state) {
        return state.del;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
