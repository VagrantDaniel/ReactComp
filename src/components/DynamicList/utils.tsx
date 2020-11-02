import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Input, Select } from 'antd';
import React from 'react';
import { RestParams, DataTypes, BuiltInParams, CustomParams, DefaultConfig } from './interface';


/**
 * 用途：为两个组件添加关系，待完善，
 * 目前仅支持select-select显示与隐藏功能
 * @param relationKey 关联的组件key
 * @param relationValue 关联的组件key的record取值
 * @param relationAction 相应的动作
 * @param record 是否进行该动作
 * @returns {Contents}
 */
const rest = (relationKey: string | number, relationValue: any, relationAction: string, record: { [x: string]: any; }) => {
  const relation = relationAction.split('->');
  let Contents = null;
  switch (relation[0]) {
    case 'style': {
      switch (relation[1]) {
        case 'display': {
          Contents = { display: record[relationKey] === relationValue ? 'inline-block' : 'none' };
          break;
        }
        default: {
          break;
        }
      }
      break;
    }
    default: {
      break;
    }
  }
  return Contents;
};

/**
 * 用于渲染Input组件
 * @param record: 参数
 * @param restParams: 其它可能参数，用途：type = 'module'时使用
 * @param item: 行参
 * @param index: 行数
 * @param builtInParams: 组件本身的属性
 * @param customParams: 自定义的属性
 * @returns {Contents}
 */
const RenderInputComp = (record: any, restParams: RestParams, item: DataTypes, index: number | string, builtInParams: BuiltInParams, customParams: CustomParams, defaultConfig: DefaultConfig) => {
  const config = defaultConfig || { labelStyle: { width: '200px' } };
  /**
   * labelStyle: 全局默认label样式
   */
  const { labelStyle } = config;

  /**
   * isNotDisplay: 是否不显示(true：不显示，false：显示)
   * isNotDisplayKey
   * isNotDisplayValue: record中`isNotDisplayKey`的值是否等于`isNotDisplayValue`(true：不显示，false：显示)
   * isDisabled：是否置灰(true：置灰，false：不置灰)
   * isDisabledKey
   * isDisabledValuerecord中`isNotDisplayKey`的值是否等于`isNotDisplayValue`(true：置灰，false：不置灰)
   */
  const { func = { }, isNotDisplay, isNotDisplayKey, isNotDisplayValue, isDisabled, isDisabledKey, isDisabledValue } = customParams;
  let { style = {} } = customParams;

  const { defaultValue = '' } = builtInParams;

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
    key, label, required,
  } = item;

  // 判断是否置灰
  const sureDisabled = isDisabled || (isDisabledKey && record && record[isDisabledKey] === isDisabledValue);

  // 判断是否显示
  if (isNotDisplay || (isNotDisplayKey && record && record[isNotDisplayKey] === isNotDisplayValue)) {
    style = { ...style, display: 'none' };
  }

  // input中onChange事件别名
  const { _onChange = () => {}, childRender } = func;

  let rowKey: string | null | undefined = null; let rowIndex: string | number | null | undefined = null;
  /**
   * restParams：其它可能参数，用途：type = 'module'时使用
   * 包括
   * rowKey: 改变的key
   * rowIndex: 改变的index
   */
  if (restParams) {
    rowKey = restParams.rowKey;
    rowIndex = restParams.rowIndex;
  }

  // 唯一key
  const InputKey = key ? item + '-' + key : item + '-' + index;

  const { display = 'inline-flex' } = style;
  let Contents;
  if (childRender && childRender.isShowKey === childRender.isShowValue) {
    Contents = (
      <div key={InputKey} style={{ display }}>
        <div className='inlineFlex mr10' key={InputKey} style={{ display }}>
          <label htmlFor={key} title={label} style={{ display: label ? 'block' : 'none', ...labelStyle }} className={required ? 'labelWidthRequired' : 'labelNoRequired'}>{label}</label>
          <Input
            key={InputKey}
            value={record && record[key] ? record[key] : defaultValue}
            className='inputDefaultStyle'
            style={style}
            {...builtInParams}
            disabled={sureDisabled || false}
            onChange={e => rowKey ? _onChange(e, key, rowKey, rowIndex) : _onChange(e, key)}
          />
        </div>{childRender && childRender.isShowKey === childRender.isShowValue ? childRender.render() : null}
      </div>
    )
  } else {
    Contents = (
        <div className='inlineFlex mr10' key={InputKey} style={{ display }}>
          <label htmlFor={key} title={label} style={{ display: label ? 'block' : 'none', ...labelStyle }} className={required ? 'labelWidthRequired' : 'labelNoRequired'}>{label}</label>
          <Input
            key={InputKey}
            value={record && record[key] ? record[key] : defaultValue}
            className='inputDefaultStyle'
            style={style}
            {...builtInParams}
            disabled={sureDisabled || false}
            onChange={e => rowKey ? _onChange(e, key, rowKey, rowIndex) : _onChange(e, key)}
          />
        </div>
    );
  }
  return Contents;
};

