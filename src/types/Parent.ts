import { ReactNode } from "react"

type Parent<T = ReactNode> = {
    children: T
}

export default Parent;
