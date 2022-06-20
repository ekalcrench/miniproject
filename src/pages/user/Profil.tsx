import NavbarComponent from "../../component/NavbarComponent";
import profil from "../../css/Profil.module.css";

export default function Profil() {
  return (
    <div>
      <NavbarComponent />
      <div className={profil.body}>
        <div className={profil.content}>
          <div className={profil.contentHeader}>INFORMASI AKUN</div>
          <div className={profil.contentBody}>
            <div className={profil.contentLabel}>Email</div>
            <div className={profil.contentInput}>
              <div className={profil.colon}>:</div>{" "}
              <input className={profil.input} type="text" />
            </div>
          </div>
          <div className={profil.contentBody}>
            <div className={profil.contentLabel}>Username</div>
            <div className={profil.contentInput}>
              <div className={profil.colon}>:</div>{" "}
              <input className={profil.input} type="text" />
            </div>
          </div>
          <div className={profil.contentBody}>
            <div className={profil.contentLabel}>Nama Depan</div>
            <div className={profil.contentInput}>
              <div className={profil.colon}>:</div>{" "}
              <input className={profil.input} type="text" />
            </div>
          </div>
          <div className={profil.contentBody}>
            <div className={profil.contentLabel}>Nama Belakang</div>
            <div className={profil.contentInput}>
              <div className={profil.colon}>:</div>{" "}
              <input className={profil.input} type="text" />
            </div>
          </div>
          <div className={`${profil.contentBody} ${profil.contentLast}`}>
            <div className={profil.contentLabel}>Jenis Kelamin</div>
            <div className={profil.contentInput}>
              <div className={profil.colon}>:</div>{" "}
              <input className={profil.input} type="text" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
