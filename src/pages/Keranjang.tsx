import axios from "axios";
import { useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { KeranjangComponent } from "../component/KeranjangComponent";
import NavbarComponent from "../component/NavbarComponent";
import keranjang from "../css/Keranjang.module.css";
import { API_URL } from "../utils/api";

export default function Keranjang() {
  const [keranjangs, setKeranjangs] = useState<any | null>(null);
  const [tersedia, setTersedia] = useState<boolean>(true);

  // ComponentDidMount
  useLayoutEffect(() => {
    getKeranjang();
    console.log("keranjangs :", keranjangs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getKeranjang = async () => {
    await axios
      .get(API_URL + "baskets")
      .then((res) => {
        setKeranjangs(res.data);
        console.log("setKeranjangs : ", res.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (id: number) => {
    Swal.fire({
      title: "Apakah Anda Yakin?",
      text: "Apakah Anda ingin menghapus produk dari keranjang?",
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
            getKeranjang();
            Swal.fire({
              icon: "error",
              title: "Produk Telah Dihapus",
              text: "Produk telah dihapus dari keranjang",
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
      <div className={keranjang.body}>
        {keranjangs?.length > 0 ? (
          <div>
            {/* Judul */}
            {tersedia ? (
              <div className={keranjang.rowJudul}>
                <div
                  className={`${keranjang.colJudul} ${keranjang.colTersedia}`}
                >
                  <button
                    onClick={() => setTersedia(true)}
                    className={`${keranjang.judulButton} ${keranjang.aktif}`}
                  >
                    TERSEDIA
                  </button>
                </div>
                <div
                  className={`${keranjang.colJudul} ${keranjang.colTidakTersedia}`}
                >
                  <button
                    onClick={() => setTersedia(false)}
                    className={keranjang.judulButton}
                  >
                    TIDAK TERSEDIA
                  </button>
                </div>
              </div>
            ) : (
              <div className={keranjang.rowJudul}>
                <div
                  className={`${keranjang.colJudul} ${keranjang.colTersedia}`}
                >
                  <button
                    onClick={() => setTersedia(true)}
                    className={keranjang.judulButton}
                  >
                    TERSEDIA
                  </button>
                </div>
                <div
                  className={`${keranjang.colJudul} ${keranjang.colTidakTersedia}`}
                >
                  <button
                    onClick={() => setTersedia(false)}
                    className={`${keranjang.judulButton} ${keranjang.aktif}`}
                  >
                    TIDAK TERSEDIA
                  </button>
                </div>
              </div>
            )}
            {/* Header */}
            <div className={keranjang.background}>
              <div className={keranjang.header}>
                <div className={keranjang.select}>
                  <input className={keranjang.checkbox} type="checkbox" />
                </div>
                <div className={keranjang.produk}>Produk</div>
                <div className={keranjang.hargaSatuan}>Harga Satuan</div>
                <div className={keranjang.kuantitas}>Kuantitas</div>
                <div className={keranjang.totalHarga}>Total Harga</div>
                <div className={keranjang.aksi}>Aksi</div>
              </div>
            </div>
            {/* Product */}
            {keranjangs.map((data: any) => {
              return (
                <KeranjangComponent
                  key={data.id}
                  data={data}
                  handleDelete={handleDelete}
                />
              );
            })}
            {/* Footer */}
            <div className={keranjang.background}>
              <div className={`${keranjang.header} ${keranjang.footer}`}>
                <div className={keranjang.select}>
                  <input className={keranjang.checkbox} type="checkbox" />
                </div>
                <div className={keranjang.produk}>Pilih Semua</div>
                <div
                  className={`${keranjang.hargaSatuan} ${keranjang.footerTotalProduct}`}
                >
                  Total ({keranjangs.length} Produk) :
                </div>
                <div
                  className={`${keranjang.kuantitas} ${keranjang.footerTotalHarga}`}
                >
                  Rp 1.100.000
                </div>
                <div className={`${keranjang.aksi} ${keranjang.footerHapus}`}>
                  <button
                    className={`${keranjang.aksiButton} ${keranjang.aksiHapus}`}
                  >
                    HAPUS
                  </button>
                </div>
                <div
                  className={`${keranjang.aksi} ${keranjang.footerCheckout}`}
                >
                  <button className={keranjang.aksiCheckout}>CHECKOUT</button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className={keranjang.background}>
              <div className={`${keranjang.header} ${keranjang.headerKosong}`}>
                KERANJANGMU KOSONG
              </div>
            </div>
            {/* Body */}
            <div className={keranjang.background}>
              <div
                className={`${keranjang.content} ${keranjang.contentKosong}`}
              >
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
