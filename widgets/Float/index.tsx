import { cloneElement, forwardRef, useCallback, useContext, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react'
const timeout = (ms: number) => new Promise(res => setTimeout(res, ms))
import FloatWidget from './FloatScene2'
import { usePathname, useRouter } from 'next/navigation'

interface IComponent {
    title: string
    component: JSX.Element
    name: string
    action?: IAction
}
interface IAction {
    title: string
    onClick: () => void
}
interface IFloat {
    stack: (params: IComponent) => void
    push: (params: IComponent) => void
    close: () => Promise<void>
    back: () => void
    backAll: () => void

}
declare global {
    interface Window {
        float: IFloat
    }
    const float: IFloat
}
export const Float = () => {
    const router = usePathname()
    const [components, setComponents] = useState<IComponent[][]>([])
    // const enhanceComponent = useMemo(() => components?.map(item=>cloneElement(item.component,{})
    useEffect(() => {
        if (widgetRef?.current) widgetRef.current.close()

    }, [router])


    const widgetRef = useRef<any>()
    const ref = useRef<IFloat>({
        stack: (params: IComponent) => {
            setComponents(_components => {
                const temp = [..._components]
                temp.at(-1)?.push(params)
                return temp
            })
        },
        back: () => {
            widgetRef.current.back()
        },
        backAll: () => {
            widgetRef.current.backAll()
        },
        push: (params) => {
            setComponents(components => [...components, [params]])
        },
        close: async () => {
            widgetRef.current.close()
            await timeout(350)
        }
    })
    const onClose = () => {
        const temp = [...components]
        // console.log(temp);

        temp.pop()
        setComponents(temp)
    }
    const onBack = () => {
        const temp = [...components]
        temp.at(-1)?.pop()
        setComponents(temp)
    }
    const onBackAll = () => {
        const temp = [...components]
        temp.at(-1)?.splice(1)
        setComponents(temp)
    }
    useEffect(() => {
        window.float = ref.current
    }, [])
    // console.log(Component);
    return components?.length > 0 ? <div id='overlay_float'>{components?.map((item, index) => <FloatWidget key={`components-${index}`} onBackAll={() => onBackAll()} onBack={() => onBack()} onFloatClose={onClose} ref={widgetRef} >
        {item}
    </FloatWidget>)}</div> : null
    // return Component ? ReactDOM.createPortal(<Component />, document.body as HTMLElement) : null
}