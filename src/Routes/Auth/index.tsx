import { useQueryUserData } from "../../React-Query/Queries/useQueryUserData";
import { useNavigate } from "react-router-dom";
import { useMutationLogout } from "../../React-Query/Mutations/useMutationLogout";
import { FirebaseActions } from "../../Firebase";
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
    <div className="flex flex-col place-items-center space-y-3 h-screen bg-purple-300">
      <h1 className="text-3xl pt-10">You are signed on!</h1>
      <button
        onClick={() => {
          signOutMutation(null, {
            onSuccess: () => {
              navigate("/");
            },
          });
        }}
        className={`py-2 px-4 bg-blue-700 font-bold rounded ${"text-white"}`}
      >
        Sign out
      </button>
    </div>
  );
};
export default Auth;
