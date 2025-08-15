import React, { Suspense, useEffect } from 'react';
import { useAppSelector } from '@/app/hooks';
import { Modal } from '@/components/ui/Modal/Modal';
import Header from '@/components/Header/Header';
import TrackList from '@/components/TrackList/TrackList';
import {
   selectModalType,
   selectTrackToEdit,
} from '@/features/modalWindow/modalWindowSelector';
import Preloader from '@/components/ui/Preloader/Preloader';

const AddTrackForm = React.lazy(
   () => import('@/components/AddTrackForm/AddTrackForm')
);
const EditTrackForm = React.lazy(
   () => import('@/components/EditTrackForm/EditTrackForm')
);
const UploadAudioForm = React.lazy(
   () => import('@/components/UploadAudioForm/UploadAudioForm')
);

export default function TracksPage() {
   const modalWindowType = useAppSelector(selectModalType);
   const trackToEditId = useAppSelector(selectTrackToEdit);

   useEffect(() => {
      document.title = 'Tracks - Tunee';
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
         metaDesc.setAttribute(
            'content',
            'Browse and manage your music tracks on Tunee.'
         );
      }
   }, []);

   return (
      <>
         <Header />
         <TrackList />
         <Modal>
            <Suspense fallback={<Preloader />}>
               {modalWindowType === 'add' && <AddTrackForm />}
               {modalWindowType === 'edit' && (
                  <EditTrackForm id={trackToEditId ?? ''} />
               )}
               {modalWindowType === 'upload' && (
                  <UploadAudioForm id={trackToEditId ?? ''} />
               )}
            </Suspense>
         </Modal>
      </>
   );
}
