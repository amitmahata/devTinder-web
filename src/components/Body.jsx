import NavBar from "./NavBar"
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

export const Body = () => {
    return (
        <div>
            <NavBar />
            <Outlet />
            <Footer />
        </div>
    )
}
