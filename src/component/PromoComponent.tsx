import card from "../css/Card.module.css";
import { PRODUCTS_PATH } from "../utils/images";
import { numberWithDots } from "../utils/utils";

type PropsType = {
  data: any;
  masukKeranjang: any;
};

export const CardComponent = (props: PropsType) => {
  const discount = Math.floor(
    ((props.data.harga_awal - props.data.harga_jual) / props.data.harga_awal) *
      100
  );

  return (
    <div
      onClick={() => props.masukKeranjang(props.data.id)}
      className={card.homeCard}
    >
      <img
        className={card.homeImg}
        src={PRODUCTS_PATH + props.data.gambar}
        alt={props.data.gambar}
      ></img>
      <div className={card.homeBody}>
        <div className={card.dataNama}>{props.data.nama}</div>
        <div className={card.dataKeterangan}>{props.data.keterangan}</div>
        {props.data.harga_awal !== props.data.harga_jual ? (
          <div>
            <div className={card.dataDiscount}>
              <div className={card.dataHargaAwal}>
                Rp. {numberWithDots(props.data.harga_awal)}
              </div>
              <div className={card.discount}>-{discount}%</div>
            </div>
            <div className={card.dataHargaJual}>
              NOW Rp. {numberWithDots(props.data.harga_jual)}
            </div>
          </div>
        ) : (
          <div className={card.dataNotDiscount}>
            <div className={`${card.dataHargaJual} ${card.notDiscount}`}>
              Rp. {numberWithDots(props.data.harga_jual)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
