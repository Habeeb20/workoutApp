import { useState, useEffect } from 'react';
import WorkoutDetails from '../component/WorkoutDetails';
import Workoutform from '../component/Workoutform';
import { useWorkoutContext } from '../hooks/useWorkoutContext';
import { useAuthContext } from '../hooks/useAuthContext';




const Home = () => {
    const {workout, dispatch} = useWorkoutContext()
    const {user} =useAuthContext()
    // const [workout, setWorkout] = useState(null)

    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch('/api/workout', {
                headers:{
                    'Authorization': `Bearer ${user.token }`
                }
            })
            const json = await response.json()

            if(response.ok){
                dispatch({type: 'set_workout', payload:json})
                // setWorkout(json)

            }

        }
        if (user) {
            fetchWorkouts()

        }
      

    }, [dispatch, user])

    return(
        <div className="home">
            <div className="workout">
                {workout && workout.map((workout)=> (
                    <WorkoutDetails key={workout._id} workout={workout} />

                ))}
            </div>
            <Workoutform />
        </div>
    )
}
export default Home