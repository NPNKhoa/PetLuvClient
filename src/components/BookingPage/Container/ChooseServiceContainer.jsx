import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import ChooseServiceStepperContent from '../ChooseServiceStepperContent';
import { useDispatch } from 'react-redux';
import {
  resetSelectedService,
  setSelectedService,
} from '../../../redux/slices/serviceSlice';
import ChooseRoomStepperContent from '../ChooseRoomStepperContent';
import {
  resetSelectedRoom,
  setSelectedRoom,
} from '../../../redux/slices/roomSlice';
import {
  resetSelectedCombo,
  setSelectedCombo,
} from '../../../redux/slices/serviceComboSlice';
import { toast } from 'react-toastify';

const ChooseServiceContainer = ({ selectedBookingType }) => {
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');

  const services = useSelector((state) => state.services.services);
  const serviceCombos = useSelector(
    (state) => state.serviceCombos.serviceCombos
  );
  const rooms = useSelector((state) => state.rooms.rooms);
  const roomLoading = useSelector((state) => state.rooms.loading);

  const selectedServices = useSelector(
    (state) => state.services.selectedServices
  );

  const selectedCombos = useSelector(
    (state) => state.serviceCombos.selectedCombos
  );

  const selectedRooms = useSelector((state) => state.rooms.selectedRooms);

  const isRenderRoom = useMemo(
    () =>
      selectedBookingType?.name.includes('khách sạn') ||
      selectedBookingType?.name.includes('phòng'),
    [selectedBookingType]
  );

  const filteredServices = useMemo(() => {
    if (selectedBookingType && isRenderRoom) {
      return rooms.filter((room) => {
        return room?.roomName
          ?.toLowerCase()
          .includes(search.toLowerCase().trim());
      });
    }

    // here
    return services.filter((service) => {
      return service?.serviceName
        ?.toLowerCase()
        .includes(search.toLowerCase().trim());
    });
  }, [selectedBookingType, isRenderRoom, services, rooms, search]);

  const handleSelectService = (service) => {
    if (Array.isArray(selectedCombos) && selectedCombos.length !== 0) {
      return toast.warn('Không thể cùng lúc chọn cả dịch vụ và combo');
    }

    if (
      !selectedServices.find((item) => item.serviceId === service.serviceId)
    ) {
      dispatch(setSelectedService(service));
    }
  };

  const handleSelectCombo = (combo) => {
    if (Array.isArray(selectedServices) && selectedServices.length !== 0) {
      return toast.warn('Không thể cùng lúc chọn cả dịch vụ và combo');
    }

    if (
      !selectedCombos.find(
        (item) => item.serviceComboId === combo.serviceComboId
      )
    ) {
      dispatch(setSelectedCombo(combo));
    }
  };

  const handleResetSelectedServices = () => {
    dispatch(resetSelectedService());
  };

  const handleResetSelectedCombos = () => {
    dispatch(resetSelectedCombo());
  };

  const handleSelectRoom = (room) => {
    if (!selectedRooms?.find((item) => item.roomId === room.roomId)) {
      dispatch(setSelectedRoom(room));
    }
  };

  const handleResetSelectedRooms = () => {
    dispatch(resetSelectedRoom());
  };

  return isRenderRoom ? (
    <ChooseRoomStepperContent
      rooms={filteredServices}
      loading={roomLoading}
      selectedRooms={selectedRooms}
      onResetSelectedRooms={handleResetSelectedRooms}
      search={search}
      setSearch={setSearch}
      onSelectRoom={handleSelectRoom}
    />
  ) : (
    <ChooseServiceStepperContent
      services={filteredServices}
      combos={serviceCombos}
      selectedServices={selectedServices}
      onResetSelectedServices={handleResetSelectedServices}
      onResetSelectedCombos={handleResetSelectedCombos}
      search={search}
      setSearch={setSearch}
      onSelectService={handleSelectService}
      onSelectCombo={handleSelectCombo}
      selectedCombos={selectedCombos}
    />
  );
};

ChooseServiceContainer.propTypes = {
  selectedBookingType: PropTypes.object.isRequired,
};

export default ChooseServiceContainer;
