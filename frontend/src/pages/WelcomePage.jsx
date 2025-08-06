import { Link } from 'react-router-dom';

const WelcomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Welcome to the Wind Turbine Dashboard</h1>
      <p className="text-lg mb-8">Your one-stop solution for monitoring and managing wind turbines.</p>
      <div>
        <Link to="/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">
          Login
        </Link>
        <Link to="/register" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Register
        </Link>
      </div>
    </div>
  );
};

export default WelcomePage;