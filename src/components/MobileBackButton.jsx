import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const HIDDEN_PATHS = ["/", "/landing"];

export default function MobileBackButton() {
  const navigate = useNavigate();
  const location = useLocation();

  if (HIDDEN_PATHS.includes(location.pathname)) return null;

  return (
    <button
      onClick={() => {
        if (window.history.state && window.history.state.idx > 0) {
          navigate(-1);
        } else {
          navigate("/");
        }
      }}
      aria-label="Go back"
      className="lg:hidden fixed bottom-5 left-5 z-40 flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 active:scale-95 transition-all print:hidden"
    >
      <ArrowLeft className="w-5 h-5" />
    </button>
  );
}