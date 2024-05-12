import { useRef } from "react"
import { useInView } from "framer-motion"
export default function DashBoardContainers({children,id, title, description}){

    const ref = useRef(null);
    const isInView = useInView(ref, {once: true});
    return (
        <div id={id} 
        ref={ref} 
        style={{
            transform: isInView ? "none" : "translateX(-200px)",
            opacity: isInView ? 1 : 0,
            transition: "all 0.5s cubic-bezier(0.17, 0.55, 0.55, 1) 0.3s"
        }}
        >
                <h1>{title}</h1>
                <p style={{textAlign: 'center'}}>{description}</p>
               {children}
        </div>
    )
}