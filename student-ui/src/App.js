import { useEffect, useState } from 'react';
import './App.css';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';

function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingStudent, setEditingStudent] = useState(null);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await fetch('/api/students');

      if (!response.ok) {
        throw new Error('Failed to load students');
      }

      const data = await response.json();
      setStudents(data);
    } catch (fetchError) {
      setError(fetchError.message || 'Something went wrong while loading students.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleAddStudent = async (studentData) => {
    const response = await fetch('/api/students', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(studentData),
    });

    if (!response.ok) {
      throw new Error('Failed to add student');
    }

    await fetchStudents();
  };

  const handleDeleteStudent = async (id) => {
    const response = await fetch(`/api/students/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete student');
    }

    setStudents((currentStudents) => currentStudents.filter((student) => student._id !== id));
  };

  const handleUpdateStudent = async (studentData) => {
    if (!editingStudent) {
      throw new Error('No student selected for editing');
    }

    const response = await fetch(`/api/students/${editingStudent._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(studentData),
    });

    if (!response.ok) {
      throw new Error('Failed to update student');
    }

    setEditingStudent(null);
    await fetchStudents();
  };

  return (
    <div>
      <h1>Student Manager</h1>
      <p>Connects to the PCIT18 backend API.</p>

      <StudentForm 
        onAddStudent={handleAddStudent}
        editingStudent={editingStudent}
        setEditingStudent={setEditingStudent}
        onUpdateStudent={handleUpdateStudent}
      />

      {error ? <p>{error}</p> : null}

      <StudentList
        students={students}
        loading={loading}
        onDeleteStudent={handleDeleteStudent}
        setEditingStudent={setEditingStudent}
      />
    </div>
  );
}

export default App;
