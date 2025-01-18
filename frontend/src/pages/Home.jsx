// import { Link } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import React from 'react';


// export default function Home() {
//   const { user } = useAuth();

//   return (
//     <div className="relative min-h-[calc(100vh-4rem)] bg-gradient-to-br from-indigo-500 to-purple-600">
//       <div className="absolute inset-0">
//         <img
//           src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
//           alt="Stock market background"
//           className="w-full h-full object-cover opacity-20"
//         />
//       </div>
      
//       <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
//         <div className="text-center">
//           <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
//             Track Your Portfolio Like a Pro
//           </h1>
//           <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-200">
//             Monitor your investments, analyze performance, and make informed decisions with our powerful portfolio tracking tools.
//           </p>
          
//           {!user && (
//             <div className="mt-10">
//               <Link
//                 to="/register"
//                 className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:text-lg"
//               >
//                 Get Started
//               </Link>
//             </div>
//           )}
//         </div>
        
//         <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-3">
//           <div className="bg-white bg-opacity-10 p-6 rounded-lg backdrop-blur-lg">
//             <h3 className="text-lg font-semibold text-white">Real-Time Tracking</h3>
//             <p className="mt-2 text-gray-200">Monitor your investments with real-time stock price updates</p>
//           </div>
          
//           <div className="bg-white bg-opacity-10 p-6 rounded-lg backdrop-blur-lg">
//             <h3 className="text-lg font-semibold text-white">Portfolio Analytics</h3>
//             <p className="mt-2 text-gray-200">Get detailed insights into your portfolio's performance</p>
//           </div>
          
//           <div className="bg-white bg-opacity-10 p-6 rounded-lg backdrop-blur-lg">
//             <h3 className="text-lg font-semibold text-white">Smart Alerts</h3>
//             <p className="mt-2 text-gray-200">Stay informed with customizable price alerts</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import React from 'react';

export default function Home() {
  const { user } = useAuth();

  console.log(user);
  // console.log("HOMe",user);

  return (
    <div className="relative min-h-[calc(100vh-4rem)] bg-gradient-to-br from-indigo-500 to-purple-600">
      <div className="absolute inset-0 h-[88vh]">
        <img
          // src="https://images.unsplash.com/photo-1591696331117-23820c2e2cb7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
          src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
          alt="Stock market background"
          className="w-full h-full object-cover opacity-20"
        />
      </div>

      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
            Take Control of Your Financial Journey
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-xl text-gray-200">
            Stay ahead of the curve with our state-of-the-art tools for tracking stocks, analyzing markets, and building a winning portfolio.
          </p>

          {!user && (
            <div className="mt-10">
              <Link
                to="/register"
                className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:text-lg"
              >
                Get Started for Free
              </Link>
            </div>
          )}
        </div>

        {/* Features Section */}
        <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="bg-white bg-opacity-10 p-6 rounded-lg backdrop-blur-lg">
            <h3 className="text-lg font-semibold text-white">Real-Time Tracking</h3>
            <p className="mt-2 text-gray-200">Monitor your investments with live updates on stock prices and trends.</p>
          </div>

          <div className="bg-white bg-opacity-10 p-6 rounded-lg backdrop-blur-lg">
            <h3 className="text-lg font-semibold text-white">Portfolio Analytics</h3>
            <p className="mt-2 text-gray-200">Analyze your portfolio's performance with detailed charts and insights.</p>
          </div>

          <div className="bg-white bg-opacity-10 p-6 rounded-lg backdrop-blur-lg">
            <h3 className="text-lg font-semibold text-white">Market News</h3>
            <p className="mt-2 text-gray-200">Stay informed with the latest financial news and market trends.</p>
          </div>
        </div>

        {/* Additional Section */}
        <div className="mt-20 bg-white bg-opacity-10 p-10 rounded-lg backdrop-blur-lg">
          <h2 className="text-2xl font-bold text-white text-center">
            Why Choose StockFolio?
          </h2>
          <p className="mt-4 text-gray-200 text-center">
            Our platform empowers you to make smarter investment decisions with ease. Whether you're a seasoned investor or just starting out, StockFolio has the tools you need to succeed.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/189/189665.png"
                alt="Performance"
                className="mx-auto h-16 w-16"
              />
              <h3 className="mt-4 text-lg font-semibold text-white">Unmatched Performance</h3>
              <p className="mt-2 text-gray-200">Track your investments with blazing speed and accuracy.</p>
            </div>
            <div className="text-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/4293/4293531.png"
                alt="Support"
                className="mx-auto h-16 w-16"
              />
              <h3 className="mt-4 text-lg font-semibold text-white">24/7 Support</h3>
              <p className="mt-2 text-gray-200">Our team is here to help you every step of the way.</p>
            </div>
            <div className="text-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3382/3382458.png"
                alt="Insights"
                className="mx-auto h-16 w-16"
              />
              <h3 className="mt-4 text-lg font-semibold text-white">Advanced Insights</h3>
              <p className="mt-2 text-gray-200">Gain deeper insights with our AI-powered analytics.</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Ready to Elevate Your Portfolio?
          </h2>
          <p className="mt-4 text-lg text-gray-200">
            Join thousands of investors who trust StockFolio for their financial journey.
          </p>
          <Link
            to="/register"
            className="mt-6 inline-block px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Sign Up Today
          </Link>
        </div>
      </div>
    </div>
  );
}
