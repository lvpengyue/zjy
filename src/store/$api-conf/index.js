import conf from '../conf';
const baseUrl = conf.baseUrl;

export default {
    /*
        登陆接口
    */
    LOGIN: {
        name: 'LOGIN',

        proxy: {
            url: `${baseUrl}/user/login`,
            method: 'POST',
            dataType: 'json',
            contentType: 'application/json; charset=UTF-8',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /*
        退出
    */
    LOGOUT: {
        name: 'LOGOUT',

        proxy: {
            url: `${baseUrl}/user/logout`,
            method: 'GET',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /*
        获取个人信息详情
    */
    USER_GET: {
        name: 'USER_GET',

        proxy: {
            url: `${baseUrl}/user/get`,
            method: 'GET',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /*
        修改密码
    */
    API_USER_UPDATE_PASSWORD: {
        name: 'API_USER_UPDATE_PASSWORD',

        proxy: {
            url: `${baseUrl}/api/user/update/password`,
            method: 'POST',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /*
        图片上传
    */
    FILE_UPLOAD_BASE64: {
        name: 'FILE_UPLOAD_BASE64',

        proxy: {
            url: `${baseUrl}/fileupload/base64`,
            method: 'POST',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /*
        基础数据列表
    */
    API_LAUNDRY_DATA: {
        name: 'API_LAUNDRY_DATA',

        proxy: {
            url: `${baseUrl}/api/laundry-data`,
            method: 'GET',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    // ----------------------------------------------- 权限模块 ----------------------------------

    /*
        所有人员列表
    */
    USER_GET_LIST: {
        name: 'USER_GET_LIST',

        proxy: {
            url: `${baseUrl}/user/getlist`,
            method: 'GET',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    // /*
    //     人员详情
    // */
    // ERP_USER_DETAIL_BY_ADMIN: {
    //     name: 'ERP_USER_DETAIL_BY_ADMIN',

    //     proxy: {
    //         url: `${baseUrl}/api/factory/userDetailByAdmin`,
    //         method: 'POST',
    //         dataType: 'json',
    //         xhrFields: {
    //             withCredentials: true
    //         }
    //     }
    // },

    /*
        增加管理员（人员）
    */
    USER_ADD: {
        name: 'USER_ADD',

        proxy: {
            url: `${baseUrl}/user/add`,
            method: 'POST',
            dataType: 'json',
            contentType: 'application/json; charset=UTF-8',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /*
        修改管理员（人员）
    */
    USER_EDIT: {
        name: 'USER_EDIT',

        proxy: {
            url: `${baseUrl}/user/edit`,
            method: 'POST',
            dataType: 'json',
            contentType: 'application/json; charset=UTF-8',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /*
        管理员重置密码
    */
    API_USER_RESET_PWD: {
        name: 'API_USER_RESET_PWD',

        proxy: {
            url: `${baseUrl}/api/user/reset-pwd`,
            method: 'POST',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /*
        管理员启用、禁用用户(删除)
    */
    USER_DELETE: {
        name: 'USER_DELETE',

        proxy: {
            url: `${baseUrl}/user/delete`,
            method: 'GET',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /*
        分配权限
    */
    ROLE_ALLOCATE: {
        name: 'ROLE_ALLOCATE',

        proxy: {
            url: `${baseUrl}/role/allocate`,
            method: 'GET',
            dataType: 'json',
            // contentType: 'application/json; charset=UTF-8',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /*
        添加角色
    */
    ROLE_ADD: {
        name: 'ROLE_ADD',

        proxy: {
            url: `${baseUrl}/role/add`,
            method: 'GET',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /*
        修改角色
    */
    ROLE_EDIT: {
        name: 'ROLE_EDIT',

        proxy: {
            url: `${baseUrl}/role/edit`,
            method: 'GET',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /*
        删除角色
    */
    ROLE_DELETE: {
        name: 'ROLE_DELETE',

        proxy: {
            url: `${baseUrl}/role/delete`,
            method: 'GET',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /*
        角色列表
    */
    ROLE_GET_LIST: {
        name: 'ROLE_GET_LIST',

        proxy: {
            url: `${baseUrl}/role/getlist`,
            method: 'GET',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /*
        权限列表
    */
    RESOURCE_GET: {
        name: 'RESOURCE_GET',

        proxy: {
            url: `${baseUrl}/resource/get`,
            method: 'GET',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /*
        增加权限资源
    */
    RESOURCE_ADD: {
        name: 'RESOURCE_ADD',

        proxy: {
            url: `${baseUrl}/resource/add`,
            method: 'POST',
            dataType: 'json',
            contentType: 'application/json; charset=UTF-8',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /*
        修改权限资源
    */
    RESOURCE_EDIT: {
        name: 'RESOURCE_EDIT',

        proxy: {
            url: `${baseUrl}/resource/edit`,
            contentType: 'application/json; charset=UTF-8',
            method: 'POST',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /*
        删除权限资源
    */
    RESOURCE_DELETE: {
        name: 'RESOURCE_DELETE',

        proxy: {
            url: `${baseUrl}/resource/delete`,
            method: 'GET',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    // ----------------------------- 新闻模块     -----------------------------------

    /*
        新闻类型列表
    */
    NEWS_GET_TYPE_LIST: {
        name: 'NEWS_GET_TYPE_LIST',

        proxy: {
            url: `${baseUrl}/news/gettypelist`,
            method: 'GET',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /*
        新闻列表
    */
    NEWS_GET_LIST: {
        name: 'NEWS_GET_LIST',

        proxy: {
            url: `${baseUrl}/news/getlist`,
            method: 'GET',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    // /*
    //     人员详情
    // */
    // ERP_USER_DETAIL_BY_ADMIN: {
    //     name: 'ERP_USER_DETAIL_BY_ADMIN',

    //     proxy: {
    //         url: `${baseUrl}/api/factory/userDetailByAdmin`,
    //         method: 'POST',
    //         dataType: 'json',
    //         xhrFields: {
    //             withCredentials: true
    //         }
    //     }
    // },

    /*
    增加新闻
*/
    NEWS_ADD: {
        name: 'NEWS_ADD',

        proxy: {
            url: `${baseUrl}/news/add`,
            method: 'POST',
            dataType: 'json',
            contentType: 'application/json; charset=UTF-8',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /*
    新闻详情
*/
    NEWS_GET: {
        name: 'NEWS_GET',

        proxy: {
            url: `${baseUrl}/news/get`,
            method: 'GET',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /*
    修改新闻
*/
    NEWS_EDIT: {
        name: 'NEWS_EDIT',

        proxy: {
            url: `${baseUrl}/news/edit`,
            method: 'POST',
            dataType: 'json',
            contentType: 'application/json; charset=UTF-8',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /*
    删除新闻
*/
    NEWS_DELETE: {
        name: 'NEWS_DELETE',

        proxy: {
            url: `${baseUrl}/news/delete`,
            method: 'GET',
            dataType: 'json',
            contentType: 'application/json; charset=UTF-8',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    // --------------------------------- 物资信息管理 ------------------------------

    /*
        所有人员列表
    */
    MATERIAL_GET_LIST: {
        name: 'MATERAIL_GET_LIST',

        proxy: {
            url: `${baseUrl}/material/getlist`,
            method: 'GET',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /*
        增加管理员（人员）
    */
    MATERIAL_ADD: {
        name: 'MATERIAL_ADD',

        proxy: {
            url: `${baseUrl}/material/add`,
            method: 'POST',
            dataType: 'json',
            contentType: 'application/json; charset=UTF-8',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /*
        修改管理员（人员）
    */
    MATERIAL_EDIT: {
        name: 'MATERIAL_EDIT',

        proxy: {
            url: `${baseUrl}/material/edit`,
            method: 'POST',
            dataType: 'json',
            contentType: 'application/json; charset=UTF-8',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /*
        管理员启用、禁用用户(删除)
    */
    MATERIAL_DELETE: {
        name: 'MATERIAL_DELETE',

        proxy: {
            url: `${baseUrl}/material/delete`,
            method: 'GET',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /*
        所有物资列表（不分页）
    */
    MATERIAL_GET_ALL: {
        name: 'MATERIAL_GET_ALL',

        proxy: {
            url: `${baseUrl}/material/getall`,
            method: 'GET',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    // --------------------------------- 物资入库管理 ------------------------------

    /*
        所有入库列表
    */
    STORAGE_GET_LIST: {
        name: 'STORAGE_GET_LIST',

        proxy: {
            url: `${baseUrl}/storage/getlist`,
            method: 'GET',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /*
    增加入库
*/
    STORAGE_IN: {
        name: 'STORAGE_IN',

        proxy: {
            url: `${baseUrl}/storage/in`,
            method: 'POST',
            dataType: 'json',
            contentType: 'application/json; charset=UTF-8',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /*
    撤销入库
*/
    STORAGE_UNDO: {
        name: 'STORAGE_UNDO',

        proxy: {
            url: `${baseUrl}/storage/undo`,
            method: 'GET',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    // --------------------------------- 物资出库管理 ------------------------------

    /*
        所有出库列表
    */
    OUTAGE_GET_LIST: {
        name: 'OUTAGE_GET_LIST',

        proxy: {
            url: `${baseUrl}/outage/getlist`,
            method: 'GET',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /*
增加出库
*/
    OUTAGE_OUT: {
        name: 'OUTAGE_OUT',

        proxy: {
            url: `${baseUrl}/outage/out`,
            method: 'POST',
            dataType: 'json',
            contentType: 'application/json; charset=UTF-8',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /*
撤销出库
*/
    OUTAGE_UNDO: {
        name: 'OUTAGE_UNDO',

        proxy: {
            url: `${baseUrl}/outage/undo`,
            method: 'GET',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    // --------------------------------- 招标项目管理 ------------------------------

    /*
        招标项目列表
    */
    TENDER_GET_LIST: {
        name: 'TENDER_GET_LIST',

        proxy: {
            url: `${baseUrl}/tender/getlist`,
            method: 'GET',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /*
        增加招标项目
    */
    TENDER_ADD: {
        name: 'TENDER_ADD',

        proxy: {
            url: `${baseUrl}/tender/add`,
            method: 'POST',
            dataType: 'json',
            contentType: 'application/json; charset=UTF-8',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /*
    修改招标项目
    */
    TENDER_EDIT: {
        name: 'TENDER_EDIT',

        proxy: {
            url: `${baseUrl}/tender/edit`,
            method: 'GET',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /*
        删除招标项目
    */
    TENDER_DELETE: {
        name: 'TENDER_DELETE',

        proxy: {
            url: `${baseUrl}/tender/delete`,
            method: 'GET',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    // -------------------------------------- 询比价模块--------------------------------

    /*
        获得询比价情况
    */
    PROJECT_COMPARISON_GET: {
        name: 'PROJECT_COMPARISON_GET',

        proxy: {
            url: `${baseUrl}/projectcomparison/get`,
            method: 'GET',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /*
        新增询比价
    */
    PROJECT_COMPARISON_ADD: {
        name: 'PROJECT_COMPARISON_ADD',

        proxy: {
            url: `${baseUrl}/projectcomparison/add`,
            method: 'POST',
            dataType: 'json',
            contentType: 'application/json; charset=UTF-8',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /*
        编辑询比价
    */
    PROJECT_COMPARISON_EDIT: {
        name: 'PROJECT_COMPARISON_EDIT',

        proxy: {
            url: `${baseUrl}/projectcomparison/edit`,
            method: 'POST',
            dataType: 'json',
            contentType: 'application/json; charset=UTF-8',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /*
        删除询比价情况
    */
    PROJECT_COMPARISON_DELETE: {
        name: 'PROJECT_COMPARISON_DELETE',

        proxy: {
            url: `${baseUrl}/projectcomparison/delete`,
            method: 'GET',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    // -------------------------------------- 询价模块--------------------------------

    /*
        获得询价情况
    */
    INQUIRY_GET: {
        name: 'INQUIRY_GET',

        proxy: {
            url: `${baseUrl}/inquiry/get`,
            method: 'GET',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /*
        新增询价
    */
    INQUIRY_ADD: {
        name: 'INQUIRY_ADD',

        proxy: {
            url: `${baseUrl}/inquiry/add`,
            method: 'POST',
            dataType: 'json',
            contentType: 'application/json; charset=UTF-8',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /*
        编辑询价
    */
    INQUIRY_EDIT: {
        name: 'INQUIRY_EDIT',

        proxy: {
            url: `${baseUrl}/inquiry/edit`,
            method: 'POST',
            dataType: 'json',
            contentType: 'application/json; charset=UTF-8',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /*
        删除询价情况
    */
    INQUIRY_DELETE: {
        name: 'INQUIRY_DELETE',

        proxy: {
            url: `${baseUrl}/inquiry/delete`,
            method: 'GET',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    // -------------------------------------- 报价模块--------------------------------

    /*
        获得报价情况
    */
    QUOTATION_GET: {
        name: 'QUOTATION_GET',

        proxy: {
            url: `${baseUrl}/quotation/get`,
            method: 'GET',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /*
        添加报价
    */
    QUOTATION_ADD: {
        name: 'QUOTATION_ADD',

        proxy: {
            url: `${baseUrl}/quotation/add`,
            method: 'POST',
            dataType: 'json',
            contentType: 'application/json; charset=UTF-8',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /*
        编辑报价
    */
    QUOTATION_EDIT: {
        name: 'QUOTATION_EDIT',

        proxy: {
            url: `${baseUrl}/quotation/edit`,
            method: 'POST',
            dataType: 'json',
            contentType: 'application/json; charset=UTF-8',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /*
        删除报价情况
    */
    QUOTATION_DELETE: {
        name: 'QUOTATION_DELETE',

        proxy: {
            url: `${baseUrl}/quotation/delete`,
            method: 'GET',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    // -------------------------------------- 比价模块--------------------------------

    /*
        获得比价情况
    */
    COMPARISON_GET: {
        name: 'COMPARISON_GET',

        proxy: {
            url: `${baseUrl}/comparison/get`,
            method: 'GET',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /*
        新增比价
    */
    COMPARISON_ADD: {
        name: 'COMPARISON_ADD',

        proxy: {
            url: `${baseUrl}/comparison/add`,
            method: 'POST',
            dataType: 'json',
            contentType: 'application/json; charset=UTF-8',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /*
        编辑比价
    */
    COMPARISON_EDIT: {
        name: 'COMPARISON_EDIT',

        proxy: {
            url: `${baseUrl}/comparison/edit`,
            method: 'POST',
            dataType: 'json',
            contentType: 'application/json; charset=UTF-8',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /*
        删除比价情况
    */
    COMPARISON_DELETE: {
        name: 'COMPARISON_DELETE',

        proxy: {
            url: `${baseUrl}/comparison/delete`,
            method: 'GET',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    // -------------------------------------- 公司比价单模块--------------------------------

    /*
        获得公司比价单情况
    */
    COMPANY_GET: {
        name: 'COMPANY_GET',

        proxy: {
            url: `${baseUrl}/company/get`,
            method: 'GET',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /*
        新增公司比价单
    */
    COMPANY_ADD: {
        name: 'COMPANY_ADD',

        proxy: {
            url: `${baseUrl}/company/add`,
            method: 'POST',
            dataType: 'json',
            contentType: 'application/json; charset=UTF-8',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /*
        编辑公司比价单
    */
    COMPANY_EDIT: {
        name: 'COMPANY_EDIT',

        proxy: {
            url: `${baseUrl}/company/edit`,
            method: 'POST',
            dataType: 'json',
            contentType: 'application/json; charset=UTF-8',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /*
        删除公司比价单情况
    */
    COMPANY_DELETE: {
        name: 'COMPANY_DELETE',

        proxy: {
            url: `${baseUrl}/company/delete`,
            method: 'GET',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    // -------------------------------------- 物资采购合同模块--------------------------------

    /*
        获得合同情况
    */
    CONTRACT_GET: {
        name: 'CONTRACT_GET',

        proxy: {
            url: `${baseUrl}/contract/get`,
            method: 'GET',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /*
        新增合同
    */
    CONTRACT_ADD: {
        name: 'CONTRACT_ADD',

        proxy: {
            url: `${baseUrl}/contract/add`,
            method: 'POST',
            dataType: 'json',
            contentType: 'application/json; charset=UTF-8',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /*
        编辑合同
    */
    CONTRACT_EDIT: {
        name: 'CONTRACT_EDIT',

        proxy: {
            url: `${baseUrl}/contract/edit`,
            method: 'POST',
            dataType: 'json',
            contentType: 'application/json; charset=UTF-8',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /*
        删除合同情况
    */
    CONTRACT_DELETE: {
        name: 'CONTRACT_DELETE',

        proxy: {
            url: `${baseUrl}/contract/delete`,
            method: 'GET',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    // -------------------------------------- 合同支付进度模块--------------------------------

    /*
       获得支付进度列表
    */
    PAYMENT_GET: {
        name: 'PAYMENT_GET',

        proxy: {
            url: `${baseUrl}/payment/get`,
            method: 'GET',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /*
        新增支付进度
    */
    PAYMENT_ADD: {
        name: 'PAYMENT_ADD',

        proxy: {
            url: `${baseUrl}/payment/add`,
            method: 'POST',
            dataType: 'json',
            contentType: 'application/json; charset=UTF-8',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /*
        编辑支付进度
    */
    PAYMENT_EDIT: {
        name: 'PAYMENT_EDIT',

        proxy: {
            url: `${baseUrl}/payment/edit`,
            method: 'POST',
            dataType: 'json',
            contentType: 'application/json; charset=UTF-8',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /*
        删除支付进度
    */
    PAYMENT_DELETE: {
        name: 'PAYMENT_DELETE',

        proxy: {
            url: `${baseUrl}/payment/delete`,
            method: 'GET',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    // ----------------------------------文件上传下载------------------------------------
    /*
        获取文件下载列表
    */
    FILE_GET: {
        name: 'FILE_GET',

        proxy: {
            url: `${baseUrl}/file/get`,
            method: 'GET',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },
    /*
        文件删除
    */
    FILE_DELETE: {
        name: 'FILE_DELETE',

        proxy: {
            url: `${baseUrl}/file/delete`,
            method: 'GET',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    }
};
