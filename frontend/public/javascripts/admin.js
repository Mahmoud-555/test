document.addEventListener('DOMContentLoaded', () => {
  const lectureTab = document.getElementById('lectureTab');
  const questionTab = document.getElementById('questionTab');
  const lectureSection = document.getElementById('lectureSection');
  const questionSection = document.getElementById('questionSection');

  lectureTab.addEventListener('click', () => {
    lectureTab.classList.add('active');
    questionTab.classList.remove('active');
    lectureSection.classList.add('active');
    questionSection.classList.remove('active');
  });

  questionTab.addEventListener('click', () => {
    questionTab.classList.add('active');
    lectureTab.classList.remove('active');
    questionSection.classList.add('active');
    lectureSection.classList.remove('active');
  });

  // Handle lecture form submission
  const createLectureForm = document.getElementById('createLectureForm');
  const lectureError = document.getElementById('lectureError');
  const lectureSuccess = document.getElementById('lectureSuccess');

  createLectureForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    lectureError.textContent = '';
    lectureSuccess.textContent = '';

    const formData = {
      lecture: createLectureForm.lecture.value.trim(),
      module: createLectureForm.module.value.trim(),
      subject: createLectureForm.subject.value.trim(),
    };

    try {
      const response = await fetch('/api/v1/lectures', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        lectureError.textContent = errorData.message || 'Failed to create lecture.';
        return;
      }

      lectureSuccess.textContent = 'Lecture created successfully!';
      createLectureForm.reset();
    } catch (error) {
      lectureError.textContent = 'An error occurred. Please try again.';
    }
  });

  // Handle question form submission
  const createQuestionForm = document.getElementById('createQuestionForm');
  const questionError = document.getElementById('questionError');
  const questionSuccess = document.getElementById('questionSuccess');

  createQuestionForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    questionError.textContent = '';
    questionSuccess.textContent = '';

    const formData = new FormData(createQuestionForm);

    try {
      const response = await fetch('/api/v1/questions', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        questionError.textContent = errorData.message || 'Failed to create question.';
        return;
      }

      questionSuccess.textContent = 'Question created successfully!';
      createQuestionForm.reset();
    } catch (error) {
      questionError.textContent = 'An error occurred. Please try again.';
    }
  });
});
