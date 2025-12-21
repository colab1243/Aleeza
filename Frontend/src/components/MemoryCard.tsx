import { Memory } from '../types';

interface MemoryCardProps {
  memory: Memory;
  onClick: () => void;
}

const MemoryCard = ({ memory, onClick }: MemoryCardProps) => {
  return (
    <div className="memory-card" onClick={onClick}>
      <div className="memory-image-container">
        <img src={memory.imageUrl} alt={memory.title} />
        <div className="memory-overlay">
          <div className="memory-overlay-content">
            <h3>{memory.title}</h3>
            <p>{new Date(memory.date).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoryCard;

