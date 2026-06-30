let currentUser = null;
let jobs = [
    { id: 1, title: "Build a responsive e-commerce website", budget: 45000, category: "Web Development", desc: "Need a full-stack developer" },
    { id: 2, title: "Write 10 SEO blog posts", budget: 12000, category: "Writing", desc: "Tech and lifestyle topics" },
    { id: 3, title: "Create modern logo design", budget: 8000, category: "Design", desc: "For a SaaS startup" }
];

function showSection(section) {
    document.querySelectorAll('.section').forEach(s => s.classList.add('hidden'));
    document.getElementById(section + '-section').classList.remove('hidden');
    if (section === 'home') renderFeaturedJobs();
    if (section === 'jobs') renderAllJobs();
}

function renderFeaturedJobs() {
    const container = document.getElementById('featured-jobs');
    container.innerHTML = jobs.map(job => `
        <div onclick="viewJob(${job.id})" class="job-card bg-white rounded-3xl p-6 shadow cursor-pointer">
            <h3 class="font-semibold text-lg">${job.title}</h3>
            <p class="text-green-600 font-bold text-xl mt-3">₹${job.budget}</p>
            <p class="text-sm text-gray-500 mt-1">${job.category}</p>
        </div>
    `).join('');
}

function renderAllJobs() {
    const container = document.getElementById('all-jobs');
    container.innerHTML = jobs.map(job => `
        <div onclick="viewJob(${job.id})" class="job-card bg-white rounded-3xl p-6 shadow cursor-pointer">
            <h3 class="font-semibold text-lg">${job.title}</h3>
            <p class="text-green-600 font-bold text-xl mt-3">₹${job.budget}</p>
            <p class="text-sm text-gray-500 mt-1">${job.category}</p>
        </div>
    `).join('');
}

function viewJob(id) {
    const job = jobs.find(j => j.id === id);
    if (job) {
        alert(`📋 Job Details:\n\n${job.title}\n\nBudget: ₹${job.budget}\n\n${job.desc}\n\nApply Now? (Demo)`);
    }
}

function showPostJob() {
    if (!currentUser) {
        alert("Please login first");
        showLoginModal();
        return;
    }
    document.getElementById('post-job-modal').classList.remove('hidden');
    document.getElementById('post-job-modal').classList.add('flex');
}

function postJob() {
    const title = document.getElementById('job-title').value;
    const budget = document.getElementById('job-budget').value;
    const desc = document.getElementById('job-desc').value;
    
    if (title && budget) {
        jobs.unshift({
            id: Date.now(),
            title: title,
            budget: parseInt(budget),
            category: "Custom",
            desc: desc
        });
        alert("✅ Job posted successfully!");
        document.getElementById('post-job-modal').classList.add('hidden');
        document.getElementById('post-job-modal').classList.remove('flex');
        renderFeaturedJobs();
    }
}

function searchContent() {
    const query = document.getElementById('search-input').value.toLowerCase();
    const filtered = jobs.filter(j => j.title.toLowerCase().includes(query));
    const container = document.getElementById('all-jobs');
    container.innerHTML = filtered.map(job => `
        <div onclick="viewJob(${job.id})" class="job-card bg-white rounded-3xl p-6 shadow cursor-pointer">
            <h3 class="font-semibold">${job.title}</h3>
            <p class="text-green-600 font-bold">₹${job.budget}</p>
        </div>
    `).join('');
}

function showLoginModal() {
    document.getElementById('login-modal').classList.remove('hidden');
    document.getElementById('login-modal').classList.add('flex');
}

function closeLoginModal() {
    const modal = document.getElementById('login-modal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}

function login() {
    currentUser = "FreelancerX";
    document.getElementById('login-btn').innerHTML = `👋 ${currentUser}`;
    closeLoginModal();
    alert("✅ Logged in successfully!");
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    showSection('home');
    renderFeaturedJobs();
});