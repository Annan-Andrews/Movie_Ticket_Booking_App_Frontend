import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate()

  return (
    // <footer className="footer bg-base-200 text-base-content p-10">
    //   <nav>
    //     <h6 className="footer-title">Services</h6>
    //     <a className="link link-hover">Branding</a>
    //     <a className="link link-hover">Design</a>
    //     <a className="link link-hover">Marketing</a>
    //     <a className="link link-hover">Advertisement</a>
    //   </nav>
    //   <nav>
    //     <h6 className="footer-title">Company</h6>
    //     <a className="link link-hover">About us</a>
    //     <a className="link link-hover">Contact</a>
    //     <a className="link link-hover">Jobs</a>
    //     <a className="link link-hover">Press kit</a>
    //   </nav>
    //   <nav>
    //     <h6 className="footer-title">Legal</h6>
    //     <a className="link link-hover">Terms of use</a>
    //     <a className="link link-hover">Privacy policy</a>
    //     <a className="link link-hover">Cookie policy</a>
    //   </nav>
    //   <form>
    //     <h6 className="footer-title">Newsletter</h6>
    //     <fieldset className="form-control w-80">
    //       <label className="label">
    //         <span className="label-text">Enter your email address</span>
    //       </label>
    //       <div className="join">
    //         <input
    //           type="text"
    //           placeholder="username@site.com"
    //           className="input input-bordered join-item"
    //         />
    //         <button className="btn btn-primary join-item">Subscribe</button>
    //       </div>
    //     </fieldset>
    //   </form>
    // </footer>
    <footer className="bg-gray-100 dark:bg-gray-800">
      <div className="relative mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 lg:pt-24">
        <div className="absolute end-4 top-4 sm:end-6 sm:top-6 lg:end-8 lg:top-8">
          <a
            className="inline-block rounded-full bg-teal-600 p-2 text-white shadow-sm transition hover:bg-teal-500 sm:p-3 lg:p-4 dark:bg-gray-700 dark:text-teal-300 dark:hover:bg-gray-600"
            onClick={()=>{window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          >
            <span className="sr-only">Back to top</span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>

        <div className="lg:flex lg:items-end lg:justify-between">
          <div>
            <h1 className="text-2xl font-sans font-bold ">MOVIE BOOKING</h1>
          </div>

          <ul className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:mt-0 lg:justify-end lg:gap-12">
            <li>
              <a
                className="text-gray-700 transition hover:text-gray-700/75 dark:text-white dark:hover:text-white/75"
                href="#"
              >
                About
              </a>
            </li>

            <li>
              <a
                className="text-gray-700 transition hover:text-gray-700/75 dark:text-white dark:hover:text-white/75"
                href="#"
              >
                Services
              </a>
            </li>

            <li>
              <a
                className="text-gray-700 transition hover:text-gray-700/75 dark:text-white dark:hover:text-white/75"
                href="#"
              >
                Projects
              </a>
            </li>

            <li>
              <a
                className="text-gray-700 transition hover:text-gray-700/75 dark:text-white dark:hover:text-white/75"
                onClick={()=>navigate('theaterOwner/login')}
              >
                Login as Theater Owner
              </a>
            </li>
          </ul>
        </div>

        <p className="mt-12 text-center text-sm text-gray-500 lg:text-right dark:text-gray-400">
          Copyright &copy; 2025. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
