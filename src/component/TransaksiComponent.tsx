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
    backgroundColor = "#E7F847";
    color = "black";
    statusPembayaran = "Belum Dibayar";
  } else if (props.data.status === 2) {
    backgroundColor = "#D4E4F1";
    color = "black";
    statusPembayaran = "Berlangsung";
  } else if (props.data.status === 3) {
    backgroundColor = "#3D8461";
    color = "white";
    statusPembayaran = "Berhasil";
  } else if (props.data.status === 4) {
    backgroundColor = "#CE0505";
    color = "white";
    statusPembayaran = "Tidak Berhasil";
  }

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
          <div className={transaksi.contentHeaderInvoice}>
            INV/20211122/MPL/1783877756
          </div>
        </div>
        <div className={transaksi.contentBody}>
          {/* Produk */}
          <div className={transaksi.produk}>
            <div className={transaksi.produkImage}>
              <img
                className={transaksi.imgProduk}
                src={PRODUCTS_PATH + props.data.product.gambar}
                alt={props.data.product.gambar}
              ></img>
            </div>
            <div className={transaksi.produkDetail}>
              <div>{props.data.product.nama}</div>
              <div>{props.data.product.keterangan}</div>
              <div className={transaksi.produkDetailHarga}>
                {props.data.jumlah} Barang x Rp{" "}
                {numberWithDots(props.data.product.harga_jual)}
              </div>
            </div>
          </div>
          {/* Total Belanja */}
          <div className={transaksi.totalBelanja}>
            <div>Total Belanja</div>
            <div>
              Rp{" "}
              {numberWithDots(
                props.data.jumlah * props.data.product.harga_jual
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
