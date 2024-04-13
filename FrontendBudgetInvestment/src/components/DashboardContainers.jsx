
export default function DashBoardContainers({children,id, title, description}){
    return (
        <div id={id}>
                <h1>{title}</h1>
                <p style={{textAlign: 'center'}}>{description}</p>
               {children}
        </div>
    )
}