/**
 * 用于渲染Select组件
 * @param record: 参数
 * @param restParams: 其它可能参数，用途：type = 'module'时使用
 * @param item: 行参
 * @param index: 行数
 * @param builtInParams: 组件本身的属性
 * @param customParams: 自定义的属性
 * @returns {Contents}
 */
const RenderSelectComp = (record: any, restParams: RestParams, item: DataTypes, index: number | string, builtInParams: BuiltInParams, customParams: CustomParams, defaultConfig: DefaultConfig) => {
  const config = defaultConfig || { labelStyle: { width: '200px' } };
  /**
   * labelStyle: 全局默认label样式
   */
  const { labelStyle } = config;

  /**
   * isDisabled：是否置灰(true：置灰，false：不置灰)
   * isDisabledKey
   * isDisabledValuerecord中`isNotDisplayKey`的值是否等于`isNotDisplayValue`(true：置灰，false：不置灰)
   */
  const { isDisabled, isDisabledKey, isDisabledValue, func = { } } = customParams;
  let { style = {} } = customParams;

  // 判断是否置灰
  const sureDisabled = isDisabled || (isDisabledKey && record && record[isDisabledKey] === isDisabledValue);

  /**
   * options: 可选列表
   * defaultValue: 默认值
   */
  const { options, ...restBuiltInParams } = builtInParams;
  const { defaultValue = '' } = restBuiltInParams;

  // select中onChange事件别名
  const { _onChange = () => {}, childRender } = func;

  let rowKey: string | null | undefined = null; let rowIndex: string | number | null | undefined = null;

  /**
   * restParams：其它可能参数，用途：type = 'module'时使用
   * 包括
   * rowKey: 改变的key
   * rowIndex: 改变的index
   */
  if (restParams) {
    rowKey = restParams.rowKey;
    rowIndex = restParams.rowIndex;
  }

  const {
    key, label, required, icon,
    relationKey, relationAction, relationValue,
  } = item;

  // 唯一key
  const SelectKey = key ? item + '-' + key : item + '-' + index;

  /**
   * 为两个组件添加关系
   */
  if (relationKey && relationAction && record) {
    const OtherOperations = rest(relationKey, relationValue, relationAction, record);
    style = { ...style, ...OtherOperations };
  }

  const { display = 'inline-flex' } = style;
  let Contents: any;
  if (childRender && childRender.isShowKey === childRender.isShowValue) {
    Contents = (
      <div key={SelectKey}>
        <div style={{ display }} className='inlineFlex mr10' key={SelectKey}>
          <label htmlFor={key} title={label} style={{ display: label ? 'inline-block' : 'none', ...labelStyle }} className={required ? 'labelWidthRequired' : 'labelNoRequired'}>{label}</label>
          {icon}
          <Select
            autoClear
            showSearch
            key={SelectKey}
            className='selectDefaultStyle'
            value={record && record[key] ? Array.isArray(record[key]) ? record[key] : record[key].toString() : defaultValue ? defaultValue : undefined}
            style={{ display: 'inline-block', ...style }}
            {...restBuiltInParams}
            disabled={sureDisabled || false}
            onChange={v => rowKey ? _onChange(v, key, rowKey, rowIndex) : _onChange(v, key)}
          >
            {options}
          </Select>
        </div>{childRender && childRender.isShowKey === childRender.isShowValue ? childRender.render() : null}
      </div>
    );
  } else {
    Contents = (
        <div style={{ display }} className='inlineFlex mr10' key={SelectKey}>
          <label htmlFor={key} title={label} style={{ display: label ? 'inline-block' : 'none', ...labelStyle }} className={required ? 'labelWidthRequired' : 'labelNoRequired'}>{label}</label>
          {icon}
          <Select
            autoClear
            showSearch
            key={SelectKey}
            className='selectDefaultStyle'
            value={record && record[key] ? Array.isArray(record[key]) ? record[key] : record[key].toString() : defaultValue ? defaultValue : undefined}
            style={{ display: 'inline-block', ...style }}
            {...restBuiltInParams}
            disabled={sureDisabled || false}
            onChange={v => rowKey ? _onChange(v, key, rowKey, rowIndex) : _onChange(v, key)}
          >
            {options}
          </Select>
        </div>
    );
  }
  return Contents;
};

