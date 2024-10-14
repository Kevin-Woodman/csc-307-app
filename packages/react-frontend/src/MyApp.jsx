import React, {useState, useEffect} from "react";
import Table from "./Table"
import Form from "./Form"

function MyApp(){
    const [characters, setCharacters] = useState([]);    

    function removeOneCharacter(index) {
        const toBeRemoved = characters.find((character,i) => i === index);
        deleteUser(toBeRemoved)
          .then((res) => {
            if(res.status !== 204) throw new Error("Not properly deleted")
            const updated = characters.filter((character,i) => {
              return i !== index;});
            setCharacters(updated);
          })
          .catch((error) => {
            console.log(error);
          });
        }

    function updateList(person) {
      postUser(person)
        .then((res) => {
          if(res.status == 201){
            return res.json()
          }else{
            throw new Error("Creation Failed")
          }})
          .then((res) =>{
            if(res){
              console.log(res); 
              setCharacters([...characters, res]);
            }
          })
          .catch((error) => {
            console.log(error);
        });
    }

    function fetchUsers() {
      const promise = fetch("http://localhost:8000/users");
      return promise;
    }

    function postUser(person){
      const promise = fetch("http://localhost:8000/users", {
        method: "POST", headers: {"Content-Type" : "application/json"},
        body : JSON.stringify(person)
      });
      return promise;
    }

    function deleteUser(person){
      const promise = fetch(`http://localhost:8000/users/${person["id"]}`, {
        method: "DELETE"
      });
      return promise;
    }

    useEffect(() => {
      fetchUsers()
        .then((res) => res.json())
        .then((json) => setCharacters(json["users_list"]))
        .catch((error) => {
          console.log(error);
        });
    }, []);

    return (
        <div className="container">
          <Table 
            characterData={characters} 
            removeCharacter={removeOneCharacter}
          />
          <Form handleSubmit = {updateList}/>
        </div>
      );
}



export default MyApp