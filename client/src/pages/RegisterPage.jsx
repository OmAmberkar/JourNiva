import Logo from "../assets/Logo.png";
export default function RegisterPage() {
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
      <div className="absolute top-15 right-15">
        <img src={Logo} alt="logo" className="w-[132px] h-[132px]" />
      </div>

      {/* ✅ Black Form Box */}
      <div className="bg-black/60 p-6 sm:p-10 rounded-3xl shadow-xl w-full max-w-md text-white">
        <h2 className="text-3xl text-center mb-6 text-[#DADED8]">Register</h2>
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
          {/* Email */}
          <div className="form-control flex flex-row items-center justify-center gap-4">
            <label className="w-[100px] text-center text-[#DADED8]">
              Email :
            </label>
            <input
              type="email"
              placeholder="Example@gmail.com"
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
          {/* Confirm Password */}
          <div className="form-control flex flex-row items-center justify-center gap-4">
            <label className="w-[100px] text-center text-[#DADED8]">
              Confirm Password :
            </label>
            <input
              type="password"
              placeholder="Confirm your Password..."
              className="rounded-md w-[246px] h-[20px] text-sm bg-white/60 text-white text-center placeholder:text-white placeholder:opacity-60"
            />
          </div>
          {/* Gender */}
          <div className="form-control flex flex-row items-center justify-center gap-4">
            <label className="text-center text-[#DADED8] w-[100px]">
              Gender :
            </label>
            <div className="flex gap-4">
              <label className="label cursor-pointer">
                <input type="radio" name="gender" className="radio radio-sm" />
                <span className="label-text ml-2 text-white">Male</span>
              </label>
              <label className="label cursor-pointer">
                <input type="radio" name="gender" className="radio radio-sm" />
                <span className="label-text ml-2 text-white">Female</span>
              </label>
              <label className="label cursor-pointer">
                <input type="radio" name="gender" className="radio radio-sm" />
                <span className="label-text ml-2 text-white">Other</span>
              </label>
            </div>
          </div>
          {/* Contact */}
          <div className="form-control flex flex-row items-center justify-center gap-1">
            <label className="text-center text-[#DADED8] w-[100px]">
              Contact :
            </label>

            <div className="flex items-center gap-2">
              <span className="text-[#DADED8] whitespace-nowrap">IN +91</span>

              <input
                type="text"
                maxLength={10}
                placeholder="xxxxxxxxxx"
                className="rounded-md w-[246px] h-[20px] text-sm 
        bg-white/60 text-white text-center 
        placeholder:text-white placeholder:opacity-60"
              />
            </div>
          </div>
          {/* Bitmoji */}
          <div className="form-control flex flex-row items-center justify-center gap-4">
            <label className="w-[100px] text-center text-[#DADED8]">
              Bitmoji :
            </label>
            <select className="rounded-md w-[246px] h-[20px] text-sm bg-white/60 text-white text-center cursor-pointer">
              <option>Select</option>
              <option>🙂</option>
              <option>😎</option>
              <option>🥳</option>
            </select>
          </div>
          {/* <div className="form-control flex flex-row items-center justify-center gap-4">
            <label className="w-[100px] text-right text-[#DADED8]">
              Bitmoji :
            </label>
            <select className="rounded-xl w-[246px] h-[20px] text-sm bg-white/60 text-white text-center cursor-pointer">
              <option>Select</option>
              <option>🙂</option>
              <option>😎</option>
              <option>🥳</option>
            </select>
          </div> */}
          {/* Register Button */}
          <div className="form-control mt-6 text-center">
            <button className="w-[123px] h-[30px] mx-auto bg-[#D9D9D9] text-[#2F1313] rounded-2xl transition hover:bg-[#2F1313] hover:text-[#D9D9D9] cursor-pointer">
              Register
            </button>
          </div>
        </form>
      </div>

      {/* ✅ Login Section Below */}
      <div className="mt-6 flex items-center justify-center gap-2">
        <p className="text-white">Already have an account?</p>
        <button className="w-[123px] h-[30px] bg-[#D9D9D9] text-[#2F1313] rounded-2xl transition hover:bg-[#2F1313] hover:text-[#D9D9D9] cursor-pointer">
          Login
        </button>
      </div>
    </div>
  );
}
