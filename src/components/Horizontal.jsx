import React,{ useEffect, useState} from 'react';
import {Modal}  from 'react-bootstrap';
import Paginations from './Paginations';




const Horizontal = ({posts, postsPerPage, totalPosts, paginate}) => {

    const [view, setView] = useState(false);
 
    const[array, setArray] = useState([]);
    
    useEffect(() => {
      setArray([...posts]);
    }, [posts]);

    const deleteShow = (id) => {
       const newArray = array.filter((ele)=>ele.id!==id);
       setArray(newArray);
    }
   

return(
  <div> 
    <div className='root'>{
 
 array.map(shows=>{
   return(
  
  
  <div key= {posts.id}><br/>

 
  <button style={{decoration: 'none', borderColor: 'white', textAlign:'left', border: '0rem'}} onClick={() => setView(true)} >
    <div className='horizontal' style={{background:"white", fontFamily:"sans-serif"}}>
   
      <strong style={{fontweight: '2rem'}}>{shows.title} 
      </strong>
      <div style={{fontFamily: 'monospace'}}>{shows.body}</div>
      </div> 
      </button>
      
      <button className='btn-cross'
      style={{
          background: 'null', 
          borderRadius: '1rem',
          float:'right', 
          fontWeight: 'bold', 
          color: 'red',
          alignItems: 'center',
          borderColor: 'red'}} 
          onClick={() => deleteShow(shows.id)}
          >X</button>



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
   
})  
} <Paginations postsPerPage={postsPerPage} totalPosts={totalPosts} paginate={paginate} /> 
  
 </div></div>
    
); 

} 

export default Horizontal;