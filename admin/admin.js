// ── Sidebar Toggle ──
const sidebar = document.querySelector('.sidebar');
const overlay = document.querySelector('.sidebar-overlay');
const hamburger = document.querySelector('.hamburger');

function openSidebar(){sidebar.classList.add('open');overlay.classList.add('open');document.body.style.overflow='hidden'}
function closeSidebar(){sidebar.classList.remove('open');overlay.classList.remove('open');document.body.style.overflow=''}
if(hamburger) hamburger.addEventListener('click', openSidebar);
if(overlay) overlay.addEventListener('click', closeSidebar);

// ── Active Nav Link ──
const currentPage = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link').forEach(link=>{
  const href = link.getAttribute('href');
  if(href === currentPage || (currentPage==='' && href==='index.html')) link.classList.add('active');
});

// ── Toast System ──
function showToast(msg, type='info', duration=3500){
  let container = document.querySelector('.toast-container');
  if(!container){container=document.createElement('div');container.className='toast-container';document.body.appendChild(container);}
  const icons={success:'check_circle',error:'error',info:'info'};
  const t=document.createElement('div');
  t.className=`toast ${type}`;
  t.innerHTML=`<span class="material-symbols-outlined toast-icon">${icons[type]||'info'}</span><span>${msg}</span>`;
  container.appendChild(t);
  setTimeout(()=>{t.classList.add('hiding');setTimeout(()=>t.remove(),300)},duration);
}
window.showToast = showToast;

// ── Confirm Modal ──
function confirmAction(title, desc, onConfirm){
  const existing = document.getElementById('confirm-modal');
  if(existing) existing.remove();
  const el = document.createElement('div');
  el.id='confirm-modal';
  el.className='modal-overlay';
  el.innerHTML=`
    <div class="modal-box">
      <p class="modal-title">${title}</p>
      <p class="modal-desc">${desc}</p>
      <div class="modal-actions">
        <button class="btn btn-secondary" onclick="document.getElementById('confirm-modal').remove()">Cancel</button>
        <button class="btn btn-danger" id="confirm-yes">Confirm</button>
      </div>
    </div>`;
  document.body.appendChild(el);
  document.getElementById('confirm-yes').onclick=()=>{el.remove();onConfirm()};
}
window.confirmAction = confirmAction;

// ── Notification bell dropdown ──
document.addEventListener('click', e=>{
  const bell = e.target.closest('#notif-btn');
  const dropdown = document.getElementById('notif-dropdown');
  if(bell && dropdown){dropdown.classList.toggle('hidden');e.stopPropagation();return;}
  if(dropdown && !dropdown.contains(e.target)) dropdown.classList.add('hidden');
});

// ── Date / Time in header ──
function updateClock(){
  const el = document.getElementById('header-clock');
  if(!el) return;
  const now = new Date();
  el.textContent = now.toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit'});
}
updateClock();
setInterval(updateClock, 30000);

// ── Table row click ──
document.querySelectorAll('[data-href]').forEach(row=>{
  row.style.cursor='pointer';
  row.addEventListener('click',()=>{location.href=row.dataset.href;});
});

// ── Filter selects / search ──
const tableSearch = document.getElementById('table-search');
if(tableSearch){
  tableSearch.addEventListener('input', function(){
    const q = this.value.toLowerCase();
    document.querySelectorAll('tbody tr, .m-card').forEach(row=>{
      row.style.display = row.textContent.toLowerCase().includes(q) ? '' : 'none';
    });
  });
}

// ── Logout confirm ──
document.querySelectorAll('[data-action="logout"]').forEach(btn=>{
  btn.addEventListener('click',()=>{
    confirmAction('Sign Out','Are you sure you want to sign out of the admin portal?',()=>{
      location.href='login.html';
    });
  });
});
