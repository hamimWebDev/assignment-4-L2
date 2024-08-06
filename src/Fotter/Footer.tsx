const Footer = () => {
  return (
    <div>
      <div className="mt-10 bg-slate-200 grid items-center grid-cols-1 md:grid-cols-4 gap-8 text-center p-4 pt-10">
        <div className="feature-item">
          <div className="w-16 h-16 rounded-full p-1 bg-green-600 flex justify-center items-center mx-auto mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
              fill="currentColor"
              width="24"
              height="24"
              className="text-white"
              aria-label="Secure Payment Icon"
            >
              <path d="M64 32C28.7 32 0 60.7 0 96v32h576V96c0-35.3-28.7-64-64-64H64zM576 224H0v192c0 35.3 28.7 64 64 64h448c35.3 0 64-28.7 64-64V224zM112 352h64c8.8 0 16 7.2 16 16s-7.2 16-16 16h-64c-8.8 0-16-7.2-16-16s7.2-16 16-16zm112 16c0-8.8 7.2-16 16-16h128c8.8 0 16 7.2 16 16s-7.2 16-16 16H240c-8.8 0-16-7.2-16-16z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold">SECURE PAYMENT</h3>
          <p className="text-sm">100% secure payment</p>
        </div>
        <div className="feature-item">
          <div className="w-16 h-16 rounded-full p-1 bg-green-600 flex justify-center items-center mx-auto mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 512"
              fill="currentColor"
              width="30"
              height="30"
              className="text-white"
              aria-label="Free Shipping Icon"
            >
              <path d="M48 0C21.5 0 0 21.5 0 48L0 368c0 26.5 21.5 48 48 48l16 0c0 53 43 96 96 96s96-43 96-96l128 0c0 53 43 96 96 96s96-43 96-96l32 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l0-64 0-32 0-18.7c0-17-6.7-33.3-18.7-45.3L512 114.7c-12-12-28.3-18.7-45.3-18.7L416 96l0-48c0-26.5-21.5-48-48-48L48 0zM416 160l50.7 0L544 237.3l0 18.7-128 0 0-96zM112 416a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm368-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold">FREE SHIPPING</h3>
          <p className="text-sm">For Orders Above Tk. 3000</p>
        </div>
        <div className="feature-item">
          <div className="w-16 h-16 rounded-full p-1 bg-green-600 flex justify-center items-center mx-auto mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
              fill="currentColor"
              width="34"
              height="34"
              className="text-white"
              aria-label="Online Nursery Icon"
            >
              <path d="M384 312.7c-55.1 136.7-187.1 54-187.1 54-40.5 81.8-107.4 134.4-184.6 134.7-16.1 0-16.6-24.4 0-24.4 64.4-.3 120.5-42.7 157.2-110.1-41.1 15.9-118.6 27.9-161.6-82.2 109-44.9 159.1 11.2 178.3 45.5 9.9-24.4 17-50.9 21.6-79.7 0 0-139.7 21.9-149.5-98.1 119.1-47.9 152.6 76.7 152.6 76.7 1.6-16.7 3.3-52.6 3.3-53.4 0 0-106.3-73.7-38.1-165.2 124.6 43 61.4 162.4 61.4 162.4 .5 1.6 .5 23.8 0 33.4 0 0 45.2-89 136.4-57.5-4.2 134-141.9 106.4-141.9 106.4-4.4 27.4-11.2 53.4-20 77.5 0 0 83-91.8 172-20z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold">ONLINE NURSERY</h3>
          <p className="text-sm">Bangladesh's #1 Plants Shop</p>
        </div>
        <div className="feature-item">
          <h3 className="text-lg font-bold">
            SHOW US SOME <span className="text-green-600">❤</span> ON SOCIAL
            MEDIA
          </h3>
          <div className="flex justify-center items-center space-x-4 mt-4">
            <a href="#" aria-label="Facebook">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                fill="currentColor"
                width="34"
                height="34"
              >
                <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64h98.2V334.2H109.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H255V480H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64z" />
              </svg>
            </a>
            <a href="#" aria-label="Instagram">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
                fill="currentColor"
                width="44"
                height="44"
              >
                <path d="M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6-11.4 42.9-11.4 132.3-11.4 132.3s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zm-317.5 213.5V175.2l142.7 81.2-142.7 81.2z" />
              </svg>
            </a>
            <a href="#" aria-label="Twitter">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                fill="currentColor"
                width="35"
                height="35"
              >
                <path d="M194.4 211.7a53.3 53.3 0 1 0 59.3 88.7 53.3 53.3 0 1 0 -59.3-88.7zm142.3-68.4c-5.2-5.2-11.5-9.3-18.4-12c-18.1-7.1-57.6-6.8-83.1-6.5c-4.1 0-7.9 .1-11.2 .1c-3.3 0-7.2 0-11.4-.1c-25.5-.3-64.8-.7-82.9 6.5c-6.9 2.7-13.1 6.8-18.4 12s-9.3 11.5-12 18.4c-7.1 18.1-6.7 57.7-6.5 83.2c0 4.1 .1 7.9 .1 11.1s0 7-.1 11.1c-.2 25.5-.6 65.1 6.5 83.2c2.7 6.9 6.8 13.1 12 18.4s11.5 9.3 18.4 12c18.1 7.1 57.6 6.8 83.1 6.5c4.1 0 7.9-.1 11.2-.1c3.3 0 7.2 0 11.4 .1c25.5 .3 64.8 .7 82.9-6.5c6.9-2.7 13.1-6.8 18.4-12s9.3-11.5 12-18.4c7.2-18 6.8-57.4 6.5-83c0-4.2-.1-8.1-.1-11.4s0-7.1 .1-11.4c.3-25.5 .7-64.9-6.5-83l0 0c-2.7-6.9-6.8-13.1-12-18.4zm-67.1 44.5A82 82 0 1 1 178.4 324.2a82 82 0 1 1 91.1-136.4zm29.2-1.3c-3.1-2.1-5.6-5.1-7.1-8.6s-1.8-7.3-1.1-11.1s2.6-7.1 5.2-9.8s6.1-4.5 9.8-5.2s7.6-.4 11.1 1.1s6.5 3.9 8.6 7s3.2 6.8 3.2 10.6c0 2.5-.5 5-1.4 7.3s-2.4 4.4-4.1 6.2s-3.9 3.2-6.2 4.2s-4.8 1.5-7.3 1.5l0 0c-3.8 0-7.5-1.1-10.6-3.2zM448 96c0-35.3-28.7-64-64-64H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96zM357 389c-18.7 18.7-41.4 24.6-67 25.9c-26.4 1.5-105.6 1.5-132 0c-25.6-1.3-48.3-7.2-67-25.9s-24.6-41.4-25.8-67c-1.5-26.4-1.5-105.6 0-132c1.3-25.6 7.1-48.3 25.8-67s41.5-24.6 67-25.8c26.4-1.5 105.6-1.5 132 0c25.6 1.3 48.3 7.1 67 25.8s24.6 41.4 25.8 67c1.5 26.3 1.5 105.4 0 131.9c-1.3 25.6-7.1 48.3-25.8 67z" />
              </svg>
            </a>
            <a href="#" aria-label="LinkedIn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                fill="currentColor"
                width="30"
                height="30"
              >
                <path d="M448 209.9a210.1 210.1 0 0 1 -122.8-39.3V349.4A162.6 162.6 0 1 1 185 188.3V278.2a74.6 74.6 0 1 0 52.2 71.2V0l88 0a121.2 121.2 0 0 0 1.9 22.2h0A122.2 122.2 0 0 0 381 102.4a121.4 121.4 0 0 0 67 20.1z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="py-8 p-10 mt-10">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Policy Info */}
          <div>
            <h3 className="font-extrabold text-xl text-gray-700 mb-4">
              POLICY INFO
            </h3>
            <hr className="border-t-2 border-dashed border-gray-400 my-2" />
            <ul>
              <li>
                <a href="#" className="hover:underline">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Shipping & Delivery Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Cancellation & Refund Policies
                </a>
              </li>
            </ul>
          </div>

          {/* My Account */}
          <div>
            <h3 className="font-extrabold text-xl text-gray-700 mb-4">
              MY ACCOUNT
            </h3>
            <hr className="border-t-2 border-dashed border-gray-400 my-2" />
            <ul>
              <li>
                <a href="#" className="hover:underline">
                  My Account
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Register
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Login
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Affiliate Program
                </a>
              </li>
            </ul>
          </div>

          {/* Need Help? */}
          <div>
            <h3 className="font-extrabold text-xl text-gray-700 mb-4">
              NEED HELP?
            </h3>
            <hr className="border-t-2 border-dashed border-gray-400 my-2" />
            <ul>
              <li>
                <a href="#" className="hover:underline">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Our Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Office Address */}
          <div>
            <h3 className="font-extrabold text-xl text-gray-700 mb-4">
              OFFICE ADDRESS
            </h3>
            <hr className="border-t-2 border-dashed border-gray-400 my-2" />
            <address className="not-italic">
              <p>Kanchon Bazar Proshadpur, Manda, Naogaon, 6510.</p>
              <p>
                Phone:{" "}
                <a href="tel:01717088156" className="hover:underline">
                  01717088156
                </a>
              </p>
              <p>
                Email:{" "}
                <a href="mailto:admin@plantsbd.com" className="hover:underline">
                  admin@plantsbd.com
                </a>
              </p>
            </address>
          </div>
        </div>
      </div>
      <div className="bg-lime-900 h-10 flex items-center justify-center">
        <h1 className="text-xs lg:text-base font-bold text-gray-100">
          Copyright © 2024 Plants BD . All rights reserved. Govt Licence
          DAE-No.001
        </h1>
      </div>
    </div>
  );
};

export default Footer;
