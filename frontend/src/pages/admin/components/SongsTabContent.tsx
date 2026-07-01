import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Music, Plus } from 'lucide-react'
import SongsTable from './SongsTable'
import AddSongDialog from './AddSongDialog'

const SongsTabContent = () => {
  return (
    <Card>
      {/* Header */}
      <CardHeader>
        <div className='flex items-center justify-between'>

          {/* Left Title section */}
          <div>
            <CardTitle className='flex items-center gap-2'>
              <Music className='h-5 w-5 text-emerald-500'/>
              Songs Library
            </CardTitle>
            <CardDescription>
              Manage your music tracks
            </CardDescription>
          </div>

          {/* Song Dialog box to add song */}
          <AddSongDialog />
        </div>
      </CardHeader>

      {/* Content */}
      <CardContent>
        <SongsTable />
      </CardContent>
    </Card>
  )
}

export default SongsTabContent