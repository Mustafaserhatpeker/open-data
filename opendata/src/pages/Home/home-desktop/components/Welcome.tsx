function Welcome() {
  return (
    <div
      style={{
        backgroundImage:
          "radial-gradient(circle farthest-side at 50% -75%, #d6c7ff 54%, #8a9bff 76%)",
      }}
      className="w-full min-h-[100vh] flex flex-col items-center justify-start py-24"
    >
      <h1 className="text-4xl font-bold mb-4">Welcome to Our Open Data Platform</h1>
    </div>
  );
}

export default Welcome;
