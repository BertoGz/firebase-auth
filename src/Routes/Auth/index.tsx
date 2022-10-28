import { useQueryUserData } from "../../React-Query/Queries/useQueryUserData";
import { useNavigate } from "react-router-dom";
import { useMutationLogout } from "../../React-Query/Mutations/useMutationLogout";
import { FirebaseActions } from "../../Firebase";
import { AppFooter } from "../../Components";
const Auth = () => {
  const navigate = useNavigate();
  const { data: userData } = useQueryUserData();
  const { mutateAsync: signOutMutation } = useMutationLogout();
  const { emailVerified, email } = userData || {};
  if (!userData) {
    return <></>;
  }
  if (!emailVerified) {
    return (
      <div className="flex flex-col place-items-center space-y-10">
        <h1 className="text-3xl text-gray-700 font-bold">
          Verify your account
        </h1>
        <div className="flex flex-col place-items-center">
          <h1 className="text-lg text-gray-500">{email}</h1>
          <button
            onClick={() => {
              if (email) {
                FirebaseActions.sendAuthLinkToEmail(email);
              }
            }}
            className={`py-2 px-4 bg-blue-700 font-bold rounded ${"text-white"}`}
          >
            Send Email Verification
          </button>
        </div>
        <div className="flex flex-row">
          <h1 className="text-lg text-gray-600">Not you?</h1>
          <button
            onClick={() => {
              if (email) {
                signOutMutation(null, {
                  onSuccess: () => {
                    navigate("/");
                  },
                });
              }
            }}
            className={`pl-2 text-blue-500 font-bold rounded ${"text-white"}`}
          >
            Logout
          </button>
        </div>
      </div>
    );
  }
  return (
    <div style={{height:'100vh', maxHeight:window.innerHeight}} className="grid grid-rows-2 bg-emerald-200">
      <div className="flex flex-col place-items-center space-y-5">
        <h1 className="text-5xl pt-10 text-cyan-800 font-bold">Success!</h1>
        <h1 className="text-2xl text-cyan-800">You are signed on</h1>
      </div>
      <div className="bg-cyan-800 flex justify-center place-items-center">
        <button
          onClick={() => {
            signOutMutation(null, {
              onSuccess: () => {
                navigate("/");
              },
            });
          }}
          className={`px-10 font-bold rounded text-white`}
        >
          Press here to sign out
        </button>
      </div>
    </div>
  );
};
export default Auth;
