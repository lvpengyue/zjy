import {
  mapActions,
  mapGetters
} from 'vuex';
import Cookies from 'js-cookie';
import tableExpand from '../widgets/table-expand/index.vue';
import alCascader from '../my-components/area-linkage/components/al-cascader.vue';
import Util from '../../libs/util';
import tenderComparison from '../widgets/tender-comparison/index.vue';
import tenderBuy from '../widgets/tender-buy/index.vue';
import tenderPayment from '../widgets/tender-payment/index.vue';
import tenderUpload from '../widgets/tender-upload/index.vue';

export default {
  async mounted() {
    this.userData = JSON.parse(Cookies.get('user'));
    await this.getData();
  },
  data() {
    const valideRePassword = (rule, value, callback) => {
        if (value !== this.formValidate.newPassword) {
            callback(new Error('两次输入密码不一致'));
        } else {
            callback();
        }
    };
    const validePhone = (rule, value, callback) => {
        var re = /^1[0-9]{10}$/;
        if (!re.test(value)) {
            callback(new Error('请输入正确格式的手机号'));
        } else {
            callback();
        }
    };

    const validePersonId = (rule, value, callback) => {
        var re = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        if (!re.test(value)) {
            callback(new Error('请输入正确的身份证号'));
        } else {
            callback();
        }
    };
    return {
      projectId: '',
      formValidate1: {
          id: '',
          name: '',
      },

      action: 'add', // 新增还是编辑  edit
      showIndex: true, // 是否显示首页列表
      tabName: 'comparison', // 显示tab的名称


      showProjectComparison: false, // 是否显示询比价单
      showBuy: false,
      showPayment: false,
      showUpload: false,

      ruleValidate1: {
          name: [
              { required: true, message: '项目名称不得为空', trigger: 'blur' }
          ]
      },
      addOrEdit: false, // 新增或编辑框是否出现
      modal_loading: false,
      userData: null,
      page: {
        pageNumber: 1,
        pageSize: 10
      },
      search: {
        name: ''
      },
      columns: [
        {
          title: '招标项目名称',
          key: 'name'
        },
        {
          title: '操作',
          key: 'action',
          width: 300,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'default'
                },
                style: {
                  marginRight: '5px',
                  display: 'inline-block'
                },
                on: {
                  click: () => {
                    this.showAndEdit(params.row);
                  }
                }
              }, '编辑'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'default'
                },
                style: {
                  marginRight: '5px',
                  display: 'inline-block'
                },
                on: {
                  click: () => {
                    this.del(params.row);
                  }
                }
              }, '删除'),

              h('Button', {
                props: {
                  type: 'warning',
                  size: 'default'
                },
                style: {
                  marginRight: '5px',
                  display: 'inline-block'
                },
                on: {
                  click: () => {
                    this.showDetail(params.row);
                  }
                }
              }, '查看详情')
            ]);
          }
        }
      ]
    };
  },
  computed: {
    ...mapGetters([
      'contractTenderData',
      'contractTenderAdd',
      'contractTenderEdit',
      'contractTenderDel',
      'contractTenderProjectComparisonData',
      'contractTenderContractData',
      'contractTenderPaymentData',
      'contractTenderFileData',
      'contractTenderId'
    ])
  },
  watch: {
    async tabName(newV) {
      switch(newV) {
        case 'buy':
          await this.contractTenderContractGetData({
            id: this.projectId
          });

          if (this.contractTenderContractData && this.contractTenderContractData.code) {
            this.$Notice.warning({
                title: this.contractTenderContractData.data
            });
          } else {
            this.showBuy = true;
            this.showProjectComparison = false;
            this.showPayment = false;
            this.showUpload = false;
          }
          break;
        case 'pay':
          await this.contractTenderPaymentGetData({
            id: this.projectId
          });

          if (this.contractTenderPaymentData && this.contractTenderPaymentData.code) {
            this.$Notice.warning({
                title: this.contractTenderPaymentData.data
            });
          } else {
            this.showBuy = false;
            this.showProjectComparison = false;
            this.showPayment = true;
            this.showUpload = false;
          }
          
          break;
        case 'material':
          await this.contractTenderFileGetData({
            id: this.projectId
          });

          if (this.contractTenderFileData && this.contractTenderFileData.code) {
            this.$Notice.warning({
                title: this.contractTenderFileData.data
            });
          } else {
            this.showBuy = false;
            this.showProjectComparison = false;
            this.showPayment = false;
            this.showUpload = true;
          }
          
          break;
        default:
          await this.contractTenderProjectComparisonGetData({
            id: this.projectId
          });

          if (this.contractTenderProjectComparisonData && this.contractTenderProjectComparisonData.code) {
            this.$Notice.warning({
                title: this.contractTenderProjectComparisonData.data
            });
          } else {
            this.showBuy = false;
            this.showProjectComparison = true;
            this.showPayment = false;
            this.showUpload = false;
          }
      }
    } 
  },
  methods: {
    ...mapActions([
      'contractTenderGetData',
      'contractTenderGetAdd',
      'contractTenderGetEdit',
      'contractTenderGetDel',
      'contractTenderProjectComparisonGetData',
      'contractTenderInquiryGetData',
      'contractTenderContractGetData',
      'contractTenderPaymentGetData',
      'contractTenderFileGetData',
      'contractTenderSetId'
    ]),

    // 查看项目详情
    async showDetail(row) {
      this.projectId = row.id;
      this.contractTenderSetId(row.id);
      this.showIndex = false;
      // 默认调用招投标接口
      await this.contractTenderProjectComparisonGetData({
        id: row.id
      });
     

      if (this.contractTenderProjectComparisonData && this.contractTenderProjectComparisonData.code) {
        this.$Notice.warning({
            title: this.contractTenderProjectComparisonData.data
        });
      } else {
        this.showProjectComparison = true;
      }
    },

    handleAdd() {
      this.action = 'add';
      this.userFormInit();
      this.addOrEdit = true;
    },

    userFormInit() {
      this.formValidate1 = {
        name: '',
        id: ''
      }
    },

    saveUser (name) {
        this.$refs[name].validate(async (valid) => {
            if (valid) {
                this.modal_loading = true;
                
                // 新增、编辑
                if (this.action === 'add') {
                  await this.contractTenderGetAdd(this.formValidate1);

                  if (this.contractTenderAdd && this.contractTenderAdd.code) {
                      this.$Notice.warning({
                          title: '新增失败'
                      });
                      this.modal_loading = false;
                  } else {
                      this.modal_loading = false;
                      this.addOrEdit = false;
                      this.$Notice.success({
                        title: '新增成功',
                        desc: '新增项目成功'
                      });
                      await this.getData();
                  }
                } else {
                  await this.contractTenderGetEdit(this.formValidate1);

                  if (this.contractTenderEdit && this.contractTenderEdit.code) {
                      this.$Notice.warning({
                          title: '修改失败'
                      });
                      this.modal_loading = false;
                  } else {
                      this.modal_loading = false;
                      this.addOrEdit = false;
                      this.$Notice.success({
                        title: '编辑成功',
                        desc: '编辑成功'
                      });
                      await this.getData();
                  }
                }
                
            }
        });
    },

    // 删除
    async del(row) {
       const params = {
          id: row.id
       }
       this.$Modal.confirm({
         title: `确定删除该项目吗？`,
         content: '请想清楚再操作哦',
         okText: '确定',
         onOk: async () => {
          await this.contractTenderGetDel(params);
          if (this.contractTenderDel && !this.contractTenderDel.code) {
            this.$Message.success('删除成功');
            await this.getData();
          } else {
             this.$Notice.warning({
               title: '删除失败'
             })
          }
         }
       })
    },

    // 页数改变重新获取
    async pageNumChange(pageNumber) {
      this.page.pageNumber = pageNumber;
      this.getData();
    },

    // 查看修改用户信息
    async showAndEdit(row) {
      this.action = 'edit';
      this.userFormInit();
      this.formValidate1 = {
        id: row.id,
        name: row.name
      };
      this.addOrEdit = true;
      setTimeout(() => {
        this.$refs['tenderForm'].validate();
      }, 200)
    },

    // 每页大小改变，要手动去改变页面大小参数
    pageSizeChange(pageSize) {
      this.page.pageSize = pageSize;
      if (this.page.pageNumber === 1) {
        this.getData();
      }
    },

    // 获取数据的统一方法
    async getData() {
      await this.contractTenderGetData(Object.assign({}, this.page, this.search));
      if (this.contractTenderData && this.contractTenderData.code) {
        this.$Notice.warning({
          title: this.contractTenderData.info
        })
      }
    },

    handleReset() {
      this.search = {
        name: ''
      }
      this.page.pageNumber = 1;
    },

    handleSearch() {
      // 进行搜索操作
      this.getData();
    }
  },

  components: {
    tableExpand,
    alCascader,
    tenderComparison,
    tenderBuy,
    tenderPayment,
    tenderUpload
  }
};
