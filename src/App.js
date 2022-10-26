import { Input } from "./Components/Input";
import { HiOutlineMail } from "react-icons/hi";
import { AiFillPhone } from "react-icons/ai";
function App() {
  const isHappy = false;
  const [isAuth, setIsAuth] = useState(false);
  return (
    <div className="flex place-items-center justify-center bg-red-300 h-screen">
      <div className="bg-slate-50 inline-flex flex-col space-y-2 p-2 mb-[50%] shadow-lg rounded">
        {false && (
          <button
            class={`py-2 px-4 bg-blue-400 font-bold rounded ${
              isHappy ? "text-white" : "text-black"
            }`}
          >
            Find friends
          </button>
        )}
        <div className="inline-flex flex-row">
          <AiFillPhone className="text-emerald-400" />
          <h1 className="text-slate-600 font-bold">HowAreU</h1>
        </div>
        <h1 className="text-3xl text-slate-600 font-bold text-center">
          Register
        </h1>
        <Input
          placeholder="Enter your Email"
          startAdornment={<HiOutlineMail />}
        />
        <Input
          placeholder="Enter your Password"
          startAdornment={<HiOutlineMail />}
        />
        <h1 className="text-slate-500">
          Already a user?{" "}
          <a href="/user" className="text-blue-500">
            Login
          </a>
        </h1>
      </div>
    </div>
  );
}

export default App;
