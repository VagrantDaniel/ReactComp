/**
 * demo2
 * input + select联动
 * select + select联动
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

class LinkageTplModal extends Component {
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
   * 属性中英文联动
   * @param val
   * @param type
   * @private
   */
  _onChangeSelectProperties = val => {
    const values = { ...this.state.record };
    values.name = val;
    values.description = val;
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

  /**
   * select + input
   * @param val
   * @param type
   * @private
   */
  _onChangeSelectWithInput = (val, type) => {
    const values = { ...this.state.record };
    values[type] = val;
    values.description2 = val;
    this.setState({
      record: values,
    });
  };

  render() {
    const { record, disabledPropertyIds } = this.state;
    const { isModalVisible, modalTitle, extendAttributesList, metaDataList, enumList } = this.props;
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

    // 属性英文列表
    const extendAttributesEN = extendAttributesList.map((item) => (
      <Option key={(item.id).toString()} value={(item.id).toString()} disabled={disabledPropertyIds?.includes(item.id)}>
        {item.name}
      </Option>
    ));

    // 属性中文列表
    const extendAttributesCN = extendAttributesList.map((item) => (
      <Option key={(item.id).toString()} value={(item.id).toString()} disabled={disabledPropertyIds?.includes(item.id)}>
        {item.description}
      </Option>
    ));
    // 属性值类型
    const metaData = metaDataList.map((item) => (
      <Option key={item.key} value={item.key}>
        {item.value}
      </Option>
    ));
    // 枚举类类型
    const enumType = enumList.map((item) => (
      <Option key={item.id.toString()} value={item.id.toString()}>
        {item.enumType}
      </Option>
    ));

    const defaultConfig = {
      labelStyle: { width: '100px' },
    };

    const dataTypes = [
      // select + select联动，选择中文名自动填写英文名
      [
        { key: 'name', type: 'select', label: '属性', required: true },
        { key: 'description', type: 'select' },
      ],
      // select + select联动，选择dataType = 'ENUM'时显示dataValueId选择框
      [
        { key: 'dataType', type: 'select' },
        { key: 'dataValueId', relationKey: 'dataType', relationValue: 'ENUM', relationAction: 'style->display', type: 'select' },
      ],
      [
        { key: 'name2', type: 'select', label: '属性', required: true },
        { key: 'description2', type: 'input' },
      ],
    ];

    const dataSource : DataSource[][] = [
      [
        {
          builtInParams: {
            options: extendAttributesEN,
            placeholder: '搜索属性英文名',
            filterOption: (value: any, option: { props: { children: string | any[]; }; }) => { return option.props.children.indexOf(value) !== -1; },
          },
          customParams: {
            func: { _onChange: this._onChangeSelectProperties },
          },
        },
        {
          builtInParams: {
            options: extendAttributesCN,
            placeholder: '搜索属性中文名',
            filterOption: (value: any, option: { props: { children: string | any[]; }; }) => { return option.props.children.indexOf(value) !== -1; },
          },
          customParams: {
            style: { width: 150 },
            func: { _onChange: this._onChangeSelectProperties },
          },
        },
      ],
      [
        {
          builtInParams: {
            options: metaData,
            defaultValue: 'TEXT',
          },
          customParams: {
            style: { marginLeft: 105 },
            func: { _onChange: this._onChangeSelect },
          },
        },
        {
          builtInParams: {
            options: enumType,
          },
          customParams: {
            style: { width: 120, display: 'none' },
          },
        },
      ],
      [
        {
          builtInParams: {
            options: metaData,
            placeholder: '请选择类型',
          },
          customParams: {
            style: { width: 200 },
            func: { _onChange: this._onChangeSelectWithInput },
          },
        },
        {
          builtInParams: {
            placeholder: '选择完左边的下拉框，自动填值',
            defaultValue: 'TEXT',
          },
          customParams: {
            style: { width: 300 },
            isDisabled: true,
          },
        },
      ],
    ];

    const dynamicListProps: AbstractBasicCompProps = {
      dataTypes,
      dataSource,
      defaultConfig,
      record,
      key: 'dynamicListProps',
      className: 'dynamicListProps',
    };

    return (
      <Modal {...modalProps}>
        <DynamicList {...dynamicListProps} />
      </Modal>
    );
  }
}

export default LinkageTplModal;
