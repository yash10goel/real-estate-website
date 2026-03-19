
import {Routes,Route} from "react-router-dom"
import Navbar from "./components/layout/Navbar"
import Footer from "./components/layout/Footer"
import Home from "./pages/Home"

export default function App(){
return(
<div className="bg-white dark:bg-black text-black dark:text-white transition">
<Navbar/>
<Routes>
<Route path="/" element={<Home/>}/>
</Routes>
<Footer/>
</div>
)
}
