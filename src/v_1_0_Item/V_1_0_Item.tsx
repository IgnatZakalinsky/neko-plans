import React from 'react'
import { V_1_0_ListItemType } from '../app/App'

type V_1_0_ItemPropsType = {
    data: V_1_0_ListItemType
}

const V_1_0_Item: React.FC<V_1_0_ItemPropsType> = ({ data }) => {
    return (
        <div>
            <div>{data.title}</div>
            <div>{data.text}</div>
        </div>
    )
}

export default V_1_0_Item
