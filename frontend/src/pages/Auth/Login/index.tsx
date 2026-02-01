const Login = () => {
   return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
         <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
            <h1 className="text-2xl font-bold mb-6 text-center">Login to Afasya</h1>
            <form className="space-y-4">
               <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input type="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500" />
               </div>
               <div>
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  <input type="password" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500" />
               </div>
               <button type="submit" className="w-full bg-primary-600 text-white py-2 rounded-md hover:bg-primary-700 transition">Login</button>
            </form>
         </div>
      </div>
   );
};

export default Login;
