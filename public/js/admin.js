// Admin Dashboard Variables
let allFeedback = [];
let filteredFeedback = [];
let currentPage = 1;
const itemsPerPage = 10;

// DOM Elements
const loadingState = document.getElementById('loadingState');
const emptyState = document.getElementById('emptyState');
const feedbackContainer = document.getElementById('feedbackContainer');
const feedbackTableBody = document.getElementById('feedbackTableBody');

const filterEvent = document.getElementById('filterEvent');
const filterRating = document.getElementById('filterRating');
const sortBy = document.getElementById('sortBy');
const clearFilters = document.getElementById('clearFilters');

const totalCountEl = document.getElementById('totalCount');
const avgRatingEl = document.getElementById('avgRating');
const excellentCountEl = document.getElementById('excellentCount');
const poorCountEl = document.getElementById('poorCount');

const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const pageInfo = document.getElementById('pageInfo');

// Initialize dashboard
document.addEventListener('DOMContentLoaded', () => {
  loadFeedback();
  setupEventListeners();
});

// Load feedback from API
async function loadFeedback() {
  loadingState.classList.remove('hidden');
  feedbackContainer.classList.add('hidden');
  emptyState.classList.add('hidden');

  try {
    const response = await fetch('/api/feedback');
    const result = await response.json();

    if (result.success) {
      allFeedback = result.data || [];
      filteredFeedback = [...allFeedback];
      currentPage = 1;
      updateDashboard();
      renderFeedbackTable();
      calculateStats();
    } else {
      showEmptyState();
    }
  } catch (error) {
    console.error('Error loading feedback:', error);
    showEmptyState();
  } finally {
    loadingState.classList.add('hidden');
  }
}

// Setup event listeners
function setupEventListeners() {
  filterEvent.addEventListener('input', applyFilters);
  filterRating.addEventListener('change', applyFilters);
  sortBy.addEventListener('change', applySort);
  clearFilters.addEventListener('click', resetFilters);

  prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      updateDashboard();
    }
  });

  nextBtn.addEventListener('click', () => {
    const maxPage = Math.ceil(filteredFeedback.length / itemsPerPage);
    if (currentPage < maxPage) {
      currentPage++;
      updateDashboard();
    }
  });
}

// Apply filters
function applyFilters() {
  filteredFeedback = allFeedback.filter(feedback => {
    const eventFilter = filterEvent.value.toLowerCase();
    const ratingFilter = filterRating.value;

    const eventMatch = feedback.eventName.toLowerCase().includes(eventFilter);
    const ratingMatch = !ratingFilter || feedback.rating === parseInt(ratingFilter);

    return eventMatch && ratingMatch;
  });

  currentPage = 1;
  updateDashboard();
}

// Apply sorting
function applySort() {
  const sortValue = sortBy.value;

  switch (sortValue) {
    case 'newest':
      filteredFeedback.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      break;
    case 'oldest':
      filteredFeedback.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      break;
    case 'highestRating':
      filteredFeedback.sort((a, b) => b.rating - a.rating);
      break;
    case 'lowestRating':
      filteredFeedback.sort((a, b) => a.rating - b.rating);
      break;
  }

  currentPage = 1;
  updateDashboard();
}

// Reset filters
function resetFilters() {
  filterEvent.value = '';
  filterRating.value = '';
  sortBy.value = 'newest';
  filteredFeedback = [...allFeedback];
  currentPage = 1;
  applySort();
  updateDashboard();
}

// Update dashboard
function updateDashboard() {
  if (filteredFeedback.length === 0) {
    showEmptyState();
    return;
  }

  feedbackContainer.classList.remove('hidden');
  emptyState.classList.add('hidden');
  renderFeedbackTable();
  updatePagination();
}

// Render feedback table
function renderFeedbackTable() {
  feedbackTableBody.innerHTML = '';

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredFeedback.length);
  const pageData = filteredFeedback.slice(startIndex, endIndex);

  pageData.forEach(feedback => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td class="px-6 py-4 text-sm font-medium text-gray-900">${escapeHtml(feedback.name)}</td>
      <td class="px-6 py-4 text-sm text-gray-500 truncate-text">${escapeHtml(feedback.email)}</td>
      <td class="px-6 py-4 text-sm text-gray-700">${escapeHtml(feedback.eventName)}</td>
      <td class="px-6 py-4 text-center text-sm font-medium">
        <span class="star-display">${'⭐'.repeat(feedback.rating)}</span>
        <span class="text-gray-500 text-xs ml-2">(${feedback.rating}/5)</span>
      </td>
      <td class="px-6 py-4 text-sm text-gray-600">
        <div class="max-w-xs truncate-text" title="${escapeHtml(feedback.feedbackMessage)}">
          ${escapeHtml(feedback.feedbackMessage.substring(0, 50))}${feedback.feedbackMessage.length > 50 ? '...' : ''}
        </div>
      </td>
      <td class="px-6 py-4 text-sm text-gray-500">
        <span title="${new Date(feedback.createdAt).toLocaleString()}">
          ${formatDate(feedback.createdAt)}
        </span>
      </td>
    `;
    feedbackTableBody.appendChild(row);
  });
}

// Update pagination
function updatePagination() {
  const maxPage = Math.ceil(filteredFeedback.length / itemsPerPage);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, filteredFeedback.length);

  pageInfo.textContent = `Page ${currentPage} of ${maxPage} (${startItem}-${endItem} of ${filteredFeedback.length})`;

  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === maxPage;
}

// Calculate and display stats
function calculateStats() {
  if (allFeedback.length === 0) return;

  const totalCount = allFeedback.length;
  const totalRating = allFeedback.reduce((sum, f) => sum + f.rating, 0);
  const avgRating = (totalRating / totalCount).toFixed(1);

  const excellentCount = allFeedback.filter(f => f.rating === 5).length;
  const poorCount = allFeedback.filter(f => f.rating <= 2).length;

  totalCountEl.textContent = totalCount;
  avgRatingEl.textContent = avgRating;
  excellentCountEl.textContent = excellentCount;
  poorCountEl.textContent = poorCount;
}

// Show empty state
function showEmptyState() {
  emptyState.classList.remove('hidden');
  feedbackContainer.classList.add('hidden');
}

// Utility: Format date
function formatDate(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

// Utility: Escape HTML
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
