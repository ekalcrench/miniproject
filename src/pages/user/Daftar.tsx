import { SetStateAction, useState } from "react";
import { Link } from "react-router-dom";
import NavbarComponent from "../../component/NavbarComponent";
import daftar from "../../css/Daftar.module.css";

export default function Daftar() {
  const [email, setEmail] = useState<string>();

  const handleChange = (event: {
    target: { value: SetStateAction<string | undefined> };
  }) => {
    setEmail(event.target.value);
    console.log("email : ", email);
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    console.log("SUBMIT");
  };

  return (
    <div>
      <NavbarComponent />
      <div className={daftar.body}>
        <div className={daftar.form}>
          <div className={`${daftar.header}`}>
            <div className={`${daftar.judul}`}>DAFTAR</div>
            <div className={`${daftar.login}`}>
              Sudah punya akun?{" "}
              <Link to="/login" className={`${daftar.link}`}>
                Masuk
              </Link>
            </div>
          </div>
          <div className={daftar.input}>
            <form onSubmit={handleSubmit}>
              <input
                placeholder="email@fashionbox.com"
                type="text"
                name="email"
                value={email}
                onChange={(event) => handleChange(event)}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
