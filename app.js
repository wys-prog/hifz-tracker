let quranData = []; // All ayat (with surah, number, text, surahIndex)
let surahList = []; // List of surahs (name, index, ayahCount)
let loaded = false;

const classicAyat = [
    { label: "Ayat al-Kursi (2:255)", value: "2:255" },
    { label: "Al-Fatiha (1:1)", value: "1:1" },
    { label: "Al-Ikhlas (112:1)", value: "112:1" },
    { label: "Al-Falaq (113:1)", value: "113:1" },
    { label: "An-Nas (114:1)", value: "114:1" },
    { label: "Al-Baqarah Last 2 Ayat (2:285)", value: "2:285" }
];

const surahs = [
    "1. الفاتحة — Al-Fatihah (The Opening)",
    "2. البقرة — Al-Baqarah (The Cow)",
    "3. آل عمران — Aal-E-Imran (The Family of Imran)",
    "4. النساء — An-Nisa (The Women)",
    "5. المائدة — Al-Maidah (The Table Spread)",
    "6. الأنعام — Al-An'am (The Cattle)",
    "7. الأعراف — Al-A'raf (The Heights)",
    "8. الأنفال — Al-Anfal (The Spoils of War)",
    "9. التوبة — At-Tawbah (The Repentance)",
    "10. يونس — Yunus (Jonah)",
    "11. هود — Hud (Hud)",
    "12. يوسف — Yusuf (Joseph)",
    "13. الرعد — Ar-Ra'd (The Thunder)",
    "14. إبراهيم — Ibrahim (Abraham)",
    "15. الحجر — Al-Hijr (The Rocky Tract)",
    "16. النحل — An-Nahl (The Bee)",
    "17. الإسراء — Al-Isra (The Night Journey)",
    "18. الكهف — Al-Kahf (The Cave)",
    "19. مريم — Maryam (Mary)",
    "20. طه — Taha (Taha)",
    "21. الأنبياء — Al-Anbiya (The Prophets)",
    "22. الحج — Al-Hajj (The Pilgrimage)",
    "23. المؤمنون — Al-Mu’minun (The Believers)",
    "24. النور — An-Nur (The Light)",
    "25. الفرقان — Al-Furqan (The Criterion)",
    "26. الشعراء — Ash-Shu'ara (The Poets)",
    "27. النمل — An-Naml (The Ant)",
    "28. القصص — Al-Qasas (The Stories)",
    "29. العنكبوت — Al-Ankabut (The Spider)",
    "30. الروم — Ar-Rum (The Romans)",
    "31. لقمان — Luqman (Luqman)",
    "32. السجدة — As-Sajda (The Prostration)",
    "33. الأحزاب — Al-Ahzab (The Combined Forces)",
    "34. سبإ — Saba (Sheba)",
    "35. فاطر — Fatir (The Originator)",
    "36. يس — Ya-Sin (Ya Sin)",
    "37. الصافات — As-Saffat (Those who set the Ranks)",
    "38. ص — Sad (The Letter Sad)",
    "39. الزمر — Az-Zumar (The Groups)",
    "40. غافر — Ghafir (The Forgiver)",
    "41. فصلت — Fussilat (Explained in Detail)",
    "42. الشورى — Ash-Shura (The Consultation)",
    "43. الزخرف — Az-Zukhruf (The Gold Adornments)",
    "44. الدخان — Ad-Dukhan (The Smoke)",
    "45. الجاثية — Al-Jathiyah (The Crouching)",
    "46. الأحقاف — Al-Ahqaf (The Wind-Curved Sandhills)",
    "47. محمد — Muhammad (Muhammad)",
    "48. الفتح — Al-Fath (The Victory)",
    "49. الحجرات — Al-Hujurat (The Rooms)",
    "50. ق — Qaf (The Letter Qaf)",
    "51. الذاريات — Adh-Dhariyat (The Winnowing Winds)",
    "52. الطور — At-Tur (The Mount)",
    "53. النجم — An-Najm (The Star)",
    "54. القمر — Al-Qamar (The Moon)",
    "55. الرحمن — Ar-Rahman (The Beneficent)",
    "56. الواقعة — Al-Waqi’ah (The Inevitable)",
    "57. الحديد — Al-Hadid (The Iron)",
    "58. المجادلة — Al-Mujadila (The Pleading Woman)",
    "59. الحشر — Al-Hashr (The Exile)",
    "60. الممتحنة — Al-Mumtahanah (She that is to be examined)",
    "61. الصف — As-Saf (The Ranks)",
    "62. الجمعة — Al-Jumu’ah (The Congregation)",
    "63. المنافقون — Al-Munafiqun (The Hypocrites)",
    "64. التغابن — At-Taghabun (The Mutual Disillusion)",
    "65. الطلاق — At-Talaq (The Divorce)",
    "66. التحريم — At-Tahrim (The Prohibition)",
    "67. الملك — Al-Mulk (The Sovereignty)",
    "68. القلم — Al-Qalam (The Pen)",
    "69. الحاقة — Al-Haqqah (The Reality)",
    "70. المعارج — Al-Ma’arij (The Ascending Stairways)",
    "71. نوح — Nuh (Noah)",
    "72. الجن — Al-Jinn (The Jinn)",
    "73. المزمل — Al-Muzzammil (The Enshrouded One)",
    "74. المدثر — Al-Muddaththir (The Cloaked One)",
    "75. القيامة — Al-Qiyamah (The Resurrection)",
    "76. الإنسان — Al-Insan (Man)",
    "77. المرسلات — Al-Mursalat (The Emissaries)",
    "78. النبأ — An-Naba (The Tidings)",
    "79. النازعات — An-Nazi’at (Those who drag forth)",
    "80. عبس — Abasa (He frowned)",
    "81. التكوير — At-Takwir (The Overthrowing)",
    "82. الإنفطار — Al-Infitar (The Cleaving)",
    "83. المطففين — Al-Mutaffifin (Defrauding)",
    "84. الإنشقاق — Al-Inshiqaq (The Splitting Open)",
    "85. البروج — Al-Buruj (The Mansions of the Stars)",
    "86. الطارق — At-Tariq (The Morning Star)",
    "87. الأعلى — Al-A’la (The Most High)",
    "88. الغاشية — Al-Ghashiyah (The Overwhelming)",
    "89. الفجر — Al-Fajr (The Dawn)",
    "90. البلد — Al-Balad (The City)",
    "91. الشمس — Ash-Shams (The Sun)",
    "92. الليل — Al-Lail (The Night)",
    "93. الضحى — Ad-Duhaa (The Morning Hours)",
    "94. الشرح — Ash-Sharh (The Relief)",
    "95. التين — At-Tin (The Fig)",
    "96. العلق — Al-‘Alaq (The Clot)",
    "97. القدر — Al-Qadr (The Power)",
    "98. البينة — Al-Bayyina (The Clear Proof)",
    "99. الزلزلة — Az-Zalzalah (The Earthquake)",
    "100. العاديات — Al-Adiyat (The Courser)",
    "101. القارعة — Al-Qari’ah (The Calamity)",
    "102. التكاثر — At-Takathur (Rivalry in world increase)",
    "103. العصر — Al-Asr (The Declining Day)",
    "104. الهمزة — Al-Humazah (The Traducer)",
    "105. الفيل — Al-Fil (The Elephant)",
    "106. قريش — Quraish (Quraish)",
    "107. الماعون — Al-Ma’un (Small Kindnesses)",
    "108. الكوثر — Al-Kawthar (Abundance)",
    "109. الكافرون — Al-Kafirun (The Disbelievers)",
    "110. النصر — An-Nasr (Divine Support)",
    "111. المسد — Al-Masad (The Palm Fiber)",
    "112. الإخلاص — Al-Ikhlas (The Sincerity)",
    "113. الفلق — Al-Falaq (The Daybreak)",
    "114. الناس — An-Nas (Mankind)"
];

