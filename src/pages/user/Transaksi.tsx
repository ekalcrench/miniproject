import axios from "axios";
import { useEffect, useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import NavbarComponent from "../../component/NavbarComponent";
import SearchComponent from "../../component/SearchComponent";
import { TransaksiComponent } from "../../component/TransaksiComponent";
import { TransaksiJudul } from "../../component/TransaksiJudul";
import transaksi from "../../css/Transaksi.module.css";
import { setDataSearch } from "../../features/searchSlice";
import { API_SERVER_ORDER } from "../../utils/api";

export default function Transaksi() {
  const [ongoing, setOngoing] = useState<any>(null);
  const [ongoingDetail, setOngoingDetail] = useState<any>(null);
  const [status, setStatus] = useState<number>(0);

  let judul = <TransaksiJudul status={status} setStatus={setStatus} />;

  // Redux
  const dispatch = useAppDispatch();
  const searchData = useAppSelector((state) => state.search.dataSearch);
  const userData = useAppSelector((state) => state.user.data);

  // ComponentDidMount
  useLayoutEffect(() => {
    dispatch(setDataSearch([]));
    getOnGoing();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let ongoingDetailTemp: any = [];
    ongoing?.map(async (data: any) => {
      const result = await axios.get(
        API_SERVER_ORDER + "OrderDetail/" + data.id
      );
      if (ongoingDetailTemp.length > 0) {
        ongoingDetailTemp = [...ongoingDetailTemp, ...result.data];
      } else {
        ongoingDetailTemp = result.data;
      }
      console.log("ongoingDetailTemp : ", ongoingDetailTemp);
      console.log("result data : ", result.data);
      // setOngoingDetail di taruh di dalam mappning supaya bisa mendapatkan nilai ongoingDetailTemp Terakhir, 
      // kalau diluar tetap null dikarenakan async
      setOngoingDetail(ongoingDetailTemp);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ongoing]);

  useEffect(() => {
    console.log("ongoingDetail : ", ongoingDetail);
  });

  const getOnGoing = () => {
    axios
      .get(API_SERVER_ORDER + "Order/ongoing/" + userData.userId)
      .then((res) => {
        setOngoing(res.data);
        console.log("setOngoing : ", res.data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <NavbarComponent />
      {searchData.length > 0 ? (
        <SearchComponent />
      ) : (
        <div className={transaksi.body}>
          {ongoingDetail?.length > 1 ? (
            <div>
              {judul}
              {/* Product */}
              {/* eslint-disable-next-line array-callback-return */}
              {ongoingDetail.map((data: any, index: number) => {
                if (status === data.status) {
                  return <TransaksiComponent key={index} data={data} />;
                } else if (status === 0) {
                  return <TransaksiComponent key={index} data={data} />;
                }
              })}
            </div>
          ) : (
            <div>
              {/* Header */}
              <div className={transaksi.background}>
                <div className={transaksi.headerKosong}>
                  BELUM ADA RIWAYAT TRANSAKSI
                </div>
              </div>
              <div className={transaksi.background}>
                <div
                  className={`${transaksi.content} ${transaksi.contentKosong}`}
                >
                  <Link to="/">
                    <button className={transaksi.lanjutBelanja}>
                      LANJUT BELANJA
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
