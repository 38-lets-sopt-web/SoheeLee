import './data.js';

const STORAGE_KEY = 'expenses';

// ===== 데이터 관리 =====
let cachedData = null;

function getData() {
  if (!cachedData) {
    const saved = localStorage.getItem(STORAGE_KEY);
    cachedData = saved ? JSON.parse(saved) : [];
  }
  return cachedData;
}

function saveData(data) {
  cachedData = data;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// ===== 필터 상태 =====
let activeFilter = { title: '', type: '', category: '', payment: '' };

// ===== 필터 적용 함수 =====
function applyFilter(data) {
  return data.filter(item => {
    const matchTitle = item.title.toLowerCase().includes(activeFilter.title.toLowerCase());
    const matchType =
      activeFilter.type === '' ||
      (activeFilter.type === 'income' && item.amount > 0) ||
      (activeFilter.type === 'expense' && item.amount < 0);
    const matchCategory = activeFilter.category === '' || item.category === activeFilter.category;
    const matchPayment = activeFilter.payment === '' || item.payment === activeFilter.payment;
    return matchTitle && matchType && matchCategory && matchPayment;
  });
}

// ===== 정렬 함수 =====
function applySort(data) {
  const sortValue = document.getElementById('sort-select').value;
  return [...data].sort((a, b) => {
    if (sortValue === 'date-desc') return new Date(b.date) - new Date(a.date);
    if (sortValue === 'date-asc') return new Date(a.date) - new Date(b.date);
  });
}

// ===== 테이블 렌더링 =====
function renderTable() {
  const data = getData();
  const tbody = document.getElementById('table-body');

  const filtered = applyFilter(data);
  const sorted = applySort(filtered);

  tbody.innerHTML = '';

  if (sorted.length === 0) {
    tbody.innerHTML = `<tr class="empty-row"><td colspan="6">내역이 없습니다.</td></tr>`;
  } else {
    sorted.forEach(item => {
      const { displayAmount, amountClass } = formatAmount(item.amount);

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><input type="checkbox" data-id="${item.id}"></td>
        <td class="title-cell" data-id="${item.id}">${item.title}</td>
        <td class="${amountClass}">${displayAmount}</td>
        <td>${item.date}</td>
        <td>${item.category}</td>
        <td>${item.payment}</td>
      `;
      tbody.appendChild(tr);
    });
  }

  const total = filtered.reduce((sum, item) => sum + item.amount, 0);
  const totalEl = document.getElementById('total-amount');
  totalEl.textContent = (total > 0 ? '+' : '') + total.toLocaleString();
  totalEl.className = total >= 0 ? 'amount-pos' : 'amount-neg';

  document.getElementById('check-all').checked = false;
}

function formatAmount(amount) {
  const isIncome = amount > 0;
  return {
    displayAmount: (isIncome ? '+' : '') + amount.toLocaleString(),
    amountClass: isIncome ? 'amount-pos' : 'amount-neg'
  };
}

function resetAddForm() {
  document.getElementById('add-title').value = '';
  document.getElementById('add-type').value = 'expense';
  document.getElementById('add-amount').value = '';
  document.getElementById('add-date').value = '';
  document.getElementById('add-category').value = '';
  document.getElementById('add-payment').value = '';
}

// ===== 전체 체크박스 =====
document.getElementById('check-all').addEventListener('change', function () {
  document.querySelectorAll('#table-body input[type="checkbox"]')
    .forEach(cb => cb.checked = this.checked);
});

// ===== 정렬 =====
document.getElementById('sort-select').addEventListener('change', renderTable);

// ===== 필터 적용 =====
document.getElementById('btn-filter-apply').addEventListener('click', () => {
  activeFilter.title = document.getElementById('filter-title').value.trim();
  activeFilter.type = document.getElementById('filter-type').value;
  activeFilter.category = document.getElementById('filter-category').value;
  activeFilter.payment = document.getElementById('filter-payment').value;
  renderTable();
});

// ===== 필터 초기화 =====
document.getElementById('btn-filter-reset').addEventListener('click', () => {
  document.getElementById('filter-title').value = '';
  document.getElementById('filter-type').value = '';
  document.getElementById('filter-category').value = '';
  document.getElementById('filter-payment').value = '';
  activeFilter = { title: '', type: '', category: '', payment: '' };
  renderTable();
});

// ===== 선택 삭제 =====
document.getElementById('btn-delete').addEventListener('click', () => {
  const checked = document.querySelectorAll('#table-body input[type="checkbox"]:checked');
  if (checked.length === 0) return;

  const ids = Array.from(checked).map(cb => Number(cb.dataset.id));
  const idSet = new Set(ids);
  saveData(getData().filter(item => !idSet.has(item.id)));
  renderTable();
});

// ===== 항목 상세 모달 =====
document.getElementById('table-body').addEventListener('click', (e) => {
  const titleCell = e.target.closest('.title-cell');
  if (!titleCell) return;

  const id = Number(titleCell.dataset.id);
  const item = getData().find(d => d.id === id);
  if (!item) return;

  const { displayAmount } = formatAmount(item.amount);
  document.getElementById('detail-amount').textContent = displayAmount + '원';
  document.getElementById('detail-title').textContent = item.title;
  document.getElementById('detail-amount').textContent = displayAmount;
  document.getElementById('detail-date').textContent = item.date;
  document.getElementById('detail-category').textContent = item.category;
  document.getElementById('detail-payment').textContent = item.payment;

  document.getElementById('detail-backdrop').classList.remove('hidden');
});

document.getElementById('detail-close').addEventListener('click', () => {
  document.getElementById('detail-backdrop').classList.add('hidden');
});

document.getElementById('detail-backdrop').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) {
    document.getElementById('detail-backdrop').classList.add('hidden');
  }
});

// ===== 내역 추가 모달 열기/닫기 =====
document.getElementById('btn-add').addEventListener('click', () => {
  document.getElementById('add-backdrop').classList.remove('hidden');
});

document.getElementById('add-close').addEventListener('click', () => {
  document.getElementById('add-backdrop').classList.add('hidden');
});

document.getElementById('add-backdrop').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) {
    document.getElementById('add-backdrop').classList.add('hidden');
  }
});

// ===== 내역 추가 =====
document.getElementById('btn-add-submit').addEventListener('click', () => {
  const title = document.getElementById('add-title').value.trim();
  const type = document.getElementById('add-type').value;
  const amountInput = document.getElementById('add-amount').value.trim();
  const date = document.getElementById('add-date').value;
  const category = document.getElementById('add-category').value;
  const payment = document.getElementById('add-payment').value;

  if (!title || !amountInput || !date || !category || !payment) {
    alert('모든 항목을 입력해주세요.');
    return;
  }

  const data = getData();
  const newId = data.length > 0 ? Math.max(...data.map(d => d.id)) + 1 : 1;
  // after
const amount = Number(amountInput);

if (isNaN(amount) || amount <= 0) {
  alert('올바른 금액을 입력해주세요.');
  return;
}

const signedAmount = type === 'expense' ? -Math.abs(amount) : Math.abs(amount);

  data.push({ id: newId, title, date, category, payment, amount: signedAmount });
  saveData(data);

  // 입력 초기화
  resetAddForm();

  document.getElementById('add-backdrop').classList.add('hidden');
  renderTable();
});

// ===== 시작 =====
renderTable();