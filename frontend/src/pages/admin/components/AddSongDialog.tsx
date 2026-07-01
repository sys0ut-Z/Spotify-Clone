import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useMusicStore } from '@/store/music.store'
import { Plus, Upload } from 'lucide-react';
import { useRef, useState } from 'react'
import toast from 'react-hot-toast';

const AddSongDialog = () => {
  const {albums} = useMusicStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newSong, setNewSong] = useState({
    title: "",
    artist: "",
    albumId: "",
    duration: 0
  });

  const [files, setFiles] = useState<{ audio: File | null, image: File | null}>({
    audio: null,
    image: null
  });

  const audioInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async () => {
    if(!files.audio || !files.image)
      return toast.error("Please select audio and image files");

    setIsLoading(true);

    const formData = new FormData();
    formData.append("audio", files.audio);
    formData.append("image", files.image);
    formData.append("title", newSong.title);
    formData.append("artist", newSong.artist);
    formData.append("duration", newSong.duration.toString());

    if(newSong.albumId && newSong.albumId !== "none"){
      formData.append("album", newSong.albumId);
    }
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>

      {/* This button opens the dialog */}
      <DialogTrigger asChild>
        <Button className='bg-emerald-500 hover:bg-emerald-600 text-black'>
          <Plus className='mr-2 h-4 w-4'/>
          Add Song
        </Button>
      </DialogTrigger>

      <DialogContent className='bg-zinc-900 border-zinc-700 max-h-[80vh] overflow-auto min-w-100 sm:min-w-120'>
        <DialogHeader>
          <DialogTitle>Add new song</DialogTitle>
          <DialogDescription>Add a new song to your music library</DialogDescription>
        </DialogHeader>

        <div className='space-y-4 py-4 '>

          {/* cover file */}
          <input 
            type="file"
            accept="image/*"
            ref={imageInputRef}
            hidden
            onChange={(e) => setFiles(prev => ({...prev, image: e.target.files![0]}))}
          />

          {/* audio file */}
          <input 
            type="file"
            accept="audio/*"
            ref={audioInputRef}
            hidden
            onChange={(e) => setFiles(prev => ({...prev, audio: e.target.files![0]}))}
          />

          {/* Image Upload UI */}
          <div
						className='flex items-center justify-center p-6 border-2 border-dashed border-zinc-700 rounded-lg cursor-pointer'
						onClick={() => imageInputRef.current?.click()}
					>
						<div className='text-center'>
							{files.image ? (
								<div className='space-y-2'>
									<div className='text-sm text-emerald-500'>Image selected:</div>
									<div className='text-xs text-zinc-400'>{files.image.name.slice(0, 20)}</div>
								</div>
							) : (
								<>
									<div className='p-3 bg-zinc-800 rounded-full inline-block mb-2'>
										<Upload className='h-6 w-6 text-zinc-400' />
									</div>
									<div className='text-sm text-zinc-400 mb-2'>Upload artwork</div>
									<Button variant='outline' size='sm' className='text-xs'>
										Choose File
									</Button>
								</>
							)}
						</div>
					</div>

          {/* Audio Upload UI */}
          <div className='space-y-2'>
						<label className='text-sm font-medium'>Audio File</label>
						<div className='flex items-center gap-2'>
							<Button 
                variant='outline' 
                onClick={() => audioInputRef.current?.click()} 
                className='w-full'
              >
								{files.audio ? files.audio.name.slice(0, 20) : "Choose Audio File"}
							</Button>
						</div>
					</div>
          
          {/* Other Input Fields */}
          <div className='space-y-2'>
						<label className='text-sm font-medium'>Title</label>
						<Input
							value={newSong.title}
							onChange={(e) => setNewSong({ ...newSong, title: e.target.value })}
							className='bg-zinc-800 border-zinc-700'
						/>
					</div>

          <div className='space-y-2'>
						<label className='text-sm font-medium'>Artist</label>
						<Input
							value={newSong.artist}
							onChange={(e) => setNewSong({ ...newSong, title: e.target.value })}
							className='bg-zinc-800 border-zinc-700'
						/>
					</div>

          <div className='space-y-2'>
						<label className='text-sm font-medium'>Duration (seconds)</label>
						<Input
							type='number'
							min='0'
							value={newSong.duration}
							onChange={(e) => setNewSong({ ...newSong, duration: parseInt(e.target.value) || 0 })}
							className='bg-zinc-800 border-zinc-700'
						/>
					</div>

          {/* Album Dropdown */}
          <div className='space-y-2'>
						<label className='text-sm font-medium'>Album (Optional)</label>
						<Select
							value={newSong.albumId}
							onValueChange={(value) => setNewSong({ ...newSong, albumId: value })}
						>
							<SelectTrigger className='bg-zinc-800 border-zinc-700'>
								<SelectValue placeholder='Select album' />
							</SelectTrigger>

              {/* all albums in dropdown */}
							<SelectContent className='bg-zinc-800 border-zinc-700'>
                {/* default value */}
								<SelectItem value='none'>No Album (Single)</SelectItem>

								{albums.map((album) => (
									<SelectItem key={album._id} value={album._id}>
										{album.title}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
        </div>

        {/* Buttons */}
        <DialogFooter>
          <Button 
            variant='outline' 
            onClick={() => setIsDialogOpen(false)} 
            disabled={isLoading}
          >
						Cancel
					</Button>
					<Button 
            onClick={handleSubmit} 
            disabled={isLoading}
          >
						{isLoading ? "Uploading..." : "Add Song"}
					</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AddSongDialog