import Users from "./components/Users"
const usersPromise=fetch('http://localhost:5000/users')
.then(res=>res.json());

 function App() {
  
  return (
    <>
     <Users usersPromise={usersPromise}></Users>
    </>
  )
}
export default App



