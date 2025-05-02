
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, EyeOff, Mail, Lock, CreditCard, Shield, Info } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const SignInPage: React.FC = () => {
  const navigate = useNavigate();
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState('');

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+94\s\d{2}\s\d{3}\s\d{4}$/;
    if (!emailRegex.test(value) && !phoneRegex.test(value) && value !== '') {
      setEmailError('Please enter a valid email or Sri Lankan phone number (+94 XX XXX XXXX)');
      return false;
    }
    setEmailError('');
    return true;
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!emailOrPhone || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    if (!validateEmail(emailOrPhone)) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Mock authentication - replace with actual auth when implemented
      setTimeout(() => {
        toast.success('Successfully signed in!');
        navigate('/');
      }, 1500);
    } catch (error) {
      toast.error('Authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Nightlife background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/lovable-uploads/dcfedfbc-2e9f-48f3-a0ae-3dc9746486c2.png')",
        }}
      />
      
      {/* Overlay to make the form more readable */}
      <div className="absolute inset-0 bg-black/40" />
      
      {/* Sri Lanka map watermark */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none blend-overlay"
        style={{
          backgroundImage: "url('/srilanka-map.svg')",
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'contain',
          mixBlendMode: 'overlay',
        }}
      />
      
      <div className="container-custom py-6 flex justify-between items-center relative z-10">
        <Link to="/" className="text-2xl font-bold text-white inline-flex">
          Eventuraa.lk
        </Link>
        <LanguageSwitcher />
      </div>
      
      <div className="flex-1 flex items-center justify-center px-4 py-10 relative z-10">
        <Card className="w-full max-w-md shadow-xl border-gray-100 bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-2xl font-bold text-gray-800 font-display">Welcome Back!</CardTitle>
            <CardDescription className="text-gray-600">
              Access your events, bookings, and medical services.
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="emailOrPhone">Email or Phone</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                  <Input 
                    id="emailOrPhone" 
                    type="text" 
                    placeholder="e.g., john@email.com or +94 76 123 4567" 
                    className={`pl-10 ${emailError ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                    value={emailOrPhone}
                    onChange={(e) => {
                      setEmailOrPhone(e.target.value);
                      if (e.target.value === '' || validateEmail(e.target.value)) {
                        setEmailError('');
                      }
                    }}
                    onBlur={() => validateEmail(emailOrPhone)}
                    autoFocus
                    required
                  />
                  {emailError && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500">
                      <Info className="h-4 w-4" />
                    </div>
                  )}
                </div>
                {emailError && <p className="text-xs text-red-500 mt-1">{emailError}</p>}
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link to="/forgot-password" className="text-sm text-[#1E90FF] hover:text-blue-700 hover:underline">
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                  <Input 
                    id="password" 
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••" 
                    className="pl-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button 
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 pt-2">
                <Checkbox 
                  id="remember-me" 
                  checked={rememberMe} 
                  onCheckedChange={(checked) => setRememberMe(!!checked)}
                />
                <label 
                  htmlFor="remember-me"
                  className="text-sm text-gray-600 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Keep me logged in for 30 days
                </label>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-[#7E69AB] hover:bg-[#6E59A5] text-white font-medium" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </div>
                ) : "Login"}
              </Button>
            </form>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4 text-center">
            <div className="text-sm text-gray-600">
              New to Eventuraa?{" "}
              <Link to="/signup" className="text-[#7E69AB] hover:text-[#6E59A5] hover:underline font-medium">
                Create Account
              </Link>
            </div>
            
            <div className="relative flex items-center w-full">
              <div className="flex-grow border-t border-gray-200"></div>
              <div className="px-3 text-xs text-gray-500 uppercase">Or continue with</div>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>
            
            <div className="flex gap-3 w-full">
              <Button variant="outline" className="flex-1 hover:bg-gray-100">
                Google
              </Button>
              <Button variant="outline" className="flex-1 hover:bg-gray-100">
                Facebook
              </Button>
            </div>

            <div className="flex flex-col md:flex-row justify-center gap-3 md:gap-6 text-xs text-gray-500 pt-4">
              <div className="flex items-center justify-center gap-1.5">
                <Shield className="h-3 w-3" />
                <span>Secure Login</span>
              </div>
              <div className="flex items-center justify-center gap-1.5">
                <CreditCard className="h-3 w-3" />
                <span>PCI-Compliant Payments</span>
              </div>
              <div className="flex items-center justify-center gap-1.5">
                <Lock className="h-3 w-3" />
                <span>Medical Data Encrypted</span>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SignInPage;
