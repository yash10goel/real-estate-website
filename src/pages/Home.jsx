
import HeroVideo from "../components/sections/HeroVideo"
import OurClients from "../components/sections/OurClient"
import ProjectsGallery from "../components/sections/ProjectsGallery"
import ServiceSlider from "../components/sections/ServiceSlider"
import TeamSection from "../components/sections/TeamSection"
import Testimonials from "../components/sections/Testimonials"

export default function Home(){

return(
<div>

<HeroVideo/>


<ServiceSlider/>

<ProjectsGallery/>


<TeamSection/>

<OurClients/>

<Testimonials/>


{/* <section className="py-20 text-center">
<h2 className="text-3xl font-bold mb-6">Property Location</h2>

<iframe
title="map"
className="mx-auto w-4/5 h-[400px]"
src="https://maps.google.com/maps?q=delhi&t=&z=13&ie=UTF8&iwloc=&output=embed"
/>

</section> */}

</div>
)
}
