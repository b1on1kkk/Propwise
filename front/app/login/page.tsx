"use client";

import { useReducer, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios, { AxiosError } from "axios";

// components
import { Gem } from "lucide-react";
import RegistrationWrapper from "@/components/RegistrationWrapper/RegistrationWrapper";
import RegistrationInput from "@/components/RegistrationInput/RegistrationInput";
//

// utils

import {
  RegistrationUserFormReducer,
  RegistrationUserForm,
  RegistrationUserInitialState
} from "@/utils/RegistrationReducer";
import {
  FormValidityReducer,
  FormValidityInitialState
} from "@/utils/FormValidityReducer";
import { CheckEmptyFields } from "@/utils/CheckEmptyFields";
import { SetValidity } from "@/utils/SetValidity";
//

export default function LogIn() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const [registrationFromState, setRegistrationFrom] = useReducer(
    RegistrationUserFormReducer,
    {
      ...RegistrationUserInitialState
    }
  );
  const [formValidityData, setFormValidityData] = useReducer(
    FormValidityReducer,
    {
      ...FormValidityInitialState
    }
  );

  async function Submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (
      CheckEmptyFields(
        Object.values({
          ...registrationFromState,
          name: "default",
          lastname: "default"
        })
      )
    ) {
      try {
        await axios.post("http://localhost:2000/login", {
          email: registrationFromState.email,
          password: registrationFromState.password
        });

        router.push("/home");
      } catch (error) {
        const AxiosError = error as AxiosError;
        const textError = AxiosError.response?.data as string;
        setError(textError);

        setTimeout(() => {
          setError("");
        }, 2500);
      }
    } else {
      SetValidity(Object.values(registrationFromState), setFormValidityData);
    }
  }

  return (
    <RegistrationWrapper>
      <div className="flex-1">
        <div className="mb-10 flex justify-center">
          <div className="inline-flex bg-[#009965] rounded-full p-4  ">
            <Gem color="white" />
          </div>
        </div>
        <div className="text-center tracking-wide">
          <h1 className="text-5xl uppercase">Welcome back!</h1>
          <div className="mt-5">Please enter your details</div>
        </div>
        <div className="mt-14">
          <form onSubmit={Submit} className="flex flex-col gap-8">
            <div className="flex flex-col gap-8 min-h-[190px]">
              <RegistrationInput
                icon_name="Mail"
                type="email"
                placeholder="Enter email..."
                eye_active={false}
                error_text="Email is not correct"
                registr_new_accout={true}
                value={registrationFromState.email}
                validity_status={formValidityData.emailError}
                onChange={(e) =>
                  setRegistrationFrom({
                    type: RegistrationUserForm.EMAIL,
                    payload: e.target.value
                  })
                }
                onBlur={(e) => {
                  setFormValidityData({
                    payload: {
                      key: "VALIDATE_EMAIL",
                      text: e.target.value
                    }
                  });
                }}
              />

              <RegistrationInput
                icon_name="KeyRound"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password..."
                eye_active={true}
                error_text="Password should have at least 9 symbols"
                registr_new_accout={true}
                value={registrationFromState.password}
                validity_status={formValidityData.passwordError}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                onChange={(e) =>
                  setRegistrationFrom({
                    type: RegistrationUserForm.PASSWORD,
                    payload: e.target.value
                  })
                }
                onBlur={(e) => {
                  setFormValidityData({
                    payload: {
                      key: "VALIDATE_PASSWORD",
                      text: e.target.value
                    }
                  });
                }}
              />
            </div>

            <button className="py-5 rounded-full bg-gray-400 hover:bg-[#009965] transition-all duration-200 ease-in tracking-widest mt-5 font-semibold text-white">
              Log In
            </button>
          </form>
          {error && (
            <div className="mt-3 text-xs font-bold text-red-500">{error}</div>
          )}
        </div>
      </div>
      <div className="text-center text-sm">
        <span className="text-gray-500">Don&apos;t have an account? </span>
        <span className="underline underline-offset-4 hover:text-indigo-500 transition-all duration-200 ease-in">
          <Link href={"/registration"}>Sign Up</Link>
        </span>
      </div>
    </RegistrationWrapper>
  );
}
