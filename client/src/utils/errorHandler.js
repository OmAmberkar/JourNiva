// src/utils/handleApiError.js
import { toast } from "sonner";

export const handleApiError = (
  error,
  {
    fallbackMessage = "Something went wrong. Please try again.",
    redirectUnauthorized = true,
    showToast = true,
  } = {}
) => {
  let message = fallbackMessage;
  const status = error?.response?.status;

  // Handle known error types
  if (error?.response?.data?.message) {
    message = error.response.data.message;
  } else if (error?.message?.includes("Network Error")) {
    message = "Network error: Please check your internet connection.";
  } else if (status === 0 || !navigator.onLine) {
    message = "You appear to be offline.";
  }

  // Optional: Handle specific status codes
  switch (status) {
    case 400:
      message = message || "Bad request.";
      break;
    case 401:
      message = message || "Unauthorized. Please log in.";
      if (redirectUnauthorized) {
        localStorage.removeItem("accessToken");
        setTimeout(() => (window.location.href = "/login"), 1500);
      }
      break;
    case 403:
      message = message || "Access denied.";
      break;
    case 404:
      message = message || "Resource not found.";
      break;
    case 500:
      message = message || "Internal server error.";
      break;
    default:
      // Leave default fallback
      break;
  }

  // Show toast if enabled
  if (showToast) toast.error(message);

  // Log for dev tools
  console.error("[API ERROR]", {
    status,
    message,
    url: error?.config?.url,
    method: error?.config?.method,
    error,
  });

  return message;
};
