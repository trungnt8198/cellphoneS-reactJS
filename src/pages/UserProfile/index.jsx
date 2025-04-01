import { useParams } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import { useEffect, useState } from "react";
import { object, string } from "yup";

function UserProfile() {
  // const [editable, setEditable] = useState(false);
  // const userSchema = object({
  //   firstName: string().required("Không được bỏ trống"),
  //   lastName: string().required("Không được bỏ trống"),
  // });

  // const { username } = useParams();
  // const { user } = useUser();

  // useEffect(() => {}, [username]);

  return (
    <>
      <h1>Thông tin Tài Khoản</h1>
      <form action="">
        <input type="text" />
      </form>
    </>
  );
}

export default UserProfile;
