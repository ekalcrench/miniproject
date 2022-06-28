import axios from "axios";
import Swal from "sweetalert2";
import { API_SERVER_ORDER } from "./api";

export const numberWithDots = (x: number) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const masukKeranjang = async (
  data: any,
  basket: any,
  setBasket: any,
  orderCart: any,
  userData: any
) => {
  const result = await Swal.fire({
    title: "Masuk Keranjang?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "black",
    cancelButtonColor: "#CE0505",
    confirmButtonText: "IYA",
    cancelButtonText: "TIDAK",
  });
  if (result.isConfirmed) {
    const found = basket?.filter(
      (element: any) => element.product.id === data.id
    );
    if (found?.length > 0) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Produk sudah ada di keranjang",
        confirmButtonText: "OKE",
        confirmButtonColor: "black",
        timer: 2000,
      });
    } else {
      const postData = {
        product: data,
        jumlah: 1,
        totalHarga: data.hargaJual,
      };
      if (basket?.length > 0) {
        window.localStorage.setItem(
          "basket",
          JSON.stringify([...basket, postData])
        );
        setBasket([...basket, postData]);
      } else {
        window.localStorage.setItem(
          "basket",
          JSON.stringify(Array(postData))
        );
        setBasket(Array(postData));
      }
      // Jikalau belum ada orderCart maka buat orderId
      if (!orderCart) {
        axios
          .post(API_SERVER_ORDER + "Order", {
            userId: userData.id,
            status: "pending",
          })
          .then((res) => {
            console.log("Res POST Order : ", res.data);
          })
          .catch((error) => console.log("Error POST Order : ", error));
      }
      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Produk telah berhasil masuk keranjang",
        confirmButtonText: "OKE",
        confirmButtonColor: "black",
        timer: 2000,
      });
    }
  }
};

export const getBasket = (setBasket:any) =>{
  // basket
  const getBasket = window.localStorage.getItem("basket");
  if (getBasket) {
    setBasket(JSON.parse(getBasket));
  }
  console.log("getBasket : ", getBasket)
}

export const getOrderCart = async (userData:any, setOrderCart:any) => {
  // Bikin POST Order status pending, GET dulu jika ada maka tidak usah dibikin
  try {
    const res = await axios
      .get(API_SERVER_ORDER + "Order/cart/" + userData.userId);
    console.log("Res GET Order/cart/{userId} : ", res.data);
    console.log("{userId} : ", userData.userId);
    setOrderCart(res.data);
  } catch (error) {
    console.log("Error GET Order/cart/{userId} : ", error);
    console.log("{userId} : ", userData.userId);
  }
};
