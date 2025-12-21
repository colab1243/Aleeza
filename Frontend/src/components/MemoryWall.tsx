import { useState, useEffect } from 'react';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Memory } from '../types';
import MemoryCard from './MemoryCard';
import './MemoryWall.css';

const MemoryWall = () => {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);

  useEffect(() => {
    const fetchMemories = async () => {
      try {
        const memoriesQuery = query(
          collection(db, 'memories'),
          orderBy('date', 'desc')
        );
        const snapshot = await getDocs(memoriesQuery);
        const memoriesData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          date: doc.data().date.toDate()
        })) as Memory[];
        setMemories(memoriesData);
      } catch (error) {
        console.error('Error fetching memories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMemories();
  }, []);

  if (loading) {
    return (
      <div className="memory-wall">
        <div className="loading">Loading our beautiful memories...</div>
      </div>
    );
  }

  return (
    <div className="memory-wall">
      <div className="memory-wall-header">
        <h2 className="section-title">Our Little Moments</h2>
        <p className="section-subtitle">The memories that make my heart smile... 💕</p>
      </div>
      
      <div className="memory-grid">
        {memories.map((memory) => (
          <MemoryCard
            key={memory.id}
            memory={memory}
            onClick={() => setSelectedMemory(memory)}
          />
        ))}
      </div>

      {selectedMemory && (
        <div className="memory-modal" onClick={() => setSelectedMemory(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={() => setSelectedMemory(null)}>
              ✕
            </button>
            <img src={selectedMemory.imageUrl} alt={selectedMemory.title} />
            <div className="modal-info">
              <h3>{selectedMemory.title}</h3>
              <p className="modal-date">
                {new Date(selectedMemory.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
              <p className="modal-description">{selectedMemory.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemoryWall;

