import { useState } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

function AddQuiz({ onSave, onClose }) {
  const [questionText, setQuestionText] = useState("");
  const [answerText, setAnswerText] = useState("");
  const [options, setOptions] = useState([]);
  const [correctOption, setCorrectOption] = useState(null);
  const [questionType, setQuestionType] = useState("");
  const [question, setQuestion] = useState("");
  const [isEditing, setIsEditing] = useState(false);
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
  const handleEditOption = (optionIndex, newOptionText) => {
    setIsEditing(false);
    const newOptions = [...options];
    newOptions[optionIndex] = newOptionText;
    setOptions(newOptions);
  };
  const handleOptionEdit = () => {
    setIsEditing(true);
  };
  const handleCorrectOptionChange = (event) => {
    setCorrectOption(parseInt(event.target.value));
  };

  const handleSave = () => {
    onSave({
      questionType,
      questionText,
      answerText,
      options,
    });
    setQuestionType("");
    setQuestionText("");
    setAnswerText("");
    setOptions([]);
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
                className="hover:text-slate-800 text-black rounded py-2 px-4"
              >
                <AiFillDelete />
              </button>
              <button
                type="button"
                onClick={() => handleEditOption()}
                className="text-green-500 hover:text-lime-600  rounded py-2 px-4"
              >
                <AiFillEdit />
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
    case "short-answer":
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
    <div className="relative  inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 transition-opacity"
          aria-hidden="true"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <h4 className="text-lg font-medium mb-4">Add a Question</h4>

          <div className="mb-4">
            <label
              htmlFor="question-type-dropdown"
              className="block text-sm font-medium text-gray-700"
            >
              Question Type:
            </label>
            <select
              id="question-type-dropdown"
              name="questionType"
              value={questionType}
              onChange={(e) => setQuestionType(e.target.value)}
              className="w-full mt-1"
            >
              <option value="">Select a question type</option>
              <option value="mcq">Multiple Choice</option>
              <option value="trueFalse">True or False</option>
              <option value="short-answer">Short Answer</option>
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

          <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={handleSave}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
              disabled={!questionType || !questionText || !answerText}
            >
              Save and Next
            </button>
            <button
              type="button"
              onClick={onClose}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
            >
              Finish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AddQuiz;
