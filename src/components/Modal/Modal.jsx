import { useRef, useEffect, useLayoutEffect, useState } from 'react';
const viewportWidth = () => Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
const viewportHeight = () => Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
const SIZES = Object.freeze({ xl: '0.80', lg: '0.65', md: '0.50', sm: '0.25'});
const safeCallEach = (...args) => () => args.forEach(f => f && typeof(f) === 'function' && f());

//custom window resize hook
const useWindowSize = () => {
    const [size, setSize] = useState({vw: 0, vh: 0});
    useLayoutEffect(() => {
        const updateSize = () => setSize({vw: viewportWidth(), vh: viewportHeight()});
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
};

const Modal = ({isActive,
    size = 'md', 
    adjustToParent = false,
    closeAction = () => {}, 
    confirmAction = () => {}, 
    fontColor = 'black',
    bgColor = 'white',
    children}) => {
    const effectiveSize = SIZES[size && typeof(size) === 'string' && size.toLowerCase()] || SIZES.md;
    const ref = useRef(null);
    const { vw, vh } = useWindowSize();
    const [active, setActive] = useState(isActive);
    const [center, setCenter] = useState(0);
    const [height, setHeight] = useState(0);
    const [width, setWidth] = useState(0);
    const [top, setTop] = useState(0);
    const [left, setLeft] = useState(0);
    useEffect(() => {
        setActive(isActive);
        if(adjustToParent){
            const current = ref && ref.current;
            if(current){
                const parentWidth = current.parentNode.clientWidth;
                const parentHeight = current.parentNode.clientHeight;
                const childEffectiveWidth = Math.trunc(parentWidth * effectiveSize);
                const childEffectiveHeight = Math.trunc(parentHeight * effectiveSize);
                const { top: parentDistanceFromTop, left: parentDistanceFromLeft } = current.getBoundingClientRect();
                setCenter({
                  x: parentDistanceFromLeft + Math.trunc(parentWidth / 2),
                  y: parentDistanceFromTop + Math.trunc(parentHeight / 2),
                });
                setHeight(childEffectiveHeight);
                setWidth(childEffectiveWidth);
                setTop(Math.trunc(childEffectiveHeight / 2));
                setLeft(Math.trunc(childEffectiveWidth / 2));
            }
        } else {
                const effectiveWidth = Math.trunc(vw * effectiveSize);
                const effectiveHeight = Math.trunc(vh * effectiveSize);
                setCenter({ x: Math.trunc(vw / 2), y: Math.trunc(vh / 2) });
                setWidth(effectiveWidth);
                setHeight(effectiveHeight);
                setTop(Math.trunc(effectiveHeight / 2));
                setLeft(Math.trunc(effectiveWidth / 2));
        }
    }, [isActive, vw, vh, adjustToParent, effectiveSize]);
    return <div ref={ref}>{ active ? 
        <>
        <Backdrop clickAction={safeCallEach(closeAction, () => setActive(false))}/>
        <div style={{
            backgroundColor: 'white',
            height: `${height}px`,
            width: `${width}px`,
            position: 'absolute',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            zIndex: '2147483647',
            top: `${center.y}px`,
            left: `${center.x}px`,
            marginTop: `-${top}px`,
            marginLeft: `-${left}px`,
            color: 'black',
            borderRadius: '25px',
            boxShadow: '4px 3px 2px 0 rgba(0, 0, 0, 0.4)'
       }}>
        <CloseBar 
            bgColor={bgColor} 
            fontColor={fontColor} 
            action={safeCallEach(closeAction, () => setActive(false))}
        />
        <div>{children}</div>
        <ConfirmCancelBar 
            fontColor={fontColor}
            bgColor={bgColor}
            confirmAction={safeCallEach(confirmAction, () => setActive(false))} 
            cancelAction={safeCallEach(closeAction, () => setActive(false))}/>
        </div>
       </> 
       : null 
    }</div>
}

const Backdrop = ({ clickAction = () => {}}) => <div style={{ 
    height: '100%', 
    width: '100%', 
    top: '0',
    right: '0',
    bottom: '0',
    left: '0',
    position: 'fixed',
    backgroundColor: 'rgba(50, 50, 50, 0.6)',
    zIndex: '2147483646',
}}
    onClick={clickAction}
/>


const BigX = ({fontColor = 'white', bgColor = 'black', action = () => {}}) => {
    const [backgroundColor, setBackgroundColor] = useState(bgColor);
    const [color, setColor] = useState(fontColor);
    const reverseColors = () => {
        setBackgroundColor(color);
        setColor(backgroundColor);
    };
    return (<span 
    style={{
        fontSize: '14px', 
        color,
        backgroundColor,
        borderRadius: '20px', 
        border: `1px solid ${fontColor}`,
        padding: '2px 5px',
        MozUserSelect: 'none',
        WebkitUserSelect: 'none',
        MsUserSelect: 'none',
    }}
    onMouseOver={reverseColors}
    onMouseLeave={reverseColors}
    onMouseDown={reverseColors}
    onMouseUp={reverseColors}
    onClick={safeCallEach(reverseColors, action)}
    >X</span>);
}

const CloseBar = ({fontColor = 'black', bgColor = 'white', action = () => {}}) => 
    <div style={{
        display: 'flex',
        flexDirection: 'row',
        margin: '10px 0 0 10px',
        justifyContent: 'start'
    }}><BigX fontColor={fontColor} bgColor={bgColor} action={action}/></div>

const ModalButton = ({fontColor = 'black', bgColor = 'white', text = '', action= () => {}}) => {
    const [color, setColor] = useState(fontColor);
    const [backgroundColor, setBackgroundColor] = useState(bgColor);
    const reverseColors = () => {
        setBackgroundColor(color);
        setColor(backgroundColor);
    };
    return (<div 
        style={{
            color,
            backgroundColor,
            padding: '5px',
            border: `1px solid ${color}`,
            borderRadius: '10px',
            MozUserSelect: 'none',
            WebkitUserSelect: 'none',
            MsUserSelect: 'none',
        }}
        onMouseOver={reverseColors}
        onMouseLeave={reverseColors}
        onMouseDown={reverseColors}
        onMouseUp={reverseColors}
        onClick={safeCallEach(reverseColors, action)}
    >{text}</div>);
}

const ConfirmCancelBar = ({
    fontColor = 'black', 
    bgColor = 'white', 
    confirmAction = () => {}, 
    cancelAction = () => {}}) => 
    <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '95%',
        marginBottom: '5px',
    }}>
    <ModalButton 
        text="Confirm" 
        action={confirmAction}
        fontColor={fontColor}
        bgColor={bgColor}
    />
    <ModalButton 
        text="Cancel" 
        action={cancelAction}
        fontColor={fontColor}
        bgColor={bgColor}
    />
    </div>

export default Modal;