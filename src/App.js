import React, {Fragment, useState, useEffect} from "react";
import { BrowserRouter as Router,  } from "react-router-dom";
import Horizontal from "./components/Horizontal";
import Cards from "./components/Cards";
import { message, Switch } from 'antd';
import { Modal } from 'react-bootstrap';
import axios from "axios";


function App() {
  const [toggle, setToggle] = useState(false);
  const [view, setView] = useState(false);

  //API
  const [show, setshow] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(40);

  //form 
  let [username, setUsername] = useState([]);
  let [email, setEmail] = useState([]);
  let [address, setAddress] = useState([]);
  let [phonenumber, setPhoneNumber] = useState([]);
  
  useEffect(() => {
    async function getData(){
    const res = await axios.get(`https://jsonplaceholder.typicode.com/posts`).then(data=>data.data);
    setshow(res);
    // setPosts(res);
   }
    getData();
    
    }, []);

 
    
//Handleform

let handleUsername = (e) =>{
  username = e.target.value;
  setUsername(username);
  console.log(username)
}

let handleAddress = (e) =>{
  address = e.target.value;
  setAddress(address);
  console.log(address)
}

let handleEmail = (e) =>{
  email = e.target.value;
  setEmail(email);
  console.log(email)
}


const handlePhoneNumber = (e) =>{
  if(phonenumber.value < 10 || phonenumber.value > 10 ){
    message.error('Please put valid 10 digit  PhoneNumber');
  }
  else{
  phonenumber = e.target.value;
    setPhoneNumber(phonenumber);}
  console.log(phonenumber);
}


//GET CURRENT POSTS
const indexOfLastPost = currentPage * postsPerPage;
const indexOfFirstPost = indexOfLastPost - postsPerPage;
const currentPosts = show.slice(indexOfFirstPost, indexOfLastPost);

//Current page
const paginate = (pageNumber) => setCurrentPage(pageNumber);



  const toggler = () => {
     toggle? setToggle(false): setToggle(true)
  }
   
  const  handleModel = (e) => {
    setView(!view);
     }


    
      
    

    const handleSubmit = (e) =>{
      sessionStorage.setItem('Name', username);
      sessionStorage.setItem('Address', address);
      sessionStorage.setItem('Email', email);
      sessionStorage.setItem('PhoneNumber', phonenumber);
      console.log(username,address,email,phonenumber);
      console.log('Submitted');
     }
   
  return (
    <Fragment>
  <div className='side'>
  <div className='sidebox1'>
     <strong>Hi Reader,</strong> <br/>
     Here's your News! 
  </div><br/>

  <div className='sidebox2'> 
  <strong>View Toggle</strong><br/><br/>
  
   <Switch  onClick={toggler}/>
   </div><br/>

   <div className='sidebox3'>
   <strong>Have a Feedback?</strong><br/><br/>
   <button type="button" class="btn btn-primary" onClick={(e)=>{handleModel(e)}} >
     We're Listening!</button>
    
     <Modal className= 'model' show= {view} onHide={(e)=>{handleModel(e)}}>
        
     <Modal.Body >
            <div class='left-model'>
      <div class='sidebox1'>
     <strong>Hi Reader,</strong> <br/>
     Here's your News! 
     </div><br/><br/>

     <div class='sidebox2'>
     <strong>Have a Feedback?</strong><br/><br/>
     <button type="button" class="btn btn-danger " onClick={(e)=>{handleModel(e)}} >
           We're Listening!</button>
      </div></div>
      
      <div className='model-right'>
        <div className="form-edit">
       <h3> Thank you so much for taking the time!</h3> 
       <div>Please provide the below details!</div><br/>

     
       <form  onSubmit="return myfun()">
                    <div className="form-group" >
                    <label htmlFor="name">Name</label>
                     <input 
                     id="name" type="text" className="form-control form-control-sm"
                     placeholder="Your Name"
                     onChange={handleUsername}
                     value={username}
                     required
                     /></div>
                     
                     

                    <div className="form-group">
                     <label htmlFor="name">Address</label>
                     <textarea 
                     class="form-control" 
                     id="exampleFormControlTextarea1" 
                     value={address}
                     onChange={handleAddress}
                     required
                     rows="3"></textarea>
                     </div>
                     
                     <div class="form-group">
                    <label for="exampleFormControlInput1">Email address</label>
                    <input 
                    value={email}
                    required
                    onChange={handleEmail}
                    type="email" 
                    class="form-control form-control-sm" 
                    id="exampleFormControlInput1" 
                    placeholder="name@example.com"/>
                    
                    </div>

                      <div className="form-group">
                         <label htmlFor="number">Phone Number</label>
                         <input type="tel" className="form-control form-control-sm"
                         pattern="[0-9]{10}"
                         placeholder="Your Phone Number"
                         onChange={handlePhoneNumber} 
                         value={phonenumber}
                         required
                         id="phonenumber"
                         />
                         <span id="messages"></span>
                       
                     </div>

                    
                     
                     <br/>


                     <button 
                     onClick={(e) => {handleSubmit(e)}}
                    
                     class="btn btn-primary" type="submit">Submit Feedback</button>

                     
            </form>
            
            </div>
       </div>
      </Modal.Body>


            </Modal>
           
           
   </div>
   </div>
   <Router>
   {toggle? <Cards  posts={currentPosts} postsPerPage={postsPerPage} totalPosts={show.length} paginate={paginate}/> : <Horizontal setshow={setshow} posts={currentPosts} postsPerPage={postsPerPage} totalPosts={show.length} paginate={paginate}/>}
   
   </Router>

   </Fragment>
  
    
  );
}

export default App;
