import axios from "axios";
import { useEffect, useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavbarComponent from "../../component/NavbarComponent";
import { TransaksiComponent } from "../../component/TransaksiComponent";
import { TransaksiJudul } from "../../component/TransaksiJudul";
import transaksi from "../../css/Transaksi.module.css";
import { API_URL } from "../../utils/api";

export default function Transaksi() {
  const [transaksis, setTransaksis] = useState<any | null>(null);
  const [status, setStatus] = useState<number>(0);

  let judul = <TransaksiJudul status={status} setStatus={setStatus} />;

  // ComponentDidMount
  useLayoutEffect(() => {
    getTransaksi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getTransaksi = () => {
    axios
      .get(API_URL + "transactions")
      .then((res) => {
        setTransaksis(res.data);
        console.log("setTransaksis : ", res.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    console.log("status : ", status);
  });

  return (
    <div>
      <NavbarComponent />
      <div className={transaksi.body}>
        {transaksis?.length > 0 ? (
          <div>
            {judul}
            {/* Product */}
            {/* eslint-disable-next-line array-callback-return */}
            {transaksis.map((data: any, index:number) => {
              if (status === data.status) {
                return <TransaksiComponent key={index} data={data} />;
              } else if (status === 0) {
                return <TransaksiComponent key={index} data={data} />;
              }
            })}
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className={transaksi.background}>
              <div className={transaksi.headerKosong}>
                BELUM ADA RIWAYAT TRANSAKSI
              </div>
            </div>
            <div className={transaksi.background}>
              <div
                className={`${transaksi.content} ${transaksi.contentKosong}`}
              >
                <Link to="/">
                  <button className={transaksi.lanjutBelanja}>
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
