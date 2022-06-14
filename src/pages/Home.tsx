import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NavbarComponent from "../component/NavbarComponent";
import home from "../css/Home.module.css";
import { BANNERS_PATH, PRODUCTS_PATH } from "../utils/images";

export default function Home() {
  return (
    <div>
      <NavbarComponent />
      <div className={home.body}>
        <img
          className={home.imgBanner}
          src={BANNERS_PATH + "hype.jpg"}
          alt="hype.jpg"
        ></img>
      </div>
      <div className={`${home.body} ${home.promo}`}>
        <div className={home.headerContent}>Special Untukmu</div>
        <div className={home.content}>
          <div className={home.panah}>
            <FontAwesomeIcon className={home.panahIcon} icon={faAngleLeft} />
          </div>
          <div className={home.produk}>
            <div className={home.produkCard}>
              <img
                src={PRODUCTS_PATH + "hush-puppies-1.jpg"}
                alt="hush-puppes-1.jpg"
              ></img>
            </div>
            <div className={home.produkCard}>
              <img
                src={PRODUCTS_PATH + "hush-puppies-1.jpg"}
                alt="hush-puppes-1.jpg"
              ></img>
            </div>
            <div className={home.produkCard}>
              <img
                src={PRODUCTS_PATH + "hush-puppies-1.jpg"}
                alt="hush-puppes-1.jpg"
              ></img>
            </div>
          </div>
          <div className={home.panah}>
            <FontAwesomeIcon className={home.panahIcon} icon={faAngleRight} />
          </div>
        </div>
      </div>
      <div className={`${home.body} ${home.promo}`}>Special Hari Ini</div>
    </div>
  );
}
