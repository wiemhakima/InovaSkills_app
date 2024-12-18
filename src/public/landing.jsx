import ScrollToTop from "react-scroll-up";
import ActualiteSection from "../components/public/landing/actualiteSection";
import Footer from "../components/public/landing/footer";
import HeroSection from "../components/public/landing/heroSection";
import Services from "../components/public/landing/services";
import SolutionSection from "../components/public/landing/solutionSection";
import { ArrowUpCircleIcon } from "@heroicons/react/24/solid";
import Nav  from "../components/public/landing/nav";
const Landing = () => {
    return (
        <div className="dark:bg-gray-900 duration-500 overflow-hidden">         
            {/* NavBar  */}
            <Nav />
            {/* hero section  */}
            <HeroSection />

            {/* services  */}
             <Services />

            {/* actualite Section  */}
            <ActualiteSection />
            {/* solution section  */}

            <SolutionSection />
       
         
            <Footer />
            {/* Scroll to top  */}
            <ScrollToTop showUnder={160} easing="easeInOutCubic" duration={1500}>
                <span>
                    <ArrowUpCircleIcon className="size-10 dark:text-fidnessColor/80 text-fidnessColor" />
                </span>
            </ScrollToTop>
        </div>
    );
}

export default Landing;