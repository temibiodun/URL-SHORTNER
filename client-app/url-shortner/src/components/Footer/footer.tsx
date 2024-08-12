import * as React from "react";

interface IFooterProps {}

const Footer: React.FunctionComponent<IFooterProps> = () => {
  return (
    <div className="bg-slate-900 text-white text-base text-center py-5">
      <nav className="flex justify-center flex-wrap gap-6 text-gray-500 font-medium">
        <a className="hover:text-gray-900 text-white text-base" href="#">
          Home
        </a>
        <a className="hover:text-gray-900 text-white text-base " href="#">
          About
        </a>
        <a className="hover:text-gray-900 bg-slate-900 text-white text-base " href="#">
          Services
        </a>
        <a className="hover:text-gray-900 text-white text-base" href="#">
          Terms of Use
        </a>
        <a className="hover:text-gray-900 text-white text-base" href="#">
          Privacy Policy
        </a>
        <a className="hover:text-gray-900 text-white text-base" href="#">
          Contact
        </a>
      </nav>
      <div className="flex justify-center space-x-5">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="https://img.icons8.com/fluent/30/000000/facebook-new.png" />
        </a>
        <a
          href="https://www.linkedin.com/in/abiodun-ogunleye-096655284/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="https://img.icons8.com/fluent/30/000000/linkedin-2.png" />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="https://img.icons8.com/fluent/30/000000/instagram-new.png" />
        </a>
        <a
          href="https://messenger.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="https://img.icons8.com/fluent/30/000000/facebook-messenger--v2.png" />
        </a>
        <a href="https://x.com/Temitope___O?t=IhbYkalhXRWMkDVpHtSsug&s=09" target="_blank" rel="noopener noreferrer">
          <img src="https://img.icons8.com/fluent/30/000000/twitter.png" />
        </a>
      </div>
      Copyright &#169;2024 URLShortner Abiodun Ogunleye. All rights reserved.
    </div>
  );
};

export default Footer;
