import React, { useEffect, useState, useRef, Fragment } from "react";
import { PaginationControl } from "react-bootstrap-pagination-control";
import { confirmation, sendRequest } from "../functions";
import Nav from "../Components/Nav";
import DivAdd from "../Components/DivAdd";
import Table from "../Components/Table";
import Modal from "../Components/Modal";
import DivInput from "../Components/DivInput";
import "../assets/navbar.css"
import ReportPaticipant from "../Components/ReportPaticipant";
import {PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";


const Home = () => {

    const [identification_number, setIdentification_number]= useState('');
    const [firstName, setFirstName]= useState('');
    const [lastName, setLastName]= useState('');
    const [email, setEmail]= useState('');
    const [phone, setPhone]= useState('');
    const [gradeOfSchooling, setGradeOfSchooling]= useState('');

    const [participants, setParticipants]= useState([]);
    const [title, setTitle] = useState("");
    const [classLoad, setClassLoad] = useState("");
    const [classTable, setClassTable] = useState("d-none");
    const [rows, setRows] = useState(0);
    const [page, setPage] = useState(1);
    const [pageSize,setPageSize]= useState(0);
    const [operation,setOperation]= useState();
    const NameInput= useRef();
    const [id,setId]= useState('');
    const close= useRef();
    const borderColor = '#90e5fc';

  useEffect(() => {
    getParticipants(1);
  }, []);

  const getParticipants= async(page)=>{
    
    const res= await sendRequest('GET','','api/postgraduate/participants?page='+page);
    setParticipants(res.data);
    setRows(res.total);
    setPageSize(res.per_page);
    setClassTable('');
    setClassLoad('d-none');
  }
 
  const createUpdate= async(e)=>{
    e.preventDefault();
    const form= { identification_number:identification_number, firstName:firstName, lastName:lastName,
        email:email, phone:phone, gradeOfSchooling:gradeOfSchooling};
    if (operation == 1) {
      const res= await sendRequest('POST',form,'api/postgraduate/participants', '');
      if (res.status == true) {
        clear()
        getParticipants(page);
        close.current.click();            
      }
    }else{
      const res= await sendRequest('PUT',form,'api/postgraduate/participants/'+id, '');
      if (res.status == true) {
        getParticipants(page);
        close.current.click();      
      }
    }

  }

  const deletePrticipant= (id, name)=> {
    confirmation(name,'api/postgraduate/participants/'+id,'inicio');
  }

  const handleGradeOfSchooling = (e) => {
    setGradeOfSchooling(e.target.value);
  };

  const openModal= (op,identification_number, firstName, lastName,email,phone, gradeOfSchooling,id)=> {
    clear();
    setOperation(op);
    setId(id);

    if (op == 1) {
      setTitle('Nuevo Participante');  

    }
    if (op == 3) {
      setTitle('Reporte de Participantes');  

    }
    
    if (op == 2){
        setTitle('Actualizar Participante');
        setIdentification_number(identification_number);
        setFirstName(firstName);
        setLastName(lastName);
        setGradeOfSchooling(gradeOfSchooling);
        setPhone(phone);
        setEmail(email);
    }
  }
  const clear = () => {
    setIdentification_number('');
    setFirstName('');
    setLastName('');
    setGradeOfSchooling('');
    setPhone('');
    setEmail('');
  };

  const goPage= (p)=> {
    setPage(p);
    setParticipants(p);
  }
  return (
    <>
      <Nav />
<main className="flex-shrink-0">
  <div className="container">
  <div className="card" >
          <div className="card-header">PARTICIPANTES</div>

          <DivAdd>
          <div className="d-grid gap-2 d-md-block">
            <button
              className="btn btn-info btn-sm"
              data-bs-toggle="modal"
              data-bs-target="#modalParticipant"
              onClick={() => openModal(1)}
            >
              <i className="fa fa-solid fa-circle-plus"></i> añadir
            </button>

            <button
              className=" ms-1 btn btn-warning btn-sm"
              data-bs-toggle="modal"
              data-bs-target="#modalReport"
              onClick={() => openModal(3)}
            >
              <i className="fa fa-solid fa-chart-pie"></i> Reportes
            </button>
            </div>
          </DivAdd>

          <div className="card-body">
            <Table
              col="10"
              off="1"
              classLoad={classLoad}
              classTable={classTable}
            >
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>N°</th>
                    <th>Cedula</th>
                    <th>Participante</th>
                    <th>Correo electrónico</th>
                    <th>Grado de instrucción</th>
                    <th>Opciones</th>
                  </tr>
                </thead>
                <tbody className="table-group-divider">
                  {participants.map((row, i) => (
                    <tr key={row.id}>
                      <td>{i + 1}</td>
                      <td>{row.identification_number}</td>
                      <td>{row.firstName+' '+row.lastName}</td>
                      <td>{row.email}</td>
                      <td>{row.gradeOfSchooling}</td>
                      <td>
                        <button className='btn btn-warning btn-sm' data-bs-toggle='modal' data-bs-target='#modalParticipant' 
                        onClick={()=> openModal(2,row.identification_number,row.firstName, row.lastName, row.email,row.phone, row.gradeOfSchooling, row.id)}>
                        <i className='fa fa-solid fa-edit'></i>
                        </button>

                        <button className='ms-1 btn btn-danger btn-sm ' onClick={()=> deletePrticipant(row.id, row.firstName+' '+row.lastName)}>
                            <i className='fa fa-solid fa-trash'></i>
                        </button>
                    </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <PaginationControl
                changePage={(page) => goPage(page)}
                next={true}
                limit={pageSize}
                page={page}
                total={rows}
              />
            </Table>
          </div>

          <Modal title={title} modal="modalParticipant">
            <div className="modal-body">
              <form onSubmit={createUpdate}>
               
                <DivInput
                  type="text"
                  icon="fa fa-solid fa-address-card"
                  value={identification_number}
                  className="form-control"
                  placeholder="CEDULA"
                  required="required"
                  handleChange={(e) => {
                    const newValue = e.target.value;
                  if (/^[0-9]*$/.test(newValue)) {
                    setIdentification_number(newValue);
                  }}}
                />

                <DivInput
                  type="text"
                  icon="fa fa-solid fa-id-badge"
                  value={firstName}
                  className="form-control"
                  placeholder="NOMBRES"
                  required="required"
                  handleChange={(e) => {
                    const newValue = e.target.value;
                    if (/^[A-Za-z\s]*$/.test(newValue)) {
                      setFirstName(newValue);
                    }
                  }}
                />

                <DivInput
                  type="text"
                  icon="fa fa-solid fa-id-badge"
                  value={lastName}
                  className="form-control"
                  placeholder="APELLIDOS"
                  required="required"
                  handleChange={(e) => {
                    const newValue = e.target.value;
                    if (/^[A-Za-z\s]*$/.test(newValue)) {
                      setLastName(newValue);
                    }
                  }}
                />

                
                    <div className='input-group mb-3'>
                        <span className='input-group-text'>
                            <i className='fa fa-solid fa-graduation-cap'></i>
                        </span>
                    <select
                    className="form-control"
                    name="gradeOfSchooling"
                    onChange={(e) => {handleGradeOfSchooling(e); }}
                    value={gradeOfSchooling}
                    >
                        <option > GRADO DE INSTRCCIÓN...</option>
                        <option value="Técn">Técn</option>
                        <option value="Lcdo./Lcda">Lcdo./Lcda</option>
                        <option value="Medico">Medico</option>
                        <option value="Especialista">Especialista</option>
                    </select>
                </div>

                <DivInput
                  type="text"
                  icon="fa fa-solid fa-at"
                  value={email}
                  className="form-control"
                  placeholder="CORREO ELECTRÓNICO"
                  required="required"
                  handleChange={(e) => setEmail(e.target.value)}
                />
                
                <DivInput
                  type="text"
                  icon="fa fa-solid fa-phone"
                  value={phone}
                  className="form-control"
                  placeholder="TELEFONO"
                  required="required"
                  handleChange={(e) =>{
                      const newValue = e.target.value;
                    if (/^[0-9]*$/.test(newValue)) {
                      setPhone(newValue);
                    }}}
                />
                

                <div className="d-grid col-10 mx-auto">
                  <button className="btn btn-success">
                    <i className="fa fa-solid fa-save"></i> Guardar
                  </button>
                </div>
              </form>
            </div>

            <div className='modal-footer'>
          <button
                  className="btn btn-dark"
                  data-bs-dismiss="modal"
                  ref={close}
                  hidden
                ></button>
          </div>
          </Modal>

          <Modal title={title} modal="modalReport">
          <PDFViewer style={{with:"100%", height:"400px"}} >
          <ReportPaticipant  data={participants}/>
        </PDFViewer>   
            <div className='modal-footer'>
              <div class="d-grid gap-2 d-md-block">
              <button className='btn btn-danger btn-sm' data-bs-dismiss='modal' ref={close}>
                  <i className="fa fa-solid fa-arrow-right-from-bracket"></i> Cerrar
                </button>

                <PDFDownloadLink document={<ReportPaticipant data={participants}/>} fileName={'participantes.pdf'}>
                {({ loading, url, error, blob }) =>
                  loading ? (
                    <button className='ms-1 btn btn-success btn-sm'> Cargando reporte ...</button>
                  ) : (
                    <button className='ms-1 btn btn-success btn-sm'>
                      <i className="fa fa-solid fa-chart-pie"></i> Generar reporte 
                      </button>
                  )
                }
              </PDFDownloadLink>
              </div>
            
          </div>
          </Modal>

        </div>
  </div>
</main>
    </>
  );
};

export default Home;
