import React, { useContext } from "react";
import Feedbackitem from "./Feedbackitem";
import FeedbackContext from "./context/FeedbackContext";
import spinner from "../assets/spinner.gif";

function Feedbacklist() {
  const { feedback, isLoading } = useContext(FeedbackContext);

  if (!isLoading && (!feedback || feedback.length === 0)) {
    return <p>No Feedback Yet</p>;
  }
  console.log("feedback", feedback);

  return isLoading ? (
    <img src={spinner} alt="loading" width={"100px"} height={'100px'} />
  ) : (
    <>
      {feedback.map((item, index) => (
        <Feedbackitem item={item} key={index} />
      ))}
    </>
  );
}

export default Feedbacklist;
