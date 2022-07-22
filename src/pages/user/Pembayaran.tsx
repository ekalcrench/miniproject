import axios from "axios";
import { useEffect, useLayoutEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import NavbarComponent from "../../component/NavbarComponent";
import PembayaranComponent from "../../component/PembayaranComponent";
import pembayaran from "../../css/Pembayaran.module.css";
import { API_SERVER_ORDER, API_SERVER_PEMBAYARAN } from "../../utils/api";
import { getOrderCart, numberWithDots } from "../../utils/utils";

export default function Pembayaran() {
  const [orderCart, setOrderCart] = useState<any>(null);
  const [payment, setPayment] = useState<any>(null);
  const [orderDetail, setOrderDetail] = useState<any>(null);
  const [totalHarga, setTotalHarga] = useState<number>(0);

  // Redux
  const userData = useAppSelector((state) => state.user.data);

  useLayoutEffect(() => {
    getOrderCart(userData, setOrderCart);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (orderCart) {
      axios
        .get(API_SERVER_ORDER + "OrderDetail/" + orderCart.id)
        .then((result) => setOrderDetail(result.data))
        .catch((error) => console.log(error));
      axios
        .get(API_SERVER_PEMBAYARAN + "Payment/" + orderCart.id)
        .then((result) => setPayment(result.data))
        .catch((error) => console.log(error));
    }
  }, [orderCart]);

  useEffect(() => {
    let totalHargaTemp = 0;
    orderDetail?.map((data: any) => {
      totalHargaTemp += data.product.hargaJual;
      return setTotalHarga(totalHargaTemp);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderDetail]);

  useEffect(() => {
    console.log("orderCart : ", orderCart);
    console.log("orderDetail : ", orderDetail);
  });

  // const handleSubmit = () => {
  //   const postData = {
  //     id : payment.id,
  //     orderId : payment.orderId,
  //     userId: pa
  //   }
  //   axios.put(API_SERVER_PEMBAYARAN + "/Payment", )
  // };

  return (
    <div>
      <NavbarComponent />
      <div className={pembayaran.body}>
        <div className={pembayaran.bodyLeft}>
          <div className={pembayaran.judulLeft}>
            <div className={pembayaran.judul}>PEMBAYARAN</div>
            <div className={pembayaran.judulLeftKeterangan}>
              Ini halaman terakhir dari proses belanjamu. Pastikan semua sudah
              benar, ya :)
            </div>
          </div>
          <div className={pembayaran.contentLeft}>
            <div className={pembayaran.judul}>BARANG YANG DIBELI</div>
            {orderDetail?.length > 0 ? (
              orderDetail.map((data: any, index: number) => (
                <PembayaranComponent key={index} data={data} />
              ))
            ) : (
              <div>BELUM ADA DATA YANG HARUS DIBAYAR</div>
            )}
          </div>
        </div>
        <div className={pembayaran.bodyRight}>
          <div>
            <div className={pembayaran.judul}>TOTAL TAGIHAN </div>
            <div>Rp {numberWithDots(totalHarga)}</div>
            {/* <button onClick={() => handleSubmit()}>BAYAR</button> */}
          </div>
        </div>
      </div>
    </div>
  );
}
