import { useState } from "react";

const AddQuiz = () => {
  const [questionType, setQuestionType] = useState("mcq"); // default to MCQ question type
  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([]);
  const [correctOption, setCorrectOption] = useState(null);
  const handleQuestionTypeChange = (event) => {
    setQuestionType(event.target.value);
  };
  const handleTitle=(event)=>{
    setTitle(event.title);
  }
  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleOptionChange = (optionIndex, event) => {
    const newOptions = [...options];
    newOptions[optionIndex] = event.target.value;
    setOptions(newOptions);
  };

  const handleAddOption = () => {
    setOptions([...options, ""]);
  };

  const handleRemoveOption = (optionIndex) => {
    const newOptions = options.filter((_, index) => index !== optionIndex);
    setOptions(newOptions);
    if (correctOption === optionIndex) {
      setCorrectOption(null);
    }
  };

  const handleCorrectOptionChange = (event) => {
    setCorrectOption(parseInt(event.target.value));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({
      questionType,
      question,
      options,
      correctOption,
    });
    // reset form fields
    setQuestionType("mcq");
    setQuestion("");
    setOptions([]);
    setCorrectOption(null);
  };

  let formFields = null;
  switch (questionType) {
    case "mcq":
      formFields = (
        <>
          {options.map((option, index) => (
            <div key={index} className="flex items-center">
              <input
                type="radio"
                name="correctOption"
                value={index}
                checked={correctOption === index}
                onChange={handleCorrectOptionChange}
                required
              />
              <input
                type="text"
                placeholder={`Option ${index + 1}`}
                value={option}
                onChange={(event) => handleOptionChange(index, event)}
                className="border border-gray-300 rounded py-2 px-4 mr-2 w-full"
                required
              />
              <button
                type="button"
                onClick={() => handleRemoveOption(index)}
                className="bg-red-500 hover:bg-red-600 text-white rounded py-2 px-4"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddOption}
            className="bg-green-500 hover:bg-green-600 text-white rounded py-2 px-4"
          >
            Add Option
          </button>
        </>
      );
      break;
    case "trueFalse":
      formFields = (
        <>
          <div className="flex items-center">
            <input
              type="radio"
              name="correctOption"
              value="0"
              checked={correctOption === 0}
              onChange={handleCorrectOptionChange}
              required
            />
            <label className="ml-2">True</label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              name="correctOption"
              value="1"
              checked={correctOption === 1}
              onChange={handleCorrectOptionChange}
              required
            />
            <label className="ml-2">False</label>
          </div>
        </>
      );
      break;
    case "other":
      formFields = (
        <input
          type="text"
          placeholder="Answer"
          value={options[0]}
          onChange={(event) => handleCorrectOptionChange(0, event)}
          className="border border-gray-300 rounded py-2 px-4 w-full"
          required
        />
      );
      break;
    default:
      formFields = null;
  }
  return (
    <>
    <form onSubmit={handleSubmit}
    className="px-4  py-4">
    <div className="justify-center">
        <label>Title of Quiz:</label>
        <input
          type="text"
          placeholder="Title of quiz"
          value={title}
          onChange={handleTitle}
          className="border border-gray-300 rounded py-2 px-4 w-full"
          required
        />  
    </div>
      <div className="flex items-center mb-4 mt-2">
        <label className="mr-4">Question Type:</label>
        <select
          value={questionType}
          onChange={handleQuestionTypeChange}
          className="border border-gray-300 rounded py-2 px-4"
        >
          <option value="mcq">Multiple Choice</option>
          <option value="trueFalse">True/False</option>
          <option value="other">Short Answer</option>
        </select>
      </div>
      <div className="mb-4">
        <label>Question:</label>
        <input
          type="text"
          placeholder="Question"
          value={question}
          onChange={handleQuestionChange}
          className="border border-gray-300 rounded py-2 px-4 w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label>Options:</label>
        {formFields}
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white rounded py-2 px-4"
      >
        Add Question
      </button>
    </form>
    </>
  );
};

export default AddQuiz;
