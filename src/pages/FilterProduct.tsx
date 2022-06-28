import axios from "axios";
import { useEffect, useLayoutEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import NavbarComponent from "../component/NavbarComponent";
import { API_SERVER_ORDER } from "../utils/api";
import filterProduct from "../css/FilterProduct.module.css";
import { CardComponent, SkeletonComponent } from "../component/PromoComponent";
import { setDataSearch } from "../features/searchSlice";
import SearchComponent from "../component/SearchComponent";
import { getBasket, getOrderCart } from "../utils/utils";

export default function FilterProduct() {
  const [dataCurrentPage, setDataCurrentPage] = useState<any>(null);
  const [basket, setBasket] = useState<any>();
  const [orderCart, setOrderCart] = useState<any>(null);

  // Redux
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.user.data);
  const searchData = useAppSelector((state) => state.search.dataSearch);
  const categoryGender = useAppSelector((state) => state.category.gender);
  const categoryType = useAppSelector((state) => state.category.type);

  useLayoutEffect(() => {
    dispatch(setDataSearch([]));
    getBasket(setBasket);
    getOrderCart(userData, setOrderCart);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const data = {
      type: categoryType,
      gender: categoryGender,
    };
    axios
      .post(API_SERVER_ORDER + "Product/search", data)
      .then((res) => {
        setDataCurrentPage(res.data);
        console.log("setDataCurrentPage : ", res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryGender, categoryType]);

  return (
    <div>
      <NavbarComponent />
      {searchData.length > 0 ? (
        <SearchComponent />
      ) : (
        <div className={filterProduct.body}>
          <div className={filterProduct.headerBody}>
            {categoryGender} {categoryType}
          </div>
          <div className={filterProduct.content}>
            {dataCurrentPage?.length > 0 ? (
              <div className={filterProduct.contentProduct}>
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
              <div className={filterProduct.contentProduct}>
                {Array.from(Array(8), (_e, index) => {
                  // Skeleton
                  return <SkeletonComponent key={index} />;
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
