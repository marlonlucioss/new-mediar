import {
  Card,
  Input,
  Checkbox,
  Option,
  Button,
  Typography, Select,
} from "@material-tailwind/react";
import {Link, Navigate, useNavigate} from "react-router-dom";
import axios from "axios";
import { useForm, Controller } from "react-hook-form"
import {useEffect, useState} from "react";
import InputMask from "react-input-mask";
import {API_URL} from "@/config.js";

export function SignIn() {
  const navigate = useNavigate();
  const [hasLogin, setHasLogin] = useState(false)
  const [displayRegister, setDisplayRegister] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const {
    register: register2,
    handleSubmit: handleSubmit2,
    watch: watch2,
    control: control2,
    setValue: setValue2,
    formState: { errors: errors2 },
  } = useForm({
    defaultValues: {
      tipoPessoa: 'fisica'
    }
  })

  const onSubmitLogin = (data) => callLogin(data)

  const onSubmitRegister = (data) => {
    // Clean phone number and cpf/cnpj - remove all non-numeric characters
    const cleanPhone = data.telefone.replace(/\D/g, '')
    const documentField = watch2('tipoPessoa') === 'fisica' ? 'cpf' : 'cnpj'
    const cleanDocument = data[documentField].replace(/\D/g, '')
    callRegister({...data, telefone: cleanPhone, role: data.atividade, cpfCnpj: cleanDocument})
  }

  const callLogin = (data) => {
    axios.post(API_URL + '/auth/signin', {
      email: data.email,
      password: data.password,
    })
      .then(function (response) {
        // handle success
        localStorage.setItem("mediar", JSON.stringify(response.data))
        navigate("/dashboard/home");
      })
      .catch(function (error) {
        // handle error

      })
      .finally(function () {
        // always executed
      });
  }

  const callRegister = (data) => {

    // email-
    // nome-
    // password-
    // password_confirmation
    // role-
    // telefone-
    axios.post(API_URL + '/auth/signup', {
      email: data.email,
      name: data.nome,
      cpfCnpj: data.cpfCnpj,
      telefone: data.telefone,
      role: data.role,
      password: data.password
    })
    .then(function (response) {
      // handle success

      const responseDataString = JSON.stringify(response.data);


      // It's highly recommended to only store essential data (e.g., token, user ID)
      // instead of the entire response.data if it's large.

      if (responseDataString.length > 4 * 1024 * 1024) { // Example: Check if > 4MB, adjust as needed
        console.warn("Warning: response.data is very large (", responseDataString.length, " bytes). Storing only essential parts is strongly recommended to avoid QuotaExceededError.");
      }

      try {
        localStorage.setItem("mediar", JSON.stringify(response.data));

        navigate("/dashboard/home");
      } catch (e) {
        if (e.name === 'QuotaExceededError') {
          console.error("QuotaExceededError: Failed to set 'mediar' in localStorage because the data is too large.");
          console.error("Data that was too large:", response.data); // Log the problematic data
          // Consider providing user feedback or attempting to store a smaller subset of data
          alert("Failed to save your session information because it's too large. Please contact support if this issue persists.");
        } else {
          console.error("An unexpected error occurred while trying to save to localStorage:", e);
        }
      }

    })
    .catch(function (error) {
      // handle error
      console.error("Signup API error:", error.response ? error.response.data : error.message);
      if (error.response && error.response.data && error.response.data.message) {
        alert("Signup failed: " + error.response.data.message);
      } else {
        alert("Signup failed. Please check your details and try again.");
      }
    })
    .finally(function () {
      // always executed

    });
  }

  return (
    <section className="flex gap-36 min-h-screen">
      {!hasLogin && (
        <>
        <div className="w-full lg:w-6/12 mt-24 h-screen">
        <div className="text-center">
          <img
            src="/img/login-logo.svg"
            className="h-full inline w-100 object-cover mb-20"
          />
          <Typography variant="h2" className="font-bold mb-4">Login</Typography>
          <Typography variant="paragraph" color="" style={{width: '348px',
            height: '48px',
            top: '69px',
            left: '8px',
            fontSize: '14px',
            fontWeight: '500',
            color: '#828282',
            lineHeight: '24px',
            letterSpacing: '0px',
            textAlign: 'center',
            margin: 'auto'
          }} className="text-lg font-normal">Acesse a plataforma Mediar360 inserindo suas credenciais abaixo.</Typography>
        </div>
        <form name='login' onSubmit={handleSubmit(onSubmitLogin)} className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
          <div className="mb-1 flex flex-col gap-6">
            <Input
              size="lg"
              placeholder="Nome de usuário"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              {...register("email", { required: true })}
            />
            {errors.email && <span className='text-red-600'>This field is required</span>}
            <Input
              type="password"
              size="lg"
              placeholder="Senha"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              {...register("password", { required: true })}
            />
            {errors.password && <span className='text-red-600'>This field is required</span>}
          </div>
          {/*<Checkbox*/}
          {/*  label={*/}
          {/*    <Typography*/}
          {/*      variant="small"*/}
          {/*      color="gray"*/}
          {/*      className="flex items-center justify-start font-medium"*/}
          {/*    >*/}
          {/*      I agree the&nbsp;*/}
          {/*      <a*/}
          {/*        href="#"*/}
          {/*        className="font-normal text-black transition-colors hover:text-gray-900 underline"*/}
          {/*      >*/}
          {/*        Terms and Conditions*/}
          {/*      </a>*/}
          {/*    </Typography>*/}
          {/*  }*/}
          {/*  containerProps={{ className: "-ml-2.5" }}*/}
          {/*/>*/}
          <Button type='submit' className="mt-10" style={{color: 'white', backgroundColor: '#11AFE4'}} fullWidth>
            Entrar
          </Button>
          <div className="flex items-center text-center justify-center gap-2 mt-2">
            <Typography variant="small" className="font-medium text-gray-900">
              ou
            </Typography>
          </div>
          <Button onClick={() => setDisplayRegister(true)} type='button' className="mt-2" style={{color: '#11AFE4', backgroundColor: 'rgb(17 175 228 / 15%)'}} fullWidth>
            Cadastre-se
          </Button>
          <div className="flex items-center text-center justify-center gap-2 mt-20">
            {/*<Checkbox*/}
            {/*  label={*/}
            {/*    <Typography*/}
            {/*      variant="small"*/}
            {/*      color="gray"*/}
            {/*      className="flex items-center justify-start font-medium"*/}
            {/*    >*/}
            {/*      Subscribe me to newsletter*/}
            {/*    </Typography>*/}
            {/*  }*/}
            {/*  containerProps={{ className: "-ml-2.5" }}*/}
            {/*/>*/}
            <Typography variant="small" className="font-medium text-gray-900">
              <a href="#">
                Esqueci minha senha
              </a>
            </Typography>
          </div>
          {/*<div className="space-y-4 mt-8">*/}
          {/*  <Button size="lg" color="white" className="flex items-center gap-2 justify-center shadow-md" fullWidth>*/}
          {/*    <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
          {/*      <g clipPath="url(#clip0_1156_824)">*/}
          {/*        <path d="M16.3442 8.18429C16.3442 7.64047 16.3001 7.09371 16.206 6.55872H8.66016V9.63937H12.9813C12.802 10.6329 12.2258 11.5119 11.3822 12.0704V14.0693H13.9602C15.4741 12.6759 16.3442 10.6182 16.3442 8.18429Z" fill="#4285F4" />*/}
          {/*        <path d="M8.65974 16.0006C10.8174 16.0006 12.637 15.2922 13.9627 14.0693L11.3847 12.0704C10.6675 12.5584 9.7415 12.8347 8.66268 12.8347C6.5756 12.8347 4.80598 11.4266 4.17104 9.53357H1.51074V11.5942C2.86882 14.2956 5.63494 16.0006 8.65974 16.0006Z" fill="#34A853" />*/}
          {/*        <path d="M4.16852 9.53356C3.83341 8.53999 3.83341 7.46411 4.16852 6.47054V4.40991H1.51116C0.376489 6.67043 0.376489 9.33367 1.51116 11.5942L4.16852 9.53356Z" fill="#FBBC04" />*/}
          {/*        <path d="M8.65974 3.16644C9.80029 3.1488 10.9026 3.57798 11.7286 4.36578L14.0127 2.08174C12.5664 0.72367 10.6469 -0.0229773 8.65974 0.000539111C5.63494 0.000539111 2.86882 1.70548 1.51074 4.40987L4.1681 6.4705C4.8001 4.57449 6.57266 3.16644 8.65974 3.16644Z" fill="#EA4335" />*/}
          {/*      </g>*/}
          {/*      <defs>*/}
          {/*        <clipPath id="clip0_1156_824">*/}
          {/*          <rect width="16" height="16" fill="white" transform="translate(0.5)" />*/}
          {/*        </clipPath>*/}
          {/*      </defs>*/}
          {/*    </svg>*/}
          {/*    <span>Sign in With Google</span>*/}
          {/*  </Button>*/}
          {/*  <Button size="lg" color="white" className="flex items-center gap-2 justify-center shadow-md" fullWidth>*/}
          {/*    <img src="/img/twitter-logo.svg" height={24} width={24} alt="" />*/}
          {/*    <span>Sign in With Twitter</span>*/}
          {/*  </Button>*/}
          {/*</div>*/}
          {/*<Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">*/}
          {/*  Not registered?*/}
          {/*  <Link to="/auth/sign-up" className="text-gray-900 ml-1">Create account</Link>*/}
          {/*</Typography>*/}
        </form>
      </div>
      <div className="w-5/5 lg:block h-screen" style={{position: 'relative'}}>
        {displayRegister && (
          <div className='register-form' style={{
          position: 'absolute',
          backgroundColor: '#86c1d8cc',
          width: '100%',
          height: '100%',
          paddingTop: '40px'
        }}>
          <Typography variant="paragraph" color="" style={{
            height: '48px',
            top: '69px',
            left: '8px',
            fontSize: '18px',
            fontWeight: '500',
            color: '#fff',
            lineHeight: '24px',
            letterSpacing: '0px',
            textAlign: 'center',
            margin: 'auto'
          }} className="text-lg font-normal">Bem vindo!</Typography>
          <Typography variant="paragraph" color="" style={{width: '348px',
            height: '48px',
            top: '69px',
            left: '8px',
            fontSize: '18px',
            fontWeight: '500',
            color: '#fff',
            lineHeight: '24px',
            letterSpacing: '0px',
            textAlign: 'center',
            margin: 'auto'
          }} className="text-lg font-normal">Acesse a plataforma Mediar360 inserindo suas informações abaixo.</Typography>
          <form name='register' onSubmit={handleSubmit2(onSubmitRegister)} className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
            <div className="mb-1 flex flex-col gap-6">
              <Input
                size="lg"
                placeholder="Nome completo"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900 bg-white"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                error={!!errors2.nome}
                {...register2("nome", { required: "Campo obrigatório" })}
              />
              {errors2.nome && <span className='text-red-600 block' style={{ marginTop: '-23px' }}>{errors2.nome.message}</span>}
              <Input
                size="lg"
                placeholder="Email"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900 bg-white"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                error={!!errors2.email}
                {...register2("email", { 
                  required: "Campo obrigatório",
                  pattern: { 
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
                    message: "Formato de email inválido"
                  },
                  validate: {
                    notEmpty: value => value.trim() !== "" || "Email não pode estar vazio",
                    validDomain: value => value.includes(".") || "Domínio inválido",
                    noSpaces: value => !value.includes(" ") || "Email não pode conter espaços"
                  }
                })}
              />
              {errors2.email && <span className='text-red-600 block' style={{ marginTop: '-23px' }}>{errors2.email.message}</span>}
              <InputMask
                mask="(99) 99999-9999"
                maskChar={null}
                {...register2("telefone", { 
                  required: "Campo obrigatório",
                  pattern: {
                    value: /^\([0-9]{2}\) [0-9]{5}-[0-9]{4}$/,
                    message: "Telefone inválido"
                  }
                })}
              >
                {(inputProps) => (
                  <Input
                    {...inputProps}
                    size="lg"
                    placeholder="Telefone"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900 bg-white"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    error={!!errors2.telefone}
                  />
                )}
              </InputMask>
              {errors2.telefone && <span className='text-red-600 block' style={{ marginTop: '-23px' }}>{errors2.telefone.message}</span>}
              <Controller
                name="atividade"
                control={control2}
                rules={{ required: "Campo obrigatório" }}
                render={({ field }) => (
                  <Select 
                    label="Selecione sua atividade" 
                    className='bg-white'
                    value={field.value}
                    onChange={(val) => {
                      field.onChange(val);
                    }}
                    error={!!errors2.atividade}
                  >
                    <Option value='advogado'>Advogado</Option>
                    <Option value='cliente'>Cliente</Option>
                    <Option value='mediador'>Mediador</Option>
                    <Option value='empresa'>Empresa</Option>
                  </Select>
                )}
              />
              {errors2.atividade && <span className='text-red-600 block' style={{ marginTop: '-23px' }}>{errors2.atividade.message}</span>}
              <Controller
                name="tipoPessoa"
                control={control2}
                rules={{ required: "Campo obrigatório" }}
                defaultValue="fisica"
                render={({ field }) => (
                  <Select 
                    label="Tipo de pessoa" 
                    className='bg-white'
                    value={field.value}
                    onChange={(val) => {
                      field.onChange(val);
                      // Reset form fields when switching person type
                      if (val === 'fisica') {
                        setValue2('cnpj', '');
                      } else {
                        setValue2('cpf', '');
                      }
                    }}
                    error={!!errors2.tipoPessoa}
                  >
                    <Option value='fisica'>Física</Option>
                    <Option value='juridica'>Jurídica</Option>
                  </Select>
                )}
              />
              {errors2.tipoPessoa && <span className='text-red-600 block' style={{ marginTop: '-23px' }}>{errors2.tipoPessoa.message}</span>}

              {watch2('tipoPessoa') === 'fisica' ? (
                <>
                  <Controller
                    name="cpf"
                    control={control2}
                    rules={{
                      required: "Campo obrigatório",
                      validate: {
                        validFormat: value => {
                          if (!value) return true;
                          const numbers = value.replace(/\D/g, '');
                          return numbers.length === 11 || "CPF inválido";
                        }
                      }
                    }}
                    render={({ field }) => (
                      <InputMask
                        {...field}
                        mask="999.999.999-99"
                        maskChar={null}
                        alwaysShowMask={false}
                      >
                        {(inputProps) => (
                          <Input
                            {...inputProps}
                            size="lg"
                            placeholder="CPF"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900 bg-white"
                            labelProps={{
                              className: "before:content-none after:content-none",
                            }}
                            error={!!errors2.cpf}
                          />
                        )}
                      </InputMask>
                    )}
                  />
                  {errors2.cpf && <span className='text-red-600 block' style={{ marginTop: '-23px' }}>{errors2.cpf.message}</span>}
                </>
              ) : (
                <>
                  <Controller
                    name="cnpj"
                    control={control2}
                    rules={{
                      required: "Campo obrigatório",
                      validate: {
                        validFormat: value => {
                          if (!value) return true;
                          const numbers = value.replace(/\D/g, '');
                          return numbers.length === 14 || "CNPJ inválido";
                        }
                      }
                    }}
                    render={({ field }) => (
                      <InputMask
                        {...field}
                        mask="99.999.999/9999-99"
                        maskChar={null}
                        alwaysShowMask={false}
                      >
                        {(inputProps) => (
                          <Input
                            {...inputProps}
                            size="lg"
                            placeholder="CNPJ"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900 bg-white"
                            labelProps={{
                              className: "before:content-none after:content-none",
                            }}
                            error={!!errors2.cnpj}
                          />
                        )}
                      </InputMask>
                    )}
                  />
                  {errors2.cnpj && <span className='text-red-600 block' style={{ marginTop: '-23px' }}>{errors2.cnpj.message}</span>}
                </>
              )}

              <Typography variant="paragraph" color="" style={{width: '348px',
                top: '69px',
                left: '8px',
                fontSize: '18px',
                fontWeight: '500',
                color: '#fff',
                lineHeight: '24px',
                letterSpacing: '0px',
                textAlign: 'center',
                margin: 'auto'
              }} className="text-xl font-normal">Crie sua senha</Typography>
              <Input
                type="password"
                size="lg"
                placeholder="Senha"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900 bg-white"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                error={!!errors2.password}
                {...register2("password", { 
                  required: "Campo obrigatório",
                  minLength: { value: 6, message: "A senha deve ter no mínimo 6 caracteres" }
                })}
              />
              {errors2.password && <span className='text-red-600 block' style={{ marginTop: '-23px' }}>{errors2.password.message}</span>}
              <Typography variant="paragraph" color="" style={{width: '348px',
                top: '69px',
                left: '8px',
                fontSize: '18px',
                fontWeight: '500',
                color: '#fff',
                lineHeight: '24px',
                letterSpacing: '0px',
                textAlign: 'center',
                margin: 'auto'
              }} className="text-lg font-normal">Repita a senha</Typography>
              <Input
                type="password"
                size="lg"
                placeholder="Confirmar senha"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900 bg-white"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                error={!!errors2.password_confirmation}
                {...register2("password_confirmation", { 
                  required: "Campo obrigatório",
                  validate: value => value === watch2('password') || "As senhas não coincidem"
                })}
              />
              {errors2.password_confirmation && <span className='text-red-600 block' style={{ marginTop: '-23px' }}>{errors2.password_confirmation.message}</span>}
            </div>
            <Checkbox
              label={
                <Typography color="white" className="flex font-medium">
                  Eu concordo com os
                  <Typography
                    as="a"
                    href="#"
                    color="blue"
                    className="font-medium transition-colors hover:text-blue-700"
                  >
                    &nbsp;termos e condições.
                  </Typography>
                </Typography>
              }
            />
            <Button type='submit' className="mt-10" style={{color: 'white', backgroundColor: '#11AFE4'}} fullWidth>
              Cadastrar!
            </Button>
          </form>
        </div>)
        }
        <img
          src="/img/login-image.svg"
          className="object-cover w-full h-full"
        />
        </div>
        </>
      )}
    </section>
  );
}

export default SignIn;
