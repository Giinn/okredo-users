import React from 'react';

export const UsersTable = ({ users, handleClick }) => {

	return (
		<table className="users">
			<tbody>
				{users.map((user, index) => {
					return (
						<tr key={index} onClick={() => handleClick(user)}>
							<td>{user.userName}</td>
							<td>{user.surname}</td>
							<td>{user.email}</td>
							<td>{user.address}</td>
						</tr>
					)
				})}
			</tbody>
		</table>
	)
}
