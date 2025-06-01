let quranData = []; // All ayat (with surah, number, text, surahIndex)
let surahList = []; // List of surahs (name, index, ayahCount)
let loaded = false;

const surahs = [
  "1. Al-Fatihah (The Opening)",
  "2. Al-Baqarah (The Cow)",
  "3. Aal-E-Imran (The Family of Imran)",
  "4. An-Nisa (The Women)",
  "5. Al-Maidah (The Table Spread)",
  "6. Al-An'am (The Cattle)",
  "7. Al-A'raf (The Heights)",
  "8. Al-Anfal (The Spoils of War)",
  "9. At-Tawbah (The Repentance)",
  "10. Yunus (Jonah)",
  "11. Hud (Hud)",
  "12. Yusuf (Joseph)",
  "13. Ar-Ra'd (The Thunder)",
  "14. Ibrahim (Abraham)",
  "15. Al-Hijr (The Rocky Tract)",
  "16. An-Nahl (The Bee)",
  "17. Al-Isra (The Night Journey)",
  "18. Al-Kahf (The Cave)",
  "19. Maryam (Mary)",
  "20. Taha (Taha)",
  "21. Al-Anbiya (The Prophets)",
  "22. Al-Hajj (The Pilgrimage)",
  "23. Al-Mu’minun (The Believers)",
  "24. An-Nur (The Light)",
  "25. Al-Furqan (The Criterion)",
  "26. Ash-Shu'ara (The Poets)",
  "27. An-Naml (The Ant)",
  "28. Al-Qasas (The Stories)",
  "29. Al-Ankabut (The Spider)",
  "30. Ar-Rum (The Romans)",
  "31. Luqman (Luqman)",
  "32. As-Sajda (The Prostration)",
  "33. Al-Ahzab (The Combined Forces)",
  "34. Saba (Sheba)",
  "35. Fatir (The Originator)",
  "36. Ya-Sin (Ya Sin)",
  "37. As-Saffat (Those who set the Ranks)",
  "38. Sad (The Letter Sad)",
  "39. Az-Zumar (The Groups)",
  "40. Ghafir (The Forgiver)",
  "41. Fussilat (Explained in Detail)",
  "42. Ash-Shura (The Consultation)",
  "43. Az-Zukhruf (The Gold Adornments)",
  "44. Ad-Dukhan (The Smoke)",
  "45. Al-Jathiyah (The Crouching)",
  "46. Al-Ahqaf (The Wind-Curved Sandhills)",
  "47. Muhammad (Muhammad)",
  "48. Al-Fath (The Victory)",
  "49. Al-Hujurat (The Rooms)",
  "50. Qaf (The Letter Qaf)",
  "51. Adh-Dhariyat (The Winnowing Winds)",
  "52. At-Tur (The Mount)",
  "53. An-Najm (The Star)",
  "54. Al-Qamar (The Moon)",
  "55. Ar-Rahman (The Beneficent)",
  "56. Al-Waqi’ah (The Inevitable)",
  "57. Al-Hadid (The Iron)",
  "58. Al-Mujadila (The Pleading Woman)",
  "59. Al-Hashr (The Exile)",
  "60. Al-Mumtahanah (She that is to be examined)",
  "61. As-Saf (The Ranks)",
  "62. Al-Jumu’ah (The Congregation)",
  "63. Al-Munafiqun (The Hypocrites)",
  "64. At-Taghabun (The Mutual Disillusion)",
  "65. At-Talaq (The Divorce)",
  "66. At-Tahrim (The Prohibition)",
  "67. Al-Mulk (The Sovereignty)",
  "68. Al-Qalam (The Pen)",
  "69. Al-Haqqah (The Reality)",
  "70. Al-Ma’arij (The Ascending Stairways)",
  "71. Nuh (Noah)",
  "72. Al-Jinn (The Jinn)",
  "73. Al-Muzzammil (The Enshrouded One)",
  "74. Al-Muddaththir (The Cloaked One)",
  "75. Al-Qiyamah (The Resurrection)",
  "76. Al-Insan (Man)",
  "77. Al-Mursalat (The Emissaries)",
  "78. An-Naba (The Tidings)",
  "79. An-Nazi’at (Those who drag forth)",
  "80. Abasa (He frowned)",
  "81. At-Takwir (The Overthrowing)",
  "82. Al-Infitar (The Cleaving)",
  "83. Al-Mutaffifin (Defrauding)",
  "84. Al-Inshiqaq (The Splitting Open)",
  "85. Al-Buruj (The Mansions of the Stars)",
  "86. At-Tariq (The Morning Star)",
  "87. Al-A’la (The Most High)",
  "88. Al-Ghashiyah (The Overwhelming)",
  "89. Al-Fajr (The Dawn)",
  "90. Al-Balad (The City)",
  "91. Ash-Shams (The Sun)",
  "92. Al-Lail (The Night)",
  "93. Ad-Duhaa (The Morning Hours)",
  "94. Ash-Sharh (The Relief)",
  "95. At-Tin (The Fig)",
  "96. Al-‘Alaq (The Clot)",
  "97. Al-Qadr (The Power)",
  "98. Al-Bayyina (The Clear Proof)",
  "99. Az-Zalzalah (The Earthquake)",
  "100. Al-Adiyat (The Courser)",
  "101. Al-Qari’ah (The Calamity)",
  "102. At-Takathur (Rivalry in world increase)",
  "103. Al-Asr (The Declining Day)",
  "104. Al-Humazah (The Traducer)",
  "105. Al-Fil (The Elephant)",
  "106. Quraish (Quraish)",
  "107. Al-Ma’un (Small Kindnesses)",
  "108. Al-Kawthar (Abundance)",
  "109. Al-Kafirun (The Disbelievers)",
  "110. An-Nasr (Divine Support)",
  "111. Al-Masad (The Palm Fiber)",
  "112. Al-Ikhlas (The Sincerity)",
  "113. Al-Falaq (The Daybreak)",
  "114. An-Nas (Mankind)"
];

