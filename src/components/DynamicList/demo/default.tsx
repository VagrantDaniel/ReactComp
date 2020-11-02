import React, { Component } from 'react';
import { Button } from 'antd';

import SimpleTplModal from './SimpleTplModal';
import LinkageTplModal from './LinkageTplModal';
import ComplexTplModal from './ComplexTplModal';
import ChildRenderModal from './ChildRenderModal';

class Default extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalTitle: '',
            isModalVisible: false,
            // 0: SimpleTplModal
            // 1: LinkageTplModal
            // 2: ComplexTplModal
            // 3: ChildRenderModal
            type: 0,
        };
    }

    _onClick = (title, type) => {
        this.setState({
            modalTitle: title,
            isModalVisible: true,
            type,
        });
    };

    _closeModal = () => {
        this.setState({
            modalTitle: '',
            isModalVisible: false,
            type: 0,
        });
    };

    render() {
        const { type, modalTitle, isModalVisible } = this.state;
        const extendAttributesList = [
            { id: 580, name: 'school', description: '学', dataType: 'TEXT', remark: '' },
            { id: 579, name: 'Y4', description: 'Y4', dataType: 'TEXT', remark: '' },
            { id: 577, name: 'Y2', description: 'Y2', dataType: 'TEXT', remark: '' },
            { id: 576, name: 'Y1', description: 'Y1', dataType: 'TEXT', remark: '' },
            { id: 578, name: 'Y3', description: 'Y3', dataType: 'ENUM', remark: '' },
        ];
        const metaDataList = [
            { value: '布尔值', key: 'BOOLEAN' },
            { value: '文本', key: 'TEXT' },
            { value: '数值', key: 'NUMBER' },
            { value: '枚举', key: 'ENUM' },
        ];
        const enumList = [
            { id: 1, enumType: '模块枚举值' },
            { id: 16, enumType: '相册' },
            { id: 17, enumType: '相册1' },
            { id: 27, enumType: '性别' },
        ];
        const eventTplModalProps = {
            key: 'EventTplModal',
            type,
            modalTitle,
            isModalVisible,
            // 属性列表
            extendAttributesList,
            // 属性值类型
            metaDataList,
            // 所有的枚举值类型
            enumList,
            // 事件类型所属类型列表
            _closeModal: this._closeModal,
        };

        return (
            <ul>
                <li>SimpleTplModal：简单的input、select类型的表单<Button style={{ marginLeft: 20, marginBottom: 10 }} onClick={() => this._onClick('SimpleTplModal', 0)} type='primary' htmlType='button' size='small'>点击进入</Button></li>
                <li>LinkageTplModal：input + select联动、select + select联动<Button style={{ marginLeft: 20, marginBottom: 10 }} onClick={() => this._onClick('LinkageTplModal', 1)} type='primary' htmlType='button' size='small'>点击进入</Button></li>
                <li>ComplexTplModal：动态表格添加<Button style={{ marginLeft: 20, marginBottom: 10 }} onClick={() => this._onClick('ComplexTplModal', 2)} type='primary' htmlType='button' size='small'>点击进入</Button></li>
                <li>ChildRenderModal：子组件嵌套渲染<Button style={{ marginLeft: 20 }} onClick={() => this._onClick('ChildRenderModal', 3)} type='primary' htmlType='button' size='small'>点击进入</Button></li>
                {
                    type === 0 && (
                        <SimpleTplModal {...eventTplModalProps} />
                    )
                }
                {
                    type === 1 && (
                        <LinkageTplModal {...eventTplModalProps} />
                    )
                }
                {
                    type === 2 && (
                        <ComplexTplModal {...eventTplModalProps} />
                    )
                }
                {
                    type === 3 && (
                        <ChildRenderModal {...eventTplModalProps} />
                    )
                }
            </ul>
        );
    }
}

export default [
    () => {
        return (
            <Default />
        )
    },
]
