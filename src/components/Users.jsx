import React, { use, useState } from 'react'
import { Link } from 'react-router';

const Users = ({usersPromise}) => {
    const initialuser=use(usersPromise)
    // console.log(initialuser);
    const [users,setuser]=useState(initialuser);

    const handleAddUser =(e)=>{
        e.preventDefault();
        const name= e.target.name.value;
        const email=e.target.email.value;
        console.log(name,email);
        const newuser={name,email};
        console.log(newuser);

        fetch('http://localhost:5000/users',{
            method:"POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(newuser)

        })
        .then(res=>res.json())
        .then(data=>{
            console.log('after saving user',data);
            if(data.insertedId){
                newuser. _id=data.insertedId;
                const Newusers=[...users,newuser];
                setuser(Newusers);

                alert('users added successfully');
                e.target.reset()

            }
        })

    }
    const handleDeletuser=(id)=>{
        console.log('delete a user',id);
        fetch(`http://localhost:5000/users/${id}`,{
            method:"DELETE",

        })
        .then(res=>res.json())
        .then(data=>{
            console.log('after delete',data);
            if(data.deletedCount){
                alert('deleteed successfully');
                 const remainingUser=users.filter(user=>user._id !==id)
                 setuser(remainingUser);

            }
            
        })
    }
  return (
    <div className='text-center mt-14'>
        <h3> users :{users.length}</h3>
        <form onSubmit={handleAddUser} >
            <input className='border mt-2' type="text" name="name" id="" />
            <br />
            <input className='border mt-2' type="email" name="email" id="" />
            <br />
          <button className='btn mt-2' type="submit">Add user</button>
        </form>

        <div>
            {users.map(user=><p key={user._id}>{user.name} : {user.email}

             <Link to={`/users/${user._id}`}>Details</Link>
             <Link to={`update/${user._id}`}>Edit</Link>
                 <button onClick={()=>handleDeletuser(user._id)} className=' btn text-red-600 font-bold'>X</button>
            </p>)
            
            }
           
        </div>
    </div>
  )
}

export default Users