import axios from "axios";
import { useEffect, useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { KeranjangComponent } from "../component/KeranjangComponent";
import NavbarComponent from "../component/NavbarComponent";
import keranjang from "../css/Keranjang.module.css";
import { API_URL } from "../utils/api";
import { numberWithDots } from "../utils/utils";

export default function Keranjang() {
  const [tersedia, setTersedia] = useState<boolean>(true); // Keranjang tersedia dan tidak
  const [keranjangs, setKeranjangs] = useState<any | null>(null); // Semua data di keranjang
  const [checkedAll, setCheckedAll] = useState<boolean>(false); // Checkbox all
  const [checkedData, setCheckedData] = useState<any>(null);
  const [selectedData, setSelectedData] = useState<any>(null);
  const [totalHargaCheckout, setTotalHargaCheckout] = useState<number>(0);
  const [disabled, setDisabled] = useState<boolean>(false); // Button disabled

  // ComponentDidMount
  useLayoutEffect(() => {
    getKeranjang();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getKeranjang = () => {
    axios
      .get(API_URL + "baskets")
      .then((res) => {
        setKeranjangs(res.data);
        setCheckedData(new Array(res.data.length).fill(false));
        console.log("setKeranjangs : ", res.data);
      })
      .catch((error) => console.log(error));
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
          .catch((error) => console.log(error));
      }
    });
  };

  const handleDeleteAll = () => {
    if (checkedAll) {
      Swal.fire({
        title: "Apakah Anda Yakin?",
        text: "Apakah Anda ingin menghapus semua produk dari keranjang?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "black",
        cancelButtonColor: "#CE0505",
        confirmButtonText: "IYA",
        cancelButtonText: "TIDAK",
      }).then((result) => {
        if (result.isConfirmed) {
          keranjangs.map((data: any) => {
            return axios
              .delete(API_URL + "baskets/" + data.id)
              .then((res) => {
                getKeranjang();
                Swal.fire({
                  icon: "error",
                  title: "Semua Produk Telah Dihapus",
                  text: "Semua produk telah dihapus dari keranjang",
                  confirmButtonText: "OKE",
                  confirmButtonColor: "black",
                  timer: 2000,
                });
              })
              .catch((error) => console.log(error));
          });
        }
      });
    } else {
      Swal.fire({
        icon: "warning",
        title: "Mohon Cek Pilih Semua",
        text: "Mohon cek kotak pilih semua untuk menghapus semua keranjang",
        confirmButtonText: "OKE",
        confirmButtonColor: "black",
        timer: 2000,
      });
    }
  };

  useEffect(() => {
    console.log("checkedData : ", checkedData);
    console.log("selectedData : ", selectedData);
    // const select = checkedData?.filter((data: boolean) => data === false);
    // if (select?.length === 0) {
    //   setCheckedAll(true);
    //   console.log("setCheckedAll");
    // }else{
    //   setCheckedAll(false);
    //   console.log("unsetCheckedAll");
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkedData]);

  useEffect(() => {
    if (checkedAll) {
      setCheckedData(
        checkedData.map((data: boolean) => {
          return (data = true);
        })
      );
      setSelectedData(keranjangs);
      setTotalHargaCheckout(
        keranjangs.reduce(
          (totalHarga: number, data: any) => totalHarga + data.total_harga,
          0
        )
      );
    } else {
      setCheckedData(
        checkedData?.map((data: boolean) => {
          return (data = false);
        })
      );
      setSelectedData(null);
      setTotalHargaCheckout(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkedAll]);

  const handleCheckout = () => {
    if (selectedData?.length > 0) {
      Swal.fire({
        title: "Apakah Anda Yakin?",
        text: "Apakah Anda ingin checkout?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "black",
        cancelButtonColor: "#CE0505",
        confirmButtonText: "IYA",
        cancelButtonText: "TIDAK",
      }).then((result) => {
        if (result.isConfirmed) {
          setDisabled(true);
          selectedData.map((data: any) => {
            const postData = {
              product: data.product,
              jumlah: data.jumlah,
              total_harga: data.total_harga,
              kode_pembayaran: Math.floor(Math.random() * 100),
              status: 1
            };
            return axios
              .post(API_URL + "transactions", postData)
              .then((res) => {
                console.log("transactions post RES : ", res);
                axios
                  .delete(API_URL + "baskets/" + data.id)
                  .then((res) => {
                    console.log("transactions delete RES : ", res);
                    getKeranjang();
                    setDisabled(false);
                    Swal.fire({
                      icon: "success",
                      title: "Berhasil",
                      text: "Produk berhasil checkout",
                      confirmButtonText: "OKE",
                      confirmButtonColor: "black",
                      timer: 3000,
                    });
                  })
                  .catch((error) => console.log(error));
              })
              .catch((error) => console.log(error));
          });
        }
      });
    } else {
      Swal.fire({
        icon: "warning",
        title: "Mohon Pilih Produk",
        text: "Mohon pilih produk untuk melanjutkan checkout",
        confirmButtonText: "OKE",
        confirmButtonColor: "black",
        timer: 2000,
      });
    }
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
                  <input
                    checked={checkedAll}
                    onChange={() => setCheckedAll(!checkedAll)}
                    className={keranjang.checkbox}
                    type="checkbox"
                  />
                </div>
                <div className={keranjang.produk}>Produk</div>
                <div className={keranjang.hargaSatuan}>Harga Satuan</div>
                <div className={keranjang.kuantitas}>Kuantitas</div>
                <div className={keranjang.totalHarga}>Total Harga</div>
                <div className={keranjang.aksi}>Aksi</div>
              </div>
            </div>
            {/* Product */}
            {keranjangs.map((data: any, index: number) => {
              return (
                <KeranjangComponent
                  key={data.id}
                  index={index}
                  checkedData={checkedData}
                  setCheckedData={setCheckedData}
                  setSelectedData={setSelectedData}
                  selectedData={selectedData}
                  setTotalHargaCheckout={setTotalHargaCheckout}
                  totalHargaCheckout={totalHargaCheckout}
                  data={data}
                  handleDelete={handleDelete}
                />
              );
            })}
            {/* Footer */}
            <div className={keranjang.background}>
              <div className={`${keranjang.header} ${keranjang.footer}`}>
                <div className={keranjang.select}>
                  <input
                    checked={checkedAll}
                    onChange={() => setCheckedAll(!checkedAll)}
                    className={keranjang.checkbox}
                    type="checkbox"
                  />
                </div>
                <div className={keranjang.produk}>Pilih Semua</div>
                <div
                  className={`${keranjang.hargaSatuan} ${keranjang.footerTotalProduct}`}
                >
                  Total ({!selectedData ? 0 : selectedData.length} Produk) :
                </div>
                <div
                  className={`${keranjang.kuantitas} ${keranjang.footerTotalHarga}`}
                >
                  Rp{" "}
                  {!selectedData
                    ? numberWithDots(0)
                    : numberWithDots(totalHargaCheckout)}
                </div>
                <div className={`${keranjang.aksi} ${keranjang.footerHapus}`}>
                  <button
                    onClick={() => handleDeleteAll()}
                    className={`${keranjang.aksiButton} ${keranjang.aksiHapus}`}
                  >
                    HAPUS
                  </button>
                </div>
                <div
                  className={`${keranjang.aksi} ${keranjang.footerCheckout}`}
                >
                  {disabled ? (
                    <button className={keranjang.aksiCheckout} disabled>
                      CHECKOUT
                    </button>
                  ) : (
                    <button
                      onClick={() => handleCheckout()}
                      className={keranjang.aksiCheckout}
                    >
                      CHECKOUT
                    </button>
                  )}
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
