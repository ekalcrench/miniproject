import { ErrorMessage } from "@hookform/error-message";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import NavbarComponent from "../../component/NavbarComponent";
import daftar from "../../css/Daftar.module.css";
import { API_URL } from "../../utils/api";
import { IMAGES_PATH } from "../../utils/images";

type Data = {
  email: string;
  verifikasi: string;
  sandi: string;
  nama: string;
  lahir: string;
  kelamin: string;
};

export default function Daftar() {
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
      <div className={daftar.body}>
        <div className={daftar.form}>
          <div className={daftar.formHeader}>
            <div className={daftar.judul}>DAFTAR</div>
            <div className={daftar.keterangan}>
              Sudah punya akun?{" "}
              <Link to="/login" className={daftar.link}>
                Masuk
              </Link>
            </div>
          </div>
          <div className={daftar.formBody}>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* No Handphone atau Email */}
              <div className={daftar.formInput}>
                <div className={daftar.label}>No Handphone atau Email</div>
                <input
                  className={daftar.input}
                  type="email"
                  placeholder="email@fashionbox.com"
                  {...register("email", { required: "This is required" })}
                />
                <ErrorMessage
                  className={daftar.errorMessage}
                  errors={errors}
                  name="email"
                  as="p"
                />
              </div>
              {/* Kode Verifikasi */}
              <div className={daftar.formInput}>
                <div className={daftar.label}>Kode Verifikasi</div>
                <input
                  className={daftar.input}
                  type="text"
                  placeholder="Masukan Kode Verifikasi"
                  {...register("verifikasi", { required: "This is required" })}
                />
                <ErrorMessage
                  className={daftar.errorMessage}
                  errors={errors}
                  name="verifikasi"
                  as="p"
                />
              </div>
              {/* Kata Sandi */}
              <div className={daftar.formInput}>
                <div className={daftar.label}>Kata Sandi</div>
                <input
                  className={daftar.input}
                  type="password"
                  placeholder="Masukan Kata Sandi"
                  {...register("sandi", { required: "This is required" })}
                />
                <ErrorMessage
                  className={daftar.errorMessage}
                  errors={errors}
                  name="sandi"
                  as="p"
                />
              </div>
              {/* Nama Lengkap */}
              <div className={daftar.formInput}>
                <div className={daftar.label}>Nama Lengkap</div>
                <input
                  className={daftar.input}
                  type="text"
                  placeholder="Masukan Nama Lengkap"
                  {...register("nama", { required: "This is required" })}
                />
                <ErrorMessage
                  className={daftar.errorMessage}
                  errors={errors}
                  name="nama"
                  as="p"
                />
              </div>
              {/* Tanggal Lahir */}
              <div className={daftar.formInput}>
                <div className={daftar.label}>Tanggal Lahir</div>
                <input
                  className={daftar.input}
                  type="text"
                  placeholder="Masukan Tanggal Lahir"
                  {...register("lahir", { required: "This is required" })}
                />
                <ErrorMessage
                  className={daftar.errorMessage}
                  errors={errors}
                  name="lahir"
                  as="p"
                />
              </div>
              {/* Jenis Kelamin */}
              <div className={daftar.formInput}>
                <div className={daftar.label}>Jenis Kelamin</div>
                <input
                  className={daftar.input}
                  type="text"
                  placeholder="Masukan Jenis Kelamin"
                  {...register("kelamin", { required: "This is required" })}
                />
                <ErrorMessage
                  className={daftar.errorMessage}
                  errors={errors}
                  name="kelamin"
                  as="p"
                />
              </div>
              {/* atau daftar dengan */}
              <div
                className={`${daftar.keterangan} ${daftar.textAlignCenter} ${daftar.atauDaftarDenganMargin}`}
              >
                atau daftar dengan
              </div>
              {/* Microsoft Login */}
              <div>
                <button
                  className={`${daftar.input} ${daftar.button} ${daftar.microsoft}`}
                >
                  <img
                    className={daftar.imgMicrosoft}
                    src={IMAGES_PATH + "microsoft.png"}
                    alt="microsoft.png"
                  ></img>
                  <div>Microsoft</div>
                </button>
              </div>
              {/* Button Simpan */}
              <div>
                <button
                  type="submit"
                  className={`${daftar.input} ${daftar.button} ${daftar.simpan}`}
                >
                  SIMPAN
                </button>
              </div>
              {/* Syarat dan Ketentuan */}
              <div
                className={`${daftar.keterangan} ${daftar.textAlignCenter} ${daftar.syaratDanKetentuanMargin}`}
              >
                Dengan mendaftar, saya menyetujui
                <br />
                <Link to="/syaratdanketentuan" className={daftar.link}>
                  Syarat dan Ketentuan
                </Link>{" "}
                serta{" "}
                <Link to="/kebijakanprivasi" className={daftar.link}>
                  Kebijakan Privasi
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
