/**
 * demo4
 * 子组件嵌套渲染
 */
import React, { Component } from 'react';
import { Modal, Select, Divider, Button } from 'antd';
import DynamicList from '../index';
import { DataTypes, DataSource, DefaultConfig, } from '../interface';

interface DynamicListProps {
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
      addGroup: false,
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

  setAddGroup = () => {
    this.setState({
        addGroup: true,
    })
  }

  _handleChildOk = () => {
    this.setState({
        addGroup: false,
    })
  }

  _handleChildCancel = () => {
    this.setState({
        addGroup: false,
    })
  }
  render() {
    const { record, disabledPropertyIds, addGroup } = this.state;
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
        { key: 'type3', type: 'select', label: '事件类型英文名', required: true },
      ],
      [
        { key: 'description', type: 'input', label: '事件类型中文名', required: true },
        { key: 'name', type: 'input', required: true },
      ],
    ];

    const DropdownRender = menu => {
        return (
          <div>
            {menu}
            <Divider style={{ margin: '4px 0' }} />
            <div
              style={{ padding: '4px 8px', cursor: 'pointer', color: '#1890ff' }}
              onMouseDown={e => this.setAddGroup()}
              className='operate-panel'
            >
              <span>+ 新建业务组</span>
            </div>
          </div>
        );
      };

        /**
   * 渲染子标题
   * @param key：唯一
   * @param title：标题名
   * @param linkShow：跳转是否显示
   */
  const _renderTitle = (key, title) => {
    return (
      <p key={title} style={{ marginBottom: 10, fontSize: 14, fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.85)' }}>
        {title}
      </p>
    );
  };

    const childComp = () => {
    return (
        <div style={{ marginTop: 10, marginLeft: 55, width: 400 }}>
        {_renderTitle('group', '新建业务组')}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 20 }}>
            <Button onClick={this._handleChildCancel}>
            取消
            </Button>
            <Button type='primary' onClick={this._handleChildOk} style={{ marginLeft: 20 }}>
            确定
            </Button>
        </div>
        </div>
    );
    };

    const dataSource : DataSource[][] = [
        [
            {
              builtInParams: {
              options: extendAttributesEN,
              placeholder: '请选择事件所属',
              filterOption: (value: any, option: { props: { children: string | any[]; }; }) => { return option.props.children.indexOf(value) !== -1; },
              dropdownRender: (menu: any) => DropdownRender(menu),
              },
              customParams: {
                func: { _onChange: this._onChangeSelect, childRender: { isShowKey: addGroup, isShowValue: true, render: () => childComp()  },},
              },
            },
        ],
        [
            {
                builtInParams: {
                    placeholder: '请输入事件类型中文名',
                },
                customParams: {
                    isDisabledKey: 'allowDelete', isDisabledValue: false, 
                    func: { _onChange: this._onChangeInput },
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
            {
                builtInParams: {
                    placeholder: '请输入事件类型英文名',
                },
                customParams: {
                    func: { _onChange: this._onChangeInput },
                },
            },
        ],
    ];

    const dynamicListProps: DynamicListProps = {
      dataTypes,
      dataSource,
      defaultConfig,
      record,
      key: 'abstractBasicCompProps',
      className: 'abstractBasicCompProps',
    };

    return (
      <Modal {...modalProps}>
        <DynamicList {...dynamicListProps} />
      </Modal>
    );
  }
}

export default SimpleTplModal;
