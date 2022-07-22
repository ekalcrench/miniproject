import { faCartShopping, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import navbar from "../css/Navbar.module.css";
import { setGender, setType } from "../features/categorySlice";
import { setDataSearch } from "../features/searchSlice";
import { setLogout } from "../features/userSlice";
import { API_SERVER_ORDER } from "../utils/api";

export default function NavbarComponent() {
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // Redux
  const dispatch = useAppDispatch();
  const userIdLoggedIn = useAppSelector((state) => state.user.isLoggedIn);

  const handleCategory = (gender: string, type: string) => {
    dispatch(setGender(gender));
    dispatch(setType(type));
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    console.log("search : ", search);
  };

  const handleSubmit = (event: { preventDefault: any }) => {
    event.preventDefault();
    setLoading(true);
  };

  // Searching
  useEffect(() => {
    if (search.length > 0) {
      if (loading) {
        console.log("Waktunya SEARCHING BOSS");
        axios
          .post(API_SERVER_ORDER + "Product/search", { name: search })
          .then((res) => {
            dispatch(setDataSearch(res.data));
            console.log("setDataSearch : ", res.data);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        // Jika data sudah lebih dari 3 karakter dan
        setTimeout(() => setLoading(true), 2000);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, loading]);

  return (
    <div className={navbar.nav}>
      <div className={navbar.row}>
        <div className={`${navbar.header} ${navbar.col}`}>
          <Link to="/" className={navbar.link}>
            FASHIONBOX
          </Link>
        </div>
        {/* MALE */}
        {/* navbar.dropdownLeft yang mengatur hidenya */}
        <div className={`${navbar.body} ${navbar.col} ${navbar.dropdownLeft}`}>
          {/* navbar.dropdownButton cursor:pointer, navbar.bodyButton mengatur text styling */}
          <button className={`${navbar.dropdownButton} ${navbar.bodyButton}`}>
            MALE
          </button>
          {/* navbar.dropdownContent display:none, navbar.dropdownContentLeft mengatur jarak dan posisi*/}
          <div
            className={`${navbar.dropdownContent} ${navbar.dropdownContentLeft}`}
          >
            <div onClick={() => handleCategory("male", "clothes")}>
              <Link
                to="/filterproduct"
                className={`${navbar.link} ${navbar.linkLeft}`}
              >
                CLOTHES
              </Link>
            </div>
            <div onClick={() => handleCategory("male", "pants")}>
              <Link
                to="/filterproduct"
                className={`${navbar.link} ${navbar.linkLeft}`}
              >
                PANTS
              </Link>
            </div>
            <div onClick={() => handleCategory("male", "shoes")}>
              <Link
                to="/filterproduct"
                className={`${navbar.link} ${navbar.linkLeft}`}
              >
                SHOES
              </Link>
            </div>
            <div onClick={() => handleCategory("male", "accessoris")}>
              <Link
                to="/filterproduct"
                className={`${navbar.link} ${navbar.linkLeft}`}
              >
                ACCESSORIES
              </Link>
            </div>
          </div>
        </div>
        {/* FEMALE */}
        <div className={`${navbar.body} ${navbar.col} ${navbar.dropdownLeft}`}>
          <button className={`${navbar.dropdownButton} ${navbar.bodyButton}`}>
            FEMALE
          </button>
          <div
            className={`${navbar.dropdownContent} ${navbar.dropdownContentLeft}`}
          >
            <div onClick={() => handleCategory("female", "clothes")}>
              <Link
                to="/filterproduct"
                className={`${navbar.link} ${navbar.linkLeft}`}
              >
                CLOTHES
              </Link>
            </div>
            <div onClick={() => handleCategory("female", "pants")}>
              <Link
                to="/filterproduct"
                className={`${navbar.link} ${navbar.linkLeft}`}
              >
                PANTS
              </Link>
            </div>
            <div onClick={() => handleCategory("female", "dress")}>
              <Link
                to="/filterproduct"
                className={`${navbar.link} ${navbar.linkLeft}`}
              >
                DRESS
              </Link>
            </div>
            <div onClick={() => handleCategory("female", "skirt")}>
              <Link
                to="/filterproduct"
                className={`${navbar.link} ${navbar.linkLeft}`}
              >
                SKIRT
              </Link>
            </div>
            <div onClick={() => handleCategory("female", "accessories")}>
              <Link
                to="/filterproduct"
                className={`${navbar.link} ${navbar.linkLeft}`}
              >
                ACCESSORIES
              </Link>
            </div>
          </div>
        </div>
        {/* KIDS */}
        <div className={`${navbar.body} ${navbar.col} ${navbar.dropdownLeft}`}>
          <button className={`${navbar.dropdownButton} ${navbar.bodyButton}`}>
            KIDS
          </button>
          <div
            className={`${navbar.dropdownContent} ${navbar.dropdownContentLeft}`}
          >
            <div onClick={() => handleCategory("kids", "clothes")}>
              <Link
                to="/filterproduct"
                className={`${navbar.link} ${navbar.linkLeft}`}
              >
                CLOTHES
              </Link>
            </div>
            <div onClick={() => handleCategory("kids", "pants")}>
              <Link
                to="/filterproduct"
                className={`${navbar.link} ${navbar.linkLeft}`}
              >
                PANTS
              </Link>
            </div>
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
          {userIdLoggedIn ? (
            <div
              className={`${navbar.dropdownContent} ${navbar.dropdownContentDashboard} `}
            >
              <Link
                to="/profil"
                className={`${navbar.link} ${navbar.linkRight}`}
              >
                PROFIL
              </Link>
              <Link
                to="/pembayaran"
                className={`${navbar.link} ${navbar.linkRight}`}
              >
                PEMBAYARAN
              </Link>
              <Link
                to="/transaksi"
                className={`${navbar.link} ${navbar.linkRight}`}
              >
                TRANSAKSI
              </Link>
              <div
                onClick={() => dispatch(setLogout())}
                className={`${navbar.link} ${navbar.linkRight}`}
              >
                LOG OUT
              </div>
            </div>
          ) : (
            <div className={`${navbar.dropdownContent} `}>
              <Link
                to="/login"
                className={`${navbar.link} ${navbar.linkRight}`}
              >
                LOG IN
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
