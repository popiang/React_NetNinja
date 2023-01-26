import "./App.css";
import React, { useState } from "react";
import Title from './components/Title';
import Modal from './components/Modal';

function App() {
	const [showModal, setShowModal] = useState(false);
    const [showEvents, setShowEvents] = useState(true);
    const [events, setEvents] = useState([
        { title: "mario's birthday bash", id: 1 },
        { title: "bowser's live stream", id: 2 },
        { title: "race on moo moo farm", id: 3 },
    ]);

	console.log(showModal);

    const handleClick = (id) => {
        setEvents((prevEvents) => {
            return prevEvents.filter((event) => {
                return event.id !== id;
            });
        });
        console.log(id);
    };

	const handleClose = () => {
		setShowModal(false);
	}

	const handleOpen = () => {
		setShowModal(true);
	}

	const subtitle = "All the latest events in Marioland";

    return (
        <div className="App">
            <Title title="Events in Your Area" subtitle={subtitle} />

            {showEvents && (
                <div>
                    <button onClick={() => setShowEvents(false)}>
                        hide events
                    </button>
                </div>
            )}
            {!showEvents && (
                <div>
                    <button onClick={() => setShowEvents(true)}>
                        show events
                    </button>
                </div>
            )}
            {showEvents &&
                events.map((event, index) => (
                    <React.Fragment key={event.id}>
                        <h2>
                            {index + 1} - {event.title}
                        </h2>
                        <button onClick={() => handleClick(event.id)}>
                            delete event
                        </button>
                    </React.Fragment>
                ))}

            {/* <Modal>
                <h2>10% Off Coupon Code!!</h2>
                <p>Use the code NINJA10 at the checkout</p>
            </Modal> */}
            <div>
                <button onClick={handleOpen}>show modal</button>
            </div>

            {showModal && (
                <Modal handleClose={handleClose}>
                    <h2>Terms and Conditions</h2>
                    <p>
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Necessitatibus repellat exercitationem
                        repellendus, minus id doloremque, placeat quas
                        laudantium iure autem tempora sunt libero corrupti velit
                        veniam ipsam eos nam numquam.
                    </p>
                </Modal>
            )}
        </div>
    );
}

export default App;
