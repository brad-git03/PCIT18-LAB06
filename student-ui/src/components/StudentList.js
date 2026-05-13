import { useState } from 'react';

function StudentList({ students, loading, onDeleteStudent, setEditingStudent }) {
    // State to track the ID of the student currently pending deletion confirmation
    const [deletingStudentId, setDeletingStudentId] = useState(null);

    const confirmDelete = (id) => {
        onDeleteStudent(id);
        setDeletingStudentId(null); // Reset UI after confirming
    };

    const cancelDelete = () => {
        setDeletingStudentId(null); // Abort the deletion process
    };

    return (
        <div>
            <h2>Students</h2>

            {loading ? <p>Loading students...</p> : null}

            {!loading && students.length === 0 ? (
                <p>No students found.</p>
            ) : null}

            {!loading && students.length > 0 ? (
                <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Course</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student) => (
                                <tr key={student._id}>
                                    <td>{student.firstname || 'N/A'}</td>
                                    <td>{student.course || 'N/A'}</td>
                                    <td>
                                        {/* Toggle Action UI based on deleting state */}
                                        {deletingStudentId === student._id ? (
                                            <>
                                                <button type="button" onClick={() => confirmDelete(student._id)}>
                                                    Confirm
                                                </button>
                                                <button type="button" onClick={cancelDelete}>
                                                    Cancel
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button type="button" onClick={() => setEditingStudent(student)}>
                                                    Edit
                                                </button>
                                                <button type="button" onClick={() => setDeletingStudentId(student._id)}>
                                                    Delete
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
            ) : null}
        </div>
    );
}

export default StudentList;