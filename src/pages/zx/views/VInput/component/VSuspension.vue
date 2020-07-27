<template>
  <div class="VSuspension">
    <VueCtkDateTimePicker
      color="#31749C"
      id="range1"
      format="YYYY-MM-DD HH:mm:ss"
      :no-label="true"
      :no-header="true"
      :noClearButton="true"
      ref="range"
      :no-shortcuts="true" :range="true" v-model="absoluteRange.timeRange"/>
    <!-- 悬浮 时间组件 -->
    <el-popover
      width="auto"
      :enterable='true'
      placement="top-start"
      v-model="isShow"
      trigger="click">
      <div style="width: 500px" class="container">
        <el-row :gutter="2" style="height: 100%">
          <!-- 绝对时间 -->
          <el-col :span="15">
            <div class="time-container absolute-time">
              <div class="time-title"> Absolute time range</div>
              <div class="time-content">
                <VueCtkDateTimePicker
                  color="#31749C"
                  id="range"
                  format="YYYY-MM-DD HH:mm:ss"
                  :no-label="true"
                  :no-header="true"
                  :noClearButton="true"
                  ref="range"
                  :no-shortcuts="true" :range="true" v-model="absoluteRange.timeRange"/>
                <el-form label-position="top" label-width="80px" size="mini">
                  <el-form-item label="Form:">
                    <el-input v-model="start"
                              @focus="handleFocus($event,'start')"
                              @blur="handleBlur($event,'start')"></el-input>
                  </el-form-item>
                  <el-form-item label="To:" :show-message="false">
                    <el-input v-model="end"
                              @focus="handleFocus($event,'end')"
                              @blur="handleBlur($event,'end')"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div class="buttons">
                <el-button type="primary" size="mini" @click="handleConfirm"> OK</el-button>
              </div>
            </div>
            <div class="history-container time-container">
              <div class="time-title"> Absolute time range</div>
              <div class="time-content history-content">
                <ul class="infinite-list" v-infinite-scroll="loadHistory">
                  <li v-for="(item,index) in historyConfig.list"
                      @click="historySelect(item,index)"
                      class="infinite-list-item el-dropdown-menu__item">
                    <el-row>
                      <el-col :span="11">
                        {{ item.start }}
                      </el-col>
                      <el-col :span="2">
                        to
                      </el-col>
                      <el-col :span="11">
                        {{ item.end }}
                      </el-col>
                    </el-row>
                  </li>
                </ul>
              </div>
            </div>
          </el-col>
          <!-- 分割线 -->
          <el-col :span="1" style="height: 100%">
            <el-divider class="divider" direction="vertical"></el-divider>
          </el-col>
          <!-- 相对时间 -->
          <el-col :span="8">
            <div class="time-container relative-time">
              <div class="time-title"> Relative time range</div>
              <div class="time-content">
                <div v-for="(item,index) in relativeRange.options"
                     :class="{'current-row':relativeRange.selectItem.id === item.id}"
                     @click="relativeTimeSelect(item,index)"
                     class="el-dropdown-menu__item relative-item">
                  {{ item.text }}
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div slot="reference">
        <slot v-bind:data="$data"></slot>
      </div>
    </el-popover>
  </div>
</template>

