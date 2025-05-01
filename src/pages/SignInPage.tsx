
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

const SignInPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please fill in all fields');
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
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 flex flex-col">
      <div className="container-custom py-6">
        <Link to="/" className="text-2xl font-bold text-gray-800 inline-flex">
          Eventuraa
        </Link>
      </div>
      
      <div className="flex-1 flex items-center justify-center px-4 py-10">
        <Card className="w-full max-w-md shadow-xl border-gray-100">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-2xl font-bold text-gray-800">Welcome Back</CardTitle>
            <CardDescription className="text-gray-600">
              Sign in to your account to continue
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="your.email@example.com" 
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link to="/forgot-password" className="text-sm text-purple-600 hover:text-purple-800 hover:underline">
                    Forgot password?
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
                  Remember me for 30 days
                </label>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium" 
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4 text-center">
            <div className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/signup" className="text-purple-600 hover:text-purple-800 hover:underline font-medium">
                Sign up
              </Link>
            </div>
            
            <div className="relative flex items-center w-full">
              <div className="flex-grow border-t border-gray-200"></div>
              <div className="px-3 text-xs text-gray-500 uppercase">Or continue with</div>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>
            
            <div className="flex gap-3 w-full">
              <Button variant="outline" className="flex-1">
                Google
              </Button>
              <Button variant="outline" className="flex-1">
                Facebook
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SignInPage;
