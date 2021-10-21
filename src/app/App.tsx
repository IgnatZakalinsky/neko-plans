import React from 'react'
import './App.css'
import V_1_0_Item from '../v_1_0_Item/V_1_0_Item'

export type V_1_0_ListItemType = {
    title?: string
    text?: string
}

export type V_1_0_Type = {
    list?: V_1_0_ListItemType[]
}

const data: { v_1_0?: V_1_0_Type } = {
    v_1_0: {
        list: [
            {
                title: 'test',
                text: 'test text',
            },
            {
                title: 'test 2',
            },
            {
                text: 'test text 3',
            },
            {},
        ],
    },
}

const App = () => {
    const renderData = data.v_1_0?.list?.map((d, i) => (
        <V_1_0_Item data={d} key={i} />
    ))

    return <div className="App">{renderData}</div>
}

export default App
