<template>
    <div style="position: relative; top: 0; left: 50%; transform: translate(-50%, 0)" class="axocx" v-if="showB">
        <div style="width:600px; height: 600px; border: 1px solid black; background:#C7EDCC;">

            <div style=" width:100%; height: 544px"
                 id='ActiveXDivOne'>
            </div>

            <div align="center"
                 style=" width:100%; height:36px">
                <input type="button"
                       value=" 放大 "
                       @click="ZoomIn();"
                       style="height: 32px" />
                <input type="button"
                       value=" 缩小 "
                       @click="ZoomOut();"
                       style="height: 32px" />
                <input type="button"
                       value=" 适合大小 "
                       @click="BestSize();"
                       style="height: 32px" />
                <input type="button"
                       value=" 1：1 "
                       @click="TrueSize();"
                       style="height: 32px" />
                <input type="button"
                       value=" 对焦 "
                       @click="ManualToFocus();"
                       style="height: 32px" />
                <input style="height: 32px"
                       id="Button5"
                       type="button"
                       value="设备属性"
                       @click="ShowImageSettingWindow();" />
            </div>

        </div>

        <div style="width:270px;height:600px;background:#C7EDCC; border: 1px solid black;">

            
            <div style="width: 268px; height: 200px; display: flex; justify-content: center; align-items: center;">
                <img id="img1"
                v-if="base64Str"
                 alt=""
                 :src="`data:;base64,${base64Str}`"
                 style="width: 270px; height: 200px" />
                 <p v-else style="font-size: 16px;">
                     暂未拍照
                 </p>
            </div>

            <table style="width:100%;  height: 64px">
                <tr>
                    <td>
                        设 备
                        <select id="Device"
                                name="D1"
                                onchange="ChangeDevice()">
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>
                        分辨率
                        <select style="width:120px"
                                id="Resolution"
                                name="D2"
                                onchange="ChangeResolution()">
                        </select>
                    </td>
                </tr>
            </table>

            <table style="width:100%;  height: 64px">
                <tr>
                    <td>
                        <input style="width:80px;  height: 60px"
                               id="Button1"
                               type="button"
                               value="打开"
                               @click="OpenDevice();" /></td>
                    <td rowspan="2" style="position: relative;">
                        <input style="width:80px;  height: 60px"
                               id="Button3"
                               type="button"
                               value="拍照"
                               @click="Capture();" />
                        <Spin fix style="width:80px;  height: 60px" v-show="showLoading">
                            <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
                            <div>上传中</div>
                        </Spin>
                    </td>
                    <td>
                        <input style="width:80px;  height: 60px"
                               id="Button2"
                               type="button"
                               value="关闭"
                               @click="CloseDevice();" /></td>
                </tr>

            </table>

            <table style="width:100%; height: 64px">
                <tr>
                    <td>
                        保存格式
                        <select id="FileType"
                                onchange="SetFileType()">
                            <option value="0">bmp</option>
                            <option value="1">jpg</option>
                            <option value="2">png</option>
                            <option value="3">tif</option>
                            <option value="4">gif</option>
                            <option value="5">pdf</option>
                        </select>
                    </td>

                    <td>
                        颜色格式
                        <select id="ColourMode"
                                onchange="SetImageColorMode()">
                            <option value="0">彩色</option>
                            <option value="1">灰度</option>
                            <option value="2">黑白</option>
                        </select>
                    </td>

                </tr>
                <tr>
                    <td>
                        旋 转
                        <select id="Rotate"
                                onchange="SetCamRotate()">
                            <option value="0">0</option>
                            <option value="1">90</option>
                            <option value="2">180</option>
                            <option value="2">270</option>
                        </select>
                    </td>

                </tr>
            </table>

            <table style="width: 100%; height: 32px">
                <tr>
                    <td>
                        <input id="Radio1"
                               checked="checked"
                               name="R1"
                               type="radio"
                               value="V1"
                               @click="SetCutType()" />不裁切
                    </td>
                    <td>
                        <input id="Radio2"
                               name="R1"
                               type="radio"
                               value="V2"
                               @click="SetCutType()" />自动裁切
                    </td>
                    <td>
                        <input id="Radio3"
                               name="R1"
                               type="radio"
                               value="V3"
                               @click="SetCutType()" />手动裁切
                    </td>
                </tr>

            </table>

            <!-- <table style="width: 100%; height: 32px">
                <tr>
                    <td>
                        <input style="width: 100%; height: 30px"
                               id="Button4"
                               type="button"
                               value="Http上传"
                               @click="HttpUploadFile();" />
                    </td>
                </tr>

            </table> -->

            <textarea style="width: 265px; height: 170px"
                      id="TextArea1"
                      rows="20"
                      cols="20"></textarea>

        </div>
    </div>
</template>


<style lang="less">
@import "./index.less";





































































</style>

<script src="./index.js">
</script>
