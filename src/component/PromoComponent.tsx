import card from "../css/Card.module.css";
import { PRODUCTS_PATH } from "../utils/images";
import { numberWithDots } from "../utils/utils";

type PropsType = {
  data: any;
  masukKeranjang: any;
};

export const CardComponent = (props: PropsType) => {
  const discount = Math.floor(
    ((props.data.hargaAwal - props.data.hargaJual) / props.data.hargaAwal) *
      100
  );

  return (
    <div
      onClick={() => props.masukKeranjang(props.data.id)}
      className={card.homeCard}
    >
      <img
        className={card.homeImg}
        src={PRODUCTS_PATH + props.data.img}
        alt={props.data.img}
      ></img>
      <div className={card.homeBody}>
        <div className={card.dataNama}>{props.data.name}</div>
        <div className={card.dataKeterangan}>{props.data.keterangan}</div>
        {props.data.hargaAwal !== props.data.hargaJual ? (
          <div>
            <div className={card.dataDiscount}>
              <div className={card.dataHargaAwal}>
                Rp. {numberWithDots(props.data.hargaAwal)}
              </div>
              <div className={card.discount}>-{discount}%</div>
            </div>
            <div className={card.dataHargaJual}>
              NOW Rp. {numberWithDots(props.data.hargaJual)}
            </div>
          </div>
        ) : (
          <div className={card.dataNotDiscount}>
            <div className={`${card.dataHargaJual} ${card.notDiscount}`}>
              Rp. {numberWithDots(props.data.hargaJual)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const SkeletonComponent = () => {
  return (
    <div className={card.homeCard}>
      <div className={card.skeletonImage}></div>
      <div className={card.skeletonDataNama}></div>
      <div className={card.skeletonDataKeterangan}></div>
      <div className={card.skeletonDataHarga}></div>
    </div>
  );
};
