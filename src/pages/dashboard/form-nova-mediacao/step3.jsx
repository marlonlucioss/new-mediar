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
  Popover,
  PopoverHandler,
  PopoverContent,
} from "@material-tailwind/react";
import {
  BanknotesIcon,
  CreditCardIcon,
  LockClosedIcon,
} from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {useForm, Controller} from "react-hook-form";

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

const formatToBRL = (valueInCents) => {
  if (valueInCents === null || valueInCents === undefined || valueInCents === '') return '';
  const numericValue = Number(String(valueInCents).replace(/\D/g, ''));
  if (isNaN(numericValue)) return '';

  const valueInReais = numericValue / 100;
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(valueInReais);
};

const parseToCents = (formattedValue) => {
  if (!formattedValue) return '';
  const digits = String(formattedValue).replace(/\D/g, '');
  return digits;
};

export function Step3({ setPage, setData, requestData, callCreateConciliation, loading }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm()
  const onSubmit = (data) => {
    setData({...requestData, ...data})
    setTimeout(() => callCreateConciliation(), 1000)
  }
  const [type, setType] = React.useState("card");
  const [cardNumber, setCardNumber] = React.useState("");
  const [cardExpires, setCardExpires] = React.useState("");
  const [isValidadeDatePickerOpen, setIsValidadeDatePickerOpen] = React.useState(false);
  const currentYear = new Date().getFullYear();

  return (
    <Card className='w-full' style={{flexFlow: 'wrap', boxShadow: 'none'}}>
      <Card className="w-4/6 shadow-none">
        <CardHeader
          color="white"
          floated={false}
          shadow={false}
          className="m-0 px-4 py-8 inline-flex"
        >
          <Typography variant="h3">Nova Mediação</Typography>
          <Typography variant="h5" style={{lineHeight: '48px'}} className='font-light ml-6'>Proposta de Acordo</Typography>
        </CardHeader>
        <CardBody>
          <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4 gap-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 font-medium"
              >
                Valor da Causa
              </Typography>
              <Controller
                name="valor_causa"
                control={control}
                rules={{ required: "Valor da causa é obrigatório." }}
                defaultValue={requestData?.valor_causa || ""}
                render={({ field: { onChange, onBlur, value, name, ref } }) => (
                  <Input
                    type="text"
                    name={name}
                    value={formatToBRL(value)}
                    onChange={(e) => {
                      const rawValue = parseToCents(e.target.value);
                      onChange(rawValue);
                    }}
                    onBlur={onBlur}
                    ref={ref}
                    placeholder="Valor da Causa"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    error={!!errors.valor_causa}
                  />
                )}
              />
              {errors.valor_causa && <Typography variant="small" color="red" className="mt-1">{errors.valor_causa.message}</Typography>}
            </div>
            <div className="mb-4 gap-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 font-medium"
              >
                Proposta
              </Typography>
              <Input
                type='text'
                name="proposta"
                placeholder="Proposta"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                {...register("proposta", { required: "Proposta é obrigatória." })}
              />
              {errors.proposta && <Typography variant="small" color="red" className="mt-1">{errors.proposta.message}</Typography>}
            </div>
            <div className="mb-4 gap-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 font-medium"
              >
                Valor da Proposta
              </Typography>
              <Controller
                name="valor_proposta"
                control={control}
                rules={{ required: "Valor da proposta é obrigatório." }}
                defaultValue={requestData?.valor_proposta || ""}
                render={({ field: { onChange, onBlur, value, name, ref } }) => (
                  <Input
                    type="text"
                    name={name}
                    value={formatToBRL(value)}
                    onChange={(e) => {
                      const rawValue = parseToCents(e.target.value);
                      onChange(rawValue);
                    }}
                    onBlur={onBlur}
                    ref={ref}
                    placeholder="Valor da Proposta"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    error={!!errors.valor_proposta}
                  />
                )}
              />
              {errors.valor_proposta && <Typography variant="small" color="red" className="mt-1">{errors.valor_proposta.message}</Typography>}
            </div>
            <div className="mb-4 gap-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 font-medium"
              >
                Observações
              </Typography>
              <Input
                type='text'
                name="observacoes"
                placeholder="Observações"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                {...register("observacoes", { required: "Observações são obrigatórias." })}
              />
              {errors.observacoes && <Typography variant="small" color="red" className="mt-1">{errors.observacoes.message}</Typography>}
            </div>
            <div className="mb-4 gap-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 font-medium"
              >
                Validade da Proposta
              </Typography>
              <Controller
                name="validade_proposta"
                control={control}
                rules={{ required: "Validade da proposta é obrigatória." }}
                defaultValue={requestData?.validade_proposta ? (typeof requestData.validade_proposta === 'string' ? new Date(requestData.validade_proposta) : requestData.validade_proposta) : null}
                render={({ field: { onChange, value, name } }) => (
                  <Popover open={isValidadeDatePickerOpen} handler={setIsValidadeDatePickerOpen} placement="bottom">
                    <PopoverHandler>
                      <Input
                        name={name}
                        placeholder="Validade da proposta"
                        onChange={() => null} // DayPicker handles change
                        value={value ? format(value, "dd/MM/yyyy", { locale: ptBR }) : ""}
                        onClick={() => setIsValidadeDatePickerOpen(!isValidadeDatePickerOpen)}
                        className="py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
                        labelProps={{ className: "before:content-none after:content-none" }}
                        error={!!errors.validade_proposta}
                      />
                    </PopoverHandler>
                    <PopoverContent className="z-[9999] p-0">
                      <DayPicker
                        mode="single"
                        selected={value}
                        onSelect={(date) => {
                          onChange(date); // Update form state with Date object
                          setIsValidadeDatePickerOpen(false);
                        }}
                        fromYear={currentYear}
                        toYear={currentYear + 10}
                        showOutsideDays
                        className="border-0 m-1"
                        classNames={{
                          caption: "flex justify-center py-2 mb-4 relative items-center",
                          caption_label: "text-sm font-medium text-gray-900 hidden", // Hide default caption text
                          dropdown: "border-0 focus:ring-0",
                          table: "w-full border-collapse",
                          head_row: "flex font-medium text-gray-900",
                          head_cell: "m-0.5 w-9 font-normal text-sm",
                          row: "flex w-full mt-2",
                          cell: "text-gray-600 rounded-md h-9 w-9 text-center text-sm p-0 m-0.5 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-gray-900/20 [&:has([aria-selected].day-outside)]:text-white [&:has([aria-selected])]:bg-gray-900/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                          day: "h-9 w-9 p-0 font-normal",
                          day_selected: "rounded-md bg-gray-900 text-white hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white",
                          day_today: "rounded-md bg-gray-200 text-gray-900",
                          day_outside: "day-outside text-gray-500 opacity-50 aria-selected:bg-gray-500 aria-selected:text-gray-900 aria-selected:bg-opacity-10",
                          day_disabled: "text-gray-500 opacity-50",
                          day_hidden: "invisible",
                        }}
                        captionLayout="dropdown"
                        hideNavigation
                        locale={ptBR}
                      />
                    </PopoverContent>
                  </Popover>
                )}
              />
              {errors.validade_proposta && <Typography variant="small" color="red" className="mt-1">{errors.validade_proposta.message}</Typography>}
            </div>
            <Button
              variant={"text"}
              color={'white'}
              className="flex items-center gap-4 px-4 capitalize w-3/6"
              fullWidth
              loading={loading}
              type='submit'
              disabled={loading}
              style={{backgroundColor: '#11afe4', placeContent: 'center'}}
            >
              <Typography
                color="inherit"
                className="font-medium capitalize"
              >
                {loading ? 'Processando mediação' : 'Finalizar'}
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