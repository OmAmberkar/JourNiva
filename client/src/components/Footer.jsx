
import {
  FaTwitter,
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaLinkedinIn,
} from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-[#3C536B] text-[#D9E5F4] px-4 sm:px-6 md:px-10 py-10 font-Livvic ">
      <div className="max-w-7xl mx-auto flex flex-col gap-10 md:flex-row md:justify-between pt-50">

        {/* Left Side */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">JourNiva</h2>
          <p className="text-sm">© 2025 Journiva inc. All rights reserved.</p>

          {/* Social Icons */}
          <div className="flex flex-row sm:flex-col gap-4 text-xl">
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
            <span className="block cursor-pointer leading-tight">About us</span>
            <span className="block cursor-pointer leading-tight">Press kit</span>
          </div>

          {/* Learn */}
          <div className="space-y-1">
            <h4 className="text-lg font-medium mb-2">Learn</h4>
            <span className="block cursor-pointer leading-tight">Research on Journaling</span>
            <span className="block cursor-pointer leading-tight">Introduction to JourNiva</span>
            <span className="block cursor-pointer leading-tight">How to Reflect</span>
          </div>

          {/* Support */}
          <div className="space-y-1">
            <h4 className="text-lg font-medium mb-2">Support</h4>
            <span className="block cursor-pointer leading-tight">Contact us</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