async function loadQuran() {
    const res = await fetch('quran.json');
    const quran = await res.json();
    quranData = [];
    surahList = [];

    // Group ayat by surah
    const surahMap = {};
    quran.verses.forEach(v => {
        let surahNum = 0, ayahNum = 0;
        if (v.verse_key) {
            const parts = v.verse_key.split(':');
            surahNum = parseInt(parts[0]);
            ayahNum = parseInt(parts[1]);
        } else if (v.id) {
            surahNum = Math.floor((v.id - 1) / 286) + 1;
            ayahNum = v.id;
        }
        if (!surahMap[surahNum]) surahMap[surahNum] = [];
        surahMap[surahNum].push({
            number: ayahNum,
            text: v.text_uthmani,
            surahIndex: surahNum
        });
    });

    // Generate surahList and quranData
    Object.keys(surahMap).forEach(surahNum => {
        const idx = parseInt(surahNum) - 1;
        const surahName = surahs[idx] || `Surah ${surahNum}`;
        surahList.push({
            name: surahName,
            index: parseInt(surahNum),
            ayahCount: surahMap[surahNum].length
        });
        surahMap[surahNum].forEach(ayah => {
            quranData.push({
                surah: surahName,
                surahAr: "",
                surahIndex: parseInt(surahNum),
                number: ayah.number,
                text: ayah.text
            });
        });
    });

    loaded = true;
    updateGlobalProgress();
}

function loadMemorized() {
    return JSON.parse(localStorage.getItem("memorized") || "[]");
}

function saveMemorized(mems) {
    localStorage.setItem("memorized", JSON.stringify(mems));
}

function getGlobalProgress() {
    const mems = loadMemorized();
    const percent = quranData.length === 0 ? 0 : (100 * mems.length) / quranData.length;
    return {
        floor: Math.floor(percent),
        precise: percent.toFixed(4)
    };
}

function getSurahProgress(surahName) {
    const mems = loadMemorized();
    const ayat = quranData.filter(a => a.surah === surahName);
    if (ayat.length === 0) return 0;
    const memAyat = mems.filter(m => m.surah === surahName);
    return Math.floor((100 * memAyat.length) / ayat.length);
}

