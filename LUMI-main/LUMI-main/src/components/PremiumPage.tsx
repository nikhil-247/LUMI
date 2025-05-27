
const PremiumPage = () => {
    return (
        <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center p-6">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg text-center">
                <h1 className="text-3xl font-bold text-indigo-600 mb-4">Go Premium!</h1>
                <p className="text-gray-700 mb-6">
                    Unlock exclusive features and enhance your experience with our premium plan.
                </p>
                <ul className="text-left mb-6">
                    <li className="mb-2">✔️ Unlimited AI interactions</li>
                    <li className="mb-2">✔️ Priority support</li>
                    <li className="mb-2">✔️ Access to advanced AI models</li>
                </ul>
                <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                    Upgrade Now
                </button>
            </div>
        </div>
    );
};

export default PremiumPage;