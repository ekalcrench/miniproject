import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { CardComponent } from "../component/PromoComponent";
import NavbarComponent from "../component/NavbarComponent";
import home from "../css/Home.module.css";
import { API_URL } from "../utils/api";
import { BANNERS_PATH } from "../utils/images";
import ChatComponent from "../component/ChatComponent";
import Swal from "sweetalert2";

export default function Home() {
  // Produk Special
  const [untukmu, setUntukmu] = useState<any>();
  const [hariIni, setHariIni] = useState<any>();

  // ComponentDidMount Products
  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = () => {
    axios
      .get(API_URL + "products")
      .then((res) => {
        setUntukmu(res.data);
        setHariIni(res.data);
        console.log("res data : ", res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const masukKeranjang = (id: number) => {
    Swal.fire({
      title: "Masuk Keranjang?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "black",
      cancelButtonColor: "#CE0505",
      confirmButtonText: "IYA",
      cancelButtonText: "TIDAK",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .get(API_URL + "products/" + id)
          .then((res) => {
            console.log("Product Select : ", res.data);
            axios
              .post(API_URL + "baskets", {
                product: res.data,
                jumlah: 1,
                total_harga: res.data.harga_jual,
              })
              .then((res) => {
                Swal.fire({
                  icon: "success",
                  title: "Berhasil",
                  text: "Produk telah berhasil masuk keranjang",
                  confirmButtonText: "OKE",
                  confirmButtonColor: "black",
                  timer: 2000,
                });
              })
              .catch((error) => {
                console.log(error);
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
      <ChatComponent />
      {/* Banner */}
      <div className={home.body}>
        <img
          className={home.imgBanner}
          src={BANNERS_PATH + "hype.jpg"}
          alt="hype.jpg"
        ></img>
      </div>
      {/* Special Untukmu */}
      <div className={`${home.body} ${home.promo}`}>
        <div className={home.headerContent}>SPECIAL UNTUKMU</div>
        <div className={home.content}>
          {/* Panah Kiri */}
          <div className={home.panah}>
            <FontAwesomeIcon className={home.panahIcon} icon={faAngleLeft} />
          </div>
          {/* Products */}
          <div className={home.produk}>
            {untukmu?.map((data: any) => {
              return (
                <CardComponent
                  key={data.id}
                  data={data}
                  masukKeranjang={masukKeranjang}
                />
              );
            })}
          </div>
          {/* Panah Kanan */}
          <div className={home.panah}>
            <FontAwesomeIcon className={home.panahIcon} icon={faAngleRight} />
          </div>
        </div>
      </div>
      {/* Special Hari Ini */}
      <div className={`${home.body} ${home.promo}`}>
        <div className={home.headerContent}>SPECIAL HARI INI</div>
        <div className={home.content}>
          {/* Panah Kiri */}
          <div className={home.panah}>
            <FontAwesomeIcon className={home.panahIcon} icon={faAngleLeft} />
          </div>
          {/* Products */}
          <div className={home.produk}>
            {hariIni?.map((data: any) => {
              return (
                <CardComponent
                  key={data.id}
                  data={data}
                  masukKeranjang={masukKeranjang}
                />
              );
            })}
          </div>
          {/* Panah Kanan */}
          <div className={home.panah}>
            <FontAwesomeIcon className={home.panahIcon} icon={faAngleRight} />
          </div>
        </div>
      </div>
    </div>
  );
}
