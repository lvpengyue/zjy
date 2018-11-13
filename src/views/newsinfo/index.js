import {
  mapActions,
  mapGetters
} from 'vuex';
import Cookies from 'js-cookie';
import Util from '../../libs/util';
import conf from '../../store/conf';
import moment from 'moment';
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
 
import { quillEditor } from 'vue-quill-editor'

export default {
  async mounted() {
    this.userData = JSON.parse(Cookies.get('user'));

    if (this.$route.query.id) {
      // 获取新闻详情
      await this.newsGetInfo({
        id: this.$route.query.id
      })

      this.formValidate1 = {
          id: this.newsInfo.data.id,
          author: this.newsInfo.data.author,
          content: this.newsInfo.data.content,
          imgUrl: this.newsInfo.data.imgUrl,
          name: this.newsInfo.data.name,
          releaseTime: this.newsInfo.data.releaseTime,
          source: this.newsInfo.data.source,
          synopsis: this.newsInfo.data.synopsis,
          typeId: this.newsInfo.data.typeId
      };

      this.content = this.newsInfo.data.content;
    }

    await this.newsGetType();
  },
  data() {
    return {
        content: '',
        editorOption: {
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'],
              ['blockquote', 'code-block'],
              [{ 'header': 1 }, { 'header': 2 }],
              [{ 'list': 'ordered' }, { 'list': 'bullet' }],
              [{ 'script': 'sub' }, { 'script': 'super' }],
              [{ 'indent': '-1' }, { 'indent': '+1' }],
              [{ 'direction': 'rtl' }],
              [{ 'size': ['small', false, 'large', 'huge'] }],
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
              [{ 'font': [] }],
              [{ 'color': [] }, { 'background': [] }],
              [{ 'align': [] }],
              ['clean'],
              ['link', 'image', 'video']
            ],
          }
        },
        formValidate1: {
          id: '',
          author: '',
          content: '',
          imgUrl: '',
          name: '',
          releaseTime: '',
          source: '',
          synopsis: '',
          typeId: ''
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
      columns: [
        {
          title: '新闻标题',
          key: 'name'
        },
        {
          title: '新闻类型',
          key: 'type'
        },
        {
          title: '新闻来源',
          key: 'source'
        },
        {
          title: '发布时间',
          key: 'releaseTime',
          render: (h, params) => {
            return ('div', new Date(params.row.releaseTime).toLocaleString())
          }
        },
        {
          title: '缩略图',
          key: 'imgUrl',
          render: (h, params) => {
            return h('Avatar', {
              props: {
                src: params.row.imgUrl,
                shape: 'square'
              },
              style: {
                width: '50px',
                height: '50px'
              }
            })
          }
        },
        {
          title: '作者',
          key: 'author'
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
                    this.del(params.row.id);
                  }
                }
              }, '删除'),
            ]);
          }
        }
      ]
    };
  },
  computed: {
    ...mapGetters([
      'newsInfo',
      'newsAdd',
      'newsEdit',
      'newsType'
    ])
  },
  methods: {
    ...mapActions([
      'newsGetInfo',
      'newsGetAdd',
      'newsGetEdit',
      'newsGetType'
    ]),


    // 上传成功
    handleSuccess (res, file) {
      console.log(res);
      console.log(file);
      this.formValidate1.imgUrl = res.data.src;
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
                this.formValidate1.content = this.content;
                this.formValidate1.releaseTime = moment(this.formValidate1.releaseTime).format('YYYY-MM-DD HH:mm:ss')
                this.modal_loading = true;
                
                // 新增、编辑
                if (!this.formValidate1.id) {  // 新增
                  await this.newsGetAdd(this.formValidate1);

                  if (this.newsAdd && this.newsAdd.code) {
                      this.$Notice.warning({
                          title: '新增失败'
                      });
                      this.modal_loading = false;
                  } else {
                      this.modal_loading = false;
                      this.$Notice.success({
                        title: '新增成功',
                        desc: '新增新闻成功'
                      });
                      
                      this.$router.push({
                        name: 'news_index'
                      })
                  }
                } else {
                  await this.newsGetEdit(this.formValidate1);

                  if (this.newsEdit && this.newsEdit.code) {
                      this.$Notice.warning({
                          title: '编辑失败'
                      });
                      this.modal_loading = false;
                  } else {
                      this.modal_loading = false;
                      this.$Notice.success({
                        title: '编辑成功',
                        desc: '编辑新闻成功'
                      });
                      
                      this.$router.push({
                        name: 'news_index'
                      })
                  }
                }
                
            }
        });
    },

    // 删除
    async del(id) {
       const params = {
          id
       }
       this.$Modal.confirm({
         title: `确定删除该新闻吗？`,
         content: '请想清楚再操作哦',
         okText: '确定',
         onOk: async () => {
          await this.newsGetDel(params);
          if (this.newsDel && !this.newsDel.code) {
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
        uid: row.uid,
        email: row.email,
        idcard: row.idcard,
        password: row.password,
        phone: row.phone,
        realName: row.realName,
        remark: row.remark,
        roleId: `${row.roleId}`,
        userName: row.userName
      };
      setTimeout(() => {
        this.$refs['userForm'].validate();
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
      await this.newsGetData(Object.assign({}, this.page, this.search));
      if (this.newsData && this.newsData.code) {
        this.$Notice.warning({
          title: this.newsData.info
        })
      }
    },

    handleReset() {
      this.search = {
        typeId: ''
      }
      this.page.pageNumber = 1;
    },

    handleSearch() {
      // 进行搜索操作
      this.getData();
    }
  },

  components: {
    quillEditor
  }
};
