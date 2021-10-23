import React, { useEffect, useRef } from 'react'
import { V_1_0_ListItemType } from '../app/App'

type V_1_0_ItemPropsType = {
    data: V_1_0_ListItemType
    setDs: (data: V_1_0_ListItemType) => void
}

const V_1_0_Item: React.FC<V_1_0_ItemPropsType> = ({ data, setDs }) => {
    const ref = useRef<HTMLTextAreaElement | null>(null)

    useEffect(() => {
        if (ref.current) {
            ref.current.style.height = '1px'
            ref.current.style.height = ref.current?.scrollHeight + 'px'
        }
    }, [data])

    return (
        <div>
            <div>
                title:
                <input
                    value={data.title || ''}
                    onChange={(e) => setDs({ ...data, title: e.target.value })}
                />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                text:
                <textarea
                    ref={ref}
                    value={data.text || ''}
                    onChange={(e) => setDs({ ...data, text: e.target.value })}
                />
            </div>
        </div>
    )
}

export default V_1_0_Item
