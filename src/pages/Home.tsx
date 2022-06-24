import axios from "axios";
import { useEffect, useLayoutEffect, useState } from "react";
import { CardComponent, SkeletonComponent } from "../component/PromoComponent";
import NavbarComponent from "../component/NavbarComponent";
import home from "../css/Home.module.css";
import { API_SERVER_ORDER, API_URL } from "../utils/api";
import { BANNERS_PATH } from "../utils/images";
import ChatComponent from "../component/ChatComponent";
import Swal from "sweetalert2";

export default function Home() {
  // const [dataBeforePage, setDataBeforePage] = useState<any>();
  const [dataCurrentPage, setDataCurrentPage] = useState<any>();
  // const [dataNextPage, setDataNextPage] = useState<any>();
  // const [loading, setLoading] = useState<boolean>(false);
  // const [dataStartRequest, setDataStartRequest] = useState<number>(4);
  // const dataLengthRequest = 4;

  // Implementasi bayuServerOrder
  useLayoutEffect(() => {
    axios
      .get(API_SERVER_ORDER + "Product")
      .then((res) => {
        setDataCurrentPage(res.data);
        console.log("setDataCurrentPage : ", res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Implementasi serverJsonPlaceholder
  // ComponentDidMount Products
  // useLayoutEffect(() => {
  //   setLoading(true);
  //   axios
  //     .get(API_URL + "products?_start=0&_limit=4")
  //     .then((res) => {
  //       setDataCurrentPage(res.data);
  //       console.log("setDataCurrentPage : ", res.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  //   getNextPage();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // // ComponentDidMount and ComponentDidUpdate Set Time Out untuk Skeleton
  // // useEffect tidak berpengaruh kepada selain dari return
  // useEffect(() => {
  //   if (loading) {
  //     // Jika si loading berubah menjadi true, maka akan set menjadi false dalam kurun waktu 2 detik
  //     setTimeout(() => setLoading(false), 2000);
  //     console.log("loading : ", loading);
  //   } else {
  //     console.log("scroll scroll scroll loading ", loading);
  //     window.addEventListener("scroll", handleScroll);
  //     return () => window.removeEventListener("scroll", handleScroll);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [loading]);

  // const getNextPage = () => {
  //   axios
  //     .get(
  //       API_URL +
  //         "products?_start=" +
  //         dataStartRequest +
  //         "&_limit=" +
  //         dataLengthRequest
  //     )
  //     .then((res) => {
  //       setDataNextPage(res.data);
  //       setDataStartRequest(dataStartRequest + dataLengthRequest);
  //       console.log("setDataNextPage : ", res.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  // const handleScroll = (event: any) => {
  //   if (!loading) {
  //     // Jika sudah mencapai bottom page
  //     if (
  //       window.innerHeight + event.target.documentElement.scrollTop + 1 >
  //       event.target.documentElement.offsetHeight
  //     ) {
  //       // Jika masih ada page selanjutnya dan tidak loading
  //       if (dataNextPage && dataNextPage.length > 0) {
  //         event.target.documentElement.scrollTop += 20;
  //         // Untuk keperluan loading skeleton data selanjutnya
  //         setLoading(true);
  //         setDataBeforePage(dataCurrentPage); // Data before
  //         console.log("setDataBeforePage : ", dataCurrentPage);
  //         setDataCurrentPage([...dataCurrentPage, ...dataNextPage]);
  //         console.log("setDataCurrentPage : ", dataNextPage);
  //         // Memanggil halaman selanjutnya
  //         getNextPage();
  //       }
  //       console.log("BOTTOM PAGE");
  //     }
  //   }
  // };

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
                totalHarga: res.data.hargaJual,
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
          src={BANNERS_PATH + "steal_deal.jpg"}
          alt="steal_deal.jpg"
        ></img>
      </div>
      {/* Special Untukmu */}
      <div className={`${home.body} ${home.promo}`}>
        <div className={home.headerContent}>SPECIAL UNTUKMU</div>
        <div className={home.content}>
          {/* Products */}
          {dataCurrentPage?.length > 0 ? (
            <div className={home.produk}>
              {dataCurrentPage?.map((data: any, index:number) => {
                return (
                  <CardComponent
                    key={index}
                    data={data}
                    masukKeranjang={masukKeranjang}
                  />
                );
              })}
            </div>
          ) : (
            <div className={home.produk}>
              {/* {dataBeforePage?.map((data: any) => {
                return (
                  <CardComponent
                    key={data.id}
                    data={data}
                    masukKeranjang={masukKeranjang}
                  />
                );
              })} */}
              {Array.from(Array(8), (_e, index) => {
                // Skeleton
                return <SkeletonComponent key={index} />;
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
