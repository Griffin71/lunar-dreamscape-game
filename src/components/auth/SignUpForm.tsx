
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/contexts/AuthContext";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";

// Schema for form validation
const signUpSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username cannot exceed 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(8, "Confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type SignUpFormValues = z.infer<typeof signUpSchema>;

interface SignUpFormProps {
  onToggleForm: () => void;
}

const SignUpForm = ({ onToggleForm }: SignUpFormProps) => {
  const { signUp, checkUsernameAvailability, suggestedUsernames } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError: setFormError,
    clearErrors,
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const username = watch("username");

  // Check username availability when username field loses focus
  const handleUsernameBlur = async () => {
    if (username && username.length >= 3 && !errors.username) {
      setIsCheckingUsername(true);
      try {
        const isAvailable = await checkUsernameAvailability(username);
        setUsernameAvailable(isAvailable);
        
        if (!isAvailable) {
          setFormError("username", { 
            type: "manual", 
            message: "This username is already taken" 
          });
        } else {
          clearErrors("username");
        }
      } catch (err) {
        console.error("Error checking username:", err);
      } finally {
        setIsCheckingUsername(false);
      }
    }
  };

  const onSubmit = async (data: SignUpFormValues) => {
    if (usernameAvailable === false) {
      return;
    }
    
    try {
      setError(null);
      setIsSubmitting(true);
      await signUp(data.email, data.username, data.password);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create account");
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectSuggestedUsername = (username: string) => {
    const event = {
      target: { value: username },
      type: "change",
    } as React.ChangeEvent<HTMLInputElement>;
    
    register("username").onChange(event);
    setUsernameAvailable(true);
    clearErrors("username");
  };

  return (
    <Card className="cosmic-card w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">Create an Account</CardTitle>
        <CardDescription className="text-center">
          Enter your details to create a new account
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              className={`cosmic-input ${
                usernameAvailable === true ? "border-green-500" : ""
              } ${usernameAvailable === false ? "border-red-500" : ""}`}
              placeholder="cosmic_player"
              {...register("username")}
              onBlur={handleUsernameBlur}
            />
            {isCheckingUsername && (
              <p className="text-cosmic-500 text-xs mt-1">Checking username...</p>
            )}
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>
            )}
            {usernameAvailable === true && !errors.username && (
              <p className="text-green-500 text-xs mt-1">Username is available!</p>
            )}
            
            {/* Suggested usernames */}
            {usernameAvailable === false && suggestedUsernames.length > 0 && (
              <div className="mt-2">
                <p className="text-sm font-medium mb-1">Try one of these instead:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedUsernames.map((suggestion, index) => (
                    <Button
                      key={index}
                      type="button"
                      variant="outline"
                      className="text-xs py-1 h-auto"
                      onClick={() => selectSuggestedUsername(suggestion)}
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              className="cosmic-input"
              placeholder="your.email@example.com"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              className="cosmic-input"
              placeholder="••••••••"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              className="cosmic-input"
              placeholder="••••••••"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          <Button 
            type="submit" 
            className="cosmic-button-primary w-full"
            disabled={isSubmitting || usernameAvailable === false}
          >
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <div className="text-sm text-center">
          Already have an account?{" "}
          <a
            href="#"
            className="text-cosmic-500 hover:text-cosmic-600 font-semibold"
            onClick={(e) => {
              e.preventDefault();
              onToggleForm();
            }}
          >
            Sign in
          </a>
        </div>
      </CardFooter>
    </Card>
  );
};

export default SignUpForm;
