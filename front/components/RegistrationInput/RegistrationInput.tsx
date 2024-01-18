// components
import Icon from "../Icon/Icon";

// interfaces
import type { TRegistrationInput } from "@/interfaces/interfaces";

export default function RegistrationInput({
  icon_name,
  type,
  placeholder,
  eye_active,
  error_text,
  registr_new_accout,
  onChange,
  value,
  validity_status,
  onBlur,
  showPassword,
  setShowPassword
}: TRegistrationInput) {
  return (
    <div className="flex flex-col gap-3 justify-center">
      <div
        className={`px-4 py-3 flex gap-3 rounded-lg border-1 shadow items-center ${
          validity_status ? "border-red-500" : ""
        } transition-all duration-200 ease-in`}
      >
        <Icon
          icon_name={icon_name}
          width={20}
          height={20}
          className="text-[#56616b] hover:text-[#009965] transition-all duration-200 ease-in flex items-center"
        />
        <input
          type={type}
          className="flex-1 focus:outline-none "
          placeholder={placeholder}
          onFocus={() => console.log("focus")}
          onChange={onChange}
          value={value}
          onBlur={onBlur}
          autoComplete="true"
        />
        {eye_active && (
          <>
            {showPassword ? (
              <Icon
                className="text-[#56616b] hover:text-[#009965] transition-all duration-200 ease-in flex items-center"
                width={20}
                height={20}
                icon_name="EyeOff"
                onClick={() => {
                  if (setShowPassword) setShowPassword(!showPassword);
                }}
              />
            ) : (
              <Icon
                className="text-[#56616b] hover:text-[#009965] transition-all duration-200 ease-in flex items-center"
                width={20}
                height={20}
                icon_name="Eye"
                onClick={() => {
                  if (setShowPassword) setShowPassword(!showPassword);
                }}
              />
            )}
          </>
        )}
      </div>

      <div className="flex">
        {validity_status && (
          <div className="text-xs text-red-500 font-semibold flex-1">
            {error_text}
          </div>
        )}

        {eye_active && !registr_new_accout && (
          <div className="text-end text-xs text-gray-500 select-none hover:text-indigo-500 transition-all duration-200 ease-in">
            Forgot password?
          </div>
        )}
      </div>
    </div>
  );
}
