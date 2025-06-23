

// import React from 'react';
// import BgImage from '../assets/BgGreen.jpg';
// import Navbar from '../components/Navbar';
// import '../App.css'; // Font (Judson) should be imported here
// import FeaturesSection from '../components/FeaturesSection';

// const LandingPage = () => {
//   return (
//     <div
//       className="min-h-screen bg-cover bg-center text-white"
//       style={{
//         backgroundImage: `url(${BgImage})`,
//         fontFamily: 'Judson, serif',
//       }}
//     >
//       {/* Navbar */}
//       <Navbar />

//       {/* Title + Subtitle */}
//       <div className="flex flex-col justify-center mt-10 mb-6 pl-8 sm:pl-16 md:pl-24 lg:pl-32">
//         <h1 className="text-white text-5xl sm:text-6xl font-bold mb-2">
//           JourNiva
//         </h1>
//         <div className="flex gap-6 text-lg sm:text-xl tracking-wide">
//           <span>Write.</span>
//           <span>Reflect.</span>
//           <span>Rise.</span>
//         </div>
//       </div>

//       {/* Hero Section */}
//       <div className="w-full flex justify-center sm:justify-end py-12 px-4">
//         <div className="relative bg-black/20 px-6 py-8 rounded-xl sm:mr-10 md:mr-16 lg:mr-24 xl:mr-32 w-fit max-w-lg">
//           {/* Top Crossing Lines */}
//           <span className="absolute -top-2 -left-6 w-[80px] h-[2px] bg-white z-20"></span>
//           <span className="absolute -top-6 -left-2 h-[80px] w-[2px] bg-white z-10"></span>

//           {/* Text */}
//           <p className="text-base sm:text-lg md:text-2xl leading-relaxed font-light text-white">
//             A quiet place for your loudest thoughts. <br />
//             For messy minds and blooming hearts. <br />
//             <span className="text-white/90">JourNiva is where you pause,</span><br />
//             capture the now, <br />
//             and gently rise — one word at a time.
//           </p>

//           {/* Button Centered */}
//           <div className="mt-6 flex justify-center">
//             <button className="text-[#2F1313] bg-[#D9D9D9] px-4 py-1 rounded-xl font-medium 
//                       hover:bg-[#2F1313] hover:text-[#D9D9D9] transition cursor-pointer">
//               Get Started
//             </button>
//           </div>

//           {/* Bottom Crossing Lines */}
//           <span className="absolute -bottom-2 -right-6 w-[80px] h-[2px] bg-white z-20"></span>
//           <span className="absolute -bottom-6 -right-2 h-[80px] w-[2px] bg-white z-10"></span>
//         </div>
//       </div>
      
//     </div>
    
//   );
  
// };

// export default LandingPage;
import React from 'react';
import BgImage from '../assets/BgGreen.jpg';
import Navbar from '../components/Navbar';
import '../App.css';
import WhyJouriva from '../components/WhyJourniva';

const LandingPage = () => {
  return (
    <div style={{ fontFamily: 'Judson, serif' }}>
      {/* FIRST SECTION */}
      <div
        className="relative min-h-screen bg-cover bg-center text-white"
        style={{
          backgroundImage: `url(${BgImage})`,
        }}
      >
        {/* Navbar */}
        <Navbar />

        {/* Title + Subtitle */}
        <div className="flex flex-col justify-center mt-10 mb-6 pl-8 sm:pl-16 md:pl-24 lg:pl-32">
          <h1 className="text-transparent bg-clip-text bg-gradient-to-b from-white to-[#bcbcbc] text-5xl sm:text-6xl font-bold mb-2">
  JourNiva
</h1>

          <div className="flex gap-6 text-lg sm:text-xl tracking-wide text-transparent bg-clip-text bg-gradient-to-b from-white to-[#bcbcbc]  font-bold mb-2 ">
            <span>Write.</span>
            <span>Reflect.</span>
            <span>Rise.</span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="w-full flex justify-center sm:justify-end py-12 px-4">
          <div className="relative bg-black/20 px-6 py-8 rounded-xl sm:mr-10 md:mr-16 lg:mr-24 xl:mr-32 w-fit max-w-lg">
            {/* Top Crossing Lines */}
            <span className="absolute -top-2 -left-6 w-[80px] h-[2px] bg-white z-20"></span>
            <span className="absolute -top-6 -left-2 h-[80px] w-[2px] bg-white z-10"></span>

            {/* Text */}
            <p className="text-base sm:text-lg md:text-2xl leading-relaxed font-light text-white">
              A quiet place for your loudest thoughts. <br />
              For messy minds and blooming hearts. <br />
              <span className="text-white/90">JourNiva is where you pause,</span><br />
              capture the now, <br />
              and gently rise — one word at a time.
            </p>

            {/* Button Centered */}
            <div className="mt-6 flex justify-center">
              <button className="text-[#2F1313] bg-[#D9D9D9] px-4 py-1 rounded-xl font-medium 
                        hover:bg-[#2F1313] hover:text-[#D9D9D9] transition cursor-pointer">
                Get Started
              </button>
            </div>

            {/* Bottom Crossing Lines */}
            <span className="absolute -bottom-2 -right-6 w-[80px] h-[2px] bg-white z-20"></span>
            <span className="absolute -bottom-6 -right-2 h-[80px] w-[2px] bg-white z-10"></span>
          </div>
        </div>

        {/* GRADIENT MERGER OVERLAY */}
        <div
          className="absolute bottom-0 w-full h-20 z-0"
          style={{
            background: 'linear-gradient(to bottom, transparent, #768064)',
          }}
        ></div>
      </div>

      {/* SECOND SECTION */}
      <WhyJouriva />
    </div>
  );
};

export default LandingPage;
