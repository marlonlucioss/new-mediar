import {
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { API_URL } from "@/config.js";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export function PasswordReset() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [tokenValid, setTokenValid] = useState(null); // null = checking, true = valid, false = invalid
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const token = searchParams.get('token');
  const email = searchParams.get('email');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: '',
      confirmPassword: '',
    }
  });

  const password = watch('password');

  // Validate token on component mount
  useEffect(() => {
    if (!token) {
      setTokenValid(false);
      return;
    }

    const validateToken = async () => {
      try {
        const response = await axios.get(`${API_URL}/auth/validate-reset-token?token=${token}`);
        console.log('Token validation response:', response.status, response.data);
        
        // Check for successful status codes
        const isValidStatus = response.status === 200 || response.status === 204 || response.status === 304;
        
        // Check if response data indicates valid token (handle different response formats)
        const isValidToken = response.data?.valid === true || 
                           response.data?.message === "Token is valid" ||
                           (response.status === 204) || // 204 usually means success with no content
                           (response.status === 304); // 304 means not modified, still valid
        
        if (isValidStatus && (isValidToken || response.status === 204 || response.status === 304)) {
          console.log('Token is valid, showing password reset form');
          setTokenValid(true);
        } else {
          console.log('Token validation failed:', { status: response.status, data: response.data });
          setTokenValid(false);
        }
      } catch (error) {
        console.error('Token validation error:', error);
        console.error('Error details:', error.response?.status, error.response?.data);
        setTokenValid(false);
      }
    };

    validateToken();
  }, [token]);

  const onSubmitReset = async (data) => {
    setIsLoading(true);
    
    try {
      const response = await axios.post(`${API_URL}/auth/reset-password`, {
        token: token,
        email: email,
        password: data.password
      });
      
      if (response.status === 200) {
        setIsSuccess(true);
      }
    } catch (error) {
      console.error('Password reset error:', error);
      alert("Erro ao redefinir senha. Tente novamente ou solicite um novo link de recuperação.");
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading while validating token
  if (tokenValid === null) {
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
              Validando Link
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
              Verificando a validade do link de recuperação...
            </Typography>
          </div>
        </div>
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

  // Show error if token is invalid
  if (tokenValid === false) {
    return (
      <section className="flex flex-col lg:flex-row gap-6 lg:gap-36 min-h-screen">
        <div className="w-full lg:w-1/2 mt-8 lg:mt-24 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <img
              src="/img/login-logo.svg"
              className="h-32 sm:h-40 md:h-48 lg:h-auto mx-auto object-contain mb-8 lg:mb-20"
              alt="Mediar360"
            />
            <Typography variant="h2" className="font-bold mb-4 text-red-600">
              Link Inválido
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
              O link de recuperação é inválido ou expirou. Solicite um novo link de recuperação.
            </Typography>
          </div>

          <div className="mt-8 mb-2 mx-auto w-full max-w-sm sm:max-w-md lg:w-1/2">
            <Button 
              className="mt-6" 
              fullWidth 
              onClick={() => navigate("/auth/password-recovery")}
            >
              Solicitar Novo Link
            </Button>
            
            <div className="flex items-center justify-center mt-6">
              <Typography variant="small" className="font-medium text-gray-900">
                <Link to="/auth/sign-in">
                  Voltar para o login
                </Link>
              </Typography>
            </div>
          </div>
        </div>
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
            {isSuccess ? "Senha Redefinida" : "Nova Senha"}
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
            {isSuccess 
              ? "Sua senha foi redefinida com sucesso. Agora você pode fazer login com sua nova senha."
              : "Digite sua nova senha abaixo. Certifique-se de que seja segura e fácil de lembrar."
            }
          </Typography>
        </div>

        {!isSuccess ? (
          <form 
            name='password-reset' 
            onSubmit={handleSubmit(onSubmitReset)} 
            autoComplete="off" 
            className="mt-8 mb-2 mx-auto w-full max-w-sm sm:max-w-md lg:w-1/2"
          >
            <div className="mb-1 flex flex-col gap-6">
              <div>
                <div className="relative">
                  <Input
                    size="lg"
                    type={showPassword ? "text" : "password"}
                    placeholder="Nova senha"
                    className="!border-t-blue-gray-200 focus:!border-t-gray-900 pr-10"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    autoComplete="new-password"
                    error={!!errors.password}
                    {...register("password", {
                      required: "Senha é obrigatória",
                      minLength: {
                        value: 8,
                        message: "Senha deve ter pelo menos 8 caracteres"
                      },
                      pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                        message: "Senha deve conter pelo menos uma letra minúscula, uma maiúscula e um número"
                      }
                    })}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <Typography variant="small" color="red" className="mt-1">
                    {errors.password.message}
                  </Typography>
                )}
              </div>

              <div>
                <div className="relative">
                  <Input
                    size="lg"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirmar nova senha"
                    className="!border-t-blue-gray-200 focus:!border-t-gray-900 pr-10"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    autoComplete="new-password"
                    error={!!errors.confirmPassword}
                    {...register("confirmPassword", {
                      required: "Confirmação de senha é obrigatória",
                      validate: (value) => 
                        value === password || "As senhas não coincidem"
                    })}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <Typography variant="small" color="red" className="mt-1">
                    {errors.confirmPassword.message}
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
              {isLoading ? "Redefinindo..." : "Redefinir Senha"}
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
              Fazer Login
            </Button>
          </div>
        )}
      </div>

      {/* Right side - same background/styling as other auth pages */}
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

export default PasswordReset;
