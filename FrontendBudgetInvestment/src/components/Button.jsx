export default function Button({children, classed, Click}){
    return (
        <button className={classed} onClick={Click}>{children}</button>
    )
}