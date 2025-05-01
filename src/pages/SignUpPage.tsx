
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, EyeOff, User, Mail, Lock } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTos, setAgreeTos] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !password) {
      toast.error('Please fill in all fields');
      return;
    }
    
    if (!agreeTos) {
      toast.error('Please agree to the Terms of Service');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Mock registration - replace with actual implementation
      setTimeout(() => {
        toast.success('Account created successfully!');
        navigate('/');
      }, 1500);
    } catch (error) {
      toast.error('Registration failed. Please try again.');
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
            <CardTitle className="text-2xl font-bold text-gray-800">Create an Account</CardTitle>
            <CardDescription className="text-gray-600">
              Sign up to start booking events and experiences
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                  <Input 
                    id="name" 
                    type="text" 
                    placeholder="John Doe" 
                    className="pl-10"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>
              
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
                <Label htmlFor="password">Password</Label>
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
                <p className="text-xs text-gray-500 mt-1">
                  Password must be at least 8 characters long
                </p>
              </div>
              
              <div className="flex items-start space-x-2 pt-2">
                <Checkbox 
                  id="terms" 
                  checked={agreeTos} 
                  onCheckedChange={(checked) => setAgreeTos(!!checked)}
                />
                <label 
                  htmlFor="terms"
                  className="text-sm text-gray-600 leading-tight"
                >
                  I agree to the <Link to="/terms" className="text-purple-600 hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-purple-600 hover:underline">Privacy Policy</Link>
                </label>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium" 
                disabled={isLoading}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4 text-center">
            <div className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/signin" className="text-purple-600 hover:text-purple-800 hover:underline font-medium">
                Sign in
              </Link>
            </div>
            
            <div className="relative flex items-center w-full">
              <div className="flex-grow border-t border-gray-200"></div>
              <div className="px-3 text-xs text-gray-500 uppercase">Or sign up with</div>
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

export default SignUpPage;
