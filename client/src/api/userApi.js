import { axiosInstance } from "../utils/axiosInstance";
import { toast } from "sonner";

//GetStarted Route 1
export const checkEmailExistsApi = async (email) => {
  try {
    const res = await axiosInstance.post("/user/check-email", {
      email: email.toLowerCase(),
    });
    return res.data;
  } catch (error) {
    const message = error?.response?.data?.message || "Unknown error";
    if (
      message.includes("Google Account Detected - Please Sign In with Google!")
    ) {
      toast.error("Google account found. Please use 'Sign in with Google'");
    } else if (message.includes("Invalid Email Format!")) {
      toast.error("Invalid Email Format!");
    } else if (message.includes("Email is required!")) {
      toast.error("Email is required!");
    } else {
      toast.error("Server error.Please try again.");
    }
    throw error;
  }
};

//GetStarted Route 2
export const handleInitialSubmitApi = async ({
  email,
  setStep,
  setUsername,
  setAvatarUrl,
  setLoading,
}) => {
  try {
    setLoading(true);
    const res = await checkEmailExistsApi(email);
    const username = res?.user?.name;
    // 0 = new user, 1 = existing user
    if (res?.status === 0) {
      toast("Looks like you're new! Lets begin with Sign Up");
      setStep("signup");
    } else if (res?.status === 1) {
      toast.success(`Welcome back ${username} !`);
      setStep("login");
      setAvatarUrl(res.user?.avatarUrl || "");
      setUsername(res.user?.name);
    }
  } catch (error) {
    toast.error("Check the email entered", error);
  } finally {
    setLoading(false);
  }
};

//Login/SignIn Route 1
export const LhandleSubmitApi = async ({ email, password, setLoading }) => {
  if (!email || !password) {
    toast.error("Email and Password are required!");
    setLoading(false);
    return;
  }
  try {
    setLoading(true)
    const res = axiosInstance.post("/user/login", { email, password });
    return res;

    
  } catch (error) {
    const status = error.response?.status;
    const message = error.response?.data?.message || "Login failed";

    if (status === 400) {
      toast.info(message); // "Google Account Detected..."
    } else if (status === 401) {
      toast.error(message); // "Email Not Verified..."
    } else if (status === 401 || status === 404) {
      toast.error(message); // Invalid creds
    } else {
      toast.error("Unexpected error. Please try again.");
    }
  } finally {
    setLoading(false);
  }
};

//Login/SignIn Route 2
export const LhandleForgetPassword = async ({
  setLoading,
  email,
}) =>{

  if(!email){
    toast.error("Email is required to send reset link.");
    return { status: 400 };
  }
  try {
    setLoading(true)
    const res = await axiosInstance.post("/user/forgot-password-link",{
      email : email.toLowerCase(),
    })
    return res
  } catch (error) {
    const message = error?.response?.data?.message || "Request failed";
    toast.error(message);
    return { status: error?.response?.status || 500 }
  }finally{
    setLoading(false)
  }
}
