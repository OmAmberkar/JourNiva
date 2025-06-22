export default function LoginPage() {
  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center px-4"
      style={{
        backgroundImage: `url("src/assets/BgGreen.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        fontFamily: "Judson, serif",
      }}
    >
      <div className="flex flex-col gap-1 items-center justify-center text-center mb-2">
        <span className="absolute top-15 left-8 w-[200px] h-[2px] bg-white z-20"></span>
        <span className="absolute top-8 left-15 h-[200px] w-[2px] bg-white z-10"></span>
        <span className="absolute bottom-15 right-8 w-[200px] h-[2px] bg-white z-20"></span>
        <span className="absolute bottom-8 right-15 h-[200px] w-[2px] bg-white z-10"></span>
        <h1
          className="leading-tight text-transparent bg-clip-text"
          style={{
            fontFamily: "Judson, serif",
            fontSize: "64px",
            backgroundImage: "linear-gradient(to bottom, #ffffff, #bcbcbc)",
          }}
        >
          JourNiva
        </h1>

        <div
          className="flex gap-7 justify-center text-transparent bg-clip-text"
          style={{
            fontFamily: "Judson, serif",
            fontSize: "24px",
            backgroundImage: "linear-gradient(to bottom, #ffffff, #bcbcbc)",
          }}
        >
          <span>Write.</span>
          <span>Reflect.</span>
          <span>Rise.</span>
        </div>
      </div>

      {/* ✅ Black Form Box */}
      <div className="bg-black/60 p-6 sm:p-10 rounded-3xl shadow-xl w-full max-w-md text-white">
        <h2 className="text-3xl text-center mb-6 text-[#DADED8]">Login</h2>
        <div className="w-full border-t border-[#DADED8] mb-6"></div>

        <form className="space-y-4">
          {/* Name */}
          <div className="form-control flex flex-row items-center justify-center gap-4">
            <label className="w-[100px] text-center text-[#DADED8]">
              Name :
            </label>
            <input
              type="text"
              placeholder="Enter your Username..."
              className="rounded-md w-[246px] h-[20px] text-sm bg-white/60 text-white text-center placeholder:text-white placeholder:opacity-60"
            />
          </div>

          {/* Password */}
          <div className="form-control flex flex-row items-center justify-center gap-4">
            <label className="w-[100px] text-center text-[#DADED8]">
              Password :
            </label>
            <input
              type="password"
              placeholder="Enter your Password..."
              className="rounded-md w-[246px] h-[20px] text-sm bg-white/60 text-white text-center placeholder:text-white placeholder:opacity-60"
            />
          </div>
          <div className="flex items-center justify-between px-6">
            <label className="flex items-center gap-2 text-sm text-[#DADED8]">
              <input type="checkbox" className="checkbox checkbox-success" />
              Remember me
            </label>
            <a href="#" className="text-sm text-[#DADED8] hover:underline">
              Forgot Password?
            </a>
          </div>

          {/* Register Button */}
          <div className="form-control mt-6 text-center">
            <button className="w-[123px] h-[30px] mx-auto bg-[#D9D9D9] text-[#2F1313] rounded-2xl transition hover:bg-[#2F1313] hover:text-[#D9D9D9] cursor-pointer">
              Login
            </button>
          </div>
        </form>
      </div>

      {/* ✅ Login Section Below */}
      <div className="mt-6 flex items-center justify-center gap-2">
        <p className="text-white">Don't have an account?</p>
        <button className="w-[123px] h-[30px] bg-[#D9D9D9] text-[#2F1313] rounded-2xl transition hover:bg-[#2F1313] hover:text-[#D9D9D9] cursor-pointer">
          Register
        </button>
      </div>
    </div>
  );
}
