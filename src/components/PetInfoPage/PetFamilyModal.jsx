import PropTypes from 'prop-types';
import { Box } from '@mui/material'
import BriefPetInfoCard from './BriefPetInfoCard';

const famModalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const PetFamilyModal = ({ familyPets }) => {
  return (
    <Box sx={famModalStyle}>
        <h1>Cha:</h1>
        <BriefPetInfoCard pet={familyPets?.parent} />
        <h1>Mẹ:</h1>
        <BriefPetInfoCard pet={familyPets?.parent} />
        <h1>Con:</h1>
        <BriefPetInfoCard pet={familyPets?.parent} />
    </Box>
  )
}

PetFamilyModal.propTypes = {
    familyPets: PropTypes.object.isRequired,
}

export default PetFamilyModal