import util from 'util';
import $apiConf from '../$api-conf';



const state = {

    /**
     * 物资出库列表
     * @type {Object}
     */
    data: '',
    out: '', // 出库
    undo: '' // 撤销出库
};

const CONTRACT_OUT_SET_DATA = 'CONTRACT_OUT_SET_DATA';
const CONTRACT_OUT_SET_OUT = 'CONTRACT_OUT_SET_OUT';
const CONTRACT_OUT_SET_UNDO = 'CONTRACT_OUT_SET_UNDO';

const mutations = {

    /**
     * 物资列表
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [CONTRACT_OUT_SET_DATA](state, mutation) {
        state.data = mutation.payload;
    },

    /**
     * 物资出库
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [CONTRACT_OUT_SET_OUT](state, mutation) {
        state.out = mutation.payload;
    },

    /**
     * 撤销出库
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [CONTRACT_OUT_SET_UNDO](state, mutation) {
        state.undo = mutation.payload;
    }
};

const actions = {
    /**
     * 调用物资出库列表接口
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async contractOutGetData({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.OUTAGE_GET_LIST,
                params: params
            });

            commit({
                type: CONTRACT_OUT_SET_DATA,
                payload: response
            });
        } catch (error) {
            console.log(`获取物资出库列表数据失败:${error.code}`);
        }
    },

    /**
     * 调用物资出库接口
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async contractOutGetOut({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.OUTAGE_OUT,
                params: JSON.stringify(params)
            });

            commit({
                type: CONTRACT_OUT_SET_OUT,
                payload: response
            });
        } catch (error) {
            console.log(`物资出库失败:${error.code}`);
        }
    },

    /**
     * 撤销物资出库
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async contractOutGetUndo({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.OUTAGE_UNDO,
                params: params
            });

            commit({
                type: CONTRACT_OUT_SET_UNDO,
                payload: response
            });
        } catch (error) {
            console.log(`撤销物资出库失败:${error.code}`);
        }
    }
};

const getters = {

    /**
     * 物资出库列表数据
     * @param {Object} state state
     * @return {Object} data 物资出库列表数据
     */
    contractOutData(state) {
        return state.data;
    },

    /**
     * 物资出库
     * @param {Object} state state
     * @return {Object} OUT 
     */
    contractOutOut(state) {
        return state.out;
    },

    /**
     * 撤销物资出库
     * @param {Object} state state
     * @return {Object} undo 新增
     */
    contractOutUndo(state) {
        return state.undo;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
