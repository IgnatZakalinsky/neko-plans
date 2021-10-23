import React, { useState } from 'react'
import './App.css'
import V_1_0_Item from '../v_1_0_Item/V_1_0_Item'

export type V_1_0_ListItemType = {
    title?: string
    text?: string
}

export type V_1_0_DataType = {
    v_1_0?: {
        list?: V_1_0_ListItemType[]
    }
}

const data: V_1_0_DataType = {
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

export type LocalStorageDateType = {
    time?: number
    title?: string
    data?: V_1_0_DataType
}

const App = () => {
    const [ds, setDs] = useState<V_1_0_DataType | undefined>(data)
    const [title, setTitle] = useState('')
    const [ls, setLs] = useState<LocalStorageDateType[]>([])
    const [checked, setChecked] = useState(0)

    const load = () => {
        const save = localStorage.getItem('saved-plans')

        if (save) {
            let parsed: LocalStorageDateType[] = []
            try {
                parsed = JSON.parse(save)
            } catch (e) {
                console.log('load: crashed save')
            }

            if (Array.isArray(parsed)) {
                try {
                    parsed.map((x: any) => x)

                    setLs([
                        { data: ds, time: Date.now(), title },
                        ...ls,
                        ...parsed.filter(
                            (p) => !ls.find((l) => l.time === p.time)
                        ),
                    ])
                } catch (e) {
                    console.log('load: not array')
                }
            }
        } else {
            console.log('load: no save')
        }
    }

    const updateV_1_0_ListItem = (data: V_1_0_ListItemType, i: number) => {
        const newDs = {
            ...ds,
            v_1_0: {
                list: ds?.v_1_0?.list?.map((l, ind) => {
                    if (i === ind) return data
                    else {
                        return l
                    }
                }),
            },
        }
        setDs(newDs)
        if (ls[checked]) {
            ls[checked].data = newDs
        }
    }

    const renderData = ds?.v_1_0?.list?.map((d, i) => (
        <V_1_0_Item
            data={d}
            key={i}
            setDs={(data) => updateV_1_0_ListItem(data, i)}
        />
    ))

    const lsds = ls.map((l, i) => (
        <div key={i}>
            <span
                onClick={() => {
                    setDs(l.data)
                    setTitle(l.title || '')
                    setChecked(i)
                }}
            >
                {checked === i ? '+ ' : '-- '}

                {new Date(l.time || 0).toLocaleDateString() +
                    ' ' +
                    new Date(l.time || 0).toLocaleTimeString() +
                    ' ' +
                    l.title}
            </span>

            <button onClick={() => setLs(ls.filter((lo, ind) => ind !== i))}>
                x
            </button>
        </div>
    ))

    console.log('ls: ', ls)
    console.log('ds: ', ds)
    console.log('checked: ', checked)

    return (
        <div className="App">
            <input
                value={title}
                onChange={(e) => {
                    setTitle(e.target.value)
                    if (ls[checked]) {
                        ls[checked].title = e.target.value
                    }
                }}
            />
            <div>{lsds}</div>

            <button onClick={load}>load</button>
            <button
                onClick={() =>
                    localStorage.setItem('saved-plans', JSON.stringify(ls))
                }
            >
                save
            </button>
            {renderData}
        </div>
    )
}

export default App
