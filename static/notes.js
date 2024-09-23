document.addEventListener('DOMContentLoaded', (event) => {
    displayNotes();

    // Handle form submission
    const noteForm = document.getElementById('noteForm');
    noteForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting normally

        const note = document.getElementById('note').value.trim();

        const now = new Date();
		const formattedDateTime = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;

		// Format the note as a string with the current date and time
		const noteText = `
			<div class="card green lighten-4">
				<div class="card-content black-text">
					<p>${note} <br>${formattedDateTime}</p>
				</div>
			</div>
		`;

        // Add note
        addNote(noteText);

        // Clear the form fields
        noteForm.reset();
    });
});

function addNote(noteText) {
    // Get existing notes from local storage
    let notes = JSON.parse(localStorage.getItem('notes')) || [];

    // Add new note to the beginning of the array
    notes.unshift(noteText);
    
    // Save notes to local storage
    localStorage.setItem('notes', JSON.stringify(notes));

    // Display updated notes
    displayNotes();
}

function displayNotes() {
    const notesDiv = document.getElementById('notes');
    const notes = JSON.parse(localStorage.getItem('notes')) || [];

    // Update the HTML to show the most recent note first
    notesDiv.innerHTML = notes.map(note => `<p>${note}</p>`).join('');
}

displayNotes();