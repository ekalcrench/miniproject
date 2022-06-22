import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ErrorMessage } from "@hookform/error-message";
import axios from "axios";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import NavbarComponent from "../../component/NavbarComponent";
import login from "../../css/Login.module.css";
import { setLogin } from "../../features/userSlice";
import { API_SERVER } from "../../utils/api";
import { IMAGES_PATH } from "../../utils/images";

type Data = {
  username: string;
  password: string;
};

export default function Login() {
  const [passwordStatus, setPasswordStatus] = useState<boolean>(false);

  // Redux
  const dispatch = useAppDispatch();

  // React hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Data>();

  const onSubmit: SubmitHandler<Data> = (data) => {
    console.log("Data : ", data);
    axios
      .post(API_SERVER + "Auth/login", data)
      .then((res) => {
        dispatch(setLogin(res.data));
        console.log("Login RES : ", res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <NavbarComponent />
      <div className={login.body}>
        <div className={login.form}>
          <div className={login.formHeader}>
            <div className={login.formHeaderJudul}>LOGIN</div>
            <div className={login.formHeaderKeterangan}>
              Belum punya akun? Hubungi
              <br />
              <Link to="/login" className={login.link}>
                Customer Service
              </Link>
            </div>
          </div>
          <div className={login.formBody}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className={login.formBodyForm}
            >
              {/* Username */}
              <div className={login.formInput}>
                <div className={login.label}>Username</div>
                <input
                  className={login.input}
                  type="text"
                  placeholder="Masukan Username"
                  {...register("username", { required: "This is required" })}
                />
                <ErrorMessage
                  className={login.errorMessage}
                  errors={errors}
                  name="username"
                  as="p"
                />
              </div>
              {/* Kata Sandi */}
              <div className={login.formInput}>
                <div className={login.label}>Kata Sandi</div>
                <div className={login.formPassword}>
                  <input
                    className={login.input}
                    type={passwordStatus ? "text" : "password"}
                    placeholder="Masukan Kata Sandi"
                    {...register("password", { required: "This is required" })}
                  />
                  {passwordStatus ? (
                    <FontAwesomeIcon
                      className={`${login.formPasswordIcon} ${login.formPasswordIconAktif}`}
                      onClick={() => setPasswordStatus(!passwordStatus)}
                      icon={faEye}
                    />
                  ) : (
                    <FontAwesomeIcon
                      className={login.formPasswordIcon}
                      onClick={() => setPasswordStatus(!passwordStatus)}
                      icon={faEye}
                    />
                  )}
                </div>
                <ErrorMessage
                  className={login.errorMessage}
                  errors={errors}
                  name="password"
                  as="p"
                />
              </div>
              {/* Button Simpan */}
              <div>
                <button
                  type="submit"
                  className={`${login.input} ${login.button} ${login.login}`}
                >
                  LOGIN
                </button>
              </div>
              {/* atau login dengan */}
              <div
                className={`${login.formHeaderKeterangan} ${login.textAlignCenter} ${login.atauLoginDengan}`}
              >
                atau login dengan
              </div>
              {/* Microsoft Login */}
              <div>
                <button
                  className={`${login.input} ${login.button} ${login.microsoft}`}
                >
                  <img
                    className={login.imgMicrosoft}
                    src={IMAGES_PATH + "microsoft.png"}
                    alt="microsoft.png"
                  ></img>
                  <div>Microsoft</div>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
