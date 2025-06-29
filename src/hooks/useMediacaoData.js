import { useNavigate, useLocation } from 'react-router-dom';
import { useMediacaoContext } from '../contexts/MediacaoContext';

export function useMediacaoData() {
  const navigate = useNavigate();
  const location = useLocation();
  const { mediacao: data, updateMediacao: updateData, clearMediacao: clearData } = useMediacaoContext();

  // Initialize data from URL state if available and context is empty
  if (Object.keys(data).length === 0 && location.state?.data) {
    updateData(location.state.data);
  }

  const navigateToStep = (step, stepData = data) => {
    navigate(`/dashboard/cliente/${step}`, { state: { data: stepData } });
  };

  return { data, updateData, clearData, navigateToStep };
}
