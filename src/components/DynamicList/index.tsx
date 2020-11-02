/**
 * 用途: 动态基本组件，如Input、Select、Icon等，封装成动态组件
 */
import React, { Component } from 'react';
import { RenderInputComp, RenderSelectComp, RenderIconAdd, RenderIconDel } from './utils';
import './index.less';
import { Props, DataTypes, DataSource, DefaultConfig, RestParams } from './interface';

class DynamicList extends Component<Props> {
  /**
   * 新增一行
   * @param rowKey 行属性
   * @param rowIndex 行数
   * @param callback 传出onClick回调
   * @private
   */
  _onAddClick = (rowKey: string, callback: (rowKey: string) => void) => {
    callback(rowKey);
  };

  /**
   * 删除一行
   * @param rowKey 行属性
   * @param rowIndex 行数
   * @param callback 传出onClick回调
   * @private
   */
  _onDelClick = (rowKey: string, rowIndex: number, callback: (rowKey: string, rowIndex: number) => void) => {
    callback(rowKey, rowIndex);
  };

  /**
   * 用途：渲染动态组件
   * @param dataTypes 定义的组件类型组
   * @param dataSource 定义的组件类型组的参数，包括两种: builtInParams(组件本身的属性)和customParams(自定义的属性)
   * 说明：style放在了customParams中，因为该参数改动较大
   * @param record 记录的record
   * @param restParams 其它可能参数
   * @returns {Contents}
   * @private
   */
  _renderCombineContents = (dataTypes: DataTypes[][], dataSource: DataSource[][], record: any, defaultConfig?: DefaultConfig, restParams?: RestParams) => {
    const Contents = dataTypes?.map((row, rowNumber) => {
      const allContents = [];
      const rowContents : any = row.map((item, index) => {
        const colContents = [];
        /**
         * type: input | select | module
         * key: 属性名称
         * label: 标签名称
         * required: 是否显示必填icon
         * relationKey 关联的组件key
         * relationValue 关联的组件key的record取值
         * relationAction 相应的动作
         */
        const {
          type, key, label, required,
        } = item;
        /**
         * builtInParams: 组件本身的属性
         * customParams: 自定义的属性
         */
        const { builtInParams = { }, customParams = { } } = dataSource[rowNumber][index];
        /**
         * func 功能合集
         * style 样式
         */
        switch (type) {
          /**
           * type = 'input'
           */
          case 'input': {
            const tpl = RenderInputComp(record, restParams, item, index, builtInParams, customParams, defaultConfig);
            colContents.push(tpl);
            break;
          }
          case 'select': {
            const tpl = RenderSelectComp(record, restParams, item, index, builtInParams, customParams, defaultConfig);
            colContents.push(tpl);
            break;
          }
          case 'icon_add': {
            const tpl = RenderIconAdd(this, record, restParams, item, index, builtInParams, customParams);
            colContents.push(tpl);
            break;
          }
          case 'icon_del': {
            const tpl = RenderIconDel(this, record, restParams, item, index, builtInParams, customParams);
            colContents.push(tpl);
            break;
          }
          case 'module': {
            const config = defaultConfig || { labelStyle: { width: '200px' } };
            /**
             * labelStyle: 全局默认label样式
             */
            const { labelStyle } = config;

            // 找到record中设置的key的数组数据
            const rowKey = key;
            const params = record[key];
            /**
             * types: 定义的组件类型组
             * source 定义的组件类型组的参数，包括两种: builtInParams(组件本身的属性)和customParams(自定义的属性)
             */
            const { types, source } = dataSource[rowNumber][index];

            const labelText = (<label htmlFor={key} title={label} style={{ display: label ? 'inline-block' : 'none', ...labelStyle }} className={required ? 'labelWidthRequired' : 'labelNoRequired'}>{label}</label>);

            /**
             * restParams：其它可能参数，用途：type = 'module'时使用
             * 包括
             * rowKey: 改变的key
             * rowIndex: 渲染的record的行index
             */
            const restParams : RestParams = {
              rowKey,
            };

            if (params) {
              // 如果params存在应该是修改操作，给每一项动态content赋值
              params.forEach((param: any, paramIndex: string | number) => {
                restParams.rowIndex = paramIndex;
                const contents = this._renderCombineContents(types, source, param, config, restParams);
                colContents.push(<div className='row flex mb20' key={paramIndex}><div className='inlineBlock' style={{ visibility: paramIndex === 0 ? 'visible' : 'hidden', alignSelf: 'flex-start', marginTop: 6 }}>{labelText}</div>{contents}</div>);
              });
            } else {
              // 新增操作，只渲染一行，rowIndex自然为0
              restParams.rowIndex = 0;
              const contents = this._renderCombineContents(types, source, params, config, restParams);
              colContents.push(<div className='row flex mb20' key='0'><div className='inlineBlock' style={{ alignSelf: 'flex-start', marginTop: 6 }}>{labelText}</div>{contents}</div>);
            }
            break;
          }
        }
        // 渲染types中一项的content
        colContents.push(rowContents);
        // 返回一行每列
        return colContents;
      });
      // 判断是否types循环的是否type === 'module'
      const isModule = row.some(item => item.type === 'module');
      // 判断是否types循环的type === 'icon_add'，即有icon图标
      const hasIcon = row.some(item => item.type === 'icon_add');
      /**
       * types循环的每一个type
       * 1.type === 'module'时直接Push
       * 2.有icon图标，Push添加inlineBlock
       * 3.既不是type === 'module'，也没有icon图标，此时是普通的一行type, Push添加row flex标识
       */
      allContents.push(isModule ? rowContents : hasIcon ? (<div className='row inlineFlex' key={rowNumber}>{rowContents}</div>) : (<div className='row flex mb20' key={rowNumber}>{rowContents}</div>));
      // 返回一行
      return allContents;
    });
    // 返回所有
    return Contents;
  };

  render() {
    const { dataTypes, dataSource, defaultConfig, record } = this.props;
    return (
      <div className='dynamicList'>
        {this._renderCombineContents(dataTypes, dataSource, record, defaultConfig)}
      </div>
    );
  }
}

export default DynamicList;
