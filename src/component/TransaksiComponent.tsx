import transaksi from "../css/Transaksi.module.css";
import { PRODUCTS_PATH } from "../utils/images";
import { numberWithDots } from "../utils/utils";

type PropsType = {
  data: any;
};

export const TransaksiComponent = (props: PropsType) => {
  let backgroundColor = "black";
  let color = "black";
  let statusPembayaran = "Belum Dibayar";
  if (props.data.status === 1) {
    backgroundColor = "#CE0505";
    color = "white";
    statusPembayaran = "Belum Dibayar";
  } else if (props.data.status === 2) {
    backgroundColor = "#3D8461";
    color = "white";
    statusPembayaran = "Sudah Dibayar";
  }

  const date = new Date();
  const invoice =
    "INV/" +
    date.getFullYear() +
    date.getMonth() +
    date.getDate() +
    "/BD/" +
    date.getTime();

  return (
    <div className={transaksi.background}>
      <div className={transaksi.content}>
        <div className={transaksi.contentHeader}>
          <div className={transaksi.contentHeaderTanggal}>22 Nov 2021</div>
          <div className={transaksi.contentHeaderStatus}>
            <button
              className={transaksi.contentHeaderStatusButton}
              style={{ backgroundColor: backgroundColor, color: color }}
            >
              {statusPembayaran}
            </button>
          </div>
          <div className={transaksi.contentHeaderInvoice}>{invoice}</div>
        </div>
        <div className={transaksi.contentBody}>
          {/* Produk */}
          <div className={transaksi.produk}>
            <div className={transaksi.produkImage}>
              <img
                className={transaksi.imgProduk}
                src={PRODUCTS_PATH + props.data.product.img}
                alt={props.data.product.img}
              ></img>
            </div>
            <div className={transaksi.produkDetail}>
              <div>{props.data.product.name}</div>
              <div>{props.data.product.keterangan}</div>
              <div className={transaksi.produkDetailHarga}>
                {props.data.quantity} Barang x Rp{" "}
                {numberWithDots(props.data.product.hargaJual)}
              </div>
            </div>
          </div>
          {/* Total Belanja */}
          <div className={transaksi.totalBelanja}>
            <div>Total Belanja</div>
            <div>
              Rp{" "}
              {numberWithDots(props.data.quantity * props.data.product.hargaJual)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
