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
    data() {
      return {
        columns: [
            {
              title: '公司名称',
              key: 'company'
            },
            {
              title: '单价',
              key: 'univalent'
            },
            {
              title: '金额',
              key: 'money'
            },
            {
                title: '生产厂家及品牌',
                key: 'factoryBrand'
              },
            {
              title: '到货时间',
              key: 'arrivalTime'
            },
            {
              title: '备注',
              key: 'remark'
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
        formValidate2: {
            id: '', // 接口获取到的id
            tenderProjectId: '',
            inquiryOfficer: '', // 询价员
            inquiryUnit: '', // 询价单位
            supplyUnit: '', // 供货单位
            remark: '', // 备注
            demandPlan: '', // 需求计划
            procurementPlan: '', // 采购计划
        },
  
        conf,
  
        ruleValidate2: {
            inquiryOfficer: [
                { required: true, message: '询价员不得为空', trigger: 'blur' }
            ],
            // author: [
            //     { required: true, message: '作者不得为空', trigger: 'blur' }
            // ],
            // releaseTime: [
            //     { required: true, message: '发布时间不得为空', trigger: 'change' }
            // ],
            // typeId: [
            //     { required: true, message: '新闻类型不得为空', trigger: 'change' },
            // ],
            // source: [
            //     { required: true, message: '新闻来源不得为空', trigger: 'blur' },
            // ],
            // synopsis: [
            //     { required: true, message: '新闻简介不得为空', trigger: 'blur' },
            // ],
        },

        // 询价单模块
        showInquiry: false,
        formValidateInquiry: {
            id: '',
            tenderProjectId: '',
            name: "",
            specificationType: "",
            unit: "",
            number: 0,
            univalent: 0,
            money: 0,
            factoryBrand: "",
            arrivalTime: "",
            remark: ""
        },
        ruleValidateInquiry: {
            name: [
                { required: true, message: '名称不得为空', trigger: 'blur' }
            ],
        },

        // 报价单模块
        showQuotation: false,
        formValidateQuotation: {
            id: '',
            tenderProjectId: '',
            name: "",
            specificationType: "",
            unit: "",
            number: 0,
            univalent: 0,
            money: 0,
            factoryBrand: "",
            arrivalTime: "",
            remark: ""
        },
        ruleValidateQuotation: {
            name: [
                { required: true, message: '名称不得为空', trigger: 'blur' }
            ],
        },

        // 比价单模块
        showComparison: false,
        formValidateComparison: {
            id: '',
            tenderProjectId: '',
            name: "",
            specificationType: "",
            unit: "",
            number: 0
        },
        ruleValidateComparison: {
            name: [
                { required: true, message: '名称不得为空', trigger: 'blur' }
            ],
        },

        // 公司比价单模块
        showCompany: false,
        formValidateCompany: {
            id: '',
            tenderProjectId: '',
            company: '',
            univalent: 0,
            money: 0,
            factoryBrand: "",
            arrivalTime: "",
            remark: ""
        },
        ruleValidateCompany: {
            company: [
                { required: true, message: '名称不得为空', trigger: 'blur' }
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
                if (this.contractTenderProjectComparisonData.data) {
                    const newObj = JSON.parse(JSON.stringify(this.contractTenderProjectComparisonData.data));
                    this.formValidate2 = {
                        id: newObj.id,
                        tenderProjectId: this.contractTenderId,
                        inquiryOfficer: newObj.inquiryOfficer, // 询价员
                        inquiryUnit: newObj.inquiryUnit, // 询价单位
                        supplyUnit: newObj.supplyUnit, // 供货单位
                        remark: newObj.remark, // 备注
                        demandPlan: newObj.demandPlan, // 需求计划
                        procurementPlan: newObj.procurementPlan, // 采购计划
                    }
                } else {
                    this.formValidate2 = {
                        id: '',
                        tenderProjectId: this.contractTenderId,
                        inquiryOfficer: '', // 询价员
                        inquiryUnit: '', // 询价单位
                        supplyUnit: '', // 供货单位
                        remark: '', // 备注
                        demandPlan: '', // 需求计划
                        procurementPlan: '', // 采购计划
                    }
                }  
                
            }
        }
    },
    computed: {
      ...mapGetters([
          'contractTenderProjectComparisonData',
          'contractTenderProjectComparisonAdd',
          'contractTenderProjectComparisonEdit',
          'contractTenderProjectComparisonDel',

          'contractTenderInquiryData',
          'contractTenderInquiryAdd',
          'contractTenderInquiryEdit',
          'contractTenderInquiryDel',

          'contractTenderQuotationData',
          'contractTenderQuotationAdd',
          'contractTenderQuotationEdit',
          'contractTenderQuotationDel',

          'contractTenderComparisonData',
          'contractTenderComparisonAdd',
          'contractTenderComparisonEdit',
          'contractTenderComparisonDel',

          'contractTenderCompanyData',
          'contractTenderCompanyAdd',
          'contractTenderCompanyEdit',
          'contractTenderCompanyDel',

          'contractTenderId'
      ]),
    },
    methods: {
      ...mapActions([
          'contractTenderProjectComparisonGetAdd',
          'contractTenderProjectComparisonGetEdit',
          'contractTenderProjectComparisonGetDel',

          'contractTenderInquiryGetData',
          'contractTenderInquiryGetAdd',
          'contractTenderInquiryGetEdit',
          'contractTenderInquiryGetDel',

          'contractTenderQuotationGetData',
          'contractTenderQuotationGetAdd',
          'contractTenderQuotationGetEdit',
          'contractTenderQuotationGetDel',

          'contractTenderComparisonGetData',
          'contractTenderComparisonGetAdd',
          'contractTenderComparisonGetEdit',
          'contractTenderComparisonGetDel',

          'contractTenderCompanyGetData',
          'contractTenderCompanyGetAdd',
          'contractTenderCompanyGetEdit',
          'contractTenderCompanyGetDel',
      ]),

      addCompany() {
          this.formValidateCompany = {
            id: '',
            tenderProjectId: this.contractTenderId,
            company: '',
            univalent: 0,
            money: 0,
            factoryBrand: "",
            arrivalTime: "",
            remark: ""
          };
          this.showCompany = true;
      },

      showAndEdit(row) {
        this.formValidateCompany = {
            id: row.id,
            tenderProjectId: this.contractTenderId,
            company: row.company,
            univalent: row.univalent,
            money: row.money,
            factoryBrand: row.factoryBrand,
            arrivalTime: row.arrivalTime,
            remark: row.remark
          };
          this.showCompany = true;
      },

      del(id) {
        const params = {
            id
         }
         this.$Modal.confirm({
           title: `确定删除该公司比价单吗？`,
           content: '请想清楚再操作哦',
           okText: '确定',
           onOk: async () => {
            await this.contractTenderCompanyGetDel(params);
            if (this.contractTenderCompanyDel && !this.contractTenderCompanyDel.code) {
              this.$Message.success('删除成功');
              await this.contractTenderCompanyGetData({
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

      // 点击询价单
      async showInquiryModal() {
        // 调用接口
        await this.contractTenderInquiryGetData({
            id: this.contractTenderId
        });

        if (this.contractTenderInquiryData && this.contractTenderInquiryData.data) {
            this.formValidateInquiry = {
                id: this.contractTenderInquiryData.data.id,
                tenderProjectId: this.contractTenderId,
                name: this.contractTenderInquiryData.data.name,
                specificationType: this.contractTenderInquiryData.data.specificationType,
                unit: this.contractTenderInquiryData.data.unit,
                number: this.contractTenderInquiryData.data.number,
                univalent: this.contractTenderInquiryData.data.univalent,
                money: this.contractTenderInquiryData.data.money,
                factoryBrand: this.contractTenderInquiryData.data.factoryBrand,
                arrivalTime: this.contractTenderInquiryData.data.arrivalTime,
                remark: this.contractTenderInquiryData.data.remark
            }
        } else {
            this.formValidateInquiry = {
                id: '',
                tenderProjectId: this.contractTenderId,
                name: "",
                specificationType: "",
                unit: "",
                number: 0,
                univalent: 0,
                money: 0,
                factoryBrand: "",
                arrivalTime: "",
                remark: ""
            }
        };

        // 展示弹框
        this.showInquiry = true;
      },

      // 点击报价单详情
      async showQuotationModal() {
        // 调用接口
        await this.contractTenderQuotationGetData({
            id: this.contractTenderId
        });

        if (this.contractTenderQuotationData && this.contractTenderQuotationData.data) {
            this.formValidateQuotation = {
                id: this.contractTenderQuotationData.data.id,
                tenderProjectId: this.contractTenderId,
                name: this.contractTenderQuotationData.data.name,
                specificationType: this.contractTenderQuotationData.data.specificationType,
                unit: this.contractTenderQuotationData.data.unit,
                number: this.contractTenderQuotationData.data.number,
                univalent: this.contractTenderQuotationData.data.univalent,
                money: this.contractTenderQuotationData.data.money,
                factoryBrand: this.contractTenderQuotationData.data.factoryBrand,
                arrivalTime: this.contractTenderQuotationData.data.arrivalTime,
                remark: this.contractTenderQuotationData.data.remark
            }
        } else {
            this.formValidateQuotation = {
                id: '',
                tenderProjectId: this.contractTenderId,
                name: "",
                specificationType: "",
                unit: "",
                number: 0,
                univalent: 0,
                money: 0,
                factoryBrand: "",
                arrivalTime: "",
                remark: ""
            }
        };

        // 展示弹框
        this.showQuotation = true;
      },

      // 点击比价单详情
      async showComparisonModal() {
        // 调用接口
        await this.contractTenderComparisonGetData({
            id: this.contractTenderId
        });

        await this.contractTenderCompanyGetData({
            id: this.contractTenderId
        });

        if (this.contractTenderComparisonData && this.contractTenderComparisonData.data) {
            this.formValidateComparison = {
                id: this.contractTenderComparisonData.data.id,
                tenderProjectId: this.contractTenderId,
                name: this.contractTenderComparisonData.data.name,
                specificationType: this.contractTenderComparisonData.data.specificationType,
                unit: this.contractTenderComparisonData.data.unit,
                number: this.contractTenderComparisonData.data.number,
            }
        } else {
            this.formValidateComparison = {
                id: '',
                tenderProjectId: this.contractTenderId,
                name: "",
                specificationType: "",
                unit: "",
                number: 0,
            }
        };

        // 展示弹框
        this.showComparison = true;
      },

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

      saveCompany(name) {
        this.formValidateCompany.arrivalTime = moment(this.formValidateCompany.arrivalTime).format('YYYY-MM-DD');
        this.modal_loading = true;
        this.$refs[name].validate(async (valid) => {
            if (valid) {
                if (this.formValidateCompany.id) {
                    await this.contractTenderCompanyGetEdit(this.formValidateCompany);
                    if (this.contractTenderCompanyEdit && this.contractTenderCompanyEdit.code) {
                        this.$Notice.warning({
                            title: this.contractTenderCompanyEdit.data
                        })
                        this.modal_loading = false;
                    } else {
                      this.modal_loading = false;
                      this.showCompany = false;
                      this.$Message.success('编辑成功');
                      await this.contractTenderCompanyGetData({
                        id: this.contractTenderId
                    });
                    }
                } else {
                    await this.contractTenderCompanyGetAdd(this.formValidateCompany);
                    if (this.contractTenderCompanyAdd && this.contractTenderCompanyAdd.code) {
                        this.$Notice.warning({
                            title: this.contractTenderCompanyAdd.data
                        })
                        this.modal_loading = false;
                    } else {
                        this.modal_loading = false;
                        this.showCompany = false;
                        this.$Message.success('新增成功');
                        await this.contractTenderCompanyGetData({
                            id: this.contractTenderId
                        });
                    }
                }
            }
        })
      },

      saveProjectComparison(name) {
        this.$refs[name].validate(async (valid) => {
            if (valid) {
                if (this.formValidate2.id) {
                    await this.contractTenderProjectComparisonGetEdit(this.formValidate2);
                    if (this.contractTenderProjectComparisonEdit && this.contractTenderProjectComparisonEdit.code) {
                        this.$Notice.warning({
                            title: this.contractTenderProjectComparisonEdit.data
                        })
                    } else {
                      this.$Message.success('编辑成功');
                    }
                } else {
                    await this.contractTenderProjectComparisonGetAdd(this.formValidate2);
                    if (this.contractTenderProjectComparisonAdd && this.contractTenderProjectComparisonAdd.code) {
                        this.$Notice.warning({
                            title: this.contractTenderProjectComparisonAdd.data
                        })
                    } else {
                       this.$Message.success('新增成功');
                    }
                }
            }
        })
      },

      saveInquiry(name) {
        this.formValidateInquiry.arrivalTime = moment(this.formValidateInquiry.arrivalTime).format('YYYY-MM-DD');
        this.modal_loading = true;
        this.$refs[name].validate(async (valid) => {
            if (valid) {
                if (this.formValidateInquiry.id) {
                    await this.contractTenderInquiryGetEdit(this.formValidateInquiry);
                    if (this.contractTenderInquiryEdit && this.contractTenderInquiryEdit.code) {
                        this.$Notice.warning({
                            title: this.contractTenderInquiryEdit.data
                        })
                        this.modal_loading = false;
                    } else {
                      this.modal_loading = false;
                      this.showInquiry = false;
                      this.$Message.success('编辑成功');
                    }
                } else {
                    await this.contractTenderInquiryGetAdd(this.formValidateInquiry);
                    if (this.contractTenderInquiryAdd && this.contractTenderInquiryAdd.code) {
                        this.$Notice.warning({
                            title: this.contractTenderInquiryAdd.data
                        })
                        this.modal_loading = false;
                    } else {
                        this.modal_loading = false;
                        this.showInquiry = false;
                        this.$Message.success('新增成功');
                    }
                }
            }
        })
      },

      // 保存报价单
      saveQuotation(name) {
        this.formValidateQuotation.arrivalTime = moment(this.formValidateQuotation.arrivalTime).format('YYYY-MM-DD');
        this.modal_loading = true;
        this.$refs[name].validate(async (valid) => {
            if (valid) {
                if (this.formValidateQuotation.id) {
                    await this.contractTenderQuotationGetEdit(this.formValidateQuotation);
                    if (this.contractTenderQuotationEdit && this.contractTenderQuotationEdit.code) {
                        this.$Notice.warning({
                            title: this.contractTenderQuotationEdit.data
                        })
                        this.modal_loading = false;
                    } else {
                      this.modal_loading = false;
                      this.showQuotation = false;
                      this.$Message.success('编辑成功');
                    }
                } else {
                    await this.contractTenderQuotationGetAdd(this.formValidateQuotation);
                    if (this.contractTenderQuotationAdd && this.contractTenderQuotationAdd.code) {
                        this.$Notice.warning({
                            title: this.contractTenderQuotationAdd.data
                        })
                        this.modal_loading = false;
                    } else {
                        this.modal_loading = false;
                        this.showQuotation = false;
                        this.$Message.success('新增成功');
                    }
                }
            }
        })
      },

      // 保存比价单
      saveCompare(name) {
        this.modal_loading = true;
        this.$refs[name].validate(async (valid) => {
            if (valid) {
                if (this.formValidateComparison.id) {
                    await this.contractTenderComparisonGetEdit(this.formValidateComparison);
                    if (this.contractTenderComparisonEdit && this.contractTenderComparisonEdit.code) {
                        this.$Notice.warning({
                            title: this.contractTenderComparisonEdit.data
                        })
                        this.modal_loading = false;
                    } else {
                      this.modal_loading = false;
                    //   this.showComparison = false;
                      this.$Message.success('编辑成功');
                    }
                } else {
                    await this.contractTenderComparisonGetAdd(this.formValidateComparison);
                    if (this.contractTenderComparisonAdd && this.contractTenderComparisonAdd.code) {
                        this.$Notice.warning({
                            title: this.contractTenderComparisonAdd.data
                        })
                        this.modal_loading = false;
                    } else {
                        this.modal_loading = false;
                        // this.showComparison = false;
                        this.$Message.success('新增成功');
                    }
                }
            }
        })
      },

      // 删除询比价 调用删除接口，并手动清空表单
      async delProjectComparison() {
          await this.contractTenderProjectComparisonGetDel({
              id: this.formValidate2.id
          })

          if (this.contractTenderProjectComparisonDel && this.contractTenderProjectComparisonDel.code) {
              this.$Notice.warning({
                  title: this.contractTenderProjectComparisonDel.data
              })
          } else {
            this.$Message.success('删除成功');
            this.formValidate2 = {
                id: '', // 接口获取到的id
                tenderProjectId: this.contractTenderId,
                inquiryOfficer: '', // 询价员
                inquiryUnit: '', // 询价单位
                supplyUnit: '', // 供货单位
                remark: '', // 备注
                demandPlan: '', // 需求计划
                procurementPlan: '', // 采购计划
            }
          }
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
  