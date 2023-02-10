import { useState } from "react";
import "../Quiz/Quiz.scss";
import { QuizData } from "../QuizData/QuizData";

const Quiz = () => {
  const [questions, setQuestions] = useState(0);
  const [score, setScore] = useState(0);
  const [showscore, setShowscore] = useState(0);
  const [buttonColor, setButtonColor] = useState(0);
  const [playAgainBtn, setPlayAgainBtn] = useState(true);

  const handleClick = (iscorrect) => {
    if (iscorrect) {
      setScore(score + 1);
    }
  };

  const handlequestion = () => {
    const nextquestion = questions + 1;
    if (nextquestion < QuizData.length) {
      setQuestions(nextquestion);
    } else {
      setShowscore(true);
    }
    setButtonColor(0);
    setPlayAgainBtn(true);
  };

  const handleColor = (iscorrect, id) => {
    if (iscorrect) {
      setButtonColor(id);
      console.log("clicked");
    }
  };

  const playAgain = () => {
    setPlayAgainBtn(false);
    setQuestions(0);
    setShowscore(0);
    setScore(0);
  };
  return (
    <>
      <div className="main-content">
        {showscore ? (
          <div>
            <p className="result">
              You scored {score} out of {QuizData.length}
            </p>
            {playAgainBtn ? (
              <div>
                <button onClick={playAgain} className="exit-btn">
                  Play Again
                </button>
              </div>
            ) : (
              <>
                <div>
                  <p className="question-serial-number">
                    Questions {questions + 0}/ {QuizData.length}
                  </p>
                  <p className="question-text">
                    {QuizData[questions].questiontext}
                  </p>
                </div>
                <div className="answer-button-content">
                  {QuizData[questions].answeroptions.map((answeroptions) => {
                    return (
                      <>
                        <button
                          className="answer-btn"
                          key={answeroptions.id}
                          style={{
                            backgroundColor:
                              buttonColor === answeroptions.id
                                ? "blue"
                                : "none",
                            color:
                              buttonColor === answeroptions.id
                                ? "white"
                                : "black",
                            borderColor:
                              buttonColor === answeroptions.id
                                ? "blue"
                                : "none",
                          }}
                          onClick={() => {
                            handleClick(answeroptions.iscorrect);
                            handleColor(
                              answeroptions.iscorrect,
                              answeroptions.id
                            );
                          }}
                        >
                          {answeroptions.answertext}
                        </button>
                      </>
                    );
                  })}
                </div>
                <div className="save-btn-block">
                  <button className="save-btn" onClick={handlequestion}>
                    Save & Next
                  </button>
                </div>
              </>
            )}
          </div>
        ) : (
          <>
            <div>
              <p className="question-serial-number">
                Questions {questions + 1}/ {QuizData.length}
              </p>
              <p className="question-text">
                {QuizData[questions].questiontext}
              </p>
            </div>
            <div className="answer-button-content">
              {QuizData[questions].answeroptions.map((answeroptions) => {
                return (
                  <>
                    <button
                      className="answer-btn"
                      key={answeroptions.id}
                      style={{
                        backgroundColor:
                          buttonColor === answeroptions.id ? "blue" : "none",
                        color:
                          buttonColor === answeroptions.id ? "white" : "black",
                        borderColor:
                          buttonColor === answeroptions.id ? "blue" : "none",
                      }}
                      onClick={() => {
                        handleClick(answeroptions.iscorrect);
                        handleColor(answeroptions.iscorrect, answeroptions.id);
                      }}
                    >
                      {answeroptions.answertext}
                    </button>
                  </>
                );
              })}
            </div>
            <div className="save-btn-block">
              <button className="save-btn" onClick={handlequestion}>
                Save & Next
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default Quiz;
