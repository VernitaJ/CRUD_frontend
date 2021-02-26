import React, { useState, useEffect } from "react";
import "./styles.css";
import UserTable from "./UserTable";
import AddUserForm from "./AddUserForm";
import EditUserForm from "./EditUserForm";

const BACKEND_ROOT = "https://5dsww.sse.codesandbox.io/";

const App = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    console.log("useEffect");
    fetch(BACKEND_ROOT)
      .then((response) => response.json(users))
      .then((users) => setUsers(users))
      .catch((err) => console.error(err));
  }, []);

  const addUser = (user) => {
    console.log(user);
    fetch(BACKEND_ROOT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      mode: "cors",
      body: JSON.stringify(user)
    })
      .then((response) => response.json())
      .then(() => {
        setUsers([...users, user]);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const deleteUser = (id) => {
    fetch(`${BACKEND_ROOT}${id}`, { method: "DELETE", mode: "cors" })
      .then(() => {
        setUsers(users.filter((user) => user.id !== id));
        setEditing(false);
      })
      .catch((err) => {
        console.log(err.message);
        console.log(err);
      });

    // setUsers(users.filter(user => user.id !== id));
    //
  };

  const [editing, setEditing] = useState(false);
  const initialFormState = { id: null, name: "", username: "" };
  const [currentUser, setCurrentUser] = useState(initialFormState);

  const editRow = (user) => {
    setEditing(true);
    setCurrentUser({ id: user.id, name: user.name, username: user.username });
  };

  // const updateUser = (id, updatedUser) => {
  //   fetch(BACKEND_ROOT, {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     mode: "cors",
  //     body: JSON.stringify(id, updatedUser)
  //   })
  //     .then(response => response.json())
  //     .then(() => {
  //       setEditing(false);
  //       setUsers(users.map(user => (user.id === id ? updatedUser : user)));
  //     })
  //     .catch(err => {
  //       console.log(err.message);
  //     });
  // };

  const updateUser = (id, updatedUser) => {
    console.log(updatedUser);
    fetch(`${BACKEND_ROOT}${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      mode: "cors",
      // body: JSON.stringify(updatedUser)
      body: JSON.stringify(updatedUser)
    })
      .then((response) => response.json())
      .then(() => {
        setEditing(false);
        setUsers(users.map((user) => (user.id === id ? updatedUser : user)));
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className="container">
      <h1>CRUD App with Hooks</h1>
      <div className="flex-row">
        <div className="flex-large">
          {editing ? (
            <div>
              <h2>Edit user</h2>
              <EditUserForm
                editing={editing}
                setEditing={setEditing}
                currentUser={currentUser}
                updateUser={updateUser}
              />
            </div>
          ) : (
            <div>
              <h2>Add user</h2>
              <AddUserForm addUser={addUser} />
            </div>
          )}
        </div>
        <div className="flex-large">
          <h2>View users</h2>
          <UserTable users={users} editRow={editRow} deleteUser={deleteUser} />
        </div>
      </div>
    </div>
  );
};

export default App;
