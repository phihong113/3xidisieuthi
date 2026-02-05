import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Swords, RefreshCw, CheckCircle2, Settings, X, Plus, Trash2, Save } from 'lucide-react';
import { initialMembers, statConfig as defaultStatConfig } from './data';
import './index.css';

import { db } from './firebase';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';

function App() {
  // Initialize with defaults, but will be overwritten by DB
  const [members, setMembers] = useState(initialMembers);
  const [statConfig, setStatConfig] = useState(defaultStatConfig);

  const [selectedIds, setSelectedIds] = useState([]);
  const [viewMode, setViewMode] = useState('selection');

  // --- FIREBASE SYNC ---
  useEffect(() => {
    // Listen to real-time updates from Firestore
    const unsub = onSnapshot(doc(db, "zalo_app", "main_data"), (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        if (data.members) setMembers(data.members);
        if (data.statConfig) setStatConfig(data.statConfig);
      } else {
        // First run: Create the doc with initial data
        saveToDb(initialMembers, defaultStatConfig);
      }
    });
    return () => unsub();
  }, []);

  const saveToDb = async (newMembers, newConfig) => {
    try {
      await setDoc(doc(db, "zalo_app", "main_data"), {
        members: newMembers,
        statConfig: newConfig
      });
    } catch (error) {
      console.error("Error saving to DB:", error);
      alert("Lỗi lưu dữ liệu! Kiểm tra kết nối Internet.");
    }
  };
  // ---------------------

  const toggleSelection = (id) => {
    if (viewMode !== 'selection') return;
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((sid) => sid !== id));
    } else {
      if (selectedIds.length < 2) {
        setSelectedIds([...selectedIds, id]);
      } else {
        setSelectedIds([selectedIds[1], id]);
      }
    }
  };

  const startComparison = () => {
    if (selectedIds.length === 2) {
      setViewMode('comparison');
    }
  };

  const backToSelection = () => {
    setViewMode('selection');
    setSelectedIds([]);
  };

  // Edit Mode Handlers
  const openEditMode = () => {
    const password = prompt("Nhập mật khẩu quản trị:");
    if (password === "9297") {
      setViewMode('edit');
    } else if (password !== null) {
      alert("Sai mật khẩu!");
    }
  };
  const closeEditMode = () => setViewMode('selection');

  const updateMember = (id, updates) => {
    const newMembers = members.map(m => m.id === id ? { ...m, ...updates } : m);
    // Optimistic update (optional, but using DB sync for truth)
    // setMembers(newMembers); 
    saveToDb(newMembers, statConfig);
  };

  const addMember = () => {
    const newId = Date.now().toString();
    const newMember = {
      id: newId,
      name: 'Thành viên mới',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${newId}`,
      stats: { stat1: 50, stat2: 50, stat3: 50, stat4: 50 }
    };
    const newMembers = [...members, newMember];
    saveToDb(newMembers, statConfig);
  };

  const removeMember = (id) => {
    if (members.length <= 2) {
      alert("Cần ít nhất 2 thành viên để so kèo!");
      return;
    }
    const newMembers = members.filter(m => m.id !== id);
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(sid => sid !== id));
    }
    saveToDb(newMembers, statConfig);
  };

  const updateStatConfig = (key, updates) => {
    const newConfig = {
      ...statConfig,
      [key]: { ...statConfig[key], ...updates }
    };
    saveToDb(members, newConfig);
  };

  const selectedMembers = members.filter((m) => selectedIds.includes(m.id));

  return (
    <div className="app-container">
      <header>
        {viewMode !== 'comparison' && (
          <h1 className="title">3 xị đi SIÊU THỊ</h1>
        )}
        {viewMode === 'selection' && (
          <button className="settings-btn" onClick={openEditMode}>
            <Settings size={24} />
          </button>
        )}
      </header>

      <div className="main-content">
        <AnimatePresence mode="wait">
          {viewMode === 'selection' && (
            <SelectionView
              key="selection"
              members={members}
              selectedIds={selectedIds}
              onToggle={toggleSelection}
              onCompare={startComparison}
            />
          )}

          {viewMode === 'comparison' && (
            <ComparisonView
              key="comparison"
              member1={selectedMembers[0]}
              member2={selectedMembers[1]}
              statConfig={statConfig}
              onBack={backToSelection}
            />
          )}

          {viewMode === 'edit' && (
            <EditView
              key="edit"
              members={members}
              statConfig={statConfig}
              onClose={closeEditMode}
              onUpdate={updateMember}
              onAdd={addMember}
              onRemove={removeMember}
              onUpdateStatConfig={updateStatConfig}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function SelectionView({ members, selectedIds, onToggle, onCompare }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="selection-view"
    >
      <h3 className="subtitle">Chọn 2 thành viên để so kèo</h3>
      <div className="members-grid">
        {members.map((member) => {
          const isSelected = selectedIds.includes(member.id);
          return (
            <motion.div
              key={member.id}
              className={`member-card ${isSelected ? 'selected' : ''}`}
              onClick={() => onToggle(member.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="avatar-wrapper">
                <img src={member.avatar} alt={member.name} />
                {isSelected && (
                  <div className="check-badge">
                    <CheckCircle2 size={20} color="white" />
                  </div>
                )}
              </div>
              <div className="member-name">{member.name}</div>
            </motion.div>
          );
        })}
      </div>

      <div className="action-area">
        <button
          className={`compare-btn ${selectedIds.length === 2 ? 'active' : ''}`}
          onClick={onCompare}
          disabled={selectedIds.length !== 2}
        >
          <Swords size={20} />
          <span>So sánh ngay</span>
        </button>
      </div>
    </motion.div>
  );
}

function EditView({ members, statConfig, onClose, onUpdate, onAdd, onRemove, onUpdateStatConfig }) {
  const [editingId, setEditingId] = useState(null);
  const [activeTab, setActiveTab] = useState('members'); // 'members', 'config', 'data'

  return (
    <motion.div
      className="edit-view"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
    >
      <div className="edit-header">
        <h2>Quản lý & Cài đặt</h2>
        <button className="close-btn" onClick={onClose}>
          <X size={24} />
        </button>
      </div>

      <div className="edit-tabs">
        <button
          className={`tab-btn ${activeTab === 'members' ? 'active' : ''}`}
          onClick={() => setActiveTab('members')}
        >
          Thành viên
        </button>
        <button
          className={`tab-btn ${activeTab === 'config' ? 'active' : ''}`}
          onClick={() => setActiveTab('config')}
        >
          Cấu hình
        </button>
        <button
          className={`tab-btn ${activeTab === 'data' ? 'active' : ''}`}
          onClick={() => setActiveTab('data')}
        >
          Dữ liệu
        </button>
      </div>

      <div className="edit-content-container">
        {activeTab === 'data' ? (
          <DataManagement
            members={members}
            statConfig={statConfig}
            onImport={(data) => {
              if (data.members && Array.isArray(data.members)) {
                if (window.confirm("Hành động này sẽ thay thế toàn bộ dữ liệu hiện tại. Bạn có chắc không?")) {
                  localStorage.setItem('zalo_battle_members', JSON.stringify(data.members));
                  if (data.statConfig) {
                    localStorage.setItem('zalo_battle_stats', JSON.stringify(data.statConfig));
                  }
                  window.location.reload();
                }
              } else {
                alert('Dữ liệu không đúng định dạng!');
              }
            }}
          />
        ) : activeTab === 'config' ? (
          <div className="stat-config-editor">
            {Object.entries(statConfig).map(([key, config]) => (
              <div key={key} className="stat-config-row">
                <div className="color-preview" style={{ background: config.color }}></div>
                <input
                  type="text"
                  value={config.label}
                  onChange={(e) => onUpdateStatConfig(key, { label: e.target.value })}
                  placeholder="Tên chỉ số..."
                />
                <input
                  type="color"
                  value={config.color}
                  onChange={(e) => onUpdateStatConfig(key, { color: e.target.value })}
                  title="Màu sắc"
                />
              </div>
            ))}
            <p className="hint-text">*Đổi tên các chỉ số để phù hợp với luật chơi của bạn.</p>
          </div>
        ) : (
          <div className="edit-list">
            {members.map((member) => (
              <div key={member.id} className="edit-item">
                {editingId === member.id ? (
                  <MemberEditor
                    member={member}
                    statConfig={statConfig}
                    onUpdate={onUpdate}
                    onDone={() => setEditingId(null)}
                  />
                ) : (
                  <div className="member-preview" onClick={() => setEditingId(member.id)}>
                    <img src={member.avatar} alt="avatar" className="mini-avatar" />
                    <div className="info">
                      <div className="name">{member.name}</div>
                      <div className="stats-summary">
                        {/* Tiny summary */}
                        <span style={{ color: statConfig.stat1.color }}>{statConfig.stat1.label.charAt(0)}:{member.stats.stat1}</span>
                        <span style={{ color: statConfig.stat2.color }}>{statConfig.stat2.label.charAt(0)}:{member.stats.stat2}</span>
                        <span style={{ color: statConfig.stat3.color }}>{statConfig.stat3.label.charAt(0)}:{member.stats.stat3}</span>
                        <span style={{ color: statConfig.stat4.color }}>{statConfig.stat4.label.charAt(0)}:{member.stats.stat4}</span>
                      </div>
                    </div>
                    <button className="delete-btn-icon" onClick={(e) => {
                      e.stopPropagation();
                      if (window.confirm('Xóa thành viên này?')) onRemove(member.id);
                    }}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                )}
              </div>
            ))}

            <button className="add-btn" onClick={onAdd}>
              <Plus size={20} />
              <span>Thêm thành viên</span>
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function DataManagement({ members, statConfig, onImport }) {
  const [jsonInput, setJsonInput] = useState('');

  const handleExport = () => {
    const data = JSON.stringify({ members, statConfig });
    navigator.clipboard.writeText(data);
    alert('Đã copy dữ liệu! Gửi mã này cho bạn bè để họ nhập vào.');
  };

  const handleImport = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      onImport(parsed);
    } catch (e) {
      alert('Dữ liệu lỗi! Hãy kiểm tra lại đoạn mã.');
    }
  };

  return (
    <div className="data-management">
      <div className="data-section">
        <h3>1. Xuất dữ liệu (Gửi đi)</h3>
        <p className="hint-text">Sao chép cấu hình hiện tại để chia sẻ.</p>
        <button className="action-btn" onClick={handleExport}>Sao chép Data</button>
      </div>
      <div className="data-section">
        <h3>2. Nhập dữ liệu (Nhận về)</h3>
        <p className="hint-text">Dán mã từ bạn bè vào ô dưới đây.</p>
        <textarea
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder='Dán mã JSON vào đây...'
          rows={5}
          className="data-input"
        />
        <button className="action-btn import" onClick={handleImport}>Cập nhật Data</button>
      </div>
    </div>
  );
}

function MemberEditor({ member, statConfig, onUpdate, onDone }) {
  // Calculate specific totals for display if needed, but we rely on member.stats

  const handleChange = (field, value) => {
    onUpdate(member.id, { [field]: value });
  };

  const handleStatChange = (key, value) => {
    const val = parseInt(value) || 0;
    onUpdate(member.id, {
      stats: { ...member.stats, [key]: val }
    });
  };

  const handleQuickScoreChange = (val) => {
    let score = parseInt(val);
    if (isNaN(score)) return;

    // Apply logic: Lowest 0, Max 50
    if (score >= 0 && score <= 50) {
      const newStats = {};
      Object.keys(statConfig).forEach(key => {
        // Removing randomization to ensure exact average
        newStats[key] = score;
      });
      onUpdate(member.id, { stats: newStats });
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 500000) {
        alert("File ảnh quá lớn! Vui lòng chọn ảnh nhỏ hơn 500KB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        handleChange('avatar', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Calculate current average for display in Quick Score box
  const currentAvg = Math.round(
    Object.values(member.stats).reduce((a, b) => a + b, 0) / 4
  );

  return (
    <div className="member-editor-compact">
      <div className="editor-top-row">
        <div className="avatar-section">
          <img src={member.avatar} alt="Preview" onError={(e) => e.target.src = 'https://via.placeholder.com/100'} className="avatar-large" />

          <div className="upload-wrapper">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              id={`upload-${member.id}`}
            />
            <label htmlFor={`upload-${member.id}`} className="mini-upload-btn">📷 Đổi Ảnh</label>
          </div>
        </div>

        <div className="info-section">
          <div className="control-group">
            <label>Tên Chiến Binh</label>
            <input
              type="text"
              value={member.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="name-input"
            />
          </div>

          <div className="control-group">
            <label className="highlight-text">⚡ Điểm Nhanh (Max 50)</label>
            <div className="quick-score-wrapper">
              <input
                type="number"
                min="0"
                max="50"
                defaultValue={currentAvg}
                onBlur={(e) => handleQuickScoreChange(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleQuickScoreChange(e.currentTarget.value);
                }}
                placeholder={currentAvg}
                className="quick-score-box"
              />
              <span className="small-hint">Max 50</span>
            </div>
          </div>
        </div>
      </div>

      <div className="sliders-grid">
        {Object.entries(statConfig).map(([key, config]) => (
          <div key={key} className="slider-item">
            <div className="slider-header">
              <label style={{ color: config.color }}>{config.label}</label>
              {/* Hidden value per user request */}
            </div>
            <input
              type="range"
              min="0"
              max="50"
              value={member.stats[key]}
              onChange={(e) => handleStatChange(key, e.target.value)}
              className="custom-range"
              style={{ '--track-color': config.color }}
            />
          </div>
        ))}
      </div>

      <button className="done-btn-full" onClick={onDone}>
        <CheckCircle2 size={20} /> XONG
      </button>
    </div>
  );
}

function ComparisonView({ member1, member2, onBack, statConfig }) {
  const [baseScore, setBaseScore] = useState(30);

  const calculateTotal = (stats) => Object.values(stats).reduce((a, b) => a + b, 0);

  const total1 = calculateTotal(member1.stats);
  const total2 = calculateTotal(member2.stats);

  // Prevent division by zero
  const safeTotal1 = total1 || 1;
  const safeTotal2 = total2 || 1;

  let winnerId = 'draw';
  let score1 = 0;
  let score2 = 0;

  if (total1 > total2) {
    winnerId = member1.id;
    score2 = baseScore;
    score1 = (total1 / safeTotal2) * baseScore;
  } else if (total2 > total1) {
    winnerId = member2.id;
    score1 = baseScore;
    score2 = (total2 / safeTotal1) * baseScore;
  } else {
    // Draw
    score1 = baseScore;
    score2 = baseScore;
  }

  return (
    <motion.div
      className="comparison-view"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
    >
      <div className="score-control">
        <label>Điểm mốc (Người thua): </label>
        <input
          type="number"
          value={baseScore}
          onChange={(e) => setBaseScore(Number(e.target.value))}
          className="score-input"
        />
      </div>

      <div className="fighters-score-board">
        <div className={`fighter-score-card ${winnerId === member1.id ? 'winner' : ''} ${winnerId !== 'draw' && winnerId !== member1.id ? 'loser' : ''}`}>
          <img src={member1.avatar} className="avatar-score" alt="" />
          <div className="score-info">
            <h3>{member1.name}</h3>
            <div className="final-score">{Math.round(score1)}</div>
            {winnerId === member1.id && <div className="total-stat">Tổng lực: {total1}</div>}
          </div>
        </div>

        <div className="vs-divider">
          <span className="vs-text">VS</span>
        </div>

        <div className={`fighter-score-card ${winnerId === member2.id ? 'winner' : ''} ${winnerId !== 'draw' && winnerId !== member2.id ? 'loser' : ''}`}>
          <div className="score-info tr">
            <h3>{member2.name}</h3>
            <div className="final-score">{Math.round(score2)}</div>
            {winnerId === member2.id && <div className="total-stat">Tổng lực: {total2}</div>}
          </div>
          <img src={member2.avatar} className="avatar-score" alt="" />
        </div>
      </div>

      <div className="stats-board">
        {Object.keys(statConfig).map((key) => {
          const val1 = member1.stats[key] > 50 ? 50 : member1.stats[key]; // Cap visual at 50 if old data exists
          const val2 = member2.stats[key] > 50 ? 50 : member2.stats[key];
          const config = statConfig[key];

          return (
            <div key={key} className="stat-row">
              <div className="stat-label" style={{ color: config.color }}>{config.label}</div>
              <div className="stat-bars">
                <div className="bar-container left">
                  <motion.div
                    className="bar-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${(val1 / 50) * 100}%` }} // Scale to 50
                    transition={{ duration: 1, delay: 0.2 }}
                    style={{ background: config.color }}
                  />
                  {/* Text Hidden */}
                </div>
                <div className="bar-container right">
                  <motion.div
                    className="bar-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${(val2 / 50) * 100}%` }} // Scale to 50
                    transition={{ duration: 1, delay: 0.2 }}
                    style={{ background: config.color }}
                  />
                  {/* Text Hidden */}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <button className="reset-btn" onClick={onBack}>
        <RefreshCw size={20} />
        <span>Chọn cặp khác</span>
      </button>
    </motion.div>
  );
}

export default App;
