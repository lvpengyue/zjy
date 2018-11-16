import util from 'util';
import $apiConf from '../$api-conf';



const state = {

    /**
     * 文件列表
     * @type {Object}
     */
    data: '',
    del: '', // 删除文件
};

const CONTRACT_TENDER_FILE_SET_DATA = 'CONTRACT_TENDER_FILE_SET_DATA';
const CONTRACT_TENDER_FILE_SET_DEL = 'CONTRACT_TENDER_FILE_SET_DEL';

const mutations = {

    /**
     * 文件列表
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [CONTRACT_TENDER_FILE_SET_DATA](state, mutation) {
        state.data = mutation.payload;
    },


    /**
     * 删除文件数据
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [CONTRACT_TENDER_FILE_SET_DEL](state, mutation) {
        state.del = mutation.payload;
    },
};

const actions = {
    /**
     * 调用文件列表接口
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async contractTenderFileGetData({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.FILE_GET,
                params: params
            });

            commit({
                type: CONTRACT_TENDER_FILE_SET_DATA,
                payload: response
            });
        } catch (error) {
            console.log(`获取文件列表数据失败:${error.code}`);
        }
    },

    /**
     * 调用启用、禁用文件接口（删除）
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async contractTenderFileGetDel({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.FILE_DELETE,
                params: params
            });

            commit({
                type: CONTRACT_TENDER_FILE_SET_DEL,
                payload: response
            });
        } catch (error) {
            console.log(`删除文件失败:${error.code}`);
        }
    }
};

const getters = {

    /**
     * 文件列表数据
     * @param {Object} state state
     * @return {Object} data 文件列表数据
     */
    contractTenderFileData(state) {
        return state.data;
    },

    /**
     * 获取删除详情
     * @param {Object} state state
     * @return {Object} del 删除详情
     */
    contractTenderFileDel(state) {
        return state.del;
    },
};

export default {
    state,
    mutations,
    actions,
    getters
};
