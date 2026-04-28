import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import GreenButton from "../../components/customer/GreenButton";
import logoImage from "../../assets/logo.png";

type AuthMode = "login" | "signup";

type LocalUser = {
  email: string;
  password: string;
  nickname: string;
};

const SALEZ_USER_KEY = "salez_user";
const SALEZ_LOGIN_KEY = "salez_is_logged_in";

export default function CustomerOnboarding() {
  const navigate = useNavigate();

  const [mode, setMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const isSignup = mode === "signup";

  const isFormValid = isSignup
    ? email.trim() !== "" && password.trim() !== "" && nickname.trim() !== ""
    : email.trim() !== "" && password.trim() !== "";

  useEffect(() => {
    const isLoggedIn = localStorage.getItem(SALEZ_LOGIN_KEY);

    if (isLoggedIn === "true") {
      navigate("/customer/home");
    }
  }, [navigate]);

  const handleSignup = () => {
    setErrorMessage("");

    if (!isFormValid) {
      setErrorMessage("이메일, 비밀번호, 닉네임을 모두 입력해주세요.");
      return;
    }

    const newUser: LocalUser = {
      email,
      password,
      nickname,
    };

    localStorage.setItem(SALEZ_USER_KEY, JSON.stringify(newUser));
    localStorage.setItem(SALEZ_LOGIN_KEY, "true");

    navigate("/customer/home");
  };

  const handleLogin = () => {
    setErrorMessage("");

    if (!isFormValid) {
      setErrorMessage("이메일과 비밀번호를 입력해주세요.");
      return;
    }

    const savedUser = localStorage.getItem(SALEZ_USER_KEY);

    if (!savedUser) {
      setErrorMessage("가입된 계정이 없습니다. 먼저 회원가입을 진행해주세요.");
      return;
    }

    const parsedUser = JSON.parse(savedUser) as LocalUser;

    const isCorrectUser =
      parsedUser.email === email && parsedUser.password === password;

    if (!isCorrectUser) {
      setErrorMessage("이메일 또는 비밀번호가 일치하지 않습니다.");
      return;
    }

    localStorage.setItem(SALEZ_LOGIN_KEY, "true");

    navigate("/customer/home");
  };

  const handleSubmit = () => {
    if (isSignup) {
      handleSignup();
      return;
    }

    handleLogin();
  };

  const handleModeChange = (nextMode: AuthMode) => {
    setMode(nextMode);
    setErrorMessage("");
    setEmail("");
    setPassword("");
    setNickname("");
  };

  return (
    <div className="flex min-h-screen flex-col bg-white px-5 py-8">
      <div className="flex flex-1 flex-col justify-center">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-6 flex h-32 w-32 items-center justify-center overflow-hidden">
            <img
              src={logoImage}
              alt="SALEZ 로고"
              className="h-full w-full object-contain"
            />
          </div>

          <h1 className="text-[34px] font-black tracking-tight text-green-900">
            SALEZ
          </h1>

          <p className="mt-3 text-[18px] font-bold text-gray-800">
            마감 할인, 현명한 선택
          </p>
        </div>

        <div className="mb-5 grid grid-cols-2 rounded-2xl bg-gray-100 p-1">
          <button
            type="button"
            onClick={() => handleModeChange("login")}
            className={`rounded-xl py-3 text-[14px] font-bold transition ${
              mode === "login"
                ? "bg-white text-emerald-600 shadow-sm"
                : "text-gray-400"
            }`}
          >
            로그인
          </button>

          <button
            type="button"
            onClick={() => handleModeChange("signup")}
            className={`rounded-xl py-3 text-[14px] font-bold transition ${
              mode === "signup"
                ? "bg-white text-emerald-600 shadow-sm"
                : "text-gray-400"
            }`}
          >
            회원가입
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {isSignup && (
            <div>
              <label className="mb-2 block text-[13px] font-bold text-gray-700">
                닉네임
              </label>
              <input
                value={nickname}
                onChange={(event) => setNickname(event.target.value)}
                placeholder="닉네임을 입력하세요"
                className="w-full rounded-2xl bg-gray-50 px-4 py-4 text-[15px] ring-1 ring-gray-100 outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>
          )}

          <div>
            <label className="mb-2 block text-[13px] font-bold text-gray-700">
              이메일
            </label>
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="이메일을 입력하세요"
              type="email"
              className="w-full rounded-2xl bg-gray-50 px-4 py-4 text-[15px] ring-1 ring-gray-100 outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-[13px] font-bold text-gray-700">
              비밀번호
            </label>
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="비밀번호를 입력하세요"
              type="password"
              className="w-full rounded-2xl bg-gray-50 px-4 py-4 text-[15px] ring-1 ring-gray-100 outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>

          {errorMessage && (
            <p className="rounded-2xl bg-red-50 px-4 py-3 text-[13px] font-semibold text-red-500">
              {errorMessage}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-3 pb-4">
        <GreenButton disabled={!isFormValid} onClick={handleSubmit}>
          {isSignup ? "회원가입하고 시작하기" : "로그인하기"}
        </GreenButton>

        <p className="mt-3 text-center text-[12px] leading-5 text-gray-400">
          현재 위치를 기반으로 주변 마감 할인 상품을 보여드려요.
        </p>
      </div>
    </div>
  );
}
