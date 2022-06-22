import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import keranjang from "../css/Keranjang.module.css";
import { PRODUCTS_PATH } from "../utils/images";
import { numberWithDots } from "../utils/utils";

type PropsType = {
  index: number;
  checkedData: Array<boolean>;
  setCheckedData: any;
  setSelectedData: any;
  selectedData: any;
  setTotalHargaCheckout: any;
  totalHargaCheckout: number;
  data: any;
  handleDelete: any;
};

export const KeranjangComponent = (props: PropsType) => {
  const [kuantitas, setKuantitas] = useState<number>(1);

  // ComponentDidMount
  useEffect(() => {
    setKuantitas(props.data.jumlah);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Input Kuantitas
  const handleChange = (event: any) => {
    if (event.target.value <= 1) {
      props.data.total_harga = 1 * props.data.product.harga_jual;
      setKuantitas(1);
    } else {
      props.data.total_harga =
        event.target.value * props.data.product.harga_jual;
      setKuantitas(event.target.value);
    }
  };

  // Button Kuantitas
  const handleKurang = () => {
    if (kuantitas <= 1) {
      setKuantitas(1);
    } else {
      props.data.total_harga = (kuantitas - 1) * props.data.product.harga_jual;
      setKuantitas(kuantitas - 1);
    }
  };

  const handleTambah = () => {
    props.data.total_harga = (kuantitas + 1) * props.data.product.harga_jual;
    setKuantitas(kuantitas + 1);
  };

  useEffect(() => {
    props.data.jumlah = kuantitas;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kuantitas]);

  // Select Data Checkbox
  const handleSelectData = (position: number) => {
    if (props.checkedData[props.index] === false) {
      props.setTotalHargaCheckout(
        props.totalHargaCheckout + props.data.total_harga
      );
      if (props.selectedData === null) {
        props.setSelectedData([props.data]);
      } else {
        props.setSelectedData([...props.selectedData, props.data]);
      }
    } else {
      props.setTotalHargaCheckout(
        props.totalHargaCheckout - props.data.total_harga
      );
      props.setSelectedData(
        props.selectedData.filter((data: any) => data.id !== props.data.id)
      );
    }

    props.setCheckedData(
      props.checkedData.map((data: boolean, index: number) =>
        index === position ? !data : data
      )
    );
  };

  return (
    <div className={keranjang.background}>
      <div className={keranjang.content}>
        <div className={keranjang.select}>
          <input
            className={keranjang.checkbox}
            type="checkbox"
            checked={props.checkedData[props.index]}
            onChange={() => handleSelectData(props.index)}
          />
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
            <div className={keranjang.diskonStrip}>
              Rp {numberWithDots(props.data.product.harga_awal)}
            </div>
            <div className={keranjang.diskon}>
              Rp {numberWithDots(props.data.product.harga_jual)}
            </div>
          </div>
        ) : (
          <div className={keranjang.hargaSatuan}>
            Rp {numberWithDots(props.data.product.harga_jual)}
          </div>
        )}
        {/* Kuantitas */}
        {props.checkedData[props.index] ? (
          <div className={keranjang.kuantitas}>
            <button className={keranjang.kuantitasButton}>-</button>
            <input
              className={keranjang.kuantitasInput}
              type="number"
              name="kuantitas"
              value={kuantitas}
              disabled
            />
            <button className={keranjang.kuantitasButton}>+</button>
          </div>
        ) : (
          <div className={keranjang.kuantitas}>
            <button
              onClick={() => handleKurang()}
              className={keranjang.kuantitasButton}
            >
              -
            </button>
            <input
              className={keranjang.kuantitasInput}
              type="number"
              name="kuantitas"
              value={kuantitas}
              onChange={(event) => handleChange(event)}
            />
            <button
              onClick={() => handleTambah()}
              className={keranjang.kuantitasButton}
            >
              +
            </button>
          </div>
        )}

        {/* Total Harga */}
        <div className={keranjang.totalHarga}>
          Rp {numberWithDots(props.data.total_harga)}
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
