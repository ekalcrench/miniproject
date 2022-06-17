import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import keranjang from "../css/Keranjang.module.css";
import { PRODUCTS_PATH } from "../utils/images";
import { numberWithDots } from "../utils/utils";

type PropsType = {
  data: any;
  handleDelete: any
};

export const KeranjangComponent = (props: PropsType) => {
  const [kuantitas, setKuantitas] = useState<number>(1);

  useEffect(() => {
    setKuantitas(props.data.jumlah);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (event: any) => {
    setKuantitas(event.target.value);
    console.log("kuantitas : ", event.target.value);
  };

  return (
    <div className={keranjang.background}>
      <div className={keranjang.content}>
        <div className={keranjang.select}>
          <input className={keranjang.checkbox} type="checkbox" />
        </div>
        {/* Produk */}
        <div className={keranjang.produk}>
          <div className={keranjang.produkImage}>
            <img
              className={keranjang.imgProduk}
              src={PRODUCTS_PATH + props.data.product.gambar}
              alt={props.data.product.gambar}
            ></img>
          </div>
          <div className={keranjang.produkNama}>
            <div>{props.data.product.nama}</div>
            <div>{props.data.product.keterangan}</div>
          </div>
          <div className={keranjang.produkVariasi}>
            <div>
              Variasi
              <button className={keranjang.produkVariasiButton}>
                <FontAwesomeIcon
                  className={keranjang.produkVariasiIcon}
                  icon={faCaretDown}
                />
              </button>
            </div>
            <div>{props.data.product.variasi}</div>
          </div>
        </div>
        {/* Harga Satuan */}
        {props.data.product.harga_awal - props.data.product.harga_jual !== 0 ? (
          <div className={keranjang.hargaSatuan}>
            <div>Rp {numberWithDots(props.data.product.harga_awal)}</div>
            <div>Rp {numberWithDots(props.data.product.harga_jual)}</div>
          </div>
        ) : (
          <div className={keranjang.hargaSatuan}>
            Rp {numberWithDots(props.data.product.harga_jual)}
          </div>
        )}
        {/* Kuantitas */}
        <div className={keranjang.kuantitas}>
          <button className={keranjang.kuantitasButton}>-</button>
          <input
            className={keranjang.kuantitasInput}
            type="number"
            name="kuantitas"
            value={kuantitas}
            onChange={(event) => handleChange(event)}
          />
          <button className={keranjang.kuantitasButton}>+</button>
        </div>
        {/* Total Harga */}
        <div className={keranjang.totalHarga}>
          Rp {numberWithDots(props.data.jumlah * props.data.product.harga_jual)}
        </div>
        <div className={keranjang.aksi}>
          <button
            onClick={() => props.handleDelete(props.data.id)}
            className={keranjang.aksiButton}
          >
            HAPUS
          </button>
        </div>
      </div>
    </div>
  );
};
