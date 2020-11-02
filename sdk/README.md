### 描述
该组件通过配置dataTypes和dataSource, 动态生成表单，支持复杂的下拉框联动以及子表单动态生成。

### 使用
```
import dynamic from 'form-dynamic'
```

| 参数           | 说明                                                    | 类型                                        | 默认值                                               | 是否必填 
| -------------- | ------------------------------------------------------- | ------------------------------------------ | ---------------------------------------------------| ------ |
| defaultConfig  | 用于全局参数设置                                        | object                                       | { labelStyle: { width: '200px' } }                    | 否 |                                      
| dataTypes      | 用于设置输入框类型                                        | array                                      | -                                                     | 是 |  
| dataSource     | 用于设置输入框内容及回调函数                               | array                                      | -                            | 是 |
| []             | 表示一行内的输入框集合                                         | -                                      | -                     | - |                                          
| {}      | 一行中某一个输入框                                        | -                                     | -                                 | - | 

dataTypes
 
| 参数           | 说明                                                    | 类型                                        | 默认值                                               | 是否必填  
| -------------- | ------------------------------------------------------- | -------------------------------------------| ---------------------------------------------------| ------ |  
 | key     | 输入框标识                                                     | string                                      | -                                                  | 是 |
| type     | 输入框类型                                                     | string: 'input' 'select' 'module' 'icon_add' 'icon_del'                                     | -                           | 是 |
 | label     | 标签说明                                                     | string                                      | -                                                  | 否 |
| required     | 是否是必填项                                                     | boolean                                     | -                           | 否 | 
> input例子：
```{ key: 'name', type: 'input', label: '属性', required: true },```

> select例子：```{ key: 'description', type: 'select' },```

> select+select联动例子：
```$xslt
{ key: 'dataType', type: 'select' }, 
{ key: 'dataValueId', relationKey: 'dataType', relationValue: 'ENUM', relationAction: 'style->display', type: 'select' },
```

> select+input联动例子：
```$xslt
[
  { key: 'name2', type: 'select', label: '属性', required: true },
  { key: 'description2', type: 'input' },
]
```


> module例子：
```$xslt
[
  {
    key: 'properties',
    type: 'module',
    label: (<span><Tooltip title='模板属性在埋点时需必填'><Icon type='question-circle-o' style={{ marginRight: 5, color: 'rgb(94, 94, 94)' }} /></Tooltip>属性设定</span>),
  },
]
```

> icon_add例子：```{ key: 'icon_add', type: 'icon_add' }```

> icon_del例子：```{ key: 'icon_del', type: 'icon_del' }```

dataSource
 
| 参数           | 说明                                                    | 类型                                        | 默认值                                               | 是否必填  
| -------------- | ------------------------------------------------------- | -------------------------------------------| ---------------------------------------------------| ------ |  
 | builtInParams     | 内置属性，与antd参数一致                                                      | -                                      | -                                                  | - |
| customParams     | 自定义属性                                                    | -                                     | -                           | - |

builtInParams
 
| 参数           | 说明                                                    | 类型                                        | 默认值                                               | 是否必填  
| -------------- | ------------------------------------------------------- | -------------------------------------------| ---------------------------------------------------| ------ |  
 | placeholder     | 'input'和'select'类型有                                                    | -                                      | -                                                  | - |
| defaultValue     | 'input'和'select'类型有                                                    | -                                     | -                           | - |
 | options     | 'select'类型独有                                                    | -                                      | -                                                  | - |
| filterOption      | 'select'类型独有                                                  | -                                     | -                           | - |
 | dropdownRender     | 'select'类型独有                                                    | -                                      | -                                                  | - |
| filterOption      | 'select'类型独有                                                  | -                                     | -                           | - |

 
> type = 'input'例子   
```$xslt
 {
   builtInParams: {  
     placeholder: '圈选位置',  
     defaultValue: 'expression:v1'
   },
 }
```

> type = 'select'例子  
```$xslt
{
  builtInParams: {
    options: extendAttributesCN,
    placeholder: '搜索属性中文名',
    defaultValue: 'TEXT',
    filterOption: (value, option) => { return option.props.children.indexOf(value) !== -1; },
    dropdownRender: menu => this.DropdownRender(menu),
  },
}
```

> type = 'module'例子  
```$xslt
{
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
            filterOption: (value, option) => { return option.props.children.indexOf(value) !== -1; },
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
            filterOption: (value, option) => { return option.props.children.indexOf(value) !== -1; },
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
  }
```

> type = 'icon_add'和type = 'icon_del'没有builtInParams属性

customParams
 
| 参数           | 说明                                                    | 类型                                        | 默认值                                               | 是否必填  
| -------------- | ------------------------------------------------------- | -------------------------------------------| ---------------------------------------------------| ------ |  
 | style     | 'input'和'select'类型有                                                    | -                                      | -                                                  | 否 |
| isDisabledKey     | 'input'和'select'类型有（是否置灰key）                                                    | -                                     | -                           | 否 |
 | isDisabledValue     | 'input'和'select'类型有（当isDisabledKey的值等于isDisabledValue置灰）                                                    | -                                      | -                                                   | 否 |
| isDisabled      | 'input'和'select'类型有（是否置灰，相当于disabled）                                                  | -                                     | -                           | 否 |
 | isNotDisplay     | 'input'、'icon_add'、icon_del'类型有（是否不显示，为true时不显示)                                                    | -                                      | -                                                  | 否 |
| isNotDisplayKey      | 'input'、'icon_add'、icon_del'类型有（是否不显示key)                                                 | -                                     | -                           | 否 |
 | isNotDisplayValue     | 'input'、'icon_add'、icon_del'类型有（当isNotDisplayKey的值等于isNotDisplayValue不显示)                                                    | -                                      | -                                                  | 否 |
| func      | 回调函数汇总<br />'input'和'select'类型有_onChange(相当于onChange事件)、childRender(在指定input或select框位置下渲染子组件), <br />'icon_add'类型仅有_onAddClick(相当于onClick事件),<br />'icon_del'类型仅有_onDelClick(相当于onClick事件)                                                   | -                                     | -                           | 否 |

> type = 'input'例子   
```$xslt
{
  customParams: {
    style: { width: 100 },
    isDisabled: true,
    isDisabledKey: 'allowDelete',
    isDisabledValue: false,
    isNotDisplay: !isLook,
    isNotDisplayKey: 'allowDelete', isNotDisplayValue: false,
    func: { _onChange: this._onChangeInputProperties },
  },
}
```

> type = 'select'例子 
```$xslt
{
  customParams: {
    style: { width: 120, display: 'none' },
    isDisabled: true,
    isDisabledKey: 'allowDelete', isDisabledValue: false,
    func: { _onChange: this._onChangeSelectProperties },
  },
}
 ``` 

> type = 'icon_add'例子 
```$xslt
{
  customParams: {
    isNotDisplay: isLook,
    func: { _onAddClick: this._onAddClick },
  },
}
 ```   

> type = 'icon_del'类型包括      
```$xslt
{
  customParams: {
    isNotDisplay: isLook,
    isNotDisplayKey: 'allowDelete', isNotDisplayValue: false,
    func: { _onDelClick: this._onDelClick },
  },
}
 ``` 

 