/**
 * 用于渲染IconAdd组件
 * @param self: this
 * @param record: 参数
 * @param restParams: 其它可能参数，用途：type = 'module'时使用
 * @param item: 行参
 * @param index: 行数
 * @param builtInParams: 组件本身的属性
 * @param customParams: 自定义的属性
 * @returns {Contents}
 */
const RenderIconAdd = (self: any, record: any, restParams: RestParams, item: DataTypes, index: number | string, builtInParams: BuiltInParams, customParams: CustomParams) => {
  /**
   * isDisabled：是否置灰(true：置灰，false：不置灰)
   * isDisabledKey
   * isDisabledValuerecord中`isNotDisplayKey`的值是否等于`isNotDisplayValue`(true：置灰，false：不置灰)
   */
  const { isNotDisplay, isNotDisplayKey, isNotDisplayValue, func = { } } = customParams;
  let { style = { } } = customParams;

  // 判断是否显示
  if (isNotDisplay || (isNotDisplayKey && record && record[isNotDisplayKey] === isNotDisplayValue)) {
    style = { ...style, display: 'none' };
  }

  // button中onClick事件别名
  const { _onAddClick = () => {} } = func;

  /**
   * restParams：其它可能参数，用途：type = 'module'时使用
   * 包括
   * rowKey: 改变的key
   */
  const { rowKey = null } = restParams;

  // 唯一key
  const { key } = item;
  const IconAddKey = key + '-' + index;

  const Contents = (<div className='inlineFlex mr10' key={IconAddKey}><Button key={IconAddKey} htmlType='button' shape='circle' size='small' icon={<PlusOutlined />} className='add-btn' onClick={() => self._onAddClick(rowKey, _onAddClick)} style={style} {...builtInParams} /></div>);
  return Contents;
};

/**
 * 用于渲染IconDel组件
 * @param self: this
 * @param record: 参数
 * @param restParams: 其它可能参数，用途：type = 'module'时使用
 * @param item: 行参
 * @param index: 行数
 * @param builtInParams: 组件本身的属性
 * @param customParams: 自定义的属性
 * @returns {Contents}
 */
const RenderIconDel = (self: any, record: any, restParams: RestParams, item: DataTypes, index: number | string, builtInParams: BuiltInParams, customParams: CustomParams) => {
  /**
   * isDisabled：是否置灰(true：置灰，false：不置灰)
   * isDisabledKey
   * isDisabledValuerecord中`isNotDisplayKey`的值是否等于`isNotDisplayValue`(true：置灰，false：不置灰)
   */
  const { isNotDisplay, isNotDisplayKey, isNotDisplayValue, func = { } } = customParams;
  let { style = { } } = customParams;

  // 判断是否显示
  if (isNotDisplay || (isNotDisplayKey && record && record[isNotDisplayKey] === isNotDisplayValue)) {
    style = { ...style, display: 'none' };
  }

  // button中onClick事件别名
  const { _onDelClick = () => {} } = func;

  /**
   * restParams：其它可能参数，用途：type = 'module'时使用
   * 包括
   * rowKey: 改变的key
   * rowIndex: 改变的index
   */
  const { rowKey = null, rowIndex = null } = restParams;

  // 唯一key
  const { key } = item;
  const IconDelKey = key + '-' + index;

  const Contents = (<div className='inlineFlex' key={IconDelKey}><Button key={IconDelKey} htmlType='button' shape='circle' size='small' icon={<MinusOutlined />} className='del-btn' onClick={() => self._onDelClick(rowKey, rowIndex, _onDelClick)} style={style} {...builtInParams} /></div>);
  return Contents;
};

export {
  RenderInputComp,
  RenderSelectComp,
  RenderIconDel,
  RenderIconAdd,
};
