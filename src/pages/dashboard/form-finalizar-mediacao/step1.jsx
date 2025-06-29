import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  Typography,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Select,
  Option,
} from "@material-tailwind/react";
import {
  BanknotesIcon,
  CreditCardIcon,
  LockClosedIcon,
} from "@heroicons/react/24/solid";
import {useForm} from "react-hook-form";
import { useMediacaoData } from "@/hooks/useMediacaoData";

function formatCardNumber(value) {
  const val = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
  const matches = val.match(/\d{4,16}/g);
  const match = (matches && matches[0]) || "";
  const parts = [];

  for (let i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4));
  }

  if (parts.length) {
    return parts.join(" ");
  } else {
    return value;
  }
}

function formatExpires(value) {
  return value
    .replace(/[^0-9]/g, "")
    .replace(/^([2-9])$/g, "0$1")
    .replace(/^(1{1})([3-9]{1})$/g, "0$1/$2")
    .replace(/^0{1,}/g, "0")
    .replace(/^([0-1]{1}[0-9]{1})([0-9]{1,2}).*/g, "$1/$2");
}

export function Step1Cliente() {
  const { data: requestData, updateData, navigateToStep } = useMediacaoData();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: requestData || {},
    values: requestData || {}
  })
  const onSubmit = (data) => {
    // First update the data in our state and storage
    updateData(currentData => ({
      ...currentData,
      ...data
    }));

    // Then navigate to next step
    navigateToStep('step2');
  }
  const [type, setType] = React.useState("card");
  const [cardNumber, setCardNumber] = React.useState("");
  const [cardExpires, setCardExpires] = React.useState("");
  return (
    <Card className='w-full' style={{flexFlow: 'wrap', boxShadow: 'none'}}>
      <Card className="w-4/6 shadow-none">
        <CardHeader
          color="white"
          floated={false}
          shadow={false}
          className="m-0 px-4 py-8 inline-flex"
        >
          {/*<div className="mb-4 h-20 p-6 text-white">*/}
          {/*  {type === "card" ? (*/}
          {/*    <CreditCardIcon className="h-10 w-10 text-white" />*/}
          {/*  ) : (*/}
          {/*    <img alt="paypal " className="w-14 " src="https://docs.material-tailwind.com/icons/paypall.png" />*/}
          {/*  )}*/}
          {/*</div>*/}
          <Typography variant="h3">Nova Mediação</Typography>
          <Typography variant="h5" style={{lineHeight: '48px'}} className='font-light ml-6'>Dados da disputa</Typography>
        </CardHeader>
        <CardBody>
          <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-2.5">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 font-medium"
              >
                Observações do cliente
              </Typography>
              <Input
                type="text"
                placeholder="Observações do cliente"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                {...register("observacao_cliente", { required: true })}
              />
            </div>
            <Button
              variant={"text"}
              color={'white'}
              className="flex items-center gap-4 px-4 capitalize w-2/6"
              fullWidth
              type='submit'
              style={{backgroundColor: '#11afe4', placeContent: 'center'}}
            >
              <Typography
                color="inherit"
                className="font-medium capitalize"
              >
                Próxima etapa
              </Typography>
            </Button>
          </form>
        </CardBody>
      </Card>
      <Card className='w-2/6 shadow-none'>
        <CardBody className="p-4">
          <div className="m-4">
            <Typography variant="h3" color="blue-gray" className="mb-7">
              Assistente Virtual
            </Typography>
            <Typography
              variant="small"
              className="font-normal text-blue-gray-600 mb-7"
            >
              Agora que você já escolheu o seu mediador, basta prosseguir para o agendamento da mediação.
            </Typography>
          </div>
        </CardBody>
      </Card>
    </Card>
  )};