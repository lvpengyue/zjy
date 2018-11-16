import {
    mapActions,
    mapGetters
  } from 'vuex';
  import Cookies from 'js-cookie';
  import Util from '../../../libs/util';
  import conf from '../../../store/conf';
  import moment from 'moment';
  // require styles
  
export default {
    props: {
        show: {
            type: Boolean,
            default: false
        }
    },

    async mounted() {
        this.userData = JSON.parse(Cookies.get('user'));
        console.log(this.conf);
    },
    data() {
      return {
        addOrEdit: false,
        columns: [
            {
                title: '项目进度',
                key: 'projectSchedule'
            },
            {
                title: '付款批次',
                key: 'paymentBatch'
            },
            {
                title: '付款金额（元）',
                key: 'amount'
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
                        // display: showDel
                    },
                    on: {
                        click: () => {
                        this.del(params.row.id);
                        }
                    }
                    }, '删除'),
                ]);
                }
            }
        ],
        formValidatePayment: {
            id: '',
            amount: 0,
            projectSchedule: "",
            paymentBatch: "",
            tenderProjectId: 0
        },
  
        conf,
  
        ruleValidatePayment: {
            projectSchedule: [
                { required: true, message: '项目进度不得为空', trigger: 'blur' }
            ],
            paymentBatch: [
                { required: true, message: '付款批次不得为空', trigger: 'blur' }
            ],
            amount: [
                { required: true, message: '付款金额不得为空', trigger: 'blur' }
            ],
        },
        modal_loading: false,
        userData: null,
      };
    },
    watch: {
        show(newV) {
            if (newV) {
                console.log(newV);
                // const newObj = JSON.parse(JSON.stringify(this.contractTenderProjectComparisonData.data));
                // this.formValidate2 = {
                //     id: newObj.id,
                //     tenderProjectId: this.contractTenderId,
                //     inquiryOfficer: newObj.inquiryOfficer, // 询价员
                //     inquiryUnit: newObj.inquiryUnit, // 询价单位
                //     supplyUnit: newObj.supplyUnit, // 供货单位
                //     remark: newObj.remark, // 备注
                //     demandPlan: newObj.demandPlan, // 需求计划
                //     procurementPlan: newObj.procurementPlan, // 采购计划
                // }
            }
        }
    },
    computed: {
      ...mapGetters([
          'contractTenderPaymentData',
          'contractTenderPaymentAdd',
          'contractTenderPaymentEdit',
          'contractTenderPaymentDel',

          'contractTenderId'
      ])
    },
    methods: {
      ...mapActions([
          'contractTenderPaymentGetData',
          'contractTenderPaymentGetAdd',
          'contractTenderPaymentGetEdit',
          'contractTenderPaymentGetDel',
      ]),

      handleAdd() {
        this.formValidatePayment = {
            id: '',
            amount: 0,
            projectSchedule: "",
            paymentBatch: "",
            tenderProjectId: this.contractTenderId
        }
        this.addOrEdit = true;
      },

      showAndEdit(row) {
        this.formValidatePayment = {
            id: row.id,
            amount: row.amount,
            projectSchedule: row.projectSchedule,
            paymentBatch: row.paymentBatch,
            tenderProjectId: this.contractTenderId
        }
        this.addOrEdit = true;
      },

      del(id) {
        const params = {
            id
         }
         this.$Modal.confirm({
           title: `确定删除该付款进度吗？`,
           content: '请想清楚再操作哦',
           okText: '确定',
           onOk: async () => {
            await this.contractTenderPaymentGetDel(params);
            if (this.contractTenderPaymentDel && !this.contractTenderPaymentDel.code) {
              this.$Message.success('删除成功');
              await this.contractTenderPaymentGetData({
                  id: this.contractTenderId
              });
            } else {
               this.$Notice.warning({
                 title: '删除失败'
               })
            }
           }
         })
      },
  
      savePayment (name) {
          this.$refs[name].validate(async (valid) => {
              if (valid) {
                  this.modal_loading = true;
                  
                  // 新增、编辑
                  if (!this.formValidatePayment.id) {  // 新增
                    await this.contractTenderPaymentGetAdd(this.formValidatePayment);
  
                    if (this.contractTenderPaymentAdd && this.contractTenderPaymentAdd.code) {
                        this.$Notice.warning({
                            title: '新增失败'
                        });
                        this.modal_loading = false;
                    } else {
                        this.modal_loading = false;
                        this.$Notice.success({
                          title: '新增成功',
                          desc: '新增付款进度成功'
                        })
                        this.addOrEdit = false;
                        await this.contractTenderPaymentGetData({
                            id: this.contractTenderId
                        });
                    }
                  } else {
                    await this.contractTenderPaymentGetEdit(this.formValidatePayment);
  
                    if (this.contractTenderPaymentEdit && this.contractTenderPaymentEdit.code) {
                        this.$Notice.warning({
                            title: '编辑失败'
                        });
                        this.modal_loading = false;
                    } else {
                        this.modal_loading = false;
                        this.$Notice.success({
                          title: '编辑成功',
                          desc: '编辑付款进度成功'
                        })
                        this.addOrEdit = false;
                        await this.contractTenderPaymentGetData({
                            id: this.contractTenderId
                        });
                    }
                  }
                  
              }
          });
      },
    }
  };
  