import React, { useEffect } from "react";
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
import InputMask from 'react-input-mask';

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

export function Step1({ setPage, setData, requestData }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset
  } = useForm()

  // Reset form when starting a new mediation (when requestData is empty)
  useEffect(() => {
    if (!requestData || Object.keys(requestData).length === 0) {
      reset({
        nome_cliente: '',
        cpf_cliente: '',
        telefone_cliente: '',
        email_cliente: ''
      });
    }
  }, [requestData, reset]);

  const onSubmit = (data) => {
    setData({...requestData, ...data})
    setPage('step2')
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
          <Typography variant="h5" style={{lineHeight: '48px'}} className='font-light ml-6'>Dados do Cliente</Typography>
        </CardHeader>
        <CardBody>
          <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
            <div>
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
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                {...register("nome_cliente", { 
                  required: "Nome é obrigatório.",
                  minLength: { value: 3, message: "Nome deve ter pelo menos 3 caracteres." },
                })}
              />
              {errors.nome_cliente && <Typography variant="small" color="red" className="mt-1">{errors.nome_cliente.message}</Typography>}
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
              <div className="my-4 flex items-start gap-4">
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 font-medium"
                  >
                    CPF do cliente
                  </Typography>
                  <InputMask
                    mask="999.999.999-99"
                    {...register("cpf_cliente", { 
                      required: "CPF é obrigatório.",
                      pattern: { value: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/, message: "CPF inválido." }
                    })}
                  >
                    {(inputProps) => (
                      <Input
                        {...inputProps}
                        type="text"
                        placeholder="CPF"
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                      />
                    )}
                  </InputMask>
                  {errors.cpf_cliente && <Typography variant="small" color="red" className="mt-1">{errors.cpf_cliente.message}</Typography>}
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
                    {...register("telefone_cliente", { 
                      required: "Telefone é obrigatório.",
                      pattern: { value: /^\(\d{2}\) \d{5}-\d{4}$/, message: "Telefone inválido" }
                    })}
                  >
                    {(inputProps) => (
                      <Input
                        {...inputProps}
                        type="text"
                        placeholder="Telefone"
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                      />
                    )}
                  </InputMask>
                  {errors.telefone_cliente && <Typography variant="small" color="red" className="mt-1">{errors.telefone_cliente.message}</Typography>}
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
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                {...register("email_cliente", { 
                  required: "E-mail é obrigatório.",
                  pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "E-mail inválido." }
                })}
              />
              {errors.email_cliente && <Typography variant="small" color="red" className="mt-1">{errors.email_cliente.message}</Typography>}
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
      {/* <Card className='w-2/6 shadow-none'>
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
      </Card> */}
    </Card>
  )};