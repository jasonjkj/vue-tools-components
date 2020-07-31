<template>
  <div class="VTimePicker">
    <v-suspension
      ref="suspension"
      @pick="handelTimePick"
      v-on="$listeners"
    >
      <template v-slot:default="scope">
        <el-popover
          popper-class="suspension"
          ref="popver"
          width="auto"
          :enterable='true'
          placement="bottom-start"
          trigger="hover">
          <div class="container">
            <!-- 悬浮展示 -->
            <ul class="popper-obj">
              <li class="object-item-sub">
                <div>
                  <span class="suspension-title"> form: </span>
                  <span class="suspension-title"> to: </span>
                </div>
                <div>
                  <span class="mouse_object_item">{{ start }}</span>
                  <span class="mouse_object_item">{{ end }}</span>
                </div>
              </li>
            </ul>
          </div>
          <div slot="reference">
            <el-input suffix-icon="icon-Time iconfont"
                      @input.native="limitInput($event)"
                      @focus="handleFocus()"
                      @blur="handleBlur()"
                      class="icon-input"
                      slot="reference" v-model="text"></el-input>
          </div>
        </el-popover>
      </template>
    </v-suspension>
  </div>
</template>

<script>
    import VSuspension from './component/VSuspension'
    import Moment from 'moment'
    export default {
        name: "VTimePicker",
        props: ['dateConfig'],
        data() {
            return {
                text: "",
                intervals: "",
                start: "",
                end: ""
            }
        },
        created(){
            this.text=this.dateConfig.text
            this.intervals=this.dateConfig.duration
            this.start=this.dateConfig.start
            this.end=this.dateConfig.end
        },
        mounted(){
            this.$nextTick(()=>{
                //给时间一个默认值
                var defaultItem={
                    start: '2020-06-30 18:38:45',
                    end: '2020-07-07 18:38:45'
                }
                this.$refs.suspension.historySelect(defaultItem);
                this.$refs.suspension.handleConfirm()
            })
        },
        methods: {
            handelTimePick(params) {
                this.text = params.text;
                this.start = params.start;
                this.end = params.end;

            },
            limitInput(e) {
                //禁止用户输入
                this.$nextTick(() => {
                    e.target.value = this.value
                })
            },
            handleFocus(scope) {
                //聚焦事件
                // scope.default.trigger='manual'
                // scope.default.isShow=true
            },
            handleBlur(scope) {
                // scope.default.trigger='hover'
                // scope.default.isShow=false
            }
        },
        computed:{

        },
        watch: {},
        components: {
            VSuspension
        }
    }
</script>

<style lang="less" scoped>
  .VTimePicker {
    position: relative;
    display: inline-block;
    float: right;
    margin-right: 15px;
  }

  /* 输入框样式 */
  .icon-input {
    width: 300px;

    /deep/ .el-input__suffix {
      left: 5px;
      right: auto;
    }

  }

  /* popover的样式 */
  .object-item-sub {
    overflow: hidden;
  }

  .object-item-sub > div:first-child {
    margin-right: 20px;
  }

  .object-item-sub > div {
    float: left;
  }

  .popper-obj {
    li {
      padding: 14px;
    }
  }
</style>
