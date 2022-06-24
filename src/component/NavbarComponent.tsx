import { faCartShopping, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import navbar from "../css/Navbar.module.css";
import { setGender, setType } from "../features/categorySlice";
import { setLogout } from "../features/userSlice";

export default function NavbarComponent() {
  const [search, setSearch] = useState<string>("");

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
        {/* MALE */}
        <div className={`${navbar.body} ${navbar.col} ${navbar.dropdownLeft}`}>
          <button className={`${navbar.dropdownButton} ${navbar.bodyButton}`}>
            MALE
          </button>
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
            <div onClick={() => handleCategory("male", "accessories")}>
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
