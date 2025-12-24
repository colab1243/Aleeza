import { Memory } from '../types';

interface MemoryCardProps {
  memory: Memory;
  onClick: () => void;
}

const MemoryCard = ({ memory, onClick }: MemoryCardProps) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.error('Image failed to load:', memory.imageUrl);
    const target = e.target as HTMLImageElement;
    target.style.display = 'none';
  };

  return (
    <div className="memory-card" onClick={onClick}>
      <div className="memory-image-container">
        {memory.imageUrl ? (
          <img 
            src={memory.imageUrl} 
            alt={memory.title}
            onError={handleImageError}
            onLoad={() => console.log('Image loaded successfully:', memory.imageUrl)}
          />
        ) : (
          <div style={{ 
            width: '100%', 
            height: '100%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            background: '#f8f0e3',
            color: '#8b7355'
          }}>
            No Image
          </div>
        )}
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

