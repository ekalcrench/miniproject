import { useLayoutEffect, useState } from "react";
import { useAppSelector } from "../app/hooks";
import search from "../css/FilterProduct.module.css";
import { getBasket, getOrderCart } from "../utils/utils";
import { CardComponent } from "./PromoComponent";

export default function SearchComponent() {
  const [basket, setBasket] = useState<any>();
  const [orderCart, setOrderCart] = useState<any>(null);

  // Redux
  const userData = useAppSelector((state) => state.user.data);
  const searchData = useAppSelector((state) => state.search.dataSearch);

  useLayoutEffect(() => {
    getBasket(setBasket);
    getOrderCart(userData, setOrderCart);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className={search.body}>
        <div className={search.headerBody}>SEARCHING RESULT</div>
        <div className={search.content}>
          <div className={search.contentProduct}>
            {searchData?.map((data: any, index: number) => {
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
        </div>
      </div>
    </div>
  );
}
