import axios from "axios";
import { useEffect, useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { KeranjangComponent } from "../component/KeranjangComponent";
import NavbarComponent from "../component/NavbarComponent";
import SearchComponent from "../component/SearchComponent";
import keranjang from "../css/Keranjang.module.css";
import { setDataSearch } from "../features/searchSlice";
import { API_SERVER_ORDER } from "../utils/api";
import { getOrderCart, numberWithDots } from "../utils/utils";

export default function Keranjang() {
  const [tersedia, setTersedia] = useState<boolean>(true); // Keranjang tersedia dan tidak
  const [keranjangs, setKeranjangs] = useState<any | null>(null); // Semua data di keranjang
  const [checkedAll, setCheckedAll] = useState<boolean>(false); // Checkbox all
  const [checkedData, setCheckedData] = useState<any>(null);
  const [selectedData, setSelectedData] = useState<any>(null);
  const [totalHargaCheckout, setTotalHargaCheckout] = useState<number>(0);
  const [disabled, setDisabled] = useState<boolean>(false); // Button disabled
  const [orderCart, setOrderCart] = useState<any>(null);

  // Redux
  const dispatch = useAppDispatch();
  const searchData = useAppSelector((state) => state.search.dataSearch);
  const userIsLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  const userData = useAppSelector((state) => state.user.data);

  // ComponentDidMount
  useLayoutEffect(() => {
    dispatch(setDataSearch([]));
    getOrderCart(userData, setOrderCart);
    getKeranjang();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getKeranjang = () => {
    const getBasket = window.localStorage.getItem("basket");
    if (getBasket) {
      setCheckedData(new Array(JSON.parse(getBasket).length).fill(false));
      setKeranjangs(JSON.parse(getBasket));
    }
  };

  const handleDelete = (productId: number) => {
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
        window.localStorage.setItem(
          "basket",
          JSON.stringify(
            keranjangs.filter((data: any) => data.product.id !== productId)
          )
        );
        getKeranjang();
        Swal.fire({
          icon: "error",
          title: "Produk Telah Dihapus",
          text: "Produk telah dihapus dari keranjang",
          confirmButtonText: "OKE",
          confirmButtonColor: "black",
          timer: 2000,
        });
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
          localStorage.removeItem("basket");
          getKeranjang();
          Swal.fire({
            icon: "error",
            title: "Semua Produk Telah Dihapus",
            text: "Semua produk telah dihapus dari keranjang",
            confirmButtonText: "OKE",
            confirmButtonColor: "black",
            timer: 2000,
          });
          window.location.reload();
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

  // useEffect(() => {
  // console.log("keranjangs : ", keranjangs);
  // console.log("checkedData : ", checkedData);
  // console.log("selectedData : ", selectedData);
  // const select = checkedData?.filter((data: boolean) => data === false);
  // if (select?.length === 0) {
  //   setCheckedAll(true);
  //   console.log("setCheckedAll");
  // }else{
  //   setCheckedAll(false);
  //   console.log("unsetCheckedAll");
  // }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // });

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
          (totalHarga: number, data: any) => totalHarga + data.totalHarga,
          0
        )
      );
    } else {
      // Menghindari error dari first Mounting
      if (checkedData?.length > 0) {
        setCheckedData(
          checkedData.map((data: boolean) => {
            return (data = false);
          })
        );
      }
      setSelectedData(null);
      setTotalHargaCheckout(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkedAll]);

  const handleCheckout = () => {
    if (userIsLoggedIn) {
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
            selectedData.map(async (data: any) => {
              console.log("data TERPILIH CHECKOUT : ", data);
              const postData = {
                orderId: orderCart.id,
                productId: data.product.id,
                quantity: data.jumlah,
              };
              console.log("postData : ",postData)
              try {
                const res = await axios
                  .post(API_SERVER_ORDER + "OrderDetail", postData);
                console.log("Orderdetail res.data : ", res.data);
              } catch (error) {
                return console.log("Orderdetail error : ", error);
              }
            });
            Swal.fire({
              icon: "success",
              title: "Berhasil",
              text: "Produk berhasil checkout",
              confirmButtonText: "OKE",
              confirmButtonColor: "black",
              timer: 3000,
            });
            window.localStorage.setItem(
              "basket",
              JSON.stringify(
                keranjangs.filter((item: any) => !selectedData.includes(item))
              )
            );
            getKeranjang();
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
    } else {
      Swal.fire({
        icon: "warning",
        title: "Mohon Login",
        text: "Mohon login terlebih dahulu untuk melanjutkan checkout",
        confirmButtonText: "OKE",
        confirmButtonColor: "black",
        timer: 2000,
      });
    }
  };

  return (
    <div>
      <NavbarComponent />
      {searchData.length > 0 ? (
        <SearchComponent />
      ) : (
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
                // console.log("data : ", data);
                return (
                  <KeranjangComponent
                    key={index}
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
                <div
                  className={`${keranjang.header} ${keranjang.headerKosong}`}
                >
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
      )}
    </div>
  );
}
