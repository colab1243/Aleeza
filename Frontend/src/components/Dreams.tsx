import { useState, useEffect } from 'react';
import { supabase } from '../config/supabase';
import { Dream } from '../types';
import './Dreams.css';

const Dreams = () => {
  const [dreams, setDreams] = useState<Dream[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'travel' | 'life' | 'small'>('all');

  useEffect(() => {
    const fetchDreams = async () => {
      try {
        const { data, error } = await supabase
          .from('dreams')
          .select('*');

        if (error) throw error;

        const dreamsData = data.map(item => ({
          id: item.id,
          title: item.title,
          description: item.description,
          category: item.category,
          icon: item.icon
        })) as Dream[];

        setDreams(dreamsData);
      } catch (error) {
        console.error('Error fetching dreams:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDreams();
  }, []);

  const filteredDreams = filter === 'all' 
    ? dreams 
    : dreams.filter(dream => dream.category === filter);

  if (loading) {
    return (
      <div className="dreams-container">
        <div className="loading">Loading our dreams...</div>
      </div>
    );
  }

  return (
    <div className="dreams-container">
      <div className="dreams-header">
        <h2 className="section-title">Our Dreams</h2>
        <p className="section-subtitle">All the adventures waiting for us... 🌟</p>
      </div>

      <div className="filter-buttons">
        <button 
          className={filter === 'all' ? 'active' : ''} 
          onClick={() => setFilter('all')}
        >
          All Dreams
        </button>
        <button 
          className={filter === 'travel' ? 'active' : ''} 
          onClick={() => setFilter('travel')}
        >
          ✈️ Travel
        </button>
        <button 
          className={filter === 'life' ? 'active' : ''} 
          onClick={() => setFilter('life')}
        >
          💫 Life Goals
        </button>
        <button 
          className={filter === 'small' ? 'active' : ''} 
          onClick={() => setFilter('small')}
        >
          💝 Little Wishes
        </button>
      </div>

      <div className="dreams-grid">
        {filteredDreams.map((dream, index) => (
          <div 
            key={dream.id} 
            className="dream-card"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="dream-icon">{dream.icon}</div>
            <h3 className="dream-title">{dream.title}</h3>
            <p className="dream-description">{dream.description}</p>
            <span className="dream-category">{dream.category}</span>
          </div>
        ))}
      </div>

      {filteredDreams.length === 0 && (
        <p className="no-dreams">No dreams in this category yet...</p>
      )}
    </div>
  );
};

export default Dreams;

