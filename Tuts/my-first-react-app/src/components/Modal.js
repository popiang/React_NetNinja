import { createPortal } from 'react-dom';
import './Modal.css';

export default function Modal({ children, handleClose }) {
  return createPortal((
	<div className="modal-backdrop">
		<div className="modal">
			{children}
			<button onClick={handleClose}>close</button>
		</div>
	</div>
  ), document.body);
}
