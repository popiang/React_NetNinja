import "./App.css";
import { useState } from "react";
import Title from './components/Title';
import Modal from './components/Modal';
import EventList from "./components/EventList";
import NewEventForm from "./components/NewEventForm";

function App() {
	const [showModal, setShowModal] = useState(false);
    const [showEvents, setShowEvents] = useState(true);
    const [events, setEvents] = useState([]);

	const addEvent = (event) => {
		setEvents((preEvents) => {
			return [...preEvents, event];
		});
		setShowModal(false);
	}

    const handleClick = (id) => {
        setEvents((prevEvents) => {
            return prevEvents.filter((event) => {
                return event.id !== id;
            });
        });
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
            {showEvents && <EventList handleClick={handleClick} events={events}/>}

            {showModal && (
                <Modal handleClose={handleClose} isSalesModal={true}>
					<NewEventForm addEvent={addEvent} />
                </Modal>
            )}

            <div>
                <button onClick={handleOpen}>Add New Event</button>
            </div>
        </div>
    );
}

export default App;
