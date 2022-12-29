import { createContext, useEffect, useState } from "react";

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState([]);
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  });

  const Url = "http://localhost:5000";

  useEffect(() => {
    fetchFeedback();
  }, []);

  // fetch feedback
  const fetchFeedback = async () => {
    let response = await fetch(`${Url}/feedback`);
    let data = await response.json();
    console.log("data" , data);
    data = data.sort((a,b) => b.id-a.id)
    setFeedback(data);
    setIsLoading(false);
  };

  // add new feedback
  const addFeedback = async (newFeed) => {
    let response = await fetch(`${Url}/feedback`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newFeed),
    });

    const data = await response.json();
    setFeedback([data, ...feedback]);
  };

  // delete feedback
  const deleteFeedback = async (id) => {
    if (window.confirm("Are You Sure You Want To Delete Feedback ?")) {
      await fetch(`${Url}/feedback/${id}`, { method: "DELETE" });
      setFeedback((feedback) => feedback.filter((item) => item.id !== id));
    }
  };

  // set item to be updated
  const onEditFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true,
    });
  };

  //update actual item
  const updateFeeback = async (id, updatedData) => {
    let response = await fetch(`${Url}/feedback/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    const data = await response.json();

    setFeedback(
      feedback.map((item) => (item.id === id ? { ...item, ...data } : item))
    );
    setFeedbackEdit({ item: {}, edit: false });
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        feedbackEdit,
        isLoading,
        addFeedback,
        deleteFeedback,
        onEditFeedback,
        updateFeeback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
