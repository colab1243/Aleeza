import { useState, useEffect, useRef } from 'react';
import { supabase } from '../config/supabase';
import { Memory } from '../types';
import MemoryCard from './MemoryCard';
import './MemoryWall.css';

const MemoryWall = () => {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    title: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    category: 'special',
    image: null as File | null
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchMemories();
  }, []);

  const fetchMemories = async () => {
    try {
      const { data, error } = await supabase
        .from('memory')
        .select('*')
        .order('date', { ascending: false });

      if (error) throw error;

      const memoriesData = data.map(item => {
        const imageUrl = item.image_url || item.imageUrl || item.imageUrl;
        console.log('Memory item:', item);
        console.log('Image URL:', imageUrl);
        return {
          id: item.id,
          title: item.title,
          description: item.description,
          date: new Date(item.date),
          imageUrl: imageUrl,
          category: item.category
        };
      }) as Memory[];

      console.log('All memories:', memoriesData);
      setMemories(memoriesData);
    } catch (error) {
      console.error('Error fetching memories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadForm({ ...uploadForm, image: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadForm.image || !uploadForm.title.trim() || !uploadForm.description.trim()) {
      alert('Please fill in all fields and select an image');
      return;
    }

    setUploading(true);
    try {
      const fileExt = uploadForm.image.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `memories/${fileName}`;

      console.log('Uploading to bucket: Zuz, path:', filePath);

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('Zuz')
        .upload(filePath, uploadForm.image, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        console.error('Storage upload error:', uploadError);
        throw new Error(`Upload failed: ${uploadError.message}`);
      }

      console.log('Upload successful:', uploadData);

      const { data: { publicUrl } } = supabase.storage
        .from('Zuz')
        .getPublicUrl(filePath);

      console.log('Public URL:', publicUrl);
      
      if (!publicUrl) {
        const manualUrl = `${supabaseUrl}/storage/v1/object/public/Zuz/${filePath}`;
        console.log('Manual URL:', manualUrl);
      }

      const { data: insertData, error: insertError } = await supabase
        .from('memory')
        .insert({
          title: uploadForm.title.trim(),
          description: uploadForm.description.trim(),
          date: uploadForm.date,
          image_url: publicUrl,
          category: uploadForm.category
        })
        .select();

      if (insertError) {
        console.error('Database insert error:', insertError);
        throw new Error(`Database insert failed: ${insertError.message}`);
      }

      console.log('Memory saved:', insertData);

      setShowUploadModal(false);
      setUploadForm({
        title: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
        category: 'special',
        image: null
      });
      setImagePreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      await fetchMemories();
    } catch (error: any) {
      console.error('Error uploading memory:', error);
      const errorMessage = error?.message || error?.toString() || 'Unknown error';
      alert(`Failed to upload memory: ${errorMessage}\n\nCheck the browser console for details.`);
    } finally {
      setUploading(false);
    }
  };

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
      
      <button 
        className="add-memory-button"
        onClick={() => setShowUploadModal(true)}
        title="Add a new memory"
      >
        + Add Memory
      </button>
      
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

      {showUploadModal && (
        <div className="memory-modal" onClick={() => !uploading && setShowUploadModal(false)}>
          <div className="modal-content upload-modal" onClick={(e) => e.stopPropagation()}>
            <button 
              className="close-button" 
              onClick={() => !uploading && setShowUploadModal(false)}
              disabled={uploading}
            >
              ✕
            </button>
            <form className="upload-form" onSubmit={handleUpload}>
              <h3 className="upload-title">Add a New Memory 💕</h3>
              
              <div className="form-group">
                <label>Photo</label>
                <div className="image-upload-area">
                  {imagePreview ? (
                    <div className="image-preview-container">
                      <img src={imagePreview} alt="Preview" className="image-preview" />
                      <button
                        type="button"
                        className="change-image-button"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        Change Image
                      </button>
                    </div>
                  ) : (
                    <div 
                      className="image-upload-placeholder"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <span className="upload-icon">📷</span>
                      <span>Click to select an image</span>
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    style={{ display: 'none' }}
                    disabled={uploading}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  value={uploadForm.title}
                  onChange={(e) => setUploadForm({ ...uploadForm, title: e.target.value })}
                  placeholder="Our First Date..."
                  required
                  disabled={uploading}
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={uploadForm.description}
                  onChange={(e) => setUploadForm({ ...uploadForm, description: e.target.value })}
                  placeholder="The day we met and I knew you were special..."
                  rows={4}
                  required
                  disabled={uploading}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Date</label>
                  <input
                    type="date"
                    value={uploadForm.date}
                    onChange={(e) => setUploadForm({ ...uploadForm, date: e.target.value })}
                    required
                    disabled={uploading}
                  />
                </div>

                <div className="form-group">
                  <label>Category</label>
                  <select
                    value={uploadForm.category}
                    onChange={(e) => setUploadForm({ ...uploadForm, category: e.target.value })}
                    disabled={uploading}
                  >
                    <option value="special">Special</option>
                    <option value="adventure">Adventure</option>
                    <option value="celebration">Celebration</option>
                    <option value="everyday">Everyday</option>
                  </select>
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => setShowUploadModal(false)}
                  disabled={uploading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="submit-button"
                  disabled={uploading || !uploadForm.image}
                >
                  {uploading ? 'Uploading...' : 'Add Memory 💝'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemoryWall;

