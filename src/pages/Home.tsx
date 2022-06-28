import axios from "axios";
import { useLayoutEffect, useState } from "react";
import { CardComponent, SkeletonComponent } from "../component/PromoComponent";
import NavbarComponent from "../component/NavbarComponent";
import home from "../css/Home.module.css";
import { API_SERVER_ORDER } from "../utils/api";
import { BANNERS_PATH } from "../utils/images";
import ChatComponent from "../component/ChatComponent";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import SearchComponent from "../component/SearchComponent";
import { setDataSearch } from "../features/searchSlice";
import { getBasket, getOrderCart } from "../utils/utils";

export default function Home() {
  const [dataCurrentPage, setDataCurrentPage] = useState<any>();
  const [basket, setBasket] = useState<any>();
  const [orderCart, setOrderCart] = useState<any>(null);

  // Redux
  const dispatch = useAppDispatch();
  const searchData = useAppSelector((state) => state.search.dataSearch);
  const userData = useAppSelector((state) => state.user.data);

  useLayoutEffect(() => {
    dispatch(setDataSearch([]));
    getBasket(setBasket);
    getOrderCart(userData,setOrderCart);
    getProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getProduct = () => {
    axios
      .get(API_SERVER_ORDER + "Product")
      .then((res) => {
        setDataCurrentPage(res.data);
        console.log("setDataCurrentPage : ", res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <NavbarComponent />
      <ChatComponent />
      {searchData?.length > 0 ? (
        <SearchComponent />
      ) : (
        <div>
          {/* Banner */}
          <div className={home.body}>
            <img
              className={home.imgBanner}
              src={BANNERS_PATH + "steal_deal.jpg"}
              alt="steal_deal.jpg"
            ></img>
          </div>
          {/* Special Untukmu */}
          <div className={`${home.body} ${home.promo}`}>
            <div className={home.headerContent}>SPECIAL UNTUKMU</div>
            <div className={home.content}>
              {/* Products */}
              {dataCurrentPage?.length > 0 ? (
                <div className={home.produk}>
                  {dataCurrentPage?.map((data: any, index: number) => {
                    return (
                      <CardComponent
                        key={index}
                        data={data}
                        basket={basket}
                        setBasket={setBasket}
                        orderCart={orderCart}
                        userData={userData}
                      />
                    );
                  })}
                </div>
              ) : (
                <div className={home.produk}>
                  {Array.from(Array(8), (_e, index) => {
                    // Skeleton
                    return <SkeletonComponent key={index} />;
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