function getRecentSearches() {
    return JSON.parse(localStorage.getItem("recentSearches") || "[]");
}

function addRecentSearch(val) {
    let recents = getRecentSearches();
    recents = recents.filter(v => v !== val);
    recents.unshift(val);
    if (recents.length > 5) recents = recents.slice(0, 5);
    localStorage.setItem("recentSearches", JSON.stringify(recents));
}

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

function getMemorizedCount() {
    return loadMemorized().length;
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

function resetMemorized() {
    if (!confirm("Are you sure you want to reset all memorized verses?")) return;
    if (!confirm("This action is irreversible. Confirm again to erase everything.")) return;
    saveMemorized([]);
    updateGlobalProgress();
    showSurahs();
    alert("All memorized verses have been reset.");
}

function goToAyah(input) {
    if (!input) return;
    addRecentSearch(input);

    let surahPart = "", ayahPart = "";
    if (input.includes(":")) {
        [surahPart, ayahPart] = input.split(":");
    } else {
        alert("Format: Surah:Ayah (e.g. 2:255 or Al-Baqarah:255)");
        return;
    }
    ayahPart = ayahPart.trim();

    let surahName = "";
    if (/^\d+$/.test(surahPart.trim())) {
        const idx = parseInt(surahPart.trim()) - 1;
        if (idx < 0 || idx >= surahList.length) {
            alert("Surah number not found.");
            return;
        }
        surahName = surahList[idx].name;
    } else {
        const found = surahList.find(s => 
            s.name.toLowerCase().includes(surahPart.trim().toLowerCase()) ||
            s.name.split('—')[1]?.toLowerCase().includes(surahPart.trim().toLowerCase())
        );

        if (!found) {
            alert("Surah name not found.");
            return;
        }
        surahName = found.name;
    }

    const ayahNum = parseInt(ayahPart);
    const ayat = quranData.filter(a => a.surah === surahName);
    if (!ayat.some(a => a.number === ayahNum)) {
        alert("Ayah not found in this surah.");
        return;
    }

    showAyat(surahName);

    setTimeout(() => {
        const ayahDivs = Array.from(document.querySelectorAll("#content .ayat"));
        const targetDiv = ayahDivs.find(div => div.textContent.startsWith(ayahNum + "."));
        if (targetDiv) {
            targetDiv.scrollIntoView({behavior: "smooth", block: "center"});
            targetDiv.style.background = "#fff9c4";
            setTimeout(() => targetDiv.style.background = "", 2000);
        }
    }, 100);
}

function showSurahs() {
    if (!loaded) return;
    const content = document.getElementById("content");
    content.innerHTML = "<h2>Surah List</h2>";

    // "goto"
    const gotoDiv = document.createElement("div");
    gotoDiv.style.marginBottom = "1em";
    gotoDiv.innerHTML = `
        <input id="goto-input" placeholder="Go to (e.g. 2:255 or Al-Baqarah:255)" style="width:220px;">
        <button id="goto-btn">Go</button>
    `;
    content.appendChild(gotoDiv);

    document.getElementById("goto-btn").onclick = () => {
        const val = document.getElementById("goto-input").value.trim();
        goToAyah(val);
    };

    const recents = getRecentSearches();
    if (recents.length > 0) {
        const recentDiv = document.createElement("div");
        recentDiv.style.margin = "0.5em 0";
        recentDiv.innerHTML = `<b>Recent:</b> `;
        recents.forEach(val => {
            const btn = document.createElement("button");
            btn.textContent = val;
            btn.style.marginRight = "0.5em";
            btn.onclick = () => goToAyah(val);
            recentDiv.appendChild(btn);
        });
        content.appendChild(recentDiv);
    }

    const classicDiv = document.createElement("div");
    classicDiv.style.margin = "0.5em 0";
    classicDiv.innerHTML = `<b>Classics:</b> `;
    classicAyat.forEach(item => {
        const btn = document.createElement("button");
        btn.textContent = item.label;
        btn.style.marginRight = "0.5em";
        btn.onclick = () => goToAyah(item.value);
        classicDiv.appendChild(btn);
    });
    content.appendChild(classicDiv);

    // Add the "reset" button
    const resetBtn = document.createElement("button");
    resetBtn.innerText = "Reset Memorized";
    resetBtn.onclick = resetMemorized;
    resetBtn.style.marginBottom = "1em";
    content.appendChild(resetBtn);

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

    // Grouper par sourate
    const bySurah = {};
    mems.forEach(a => {
        if (!bySurah[a.surah]) bySurah[a.surah] = [];
        bySurah[a.surah].push(a);
    });

    content.innerHTML = "<h2>Upcoming Reviews</h2>";
    if (mems.length === 0) {
        content.innerHTML += "<p>No ayat memorized yet.</p>";
        return;
    }

    Object.keys(bySurah).forEach((surah, idx) => {
        // Container
        const groupDiv = document.createElement("div");
        groupDiv.className = "surah-group";

        // Button header
        const header = document.createElement("h3");
        header.style.display = "flex";
        header.style.alignItems = "center";
        header.style.cursor = "pointer";

        const toggleBtn = document.createElement("button");
        toggleBtn.textContent = "+";
        toggleBtn.style.marginRight = "0.7em";
        toggleBtn.style.fontWeight = "bold";
        toggleBtn.style.fontSize = "1.1em";
        toggleBtn.style.width = "2em";
        toggleBtn.style.height = "2em";
        toggleBtn.style.padding = "0";
        toggleBtn.style.background = "#263e3d";
        toggleBtn.style.border = "none";
        toggleBtn.style.borderRadius = "50%";
        toggleBtn.style.color = "#aadcd6";
        toggleBtn.style.cursor = "pointer";

        header.appendChild(toggleBtn);
        header.appendChild(document.createTextNode(surah));
        groupDiv.appendChild(header);

        const ayatDiv = document.createElement("div");
        ayatDiv.style.display = "none";
        bySurah[surah]
            .sort((a, b) => a.number - b.number)
            .forEach(a => {
                const d = new Date(a.date || new Date());
                const days = Math.floor((today - d) / (1000 * 60 * 60 * 24));
                let status = "";
                if (days >= 7) {
                    status = `<span style="color:#e57373;font-weight:bold;">Review now!</span>`;
                } else if (days >= 5) {
                    status = `<span style="color:#ffd54f;font-weight:bold;">Review soon</span>`;
                } else {
                    status = `<span style="color:#81c784;">Fresh</span>`;
                }
                const ayatElem = document.createElement("div");
                ayatElem.className = "ayat";
                ayatElem.innerHTML = `
                    <b>${a.number}</b> — <i>${days} day(s) ago</i> ${status}<br>
                    <span>${a.text}</span>
                `;
                ayatDiv.appendChild(ayatElem);
            });
        groupDiv.appendChild(ayatDiv);

        // Toggle logic
        toggleBtn.onclick = () => {
            const isOpen = ayatDiv.style.display === "block";
            ayatDiv.style.display = isOpen ? "none" : "block";
            toggleBtn.textContent = isOpen ? "+" : "−";
        };

        content.appendChild(groupDiv);
    });
}

function updateGlobalProgress() {
    const percent = getGlobalProgress();
    document.getElementById("global-progress").innerText =
        `Global progress: ${percent.floor}% (${percent.precise}%), ${getMemorizedCount()} ayat (verses)`;

    // Masallah !!
    if (percent.floor === 100) {
        const msg = document.createElement("div");
        msg.style.marginTop = "1em";
        msg.style.padding = "1em";
        msg.style.background = "#e0ffe0";
        msg.style.border = "1px solid #b2ffb2";
        msg.style.borderRadius = "8px";
        msg.innerHTML = `
            <b>🌟 MashaAllah! 🌟</b><br>
            You have memorized the entire Quran!<br>
            <i>May Allah keep it firm in your heart and grant you barakah. آمين</i>
        `;
        document.getElementById("global-progress").appendChild(msg);
    }
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
            let mems = JSON.parse(e.target.result);
            if (Array.isArray(mems)) {
                mems = mems.map(m => {
                    if (typeof m.surahIndex === "number" && surahList[m.surahIndex - 1]) {
                        return {
                            ...m,
                            surah: surahList[m.surahIndex - 1].name
                        };
                    }
                    const found = surahList.find(s => s.name.includes(m.surah));
                    return found ? { ...m, surah: found.name } : m;
                });
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