import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import PlacesAutocomplete from 'react-places-autocomplete';
import uuid from 'uuid';

const schema = yup.object().shape({
	userName: yup.string().required("Please, enter name!"),
	surname: yup.string().required("Please, enter surname!"),
	email: yup.string().email().required("Please, enter valid email!"),
	address: yup.string().required("Please, enter address!")
});

export const FormComponent = ({ onSubmit, selectedUser }) => {
	const [address, setAddress] = useState(selectedUser?.address || '');

	const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
		resolver: yupResolver(schema),
		defaultValues: {
			userName: selectedUser?.userName || '',
			surname: selectedUser?.surname || '',
			email: selectedUser?.email || '',
			address: address
		}
	});

	const handleAddressChange = (value) => {
		setAddress(value);
		setValue('address', value);
	}

	const beforeSubmit = (value) => {
		setAddress('');
		reset();
		onSubmit({id: uuid(), ...value});
	}

	return (
		<div className="form-component">
			<h2 className="form-component-title">Enter user's information</h2>
			<div className="form-component-inputs">
				<form onSubmit={handleSubmit(beforeSubmit)}>

					<p>{errors.userName?.message}</p>
					<input 
						type="text" 
						name="userName" 
						placeholder="Enter name..." 
						{...register('userName')}
					/>

					<p>{errors.surname?.message}</p>
					<input 
						type="text" 
						name="surname" 
						placeholder="Enter surname..." 
						{...register('surname')} 
					/>

					<p>{errors.email?.message}</p>
					<input 
						type="text" 
						name="email" 
						placeholder="Enter email..." 
						{...register('email')}
					/>

					<p>{errors.address?.message}</p>
					<PlacesAutocomplete value={address} onChange={setAddress} onSelect={handleAddressChange}>
						{({getInputProps, suggestions, getSuggestionItemProps, loading}) => 
						<div>
							<input {...getInputProps({placeholder: "Enter address..."})} />

							<div>
								{loading ? <div>...loading</div> : null}

								{suggestions.map((suggestion, index) => {
									const style = {
										backgroundColor: suggestion.active ? '#41b6e6' : '#fff',
										cursor: 'pointer'
									}

									return <div key={index} {...getSuggestionItemProps(suggestion, { style })}>
												{suggestion.description}
											</div>
								})}
							</div>
						</div>}
					</PlacesAutocomplete>

					<input type="submit" id="submit" />
				</form>
			</div>
		</div>
	)
}
