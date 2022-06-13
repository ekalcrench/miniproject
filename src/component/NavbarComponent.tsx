import { faCartShopping, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import navbar from "../css/Navbar.module.css";

export default function NavbarComponent() {
  const [search, setSearch] = useState<string>("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    console.log("search : ", search);
  };

  const handleSubmit = (event: { preventDefault: any }) => {
    event.preventDefault();
    console.log("SUBMIT");
  };

  return (
    <div className={navbar.nav}>
      <div className={navbar.row}>
        <div className={`${navbar.header} ${navbar.col}`}>
          <Link to="/" className={navbar.link}>
            FASHIONBOX
          </Link>
        </div>
        {/* PRIA */}
        <div className={`${navbar.body} ${navbar.col} ${navbar.dropdownLeft}`}>
          <button className={`${navbar.dropdownButton} ${navbar.bodyButton}`}>
            PRIA
          </button>
          <div
            className={`${navbar.dropdownContent} ${navbar.dropdownContentLeft}`}
          >
            <Link to="/" className={`${navbar.link} ${navbar.linkLeft}`}>
              TERBARU
            </Link>
            <Link to="/" className={`${navbar.link} ${navbar.linkLeft}`}>
              PAKAIAN
            </Link>
            <Link to="/" className={`${navbar.link} ${navbar.linkLeft}`}>
              CELANA
            </Link>
            <Link to="/" className={`${navbar.link} ${navbar.linkLeft}`}>
              SEPATU
            </Link>
            <Link to="/" className={`${navbar.link} ${navbar.linkLeft}`}>
              JAM & AKSESORIS
            </Link>
            <Link to="/" className={`${navbar.link} ${navbar.linkLeft}`}>
              BATIK
            </Link>
            <Link to="/" className={`${navbar.link} ${navbar.linkLeft}`}>
              SPORTS
            </Link>
          </div>
        </div>
        {/* WANITA */}
        <div className={`${navbar.body} ${navbar.col} ${navbar.dropdownLeft}`}>
          <button className={`${navbar.dropdownButton} ${navbar.bodyButton}`}>
            WANITA
          </button>
          <div
            className={`${navbar.dropdownContent} ${navbar.dropdownContentLeft} ${navbar.dropdownContentWanita}`}
          >
            <Link to="/" className={`${navbar.link} ${navbar.linkLeft}`}>
              TERBARU
            </Link>
            <Link to="/" className={`${navbar.link} ${navbar.linkLeft}`}>
              PAKAIAN
            </Link>
            <Link to="/" className={`${navbar.link} ${navbar.linkLeft}`}>
              CELANA
            </Link>
            <Link to="/" className={`${navbar.link} ${navbar.linkLeft}`}>
              SEPATU
            </Link>
            <Link to="/" className={`${navbar.link} ${navbar.linkLeft}`}>
              JAM & AKSESORIS
            </Link>
            <Link to="/" className={`${navbar.link} ${navbar.linkLeft}`}>
              BATIK
            </Link>
            <Link to="/" className={`${navbar.link} ${navbar.linkLeft}`}>
              SPORTS
            </Link>
          </div>
        </div>
        {/* ANAK */}
        <div className={`${navbar.body} ${navbar.col} ${navbar.dropdownLeft}`}>
          <button className={`${navbar.dropdownButton} ${navbar.bodyButton}`}>
            ANAK
          </button>
          <div
            className={`${navbar.dropdownContent} ${navbar.dropdownContentLeft} ${navbar.dropdownContentAnak}`}
          >
            <Link to="/" className={`${navbar.link} ${navbar.linkLeft}`}>
              TERBARU
            </Link>
            <Link to="/" className={`${navbar.link} ${navbar.linkLeft}`}>
              PAKAIAN
            </Link>
            <Link to="/" className={`${navbar.link} ${navbar.linkLeft}`}>
              CELANA
            </Link>
            <Link to="/" className={`${navbar.link} ${navbar.linkLeft}`}>
              SEPATU
            </Link>
            <Link to="/" className={`${navbar.link} ${navbar.linkLeft}`}>
              JAM & AKSESORIS
            </Link>
            <Link to="/" className={`${navbar.link} ${navbar.linkLeft}`}>
              BATIK
            </Link>
            <Link to="/" className={`${navbar.link} ${navbar.linkLeft}`}>
              SPORTS
            </Link>
          </div>
        </div>
        {/* SEARCH */}
        <div className={`${navbar.search} ${navbar.col}`}>
          <form onSubmit={handleSubmit}>
            <input
              className={navbar.input}
              placeholder="Cari di Fashionbox..."
              type="text"
              name="search"
              value={search}
              onChange={(event) => handleChange(event)}
            />
          </form>
        </div>
        <div className={`${navbar.col} ${navbar.keranjang} `}>
          <Link to="/keranjang" className={navbar.link}>
            <FontAwesomeIcon
              className={`${navbar.icon}`}
              icon={faCartShopping}
            />
          </Link>
        </div>
        <div className={`${navbar.col} ${navbar.dropdownRight} `}>
          <button className={`${navbar.dropdownButton} `}>
            <FontAwesomeIcon className={`${navbar.icon}`} icon={faUser} />
          </button>
          <div className={`${navbar.dropdownContent} `}>
            <Link to="/daftar" className={`${navbar.link} ${navbar.linkRight}`}>
              DAFTAR
            </Link>
            <hr/>
            <Link to="/login" className={`${navbar.link} ${navbar.linkRight}`}>
              LOG IN
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
