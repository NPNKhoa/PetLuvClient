import PropTypes from 'prop-types';
import calculatePetAge from '../../utils/calculatePetAge';

const BriefPetInfoCard = ({pet}) => {
  return (
    <div className='flex justify-start items-center gap-4'>
        <img src={pet?.petImagePath} alt={pet?.petName} />

        <>
            <h1>{pet?.petName}</h1>
            {/* <h2>{pet.petBreed}</h2> */}
            <p>{calculatePetAge(pet?.dateOfBirth)}</p>
        </>
    </div>
  )
}

BriefPetInfoCard.propTypes = {
    pet: PropTypes.object.isRequired
}

export default BriefPetInfoCard