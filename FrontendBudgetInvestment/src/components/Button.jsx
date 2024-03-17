export default function Button({children, classed}){
    return (
        <button className={classed}>{children}</button>
    )
}