import pembayaran from "../css/Pembayaran.module.css";
import { PRODUCTS_PATH } from "../utils/images";
import { numberWithDots } from "../utils/utils";

type PropsType = {
  data: any;
};

export default function PembayaranComponent(props: PropsType) {
  return (
    <div className={pembayaran.content}>
      {/* Produk */}
      <div className={pembayaran.produk}>
        <div className={pembayaran.produkImage}>
          <img
            className={pembayaran.imgProduk}
            src={PRODUCTS_PATH + props.data.product.img}
            alt={props.data.product.img}
          ></img>
        </div>
        <div className={pembayaran.produkNama}>
          <div>{props.data.product.name}</div>
          <div>{props.data.product.keterangan}</div>
          <div>Rp {numberWithDots(props.data.product.hargaJual)}</div>
        </div>
        {/* Kuantitas */}
        <div className={pembayaran.produkKuantitas}>
          <div>Jumlah {props.data.quantity}</div>
          <div>
            Total Rp{" "}
            {numberWithDots(props.data.quantity * props.data.product.hargaJual)}
          </div>
        </div>
      </div>
    </div>
  );
}
