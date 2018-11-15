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
        search: {
            name: ''
        },
        columns: [
            {
                title: '用户名',
                key: 'amount'
            },
            {
                title: '真实姓名',
                key: 'projectSchedule'
            },
            {
                title: '手机号',
                key: 'paymentBatch'
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
                        type: 'success',
                        size: 'default'
                    },
                    style: {
                        marginRight: '5px',
                        display: 'inline-block'
                    },
                    on: {
                        click: () => {
                        this.editPassword(params.row);
                        }
                    }
                    }, '重置密码'),
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
                        this.del(params.row.uid);
                        }
                    }
                    }, '删除'),
                ]);
                }
            }
        ],
        formValidate1: {
            inquiryOfficer: '', // 询价员
            inquiryUnit: '', // 询价单位
            supplyUnit: '', // 供货单位
            remark: '', // 备注
            demandPlan: '', // 需求计划
            procurementPlan: '', // 采购计划
        },
  
        conf,
  
        ruleValidate1: {
            name: [
                { required: true, message: '文章标题不得为空', trigger: 'blur' }
            ],
            author: [
                { required: true, message: '作者不得为空', trigger: 'blur' }
            ],
            releaseTime: [
                { required: true, message: '发布时间不得为空', trigger: 'change' }
            ],
            typeId: [
                { required: true, message: '新闻类型不得为空', trigger: 'change' },
            ],
            source: [
                { required: true, message: '新闻来源不得为空', trigger: 'blur' },
            ],
            synopsis: [
                { required: true, message: '新闻简介不得为空', trigger: 'blur' },
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
          'contractTenderPaymentData'
      ])
    },
    methods: {
      ...mapActions([
          'contractTenderPaymentGetData'
      ]),
  
  
      // 上传成功
      handleSuccess1 (res, file) {
        console.log(res);
        console.log(file);
        this.formValidate1.demandPlan = res.data.src;
      },

      // 上传成功
      handleSuccess2 (res, file) {
        console.log(res);
        console.log(file);
        this.formValidate1.procurementPlan = res.data.src;
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
            //   if (valid) {
            //       this.formValidate1.content = this.content;
            //       this.formValidate1.releaseTime = moment(this.formValidate1.releaseTime).format('YYYY-MM-DD HH:mm:ss')
            //       this.modal_loading = true;
                  
            //       // 新增、编辑
            //       if (!this.formValidate1.id) {  // 新增
            //         await this.newsGetAdd(this.formValidate1);
  
            //         if (this.newsAdd && this.newsAdd.code) {
            //             this.$Notice.warning({
            //                 title: '新增失败'
            //             });
            //             this.modal_loading = false;
            //         } else {
            //             this.modal_loading = false;
            //             this.$Notice.success({
            //               title: '新增成功',
            //               desc: '新增新闻成功'
            //             });
                        
            //             this.$router.push({
            //               name: 'news_index'
            //             })
            //         }
            //       } else {
            //         await this.newsGetEdit(this.formValidate1);
  
            //         if (this.newsEdit && this.newsEdit.code) {
            //             this.$Notice.warning({
            //                 title: '编辑失败'
            //             });
            //             this.modal_loading = false;
            //         } else {
            //             this.modal_loading = false;
            //             this.$Notice.success({
            //               title: '编辑成功',
            //               desc: '编辑新闻成功'
            //             });
                        
            //             this.$router.push({
            //               name: 'news_index'
            //             })
            //         }
            //       }
                  
            //   }
          });
      },
    }
  };
  