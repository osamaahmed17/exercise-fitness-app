import { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Button, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import "../index.scss";
import { useSaveExercisesMutation, useDeleteSavedExercisesMutation } from "../slices/usersApiSlice";
import { toast } from "react-toastify";

const ExerciseCard = ({ exercise, user, setWorkout }) => {

  const [clicked, setClicked] = useState(false);

  const exerciseCardData = {
    userId: user.userId,
    exercise: exercise,
  };
  console.log(exerciseCardData);
  console.log(user);
  console.log(user.userId);
  console.log(exercise);

  const exerciseCardParams = {
    userId: user.userId,
    exerciseId: exercise.id,
  };
  console.log(exerciseCardParams);

  const [saveExercise] = useSaveExercisesMutation();
  const [deleteExercise] = useDeleteSavedExercisesMutation();
  
  const handleClick = async (exerciseCardData) => {
    if (clicked) {
      try {
        // Delete the saved exercise
        await deleteExercise(exerciseCardData);
        setClicked(false);
        // Verify the exerciseCardData return when clicked
        console.log("Clicked successful... exerciseCardData deleted:");
        console.log(exerciseCardData);
      } catch (err) {
        toast.error(err?.exerciseCardData?.message || err.error);
      }
    } else {
      try {
        // Save the exercise
        await saveExercise(exerciseCardData);
        setClicked(true);
        // Verify the exerciseCardData return when clicked
        console.log("Clicked successful... exerciseCardData saved:");
        console.log(exerciseCardData);
      } catch (err) {
        toast.error(err?.exerciseCardData?.message || err.error);
      }
    }
  };

  // const inWorkout = workout.some((element) => element.exerciseid === exercise.id);

  // useEffect(() => {
  //   if (inWorkout) {
  //     setClicked(true);
  //   } else {
  //     setClicked(false);
  //   }
  // }, [workout, exercise, inWorkout]);

  return (
    <Box className="exercise-card">
      <Link className="exercise-card" to={`/exercise/${exercise.id}`}>
        <img src={exercise.gifUrl} alt={exercise.name} loading="lazy" />
      </Link>
      <Stack direction="row" alignItems="center" justifyContent="center">
        <Button disabled sx={{ ml: "21px", color: "#fff", background: "#ff5d5d", fontSize: "14px", borderRadius: "20px",    textTransform: "capitalize"}}>
          {exercise.bodyPart}
        </Button>
        <Button disabled sx={{ ml: "21px", color: "#fff", background: "#ff9090", fontSize: "14px", borderRadius: "20px", textTransform: "capitalize"}}>
          {exercise.equipment}
        </Button>
          {user &&
            (clicked ?
              <Button onClick={() => {handleClick(exerciseCardData); }}  className="exercise-card-check-btn" >
                <CheckIcon fontSize="large" />
              </Button> :

              <Button onClick={() => {handleClick(exerciseCardData); }} className="exercise-card-add-btn" >
                <AddIcon fontSize="large" />
              </Button>)
          }
      </Stack>
      <Link className="exercise-card" to={`/exercise/${exercise.id}`}>
        <Typography className="exercise-card-name" sx={{ fontSize: { lg: "24px", xs: "16px" } }} >
          {exercise.name}
        </Typography>
      </Link>
    </Box>
  )
};

export default ExerciseCard;