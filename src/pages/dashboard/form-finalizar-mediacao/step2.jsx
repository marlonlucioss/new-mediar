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
import InputMask from "react-input-mask";

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

export function Step2Cliente() {
  const { data: requestData, updateData, navigateToStep } = useMediacaoData();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nome_cliente: requestData?.nome_cliente || '',
      cpf_cliente: requestData?.cpf_cliente || '',
      telefone_cliente: requestData?.telefone_cliente || '',
      email_cliente: requestData?.email_cliente || ''
    }
  })
  const onSubmit = (data) => {
    updateData({...requestData, ...data})
    navigateToStep('step3')
  }

  const handleBack = () => {
    navigateToStep('step1')
  }
  const [type, setType] = React.useState("card");
  const [cardNumber, setCardNumber] = React.useState("");
  const [cardExpires, setCardExpires] = React.useState("");
  const [cpfMask, setCpfMask] = React.useState("999.999.999-99");
  const cpfClienteValue = watch("cpf_cliente");

  React.useEffect(() => {
    if (cpfClienteValue) {
      const unmaskedValue = cpfClienteValue.replace(/\D/g, "");
      setCpfMask("999.999.999-99");
    } else {
      setCpfMask("999.999.999-99"); // Default mask
    }
  }, [cpfClienteValue]);
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
          <Typography variant="h5" style={{lineHeight: '48px'}} className='font-light ml-6'>Dados do Cliente</Typography>
        </CardHeader>
        <CardBody>
          <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 font-medium"
              >
                Nome do cliente
              </Typography>
              <Input
                type="text"
                placeholder="Nome do cliente"
                className="bg-white !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                {...register("nome_cliente", { required: "Campo obrigatório" })}
                error={!!errors.nome_cliente}
              />
              {errors.nome_cliente && (
                <Typography variant="small" color="red" className="mt-1">
                  {errors.nome_cliente.message}
                </Typography>
              )}
            </div>

            <div className="mb-4 gap-4">
              {/*<Typography*/}
              {/*  variant="small"*/}
              {/*  color="blue-gray"*/}
              {/*  className="mb-2 font-medium "*/}
              {/*>*/}
              {/*  Card Details*/}
              {/*</Typography>*/}

              {/*<Input*/}
              {/*  maxLength={19}*/}
              {/*  value={formatCardNumber(cardNumber)}*/}
              {/*  onChange={(event) => setCardNumber(event.target.value)}*/}
              {/*  icon={*/}
              {/*    <CreditCardIcon className="absolute left-0 h-4 w-4 text-blue-gray-300" />*/}
              {/*  }*/}
              {/*  placeholder="0000 0000 0000 0000"*/}
              {/*  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"*/}
              {/*  labelProps={{*/}
              {/*    className: "before:content-none after:content-none",*/}
              {/*  }}*/}
              {/*/>*/}
              <div className="my-4 flex items-center gap-4">
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 font-medium"
                  >
                    CPF do cliente
                  </Typography>
                  <InputMask
                    mask={cpfMask}
                    {...register("cpf_cliente", { required: "Campo obrigatório" })}
                  >
                    {(inputProps) => (
                      <Input
                        {...inputProps}
                        type="text"
                        placeholder="CPF"
                        className="bg-white !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                        error={!!errors.cpf_cliente}
                      />
                    )}
                  </InputMask>
                  {errors.cpf_cliente && (
                    <Typography variant="small" color="red" className="mt-1">
                      {errors.cpf_cliente.message}
                    </Typography>
                  )}
                  {/*<Input*/}
                  {/*  maxLength={5}*/}
                  {/*  value={formatExpires(cardExpires)}*/}
                  {/*  onChange={(event) => setCardExpires(event.target.value)}*/}
                  {/*  containerProps={{ className: "min-w-[72px]" }}*/}
                  {/*  placeholder="00/00"*/}
                  {/*  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"*/}
                  {/*  labelProps={{*/}
                  {/*    className: "before:content-none after:content-none",*/}
                  {/*  }}*/}
                  {/*/>*/}
                </div>
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 font-medium"
                  >
                    Telefone
                  </Typography>
                  <InputMask
                    mask="(99) 99999-9999"
                    {...register("telefone_cliente", { required: "Campo obrigatório" })}
                  >
                    {(inputProps) => (
                      <Input
                        {...inputProps}
                        type="text"
                        placeholder="Telefone"
                        className="bg-white !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                        error={!!errors.telefone_cliente}
                      />
                    )}
                  </InputMask>
                  {errors.telefone_cliente && (
                    <Typography variant="small" color="red" className="mt-1">
                      {errors.telefone_cliente.message}
                    </Typography>
                  )}
                  {/*<Input*/}
                  {/*  maxLength={4}*/}
                  {/*  containerProps={{ className: "min-w-[72px]" }}*/}
                  {/*  placeholder="000"*/}
                  {/*  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"*/}
                  {/*  labelProps={{*/}
                  {/*    className: "before:content-none after:content-none",*/}
                  {/*  }}*/}
                  {/*/>*/}
                </div>
              </div>
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 font-medium"
              >
                E-mail
              </Typography>
              <Input
                type='email'
                placeholder="name@mail.com"
                className="bg-white !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                {...register("email_cliente", { 
                  required: "Campo obrigatório", 
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Endereço de e-mail inválido"
                  }
                })}
                error={!!errors.email_cliente}
              />
              {errors.email_cliente && (
                <Typography variant="small" color="red" className="mt-1">
                  {errors.email_cliente.message}
                </Typography>
              )}
            </div>

            <div className="w-full mt-6 flex justify-between gap-4">
              <Button
                variant="outlined"
                className="flex items-center gap-4 px-4 capitalize w-1/4"
                style={{placeContent: 'center', borderColor: '#11afe4', color: '#11afe4'}}
                onClick={handleBack}
              >
                <Typography color="inherit" className="font-medium capitalize">
                  Voltar
                </Typography>
              </Button>
              <Button
                variant="text"
                color="white"
                className="flex items-center gap-4 px-4 capitalize w-1/4"
                style={{backgroundColor: '#11afe4', placeContent: 'center'}}
                type="submit"
              >
                <Typography color="inherit" className="font-medium capitalize">
                  Próxima etapa
                </Typography>
              </Button>
            </div>
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