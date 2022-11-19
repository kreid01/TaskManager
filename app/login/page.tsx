"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { setAccessToken } from "../utils/accessToken";
import Link from "next/link";
import {
  Button,
  DialogContent,
  DialogActions,
  CircularProgress,
  IconButton,
  InputAdornment,
  OutlinedInput,
  InputLabel,
  FormControl,
  FormHelperText,
} from "@material-ui/core";
import { useRouter } from "next/navigation";
import {
  GetUserDocument,
  GetUserQuery,
  useLoginMutation,
} from "../generated/graphql";

interface Props {
  setLogin: () => void;
  closeCartAndLogin: () => void;
}

export type Login = {
  email: string;
  password: string;
};

export const Login: React.FC<Props> = ({}) => {
  const router = useRouter();
  const [login, loading] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit } = useForm<Login>({
    mode: "onChange",
  });

  const handleClickShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const onSubmit = async (data: Login) => {
    const { email, password } = data;
    const response = await login({
      variables: { email, password },
      update: (store, { data }) => {
        if (!data) {
          return null;
        }
        store.writeQuery<GetUserQuery>({
          query: GetUserDocument,
          data: {
            getUser: data.login.user,
          },
        });
      },
    });

    if (response && response.data) {
      setAccessToken(response.data.login.accessToken);
    }
  };

  return (
    <div className="w-[480px] mx-auto p-6 rounded-md flex-col justify-center">
      <header className="font-bold text-2xl my-3 text-orange-600 text-center">
        Login or create an account
      </header>
      <div className="border-b-[1px] border-gray-300 pb-10 mb-5">
        <h3 className="font-semibold text-gray-600 ml-2">Log in here</h3>
        <p className="ml-2 text-gray-600 text-xs">
          If you have an account with us, please log in.
        </p>
        <form className="-ml-4" onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <FormControl
              style={{ marginBottom: "20px", width: "25ch" }}
              variant="outlined"
            >
              <InputLabel htmlFor="email">Email</InputLabel>
              <OutlinedInput
                {...register("email")}
                style={{ width: "410px", height: "55px" }}
                id="email"
                label="email"
                required
                margin="dense"
                name="email"
                type="text"
              />
              <FormHelperText className="text-red-600"></FormHelperText>
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
                style={{ width: "410px" }}
                id="outlined-adornment-password"
                label="password"
                required
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button
              style={{ width: "410px" }}
              color="primary"
              type="submit"
              variant="contained"
            >
              Login
            </Button>
          </DialogActions>
        </form>
        <button className="ml-36 text-blue-400">Forgot password?</button>
      </div>
      <section className="text-gray-600 text-sm ml-2">
        <h3 className="font-semibold text-gray-600 text-base">New here</h3>
        <p className="my-2">Register here to start hitting your goals</p>
        <ul className="list-disc ml-5 mb-4">
          <li>Track your projects</li>
          <li>Meet deadlines</li>
          <li>Stay organized</li>
        </ul>
        <Button
          style={{ width: "410px" }}
          color="primary"
          type="button"
          variant="contained"
        >
          <Link href="/register">Create an account</Link>
        </Button>
      </section>
    </div>
  );
};

export default Login;
