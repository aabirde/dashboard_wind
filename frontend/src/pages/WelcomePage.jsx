import { Link } from 'react-router-dom';

const WelcomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-6">
      <div className="max-w-2xl w-full text-center space-y-12"> 
        {/* Text Section */}
        <div className="space-y-4">
          <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
            Wind Turbine Dashboard
          </h1>
          <p className="text-slate-500 text-xl max-w-lg mx-auto leading-relaxed">
            Your one-stop solution for monitoring and managing wind turbines with real-time analytics.
          </p>
        </div>

        {/* Unified Button Section */}
        <div className="flex flex-col items-center justify-center space-y-4"> 
          <Link 
            to="/login" 
            className="w-56 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 text-center"
          >
            Login to Dashboard
          </Link>
          
          <div className="flex items-center gap-3 w-56">
            <div className="h-px bg-slate-200 flex-1"></div>
            <span className="text-slate-400 text-sm font-medium">or</span>
            <div className="h-px bg-slate-200 flex-1"></div>
          </div>

          <Link 
            to="/register" 
            className="w-56 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-6 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 text-center"
          >
            Create New Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;