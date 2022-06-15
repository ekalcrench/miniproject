import keranjang from "../css/Keranjang.module.css";
import { PRODUCTS_PATH } from "../utils/images";

type PropsType = {
  data: any;
};

export const KeranjangComponent = (props: PropsType) => {
  return (
    <div key={props.data.id} className={keranjang.background}>
      <div className={keranjang.content}>
        <img
          src={PRODUCTS_PATH + props.data.product.gambar}
          alt={props.data.product.gambar}
        ></img>
        <div>
          {props.data.product.nama} <br />
          {props.data.product.keterangan}
        </div>
        <div>Variasi</div>
        {props.data.product.harga_awal - props.data.product.harga_jual !== 0 ? (
          <div>
            <div>{props.data.product.harga_awal}</div>
            <div>{props.data.product.harga_jual}</div>
          </div>
        ) : (
          <div>{props.data.product.harga_jual}</div>
        )}
        <div>Kuantitas: {props.data.jumlah}</div>
        <div>Harga: {props.data.jumlah * props.data.product.harga_jual}</div>
        <div>
          <button>HAPUS</button>
        </div>
      </div>
    </div>
  );
};
