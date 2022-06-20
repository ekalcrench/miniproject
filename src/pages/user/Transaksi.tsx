import axios from "axios";
import { useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { KeranjangComponent } from "../../component/KeranjangComponent";
import NavbarComponent from "../../component/NavbarComponent";
import { TransaksiJudul } from "../../component/TransaksiJudul";
import transaksi from "../../css/Transaksi.module.css";
import { API_URL } from "../../utils/api";

export default function Transaksi() {
  const [transaksis, setTransaksis] = useState<any | null>(null);
  const [status, setStatus] = useState<number>(0);

  let judul = <TransaksiJudul status={status} setStatus={setStatus}/>

  // ComponentDidMount
  useLayoutEffect(() => {
    getTransaksi();
    console.log("transaksis :", transaksis);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getTransaksi = async () => {
    await axios
      .get(API_URL + "baskets")
      .then((res) => {
        setTransaksis(res.data);
        console.log("setTransaksis : ", res.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (id: number) => {
    Swal.fire({
      title: "Apakah Anda Yakin?",
      text: "Apakah Anda ingin menghapus produk dari transaksi?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "black",
      cancelButtonColor: "#CE0505",
      confirmButtonText: "IYA",
      cancelButtonText: "TIDAK",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(API_URL + "baskets/" + id)
          .then((res) => {
            getTransaksi();
            Swal.fire({
              icon: "error",
              title: "Produk Telah Dihapus",
              text: "Produk telah dihapus dari transaksi",
              confirmButtonText: "OKE",
              confirmButtonColor: "black",
              timer: 2000,
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  return (
    <div>
      <NavbarComponent />
      <div className={transaksi.body}>
        {transaksis?.length > 0 ? (
          <div>
            {judul}
            {/* Header */}
            <div className={transaksi.background}>
              <div className={transaksi.header}>
                <div className={transaksi.select}>
                  <input className={transaksi.checkbox} type="checkbox" />
                </div>
                <div className={transaksi.produk}>Produk</div>
                <div className={transaksi.hargaSatuan}>Harga Satuan</div>
                <div className={transaksi.kuantitas}>Kuantitas</div>
                <div className={transaksi.totalHarga}>Total Harga</div>
                <div className={transaksi.aksi}>Aksi</div>
              </div>
            </div>
            {/* Product */}
            {transaksis.map((data: any) => {
              return (
                <KeranjangComponent
                  key={data.id}
                  data={data}
                  handleDelete={handleDelete}
                />
              );
            })}
            {/* Footer */}
            <div className={transaksi.background}>
              <div className={`${transaksi.header} ${transaksi.footer}`}>
                <div className={transaksi.select}>
                  <input className={transaksi.checkbox} type="checkbox" />
                </div>
                <div className={transaksi.produk}>Pilih Semua</div>
                <div
                  className={`${transaksi.hargaSatuan} ${transaksi.footerTotalProduct}`}
                >
                  Total ({transaksis.length} Produk) :
                </div>
                <div
                  className={`${transaksi.kuantitas} ${transaksi.footerTotalHarga}`}
                >
                  Rp 1.100.000
                </div>
                <div className={`${transaksi.aksi} ${transaksi.footerHapus}`}>
                  <button
                    className={`${transaksi.aksiButton} ${transaksi.aksiHapus}`}
                  >
                    HAPUS
                  </button>
                </div>
                <div
                  className={`${transaksi.aksi} ${transaksi.footerCheckout}`}
                >
                  <button className={transaksi.aksiCheckout}>CHECKOUT</button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className={transaksi.background}>
              <div className={`${transaksi.header} ${transaksi.headerKosong}`}>
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
