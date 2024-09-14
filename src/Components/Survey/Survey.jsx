import React, { useState } from 'react';

function SurveyForm() {
  const [surveyData, setSurveyData] = useState({
    ageGroup: '',
    height: '',
    weight: '',
    diagnosed: '',
    symptoms: [],
    irregularCycles: '',
    weightChanges: '',
    healthGoals: [],
    otherGoal: '',
  });

  // Handle radio buttons and text inputs
  const handleChange = (e) => {
    setSurveyData({
      ...surveyData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle checkboxes for symptoms and health goals
  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    if (checked) {
      setSurveyData((prevState) => ({
        ...prevState,
        [name]: [...prevState[name], value],
      }));
    } else {
      setSurveyData((prevState) => ({
        ...prevState,
        [name]: prevState[name].filter((v) => v !== value),
      }));
    }
  };

  // Submit the form
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(surveyData); // Process the form data or send it to the backend
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Question 1 */}
      <h3>1. What is your age group?</h3>
      {['18-25', '25-34', '35-44', '45-54', '55-64', '65 or over'].map((age) => (
        <label key={age}>
          <input
            type="radio"
            name="ageGroup"
            value={age}
            checked={surveyData.ageGroup === age}
            onChange={handleChange}
          />
          {age}
        </label>
      ))}

      {/* Question 2 */}
      <h3>2. What is your height?</h3>
      <input
        type="text"
        name="height"
        value={surveyData.height}
        onChange={handleChange}
        placeholder="Enter your height"
      />

      {/* Question 3 */}
      <h3>3. What is your weight?</h3>
      <input
        type="text"
        name="weight"
        value={surveyData.weight}
        onChange={handleChange}
        placeholder="Enter your weight"
      />

      {/* Question 4 */}
      <h3>4. Have you been professionally diagnosed?</h3>
      {['Yes', 'No'].map((option) => (
        <label key={option}>
          <input
            type="radio"
            name="diagnosed"
            value={option}
            checked={surveyData.diagnosed === option}
            onChange={handleChange}
          />
          {option}
        </label>
      ))}

      {/* Question 5 */}
      <h3>5. Which of the following symptoms have you experienced in the past 6 months?</h3>
      {['Irregular periods', 'Heavy periods', 'Acne', 'Thinning hair/hair loss', 'Unwanted facial or body hair', 'Weight gain or difficulty losing weight', 'Darkening of the skin', 'Mood swings'].map((symptom) => (
        <label key={symptom}>
          <input
            type="checkbox"
            name="symptoms"
            value={symptom}
            checked={surveyData.symptoms.includes(symptom)}
            onChange={handleCheckboxChange}
          />
          {symptom}
        </label>
      ))}

      {/* Question 6 */}
      <h3>6. Do you experience irregular menstrual cycles?</h3>
      {['Yes', 'Sometimes', 'Regular'].map((option) => (
        <label key={option}>
          <input
            type="radio"
            name="irregularCycles"
            value={option}
            checked={surveyData.irregularCycles === option}
            onChange={handleChange}
          />
          {option}
        </label>
      ))}

      {/* Question 7 */}
      <h3>7. Have you experienced significant weight changes in the past year?</h3>
      {['Yes - gained weight', 'No - lost weight', 'No changes'].map((option) => (
        <label key={option}>
          <input
            type="radio"
            name="weightChanges"
            value={option}
            checked={surveyData.weightChanges === option}
            onChange={handleChange}
          />
          {option}
        </label>
      ))}

      {/* Question 8 */}
      <h3>8. What are your primary health goals related to managing PCOS?</h3>
      {['Regulating menstrual cycles', 'Managing weight', 'Improving fertility', 'Reducing acne or skin issues', 'Reducing unwanted hair growth', 'Improving energy levels', 'Reducing stress or improving mental health'].map((goal) => (
        <label key={goal}>
          <input
            type="checkbox"
            name="healthGoals"
            value={goal}
            checked={surveyData.healthGoals.includes(goal)}
            onChange={handleCheckboxChange}
          />
          {goal}
        </label>
      ))}

      {/* Other option with text input */}
      <label>
        <input
          type="checkbox"
          name="healthGoals"
          value="Other"
          checked={surveyData.healthGoals.includes('Other')}
          onChange={handleCheckboxChange}
        />
        Other
      </label>
      {surveyData.healthGoals.includes('Other') && (
        <input
          type="text"
          name="otherGoal"
          value={surveyData.otherGoal}
          onChange={handleChange}
          placeholder="Please specify"
        />
      )}

      <button type="submit">Submit</button>
    </form>
  );
}

export default SurveyForm;
