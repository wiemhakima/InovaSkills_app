import { FaCheckCircle } from "react-icons/fa";
import innovaskillsImage from "../assets/img/log.svg"; 
import NavBar from "../components/public/landing/navBar";
const InnovaskillsSection = () => {
  return (
    <>
    <NavBar />
      {/* Innovaskills Section */}
      <div className="relative bg-gradient-to-r from-blue-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 lg:py-16">
          {/* Grid */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 xl:gap-20 items-center">
            {/* Text Section */}
            <div data-aos="fade-up">
              <h1 className="text-5xl font-extrabold text-gray-800 sm:text-6xl lg:text-7xl lg:leading-tight dark:text-white">
                Découvrez{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600">
                  Innova
                </span>{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
                  Skills
                </span>
              </h1>
              <p className="mt-6 text-xl text-gray-700 dark:text-gray-300">
                InnovaSkills vous offre des opportunités d'apprentissage enrichissantes
                pour valider et suivre vos compétences, avec des certifications et des quiz.
              </p>
              <ul className="mt-6 space-y-3 text-lg text-gray-700 dark:text-gray-400">
                <li className="flex items-center">
                  <FaCheckCircle className="text-blue-600 dark:text-blue-500 mr-2" />
                  Formations interactives sur des compétences spécifiques
                </li>
                <li className="flex items-center">
                  <FaCheckCircle className="text-blue-600 dark:text-blue-500 mr-2" />
                  Quiz pour tester vos connaissances et valider vos acquis
                </li>
                <li className="flex items-center">
                  <FaCheckCircle className="text-blue-600 dark:text-blue-500 mr-2" />
                  Certifications reconnues pour booster votre profil professionnel
                </li>
                <li className="flex items-center">
                  <FaCheckCircle className="text-blue-600 dark:text-blue-500 mr-2" />
                  Accès à des offres de formation sur mesure adaptées à votre niveau
                </li>
              </ul>
            </div>
            {/* End Text Section */}

            {/* Image Section */}
            <div className="relative" data-aos="zoom-in">
              <div className="rounded-2xl overflow-hidden shadow-xl transform hover:scale-105 transition duration-300">
                <img
                  className="w-full rounded-lg"
                  src={innovaskillsImage}
                  alt="InnovaSkills"
                />
              </div>
              <div className="absolute inset-0 border-[6px] border-dashed border-blue-200 rounded-2xl -z-10"></div>

              {/* Decorative Circles */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-100 rounded-full opacity-50 blur-lg"></div>
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-200 rounded-full opacity-40 blur-lg"></div>
            </div>
            {/* End Image Section */}
          </div>
          {/* End Grid */}
        </div>

        {/* Decorative Waves */}
        <div className="absolute inset-x-0 bottom-0">
          <svg
            className="w-full h-24 text-blue-100 dark:text-gray-700"
            preserveAspectRatio="none"
            viewBox="0 0 1200 120"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
          >
            <path d="M0 0h1200v60l-600 60L0 60z"></path>
          </svg>
        </div>
      </div>

      {/* Section of offers and certifications */}
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-4xl font-bold text-gray-800 dark:text-white text-center mb-8">
          Nos Offres et Certifications
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Offer 1 */}
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition duration-300">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
              Formations sur mesure
            </h3>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Découvrez nos formations personnalisées qui s’adaptent à vos compétences actuelles et vos objectifs. Profitez de cours en ligne, de séances en direct, et de ressources adaptées.
            </p>
          </div>
          {/* Offer 2 */}
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition duration-300">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
              Quiz interactifs
            </h3>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Testez vos connaissances à travers des quiz interactifs et améliorez votre compréhension des concepts tout en suivant vos progrès.
            </p>
          </div>
          {/* Offer 3 */}
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition duration-300">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
              Certifications reconnues
            </h3>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Obtenez des certifications reconnues qui peuvent booster votre profil professionnel et vous aider à vous démarquer dans votre domaine.
            </p>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-gradient-to-r from-purple-100 to-indigo-100 py-16">
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-semibold text-gray-800 dark:text-white mb-8">
            Témoignages de nos utilisateurs
          </h3>
          <div className="flex flex-wrap justify-center gap-12">
            {/* Testimonial 1 */}
            <div className="p-8 bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-sm">
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                "InnovaSkills m'a permis de renforcer mes compétences et de décrocher une certification reconnue qui m'a vraiment aidée dans ma carrière."
              </p>
              <h4 className="text-xl font-semibold text-gray-800 dark:text-white">Alice D.</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">Développeuse Full Stack</p>
            </div>
            {/* Testimonial 2 */}
            <div className="p-8 bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-sm">
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                "Les formations sont claires, bien structurées, et très adaptées à mes besoins professionnels. Je recommande vivement InnovaSkills."
              </p>
              <h4 className="text-xl font-semibold text-gray-800 dark:text-white">Jean-Marc L.</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">Chef de projet IT</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InnovaskillsSection;