<script>
    import {cloneDeep} from "lodash";
    import Moment from 'moment'
    import history from './historyApi'

    export default {
        name: "VSuspension",
        data() {
            return {
                trigger: 'hover',    // 'hover' 'manual'
                isShow: false,
                //展示的时间
                historyConfig: {//历史
                    list: [],
                    maxLength: 10,
                },
                //绝对时间
                absoluteRange: {
                    timeRange: {
                        start: "",
                        end: ""
                    },
                },
                //相对时间
                relativeRange: {
                    selectItem: {},
                    timeRange: {
                        start: "",
                        end: ""
                    },
                    options: [
                        {
                            text: 'Last 5 minutes',
                            id: "5m",
                            setAbsTime() {
                                var end = Moment(); //当前时间
                                var start = Moment().subtract(5, 'm');
                                return {
                                    start: start.format("YYYY-MM-DD HH:mm:ss"),
                                    end: end.format("YYYY-MM-DD HH:mm:ss"),
                                }
                            }
                        },
                        {
                            text: 'Last 15 minutes',
                            id: "15m",
                            setAbsTime() {
                                var end = Moment(); //当前时间
                                var start = Moment().subtract(15, 'm');
                                return {
                                    start: start.format("YYYY-MM-DD HH:mm:ss"),
                                    end: end.format("YYYY-MM-DD HH:mm:ss"),
                                }
                            }

                        },
                        {
                            text: 'Last 30 minutes',
                            id: "30m",
                            setAbsTime() {
                                var end = Moment(); //当前时间
                                var start = Moment().subtract(30, 'm');
                                return {
                                    start: start.format("YYYY-MM-DD HH:mm:ss"),
                                    end: end.format("YYYY-MM-DD HH:mm:ss"),
                                }
                            }
                        },
                        {
                            text: 'Last 1 hour',
                            id: "1h",
                            setAbsTime() {
                                var end = Moment(); //当前时间
                                var start = Moment().subtract(1, 'h');
                                return {
                                    start: start.format("YYYY-MM-DD HH:mm:ss"),
                                    end: end.format("YYYY-MM-DD HH:mm:ss"),
                                }
                            }
                        },
                        {
                            text: 'Last 3 hours',
                            id: "3h",
                            setAbsTime() {
                                var end = Moment(); //当前时间
                                var start = Moment().subtract(3, 'h');
                                return {
                                    start: start.format("YYYY-MM-DD HH:mm:ss"),
                                    end: end.format("YYYY-MM-DD HH:mm:ss"),
                                }
                            }
                        },
                        {
                            text: 'Last 6 hours',
                            id: "6h",
                            setAbsTime() {
                                var end = Moment(); //当前时间
                                var start = Moment().subtract(6, 'h');
                                return {
                                    start: start.format("YYYY-MM-DD HH:mm:ss"),
                                    end: end.format("YYYY-MM-DD HH:mm:ss"),
                                }
                            }
                        },
                        {
                            text: 'Last 12 hours',
                            id: "12h",
                            setAbsTime() {
                                var end = Moment(); //当前时间
                                var start = Moment().subtract(12, 'h');
                                return {
                                    start: start.format("YYYY-MM-DD HH:mm:ss"),
                                    end: end.format("YYYY-MM-DD HH:mm:ss"),
                                }
                            }
                        },
                        // {
                        //     text: 'Last 24 hours',
                        //     id: "24h",
                        //     setAbsTime() {
                        //         var end = Moment(); //当前时间
                        //         var start = Moment().subtract(1, 'd');
                        //         return {
                        //             start: start.format("YYYY-MM-DD HH:mm:ss"),
                        //             end: end.format("YYYY-MM-DD HH:mm:ss"),
                        //         }
                        //     }
                        // },
                        // {
                        //     text: 'Last 1 week',
                        //     id: "1w",
                        //     setAbsTime() {
                        //         var end = Moment(); //当前时间
                        //         var start = Moment().subtract(1, 'w');
                        //         return {
                        //             start: start.format("YYYY-MM-DD HH:mm:ss"),
                        //             end: end.format("YYYY-MM-DD HH:mm:ss"),
                        //         }
                        //     }
                        // }
                    ]
                },
            }
        },
        created() {
            this.initComponent()
        },
        mounted() {
        },
        computed: {
            start: {
                get() {
                    return this.relativeRange.timeRange.start || this.absoluteRange.timeRange.start
                },
                set(val) {
                    if (isNaN(val) && !isNaN(Date.parse(val))) {
                        //日期格式
                        this.relativeRange.timeRange.start = null
                        this.absoluteRange.timeRange.start = new Date(val)
                    }
                }
            },
            end: {
                get() {
                    return this.relativeRange.timeRange.end || this.absoluteRange.timeRange.end
                },
                set(val) {
                    if (isNaN(val) && !isNaN(Date.parse(val))) {
                        //日期格式
                        this.relativeRange.timeRange.end = null
                        this.absoluteRange.timeRange.end = new Date(val)
                    }
                }
            }
        },
        watch: {
            'absoluteRange.timeRange': {
                handler(n, o) {
                    this.relativeRange.selectItem = {}
                    this.relativeRange.timeRange = {
                        start: "",
                        end: ""
                    }
                },
                deep: true,
                immediate: true
            }
        },
        methods: {
            initComponent() {
                this.historyConfig.list = history.getHistory()
            },
            loadHistory() {

            },
            handleFocus(event, type) {
                setTimeout(() => {
                    this.$refs['range'].pickerOpen = true
                }, 200)
            },
            handleBlur(event, type) {

            },
            handleConfirm() {
                var text = null
                var isError = false
                var type = "absolute";   // absolute relative
                if (this.relativeRange.timeRange.start) {
                    text = this.relativeRange.selectItem.text
                    type = 'relative'
                } else {
                    type = 'absolute'
                    if (this.absoluteRange.timeRange.start && this.absoluteRange.timeRange.end) {
                        text = this.absoluteRange.timeRange.start + '  -  ' + this.absoluteRange.timeRange.end
                    } else {
                        isError = true
                    }
                }
                if (isError) {
                    this.$message.warning('time Error')
                    return
                }

                var payload = {
                    text,
                    type,
                    start: this.absoluteRange.timeRange.start,
                    end: this.absoluteRange.timeRange.end,
                }
                this.$emit("pick", payload)
                this.historySave(payload)
                this.isShow = false
            },
            historySave(item) {
                // var newItem=cloneDeep(item)
                // this.historyConfig.list.push(item)
                // if( this.historyConfig.list.length > this.historyConfig.list.maxLength){
                //     this.historyConfig.list.shift()
                // }
                history.addItem(item)
                this.historyConfig.list = history.getHistory()
            },
            relativeTimeSelect(item, index,callback) {
                if (item.id === this.relativeRange.timeRange.id) {
                    this.relativeRange.selectItem = {}
                    this.relativeRange.timeRange = {
                        start: "",
                        end: ""
                    }
                    callback && callback()
                } else {
                    this.absoluteRange.timeRange = item.setAbsTime();
                    setTimeout(() => {
                        this.relativeRange.selectItem = item
                        this.relativeRange.timeRange = {
                            end: 'now',
                            start: "now - " + item.text
                        }
                        callback && callback()
                    })

                }
            },
            historySelect(item, index) {
                this.absoluteRange.timeRange.start = item.start
                this.absoluteRange.timeRange.end = item.end
            }
        },
        components: {}
    }
