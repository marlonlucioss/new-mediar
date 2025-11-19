import PropTypes from "prop-types";
import { Avatar, Typography } from "@material-tailwind/react";
import {formatDate} from "@fullcalendar/core";

export function MessageCard({ nome_cliente, horario, dataMediacao, status }) {
  // Function to get background color based on status
  const getStatusBackgroundColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'aguardando':
        return '#93c9f8'; // Blue - same as "Novas" in home
      case 'agendada':
        return '#FFF7D9'; // Yellow - same as "Agendadas" in home
      case 'concluída':
      case 'concluida':
        return '#DBF5D2'; // Green - same as "Concluídas" in home
      case 'cancelada':
        return '#FFEDED'; // Red - same as "Canceladas" in home
      default:
        return '#FFF7D9'; // Default to scheduled color for horario case
    }
  };

  return (
    <div className="flex items-center justify-between gap-4 border-b-blue-gray-50 border-2 p-2">
      <div className="flex items-center gap-4">
        {/*<Avatar*/}
        {/*  src={'/img/team-1.jpeg'}*/}
        {/*  alt={mediador.nome}*/}
        {/*  variant="rounded"*/}
        {/*  className="shadow-lg shadow-blue-gray-500/25"*/}
        {/*/>*/}
        <div>
          <Typography
            variant="small"
            color="blue-gray"
            className="mb-1 font-semibold"
          >
            {nome_cliente}
          </Typography>
          {/*<Typography className="text-xs font-normal text-blue-gray-400">*/}
          {/*  {message}*/}
          {/*</Typography>*/}
        </div>
      </div>
      { horario && (
        <Typography className="text-xs font-bold text-blue-gray-800 p-3" style={{backgroundColor: getStatusBackgroundColor('agendada'), borderRadius: '12px'}}>
          {horario} - {new Date(dataMediacao).toISOString().slice(0, 10).split('-').reverse().join('/')}
        </Typography>
      )}
      { !horario && (
        <Typography className="text-xs font-bold text-blue-gray-800 p-3" style={{backgroundColor: getStatusBackgroundColor(status), borderRadius: '12px'}}>
          {status}
        </Typography>
      )}
      {/*{action}*/}
    </div>
  );
}

MessageCard.defaultProps = {
  action: null,
};

MessageCard.propTypes = {
  nome_cliente: PropTypes.string.isRequired,
  horario: PropTypes.string,
  dataMediacao: PropTypes.string,
  status: PropTypes.string,
  action: PropTypes.node,
};

MessageCard.displayName = "/src/widgets/cards/message-card.jsx";

export default MessageCard;
