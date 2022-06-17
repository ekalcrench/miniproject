import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ErrorMessage } from "@hookform/error-message";
import axios from "axios";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import NavbarComponent from "../../component/NavbarComponent";
import login from "../../css/Login.module.css";
import { API_URL } from "../../utils/api";
import { IMAGES_PATH } from "../../utils/images";

type Data = {
  username: string;
  password: string;
};

export default function Login() {
  const [passwordStatus, setPasswordStatus] = useState<boolean>(false);

  // React hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Data>();

  const onSubmit: SubmitHandler<Data> = (data) => {
    console.log("Data : ", data);
    axios
      .post(API_URL + "users", data)
      .then((res) => {
        // swal({
        //   title: "Sukses",
        //   text: keranjang.product.nama + " Sukses Masuk Keranjang",
        //   icon: "success",
        //   button: false,
        //   timer: 1800,
        // });
        console.log("res : ", res);
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
