import { useRef, useEffect, useLayoutEffect, useState } from 'react';
const viewportWidth = () => Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
const viewportHeight = () => Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
const SIZES = Object.freeze({ xl: '0.80', lg: '0.65', md: '0.50', sm: '0.25'});

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
    children}) => {
    const effectiveSize = SIZES[size && typeof(size) === 'string' && size.toLowerCase()] || SIZES.md;
    const ref = useRef(null);
    const { vw, vh } = useWindowSize();
    const [active, setActive] = useState(false);
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
    return <div ref={ref}>{ active ? <div id="modal" style={{
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
    }}><CloseBar/><div style={{}}>{children}</div><ConfirmCancelBar /></div> : null }</div>
}

const BigX = ({fontColor = 'white', bgColor = 'black'}) => {
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
    >X</span>);
}

const CloseBar = ({fontColor = 'black', bgColor = 'white'}) => 
    <div style={{
        display: 'flex',
        flexDirection: 'row',
        margin: '10px 0 0 10px',
        justifyContent: 'start'
    }}><BigX fontColor={fontColor} bgColor={bgColor}/></div>

const ModalButton = ({fontColor = 'black', bgColor = 'white', text = ''}) => {
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
        }}
        onMouseOver={reverseColors}
        onMouseLeave={reverseColors}
        onMouseDown={reverseColors}
        onMouseUp={reverseColors}
    >{text}</div>);
}

const ConfirmCancelBar = ({fontColor = 'black', bgColor = 'white'}) => <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '95%',
        marginBottom: '5px',
    }}
><ModalButton text="Confirm"/><ModalButton text="Cancel"/></div>

export default Modal;