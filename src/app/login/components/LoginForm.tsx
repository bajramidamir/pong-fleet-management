export function LoginForm({
  handleSubmit,
  password,
  setPassword,
  setUsername,
  username,
}: LoginFormProps) {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-600"
        >
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none transition-all duration-300 ease-in-out focus:ring-2 focus:ring-purple-500"
          required
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-600"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none transition-all duration-300 ease-in-out focus:ring-2 focus:ring-purple-500"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full p-2 bg-purple-400 text-white rounded-md hover:bg-purple-600 focus:outline-none transition-all duration-300 ease-in-out focus:ring-2 focus:ring-purple-600"
      >
        Login
      </button>
    </form>
  );
}
