const companyEl = document.getElementById("company");
const roleEl = document.getElementById("role");
const dateEl = document.getElementById("date");
const statusEl = document.getElementById("status");
const addBtn = document.getElementById("addBtn");
const listEl = document.getElementById("list");
const searchEl = document.getElementById("search");
const clearAllBtn = document.getElementById("clearAll");

const KEY = "job_apply_tracker_items_v1";

function loadItems() {
  try { return JSON.parse(localStorage.getItem(KEY)) || []; }
  catch { return []; }
}
function saveItems(items) {
  localStorage.setItem(KEY, JSON.stringify(items));
}

function badge(status) {
  let bg = "#e3e3e3";
  if (status === "Applied") bg = "#dbeafe";
  if (status === "Interview") bg = "#fef3c7";
  if (status === "Offer") bg = "#dcfce7";
  if (status === "Rejected") bg = "#fee2e2";
  return `<span class="badge" style="background:${bg}">${status}</span>`;
}

function render() {
  const q = (searchEl.value || "").toLowerCase().trim();
  const items = loadItems().filter(x =>
    (x.company + " " + x.role).toLowerCase().includes(q)
  );

  listEl.innerHTML = items.map((x, idx) => `
    <tr>
      <td>${x.company}</td>
      <td>${x.role}</td>
      <td>${x.date || "-"}</td>
      <td>${badge(x.status)}</td>
      <td><button class="actionBtn" onclick="removeItem(${idx})">Delete</button></td>
    </tr>
  `).join("");
}

window.removeItem = function(indexInFilteredView) {
  // To keep it simple: remove by matching rendered row content
  const q = (searchEl.value || "").toLowerCase().trim();
  const all = loadItems();
  const filtered = all.filter(x => (x.company + " " + x.role).toLowerCase().includes(q));
  const target = filtered[indexInFilteredView];
  const next = all.filter(x => !(x.company === target.company && x.role === target.role && x.date === target.date && x.status === target.status));
  saveItems(next);
  render();
};

addBtn.addEventListener("click", () => {
  const company = companyEl.value.trim();
  const role = roleEl.value.trim();
  const date = dateEl.value;
  const status = statusEl.value;

  if (!company || !role) {
    alert("Company and Role are required.");
    return;
  }

  const items = loadItems();
  items.unshift({ company, role, date, status });
  saveItems(items);

  companyEl.value = "";
  roleEl.value = "";
  dateEl.value = "";
  statusEl.value = "Applied";

  render();
});

searchEl.addEventListener("input", render);

clearAllBtn.addEventListener("click", () => {
  if (confirm("Clear all entries?")) {
    saveItems([]);
    render();
  }
});

render();