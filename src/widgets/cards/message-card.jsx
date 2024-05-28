import PropTypes from "prop-types";
import { Avatar, Typography } from "@material-tailwind/react";
import {formatDate} from "@fullcalendar/core";

const foo = {
  createdAt: "2024-05-28T09:29:17.268Z",
  criadoPor: "marlonlucioss1@gmail.com",
  dataMediacao: "2024-05-28T03:00:00.000Z",
  horario: "15:30 - 16:00",
  mediador: "12345678",
  mediando: "marlonlucioss1@gmail.com",
  plataforma: "web",
  status: "agendada",
  tipoMediacao: "Familiar",
  updatedAt: "2024-05-28T09:29:17.268Z"
}

export function MessageCard({ mediador, horario, dataMediacao }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b-blue-gray-50 border-2 p-2">
      <div className="flex items-center gap-4">
        <Avatar
          src={'/img/team-1.jpeg'}
          alt={mediador}
          variant="rounded"
          className="shadow-lg shadow-blue-gray-500/25"
        />
        <div>
          <Typography
            variant="small"
            color="blue-gray"
            className="mb-1 font-semibold"
          >
            {mediador}
          </Typography>
          {/*<Typography className="text-xs font-normal text-blue-gray-400">*/}
          {/*  {message}*/}
          {/*</Typography>*/}
        </div>
      </div>
      <Typography className="text-xs font-bold text-blue-gray-800 p-3" style={{backgroundColor: '#e9f7fd', borderRadius: '12px'}}>
        {horario} - {new Date(dataMediacao).toISOString().slice(0, 10).split('-').reverse().join('/')}
      </Typography>
      {/*{action}*/}
    </div>
  );
}

MessageCard.defaultProps = {
  action: null,
};

MessageCard.propTypes = {
  img: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  message: PropTypes.node.isRequired,
  action: PropTypes.node,
};

MessageCard.displayName = "/src/widgets/cards/message-card.jsx";

export default MessageCard;
