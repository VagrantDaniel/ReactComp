/**
 * demo3
 * 可增减表单
 */
import React, { Component } from 'react';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Modal, Select, Tooltip } from 'antd';
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

class ComplexTplModal extends Component {
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
   * 添加回调函数
   * @param rowKey：properties
   * @private
   */
  _onAddClick = rowKey => {
    const { record } = this.state;
    const Record = { ...record };
    if (Record[rowKey]) {
      Record[`${rowKey}`] = [...Record[rowKey], {}];
    } else {
      Record[`${rowKey}`] = [{}, {}];
    }
    this.setState({
      record: Record,
    });
  };

  _onDelClick = (rowKey, rowIndex) => {
    const { record } = this.state;
    const Record = { ...record };
    if (Record[rowKey]) {
      if (rowIndex === 0 && Record[rowKey].length === 1) {
        Record[`${rowKey}`] = [{}];
      } else {
        Record[`${rowKey}`] = Record[rowKey].filter((item, index) => index !== rowIndex);
      }
      const disabledPropertyIds = Record[`${rowKey}`]?.reduce((sum, item) => {
        if (item.exPropertyId) {
          return [...sum, item.exPropertyId];
        }
        return sum;
      }, []);
      this.setState({
        record: Record,
        disabledPropertyIds,
      });
    }
  };

  /**
   * 切换属性调用原函数
   * @param val 选择的属性id
   * @param type 修改的属性: name | description
   * @param rowKey：properties
   * @param index：properties数组中改变的第几个属性
   * @private_onChangeInputProperties
   */
  _onChangeSelectProperties = (val, type, rowKey, index) => {
    const values = { ...this.state.record };
    values[rowKey] = values[rowKey] || [];
    values[rowKey][index] = values[rowKey][index] || {};
    values[rowKey][index].name = val.toString();
    values[rowKey][index].description = val.toString();
    values[rowKey][index].exPropertyId = -1;
    values[rowKey][index].dataType = 'TEXT';
    const disabledPropertyIds = values[rowKey]?.reduce((sum, item) => [...sum, item.exPropertyId], []);
    // values
    this.setState({
      record: values,
      disabledPropertyIds,
    });
  };

  render() {
    const { record, disabledPropertyIds } = this.state;
    const { isModalVisible, modalTitle, extendAttributesList, metaDataList, enumList } = this.props;

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
      labelStyle: {
        width: '100px',
      },
    };
    const dataTypes: DataTypes[][] = [
      [
        {
          key: 'properties',
          type: 'module',
          label: (<span><Tooltip title='模板属性在埋点时需必填'><QuestionCircleOutlined style={{ marginRight: 5, color: 'rgb(94, 94, 94)' }} /></Tooltip>属性设定</span>),
        },
      ],
    ];

    const dataSource: DataSource[][] = [
      [{
        types: [
          [
            { key: 'name', type: 'select' },
            { key: 'description', type: 'select' },
            { key: 'dataType', type: 'select' },
            { key: 'dataValueId', relationKey: 'dataType', relationValue: 'ENUM', relationAction: 'style->display', type: 'select' },
            { key: 'icon_add', type: 'icon_add' },
            { key: 'icon_del', type: 'icon_del' },
          ],
        ],
        source: [
          [
            {
              builtInParams: {
                options: extendAttributesEN,
                placeholder: '搜索属性英文名',
                filterOption: (value: any, option: { props: { children: string | any[]; }; }) => { return option.props.children.indexOf(value) !== -1; },
              },
              customParams: {
                style: { width: 150 },
                isDisabledKey: 'allowDelete',
                isDisabledValue: false,
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
                isDisabledKey: 'allowDelete',
                isDisabledValue: false,
                func: { _onChange: this._onChangeSelectProperties },
              },
            },
            {
              builtInParams: {
                options: metaData,
                defaultValue: 'TEXT',
              },
              customParams: {
                style: { width: 80 },
                isDisabled: true,
              },
            },
            {
              builtInParams: {
                options: enumType,
              },
              customParams: {
                style: { width: 120, display: 'none' },
                isDisabled: true,
              },
            },
            {
              customParams: {
                func: { _onAddClick: this._onAddClick },
              },
            },
            {
              customParams: {
                func: { _onDelClick: this._onDelClick },
              },
            },
          ],
        ],
      }],
    ];

    const modalProps = {
      className: 'eventTemplateModal',
      title: modalTitle,
      width: '800px',
      visible: isModalVisible,
      onOk: this._handleOK,
      onCancel: this._handleCancel,
      destroyOnClose: true,
      maskClosable: false,
    };

    const abstractBasicCompProps : AbstractBasicCompProps = {
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

export default ComplexTplModal;
