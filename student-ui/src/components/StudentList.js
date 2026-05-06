function StudentList({ students, loading, onDeleteStudent, setEditingStudent }) {
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
										<button type="button" onClick={() => setEditingStudent(student)}>
											Edit
										</button>
										<button type="button" onClick={() => onDeleteStudent(student._id)}>
											Delete
										</button>
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
