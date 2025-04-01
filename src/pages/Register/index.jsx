import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { object, ref, string } from "yup";
import Button from "../../components/Button";
import config from "../../config";
import * as authService from "../../services/authService";
import httpRequest from "../../utils/httpRequest";

let timer;
const userSchema = object({
  fullName: string().min(1).required("Không được bỏ trống"),
  password: string().min(8).required("Không được bỏ trống"),
  password_confirmation: string()
    .min(8)
    .required("Không được bỏ trống")
    .oneOf([ref("password")], "Phải khớp với mật khẩu"),
  email: string()
    .required("Không được bỏ trống")
    .email("Phải là định dạng email"),
});

function Register() {
  const navigate = useNavigate();

  const {
    setError,
    register,
    watch,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: "",
      password: "",
      password_confirmation: "",
      email: "",
    },
    resolver: yupResolver(userSchema),
  });

  const [loading, setLoading] = useState(false);

  async function onSubmit(data) {
    const splittedName = data.fullName.trim().split(" ");
    data.firstName =
      splittedName.length == 1
        ? splittedName[0]
        : splittedName.slice(0, -1).join(" ").trim();
    data.lastName = splittedName.at(-1).trim();
    setLoading(true);
    try {
      const response = await authService.register(data);
      httpRequest.setToken(response.access_token);
      navigate(config.routes.home);
    } catch (err) {
      console.log(err.message);
      console.log(err);
      if (err.status !== 401) {
        setError("password_confirmation", {
          type: "manual",
          message: "Lỗi hệ thống, vui lòng liên hệ myemail@gmail.com",
        });
      }
    } finally {
      setLoading(false);
    }
  }

  const emailValue = watch("email");

  useEffect(() => {
    if (!emailValue) return;
    clearTimeout(timer);
    timer = setTimeout(async () => {
      const validEmail = await trigger("email");
      if (validEmail) {
        try {
          const response = await authService.checkEmail(emailValue);
          if (response.exists) {
            setError("email", {
              type: "manual",
              message: "Email đã được sử dụng",
            });
          }
        } catch (error) {
          console.log(error);
        }
      }
    }, 800);
  }, [emailValue, trigger, setError]);

  return (
    <div>
      <h1>Register</h1>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="Họ và Tên" {...register("fullName")} />
        {errors.fullName && <span>{errors.fullName.message}</span>}
        <br />
        <input type="email" placeholder="Email" {...register("email")} />
        {errors.email && <span>{errors.email.message}</span>}
        <br />
        <input
          placeholder="Password"
          type="password"
          {...register("password")}
        />
        {errors.password && <span>{errors.password.message}</span>}
        <br />
        <input
          placeholder="Confirm Password"
          type="password"
          {...register("password_confirmation")}
        />
        {errors.password_confirmation && (
          <span>{errors.password_confirmation.message}</span>
        )}
        <br />
        <Button rounded primary size="small" type="submit" loading={loading}>
          Register
        </Button>
        <Button to="/login" primary size="small">
          Login
        </Button>
      </form>
    </div>
  );
}

export default Register;
