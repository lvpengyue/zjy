export default {
    watch: {
        showB (newV, oldV) {
            if (newV) {
                setTimeout(() => {
                    const that = this;
                    that.loadActiveX();
                    that.InitLoad();
                    that.OpenDevice();
                }, 300);
            }
        }
    },
    props: {
        showB: {
            type: Boolean,
            default: false
        },
        showLoading: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            CamID: -1,
            captureCount: 0,
            DeviceStatus: false,
            isOpenCamera: false,
            rotate: 0,
            meter1: null,
            axOcx: null,
            base64Str: '' // 拍照的图片
        };
    },

    methods: {

        // let t2 = window.setTimeout("show()", 3000);

        show (op) {
            alert(op);
        },

        ShowInfo (op) {
            let obj = document.getElementById('TextArea1');
            obj.value = obj.value + ' \n' + op;
        },

        loadActiveX () {
            if ((navigator.userAgent.indexOf('MSIE') >= 0) && (navigator.userAgent.indexOf('Opera') < 0)) {
                // IE浏览器加载控件
                document.getElementById('ActiveXDivOne').innerHTML = '<OBJECT id="axOcx"  classid="clsid:D662BB12-95FC-4E4B-AD98-10AD44D6C1F0" width="100%" height="544px" ></OBJECT>';
            } else {
                // 其他浏览器加载控件
                document.getElementById('ActiveXDivOne').innerHTML = '<OBJECT id="axOcx" type="application/x-camera"  clsid="{D662BB12-95FC-4E4B-AD98-10AD44D6C1F0}"  width="100%" height="544px" ></OBJECT>';
            }
        },

        InitLoad () {
            this.axOcx = window.axOcx;
            let fileTypeObj = document.getElementById('FileType');
            fileTypeObj.selectedIndex = 1;

            let devObj = document.getElementById('Device');
            const devCount = this.axOcx.GetMyDeviceCount(); // 获取设备数目
            if (devCount == 0) this.ShowInfo('未发现相关设备');
            if (devCount == 1) {
                let objOption = document.createElement('option');
                objOption.text = '主摄像头';
                objOption.value = 0;
                devObj.options.add(objOption);
            }
            if (devCount == 2) {
                let objOption = document.createElement('option');
                objOption.text = '主摄像头';
                objOption.value = 0;
                devObj.options.add(objOption);

                objOption = document.createElement('option');
                objOption.text = '辅摄像头';
                objOption.value = 1;
                devObj.options.add(objOption);
            }

            if (devCount > 0) {
                let resObj = document.getElementById('Resolution');
                this.CamID = devObj.selectedIndex;
                let ResolutionCount = this.axOcx.GetResolutionCount(this.CamID); // 获取分辨率数目
                if (ResolutionCount > 0) {
                    for (let i = 0; i < ResolutionCount; i++) {
                        let objOption = document.createElement('option');
                        objOption.text = this.axOcx.GetResolution(i); // 获取指定索引的分辨率
                        objOption.value = i;
                        resObj.options.add(objOption);
                    }
                }
            }
        },

        countSecond () {
            alert('定时器');
            this.meter1 = setTimeout(this.countSecond(), 1000);
        },

        // 开启摄像头
        OpenDevice () {
            let devObj = document.getElementById('Device');
            if (devObj.options.length > 0) {
                let resObj = document.getElementById('Resolution');
                let ResolutionStr = resObj.value;
                let iRect = this.axOcx.OpenCamera(this.CamID, ResolutionStr);
                if (iRect == 0) {
                    this.isOpenCamera = true;
                } else {
                    // axmw_cam_ocx1.CloseCamera();
                    this.axOcx.CloseCamera();
                    this.isOpenCamera = false;
                }
            }
        },

        // 关闭摄像头
        CloseDevice () {
            if (this.isOpenCamera) {
                this.axOcx.CloseCamera();
                this.isOpenCamera = false;
                this.ShowInfo('关闭设备');
            }
        },

        // 抓图拍照
        async Capture () {
            if (this.isOpenCamera == false) return;
            this.captureCount = +new Date();
            let obj = document.getElementById('FileType');
            let path = 'D:\\img_' + this.captureCount;
            let suffix = '';
            if (obj.selectedIndex == 0) suffix = '.bmp';
            if (obj.selectedIndex == 1) suffix = '.jpg';
            if (obj.selectedIndex == 2) suffix = '.png';
            if (obj.selectedIndex == 3) suffix = '.tif';
            if (obj.selectedIndex == 4) suffix = '.gif';
            if (obj.selectedIndex == 5) suffix = '.pdf';
            path = path + suffix;
            // let base64Str = this.axOcx.CaptureImage(path);

            await this.axOcx.CaptureImage(path);
            let base64Str = this.axOcx.GetBase64FromFile(path);

            this.$emit('uploadImg', base64Str);
            this.base64Str = base64Str;
            // let imgobj1 = document.getElementById('img1');
            // imgobj1.src = path;
            // imgobj1.src = 'data:;base64,' + base64Str;
            let info = '拍照成功,图片路径:' + path;
            this.ShowInfo(info);

            // this.axOcx.CaptureImage(path);
            // this.compressPhoto(path, 3264, 2448, (base64) => {
            //     this.$emit('uploadImg', base64);
            //     this.base64Str = base64;
            //     // let imgobj1 = document.getElementById('img1');
            //     // imgobj1.src = path;
            //     // imgobj1.src = 'data:;base64,' + base64Str;
            //     let info = '拍照成功,图片路径:' + path;
            //     this.ShowInfo(info);
            // });
        },

        // 压缩图片的方法
        compressPhoto (path, maxWidth, maxHeight, fun) {
            const img = new Image();

            // 缩放图片需要的canvas
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');

            const that = this;

            // base64地址图片加载完毕后
            img.onload = function () {
                const ori = that.getPhotoOrientation(img);

                // 图片原始尺寸
                const originWidth = this.width;
                const originHeight = this.height;

                // 目标尺寸
                let targetWidth = originWidth;
                let targetHeight = originHeight;

                // 图片尺寸超过400x400的限制

                if (originWidth > maxWidth || originHeight > maxHeight) {
                    if (originWidth / originHeight > maxWidth / maxHeight) {
                        // 更宽，按照宽度限定尺寸
                        targetWidth = maxWidth;
                        targetHeight = Math.round(maxWidth * (originHeight / originWidth));
                    } else {
                        targetHeight = maxHeight;
                        targetWidth = Math.round(maxHeight * (originWidth / originHeight));
                    }
                }

                // canvas对图片进行缩放
                canvas.width = targetWidth;
                canvas.height = targetHeight;

                // 清除画布
                context.clearRect(0, 0, targetWidth, targetHeight);

                if (ori && ori == 6) {
                    context.save(); // 保存状态
                    context.translate(targetWidth / 2, targetHeight / 2); // 设置画布上的(0,0)位置，也就是旋转的中心点
                    context.rotate(90 * (Math.PI / 180)); // 把画布旋转90度
                    // 执行Canvas的drawImage语句
                    context.drawImage(img, 0 - (targetHeight / 2), 0 - (targetWidth / 2), targetHeight, targetWidth);// 把图片绘制在画布translate之前的中心点，
                    context.restore();// 恢复状态
                } else {
                    // 图片压缩
                    context.drawImage(img, 0, 0, targetWidth, targetHeight);
                }

                const base = canvas.toDataURL('image/jpeg', 1);// canvas转码为base64

                fun(base);
            };

            img.src = path;
        },

        // 切换摄像头
        ChangeDevice () {
            let resObj = document.getElementById('Resolution');
            resObj.options.length = 0; // 清空

            let devObj;
            devObj = document.getElementById('Device');

            this.CamID = devObj.selectedIndex;
            let ResolutionCount = this.axOcx.GetResolutionCount(this.CamID); // 获取分辨率数目
            if (ResolutionCount > 0) {
                for (let i = 0; i < ResolutionCount; i++) {
                    let objOption = document.createElement('option');
                    objOption.text = this.axOcx.GetResolution(i); // 获取指定索引的分辨率
                    objOption.value = i;
                    resObj.options.add(objOption);
                }
            }

            let ResolutionStr = resObj.options[resObj.selectedIndex].text;
            let iRect = this.axOcx.OpenCamera(this.CamID, ResolutionStr);
            if (iRect == 0) {
                this.isOpenCamera = true;
                this.ShowInfo('成功切换摄像头');
            } else {
                this.axOcx.CloseCamera();
                this.isOpenCamera = false;
                this.ShowInfo('切换摄像头失败');
            }
        },

        // 切换分辨率
        ChangeResolution () {
            if (this.isOpenCamera == true) {
                this.axOcx.CloseCamera();
                this.isOpenCamera = false;

                let resObj = document.getElementById('Resolution');
                let ResolutionStr = resObj.options[resObj.selectedIndex].text;
                this.ShowInfo(ResolutionStr);
                let iRect = this.axOcx.OpenCamera(this.CamID, ResolutionStr);
                if (iRect == 0) {
                    this.isOpenCamera = true;
                    this.ShowInfo('成功切换分辨率');
                } else {
                    this.axOcx.CloseCamera();
                    this.isOpenCamera = false;
                    this.ShowInfo('切换分辨率失败');
                }
            }
        },

        // 设置图片类型
        SetFileType () {
            let obj = document.getElementById('FileType');
            this.axOcx.SetFileType(obj.selectedIndex);
        },

        // 设置图片颜色格式
        SetImageColorMode () {
            let obj = document.getElementById('ColourMode');
            this.axOcx.SetImageColorMode(obj.selectedIndex);
        },

        // 设置裁剪方式
        SetCutType () {
            if (document.getElementById('Radio1').checked) {
                this.axOcx.SetCutType(0);
            }
            if (document.getElementById('Radio2').checked) {
                this.axOcx.SetCutType(1);
            }
            if (document.getElementById('Radio3').checked) {
                this.axOcx.SetCutType(2);
            }
        },

        // 旋转
        SetCamRotate () {
            if (this.isOpenCamera == false) return;
            let obj = document.getElementById('Rotate');
            let angle = obj.options[obj.selectedIndex].text;
            this.axOcx.SetCamRotate(angle);
        },

        // Http上传测试
        HttpUploadFile () {
            let iRect = this.axOcx.UploadFile('http://localhost:4523/UploadFile.ashx', 'C:\\test.jpg');
            if (iRect == 0) {
                this.ShowInfo('上传成功');
            } else {
                this.ShowInfo('上传失败');
            }
        },

        // 放大
        ZoomIn () {
            if (this.isOpenCamera == false) return;
            this.axOcx.ZoomIn();
        },

        // 缩小
        ZoomOut () {
            if (this.isOpenCamera == false) return;
            this.axOcx.ZoomOut();
        },

        // 适合大小
        BestSize () {
            if (this.isOpenCamera == false) return;
            this.axOcx.BestSize();
        },

        // 实际大小
        TrueSize () {
            if (this.isOpenCamera == false) return;
            this.axOcx.TrueSize();
        },

        // 对焦
        ManualToFocus () {
            if (this.isOpenCamera == false) return;
            this.axOcx.ManualToFocus();
        },

        // 设备属性
        ShowImageSettingWindow () {
            if (this.isOpenCamera == false) return;
            this.axOcx.ShowImageSettingWindow();
        }
    }
};
