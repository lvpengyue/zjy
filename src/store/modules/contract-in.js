import util from 'util';
import $apiConf from '../$api-conf';



const state = {

    /**
     * 物资入库列表
     * @type {Object}
     */
    data: '',
    in: '', // 入库
    undo: '' // 撤销入库
};

const CONTRACT_IN_SET_DATA = 'CONTRACT_IN_SET_DATA';
const CONTRACT_IN_SET_IN = 'CONTRACT_IN_SET_IN';
const CONTRACT_IN_SET_UNDO = 'CONTRACT_IN_SET_UNDO';

const mutations = {

    /**
     * 物资列表
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [CONTRACT_IN_SET_DATA](state, mutation) {
        state.data = mutation.payload;
    },

    /**
     * 物资入库
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [CONTRACT_IN_SET_IN](state, mutation) {
        state.in = mutation.payload;
    },

    /**
     * 撤销入库
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [CONTRACT_IN_SET_UNDO](state, mutation) {
        state.undo = mutation.payload;
    }
};

const actions = {
    /**
     * 调用物资入库列表接口
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async contractInGetData({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.STORAGE_GET_LIST,
                params: params
            });

            commit({
                type: CONTRACT_IN_SET_DATA,
                payload: response
            });
        } catch (error) {
            console.log(`获取物资入库列表数据失败:${error.code}`);
        }
    },

    /**
     * 调用物资入库接口
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async contractInGetIn({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.STORAGE_IN,
                params: JSON.stringify(params)
            });

            commit({
                type: CONTRACT_IN_SET_IN,
                payload: response
            });
        } catch (error) {
            console.log(`物资入库失败:${error.code}`);
        }
    },

    /**
     * 撤销物资入库
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async contractInGetUndo({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.STORAGE_UNDO,
                params: params
            });

            commit({
                type: CONTRACT_IN_SET_UNDO,
                payload: response
            });
        } catch (error) {
            console.log(`撤销物资入库失败:${error.code}`);
        }
    }
};

const getters = {

    /**
     * 物资入库列表数据
     * @param {Object} state state
     * @return {Object} data 物资入库列表数据
     */
    contractInData(state) {
        return state.data;
    },

    /**
     * 物资入库
     * @param {Object} state state
     * @return {Object} in 
     */
    contractInIn(state) {
        return state.in;
    },

    /**
     * 撤销物资入库
     * @param {Object} state state
     * @return {Object} undo 新增
     */
    contractInUndo(state) {
        return state.undo;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
