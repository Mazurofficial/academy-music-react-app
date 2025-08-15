import type { CreateTrackDtoT } from '@/features/trackList/schema';
import Form from '@/components/ui/Form/Form';

const initialFormState: CreateTrackDtoT = {
   title: '',
   artist: '',
   album: '',
   genres: [],
   coverImage: '',
};

export default function AddTrackForm() {
   return <Form initialState={initialFormState} onSubmitAction="ADD" />;
}
