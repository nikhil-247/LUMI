
const Profile = () => {
  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen p-6">
      {/* Profile Header */}
      <div className="bg-white shadow-lg rounded-lg w-full max-w-2xl p-6">
        <div className="flex items-center gap-6">
          <img
            src="https://ui-avatars.com/api/?name=Toka&background=8B5CF6&color=fff&size=128"
            alt="Toka"
            className="w-32 h-32 rounded-full"
          />
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Toka</h1>
            <p className="text-gray-600">Software Engineer | Music Lover | Dreamer</p>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-white shadow-lg rounded-lg w-full max-w-2xl p-6 mt-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">About Me</h2>
        <p className="text-gray-600">
          Hi, I'm Toka! I'm a passionate software engineer who loves solving problems and creating
          meaningful applications. When I'm not coding, you can find me exploring new music,
          reading novels, or enjoying a cup of coffee at my favorite café.
        </p>
      </div>

      {/* Hobbies Section */}
      <div className="bg-white shadow-lg rounded-lg w-full max-w-2xl p-6 mt-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Hobbies</h2>
        <ul className="list-disc list-inside text-gray-600">
          <li>Listening to music and discovering new artists</li>
          <li>Reading mystery and fantasy novels</li>
          <li>Traveling and exploring new cultures</li>
          <li>Sketching and painting</li>
        </ul>
      </div>

      {/* Interests Section */}
      <div className="bg-white shadow-lg rounded-lg w-full max-w-2xl p-6 mt-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Interests</h2>
        <ul className="list-disc list-inside text-gray-600">
          <li>Artificial Intelligence and Machine Learning</li>
          <li>Web Development and UI/UX Design</li>
          <li>Music production and sound engineering</li>
          <li>Environmental sustainability and green tech</li>
        </ul>
      </div>

      {/* Contact Section */}
      <div className="bg-white shadow-lg rounded-lg w-full max-w-2xl p-6 mt-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact</h2>
        <p className="text-gray-600">Feel free to reach out to me!</p>
        <ul className="mt-4">
          <li>
            <strong>Email:</strong> toka@example.com
          </li>
          <li>
            <strong>Phone:</strong> +123 456 7890
          </li>
          <li>
            <strong>LinkedIn:</strong>{' '}
            <a
              href="https://linkedin.com/in/toka"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:underline"
            >
              linkedin.com/in/toka
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Profile;