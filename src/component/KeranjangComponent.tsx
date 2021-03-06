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
      props.data.totalHarga = 1 * props.data.product.hargaJual;
      setKuantitas(1);
    } else {
      props.data.totalHarga = event.target.value * props.data.product.hargaJual;
      setKuantitas(event.target.value);
    }
  };

  // Button Kuantitas
  const handleKurang = () => {
    if (kuantitas <= 1) {
      setKuantitas(1);
    } else {
      props.data.totalHarga = (kuantitas - 1) * props.data.product.hargaJual;
      setKuantitas(kuantitas - 1);
    }
  };

  const handleTambah = () => {
    props.data.totalHarga = (kuantitas + 1) * props.data.product.hargaJual;
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
        props.totalHargaCheckout + props.data.totalHarga
      );
      if (props.selectedData === null) {
        props.setSelectedData([props.data]);
      } else {
        props.setSelectedData([...props.selectedData, props.data]);
      }
    } else {
      props.setTotalHargaCheckout(
        props.totalHargaCheckout - props.data.totalHarga
      );
      props.setSelectedData(
        props.selectedData.filter(
          (data: any) => data.product.id !== props.data.product.id
        )
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
              src={PRODUCTS_PATH + props.data.product.img}
              alt={props.data.product.img}
            ></img>
          </div>
          <div className={keranjang.produkNama}>
            <div>{props.data.product.name}</div>
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
            <div>{props.data.product.type}</div>
          </div>
        </div>
        {/* Harga Satuan */}
        {props.data.product.hargaAwal - props.data.product.hargaJual !== 0 ? (
          <div className={keranjang.hargaSatuan}>
            <div className={keranjang.diskonStrip}>
              Rp {numberWithDots(props.data.product.hargaAwal)}
            </div>
            <div className={keranjang.diskon}>
              Rp {numberWithDots(props.data.product.hargaJual)}
            </div>
          </div>
        ) : (
          <div className={keranjang.hargaSatuan}>
            Rp {numberWithDots(props.data.product.hargaJual)}
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
          Rp {numberWithDots(props.data.totalHarga)}
        </div>
        <div className={keranjang.aksi}>
          <button
            onClick={() => props.handleDelete(props.data.product.id)}
            className={keranjang.aksiButton}
          >
            HAPUS
          </button>
        </div>
      </div>
    </div>
  );
};
