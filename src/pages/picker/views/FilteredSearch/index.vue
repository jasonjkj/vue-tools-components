<template>
  <div class="filtered-search-container">
    <!-- 搜索框容器  -->
    <div class="filtered-search-box" :class="isFocus ? 'focus':''">
      <!-- 历史记录下拉菜单...` -->
      <recent-search slot="dropdown">...</recent-search>
      <el-divider direction="vertical" class="divider"></el-divider>
      <div class="scroll-container">
        <div class="list-container">
          <List-item
            :key="item.id" v-for="(item,index) in selectItems"
            @del="handleDel"
            :isLast="index === selectItems.length-1"
            :selectItem="item" :ref="'selectItems'+index"/>
          <el-select
            :popper-append-to-body="true"
            popper-class="select-popper"
            class="label-select"
            v-show="conditionConfig.isShow"
            v-model="conditionConfig.currentCondition"
            @change="addCondition"
            @focus="handleFocus"
            @blur="handleBlur"
            size="mini"
            remote
            filterable
            :allow-create="false"
            default-first-option
            placeholder="请输入需要搜索的字段">
            <el-option
              v-for="(item,index) in conditionConfig.conditionList"
              v-show="false"
              :key="index"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
      </div>
      <i v-if="1" class="el-icon-close clear-icon" @click="handleClear"></i>
    </div>
  </div>
</template>

<script>
  export default {
    name: "FilteredSearch",
    components: {
      // GlIcon,
      RecentSearch: () => import('./components/RecentSearch'),
      ListItem: () => import('./components/ListItem.vue')
    },
    props: {},
    data() {
      return {
        //标签列表  可选的参数分类
        conditionConfig: {
          conditionList: [
            {
              id: 1,
              name: 'ID',
              icon: 'iconfont icon-id',
              type: 'input',
              label: 'profileId',
              disabled: false,
            },
            {
              id: 2,
              name: 'Name',
              icon: 'iconfont icon-name',
              type: 'input',
              label: 'profileName',
              disabled: false,
            },
            {
              name: 'Sub Type',
              id: 3,
              type: 'objectSubType',
              label: 'objectSubType',
              disabled: false,
            },
            {
              id: 28,
              name: 'Type',
              icon: 'iconfont icon-name',
              type: 'select',
              label: 'type',
              disabled: false,
            },
            {
              id: 29,
              name: 'Keywords',
              icon: 'iconfont icon-name',
              type: 'input',
              label: 'keywords',
              disabled: false,
            }
          ],
          isShow: true,
          currentCondition: "",  //当前搜索条件
        },
        //选中的数据 ...
        selectItems: [],
        //对外输入框 搜索过滤框
        isFocus: false,
      };
    },
    methods: {
      handleFocus() {
        this.isFocus = true
      },
      handleBlur() {
        this.isFocus = false
      },
      addCondition(conditionCode) {
        var timer = setTimeout(() => {
          var delIndex = null
          var matchItem = this.conditionConfig.conditionList.find((item, index) => {
            if (item.id === conditionCode) {
              delIndex = index
              return true
            }
            return false
          });
          if (matchItem) {
            this.selectItems.push(matchItem)
            this.conditionConfig.conditionList.splice(delIndex, 1)
          }
          if (this.selectItems && this.selectItems.length > 0) {
            setTimeout(() => {
              var lastIndex = this.selectItems.length - 1;
              var lastComponent = this.$refs['selectItems' + lastIndex] && this.$refs['selectItems' + lastIndex][0];
              lastComponent && lastComponent.handleFocus && lastComponent.handleFocus()
            }, 100)
          }
          this.conditionConfig.currentCondition = null
          this.conditionConfig.isShow = false
        })
      },
      handleReset() {

      },
      handleClear() {

      },
      handleDel(delItem) {
        var delIndex = this.selectItems.findIndex((item, index) => {
          if (delItem.id === item.id) {
            delIndex = index
            return true
          }
          return false
        });
        this.selectItems.splice(delIndex, 1)
        this.conditionConfig.conditionList.push(delItem);
      }
    },
  };
</script>
<style scoped>
  /* 聚焦样式 */
  .filtered-search-box.focus {
    border-color: #73afea;
    box-shadow: 0 0 4px rgba(115, 175, 234, 0.4);
  }

  .filtered-search-box {
    position: relative;
    display: flex;
    width: 100%;
    min-width: 0;
    border: 1px solid #e5e5e5;
    background-color: #fff;
    border-radius: 4px 0 0 4px;
  }

  .divider {
    height: auto !important;
    margin: 0 !important;
  }

  .list-container {
    list-style: none;
    display: flex;
    position: relative;
    margin-bottom: 0;
    width: auto;
    padding-left: 8px;
    box-sizing: border-box;
  }

  .scroll-container {
    flex: auto;
    overflow-y: auto;
  }

  .clear-icon {
    line-height: 24px;
    padding: 0 10px;
    cursor: pointer;
  }

  /deep/ .el-input--mini .el-input__inner {
    height: 24px;
    line-height: 24px;
    border: none;
    border-radius: unset;
  }
  .label-select{
    flex: auto;
  }
  /deep/ .label-select .el-input__inner {

    padding-left: 0;
    min-width: 180px;
  }

  .list-container {
    white-space: nowrap;
    width: 100%;
  }
</style>


