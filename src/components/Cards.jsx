import React,{Fragment, useEffect, useState} from 'react';
import axios from "axios";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import {Modal}  from 'react-bootstrap';
import Paginations from './Paginations';


const Cards = ({posts, postsPerPage, totalPosts, paginate}) => {
    
    const [view, setView] = useState(false);

    const[array, setArray] = useState([]);
    
    useEffect(() => {
      setArray([...posts]);
    }, [posts]);

    const deleteShow = (id) => {
       const newArray = array.filter((ele)=>ele.id!=id);
       setArray(newArray);
    }
    

return(
  <div className='root'>
  <div className='row'>{
 array.map(shows=>{
  return (
    <div class="col-md-3 no-margin no-padding" >
  
  <div  key= {shows.id} ><br/>
  

  <button onClick={() => deleteShow(shows.id)}
      style={{
         
          float:'right', 
          fontWeight: 'bold', 
          color: 'red',
          borderColor: 'red',
          borderRadius: '1rem'
        
          
          }}> X</button>

  <button style={{decoration: 'none', borderColor: 'white', alignText: 'left', border: '0rem'}} onClick={() => setView(true)} >
  <div className='cards' style={{background:"white", fontFamily:"sans-serif" }} >
    
  
  <strong style={{fontweight: '1rem'}}>{shows.title}
     </strong>
      <div style={{fontFamily: 'monospace'}}>{shows.body}</div>
      </div>
      </button>
    </div>
    
   <Modal
        show={view}
        onHide={() => setView(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            {shows.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            {shows.body}
          </p>
        </Modal.Body>
      </Modal>
   </div> 


   )         
        }) } <Paginations postsPerPage={postsPerPage} totalPosts={totalPosts} paginate={paginate} /> </div></div>
      );

} 

export default Cards;