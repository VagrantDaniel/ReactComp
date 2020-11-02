interface Props {
    dataTypes: DataTypes[][],
    dataSource: DataSource[][],
    defaultConfig: DefaultConfig,
    record: any,
    restParams?: object,
}
  
interface DataTypes {
    key: string,
    type: string,
    label?: string | React.ReactElement,
    required?: boolean,
    relationKey?: string,
    relationValue?: string,
    relationAction?: string,
    icon?: React.ReactElement,
}

interface BuiltInParams {
    options?: React.ReactElement,
    placeholder?: string,
    defaultValue?: string,
    filterOption?: Function,
    dropdownRender?: Function,
    builtInParams?: BuiltInParams,
    customParams?: CustomParams,
}

interface Func {
    _onChange?: Function,
    _onAddClick?: Function,
    _onDelClick?: Function,
    childRender?: {
        isShowKey?: string,
        isShowValue?: string,
    },
}

interface CustomParams {
    func?: Func,
    isNotDisplay?: boolean,
    isNotDisplayKey?: string,
    isNotDisplayValue?: string,
    isDisabled?: boolean,
    isDisabledKey?: string,
    isDisabledValue?: string | boolean,
    style?: any,
}

interface DataSource {
    builtInParams?: BuiltInParams,
    customParams?: CustomParams,
    types?: DataTypes[][],
    source?: DataSource[][],
}
  
interface DefaultConfig {
    labelStyle?: object,
}
  
interface RestParams {
    rowKey?: string,
    rowIndex?: number | string,
}

export {
    Props,
    DataTypes,
    DataSource,
    DefaultConfig,
    RestParams,
    BuiltInParams,
    CustomParams,
}