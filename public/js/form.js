// Form Validation
const form = document.getElementById('feedbackForm');
const submitBtn = document.getElementById('submitBtn');
const successMessage = document.getElementById('successMessage');
const errorMessage = document.getElementById('errorMessage');
const errorText = document.getElementById('errorText');
const feedbackMessage = document.getElementById('feedbackMessage');
const charCount = document.querySelector('.char-count');

// Character counter for feedback message
feedbackMessage.addEventListener('input', () => {
  const currentLength = feedbackMessage.value.length;
  charCount.textContent = `${currentLength} / 1000`;
});

// Form submission
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Hide previous messages
  successMessage.classList.add('hidden');
  errorMessage.classList.add('hidden');

  // Validate form
  if (!validateForm()) {
    return;
  }

  // Show loading state
  showLoadingState(true);

  try {
    // Prepare form data
    const formData = new FormData(form);
    const data = {
      name: formData.get('name').trim(),
      email: formData.get('email').trim().toLowerCase(),
      eventName: formData.get('eventName').trim(),
      rating: parseInt(formData.get('rating')),
      feedbackMessage: formData.get('feedbackMessage').trim()
    };

    // Send to backend
    const response = await fetch('/api/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (response.ok && result.success) {
      // Show success message
      showSuccessMessage();
      // Reset form
      form.reset();
      charCount.textContent = '0 / 1000';
    } else {
      showErrorMessage(result.message || 'An error occurred. Please try again.');
    }
  } catch (error) {
    console.error('Submission error:', error);
    showErrorMessage('Network error. Please check your connection and try again.');
  } finally {
    showLoadingState(false);
  }
});

// Form validation function
function validateForm() {
  let isValid = true;

  // Get form fields
  const fields = {
    name: document.getElementById('name'),
    email: document.getElementById('email'),
    eventName: document.getElementById('eventName'),
    rating: document.getElementById('rating'),
    feedbackMessage: document.getElementById('feedbackMessage')
  };

  // Clear all error messages
  document.querySelectorAll('.error-message').forEach(el => {
    el.classList.add('hidden');
    el.textContent = '';
  });

  // Validate name
  if (!fields.name.value.trim()) {
    showFieldError(fields.name, 'Name is required');
    isValid = false;
  } else if (fields.name.value.trim().length > 100) {
    showFieldError(fields.name, 'Name cannot be more than 100 characters');
    isValid = false;
  }

  // Validate email
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!fields.email.value.trim()) {
    showFieldError(fields.email, 'Email is required');
    isValid = false;
  } else if (!emailRegex.test(fields.email.value.trim())) {
    showFieldError(fields.email, 'Please enter a valid email address');
    isValid = false;
  }

  // Validate event name
  if (!fields.eventName.value.trim()) {
    showFieldError(fields.eventName, 'Event name is required');
    isValid = false;
  } else if (fields.eventName.value.trim().length > 150) {
    showFieldError(fields.eventName, 'Event name cannot be more than 150 characters');
    isValid = false;
  }

  // Validate rating
  if (!fields.rating.value) {
    showFieldError(fields.rating, 'Please select a rating');
    isValid = false;
  } else {
    const rating = parseInt(fields.rating.value);
    if (rating < 1 || rating > 5) {
      showFieldError(fields.rating, 'Rating must be between 1 and 5');
      isValid = false;
    }
  }

  // Validate feedback message
  if (!fields.feedbackMessage.value.trim()) {
    showFieldError(fields.feedbackMessage, 'Feedback message is required');
    isValid = false;
  } else if (fields.feedbackMessage.value.trim().length < 10) {
    showFieldError(fields.feedbackMessage, 'Feedback must be at least 10 characters');
    isValid = false;
  } else if (fields.feedbackMessage.value.trim().length > 1000) {
    showFieldError(fields.feedbackMessage, 'Feedback cannot be more than 1000 characters');
    isValid = false;
  }

  return isValid;
}

// Show field error
function showFieldError(field, message) {
  const errorElement = field.parentElement.querySelector('.error-message');
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.classList.remove('hidden');
  }
}

// Show success message
function showSuccessMessage() {
  successMessage.classList.remove('hidden');
  setTimeout(() => {
    successMessage.classList.add('hidden');
  }, 5000);
}

// Show error message
function showErrorMessage(message) {
  errorText.textContent = message;
  errorMessage.classList.remove('hidden');
  setTimeout(() => {
    errorMessage.classList.add('hidden');
  }, 5000);
}

// Show/hide loading state
function showLoadingState(isLoading) {
  const submitText = submitBtn.querySelector('.submit-text');
  const loadingSpinner = submitBtn.querySelector('.loading-spinner');

  if (isLoading) {
    submitBtn.disabled = true;
    submitText.classList.add('hidden');
    loadingSpinner.classList.add('show');
  } else {
    submitBtn.disabled = false;
    submitText.classList.remove('hidden');
    loadingSpinner.classList.remove('show');
  }
}
