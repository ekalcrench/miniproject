import { ErrorMessage } from "@hookform/error-message";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppSelector } from "../../app/hooks";
import NavbarComponent from "../../component/NavbarComponent";
import profil from "../../css/Profil.module.css";

type Data = {
  email: string;
  userName: string;
  firstName: string;
  lastName: string;
  gender: string;
};

export default function Profil() {
  const userData = useAppSelector((state) => state.user.data);
  
  // React hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Data>({
    defaultValues: {
      email: userData.email,
      userName: userData.userName,
      firstName: userData.firstName,
      lastName: userData.lastName
    },
  });

  const onSubmit: SubmitHandler<Data> = (data) => {
    console.log("Data : ", data);
  };

  return (
    <div>
      <NavbarComponent />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={profil.body}>
          <div className={profil.content}>
            <div className={profil.contentHeader}>INFORMASI AKUN</div>
            <div>
              <ErrorMessage
                className={profil.errorMessage}
                errors={errors}
                name="email"
                as="p"
              />
              <ErrorMessage
                className={profil.errorMessage}
                errors={errors}
                name="userName"
                as="p"
              />
              <ErrorMessage
                className={profil.errorMessage}
                errors={errors}
                name="firstName"
                as="p"
              />
              <ErrorMessage
                className={profil.errorMessage}
                errors={errors}
                name="lastName"
                as="p"
              />
            </div>

            <div className={profil.contentBody}>
              <div className={profil.contentLabel}>Email</div>
              <div className={profil.contentInput}>
                <div className={profil.colon}>:</div>{" "}
                <input
                  className={profil.input}
                  type="text"
                  {...register("email", { required: "Email is Required" })}
                />
              </div>
            </div>
            <div className={profil.contentBody}>
              <div className={profil.contentLabel}>Username</div>
              <div className={profil.contentInput}>
                <div className={profil.colon}>:</div>{" "}
                <input
                  className={profil.input}
                  type="text"
                  {...register("userName", {
                    required: "Username is required",
                  })}
                />
              </div>
            </div>
            <div className={profil.contentBody}>
              <div className={profil.contentLabel}>Nama Depan</div>
              <div className={profil.contentInput}>
                <div className={profil.colon}>:</div>{" "}
                <input
                  className={profil.input}
                  type="text"
                  {...register("firstName", { required: "Nama Depan is required" })}
                />
              </div>
            </div>
            <div className={`${profil.contentBody} ${profil.contentLast}`}>
              <div className={profil.contentLabel}>Nama Belakang</div>
              <div className={profil.contentInput}>
                <div className={profil.colon}>:</div>{" "}
                <input
                  className={profil.input}
                  type="text"
                  {...register("lastName", { required: "Nama Belakang is required" })}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={profil.aksiButton}>
          <button className={`${profil.button} ${profil.buttonBatal}`}>
            BATAL
          </button>
          <button
            type="submit"
            className={`${profil.button} ${profil.buttonSimpan}`}
          >
            SIMPAN
          </button>
        </div>
      </form>
    </div>
  );
}
