import React from 'react';
import ExerciseList from '../components/Table';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function HomePage({ setExerciseToEdit }) {

    const [exercises, setExercise] = useState([]);
    const history = useHistory();

    const onDelete = async _id => {
        const response = await fetch(`/exercises/${_id}`, {method: 'DELETE'});
        if(response.status === 204){
            setExercise(exercises.filter( e => e._id !== _id));
        } else {
            console.error(`Failed to delete exercise with _id = ${_id}, status code = ${response.status}`); 
        }
    };

    const onEdit = exercise => {
        setExerciseToEdit(exercise);
        history.push("/edit");

    }

    const loadExercise = async () => {
        const response = await fetch('/exercises');
        const data = await response.json();
        setExercise(data);
    }

    useEffect( () => {
        loadExercise();
    }, []);

    return (
        <>
            <ExerciseList exercises={exercises} onDelete={onDelete} onEdit={onEdit}></ExerciseList>
        </>
    );
}

export default HomePage;