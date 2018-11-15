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
        formValidateBuy: {
            id: '',
            tenderProjectId: '',
            contractName: '', // 合同名称
            contractType: '', // 合同类型
            contractNumber: '', // 合同编号
            contractAmount: '', // 合同金额
            cooperationUnit: '', // 合作单位
            signTime: '', // 签订日期
            payment:'', // 支付方式
            limitTime: '', // 工期
            unpaidItem: '', // 未付款项
            projectAccept: '', // 工程验收
            qualityGuaranteeDepositAmount: '', // 质保金金额
            remark: '' // 备注
        },
  
        conf,
  
        ruleValidateBuy: {
            contractName: [
                { required: true, message: '合同名称不得为空', trigger: 'blur' }
            ]
        },
        modal_loading: false,
        userData: null,
      };
    },
    watch: {
        show(newV) {
            if (newV) {
                if (this.contractTenderContractData.data) {
                    const newObj = JSON.parse(JSON.stringify(this.contractTenderContractData.data));
                    this.formValidateBuy = {
                        id: newObj.id,
                        tenderProjectId: this.contractTenderId,
                        contractName: newObj.contractName, // 合同名称
                        contractType: newObj.contractType, // 询价单位
                        contractNumber: newObj.contractNumber, // 供货单位
                        contractAmount: newObj.contractAmount,
                        cooperationUnit: newObj.cooperationUnit, // 备注
                        signTime: newObj.signTime, // 需求计划
                        payment: newObj.payment,
                        limitTime: newObj.limitTime,
                        unpaidItem: newObj.unpaidItem,
                        projectAccept: newObj.projectAccept,
                        qualityGuaranteeDepositAmount: newObj.qualityGuaranteeDepositAmount,
                        remark: newObj.remark
                    }
                } else {
                    this.formValidateBuy = {
                        id: '',
                        tenderProjectId: this.contractTenderId,
                        contractName: '', // 合同名称
                        contractType: '', // 询价单位
                        contractNumber: '', // 供货单位
                        contractAmount: '',
                        cooperationUnit: '', // 备注
                        signTime: '', // 需求计划
                        payment:'',
                        limitTime: '',
                        unpaidItem: '',
                        projectAccept: '',
                        qualityGuaranteeDepositAmount: '',
                        remark: ''
                    }
                }
                
            }
        }
    },
    computed: {
      ...mapGetters([
          'contractTenderId',
          'contractTenderContractData',
          'contractTenderContractAdd',
          'contractTenderContractEdit',
          'contractTenderContractDel'
      ])
    },
    methods: {
      ...mapActions([
        'contractTenderContractGetData',
        'contractTenderContractGetAdd',
        'contractTenderContractGetEdit',
        'contractTenderContractGetDel'
      ]),
  
  
      // 上传成功
      handleSuccess1 (res, file) {
        console.log(res);
        console.log(file);
        this.formValidateBuy.demandPlan = res.data.src;
      },

      // 上传成功
      handleSuccess2 (res, file) {
        console.log(res);
        console.log(file);
        this.formValidateBuy.procurementPlan = res.data.src;
      },
  
      // 格式验证失败
      handleFormatError (file) {
          this.$Notice.warning({
              title: '上传格式错误',
              desc: `${file.name}的格式不对，请上传图片`
          });
      },
  
      saveEdit (name) {
          this.$refs[name].validate(async (valid) => {
              if (valid) {
                  this.formValidateBuy.signTime = moment(this.formValidateBuy.signTime).format('YYYY-MM-DD')
                  this.modal_loading = true;
                  
                  // 新增、编辑
                  if (!this.formValidateBuy.id) {  // 新增
                    await this.contractTenderContractGetAdd(this.formValidateBuy);
  
                    if (this.contractTenderContractAdd && this.contractTenderContractAdd.code) {
                        this.$Notice.warning({
                            title: '新增失败'
                        });
                        this.modal_loading = false;
                    } else {
                        this.modal_loading = false;
                        this.$Notice.success({
                          title: '新增成功',
                          desc: '新增成功'
                        });
                    }
                  } else {
                    await this.contractTenderContractGetEdit(this.formValidateBuy);
  
                    if (this.contractTenderContractEdit && this.contractTenderContractEdit.code) {
                        this.$Notice.warning({
                            title: '编辑失败'
                        });
                        this.modal_loading = false;
                    } else {
                        this.modal_loading = false;
                        this.$Notice.success({
                          title: '编辑成功',
                          desc: '编辑成功'
                        });
                    }
                  }
              }
          });
      },
    }
  };
  