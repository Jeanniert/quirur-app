import React, { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { sendRequest } from "../functions";
import DivInput from "../Components/DivInput";
import storage from "../Storage/storage";
import Modal from "../Components/Modal";
import axios from "axios";

const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const close = useRef();
  const go = useNavigate();

  const csrf = async () => {
    await axios.get("/sanctum/csrf-cookie");
  };

  const clear = () => {
    setName("");
    setEmail("");
    setPassword("");
  };

  const login = async (e) => {
    e.preventDefault();
    await csrf();
    const form = { email: email, password: password };
    const res = await sendRequest("POST", form, "api/auth/login", "", false);
    if (res.status == true) {
      storage.set("authToken", res.token);
      storage.set("authUser", res.data);
      go("/inicio");
    }
  };

  const register = async (e) => {
    e.preventDefault();
    await csrf();
    const form = {
      name: name,
      email: email,
      password: password,
    };
    const res = await sendRequest(
      "POST",
      form,
      "api/auth/register",
      "",
      false
    );
    if (res.status == true) {
      clear();
      close.current.click();
    }
  };
  return (
    <div className="container-fluid">
      <div className="row mt-5">
        <div className="col-md-4 offset-md-4">
          <div className="card text-center">
            <div className="card-header">
              <img
                src="/naykana-dark.png"
                height="80"
                alt="MDB Logo"
                loading="lazy"
              />
            </div>
            <div className="card-body">
              <form onSubmit={login}>
                <DivInput
                  type="email"
                  icon="fa fa-solid fa-at"
                  value={email}
                  className="form-control form-control-lg"
                  placeholder="Correo electrónico"
                  required="required"
                  handleChange={(e) => setEmail(e.target.value)}
                />

                <DivInput
                  type="password"
                  icon="fa fa-solid fa-key"
                  value={password}
                  className="form-control form-control-lg"
                  placeholder="Contraseña"
                  required="required"
                  handleChange={(e) => setPassword(e.target.value)}
                />

                <div className="d-grid col-10 mx-auto">
                  <button className="btn btn-primary btn-lg">
                    <i className="fa fa-solid fa-door-open"></i> Iniciar sesión
                  </button>
                </div>
              </form>
            </div>
            <div className="card-footer text-muted">
              <Link data-bs-toggle="modal" data-bs-target="#modalRegister">
                <i className="fa fa-solid fa-user-plus"></i> Registrarte
              </Link>
            </div>

            <Modal title="Registrarte" modal="modalRegister">
              <div className="modal-body">
                <form onSubmit={register}>
                  <DivInput
                    type="text"
                    icon="fa fa-solid fa-user"
                    value={name}
                    className="form-control"
                    placeholder="Name"
                    required="required"
                    handleChange={(e) => setName(e.target.value)}
                  />

                  <DivInput
                    type="email"
                    icon="fa fa-solid fa-at"
                    value={email}
                    className="form-control"
                    placeholder="Email"
                    required="required"
                    handleChange={(e) => setEmail(e.target.value)}
                  />

                  <DivInput
                    type="password"
                    icon="fa fa-solid fa-key"
                    value={password}
                    className="form-control"
                    placeholder="Password"
                    required="required"
                    handleChange={(e) => setPassword(e.target.value)}
                  />
                  <div className="d-grid col-10 mx-auto">
                    <button className="btn btn-primary">
                      <i className="fa fa-solid fa-door-open"></i> Registrarte
                    </button>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-dark"
                  data-bs-dismiss="modal"
                  ref={close}
                  hidden
                ></button>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