function showSurahs() {
    if (!loaded) return;
    const content = document.getElementById("content");
    content.innerHTML = "<h2>Surah List</h2>";
    surahList.forEach(surah => {
        const btn = document.createElement("button");
        btn.className = "surah-btn";
        btn.onclick = () => showAyat(surah.name);
        btn.innerHTML = `
            <span class="surah-title">${surah.name}</span>
            <span class="surah-progress">${getSurahProgress(surah.name)}%</span>
        `;
        content.appendChild(btn);
    });
}

function showAyat(surahName) {
    const content = document.getElementById("content");
    const ayat = quranData.filter(a => a.surah === surahName);
    const mems = loadMemorized();
    content.innerHTML = `<h2>${surahName}</h2>
        <button onclick="showSurahs()">⬅ Back</button>
        <button id="toggle-all-btn">Check/Uncheck All</button>`;

    ayat.forEach(a => {
        const div = document.createElement("div");
        div.className = "ayat";
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "checkbox";
        checkbox.checked = mems.some(m => m.surah === a.surah && m.number === a.number);
        checkbox.onchange = () => {
            let updated;
            if (checkbox.checked) {
                updated = [...mems, {...a, date: new Date().toISOString()}];
            } else {
                updated = mems.filter(m => !(m.surah === a.surah && m.number === a.number));
            }
            saveMemorized(updated);
            updateGlobalProgress();
            showAyat(surahName);
        };
        div.appendChild(checkbox);
        div.append(`${a.number}. ${a.text}`);
        content.appendChild(div);
    });

    // Toggle all button logic
    setTimeout(() => {
        const btn = document.getElementById("toggle-all-btn");
        if (!btn) return;
        const allChecked = ayat.every(a => mems.some(m => m.surah === a.surah && m.number === a.number));
        btn.innerText = allChecked ? "Uncheck All" : "Check All";
        btn.onclick = () => {
            let updated;
            if (allChecked) {
                // Uncheck all ayat in the surah
                updated = mems.filter(m => m.surah !== surahName);
            } else {
                // Check all ayat in the surah
                const ayatToAdd = ayat.filter(a => !mems.some(m => m.surah === a.surah && m.number === a.number))
                    .map(a => ({...a, date: new Date().toISOString()}));
                updated = [...mems, ...ayatToAdd];
            }
            saveMemorized(updated);
            updateGlobalProgress();
            showAyat(surahName);
        };
    }, 0);
}

function showReview() {
    if (!loaded) return;
    const content = document.getElementById("content");
    const mems = loadMemorized();
    const today = new Date();
    const reviewAyat = mems.filter(m => {
        const d = new Date(m.date || new Date());
        return (today - d) / (1000 * 60 * 60 * 24) >= 7;
    });

    content.innerHTML = "<h2>Review</h2>";
    if (reviewAyat.length === 0) {
        content.innerHTML += "<p>Nothing to review for now.</p>";
        return;
    }
    reviewAyat.forEach(a => {
        const div = document.createElement("div");
        div.className = "ayat";
        div.innerHTML = `<b>${a.surah} ${a.number}</b><br><span>${a.text}</span><br><input placeholder="Write the ayah here..." style="width:100%">`;
        content.appendChild(div);
    });
}

function updateGlobalProgress() {
    const percent = getGlobalProgress();
    document.getElementById("global-progress").innerText =
        `Global progress: ${percent.floor}% (${percent.precise}%)`;
}

function saveProgressToFile() {
    const mems = loadMemorized();
    const blob = new Blob([JSON.stringify(mems, null, 2)], {type: "application/json"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "progress.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function loadProgressFromFile(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const mems = JSON.parse(e.target.result);
            if (Array.isArray(mems)) {
                saveMemorized(mems);
                updateGlobalProgress();
                showSurahs();
                alert("Progress loaded!");
            } else {
                alert("Invalid file.");
            }
        } catch {
            alert("Error reading file.");
        }
    };
    reader.readAsText(file);
}

// Initialization
loadQuran();