import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { object, string } from "yup";
import Button from "../../components/Button";
import Loading from "../../components/Loading";
import useDebounce from "../../hooks/Debounce";
import { useUser } from "../../hooks/useUser";
import {
  checkEmail,
  checkPhone,
  checkUsername,
} from "../../services/authService";
import { getUser, updateUser } from "../../services/userService";
import style from "./UserProfile.module.scss";
import useCheckExisted from "../../hooks/CheckExisted";

const phoneRegex = /^(|0|\+84)(3[2-9]|5[2689]|7[0-9]|8[1-9]|9[0-9])[0-9]{7}$/;

const userSchema = object({
  username: string().required("Không được bỏ trống"),
  firstName: string().required("Không được bỏ trống"),
  lastName: string().required("Không được bỏ trống"),
  email: string()
    .email("Phải đúng định dạng email")
    .required("Không được bỏ trống"),
  gender: string()
    .notRequired()
    .nullable()
    .oneOf(["male", "female", "other", ""]),
  phone: string()
    .transform((value) => (value === "" ? null : value))
    .matches(phoneRegex, "Phải đúng định dạng số điện thoại")
    .notRequired()
    .nullable(),
});

function UserProfile() {
  const { username } = useParams();
  const { user, setUser } = useUser();
  const [editable, setEditable] = useState(false);
  const [editing, setEditing] = useState(false);
  const [searchedUser, setSearchedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await getUser(username);
        setSearchedUser(response.data);
      } catch (error) {
        toast.error(error.message);
        setSearchedUser(null);
      } finally {
        setLoading(false);
      }
    };

    if (user?.username == username) {
      setSearchedUser(user);
      setEditable(true);
    } else {
      fetchUser();
    }
  }, [user, username]);

  const {
    register,
    handleSubmit,
    clearErrors,
    reset,
    watch,
    trigger,
    setError,
    formState: { errors, isDirty, dirtyFields, isValidating },
  } = useForm({
    resolver: yupResolver(userSchema),
    mode: "onChange",
    values: {
      username: searchedUser?.username || "",
      firstName: searchedUser?.firstName || "",
      lastName: searchedUser?.lastName || "",
      gender: searchedUser?.gender || "",
      email: searchedUser?.email || "",
      phone: searchedUser?.phone || "",
      birthDate: searchedUser?.birthDate || "",
    },
  });

  const emailValue = watch("email");
  const phoneValue = watch("phone");
  const usernameValue = watch("username");

  const debouncedEmail = useDebounce(emailValue, 600);
  const debouncedPhone = useDebounce(phoneValue, 600);
  const debouncedUsername = useDebounce(usernameValue, 600);

  const checkExisted = useCheckExisted(trigger, setError, user);

  useEffect(() => {
    if (dirtyFields.email && debouncedEmail) {
      checkExisted(
        "email",
        debouncedEmail,
        checkEmail,
        "Email này đã được sử dụng !"
      );
    }

    if (dirtyFields.username && debouncedUsername) {
      checkExisted(
        "username",
        debouncedUsername,
        checkUsername,
        "Username này đã được sử dụng !"
      );
    }

    if (dirtyFields.phone && debouncedPhone) {
      checkExisted(
        "phone",
        debouncedPhone,
        checkPhone,
        "Số điện thoại này đã được sử dụng !"
      );
    }
  }, [
    debouncedEmail,
    debouncedPhone,
    debouncedUsername,
    setError,
    trigger,
    user,
    dirtyFields,
    checkExisted,
  ]);

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const onSubmit = async (data) => {
    const formData = new FormData();

    if (avatar instanceof File) {
      formData.append("image", avatar);
    }

    Object.keys(data).forEach((key) => {
      data[key] && formData.append(key, data[key]);
    });

    setUpdateLoading(true);
    try {
      const response = await updateUser(user?.username, formData);
      setEditing(false);
      setUser(response.data);
      toast.success("Cập nhật thông tin thành công!", {
        position: "top-right",
        autoClose: 1500,
      });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleSelectImage = (e) => {
    const image = e.target.files[0];
    if (image?.size > 5 * 1024 * 104) {
      setError("image", {
        type: "manual",
        message: "Ảnh không vượt quá 5MB",
      });
      return;
    }
    if (!["image/jpeg", "image/jpg", "image/png"].includes(image?.type)) {
      setError("image", {
        type: "manual",
        message: "Ảnh phải có dạng: jpeg, jpg, png",
      });
      return;
    }
    clearErrors("image");
    setAvatar(image);
    setPreview(URL.createObjectURL(image));
  };

  if (loading) {
    return <Loading />;
  }

  if (!searchedUser) {
    return <h1>Không tìm thấy người dùng</h1>;
  }

  const hasError = Object.keys(errors).length > 0;
  const dirty = Object.keys(dirtyFields).length > 0;
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (hasError || dirty) return;
    const handle = handleSubmit(onSubmit);
    return handle(e);
  };

  return (
    <div className={style.wrapper}>
      <ToastContainer />
      <h1>Thông tin Tài Khoản</h1>
      <br />
      <p>
        {searchedUser?.emailVerifiedAt
          ? "Tài Khoản Đã Xác Thực"
          : "Tài khoản Chưa Xác Thực"}
      </p>
      <form className={style.formWrapper} onSubmit={handleFormSubmit}>
        <fieldset className={style.fieldsWrapper} disabled={!editing}>
          <label>
            <p>Ảnh đại diện</p>
            {searchedUser?.image || editing ? (
              <>
                <div className={style.avatarWrapper}>
                  <img
                    src={preview || searchedUser?.image}
                    alt="Ảnh đại diện"
                    className={style.avatarPreview}
                  />
                </div>
                {editing && <input type="file" onChange={handleSelectImage} />}
              </>
            ) : (
              <p className={style.error}>Chưa cập nhật</p>
            )}
            {errors.image?.message && (
              <p className={style.error}>{errors.image.message}</p>
            )}
          </label>
          <label>
            <p>Tên tài khoản</p>
            <input type="text" {...register("username")} />
            <p className={style.error}>{errors.username?.message}</p>
          </label>
          <label>
            <p>Họ</p>
            <input type="text" {...register("lastName")} />
            <p className={style.error}>{errors.lastName?.message}</p>
          </label>
          <label>
            <p>Tên</p>
            <input type="text" {...register("firstName")} />
            <p className={style.error}>{errors.firstName?.message}</p>
          </label>
          <label>
            <p>Giới Tính</p>
            {searchedUser?.gender || editing ? (
              <select {...register("gender")}>
                <option value="male">Nam</option>
                <option value="female">Nữ</option>
              </select>
            ) : (
              <p className={style.error}>Chưa cập nhật</p>
            )}
          </label>
          <label>
            <p>Email</p>
            <input type="text" {...register("email")} />
            <p className={style.error}>{errors.email?.message}</p>
          </label>
          <label>
            <p>Số Điện Thoại</p>
            {searchedUser?.phone || editing ? (
              <>
                <input type="text" {...register("phone")} />
                <p className={style.error}>{errors.phone?.message}</p>
              </>
            ) : (
              <p className={style.error}>Chưa cập nhật</p>
            )}
          </label>
          <label>
            <p>Ngày sinh</p>
            {searchedUser?.birthDate || editing ? (
              <>
                <input type="date" {...register("birthDate")} />
                <p className={style.error}>{errors.birthDate?.message}</p>
              </>
            ) : (
              <p className={style.error}>Chưa cập nhật</p>
            )}
          </label>
          <label>
            <p>Ngày tạo tài khoản</p>
            <p>{new Date(user?.createdAt).toLocaleDateString("en-GB")}</p>
          </label>
        </fieldset>

        {editable && (
          <Button
            type="button"
            onClick={() => {
              clearErrors();
              reset();
              setEditing(!editing);
            }}
          >
            {editing ? "Hủy" : "Chỉnh sửa"}
          </Button>
        )}

        {editing && (
          <Button
            type="submit"
            loading={updateLoading}
            disabled={!isDirty || hasError || isValidating}
          >
            Lưu thông tin
          </Button>
        )}
      </form>
    </div>
  );
}

export default UserProfile;
