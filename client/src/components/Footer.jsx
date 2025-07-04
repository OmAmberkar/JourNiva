// Footer.jsx
import {
  FaTwitter,
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-[#3C536B] text-[#D9E5F4] px-4 sm:px-6 md:px-10 py-24 font-Livvic relative z-0">
      <div
        id="AboutUs"
        className="max-w-7xl mx-auto pt-40 px-6 md:px-10 flex flex-col gap-10 md:flex-row md:justify-between text-center md:text-left"
      >
        {/* Left Side */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">JourNiva</h2>
          <p className="text-sm">© 2025 Journiva inc. All rights reserved.</p>

          {/* Social Icons — Horizontal */}
          <div className="flex gap-4 text-xl">
            <FaTwitter className="cursor-pointer hover:text-white" />
            <FaInstagram className="cursor-pointer hover:text-white" />
            <FaFacebookF className="cursor-pointer hover:text-white" />
            <FaYoutube className="cursor-pointer hover:text-white" />
            <FaLinkedinIn className="cursor-pointer hover:text-white" />
          </div>
        </div>

        {/* Right Side */}
        <div className="flex flex-col sm:flex-row gap-8 sm:gap-16 md:gap-20 text-left items-start">
          {/* About */}
          <div className="space-y-1">
            <h4 className="text-lg font-medium mb-2">About</h4>
            <a
              href="/about#introduction"
              className="block cursor-pointer hover:underline"
            >
              About us
            </a>
          </div>

          {/* Learn */}
          <div className="space-y-1">
            <h4 className="text-lg font-medium mb-2">Learn</h4>
            <a
              href="https://www.verywellhealth.com/journaling-7498123"
              className="block cursor-pointer hover:underline"
            >
              Research on Journaling
            </a>
            <a
              href="/about#introduction"
              className="block cursor-pointer hover:underline"
            >
              Introduction to Journaling
            </a>
            <a
              href="/about#howtoreflect"
              className="block cursor-pointer hover:underline"
            >
              How to Reflect
            </a>
          </div>

          {/* Support */}
          <div className="space-y-1">
            <h4 className="text-lg font-medium mb-2">Support</h4>
            <a href="#" className="block cursor-pointer hover:underline">
              Contact us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
