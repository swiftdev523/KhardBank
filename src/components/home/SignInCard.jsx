import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { useAuth } from "../../auth/AuthContext";

export default function SignInCard() {
  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [mode, setMode] = useState("signin");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberUsername, setRememberUsername] = useState(false);

  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupUsername, setSignupUsername] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  const [error, setError] = useState("");
  const cardRef = useRef(null);
  const usernameRef = useRef(null);

  useEffect(() => {
    if (searchParams.get("redirect") === "true") {
      cardRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      usernameRef.current?.focus();
      // Clean the URL now that the redirect has been acted on.
      setSearchParams({}, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  function handleSignIn(e) {
    e.preventDefault();
    setError("");
    const result = login(username, password);
    if (!result.success) {
      setError(result.error);
      return;
    }
    navigate("/dashboard");
  }

  function handleSignUp(e) {
    e.preventDefault();
    setError("");
    if (
      !signupName.trim() ||
      !signupUsername.trim() ||
      !signupPassword.trim()
    ) {
      setError("Please fill in all fields.");
      return;
    }
    signup({
      name: signupName.trim(),
      email: signupEmail.trim(),
      username: signupUsername.trim(),
      password: signupPassword,
    });
    navigate("/dashboard");
  }

  return (
    <div ref={cardRef} className="card p-6 md:p-7 w-full max-w-sm">
      {mode === "signin" ? (
        <form onSubmit={handleSignIn} noValidate>
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="text-sm text-slate">
                Username
              </label>
              <input
                id="username"
                ref={usernameRef}
                type="text"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 w-full border-b border-slate/30 bg-transparent py-2 text-sm text-ink focus:border-brass focus:outline-none"
              />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm text-slate">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="inline-flex items-center gap-1 text-xs font-medium text-brass hover:underline">
                  {showPassword ? (
                    <EyeOff size={13} aria-hidden="true" />
                  ) : (
                    <Eye size={13} aria-hidden="true" />
                  )}
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full border-b border-slate/30 bg-transparent py-2 text-sm text-ink focus:border-brass focus:outline-none"
              />
            </div>
          </div>

          <label className="mt-4 flex items-center gap-2 text-sm text-slate">
            <input
              type="checkbox"
              checked={rememberUsername}
              onChange={(e) => setRememberUsername(e.target.checked)}
              className="accent-brass"
            />
            Remember username
          </label>

          {error ? (
            <p className="mt-3 text-sm font-medium text-alert">{error}</p>
          ) : null}

          <button
            type="submit"
            className="mt-5 w-full flex items-center justify-center gap-2 rounded-lg bg-brass py-3 text-sm font-semibold text-ink hover:bg-brass-light transition-colors">
            Sign in
            <ArrowRight size={16} aria-hidden="true" />
          </button>

          <div className="my-4 flex items-center gap-3 text-xs text-slate">
            <span className="h-px flex-1 bg-slate/20" />
            Or
            <span className="h-px flex-1 bg-slate/20" />
          </div>

          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="w-full rounded-lg border border-ink/15 py-2.5 text-sm font-medium text-ink hover:bg-paper transition-colors">
            Passwordless sign in
          </button>

          <div className="mt-5 flex flex-col gap-1.5 text-sm">
            <button
              type="button"
              className="text-left text-brass hover:underline"
              onClick={() => setError("")}>
              Forgot username/password?
            </button>
            <button
              type="button"
              className="text-left text-brass hover:underline"
              onClick={() => setMode("signup")}>
              Not enrolled? Sign up now.
            </button>
          </div>

          <p className="mt-5 text-xs text-slate border-t border-slate/10 pt-4">
            Demo login — username <span className="mono">demo</span>, password{" "}
            <span className="mono">demo1234</span>
          </p>
        </form>
      ) : (
        <form onSubmit={handleSignUp} noValidate>
          <h2 className="font-serif text-lg font-semibold text-ink mb-4">
            Create your account
          </h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="signupName" className="text-sm text-slate">
                Full name
              </label>
              <input
                id="signupName"
                type="text"
                value={signupName}
                onChange={(e) => setSignupName(e.target.value)}
                className="mt-1 w-full border-b border-slate/30 bg-transparent py-2 text-sm text-ink focus:border-brass focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="signupEmail" className="text-sm text-slate">
                Email
              </label>
              <input
                id="signupEmail"
                type="email"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                className="mt-1 w-full border-b border-slate/30 bg-transparent py-2 text-sm text-ink focus:border-brass focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="signupUsername" className="text-sm text-slate">
                Choose a username
              </label>
              <input
                id="signupUsername"
                type="text"
                value={signupUsername}
                onChange={(e) => setSignupUsername(e.target.value)}
                className="mt-1 w-full border-b border-slate/30 bg-transparent py-2 text-sm text-ink focus:border-brass focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="signupPassword" className="text-sm text-slate">
                Choose a password
              </label>
              <input
                id="signupPassword"
                type="password"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                className="mt-1 w-full border-b border-slate/30 bg-transparent py-2 text-sm text-ink focus:border-brass focus:outline-none"
              />
            </div>
          </div>

          {error ? (
            <p className="mt-3 text-sm font-medium text-alert">{error}</p>
          ) : null}

          <button
            type="submit"
            className="mt-5 w-full flex items-center justify-center gap-2 rounded-lg bg-brass py-3 text-sm font-semibold text-ink hover:bg-brass-light transition-colors">
            Create account
            <ArrowRight size={16} aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={() => {
              setMode("signin");
              setError("");
            }}
            className="mt-4 w-full text-sm font-medium text-brass hover:underline">
            Back to sign in
          </button>
        </form>
      )}
    </div>
  );
}
