import React, { useEffect, useState } from 'react';
import { FormComponent } from './components/FormComponent';
import { ModalComponent } from './components/ModalComponent';
import { UsersTable } from './components/UsersTable';
import './styles/app.scss';

const App = () => {
	const [users, setUsers] = useState([]);
	const [selectedUser, setSelectedUser] = useState();

	const getDataFromStorage = async () => {
		let data = await JSON.parse(localStorage.getItem('data'));
		setUsers(data);
	}

	const handleClick = (user) => {
		setSelectedUser(user);
	}

	const submitForm = (data) => {
		if (localStorage.getItem('data') == null) {
			localStorage.setItem('data', '[]')
		}

		let oldData = JSON.parse(localStorage.getItem('data'));
		oldData.push(data);

		localStorage.setItem('data', JSON.stringify(oldData));
		setUsers(oldData);
		alert(`User's info saved succesfully!`);
	}

	const onUserChange = (data) => {
		const newUsers = [...users.filter(({ id }) => id !== data.id), data];

		setUsers(newUsers);
		localStorage.setItem('data', JSON.stringify(newUsers))
		setSelectedUser(null)
	}

	useEffect(() => {
		getDataFromStorage();
	}, []);
	
	return (
		<div className="app">
			<div className="app-form">
				<FormComponent 
					onSubmit={submitForm}
					getUpdatedUsers={getDataFromStorage}
				/>
			</div>
			<div className="app-users">
				{users && 
					<UsersTable 
						users={users} 
						handleClick={handleClick}
					/>
				}
				
				<ModalComponent 
					show={!!selectedUser}
					selectedUser={selectedUser}
					onSubmit={onUserChange}
				/>
			</div>
		</div>
	);
}

export default App;
