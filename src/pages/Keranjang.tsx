import axios from "axios";
import { useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
import { KeranjangComponent } from "../component/KeranjangComponent";
import NavbarComponent from "../component/NavbarComponent";
import keranjang from "../css/Keranjang.module.css";
import { API_URL } from "../utils/api";

export default function Keranjang() {
  const [keranjangs, setKeranjangs] = useState<any>();

  // ComponentDidMount
  useLayoutEffect(() => {
    axios
      .get(API_URL + "baskets")
      .then((res) => {
        setKeranjangs(res.data);
        console.log("res data : ", res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <NavbarComponent />
      <div className={keranjang.body}>
        {keranjangs && keranjangs.length > 0 ? (
          <div>
            <div className={keranjang.background}>
              <div className={keranjang.header}>
                <div>ceklist</div>
                <div>Produk</div>
                <div>Harga Satuan</div>
                <div>Kuantitas</div>
                <div>Total Harga</div>
                <div>Aksi</div>
              </div>
            </div>
            {keranjangs.map((data: any) => {
              return <KeranjangComponent data={data} />;
            })}
          </div>
        ) : (
          <div>
            <div className={keranjang.background}>
              <div className={keranjang.header}>KERANJANGMU KOSONG</div>
            </div>
            <div className={keranjang.background}>
              <div className={keranjang.content}>
                <Link to="/">
                  <button className={keranjang.lanjutBelanja}>
                    LANJUT BELANJA
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
