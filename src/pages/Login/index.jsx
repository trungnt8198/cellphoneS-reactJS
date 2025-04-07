import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import httpRequest from "../../utils/httpRequest";
import config from "../../config";
import Button from "../../components/Button";
import { object, string } from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { getCurrentUser, login } from "../../services/authService";
import { useUser } from "../../hooks/useUser";

function Login() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { setUser } = useUser();

  const userSchema = object({
    password: string().min(8).required("Không được bỏ trống"),
    email: string()
      .required("Không được bỏ trống")
      .email("Phải là định dạng email"),
  });

  const {
    setError,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: "",
      email: "",
    },
    resolver: yupResolver(userSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      let response = await login(data);
      httpRequest.setToken(response.data.access_token);
      response = await getCurrentUser();
      setUser(response.data);
      navigate(params.get("continue") || config.routes.home);
    } catch (err) {
      if (err.status === 401) {
        setError("password", {
          type: "manual",
          message: "Email hoặc mật khẩu không đúng",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <input type="email" placeholder="Email" {...register("email")} />
        <span>{errors.email && errors.email?.message}</span>
        <br />
        <input
          placeholder="Password"
          type="password"
          {...register("password")}
        />
        <span>{errors.password && errors.password?.message}</span>
        <div>
          <Button type="submit" rounded size="very-small" loading={loading}>
            Login
          </Button>
          <Button to="/register" rounded size="very-small">
            Register
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Login;
