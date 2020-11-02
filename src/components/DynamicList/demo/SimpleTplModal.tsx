/**
 * demo1
 * 简单的input、select类型的表单
 */
import React, { Component } from 'react';
import { Modal, Select } from 'antd';
import DynamicList from '../index';
import { DataTypes, DataSource, DefaultConfig, } from '../interface';

interface AbstractBasicCompProps {
  dataTypes: DataTypes[][],
  dataSource: DataSource[][],
  defaultConfig?: DefaultConfig,
  record: any,
  key: string,
  className: string,
}

const Option = Select.Option;

class SimpleTplModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      record: {},
    };
  }

  _handleOk = () => {
    this._handleCancel();
  };

  _handleCancel = () => {
    this.setState({
      record: {},
    });
    this.props._closeModal();
  };

  /**
   * 输入框回调
   * @param e
   * @param type 改变的key
   * @private
   */
  _onChangeInput = (e, type) => {
    const values = { ...this.state.record };
    values[type] = e.target.value;
    console.log('_onChangeInput', values)
    this.setState({
      record: values,
    });
  };

  /**
   * 下拉框选择回调
   * @param val
   * @param type 改变的key
   * @private
   */
  _onChangeSelect = (val, type) => {
    const values = { ...this.state.record };
    values[type] = val;
    this.setState({
      record: values,
    });
  };

  render() {
    const { record, disabledPropertyIds } = this.state;
    const { isModalVisible, modalTitle, extendAttributesList } = this.props;
    const modalProps = {
      className: 'simpleTplModal',
      title: modalTitle,
      width: '800px',
      visible: isModalVisible,
      onOk: this._handleOK,
      onCancel: this._handleCancel,
      destroyOnClose: true,
      maskClosable: false,
    };
    console.log('extendAttributesList', extendAttributesList)
    // 属性英文列表
    const extendAttributesEN = extendAttributesList.map((item) => (
      <Option key={(item.id).toString()} value={(item.id).toString()} disabled={disabledPropertyIds?.includes(item.id)}>
        {item.name}
      </Option>
    ));

    const defaultConfig = {
      labelStyle: { width: '180px' },
    };

    const dataTypes : DataTypes[][] = [
      [
        { key: 'description', type: 'input', label: '事件类型中文名', required: true },
        { key: 'name', type: 'input', required: true },
      ],
      [
        { key: 'type1', type: 'select', label: '事件所属', required: true },
        { key: 'type2', type: 'select', required: true },
      ],
      [
        { key: 'name', type: 'input', label: '事件类型英文名', required: true },
        { key: 'type3', type: 'select', required: true },
      ],
    ];

    const dataSource : DataSource[][] = [
      [
        {
          builtInParams: {
            placeholder: '请输入事件类型中文名',
          },
          customParams: {
            isDisabledKey: 'allowDelete', isDisabledValue: false, func: { _onChange: this._onChangeInput },
          },
        },
        {
          builtInParams: {
            placeholder: '请输入事件类型英文名',
          },
          customParams: {
            func: { _onChange: this._onChangeInput },
          },
        },
      ],
      [
        {
          builtInParams: {
            options: extendAttributesEN,
            placeholder: '请输入事件所属',
          },
          customParams: {
            func: { _onChange: this._onChangeSelect },
          },
        },
        {
          builtInParams: {
            options: extendAttributesEN,
            placeholder: '请输入事件所属',
          },
          customParams: {
            func: { _onChange: this._onChangeSelect },
          },
        },
      ],
      [
        {
          builtInParams: {
            placeholder: '请输入事件类型英文名',
          },
          customParams: {
            func: { _onChange: this._onChangeInput },
          },
        },
        {
          builtInParams: {
            options: extendAttributesEN,
            placeholder: '请输入事件所属',
          },
          customParams: {
            func: { _onChange: this._onChangeSelect },
          },
        },
      ],
    ];

    const abstractBasicCompProps: AbstractBasicCompProps = {
      dataTypes,
      dataSource,
      defaultConfig,
      record,
      key: 'abstractBasicCompProps',
      className: 'abstractBasicCompProps',
    };

    return (
      <Modal {...modalProps}>
        <DynamicList {...abstractBasicCompProps} />
      </Modal>
    );
  }
}

export default SimpleTplModal;
