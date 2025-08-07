document.getElementById('createQuestionForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const form = e.target;
  const errorMessage = document.getElementById('errorMessage');
  errorMessage.textContent = '';

  const formData = new FormData(form);

  // Convert comma separated answers and correct answers to arrays
  const answers = formData.get('answers').split(',').map(a => a.trim());
  const correct = formData.get('correct').split(',').map(c => c.trim());

  // Validate that correct answers are in answers
  const invalidCorrect = correct.some(c => !answers.includes(c));
  if (invalidCorrect) {
    errorMessage.textContent = 'Correct answers must be part of the answers list.';
    return;
  }

  // Replace string values with arrays in formData
  formData.set('answers', JSON.stringify(answers));
  formData.set('correct', JSON.stringify(correct));

  try {
    const response = await fetch('/api/v1/questions', {
      method: 'POST',
      body: formData,
      credentials: 'include'
    });

    if (!response.ok) {
      const errorData = await response.json();
      errorMessage.textContent = errorData.message || 'Failed to create question.';
      return;
    }

    const data = await response.json();
    alert('Question created successfully!');
    form.reset();
  } catch (error) {
    errorMessage.textContent = 'An error occurred while creating the question.';
    console.error(error);
  }
});
