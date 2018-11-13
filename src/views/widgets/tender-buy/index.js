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
    async mounted() {
        this.userData = JSON.parse(Cookies.get('user'));
        console.log(this.conf);
    },
    data() {
      return {
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
    computed: {
      ...mapGetters([
      ])
    },
    methods: {
      ...mapActions([
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
  