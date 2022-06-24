import transaksi from "../css/Transaksi.module.css";

type PropsType = {
  status: number;
  setStatus: any;
};

export const TransaksiJudul = (props: PropsType) => {
  if (props.status === 1) {
    return (
      <div className={transaksi.rowJudul}>
        <div className={transaksi.colJudul}>
          <button
            onClick={() => props.setStatus(0)}
            className={transaksi.judulButton}
          >
            SEMUA
          </button>
        </div>
        <div className={transaksi.colJudul}>
          <button
            onClick={() => props.setStatus(1)}
            className={`${transaksi.judulButton} ${transaksi.aktif}`}
          >
            BELUM DIBAYAR
          </button>
        </div>
        <div className={transaksi.colJudul}>
          <button
            onClick={() => props.setStatus(2)}
            className={transaksi.judulButton}
          >
            SUDAH DIBAYAR
          </button>
        </div>
      </div>
    );
  } else if (props.status === 2) {
    return (
      <div className={transaksi.rowJudul}>
        <div className={transaksi.colJudul}>
          <button
            onClick={() => props.setStatus(0)}
            className={transaksi.judulButton}
          >
            SEMUA
          </button>
        </div>
        <div className={transaksi.colJudul}>
          <button
            onClick={() => props.setStatus(1)}
            className={transaksi.judulButton}
          >
            BELUM DIBAYAR
          </button>
        </div>
        <div className={transaksi.colJudul}>
          <button
            onClick={() => props.setStatus(2)}
            className={`${transaksi.judulButton} ${transaksi.aktif}`}
          >
            SUDAH DIBAYAR
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className={transaksi.rowJudul}>
        <div className={transaksi.colJudul}>
          <button
            onClick={() => props.setStatus(0)}
            className={`${transaksi.judulButton} ${transaksi.aktif}`}
          >
            SEMUA
          </button>
        </div>
        <div className={transaksi.colJudul}>
          <button
            onClick={() => props.setStatus(1)}
            className={transaksi.judulButton}
          >
            BELUM DIBAYAR
          </button>
        </div>
        <div className={transaksi.colJudul}>
          <button
            onClick={() => props.setStatus(2)}
            className={transaksi.judulButton}
          >
            SUDAH DIBAYAR
          </button>
        </div>
      </div>
    );
  }
};
