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
                title: '名称',
                key: 'name'
            },
            {
                title: '创建时间',
                key: 'createtime'
            },
            {
                title: '操作',
                key: 'action',
                width: 300,
                align: 'center',
                render: (h, params) => {
                return h('div', [
                    h('a', {
                    attrs: {
                        href: params.row.url,
                        download: params.row.name,
                    },
                    style: {
                        marginRight: '5px',
                        display: 'inline-block',
                        lineHeight: '1.5',
                        padding: '6px 15px',
                        borderRadius: '4px',
                        color: '#fff',
                        backgroundColor: 'rgb(45, 140, 240)',
                        borderColor: '#2d8cf0',
                        transition: 'color .2s linear,background-color .2s linear,border .2s linear'
                    },
                    }, '下载'),      
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
        formValidateFile: {
            id: '',
            amount: 0,
            projectSchedule: "",
            FileBatch: "",
            tenderProjectId: 0
        },
  
        conf,
  
        ruleValidateFile: {
            projectSchedule: [
                { required: true, message: '项目进度不得为空', trigger: 'blur' }
            ],
            FileBatch: [
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
          'contractTenderFileData',
          'contractTenderFileAdd',
          'contractTenderFileEdit',
          'contractTenderFileDel',

          'contractTenderId'
      ])
    },
    methods: {
      ...mapActions([
          'contractTenderFileGetData',
          'contractTenderFileGetAdd',
          'contractTenderFileGetEdit',
          'contractTenderFileGetDel',
      ]),

      // 上传成功
    async handleSuccess (res, file) {
        console.log(res);
        console.log(file);
        this.$Message.success('文件上传成功');
        await this.contractTenderFileGetData({
            id: this.contractTenderId
        })
      },
  
      // 格式验证失败
      handleFormatError (file) {
          this.$Notice.warning({
              title: '上传格式错误',
              desc: `${file.name}的格式不对，请上传图片`
          });
      },

      del(id) {
        const params = {
            id
         }
         this.$Modal.confirm({
           title: `确定删除该文件吗？`,
           content: '请想清楚再操作哦',
           okText: '确定',
           onOk: async () => {
            await this.contractTenderFileGetDel(params);
            if (this.contractTenderFileDel && !this.contractTenderFileDel.code) {
              this.$Message.success('删除成功');
              await this.contractTenderFileGetData({
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
    }  
  };
  