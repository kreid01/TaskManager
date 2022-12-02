"use client";
/* eslint-disable react/jsx-wrap-multilines */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import {
  Button,
  DialogContent,
  DialogActions,
  IconButton,
  InputAdornment,
  OutlinedInput,
  InputLabel,
  FormControl,
  FormHelperText,
} from "@material-ui/core";
import { useRegisterMutation } from "../generated/graphql";
import { Header } from "../components/UI/Header";
import { useRouter } from "next/navigation";

export default function RegistrationForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [registerUser] = useRegisterMutation();
  const registerSchema = object({
    firstName: string()
      .min(1, "Name is required")
      .max(32, "Name must be less than 100 characters"),
    lastName: string()
      .min(1, "Name is required")
      .max(32, "Name must be less than 100 characters"),
    email: string().min(1, "Email is required").email("Email is invalid"),
    username: string().min(1, "Username is required"),
    password: string()
      .min(1, "Password is required")
      .min(8, "Password must be more than 8 characters")
      .max(32, "Password must be less than 32 characters"),
    passwordConfirm: string().min(1, "Please confirm your password"),
  }).refine((data: any) => data.password === data.passwordConfirm, {
    path: ["passwordConfirm"],
    message: "Passwords do not match",
  });
  type RegisterInput = TypeOf<typeof registerSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  const router = useRouter();
  const onSubmit = async (data: RegisterInput) => {
    const { email, password, firstName, lastName, username } = data;
    const response = await registerUser({
      variables: {
        email,
        password,
        firstName,
        lastName,
        username,
      },
    });
    if (response) {
      router.push("/login");
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <>
      <div className=" h-[100vh]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="pt-[5vh] h-full m-auto w-[520px] border-x-2 border-orange-500 px-10"
        >
          <div className="text-orange-500 text-lg font-bold  px-5">
            Create an account and start meeting your deadlines!
          </div>
          <DialogContent>
            <FormControl
              style={{ margin: "20px 0", width: "25ch" }}
              variant="outlined"
            >
              <InputLabel htmlFor="outlined-adornment-password">
                First Name
              </InputLabel>
              <OutlinedInput
                {...register("firstName")}
                style={{ width: "380px", height: "55px" }}
                id="firstName"
                label="First Name"
                margin="dense"
                name="firstName"
                type="text"
                error={!!errors.firstName?.message}
              />
              <FormHelperText className="text-red-600">
                {errors.firstName ? errors.firstName.message : ""}
              </FormHelperText>
            </FormControl>
            <FormControl
              style={{ margin: "20px 0", width: "25ch" }}
              variant="outlined"
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Second Name
              </InputLabel>
              <OutlinedInput
                {...register("lastName")}
                style={{ width: "380px", height: "55px" }}
                id="lastName"
                label="Last Name"
                margin="dense"
                name="lastName"
                type="text"
                error={!!errors.lastName?.message}
              />
              <FormHelperText className="text-red-600">
                {errors.lastName ? errors.lastName.message : ""}
              </FormHelperText>{" "}
            </FormControl>
            <FormControl
              style={{ margin: "20px 0", width: "25ch" }}
              variant="outlined"
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Username
              </InputLabel>
              <OutlinedInput
                {...register("username")}
                style={{ width: "380px", height: "55px" }}
                id="username"
                label="Username"
                margin="dense"
                name="username"
                type="text"
                error={!!errors.username?.message}
              />
              <FormHelperText className="text-red-600">
                {errors.lastName ? errors.lastName.message : ""}
              </FormHelperText>{" "}
            </FormControl>
            <FormControl
              style={{ margin: "20px 0", width: "25ch" }}
              variant="outlined"
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Email Adress
              </InputLabel>
              <OutlinedInput
                {...register("email")}
                style={{ width: "380px", height: "55px" }}
                id="email"
                label="Email Address"
                margin="dense"
                name="email"
                error={!!errors.email}
                type="text"
              />
              <FormHelperText className="text-red-600">
                {errors.email ? errors.email.message : ""}
              </FormHelperText>
            </FormControl>
            <FormControl
              style={{ margin: "20px 0", width: "25ch" }}
              variant="outlined"
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                {...register("password")}
                style={{ width: "380px" }}
                id="outlined-adornment-password"
                label="password"
                type={showPassword ? "text" : "password"}
                error={!!errors.password}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? (
                        <FontAwesomeIcon icon={faEyeSlash} />
                      ) : (
                        <FontAwesomeIcon icon={faEye} />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText className="text-red-600">
                {errors.password ? errors.password.message : ""}
              </FormHelperText>{" "}
            </FormControl>
            <FormControl
              style={{ margin: "20px 0", width: "25ch" }}
              variant="outlined"
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                style={{ width: "380px" }}
                {...register("passwordConfirm")}
                error={!!errors.passwordConfirm}
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? (
                        <FontAwesomeIcon icon={faEyeSlash} />
                      ) : (
                        <FontAwesomeIcon icon={faEye} />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                label="password"
              />
              <FormHelperText className="text-red-600">
                {errors.passwordConfirm ? errors.passwordConfirm.message : ""}
              </FormHelperText>{" "}
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button
              color="primary"
              style={{ marginRight: "20px" }}
              type="submit"
              variant="contained"
            >
              Register
            </Button>
          </DialogActions>
        </form>
      </div>
    </>
  );
}
