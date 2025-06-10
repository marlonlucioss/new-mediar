import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Avatar,
  Typography,
  Tabs,
  TabsHeader,
  Tab,
  Switch,
  Tooltip,
  Button, Popover, PopoverHandler, PopoverContent,
} from "@material-tailwind/react";
import {
  HomeIcon,
  ChatBubbleLeftEllipsisIcon,
  Cog6ToothIcon,
  PencilIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { ProfileInfoCard, MessageCard } from "@/widgets/cards";
import {platformSettingsData, conversationsData, projectsData, ordersOverviewData, authorsTableData} from "@/data";
import {StarIcon} from "@heroicons/react/24/solid/index.js";
import React, {useEffect, useState} from "react";
import {ComputerDesktopIcon, PlusIcon} from "@heroicons/react/24/outline/index.js";
import Pagination from "@/components/pagination.jsx";
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/20/solid";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import {InformationCircleIcon} from "@heroicons/react/24/outline/index.js";
import PerfilHeader from "@/components/perfilHeader.jsx";
import PerfilAbout from "@/components/perfilAbout.jsx";
import PerfilGeneralInfo from "@/components/perfilGeneralInfo.jsx";
import PerfilEndereco from "@/components/perfilEndereco.jsx";
import PerfilContato from "@/components/perfilContato.jsx";
import PerfilSenha from "@/components/perfilSenha.jsx";
import axios from "axios";
import {API_URL} from "@/config.js";

// Helper function to convert data URL to Blob
function dataURLtoBlob(dataurl) {
  if (!dataurl || !dataurl.includes(',')) {
    console.error('Invalid data URL for blob conversion:', dataurl);
    return null;
  }
  const parts = dataurl.split(',');
  if (parts.length < 2) {
    console.error('Invalid data URL format for blob conversion:', dataurl);
    return null;
  }
  const mimeMatch = parts[0].match(/:(.*?);/);
  if (!mimeMatch || mimeMatch.length < 2) {
    console.error('Could not extract MIME type for blob conversion:', dataurl);
    return null;
  }
  const mime = mimeMatch[1];
  try {
    const bstr = atob(parts[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  } catch (e) {
    console.error('Error converting base64 to Blob:', e);
    return null;
  }
}
const events = [
  { title: 'Meeting', start: new Date() }
]
const handleDateClick = (selected) => {
  const title = prompt("Please enter a new title for your event");
  const calendarApi = selected.view.calendar;
  calendarApi.unselect();

  if (title) {
    calendarApi.addEvent({
      id: `${selected.dateStr}-${title}`,
      title,
      start: selected.startStr,
      end: selected.endStr,
      allDay: selected.allDay,
    });
  }
};

const handleEventClick = (selected) => {
  if (
    window.confirm(
      `Are you sure you want to delete the event '${selected.event.title}'`
    )
  ) {
    selected.event.remove();
  }
};

export function Perfil({ setPage }) {
  const [data, setData] = useState(JSON.parse(localStorage.getItem('mediar'))?.user || {});
  const [profileImage, setProfileImage] = useState('');

  const handleProfileImageUpdate = (newImageUrl) => {
    setData(prevData => ({
      ...prevData,
      profileImageUrl: newImageUrl
    }));
  };

  
  const [currentEvents, setCurrentEvents] = useState([]);
  const [showAlerts, setShowAlerts] = React.useState({
    blue: true,
    green: true,
    orange: true,
    red: true,
  });
  const [showAlertsWithIcon, setShowAlertsWithIcon] = React.useState({
    blue: true,
    green: true,
    orange: true,
    red: true,
  });
  const alerts = ["gray", "green", "orange", "red"];

  const updateUserSession = (user) => {
    let userSession = JSON.parse(localStorage.getItem('mediar'))
    userSession = {...userSession, user: {...user, profileImageFile: null}}
    localStorage.setItem("mediar",JSON.stringify(userSession))
  }

  useEffect(() => {
    if (!data || Object.keys(data).length === 0 || !data._id) { // Guard against empty/incomplete data
      console.log("Skipping API call due to incomplete data state.");
      return;
    }
    let authToken = '';
    try {
      authToken = JSON.parse(localStorage.getItem('mediar')).token;
    } catch (e) {
      console.error('Failed to retrieve auth token from localStorage:', e);
      return; // Do not proceed without auth token
    }

    let finalPayload = data;
    const finalConfig = {
      headers: {
        authorization: 'bearer ' + authToken,
      }
    };

    if (data.profileImageUrl && data.profileImageUrl.startsWith('data:image/')) {
      const imageBlob = dataURLtoBlob(data.profileImageUrl);
      if (imageBlob) {
        console.log("Preparing image for upload.");
        const formData = new FormData();
        formData.append('profileImageFile', imageBlob, `profile-${data.id}.png`); // Example filename
        // Append other data fields to FormData
        for (const key in data) {
          if (data.hasOwnProperty(key) && key !== 'profileImageUrl' && key !== 'profileImageFile') { // Also exclude profileImageFile from state
            if (data[key] !== null && data[key] !== undefined) {
              formData.append(key, data[key]);
            }
          }
        }
        finalPayload = formData;
        // Axios will set Content-Type to multipart/form-data automatically for FormData
      } else {
        // Image conversion to Blob failed. Send other data as JSON, excluding the problematic base64 string.
        console.error("Image conversion to Blob failed. Uploading other data without the new profile image.");
        const { profileImageUrl, profileImageFile, ...otherUserData } = data; // Exclude profileImageFile from state here too
        finalPayload = otherUserData;
        finalConfig.headers['Content-Type'] = 'application/json';
      }
    } else {
      // Not a new base64 image, or no profileImageUrl field. Send data as JSON.
      // Exclude profileImageFile from state if it exists from being sent in the JSON payload
      const { profileImageFile, ...payloadWithoutFileField } = data;
      finalPayload = payloadWithoutFileField;
      finalConfig.headers['Content-Type'] = 'application/json';
    }

    console.log("Sending update to API with payload:", finalPayload);
    axios.put(API_URL + '/users', finalPayload, finalConfig)
      .then(function (response) {
        // handle success
        console.log('API Update successful, response data:', response.data);
        updateUserSession(response.data); // Update localStorage
        setProfileImage(response.data.profileImageFile)
        // setData(response.data)
      })
      .catch(function (error) {
        // handle error
        console.error('API Update error:', error.response ? error.response.data : error.message);
      })
      .finally(function () {
        // always executed
      });
  }, [data]);

  return (
    <Card className='w-full shadow-none'>
      <Card>
        <CardHeader className='m-0 shadow-none'>
          <div>
            {/* Code block starts */}
            <div className="my-6 lg:my-12 container px-6 mx-auto flex flex-col md:flex-row items-start md:items-center justify-between pb-4">
              <div>
                <Typography className="text-3xl font-bold leading-tight text-gray-800 dark:text-gray-100">Meu 360</Typography>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardBody className="px-0 p-6 pt-0">
          <PerfilHeader
            profileImage={profileImage}
            userNameFromParent={data?.name}
            onImageUploadFromParent={handleProfileImageUpdate} 
          />
          <PerfilAbout data={data} setData={setData} />
          <PerfilGeneralInfo data={data} setData={setData} />
          <PerfilEndereco data={data} setData={setData} />
          <PerfilContato data={data} setData={setData} />
          {/*<PerfilSenha data={data} setData={setData} />*/}
        </CardBody>
      </Card>
    </Card>
  );
}

export default Perfil;
