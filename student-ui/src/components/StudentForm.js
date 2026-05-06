import { useState, useEffect } from 'react';

function StudentForm({ onAddStudent, editingStudent, setEditingStudent, onUpdateStudent }) {
	const [studentName, setStudentName] = useState('');
	const [course, setCourse] = useState('');
	const [submitting, setSubmitting] = useState(false);
	const [message, setMessage] = useState('');

	useEffect(() => {
		if (editingStudent) {
			setStudentName(editingStudent.firstname || '');
			setCourse(editingStudent.course || '');
		} else {
			setStudentName('');
			setCourse('');
		}
	}, [editingStudent]);

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (!studentName.trim() || !course.trim()) {
			setMessage('Please enter both a student name and a course.');
			return;
		}

		try {
			setSubmitting(true);
			setMessage('');

			if (editingStudent) {
				await onUpdateStudent({
					firstname: studentName.trim(),
					course: course.trim(),
				});
				setMessage('Student updated successfully.');
			} else {
				await onAddStudent({
					firstname: studentName.trim(),
					course: course.trim(),
				});
				setStudentName('');
				setCourse('');
				setMessage('Student added successfully.');
			}
		} catch (error) {
			setMessage(error.message || 'Unable to save student.');
		} finally {
			setSubmitting(false);
		}
	};

	const handleCancel = () => {
		setEditingStudent(null);
		setStudentName('');
		setCourse('');
		setMessage('');
	};

	return (
		<div>
			<h2>{editingStudent ? 'Edit Student' : 'Add Student'}</h2>

			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="studentName">Student Name</label>
					<input
						id="studentName"
						type="text"
						value={studentName}
						onChange={(event) => setStudentName(event.target.value)}
						placeholder="Enter student name"
					/>
				</div>

				<div>
					<label htmlFor="course">Course</label>
					<input
						id="course"
						type="text"
						value={course}
						onChange={(event) => setCourse(event.target.value)}
						placeholder="Enter course"
					/>
				</div>

				<button type="submit" disabled={submitting}>
					{submitting ? 'Saving...' : editingStudent ? 'Update Student' : 'Add Student'}
				</button>
				{editingStudent && (
					<button type="button" onClick={handleCancel}>
						Cancel
					</button>
				)}
			</form>

			{message ? <p>{message}</p> : null}
		</div>
	);
}

export default StudentForm;