</script>

<style lang="less" scoped>
  .VSuspension {
    /*padding: 20px;*/
    /*position: absolute;*/
    /*top: 25px;*/
    /*left: 0;*/
    /*z-index: 10;*/
    /*margin: 5px 0;*/
    /*background-color: #FFFFFF;*/
    /*border: 1px solid #EBEEF5;*/
    /*border-radius: 4px;*/
    /*box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);*/

    .arrow {
      border: 5px solid transparent;
      display: inline-block;
      border-bottom-color: #ffffff;
      position: absolute;
      top: -9px;
    }
  }

  .container {
    width: 480px;
    height: 380px;

    .time-title {
      line-height: 20px;
      font-size: 16px !important;
      margin-bottom: 18px;
    }

    .time-content {
      /deep/ .el-form-item.el-form-item--mini {
        margin-bottom: 0 !important;
      }

      /deep/ .el-form--label-top .el-form-item__label {
        padding-top: 2px;
        padding-bottom: 0;
        line-height: 18px;
        font-size: 12px !important;
      }
    }

    .buttons {
      /*text-align: center;*/

      .el-button--mini {
        padding: 5px 24px;
        font-size: 12px;
        border-radius: 3px;
        margin-top: 6px;
      }
    }

    .divider {
      height: 100%;
    }
  }

  .absolute-time {

  }

  .relative-time {

  }

  .history-content {
    /*border: 1px solid red;*/
    height: 182px;

    .infinite-list {
      overflow-y: auto;
      text-align: center;
      height: 100%;
    }

    .infinite-list-item {

    }
  }

  .el-dropdown-menu__item {
    line-height: 28px;
    padding: 0;
  }

  .current-row {
    background-color: #eaf1f5;
    color: #5a90b0;
  }

  .current-row:after {
    float: right;
    font-family: "iconfont" !important;
    content: "\E661";
    font-weight: bold;
  }

  /* 隐藏 */
  .el-date-editor.el-input {
    /* width: 100%;*/
  }

  /deep/ .el-input--suffix .el-input__inner {
    /*padding-right: 30px;*/
    padding-right: 0;
  }

  /deep/ .date-time-picker input {
    display: none;
  }

  /deep/ .datepicker {
    top: -50px !important;
    left: -333px !important;
    min-width: 320px !important;
    width: 320px !important;

  }

  //隐藏下面的对号  --不是特别必要
  /deep/ .datepicker-buttons-container {
    display: none !important;
  }


</style>
