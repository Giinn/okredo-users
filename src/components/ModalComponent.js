import React from 'react';
import { FormComponent } from './FormComponent';

export const ModalComponent = ({ show, ...rest }) => {
	if (!show) {
		return null;
	}

	return (
		<div className={`modal ${show ? 'show' : ''}`}>
			<FormComponent {...rest} />
		</div>
	)
}
