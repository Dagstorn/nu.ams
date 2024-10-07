import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginUserMutation } from "@/config/api/apiSlice";
import styles from "./Auth.module.css";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import { login } from "@/config/store/slices/authSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";

interface ErrorResponse {
  message: string;
}

interface BaseQueryError {
  status: number | string;
  data: ErrorResponse;
}

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password can't be empty"),
});

type FormData = z.infer<typeof schema>;

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [loginUser, { isLoading, error }] = useLoginUserMutation();
  const [customError, setCustomError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    try {
      const result = await loginUser(data).unwrap();
      if (result.token && result.userRole) {
        const decodedToken = jwtDecode(result.token);
        const username = decodedToken?.sub;

        if (username === undefined) {
          setCustomError("Something went wrong! Try again");
          return;
        }

        dispatch(
          login({
            username: username,
            token: result.token,
            role: result.userRole,
          })
        );

        if (result.userRole === "ADMIN") {
          navigate("/admin/dashboard");
        } else if (result.userRole === "MANAGER") {
          navigate("/manager/dashboard");
        } else if (result.userRole === "ALUMNI") {
          navigate("/alumni/profile");
        } else {
          navigate("/");
        }
      } else {
        setCustomError("Something went wrong! Try again");
        return;
      }
    } catch (err) {
      console.error("Failed to register:", err);
    }
  };

  return (
    <div className={styles.container}>
      <form
        className="mt-8 mb-8 w-5/6 sm:w-3/4 md:w-1/2 lg:w-1/2 xl:w-1/2 2xl:w-1/3 border rounded-md py-6 px-6 shadow-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex justify-center">
          <h2>Sign in</h2>
        </div>

        <Separator className="my-4" />

        <div className={styles.formContainer}>
          <div>
            <label>Email</label>
            <input className="form-input" {...register("email")} />
            {errors.email && (
              <p className={styles.fieldError}>{errors.email.message}</p>
            )}
          </div>
          <div>
            <label>Password</label>
            <input
              className="form-input"
              type="password"
              {...register("password")}
            />
            {errors.password && (
              <p className={styles.fieldError}>{errors.password.message}</p>
            )}
          </div>

          {error && (
            <p className={styles.fieldError}>
              Error:{" "}
              {"data" in error
                ? (error as BaseQueryError).data?.message
                : "An unknown error occurred"}
            </p>
          )}

          {customError.length > 0 && (
            <p className={styles.fieldError}>Error: {customError}</p>
          )}

          <Button disabled={isLoading} className="font-semibold text-base">
            {isLoading ? "Loading..." : "Sign in"}
          </Button>
          <div className="flex justify-center w-full text-center">
            <p>
              Don't have an account?
              <Link
                to="/register"
                className="ml-1 text-blue-600 underline hover:text-blue-800"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
