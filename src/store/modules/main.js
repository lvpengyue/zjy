import util from 'util';
import $apiConf from '../$api-conf';



const state = {

    /**
     * 修改密码
     * @type {Object}
     */
    editData: '',

    upload: '',

    barCode: '', // 打印生成的二维码数据

    baseData: '', // 基础数据（品牌列表，品类列表，工厂列表）
};

const MAIN_SET_EDIT_DATA = 'MAIN_SET_EDIT_DATA';
const MAIN_SET_UPLOAD= 'MAIN_SET_UPLOAD';
const MAIN_SET_BASE_DATA= 'MAIN_SET_BASE_DATA';
const MAIN_SET_BAR_CODE= 'MAIN_SET_BAR_CODE';

const mutations = {

    /**
     * 设置修改密码数据
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [MAIN_SET_EDIT_DATA](state, mutation) {
        state.editData = mutation.payload;
    },

    /**
     * 设置上传图片结果
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [MAIN_SET_UPLOAD](state, mutation) {
        state.upload = mutation.payload;
    },

    /**
     * 设置基础数据列表
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [MAIN_SET_BASE_DATA](state, mutation) {
        state.baseData = mutation.payload;
    },

    /**
     * 设置二维码数据
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [MAIN_SET_BAR_CODE](state, mutation) {
        state.barCode = mutation.payload;
    }
};

const actions = {
    /**
     * 调用修改密码接口
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async mainGetEditData({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.API_USER_UPDATE_PASSWORD,
                params: params
            });

            commit({
                type: MAIN_SET_EDIT_DATA,
                payload: response
            });
        } catch (error) {
            console.log(`修改密码失败:${error.code}`);
        }
    },

    /**
     * 调用修改密码接口
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async mainGetUpload({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.FILE_UPLOAD_BASE64,
                params: params
            });

            commit({
                type: MAIN_SET_UPLOAD,
                payload: response
            });
        } catch (error) {
            console.log(`上传失败:${error.code}`);
        }
    },

    /**
     * 调用获取基础数据列表
     * @param {Object} context context
     */
    async mainGetBaseData({
        commit,
        dispatch,
        state
    }) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.API_LAUNDRY_DATA
            });

            commit({
                type: MAIN_SET_BASE_DATA,
                payload: response
            });
        } catch (error) {
            console.log(`获取基础数据列表失败:${error.code}`);
        }
    },

    /**
     * 调用获取基础数据列表
     * @param {Object} context context
     */
    async mainGetBarCode({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.GEN_QR_CODE,
                params
            });

            commit({
                type: MAIN_SET_BAR_CODE,
                payload: response
            });
        } catch (error) {
            console.log(`生成二维码失败:${error.code}`);
        }
    }
};

const getters = {

    /**
     * 获取修改密码数据
     * @param {Object} state state
     * @return {Object} editData 申请退款
     */
    mainEditData(state) {
        return state.editData;
    },

    /**
     * 获取上传结果
     * @param {Object} state state
     * @return {Object} upload 上传
     */
    mainUpload(state) {
        return state.upload;
    },

    /**
     * 获取基础数据列表
     * @param {Object} state state
     * @return {Object} baseData 基础数据
     */
    mainBaseData(state) {
        return state.baseData;
    },

    /**
     * 获取二维码数据
     * @param {Object} state state
     * @return {Object} barCode 二维码
     */
    mainBarCode(state) {
        return state.barCode;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
