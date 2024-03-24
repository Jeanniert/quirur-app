import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import storage from "../Storage/storage";
import { sendRequest } from "../functions";
import "../assets/navbar.css";

export const show_alerta = (msj, icon) => {
  Swal.fire({ title: msj, icon: icon, buttonsStyling: true });
};

const Nav = () => {
  const go = useNavigate();
  const fecha = new Date();
  const meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Setiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  const dias = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
  ];
  const date =
    dias[fecha.getDay()] +
    " " +
    fecha.getDate() +
    " de " +
    meses[fecha.getMonth()] +
    ", " +
    fecha.getFullYear();

  const logout = async () => {
    const res = await sendRequest("GET", "", "api/postgraduate/logout", "");
    if (res.status == true) {
      storage.remove("authToken");
      storage.remove("authUser");
      go("/");
      show_alerta(res.message, "success");
    }
  };

  return (
    <header>
      <nav className="navbar navbar-expand-md fixed-top">
        <div className="container-fluid">
          <a className="navbar-brand mt-2 mt-lg-0" href="#">
            <img
              src="/naykana-dark.png"
              height="40"
              alt="Enfermeria"
              loading="lazy"
            />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
              <li className="nav-item">
                <h6>{date}</h6>
              </li>
            </ul>

            <div className="btn-group dropstart">
              <a
                href="#"
                className="align-items-left text-dark text-decoration-none dropdown-toggle"
                id="dropdownUser1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <strong>
                  {storage.get("authUser").name}{" "}
                  <i className="fa-solid fa-circle-user"></i>
                </strong>
              </a>
              <ul className="dropdown-menu">
                <li>
                  <button className="dropdown-item btn" onClick={logout}>
                    <i
                      className="fa-solid fa-right-from-bracket"
                      width="24"
                      height="24"
                    ></i>
                    Cerrar sesión
                  </button>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </nav>
    </header>
  );
};

export default Nav;
