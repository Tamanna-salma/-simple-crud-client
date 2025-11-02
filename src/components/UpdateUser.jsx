import React from 'react'
import { useLoaderData, useParams } from 'react-router'

const UpdateUser = () => {
    const user=useLoaderData();
    // console.log(user);
    const {id}=useParams();
    const handleUpdateUser=(e)=>{
        e.preventDefault();
        const name=e.target.name.value;
        const email=e.target.email.value;
        // console.log(name,email);
        const newupdateUser={name,email};

        fetch(`http://localhost:5000/users/${id}`,{
            method:'PATCH',
            headers:{
               "Content-Type":'application/json',
            },
            body:JSON.stringify(newupdateUser)

        })
        .then(res=>res.json())
        .then(data=>{
            console.log('after update a user',data);
            if(data.modifiedCount){

                alert('user info updated')

            }
        })
    }
  return (
    <div className='text-center mt-14'>
        <h2>Edit a user</h2>
        <form onSubmit={handleUpdateUser}>
            <input className='border mt-2' type="text" name="name" id="" defaultValue={user.name}/>
            <br />
            <input className='border mt-2' type="email" name="email" id="" defaultValue={user.email}/>
            <br />
            <input className='border mt-2' type="submit" value="update user" />
        </form>
    </div>
  )
}

export default UpdateUser