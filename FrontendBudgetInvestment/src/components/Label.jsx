export default function Label({children ,id}){
    return (
        <label id={id}>
            {children}
        </label>
    )
}