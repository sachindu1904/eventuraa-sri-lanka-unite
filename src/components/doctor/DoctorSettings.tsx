
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Lock, Shield, Bell, Info, Clock, User, LogOut, Settings, Eye, EyeOff } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const DoctorSettings = () => {
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    sms: true,
    whatsapp: false,
    newPatient: true,
    appointmentReminder: true,
    messageAlert: true,
    marketingUpdates: false
  });
  
  const handleSaveSettings = () => {
    toast({
      title: "Settings updated",
      description: "Your account settings have been saved",
    });
  };
  
  const handlePasswordChange = () => {
    toast({
      title: "Password update",
      description: "Your password has been successfully updated",
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Account Settings</h1>
      
      {/* Account Security */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Lock className="h-5 w-5 mr-2" />
            Account Security
          </CardTitle>
          <CardDescription>
            Update your password and security settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Password Change */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-700">Change Password</h3>
            
            <div className="space-y-3">
              <div className="space-y-1">
                <Label htmlFor="current-password">Current Password</Label>
                <div className="relative">
                  <Input 
                    id="current-password" 
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="new-password">New Password</Label>
                <Input 
                  id="new-password" 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••"
                />
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input 
                  id="confirm-password" 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••"
                />
              </div>
            </div>
            
            <div className="pt-2">
              <Button onClick={handlePasswordChange}>Update Password</Button>
            </div>
          </div>
          
          <Separator />
          
          {/* Two-Factor Authentication */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-700">Two-Factor Authentication</h3>
                <p className="text-xs text-gray-500 mt-1">
                  Add an extra layer of security to your account
                </p>
              </div>
              <Switch id="2fa" />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-700">Login Notifications</h3>
                <p className="text-xs text-gray-500 mt-1">
                  Get notified when someone logs into your account
                </p>
              </div>
              <Switch id="login-notifications" defaultChecked />
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Notification Preferences */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bell className="h-5 w-5 mr-2" />
            Notification Preferences
          </CardTitle>
          <CardDescription>
            Configure how you receive notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-700">Notification Channels</h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <Switch 
                  id="email-notifications" 
                  checked={notifications.email}
                  onCheckedChange={(checked) => 
                    setNotifications({...notifications, email: checked})
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="sms-notifications">SMS Notifications</Label>
                <Switch 
                  id="sms-notifications" 
                  checked={notifications.sms}
                  onCheckedChange={(checked) => 
                    setNotifications({...notifications, sms: checked})
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="whatsapp-notifications">WhatsApp Notifications</Label>
                <Switch 
                  id="whatsapp-notifications" 
                  checked={notifications.whatsapp}
                  onCheckedChange={(checked) => 
                    setNotifications({...notifications, whatsapp: checked})
                  }
                />
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-700">Notification Types</h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="new-patient">New Patient Requests</Label>
                  <p className="text-xs text-gray-500">When a new patient books a consultation</p>
                </div>
                <Switch 
                  id="new-patient" 
                  checked={notifications.newPatient}
                  onCheckedChange={(checked) => 
                    setNotifications({...notifications, newPatient: checked})
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="appointment-reminder">Appointment Reminders</Label>
                  <p className="text-xs text-gray-500">Reminder before scheduled appointments</p>
                </div>
                <Switch 
                  id="appointment-reminder" 
                  checked={notifications.appointmentReminder}
                  onCheckedChange={(checked) => 
                    setNotifications({...notifications, appointmentReminder: checked})
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="message-alert">Message Alerts</Label>
                  <p className="text-xs text-gray-500">When patients send you messages</p>
                </div>
                <Switch 
                  id="message-alert" 
                  checked={notifications.messageAlert}
                  onCheckedChange={(checked) => 
                    setNotifications({...notifications, messageAlert: checked})
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="marketing-updates">Marketing & Updates</Label>
                  <p className="text-xs text-gray-500">Platform news and feature updates</p>
                </div>
                <Switch 
                  id="marketing-updates" 
                  checked={notifications.marketingUpdates}
                  onCheckedChange={(checked) => 
                    setNotifications({...notifications, marketingUpdates: checked})
                  }
                />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t pt-4">
          <Button onClick={handleSaveSettings}>Save Notification Preferences</Button>
        </CardFooter>
      </Card>
      
      {/* Privacy & Confidentiality */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            Privacy & Confidentiality
          </CardTitle>
          <CardDescription>
            Manage data protection and privacy settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="audit-log">Consultation Audit Log</Label>
                <p className="text-xs text-gray-500">
                  Keep detailed logs of all patient consultations
                </p>
              </div>
              <Switch id="audit-log" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="data-retention">Patient Data Retention</Label>
                <p className="text-xs text-gray-500">
                  How long to keep patient data after last interaction
                </p>
              </div>
              <Select defaultValue="1-year">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-year">1 Year</SelectItem>
                  <SelectItem value="3-year">3 Years</SelectItem>
                  <SelectItem value="5-year">5 Years</SelectItem>
                  <SelectItem value="indefinite">Indefinite</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="message-encrypt">End-to-End Message Encryption</Label>
                <p className="text-xs text-gray-500">
                  All patient communications are encrypted
                </p>
              </div>
              <Switch id="message-encrypt" defaultChecked disabled />
              <span className="text-xs text-green-600 ml-2">Required</span>
            </div>
          </div>
          
          <div className="bg-blue-50 p-3 rounded-md">
            <div className="flex">
              <Info className="h-4 w-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-blue-800">
                All doctor-patient communications on this platform adhere to the Sri Lanka Medical Council guidelines on confidentiality and data protection regulations. You are legally responsible for maintaining patient confidentiality.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Availability Settings */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="h-5 w-5 mr-2" />
            Working Hours & Availability
          </CardTitle>
          <CardDescription>
            Set your consultation hours and breaks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium">Automatic Scheduling</h3>
                <p className="text-xs text-gray-500 mt-1">
                  Allow patients to book consultations during set hours
                </p>
              </div>
              <Switch id="auto-schedule" defaultChecked />
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm">Maximum Daily Consultations</Label>
              <Select defaultValue="8">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select maximum consultations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="4">4 consultations per day</SelectItem>
                  <SelectItem value="8">8 consultations per day</SelectItem>
                  <SelectItem value="12">12 consultations per day</SelectItem>
                  <SelectItem value="16">16 consultations per day</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-500">
                Sets the maximum number of appointments you can accept per day
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t pt-4 flex justify-end">
          <Button variant="outline">Configure Schedule</Button>
        </CardFooter>
      </Card>
      
      {/* Account Management */}
      <Card className="border-red-100">
        <CardHeader>
          <CardTitle className="text-red-700 flex items-center">
            <Settings className="h-5 w-5 mr-2" />
            Account Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <Button variant="outline">Download My Data</Button>
            <Button variant="outline">Export Medical Records</Button>
          </div>
          
          <div className="border-t pt-4 mt-4">
            <Button variant="destructive" className="bg-red-600">
              <LogOut className="h-4 w-4 mr-2" />
              Deactivate Account
            </Button>
            <p className="text-xs text-gray-500 mt-2">
              Deactivating your account will make your profile invisible to patients until you activate it again.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DoctorSettings;
