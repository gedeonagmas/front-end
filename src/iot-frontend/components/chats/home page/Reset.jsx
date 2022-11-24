import React, { useState } from "react";
import Login from "./Login";

const Reset = () => {
  const [login, setLogin] = useState(false);
  const [reset, setReset] = useState(true);
  const [verify, setVerify] = useState(false);
  const [newPassword, setNewPassword] = useState(false);
  const [verificationNumber, setVerificationNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPasswordValue, setNewPasswordValue] = useState("");

  const resetHandler = () => {};
  return (
    <div>
      {reset && (
        <div className="flex flex-col gap-y-1 -mt-32 bg-white h-80 w-72 items-center rounded-md shadow-lg shadow-black px-4">
          <p className="font-bold mt-16 text-gray-400">enter your email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="email"
            className="w-64 mt-4 h-8 text-xs rounded-sm pl-1 focus:outline-none bg-gray-100 border border-gray-300"
          />

          <button
            onClick={() => {
              resetHandler();
              setVerify(true);
              setReset(false);
            }}
            type="text"
            className="w-64 mt-4 h-8 text-sm rounded-sm pl-1 focus:outline-none text-white bg-emerald-500 border border-gray-300"
          >
            Reset
          </button>
        </div>
      )}
      {verify && (
        <div className="flex flex-col gap-y-1 -mt-32 bg-white h-80 w-72 items-center rounded-md shadow-lg shadow-black px-4">
          <p className="mt-10 text-gray-500 text-xs">
            please cheack your email account and insert the verification number
            that we have been sent in your email
          </p>
          <input
            onChange={(e) => setVerificationNumber(e.target.value)}
            type="text"
            placeholder="verification number"
            className="w-64 mt-4 h-8 text-xs rounded-sm pl-1 focus:outline-none bg-gray-100 border border-gray-300"
          />
          <button
            onClick={() => {
              setNewPassword(true);
              setVerify(false);
              setReset(false);
              setVerify(false);
            }}
            type="text"
            className="w-64 mt-4 h-8 text-sm rounded-sm pl-1 focus:outline-none text-white bg-emerald-500 border border-gray-300"
          >
            Verify
          </button>
        </div>
      )}
      {newPassword && (
        <div className="flex flex-col gap-y-1 -mt-32 bg-white h-80 w-72 items-center rounded-md shadow-lg shadow-black px-4">
          <p className="font-bold mt-20 text-gray-400">enter new password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="text"
            placeholder="new password"
            className="w-64 mt-1 h-8 text-xs rounded-sm pl-1 focus:outline-none bg-gray-100 border border-gray-300"
          />
          <button
            onClick={() => {
              setLogin(true);
              setReset(false);
              setVerify(false);
              setNewPassword(false);
            }}
            type="text"
            className="w-64 mt-4 h-8 text-sm rounded-sm pl-1 focus:outline-none text-white bg-emerald-500 border border-gray-300"
          >
            Done
          </button>
        </div>
      )}
      {login && <Login />}
    </div>
  );
};

export default Reset;
