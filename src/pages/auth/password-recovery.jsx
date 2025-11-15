import {
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { API_URL } from "@/config.js";

export function PasswordRecovery() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
    }
  });

  const onSubmitRecovery = async (data) => {
    setIsLoading(true);
    
    try {
      const response = await axios.post(`${API_URL}/auth/password-recovery`, {
        email: data.email
      });
      
      if (response.status === 200) {
        setIsEmailSent(true);
      }
    } catch (error) {
      console.error('Password recovery error:', error);
      
      // Check if it's a 400 error with "User not found" message
      if (error.response?.status === 400 && error.response?.data?.error === "User not found") {
        alert("Email não encontrado. Verifique se o endereço de email está correto ou cadastre-se na plataforma.");
      } else {
        alert("Erro ao enviar email de recuperação. Verifique o email informado e tente novamente.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex flex-col lg:flex-row gap-6 lg:gap-36 min-h-screen">
      <div className="w-full lg:w-1/2 mt-8 lg:mt-24 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <img
            src="/img/login-logo.svg"
            className="h-32 sm:h-40 md:h-48 lg:h-auto mx-auto object-contain mb-8 lg:mb-20"
            alt="Mediar360"
          />
          <Typography variant="h2" className="font-bold mb-4">
            {isEmailSent ? "Email Enviado" : "Recuperar Senha"}
          </Typography>
          <Typography 
            variant="paragraph" 
            style={{
              maxWidth: '348px',
              fontSize: '14px',
              fontWeight: '500',
              color: '#828282',
              lineHeight: '24px',
              letterSpacing: '0px',
              textAlign: 'center',
              margin: 'auto'
            }} 
            className="text-base sm:text-lg font-normal px-4"
          >
            {isEmailSent 
              ? "Enviamos um link de recuperação para o seu email. Verifique sua caixa de entrada e spam."
              : "Digite seu email abaixo e enviaremos um link para redefinir sua senha."
            }
          </Typography>
        </div>

        {!isEmailSent ? (
          <form 
            name='password-recovery' 
            onSubmit={handleSubmit(onSubmitRecovery)} 
            autoComplete="off" 
            className="mt-8 mb-2 mx-auto w-full max-w-sm sm:max-w-md lg:w-1/2"
          >
            <div className="mb-1 flex flex-col gap-6">
              <div>
                <Input
                  size="lg"
                  placeholder="Email"
                  className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  autoComplete="off"
                  inputMode="email"
                  autoCorrect="off"
                  spellCheck={false}
                  error={!!errors.email}
                  {...register("email", {
                    required: "Email é obrigatório",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Endereço de email inválido"
                    }
                  })}
                />
                {errors.email && (
                  <Typography variant="small" color="red" className="mt-1">
                    {errors.email.message}
                  </Typography>
                )}
              </div>
            </div>

            <Button 
              className="mt-6" 
              fullWidth 
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Enviando..." : "Enviar Link de Recuperação"}
            </Button>

            <div className="flex items-center justify-center mt-6">
              <Typography variant="small" className="font-medium text-gray-900">
                <Link to="/auth/sign-in">
                  Voltar para o login
                </Link>
              </Typography>
            </div>
          </form>
        ) : (
          <div className="mt-8 mb-2 mx-auto w-full max-w-sm sm:max-w-md lg:w-1/2">
            <Button 
              className="mt-6" 
              fullWidth 
              onClick={() => navigate("/auth/sign-in")}
            >
              Voltar para o Login
            </Button>
            
            <div className="flex items-center justify-center mt-6">
              <Typography variant="small" className="font-medium text-gray-900">
                <button 
                  onClick={() => setIsEmailSent(false)}
                  className="underline"
                >
                  Enviar novamente
                </button>
              </Typography>
            </div>
          </div>
        )}
      </div>

      {/* Right side - same background/styling as sign-in */}
      <div className="hidden lg:block lg:w-1/2">
        <div 
          className="h-full w-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/img/pattern.png')",
          }}
        />
      </div>
    </section>
  );
}

export default PasswordRecovery;
